import { useState, useRef } from 'react';
import { UploadCloud, FileType, CheckCircle, Download, FileSpreadsheet } from 'lucide-react';
import { parseExcel } from './utils/excelParser';
import { generateHTML } from './utils/generator';

function App() {
  const [file, setFile] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
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
      const html = generateHTML(flashcards, metadata);

      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${metadata.chapterName.replace(/\s+/g, '_').toLowerCase()}_flashcards.html`;
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

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Aveti Flashcard Generator</h1>
        <p>Convert your Excel sheets into interactive flashcard modules</p>
      </header>

      <main className="main-content">
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
                <p>{flashcards.length} flashcards loaded</p>
                <span className="replace-text">Click to replace file</span>
              </div>
            ) : (
              <div className="file-prompt">
                <UploadCloud size={48} className="upload-icon" />
                <h3>Drag & Drop Excel File</h3>
                <p>or click to browse (.xlsx, .xls)</p>
                <div className="format-hint">
                  Required columns: <strong>Question</strong>, <strong>Answer</strong>
                  <br />Optional column: <strong>Type</strong>
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
          >
            <Download size={24} />
            {generating ? 'Generating...' : 'Generate Flashcards HTML'}
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
