/**
 * Test script for multi-page PDF generation
 * This script tests PDF generation with content spanning multiple pages
 * 
 * Run with: npx tsx scripts/test-multipage-pdf.ts
 */

import { generatePdf } from '../src/app/actions/generate-pdf-action';
import type { ResumeData } from '../src/lib/types';
import * as fs from 'fs';
import * as path from 'path';

// Create extensive resume data that will span multiple pages
const createMultiPageResumeData = (): ResumeData => ({
  personal: {
    fullName: 'Alexandra Johnson',
    email: 'alexandra.johnson@example.com',
    phone: '+1 (555) 987-6543',
    address: 'Seattle, WA',
    jobTitle: 'Principal Software Architect',
    linkedin: 'linkedin.com/in/alexandrajohnson',
    portfolio: 'alexandrajohnson.dev'
  },
  experience: [
    {
      id: '1',
      company: 'Tech Giants Inc',
      jobRole: 'Principal Software Architect',
      duration: 'Jan 2021 - Present',
      description: `Led architecture design for cloud-native microservices platform serving 10M+ users
Designed and implemented event-driven architecture using Apache Kafka and AWS services
Established engineering best practices and coding standards across 5 development teams
Mentored 15+ senior engineers and conducted technical interviews for architect positions
Reduced infrastructure costs by 40% through optimization and right-sizing initiatives
Implemented comprehensive monitoring and observability using Datadog and Grafana
Led migration from monolithic architecture to microservices, improving deployment frequency by 300%
Collaborated with product and business teams to align technical strategy with business goals`
    },
    {
      id: '2',
      company: 'Cloud Solutions Corp',
      jobRole: 'Senior Software Engineer',
      duration: 'Mar 2018 - Dec 2020',
      description: `Developed and maintained RESTful APIs serving 5M+ daily requests
Built real-time data processing pipelines using Apache Spark and AWS Lambda
Implemented CI/CD pipelines using Jenkins, Docker, and Kubernetes
Led development of customer-facing dashboard using React, TypeScript, and Redux
Optimized database queries reducing response time by 60%
Conducted code reviews and provided technical mentorship to junior developers
Participated in on-call rotation and resolved production incidents
Collaborated with DevOps team to improve deployment processes and system reliability`
    },
    {
      id: '3',
      company: 'StartUp Innovations',
      jobRole: 'Full Stack Developer',
      duration: 'Jun 2015 - Feb 2018',
      description: `Built full-stack web applications using Node.js, Express, React, and PostgreSQL
Designed and implemented RESTful APIs and GraphQL endpoints
Developed responsive user interfaces with modern CSS frameworks
Implemented authentication and authorization using JWT and OAuth 2.0
Integrated third-party APIs including Stripe, SendGrid, and Twilio
Wrote comprehensive unit and integration tests achieving 85% code coverage
Participated in agile development process with 2-week sprints
Contributed to technical documentation and knowledge sharing sessions`
    },
    {
      id: '4',
      company: 'Digital Agency Pro',
      jobRole: 'Junior Web Developer',
      duration: 'Aug 2013 - May 2015',
      description: `Developed client websites using HTML, CSS, JavaScript, and WordPress
Implemented responsive designs ensuring cross-browser compatibility
Optimized website performance and SEO
Collaborated with designers to translate mockups into functional websites
Maintained and updated existing client websites
Provided technical support and training to clients
Participated in team meetings and project planning sessions`
    }
  ],
  education: [
    {
      id: '1',
      school: 'Massachusetts Institute of Technology',
      degree: 'Master of Science',
      field: 'Computer Science',
      duration: '2011 - 2013',
      gpa: '3.9',
      description: 'Specialized in Distributed Systems and Machine Learning. Thesis: "Scalable Real-Time Data Processing in Cloud Environments"'
    },
    {
      id: '2',
      school: 'University of Washington',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      duration: '2007 - 2011',
      gpa: '3.8',
      description: 'Graduated Summa Cum Laude. Dean\'s List all semesters. President of Computer Science Club.'
    }
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'Go',
    'React',
    'Node.js',
    'Express',
    'Next.js',
    'Vue.js',
    'Angular',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'AWS',
    'Azure',
    'GCP',
    'Docker',
    'Kubernetes',
    'Terraform',
    'Jenkins',
    'GitLab CI',
    'Apache Kafka',
    'RabbitMQ',
    'GraphQL',
    'REST APIs',
    'Microservices',
    'System Design',
    'Architecture Patterns',
    'Agile/Scrum',
    'TDD/BDD',
    'CI/CD'
  ],
  summary: `Accomplished Principal Software Architect with 10+ years of experience designing and building scalable, high-performance systems. Proven track record of leading technical initiatives, mentoring engineering teams, and delivering complex projects on time and within budget. Expert in cloud-native architectures, microservices, and distributed systems. Passionate about engineering excellence, continuous improvement, and fostering collaborative team environments. Strong communicator with ability to translate technical concepts to non-technical stakeholders and align technology strategy with business objectives.`,
  template: 'professional',
  style: {
    color: 'hsl(220, 19%, 38%)',
    font: 'Inter, sans-serif'
  }
});

