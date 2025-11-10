/**
 * Test script for PDF generation with all templates
 * This script tests PDF generation for Professional, Modern, and Creative templates
 * 
 * Run with: npx tsx scripts/test-pdf-generation.ts
 */

import { generatePdf } from '../src/app/actions/generate-pdf-action';
import type { ResumeData } from '../src/lib/types';
import * as fs from 'fs';
import * as path from 'path';

// Sample resume data for testing
const createTestResumeData = (template: 'professional' | 'modern' | 'creative', color: string): ResumeData => ({
  personal: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    jobTitle: 'Senior Software Engineer',
    linkedin: 'linkedin.com/in/johndoe',
    portfolio: 'johndoe.dev'
  },
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      jobRole: 'Senior Software Engineer',
      duration: 'Jan 2020 - Present',
      description: 'Led development of microservices architecture\nImplemented CI/CD pipelines\nMentored junior developers'
    },
    {
      id: '2',
      company: 'StartUp Inc',
      jobRole: 'Software Engineer',
      duration: 'Jun 2017 - Dec 2019',
      description: 'Developed full-stack web applications\nWorked with React, Node.js, and PostgreSQL\nCollaborated with cross-functional teams'
    }
  ],
  education: [
    {
      id: '1',
      school: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      duration: '2013 - 2017',
      gpa: '3.8',
      description: 'Graduated with honors'
    }
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'AWS',
    'Docker',
    'Kubernetes'
  ],
  summary: 'Experienced software engineer with 7+ years of expertise in building scalable web applications. Passionate about clean code, system design, and mentoring.',
  template,
  style: {
    color,
    font: 'Inter, sans-serif'
  }
});

