# Implementation Plan

- [-] 1. Set up Puppeteer dependency and configuration



  - Install `puppeteer` package via npm
  - Add Puppeteer configuration for headless browser launch
  - _Requirements: 2.1, 2.2_

- [ ] 2. Create server action for PDF generation
  - Create `src/app/actions/generate-pdf-action.ts` file
  - Implement `generatePdf` function that accepts HTML content and resume data
  - Configure Puppeteer to launch headless browser with appropriate args
  - Set page content with HTML and wait for fonts to load
  - Generate PDF with A4 format, margins, and print background enabled
  - Convert PDF buffer to base64 string
  - Implement proper error handling with try-catch-finally
  - Ensure browser instance is always closed in finally block
  - _Requirements: 2.1, 2.2, 2.3, 4.1, 4.2, 4.3, 6.1, 6.2_

- [ ] 3. Enhance HTML content generation for PDF
  - Update `getHtmlContent` function in `src/components/resume-preview.tsx`
  - Add PDF-specific CSS for page breaks (@page rules)
  - Add CSS to prevent page breaks inside headings and sections
  - Add CSS classes for experience and education items
  - Ensure proper font loading with Google Fonts import
  - Optimize styles for A4 page size
  - _Requirements: 3.1, 3.2, 3.3, 4.1, 4.2_

- [ ] 4. Update template components for PDF compatibility
  - Add `className="experience-item"` to experience entries in all templates
  - Add `className="education-item"` to education entries in all templates
  - Update `src/components/templates/professional-template.tsx`
  - Update `src/components/templates/modern-template.tsx`
  - Update `src/components/templates/creative-template.tsx`
  - Verify all inline styles are PDF-compatible
  - _Requirements: 3.1, 3.2, 3.3, 4.2_

- [ ] 5. Replace client-side PDF export with server action call
  - Import `generatePdf` server action in `src/components/resume-preview.tsx`
  - Replace `exportAsPdf` function implementation
  - Remove `html2canvas` import and usage
  - Remove `jsPDF` import and usage
  - Call `generatePdf` server action with HTML content and resume data
  - Convert returned base64 string to Blob
  - Trigger download using `file-saver`
  - Update loading state management
  - Update error handling with user-friendly toast messages
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.3, 5.1, 5.2, 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 6. Test PDF generation with all templates
  - Test PDF export with Professional template
  - Test PDF export with Modern template
  - Test PDF export with Creative template
  - Verify text is selectable in generated PDFs
  - Verify colors and fonts match the preview
  - Verify layout and spacing are preserved
  - _Requirements: 1.1, 1.2, 3.1, 3.2, 3.3, 8.1, 8.2, 8.3, 8.4_

- [ ] 7. Test multi-page resume handling
  - Create test resume with content spanning multiple pages
  - Verify page breaks occur at appropriate locations
  - Verify no content is cut off between pages
  - Verify consistent margins across all pages
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 8. Verify cover letter exclusion
  - Test PDF export with cover letter present in resume data
  - Verify cover letter is not included in PDF output
  - Verify only resume sections are exported
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 9. Test file size and optimization
  - Generate PDFs with typical resume content
  - Verify file sizes are under 2MB
  - Test with resumes of varying lengths
  - Verify font embedding is optimized
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 10. Test error handling and user feedback
  - Test PDF generation with invalid HTML
  - Verify error toast is displayed on failure
  - Verify loading indicator appears during generation
  - Verify button is disabled during generation
  - Verify success feedback on successful download
  - Test network error scenarios
  - _Requirements: 2.4, 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 11. Cross-browser compatibility testing
  - Test PDF export in Chrome
  - Test PDF export in Firefox
  - Test PDF export in Safari
  - Test PDF export in Edge
  - Verify consistent behavior across all browsers
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 12. Clean up old PDF generation code
  - Remove `html2canvas` dependency from package.json
  - Remove `jsPDF` dependency from package.json
  - Remove any remaining references to old PDF generation code
  - Run `npm install` to update dependencies
  - _Requirements: 1.1, 1.2, 1.3_