// Generate HTML content
function generateHtmlContent(resumeData: ResumeData): string {
  const { personal, summary, experience, education, skills, style } = resumeData;
  const accentColor = style?.color || 'hsl(220, 19%, 38%)';
  const fontFamily = style?.font || 'Inter, sans-serif';

  const templateHtml = `
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
            ${edu.gpa ? `<p style="font-size: 12px; margin: 2px 0;">GPA: ${edu.gpa}</p>` : ''}
            ${edu.description ? `<p style="font-size: 12px; margin: 2px 0;">${edu.description}</p>` : ''}
          </div>
        `).join('')}
      </section>

      <section style="margin-bottom: 20px;">
        <h2 style="color: ${accentColor}; font-size: 18px; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px; margin-bottom: 10px;">Skills</h2>
        <p style="margin-top: 10px;">${skills.join(', ')}</p>
      </section>
    </div>
  `;

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
      font-family: ${fontFamily};
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
      <title>Resume - ${personal.fullName}</title>
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

async function runMultiPageTest() {
  console.log('🚀 Starting Multi-Page PDF Generation Test\n');
  console.log('=' .repeat(60));
  
  const outputDir = path.join(process.cwd(), 'test-output');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`✅ Created output directory: ${outputDir}\n`);
  }

  console.log(`\n📄 Testing Multi-Page Resume`);
  console.log('-'.repeat(60));
  
  try {
    // Create test resume data with extensive content
    const resumeData = createMultiPageResumeData();
    console.log(`   ✓ Created multi-page test resume data`);
    console.log(`   ✓ Experience entries: ${resumeData.experience.length}`);
    console.log(`   ✓ Education entries: ${resumeData.education.length}`);
    console.log(`   ✓ Skills: ${resumeData.skills.length}`);
    
    // Generate HTML content
    const htmlContent = generateHtmlContent(resumeData);
    console.log(`   ✓ Generated HTML content (${htmlContent.length} characters)`);
    
    // Save HTML for inspection
    const htmlPath = path.join(outputDir, 'multipage-resume.html');
    fs.writeFileSync(htmlPath, htmlContent);
    console.log(`   ✓ Saved HTML to: ${htmlPath}`);
    
    // Generate PDF
    const startTime = Date.now();
    const base64Pdf = await generatePdf({ htmlContent, resumeData });
    const duration = Date.now() - startTime;
    console.log(`   ✓ Generated PDF in ${duration}ms`);
    
    // Convert base64 to buffer and save
    const pdfBuffer = Buffer.from(base64Pdf, 'base64');
    const pdfPath = path.join(outputDir, 'multipage-resume.pdf');
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
    } else {
      console.log(`   ✗ PDF generation failed - empty result`);
      throw new Error('PDF generation failed');
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Test Summary');
    console.log('='.repeat(60));
    console.log(`✅ Multi-page PDF test passed`);
    console.log(`\n📁 Output file: ${pdfPath}`);
    console.log('\n✨ Manual Verification Steps:');
    console.log('   1. Open the PDF file in a PDF reader');
    console.log('   2. Verify the PDF has multiple pages (should be 2-3 pages)');
    console.log('   3. Verify page breaks occur at logical section boundaries');
    console.log('   4. Verify no content is cut off between pages');
    console.log('   5. Verify experience items are not split across pages');
    console.log('   6. Verify education items are not split across pages');
    console.log('   7. Verify consistent margins across all pages');
    console.log('   8. Verify text is selectable on all pages');
    console.log('   9. Verify formatting is consistent across all pages');
    console.log('   10. Compare with HTML file for visual consistency');
    
    console.log('\n🎉 Test completed successfully! Please perform manual verification.');
    process.exit(0);
    
  } catch (error) {
    console.log(`   ✗ Test failed with error:`);
    console.error(`      ${error instanceof Error ? error.message : String(error)}`);
    console.log('\n⚠️  Test failed. Please review the error above.');
    process.exit(1);
  }
}

// Run the test
runMultiPageTest().catch(error => {
  console.error('Fatal error running test:', error);
  process.exit(1);
});
