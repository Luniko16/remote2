import type { PuppeteerLaunchOptions } from 'puppeteer';

/**
 * Puppeteer configuration for headless browser launch
 * Optimized for server-side PDF generation
 */
export const puppeteerConfig: PuppeteerLaunchOptions = {
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
  ],
};

/**
 * PDF generation options
 * Configured for A4 size with proper margins
 */
export const pdfOptions = {
  format: 'A4' as const,
  printBackground: true,
  preferCSSPageSize: false,
  displayHeaderFooter: false,
  margin: {
    top: '15mm',
    right: '15mm',
    bottom: '15mm',
    left: '15mm',
  },
};