// Generate HTML content similar to how the ResumePreview component does it
function generateHtmlContent(resumeData: ResumeData): string {
  const { template, style } = resumeData;
  
  // Render the appropriate template
  let templateHtml = '';
  
  if (template === 'professional') {
    templateHtml = renderProfessionalTemplate(resumeData);
  } else if (template === 'modern') {
    templateHtml = renderModernTemplate(resumeData);
  } else if (template === 'creative') {
    templateHtml = renderCreativeTemplate(resumeData);
  }

  const googleFonts = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Lato:wght@400;700&family=Merriweather:wght@400;700&family=Roboto:wght@400;500;700&display=swap');
  `;

  const pdfSpecificStyles = `
    @page {
      size: A4;
      margin: 15mm;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: ${style.font || 'Inter, sans-serif'};
      background-color: #ffffff;
      color: #374151;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    h1, h2, h3, h4, h5, h6 {
      page-break-after: avoid;
      break-after: avoid;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    section {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    section + section {
      page-break-before: auto;
      break-before: auto;
    }

    .experience-item,
    .education-item {
      page-break-inside: avoid;
      break-inside: avoid;
      margin-bottom: 15px;
    }

    p {
      orphans: 3;
      widows: 3;
    }

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
      <title>Resume - ${resumeData.personal.fullName}</title>
      <style>
        ${googleFonts}
        ${pdfSpecificStyles}
      </style>
    </head>
    <body>
      <div id="export-wrapper">
        ${templateHtml}
      </div>
    </body>
    </html>
  `;
}

function renderProfessionalTemplate(data: ResumeData): string {
  const { personal, summary, experience, education, skills, style } = data;
  const accentColor = style?.color || 'hsl(220, 19%, 38%)';
  const fontFamily = style?.font || 'Inter, sans-serif';

  return `
    <div style="font-family: ${fontFamily}; color: #374151; font-size: 12px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: ${accentColor}; font-size: 28px; margin: 0; text-transform: uppercase; letter-spacing: 2px;">${personal.fullName}</h1>
        <p style="font-size: 14px; margin: 5px 0;">${personal.jobTitle}</p>
        <p style="font-size: 12px; margin: 0;">
          ${personal.email} | ${personal.phone} | ${personal.address}
        </p>
        <p style="font-size: 12px; margin: 5px 0;">
          LinkedIn: ${personal.linkedin} | Portfolio: ${personal.portfolio}
        </p>
      </div>

      <hr style="border-color: ${accentColor}; border-width: 1px 0 0 0; margin: 20px 0;" />

      <section style="margin-bottom: 20px;">
        <h2 style="color: ${accentColor}; font-size: 18px; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px; margin-bottom: 10px;">Summary</h2>
        <p style="white-space: pre-wrap;">${summary}</p>
      </section>
      
      <section style="margin-bottom: 20px;">
        <h2 style="color: ${accentColor}; font-size: 18px; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px; margin-bottom: 10px;">Experience</h2>
        ${experience.map(exp => `
          <div class="experience-item" style="margin-bottom: 15px;">
            <h3 style="font-size: 14px; font-weight: bold; margin: 0;">${exp.jobRole}</h3>
            <p style="font-size: 12px; font-style: italic; margin: 2px 0;">${exp.company} | ${exp.duration}</p>
            <div style="white-space: pre-wrap; line-height: 1.5;">${exp.description.replace(/\n/g, '<br />')}</div>
          </div>
        `).join('')}
      </section>

      <section style="margin-bottom: 20px;">
        <h2 style="color: ${accentColor}; font-size: 18px; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px; margin-bottom: 10px;">Education</h2>
        ${education.map(edu => `
          <div class="education-item" style="margin-bottom: 15px;">
            <h3 style="font-size: 14px; font-weight: bold; margin: 0;">${edu.school}</h3>
            <p style="font-size: 12px; margin: 2px 0;">${edu.degree} in ${edu.field} (${edu.duration})</p>
          </div>
        `).join('')}
      </section>

      <section style="margin-bottom: 20px;">
        <h2 style="color: ${accentColor}; font-size: 18px; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px; margin-bottom: 10px;">Skills</h2>
        <p style="margin-top: 10px;">${skills.join(', ')}</p>
      </section>
    </div>
  `;
}

function renderModernTemplate(data: ResumeData): string {
  const { personal, summary, experience, education, skills, style } = data;
  const accentColor = style?.color || 'hsl(220, 19%, 38%)';
  const fontFamily = style?.font || 'Inter, sans-serif';

  return `
    <div style="font-family: ${fontFamily}; color: #374151; font-size: 12px; display: flex; gap: 20px;">
      <div style="width: 35%; border-right: 2px solid ${accentColor}; padding-right: 20px;">
        <div style="text-align: left; margin-bottom: 20px;">
          <h1 style="color: ${accentColor}; font-size: 28px; margin: 0; text-transform: uppercase; line-height: 1.2;">${personal.fullName}</h1>
          <p style="font-size: 14px; margin: 5px 0;">${personal.jobTitle}</p>
        </div>
        
        <h2 style="color: ${accentColor}; font-size: 16px; border-bottom: 1px solid ${accentColor}; padding-bottom: 5px; margin-bottom: 10px;">CONTACT</h2>
        <p style="margin-bottom: 5px;">${personal.email}</p>
        <p style="margin-bottom: 5px;">${personal.phone}</p>
        <p style="margin-bottom: 15px;">${personal.address}</p>
        <p style="margin-bottom: 5px;">${personal.linkedin}</p>
        <p style="margin-bottom: 15px;">${personal.portfolio}</p>

        <section style="margin-bottom: 20px;">
          <h2 style="color: ${accentColor}; font-size: 16px; border-bottom: 1px solid ${accentColor}; padding-bottom: 5px; margin-bottom: 10px;">SKILLS</h2>
          <ul style="list-style-type: none; padding: 0;">
            ${skills.map(skill => `<li style="margin-bottom: 5px;">${skill}</li>`).join('')}
          </ul>
        </section>

        <section style="margin-bottom: 20px;">
          <h2 style="color: ${accentColor}; font-size: 16px; border-bottom: 1px solid ${accentColor}; padding-bottom: 5px; margin-bottom: 10px;">EDUCATION</h2>
          ${education.map(edu => `
            <div class="education-item" style="margin-bottom: 15px;">
              <h3 style="font-size: 13px; font-weight: bold; margin: 0;">${edu.school}</h3>
              <p style="margin: 2px 0;">${edu.degree}</p>
              <p style="margin: 2px 0;">${edu.field}</p>
              <p style="margin: 2px 0;">${edu.duration}</p>
            </div>
          `).join('')}
        </section>
      </div>

      <div style="width: 65%;">
        <section style="margin-bottom: 20px;">
          <h2 style="color: ${accentColor}; font-size: 18px; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px; margin-bottom: 10px;">SUMMARY</h2>
          <p style="white-space: pre-wrap;">${summary}</p>
        </section>
        
        <section style="margin-bottom: 20px;">
          <h2 style="color: ${accentColor}; font-size: 18px; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px; margin-bottom: 10px;">EXPERIENCE</h2>
          ${experience.map(exp => `
            <div class="experience-item" style="margin-bottom: 15px;">
              <h3 style="font-size: 14px; font-weight: bold; margin: 0;">${exp.jobRole}</h3>
              <p style="font-size: 12px; font-style: italic; margin: 2px 0;">${exp.company} | ${exp.duration}</p>
              <div style="white-space: pre-wrap; line-height: 1.5;">${exp.description.replace(/\n/g, '<br />')}</div>
            </div>
          `).join('')}
        </section>
      </div>
    </div>
  `;
}

function renderCreativeTemplate(data: ResumeData): string {
  const { personal, summary, experience, education, skills, style } = data;
  const accentColor = style?.color || 'hsl(220, 19%, 38%)';
  const fontFamily = style?.font || 'Inter, sans-serif';
  const accentColorLight = accentColor.replace(')', ', 0.1)').replace('hsl', 'hsla');

  return `
    <div style="font-family: ${fontFamily}; color: #374151; font-size: 12px;">
      <div style="background-color: ${accentColorLight}; padding: 30px; text-align: left; margin-bottom: 20px; border-left: 5px solid ${accentColor};">
        <h1 style="color: ${accentColor}; font-size: 32px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">${personal.fullName}</h1>
        <p style="font-size: 16px; margin: 5px 0 0 0; color: #555;">${personal.jobTitle}</p>
      </div>
      
      <div style="display: flex; gap: 20px; padding: 0 30px;">
        <div style="width: 65%;">
          <section style="margin-bottom: 20px;">
            <h2 style="color: ${accentColor}; font-size: 18px; margin-bottom: 10px;">ABOUT ME</h2>
            <p style="white-space: pre-wrap;">${summary}</p>
          </section>
          
          <section style="margin-bottom: 20px;">
            <h2 style="color: ${accentColor}; font-size: 18px; margin-bottom: 10px;">WORK EXPERIENCE</h2>
            ${experience.map(exp => `
              <div class="experience-item" style="margin-bottom: 15px;">
                <h3 style="font-size: 14px; font-weight: bold; margin: 0;">${exp.jobRole}</h3>
                <p style="font-size: 12px; font-style: italic; margin: 2px 0;">${exp.company} | ${exp.duration}</p>
                <div style="white-space: pre-wrap; line-height: 1.5;">${exp.description.replace(/\n/g, '<br />')}</div>
              </div>
            `).join('')}
          </section>
        </div>
        
        <div style="width: 35%; border-left: 1px solid #ddd; padding-left: 20px;">
          <h2 style="color: ${accentColor}; font-size: 16px; margin-bottom: 10px;">CONTACT</h2>
          <p style="margin-bottom: 5px;">${personal.email}</p>
          <p style="margin-bottom: 5px;">${personal.phone}</p>
          <p style="margin-bottom: 15px;">${personal.address}</p>
          <p style="margin-bottom: 5px;">${personal.linkedin}</p>
          <p style="margin-bottom: 15px;">${personal.portfolio}</p>

          <section style="margin-bottom: 20px;">
            <h2 style="color: ${accentColor}; font-size: 16px; margin-bottom: 10px;">EDUCATION</h2>
            ${education.map(edu => `
              <div class="education-item" style="margin-bottom: 15px;">
                <h3 style="font-size: 13px; font-weight: bold; margin: 0;">${edu.school}</h3>
                <p style="margin: 2px 0;">${edu.degree} in ${edu.field}</p>
                <p style="margin: 2px 0;">${edu.duration}</p>
              </div>
            `).join('')}
          </section>

          <section style="margin-bottom: 20px;">
            <h2 style="color: ${accentColor}; font-size: 16px; margin-bottom: 10px;">SKILLS</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 5px;">
              ${skills.map(skill => `<span style="background-color: #eee; padding: 3px 8px; border-radius: 4px; font-size: 11px;">${skill}</span>`).join('')}
            </div>
          </section>
        </div>
      </div>
    </div>
  `;
}

// Test configuration
const testConfigs = [
  { template: 'professional' as const, color: 'hsl(220, 19%, 38%)', name: 'Professional (Blue)' },
  { template: 'modern' as const, color: 'hsl(142, 71%, 45%)', name: 'Modern (Green)' },
  { template: 'creative' as const, color: 'hsl(271, 76%, 53%)', name: 'Creative (Purple)' }
];

async function runTests() {
  console.log('🚀 Starting PDF Generation Tests\n');
  console.log('=' .repeat(60));
  
  const outputDir = path.join(process.cwd(), 'test-output');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`✅ Created output directory: ${outputDir}\n`);
  }

  let passedTests = 0;
  let failedTests = 0;

  for (const config of testConfigs) {
    console.log(`\n📄 Testing ${config.name} Template`);
    console.log('-'.repeat(60));
    
    try {
      // Create test resume data
      const resumeData = createTestResumeData(config.template, config.color);
      console.log(`   ✓ Created test resume data`);
      
      // Generate HTML content
      const htmlContent = generateHtmlContent(resumeData);
      console.log(`   ✓ Generated HTML content (${htmlContent.length} characters)`);
      
      // Save HTML for inspection
      const htmlPath = path.join(outputDir, `${config.template}-template.html`);
      fs.writeFileSync(htmlPath, htmlContent);
      console.log(`   ✓ Saved HTML to: ${htmlPath}`);
      
      // Generate PDF
      const startTime = Date.now();
      const base64Pdf = await generatePdf({ htmlContent, resumeData });
      const duration = Date.now() - startTime;
      console.log(`   ✓ Generated PDF in ${duration}ms`);
      
      // Convert base64 to buffer and save
      const pdfBuffer = Buffer.from(base64Pdf, 'base64');
      const pdfPath = path.join(outputDir, `${config.template}-template.pdf`);
      fs.writeFileSync(pdfPath, pdfBuffer);
      
      const fileSizeKB = (pdfBuffer.length / 1024).toFixed(2);
      const fileSizeMB = (pdfBuffer.length / (1024 * 1024)).toFixed(2);
      console.log(`   ✓ Saved PDF to: ${pdfPath}`);
      console.log(`   ✓ File size: ${fileSizeKB} KB (${fileSizeMB} MB)`);
      
      // Verify file size is under 2MB
      if (pdfBuffer.length < 2 * 1024 * 1024) {
        console.log(`   ✓ File size is under 2MB limit`);
      } else {
        console.log(`   ⚠️  Warning: File size exceeds 2MB limit`);
      }
      
      // Basic validation
      if (base64Pdf && base64Pdf.length > 0) {
        console.log(`   ✓ PDF generated successfully`);
        passedTests++;
      } else {
        console.log(`   ✗ PDF generation failed - empty result`);
        failedTests++;
      }
      
    } catch (error) {
      console.log(`   ✗ Test failed with error:`);
      console.error(`      ${error instanceof Error ? error.message : String(error)}`);
      failedTests++;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Test Summary');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${passedTests}/${testConfigs.length}`);
  console.log(`❌ Failed: ${failedTests}/${testConfigs.length}`);
  console.log(`\n📁 Output directory: ${outputDir}`);
  console.log('\n✨ Manual Verification Steps:');
  console.log('   1. Open each PDF file in the test-output directory');
  console.log('   2. Verify text is selectable (try selecting and copying text)');
  console.log('   3. Verify colors match the template (Blue, Green, Purple)');
  console.log('   4. Verify fonts are rendered correctly');
  console.log('   5. Verify layout and spacing are preserved');
  console.log('   6. Compare PDFs with the HTML files for visual consistency');
  
  if (failedTests === 0) {
    console.log('\n🎉 All tests passed! Please perform manual verification.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Please review the errors above.');
    process.exit(1);
  }
}

// Run the tests
runTests().catch(error => {
  console.error('Fatal error running tests:', error);
  process.exit(1);
});
