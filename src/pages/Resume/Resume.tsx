import { useState, ChangeEvent } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './Resume.css';

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const Resume = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setCurrentPage(1); // Reset to first page when new file is uploaded
    } else {
      alert('Please upload a PDF file');
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setCurrentPage(prevPage => {
      const newPage = prevPage + offset;
      if (newPage >= 1 && newPage <= (numPages || 1)) {
        return newPage;
      }
      return prevPage;
    });
  };

  return (
    <div className="resume-container">
      <div className="upload-section">
        <div className="upload-area">
          <label htmlFor="pdf-upload" className="upload-label">
            {pdfFile ? 'Change Resume' : 'Upload Resume (PDF)'}
            <input
              type="file"
              id="pdf-upload"
              accept=".pdf"
              onChange={handleFileChange}
              className="file-input"
            />
          </label>
          {pdfFile && <p className="file-name">Current file: {pdfFile.name}</p>}
        </div>
      </div>

      {pdfFile && (
        <div className="pdf-container">
          <div className="pdf-controls">
            <button
              onClick={() => changePage(-1)}
              disabled={currentPage <= 1}
              className="page-button"
            >
              Previous
            </button>
            <span className="page-info">
              Page {currentPage} of {numPages}
            </span>
            <button
              onClick={() => changePage(1)}
              disabled={currentPage >= (numPages || 1)}
              className="page-button"
            >
              Next
            </button>
          </div>
          <div className="pdf-viewer">
            <Document
              file={pdfFile}
              onLoadSuccess={onDocumentLoadSuccess}
              error="Failed to load PDF"
              loading="Loading PDF..."
            >
              <Page
                pageNumber={currentPage}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="pdf-page"
              />
            </Document>
          </div>
        </div>
      )}

      {!pdfFile && (
        <div className="placeholder">
          <p>Upload your resume to view it here</p>
          <p className="subtitle">Supported format: PDF</p>
        </div>
      )}
    </div>
  );
}; 