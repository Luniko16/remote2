
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
import { useLanguage } from '@/context/language-context';
import { exportPdfViaPrint } from '@/lib/pdf-utils';


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
          body { 
            font-family: ${resumeData.style.font || 'sans-serif'};
            background-color: #ffffff;
          }
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
      // Hide cover letter for PDF export
      const coverLetter = document.getElementById('cover-letter-preview');
      const originalDisplay = coverLetter?.style.display;
      if (coverLetter) {
        coverLetter.style.display = 'none';
      }

      // Get HTML content without cover letter
      const htmlContent = getHtmlContent(false);

      // Use the PDF utility for better export
      await exportPdfViaPrint(htmlContent, {
        filename: 'resume.pdf',
        font: resumeData.style.font || 'Arial, sans-serif'
      });

      toast({
        title: t.toast.success,
        description: 'PDF print dialog opened. Select "Save as PDF" to download your resume.',
      });

      // Restore cover letter visibility
      if (coverLetter && originalDisplay !== undefined) {
        coverLetter.style.display = originalDisplay;
      } else if (coverLetter) {
        coverLetter.style.display = 'block';
      }

    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: t.toast.error,
        description: 'Failed to generate PDF. Please try again or check if popups are blocked.',
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
    } catch (error) {
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
      const docxBlob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
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
            <div id="cover-letter-preview" style={{ breakBefore: 'page', paddingTop: '2rem' }}>
              <h2 style={{ color: resumeData.style.color, fontSize: '18px', borderBottom: `2px solid ${resumeData.style.color}`, paddingBottom: '5px', marginBottom: '10px' }}>Cover Letter</h2>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: resumeData.style.font, color: '#374151', fontSize: '12px' }}>{resumeData.coverLetter}</pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
