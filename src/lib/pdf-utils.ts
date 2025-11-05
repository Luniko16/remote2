/**
 * PDF Export Utilities
 * Provides different methods for generating PDFs from HTML content
 */

export interface PdfExportOptions {
  filename?: string;
  pageSize?: 'A4' | 'Letter';
  margins?: string;
  font?: string;
}

/**
 * Export PDF using browser's native print functionality
 * This creates actual text-based PDFs that are ATS-compatible
 */
export const exportPdfViaPrint = (
  htmlContent: string, 
  options: PdfExportOptions = {}
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const {
        filename = 'resume.pdf',
        pageSize = 'A4',
        margins = '15mm',
        font = 'Arial, sans-serif'
      } = options;

      // Enhanced HTML with optimized PDF styling
      const pdfOptimizedHtml = htmlContent.replace(
        '</head>',
        `
        <style>
          @media print {
            body { 
              margin: 0 !important; 
              padding: 0 !important;
              font-family: ${font} !important;
              color: #000 !important;
              background: white !important;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            #export-wrapper {
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: ${margins} !important;
              box-sizing: border-box !important;
            }
            .print\\:hidden { 
              display: none !important; 
            }
          }
          @page {
            size: ${pageSize};
            margin: 0;
          }
          body {
            font-family: ${font};
            line-height: 1.4;
            color: #333;
          }
        </style>
        </head>`
      );

      // Create a new window for PDF generation
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      
      if (!printWindow) {
        reject(new Error('Could not open print window. Please allow popups for this site.'));
        return;
      }

      // Write the optimized HTML to the new window
      printWindow.document.write(pdfOptimizedHtml);
      printWindow.document.close();

      // Wait for fonts and content to load, then print
      printWindow.addEventListener('load', () => {
        setTimeout(() => {
          printWindow.print();
          
          // Close the window after a delay
          setTimeout(() => {
            printWindow.close();
            resolve();
          }, 1000);
          
        }, 500);
      });

    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Export PDF by creating a downloadable HTML file optimized for PDF conversion
 * Users can open this file and use browser's "Print to PDF" feature
 */
export const exportPdfAsHtml = (
  htmlContent: string,
  options: PdfExportOptions = {}
): void => {
  const {
    filename = 'resume-for-pdf.html',
    pageSize = 'A4',
    margins = '15mm',
    font = 'Arial, sans-serif'
  } = options;

  // Add PDF-optimized styles
  const pdfReadyHtml = htmlContent.replace(
    '</head>',
    `
    <style>
      body { 
        font-family: ${font};
        line-height: 1.4;
        color: #333;
        max-width: 210mm;
        margin: 0 auto;
        padding: ${margins};
        background: white;
      }
      @media print {
        body { 
          margin: 0 !important; 
          padding: ${margins} !important;
          font-family: ${font} !important;
          color: #000 !important;
          background: white !important;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
      @page {
        size: ${pageSize};
        margin: 0;
      }
      .pdf-instructions {
        background: #f0f9ff;
        border: 1px solid #0ea5e9;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 20px;
        font-size: 14px;
      }
      @media print {
        .pdf-instructions { display: none !important; }
      }
    </style>
    </head>`
  );

  // Add instructions for PDF conversion
  const htmlWithInstructions = pdfReadyHtml.replace(
    '<body>',
    `<body>
      <div class="pdf-instructions">
        <strong>📄 PDF Export Instructions:</strong><br>
        1. Press <kbd>Ctrl+P</kbd> (or <kbd>Cmd+P</kbd> on Mac)<br>
        2. Select "Save as PDF" as destination<br>
        3. Choose "More settings" and ensure "Background graphics" is enabled<br>
        4. Click "Save" to download your PDF
      </div>`
  );

  // Create and download the HTML file
  const blob = new Blob([htmlWithInstructions], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Utility to check if the browser supports the print API
 */
export const isPrintSupported = (): boolean => {
  return typeof window !== 'undefined' && 'print' in window;
};