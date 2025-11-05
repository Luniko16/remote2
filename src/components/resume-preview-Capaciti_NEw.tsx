
'use client';

import type { ResumeData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ProfessionalTemplate } from './templates/professional-template';
import { ModernTemplate } from './templates/modern-template';
import { CreativeTemplate } from './templates/creative-template';
import { Button } from './ui/button';
import { Download, Loader2, FileText, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { generateDocx } from '@/app/actions/generate-docx-action';
import { generatePdf } from '@/app/actions/generate-pdf-action';
import { useLanguage } from '@/context/language-context';


type ResumePreviewProps = {
  resumeData: ResumeData;
  isMounted: boolean;
};

export function ResumePreview({ resumeData, isMounted }: ResumePreviewProps) {
  const { toast } = useToast();
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [isDocxLoading, setIsDocxLoading] = useState(false);
  const [isHtmlLoading, setIsHtmlLoading] = useState(false);
  const { t } = useLanguage();

  const renderTemplate = () => {
    switch (resumeData.template) {
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      default:
        return <ProfessionalTemplate data={resumeData} />;
    }
  };

  const getHtmlContent = (includeCoverLetter: boolean) => {
    const resumeElement = document.getElementById('resume-preview-content')?.cloneNode(true) as HTMLElement | null;
    if (!resumeElement) return '';

    if (!includeCoverLetter) {
        const coverLetterEl = resumeElement.querySelector('#cover-letter-preview');
        if (coverLetterEl) {
            coverLetterEl.remove();
        }
    }
    
    const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join('');
        } catch (e) {
          console.warn("Could not read CSS rules from stylesheet, may be a cross-origin resource.", e);
          return '';
        }
      })
      .join('');

    const googleFonts = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Lato:wght@400;700&family=Merriweather:wght@400;700&family=Roboto:wght@400;500;700&display=swap');
    `;

    const pdfSpecificStyles = `
      /* PDF-specific page setup for A4 */
      @page {
        size: A4;
        margin: 15mm;
      }

      /* Base styles optimized for PDF */
      body {
        margin: 0;
        padding: 0;
        font-family: ${resumeData.style.font || 'Inter, sans-serif'};
        background-color: #ffffff;
        color: #374151;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      /* Prevent page breaks inside headings */
      h1, h2, h3, h4, h5, h6 {
        page-break-after: avoid;
        break-after: avoid;
        page-break-inside: avoid;
        break-inside: avoid;
      }

      /* Prevent page breaks inside sections */
      section {
        page-break-inside: avoid;
        break-inside: avoid;
      }

      /* Allow page breaks between sections if needed */
      section + section {
        page-break-before: auto;
        break-before: auto;
      }

      /* Ensure experience and education items don't break across pages */
      .experience-item,
      .education-item {
        page-break-inside: avoid;
        break-inside: avoid;
        margin-bottom: 15px;
      }

      /* Prevent orphaned content */
      p {
        orphans: 3;
        widows: 3;
      }

      /* Optimize wrapper for A4 dimensions */
      #export-wrapper {
        max-width: 210mm;
        margin: 0 auto;
      }
    `;

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume</title>
        <style>
          ${googleFonts}
          ${styles}
          ${pdfSpecificStyles}
        </style>
      </head>
      <body>
        <div id="export-wrapper">
          ${resumeElement.innerHTML}
        </div>
      </body>
      </html>
    `;
  };

  const exportAsPdf = async () => {
    setIsPdfLoading(true);
    
    try {
      // Get HTML content without cover letter
      const htmlContent = getHtmlContent(false);
      
      // Call server action to generate PDF
      const base64Pdf = await generatePdf({
        htmlContent,
        resumeData
      });
      
      // Convert base64 to blob
      const byteCharacters = atob(base64Pdf);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
      
      // Trigger download
      saveAs(pdfBlob, 'resume.pdf');
      
      toast({
        title: t.toast.success,
        description: 'PDF generated successfully.',
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: t.toast.error,
        description: 'Failed to generate PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsPdfLoading(false);
    }
  };

  const exportAsHtml = () => {
    setIsHtmlLoading(true);
    try {
      const htmlContent = getHtmlContent(false);
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      saveAs(blob, 'resume.html');
    } catch(error) {
      console.error('Error generating HTML', error);
      toast({
        title: t.toast.error,
        description: 'Failed to generate HTML file. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsHtmlLoading(false);
    }
  };

  const exportAsDocx = async () => {
    setIsDocxLoading(true);
    try {
      const htmlString = getHtmlContent(false);
      const base64String = await generateDocx(htmlString);
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const docxBlob = new Blob([byteArray], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
      saveAs(docxBlob, 'resume.docx');
    } catch (error) {
      console.error('Error generating DOCX', error);
      toast({
        title: t.toast.error,
        description: 'Failed to generate Word document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDocxLoading(false);
    }
  };

  if (!isMounted) {
    return null; 
  }

  return (
    <Card className="shadow-lg" id="resume-card">
      <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4 print:hidden">
        <CardTitle>{t.preview.title}</CardTitle>
        <div className="flex gap-2 flex-wrap justify-center">
          <Button variant="outline" size="sm" onClick={exportAsPdf} disabled={isPdfLoading}>
            {isPdfLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            {t.preview.pdf}
          </Button>
          <Button variant="outline" size="sm" onClick={exportAsDocx} disabled={isDocxLoading}>
            {isDocxLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
            {t.preview.word}
          </Button>
          <Button variant="outline" size="sm" onClick={exportAsHtml} disabled={isHtmlLoading}>
            {isHtmlLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Code className="mr-2 h-4 w-4" />}
            {t.preview.html}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="bg-white rounded-b-lg">
        <div id="resume-preview-content">
          {renderTemplate()}
          {resumeData.coverLetter && (
            <div id="cover-letter-preview" style={{ breakBefore: 'page', paddingTop: '2rem'}}>
                <h2 style={{ color: resumeData.style.color, fontSize: '18px', borderBottom: `2px solid ${resumeData.style.color}`, paddingBottom: '5px', marginBottom: '10px' }}>Cover Letter</h2>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: resumeData.style.font, color: '#374151', fontSize: '12px' }}>{resumeData.coverLetter}</pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
