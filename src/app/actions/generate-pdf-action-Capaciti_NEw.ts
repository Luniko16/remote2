'use server';

import puppeteer from 'puppeteer';
import type { ResumeData } from '@/lib/types';

export interface GeneratePdfInput {
  htmlContent: string;
  resumeData: ResumeData;
}

export async function generatePdf(input: GeneratePdfInput): Promise<string> {
  let browser;
  
  try {
    const { htmlContent } = input;

    // Launch Puppeteer in headless mode with appropriate args
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    // Set page content with HTML
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    // Generate PDF with A4 format, margins, and print background enabled
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      displayHeaderFooter: false,
      margin: {
        top: '15mm',
        right: '15mm',
        bottom: '15mm',
        left: '15mm'
      }
    });

    // Convert PDF buffer to base64 string
    const base64Pdf = pdfBuffer.toString('base64');

    return base64Pdf;

  } catch (error) {
    console.error('Error generating PDF on server:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  } finally {
    // Ensure browser instance is always closed
    if (browser) {
      await browser.close();
    }
  }
}
