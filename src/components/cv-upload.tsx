'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Upload, FileText, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { extractCvData } from '@/app/actions/extract-cv-action';
import type { ResumeData } from '@/lib/types';

type CvUploadProps = {
  onDataExtracted: (data: Partial<ResumeData>) => void;
};

export function CvUpload({ onDataExtracted }: CvUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const extractTextFromPdf = async (file: File): Promise<string> => {
    // Convert PDF to base64 and let AI extract text from it
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        // Send base64 to AI - it can read PDFs
        resolve(`[PDF Document]\n${base64}`);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const extractTextFromImage = async (file: File): Promise<string> => {
    // For images, we'll convert to base64 and let the AI read it
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        resolve(`[Image content - AI will process this]\n${base64}`);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      let cvText = '';

      // Extract text based on file type
      if (file.type === 'application/pdf') {
        cvText = await extractTextFromPdf(file);
      } else if (file.type.startsWith('image/')) {
        cvText = await extractTextFromImage(file);
      } else if (
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword'
      ) {
        // For DOCX files, read as text (simplified)
        const reader = new FileReader();
        cvText = await new Promise((resolve, reject) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsText(file);
        });
      } else {
        throw new Error('Unsupported file type. Please upload PDF, DOCX, or image files.');
      }

      // Send to AI for extraction
      const result = await extractCvData(cvText);

      if (result.success && result.data) {
        setUploadStatus('success');
        toast({
          title: 'Success!',
          description: 'CV data extracted successfully. Your form has been populated.',
        });
        
        // Pass the extracted data to parent component
        onDataExtracted({
          personal: {
            ...result.data.personal,
            linkedin: result.data.personal.linkedin || '',
            portfolio: result.data.personal.portfolio || '',
          },
          summary: result.data.summary,
          experience: result.data.experience,
          education: result.data.education,
          skills: result.data.skills,
          references: result.data.references || [],
        });
      } else {
        throw new Error(result.error || 'Failed to extract CV data');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to process CV. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Existing CV
        </CardTitle>
        <CardDescription>
          Upload your existing CV (PDF, DOCX, or image) and let AI extract the information to populate the form
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <label
            htmlFor="cv-upload"
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              isUploading
                ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                : uploadStatus === 'success'
                ? 'border-green-500 bg-green-50 hover:bg-green-100'
                : uploadStatus === 'error'
                ? 'border-red-500 bg-red-50 hover:bg-red-100'
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <>
                  <Loader2 className="w-10 h-10 mb-3 text-gray-400 animate-spin" />
                  <p className="text-sm text-gray-500">Processing your CV...</p>
                </>
              ) : uploadStatus === 'success' ? (
                <>
                  <CheckCircle className="w-10 h-10 mb-3 text-green-500" />
                  <p className="text-sm text-green-600 font-medium">CV processed successfully!</p>
                  <p className="text-xs text-gray-500 mt-1">Upload another to replace</p>
                </>
              ) : uploadStatus === 'error' ? (
                <>
                  <XCircle className="w-10 h-10 mb-3 text-red-500" />
                  <p className="text-sm text-red-600 font-medium">Failed to process CV</p>
                  <p className="text-xs text-gray-500 mt-1">Try again with a different file</p>
                </>
              ) : (
                <>
                  <FileText className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOCX, or Image (PNG, JPG)</p>
                </>
              )}
            </div>
            <input
              id="cv-upload"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,image/*"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>

          <div className="text-xs text-gray-500 text-center">
            <p>💡 Tip: For best results, use a clear, well-formatted CV</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
