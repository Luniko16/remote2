# Design Document

## Overview

This design document outlines the implementation of a text-based PDF export feature to replace the current screenshot-based approach. The solution will use Puppeteer on the server-side to render HTML to PDF, ensuring high-quality, selectable text output that is ATS-compatible and maintains the visual fidelity of the resume templates.

## Architecture

### High-Level Architecture

```
Client (Browser)                    Server (Next.js)
┌─────────────────┐                ┌──────────────────────┐
│ ResumePreview   │                │ generate-pdf-action  │
│                 │                │                      │
│ 1. User clicks  │   HTTP POST    │ 2. Receive HTML +   │
│    PDF button   │───────────────>│    resume data       │
│                 │                │                      │
│ 2. Send HTML +  │                │ 3. Launch Puppeteer  │
│    resume data  │                │    headless browser  │
│                 │                │                      │
│ 5. Receive PDF  │<───────────────│ 4. Render HTML to    │
│    base64       │   Response     │    PDF with proper   │
│                 │                │    formatting        │
│ 6. Download PDF │                │                      │
│    file         │                │ 5. Return PDF as     │
└─────────────────┘                │    base64 string     │
                                   └──────────────────────┘
```

### Technology Choice: Puppeteer

We will use **Puppeteer** for server-side PDF generation because:

1. **High Fidelity**: Puppeteer uses Chromium's rendering engine, ensuring the PDF looks exactly like the browser preview
2. **Text-Based Output**: Generates proper PDFs with selectable, searchable text
3. **CSS Support**: Full support for modern CSS including flexbox, grid, custom fonts, and colors
4. **Page Break Control**: Supports CSS page-break properties for multi-page documents
5. **Proven Solution**: Widely used in production environments for PDF generation
6. **Next.js Compatible**: Works well with Next.js server actions

### Alternative Considered: jsPDF with html2pdf

**Rejected** because:
- Limited CSS support (no flexbox, grid)
- Requires significant HTML restructuring
- Less accurate rendering compared to browser
- More complex to maintain template compatibility

## Components and Interfaces

### 1. Server Action: `generatePdf`

**File**: `src/app/actions/generate-pdf-action.ts`

**Purpose**: Server-side function that receives HTML content and resume data, uses Puppeteer to render it to PDF, and returns the PDF as a base64 string.

**Interface**:
```typescript
export async function generatePdf(input: GeneratePdfInput): Promise<string>

interface GeneratePdfInput {
  htmlContent: string;      // Complete HTML with styles
  resumeData: ResumeData;   // Resume data for metadata
}

// Returns: base64-encoded PDF string
```

**Implementation Details**:
- Launch Puppeteer in headless mode
- Set page size to A4 (210mm x 297mm)
- Configure margins (top: 15mm, right: 15mm, bottom: 15mm, left: 15mm)
- Set HTML content with proper encoding
- Wait for fonts to load
- Generate PDF with options:
  - `format: 'A4'`
  - `printBackground: true` (to include colors)
  - `preferCSSPageSize: false`
  - `displayHeaderFooter: false`
- Convert PDF buffer to base64
- Close browser instance
- Return base64 string

**Error Handling**:
- Wrap in try-catch block
- Log errors to console
- Throw descriptive error messages
- Ensure browser instance is always closed (finally block)

### 2. Client Component: `ResumePreview` (Modified)

**File**: `src/components/resume-preview.tsx`

**Changes**:
- Replace `exportAsPdf` function to call new server action
- Remove `html2canvas` and `jsPDF` imports
- Import new `generatePdf` server action
- Update loading states and error handling

**New `exportAsPdf` Implementation**:
```typescript
const exportAsPdf = async () => {
  setIsPdfLoading(true);
  
  try {
    // Get HTML content without cover letter
    const htmlContent = getHtmlContent(false);
    
    // Call server action
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
```

### 3. HTML Content Generator: `getHtmlContent` (Enhanced)

**File**: `src/components/resume-preview.tsx` (existing function, enhanced)

**Enhancements**:
- Add PDF-specific CSS for page breaks
- Ensure proper font loading
- Add print-specific styles
- Optimize for A4 page size

