import * as XLSX from 'xlsx';

export async function parseExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON, assuming first row is header
        const rawJson = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (rawJson.length < 2) {
          throw new Error('Excel file is empty or missing data rows.');
        }

        const headers = rawJson[0].map(h => typeof h === 'string' ? h.toLowerCase() : '');
        const typeIdx = headers.indexOf('type');
        const qIdx = headers.findIndex(h => h === 'question' || h === 'q');
        const aIdx = headers.findIndex(h => h === 'answer' || h === 'a');

        if (qIdx === -1 || aIdx === -1) {
          throw new Error('Excel must contain at least "Question" and "Answer" columns.');
        }

        const flashcards = [];
        for (let i = 1; i < rawJson.length; i++) {
          const row = rawJson[i];
          if (!row || row.length === 0) continue;
          
          const q = row[qIdx];
          const a = row[aIdx];
          
          if (q && a) {
            flashcards.push({
              type: typeIdx !== -1 && row[typeIdx] ? row[typeIdx] : 'Flashcard',
              q: q.toString(),
              a: a.toString()
            });
          }
        }
        
        resolve(flashcards);
      } catch (err) {
        reject(err);
      }
    };
    
    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}
