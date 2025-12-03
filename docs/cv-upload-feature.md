# CV Upload Feature

## Overview
The CV Upload feature allows users to upload their existing CV/resume in various formats (PDF, DOCX, or images) and automatically extract the information using AI to populate the resume builder form.

## How It Works

### 1. File Upload
Users can upload their CV in the following formats:
- **PDF** (.pdf)
- **Word Documents** (.doc, .docx)
- **Images** (.png, .jpg, .jpeg)

### 2. AI Extraction
The uploaded file is processed by Google's Gemini AI model which:
- Reads the content from the file
- Extracts structured information including:
  - Personal information (name, email, phone, address, job title, LinkedIn, portfolio)
  - Professional summary
  - Work experience (company, role, duration, description)
  - Education (school, degree, field, duration)
  - Skills
  - References

### 3. Form Population
The extracted data is automatically populated into the resume builder form, allowing users to:
- Review and edit the extracted information
- Choose a different template
- Customize colors and fonts
- Export to PDF, DOCX, or HTML

## Components

### CvUpload Component
Located at: `src/components/cv-upload.tsx`

Features:
- Drag-and-drop file upload
- Visual feedback (loading, success, error states)
- File type validation
- Toast notifications

### AI Flow
Located at: `src/ai/flows/extract-cv-data.ts`

Uses Gemini 1.5 Flash model to:
- Parse CV text content
- Structure data according to schema
- Return JSON formatted data

### Server Action
Located at: `src/app/actions/extract-cv-action.ts`

Handles:
- Calling the AI flow
- Adding unique IDs to array items
- Error handling
- Response formatting

## Usage

1. Navigate to the resume builder
2. Look for the "Upload Existing CV" card at the top
3. Click to upload or drag and drop your CV file
4. Wait for AI processing (usually 5-10 seconds)
5. Review the populated form and make any necessary edits
6. Continue with template selection and customization

## Tips for Best Results

- Use a clear, well-formatted CV
- Ensure text is readable (not scanned images with poor quality)
- Standard CV formats work best
- Include all relevant sections in your original CV

## Technical Details

### Supported File Types
- `application/pdf`
- `application/msword`
- `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- `image/*`

### AI Model
- **Model**: Google Gemini 1.5 Flash
- **Output Format**: Structured JSON
- **Schema Validation**: Zod

### Error Handling
- File type validation
- AI extraction errors
- Network errors
- User-friendly error messages via toast notifications

## Future Enhancements

- Support for more file formats
- Batch processing multiple CVs
- CV comparison feature
- Automatic skill categorization
- Industry-specific extraction templates
