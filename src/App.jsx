import { useState, useRef } from 'react';
import { UploadCloud, FileType, CheckCircle, Download, FileSpreadsheet } from 'lucide-react';
import { parseExcel } from './utils/excelParser';
import { generateHTML } from './utils/generator';
import { generateMCQHTML } from './utils/mcqGenerator';

function App() {
  const [file, setFile] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [mode, setMode] = useState('flashcard'); // 'flashcard' or 'mcq'
  const [metadata, setMetadata] = useState({
    title: 'Quick Revision',
    subtitle: 'Flashcard Learning',
    chapterName: 'The Invisible Living World',
    className: 'Class 8',
    subject: 'Science',
    chapterNo: 'Chapter 2'
  });
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [language, setLanguage] = useState('english');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (selectedFile) => {
    setError(null);
    setFile(selectedFile);
    try {
      const data = await parseExcel(selectedFile);
      const detectedMode = data._mode || 'flashcard';
      setMode(detectedMode);
      setFlashcards(data);
    } catch (err) {
      setError(err.message || 'Error parsing Excel file');
      setFile(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMetadata(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = () => {
    if (!file || flashcards.length === 0) return;
    setGenerating(true);

    try {
      let html;
      let suffix;

      if (mode === 'mcq') {
        html = generateMCQHTML(flashcards, metadata, language);
        suffix = '_mcq.html';
      } else {
        html = generateHTML(flashcards, metadata, language);
        suffix = '_flashcards.html';
      }

      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${metadata.chapterName.replace(/\s+/g, '_').toLowerCase()}${suffix}`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Error generating HTML file');
    } finally {
      setGenerating(false);
    }
  };

  const modeLabel = mode === 'mcq' ? 'MCQ' : 'Flashcard';
  const modeColor = mode === 'mcq' ? '#1565C0' : '#2E7D32';
  const itemLabel = mode === 'mcq' ? 'questions' : 'flashcards';

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Aveti Flashcard Generator</h1>
        <p>Convert your Excel sheets into interactive flashcard & MCQ modules</p>
      </header>

      <main className="main-content">
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
          <a href="/flashcards.xlsx" download style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#f0fdf4', color: '#166534', borderRadius: '24px', textDecoration: 'none', fontWeight: 'bold', border: '1.5px solid #bbf7d0', fontSize: '14px', transition: 'all 0.3s' }}>
            <Download size={16} /> Sample Flashcard Excel
          </a>
          <a href="/mcq.xlsx" download style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#E3F2FD', color: '#1565C0', borderRadius: '24px', textDecoration: 'none', fontWeight: 'bold', border: '1.5px solid #90CAF9', fontSize: '14px', transition: 'all 0.3s' }}>
            <Download size={16} /> Sample MCQ Excel
          </a>
        </div>

        <div className="language-selector" style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
          <button 
            className={`btn ${language === 'english' ? 'active' : ''}`}
            style={{ padding: '8px 24px', borderRadius: '20px', border: language === 'english' ? '2px solid #2E7D32' : '2px solid #ccc', background: language === 'english' ? '#2E7D32' : '#fff', color: language === 'english' ? '#fff' : '#666', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
            onClick={() => setLanguage('english')}
          >
            English
          </button>
          <button 
            className={`btn ${language === 'odia' ? 'active' : ''}`}
            style={{ padding: '8px 24px', borderRadius: '20px', border: language === 'odia' ? '2px solid #2E7D32' : '2px solid #ccc', background: language === 'odia' ? '#2E7D32' : '#fff', color: language === 'odia' ? '#fff' : '#666', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
            onClick={() => setLanguage('odia')}
          >
            ଓଡ଼ିଆ (Odia)
          </button>
        </div>

        <section className="card config-section">
          <div className="card-header">
            <h2><FileType size={20} /> Content Details</h2>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label>Course Title</label>
              <input type="text" name="title" value={metadata.title} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label>Subtitle</label>
              <input type="text" name="subtitle" value={metadata.subtitle} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label>Chapter Name</label>
              <input type="text" name="chapterName" value={metadata.chapterName} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label>Class</label>
              <input type="text" name="className" value={metadata.className} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label>Subject</label>
              <input type="text" name="subject" value={metadata.subject} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label>Chapter No.</label>
              <input type="text" name="chapterNo" value={metadata.chapterNo} onChange={handleInputChange} />
            </div>
          </div>
        </section>

        <section className="card upload-section">
          <div className="card-header">
            <h2><FileSpreadsheet size={20} /> Data Source</h2>
          </div>

          <div
            className={`dropzone ${file ? 'has-file' : ''} ${error ? 'has-error' : ''}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".xlsx,.xls"
              style={{ display: 'none' }}
            />

            {file ? (
              <div className="file-success">
                <CheckCircle size={48} className="success-icon" />
                <h3>{file.name}</h3>
                <p>{flashcards.length} {itemLabel} loaded</p>
                {mode === 'mcq' && (
                  <span style={{ 
                    display: 'inline-block', 
                    marginTop: '8px', 
                    padding: '4px 16px', 
                    background: '#E3F2FD', 
                    color: '#1565C0', 
                    borderRadius: '20px', 
                    fontWeight: 'bold', 
                    fontSize: '13px',
                    border: '1.5px solid #90CAF9'
                  }}>
                    📝 MCQ Mode Detected
                  </span>
                )}
                <span className="replace-text">Click to replace file</span>
              </div>
            ) : (
              <div className="file-prompt">
                <UploadCloud size={48} className="upload-icon" />
                <h3>Drag & Drop Excel File</h3>
                <p>or click to browse (.xlsx, .xls)</p>
                <div className="format-hint">
                  <strong>Flashcard:</strong> Question, Answer (+ optional Type)
                  <br /><strong>MCQ:</strong> Question, Option A–D, Correct Option (+ optional Type, Explanation, Feedback)
                </div>
              </div>
            )}
          </div>

          {error && <div className="error-msg">{error}</div>}
        </section>

        <div className="action-row">
          <button
            className={`generate-btn ${(!file || flashcards.length === 0) ? 'disabled' : ''}`}
            onClick={handleGenerate}
            disabled={!file || flashcards.length === 0 || generating}
            style={mode === 'mcq' ? { background: `linear-gradient(135deg, ${modeColor}, #0D47A1)` } : {}}
          >
            <Download size={24} />
            {generating ? 'Generating...' : `Generate ${modeLabel} HTML`}
          </button>
        </div>
      </main>

      <div className="bg-elements">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
    </div>
  );
}

export default App;
