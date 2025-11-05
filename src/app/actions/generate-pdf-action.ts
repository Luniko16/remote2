'use server';

import type { ResumeData } from '@/lib/types';

export interface GeneratePdfInput {
  htmlContent: string;
  resumeData: ResumeData;
}

export async function generatePdf(input: GeneratePdfInput): Promise<string> {
  try {
    // For now, we'll use a client-side approach with better HTML-to-PDF conversion
    // This is a placeholder that will be handled on the client side
    // In a production environment, you would use Puppeteer or similar server-side solution
    
    throw new Error('Server-side PDF generation not available. Using client-side fallback.');
    
  } catch (error) {
    console.error('Error generating PDF on server:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}