**Enhanced CSS**:
```css
@page {
  size: A4;
  margin: 15mm;
}

body {
  margin: 0;
  padding: 0;
  font-family: ${resumeData.style.font || 'Inter, sans-serif'};
  background-color: #ffffff;
  color: #374151;
}

/* Prevent page breaks inside elements */
h1, h2, h3, h4, h5, h6 {
  page-break-after: avoid;
  break-after: avoid;
}

section {
  page-break-inside: avoid;
  break-inside: avoid;
}

/* Allow page breaks between sections if needed */
section + section {
  page-break-before: auto;
  break-before: auto;
}

/* Ensure experience and education items don't break */
.experience-item, .education-item {
  page-break-inside: avoid;
  break-inside: avoid;
}
```

### 4. Template Components (Minor Updates)

**Files**: 
- `src/components/templates/professional-template.tsx`
- `src/components/templates/modern-template.tsx`
- `src/components/templates/creative-template.tsx`

**Changes**:
- Add CSS classes for page break control
- Ensure all inline styles are PDF-compatible
- Add wrapper classes for experience and education items

**Example**:
```tsx
<div className="experience-item" style={{ marginBottom: '15px' }}>
  {/* existing content */}
</div>
```

## Data Models

### Input Data Structure

```typescript
interface GeneratePdfInput {
  htmlContent: string;      // Complete HTML document with embedded styles
  resumeData: ResumeData;   // Full resume data object
}
```

### Output Data Structure

```typescript
// Returns: string (base64-encoded PDF)
```

### Resume Data Structure (Existing)

```typescript
type ResumeData = {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  summary: string;
  coverLetter?: string;
  template: Template;
  style: {
    color: string;
    font: string;
  };
};
```

## Error Handling

### Server-Side Errors

1. **Puppeteer Launch Failure**
   - Error: Browser fails to launch
   - Handling: Log error, throw descriptive message
   - User Message: "PDF generation service unavailable. Please try again later."

2. **HTML Rendering Failure**
   - Error: Invalid HTML or CSS causes rendering issues
   - Handling: Log error with HTML snippet, throw error
   - User Message: "Failed to render resume. Please check your content."

3. **PDF Generation Failure**
   - Error: Puppeteer fails to generate PDF
   - Handling: Log error, ensure browser cleanup, throw error
   - User Message: "Failed to generate PDF. Please try again."

4. **Memory/Timeout Issues**
   - Error: Process takes too long or runs out of memory
   - Handling: Set timeout (30 seconds), cleanup resources
   - User Message: "PDF generation timed out. Please try again."

### Client-Side Errors

1. **Network Failure**
   - Error: Server action call fails
   - Handling: Catch error, display toast notification
   - User Message: "Network error. Please check your connection."

2. **Base64 Decoding Failure**
   - Error: Invalid base64 string received
   - Handling: Catch error, log issue, display toast
   - User Message: "Failed to process PDF. Please try again."

3. **Download Failure**
   - Error: Browser blocks download or file-saver fails
   - Handling: Catch error, suggest manual download
   - User Message: "Failed to download PDF. Please check browser settings."

### Error Recovery

- All errors display user-friendly toast notifications
- Loading states are always cleared in finally blocks
- Browser instances are always closed to prevent memory leaks
- Detailed errors are logged to console for debugging

## Testing Strategy

### Unit Tests

1. **Server Action Tests**
   - Test PDF generation with valid HTML
   - Test error handling with invalid HTML
   - Test browser cleanup on errors
   - Test base64 encoding

2. **Client Component Tests**
   - Test PDF export button click
   - Test loading state management
   - Test error toast display
   - Test successful download trigger

### Integration Tests

1. **End-to-End PDF Generation**
   - Test complete flow from button click to download
   - Verify PDF contains correct content
   - Verify text is selectable
   - Verify formatting matches preview

2. **Template Compatibility**
   - Test PDF generation with Professional template
   - Test PDF generation with Modern template
   - Test PDF generation with Creative template
   - Verify all templates render correctly

3. **Multi-Page Support**
   - Test resume with content spanning multiple pages
   - Verify page breaks occur at appropriate locations
   - Verify no content is cut off

### Manual Testing

1. **Visual Verification**
   - Compare PDF output to browser preview
   - Verify colors, fonts, and spacing
   - Check alignment and layout

