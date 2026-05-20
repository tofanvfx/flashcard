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

        const headers = rawJson[0].map(h => typeof h === 'string' ? h.toLowerCase().trim() : '');
        
        // Helper: find index matching any of the given names
        const findCol = (...names) => headers.findIndex(h => names.includes(h));

        // Detect MCQ format by checking for option columns
        const optionAIdx = findCol('option a', 'optiona', 'option_a');
        const optionBIdx = findCol('option b', 'optionb', 'option_b');
        const optionCIdx = findCol('option c', 'optionc', 'option_c');
        const optionDIdx = findCol('option d', 'optiond', 'option_d');
        
        const isMCQ = optionAIdx !== -1 && optionBIdx !== -1 && optionCIdx !== -1 && optionDIdx !== -1;

        const typeIdx = findCol('type', 'question type');
        const qIdx = findCol('question', 'q');
        const aIdx = findCol('answer', 'a', 'correct answer', 'answer text');

        if (qIdx === -1) {
          throw new Error('Excel must contain a "Question" column.');
        }

        if (!isMCQ && aIdx === -1) {
          throw new Error('Excel must contain at least "Question" and "Answer" columns.');
        }

        if (isMCQ) {
          // MCQ parsing
          const correctOptionIdx = findCol('correct option', 'correctoption', 'correct_option', 'correct');
          const thinkingLevelIdx = findCol('thinking level', 'thinkinglevel', 'thinking_level', 'level');
          const explanationIdx = findCol('explanation', 'explain', 'explanation / hint', 'explanation/hint', 'hint');
          const feedbackAIdx = findCol('option a feedback', 'feedback a', 'feedbacka', 'feedback_a');
          const feedbackBIdx = findCol('option b feedback', 'feedback b', 'feedbackb', 'feedback_b');
          const feedbackCIdx = findCol('option c feedback', 'feedback c', 'feedbackc', 'feedback_c');
          const feedbackDIdx = findCol('option d feedback', 'feedback d', 'feedbackd', 'feedback_d');

          const mcqCards = [];
          for (let i = 1; i < rawJson.length; i++) {
            const row = rawJson[i];
            if (!row || row.length === 0) continue;
            
            const q = row[qIdx];
            if (!q) continue;

            const options = [
              row[optionAIdx] ? row[optionAIdx].toString() : '',
              row[optionBIdx] ? row[optionBIdx].toString() : '',
              row[optionCIdx] ? row[optionCIdx].toString() : '',
              row[optionDIdx] ? row[optionDIdx].toString() : ''
            ];

            const optionFeedback = [];
            if (feedbackAIdx !== -1 || feedbackBIdx !== -1 || feedbackCIdx !== -1 || feedbackDIdx !== -1) {
              optionFeedback.push(
                feedbackAIdx !== -1 && row[feedbackAIdx] ? row[feedbackAIdx].toString() : '',
                feedbackBIdx !== -1 && row[feedbackBIdx] ? row[feedbackBIdx].toString() : '',
                feedbackCIdx !== -1 && row[feedbackCIdx] ? row[feedbackCIdx].toString() : '',
                feedbackDIdx !== -1 && row[feedbackDIdx] ? row[feedbackDIdx].toString() : ''
              );
            }

            // Determine correct option letter
            let correctOption = 'A';
            if (correctOptionIdx !== -1 && row[correctOptionIdx]) {
              correctOption = row[correctOptionIdx].toString().trim().toUpperCase();
              // Handle numeric correct option (1=A, 2=B, etc.)
              if (['1','2','3','4'].includes(correctOption)) {
                correctOption = 'ABCD'[parseInt(correctOption) - 1];
              }
            }

            // Determine correct answer text
            const correctIndex = 'ABCD'.indexOf(correctOption);
            const correctAnswer = aIdx !== -1 && row[aIdx]
              ? row[aIdx].toString()
              : (correctIndex >= 0 ? options[correctIndex] : options[0]);

            const card = {
              type: typeIdx !== -1 && row[typeIdx] ? row[typeIdx].toString() : 'MCQ',
              q: q.toString(),
              options: options,
              correctOption: correctOption,
              a: correctAnswer,
              explanation: explanationIdx !== -1 && row[explanationIdx] ? row[explanationIdx].toString() : `Correct answer: ${correctAnswer}`
            };

            // Add thinking level if present
            if (thinkingLevelIdx !== -1 && row[thinkingLevelIdx]) {
              card.thinkingLevel = row[thinkingLevelIdx].toString().trim().toUpperCase();
            }

            // Add option feedback if present
            if (optionFeedback.length > 0) {
              card.optionFeedback = optionFeedback;
            }

            mcqCards.push(card);
          }

          // Return with mode indicator
          mcqCards._mode = 'mcq';
          resolve(mcqCards);
        } else {
          // Standard flashcard parsing
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
          
          flashcards._mode = 'flashcard';
          resolve(flashcards);
        }
      } catch (err) {
        reject(err);
      }
    };
    
    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}