2. **Text Selection**
   - Open PDF in multiple PDF readers
   - Verify text can be selected and copied
   - Verify text search works

3. **ATS Compatibility**
   - Test PDF with ATS parsing tools
   - Verify text extraction works correctly
   - Verify formatting doesn't break parsing

4. **Cross-Browser Testing**
   - Test export from Chrome, Firefox, Safari, Edge
   - Verify consistent behavior across browsers

5. **File Size Verification**
   - Check PDF file sizes for typical resumes
   - Verify files are under 2MB
   - Test with different content lengths

### Performance Testing

1. **Generation Speed**
   - Measure time from button click to download
   - Target: < 5 seconds for typical resume
   - Test with varying content lengths

2. **Memory Usage**
   - Monitor server memory during PDF generation
   - Verify browser instances are properly cleaned up
   - Test concurrent PDF generation requests

3. **Error Rate**
   - Monitor error rates in production
   - Set up alerts for high error rates
   - Track common failure scenarios

## Implementation Notes

### Dependencies

**New Dependencies**:
```json
{
  "puppeteer": "^22.0.0"
}
```

**Existing Dependencies** (no changes):
- `file-saver`: For triggering downloads
- `next`: For server actions

### Configuration

**Puppeteer Configuration**:
```typescript
const browser = await puppeteer.launch({
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu'
  ]
});
```

**PDF Options**:
```typescript
const pdfOptions = {
  format: 'A4' as const,
  printBackground: true,
  preferCSSPageSize: false,
  displayHeaderFooter: false,
  margin: {
    top: '15mm',
    right: '15mm',
    bottom: '15mm',
    left: '15mm'
  }
};
```

### Deployment Considerations

1. **Vercel Deployment**
   - Puppeteer works on Vercel with `@sparticuz/chromium` package
   - May need to use `puppeteer-core` with bundled Chromium
   - Consider serverless function timeout limits (10s on hobby, 60s on pro)

2. **Alternative: Puppeteer in Docker**
   - If deploying to custom server, use standard Puppeteer
   - Ensure Chromium dependencies are installed
   - Configure proper memory limits

3. **Fallback Strategy**
   - If Puppeteer fails, could fall back to client-side generation
   - Display warning about reduced quality
   - Log failures for monitoring

### Font Loading

To ensure custom fonts render correctly:

1. **Google Fonts**: Include in HTML head
2. **Wait for Fonts**: Use `page.evaluateHandle` to wait for fonts
3. **Font Embedding**: Puppeteer automatically embeds fonts in PDF

```typescript
// Wait for fonts to load
await page.evaluateHandle('document.fonts.ready');
```

### Security Considerations

1. **Input Sanitization**: HTML content should already be sanitized (from React components)
2. **Resource Limits**: Set timeout and memory limits for Puppeteer
3. **Sandboxing**: Run Puppeteer with `--no-sandbox` only in trusted environments
4. **Rate Limiting**: Consider adding rate limiting to prevent abuse

## Migration Path

### Phase 1: Implementation
1. Install Puppeteer dependency
2. Create new `generate-pdf-action.ts` server action
3. Update `ResumePreview` component to use new action
4. Add PDF-specific CSS to templates

### Phase 2: Testing
1. Test with all three templates
2. Verify text selection and ATS compatibility
3. Test multi-page resumes
4. Cross-browser testing

### Phase 3: Deployment
1. Deploy to staging environment
2. Monitor error rates and performance
3. Gather user feedback
4. Deploy to production

### Phase 4: Cleanup
1. Remove `html2canvas` and `jsPDF` dependencies
2. Remove old PDF generation code
3. Update documentation

## Performance Optimization

1. **Browser Instance Reuse**: Consider keeping browser instance alive between requests (with proper cleanup)
2. **Caching**: Cache generated PDFs for identical content (optional)
3. **Compression**: Puppeteer automatically optimizes PDF size
4. **Lazy Loading**: Only load Puppeteer when PDF export is requested

## Accessibility

1. **PDF Metadata**: Include title, author, and subject metadata
2. **Tagged PDF**: Puppeteer generates tagged PDFs by default
3. **Text Selection**: Ensure all text is selectable
4. **Screen Reader Compatibility**: PDF structure should be screen reader friendly
