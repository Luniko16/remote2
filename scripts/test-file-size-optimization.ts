/**
 * Test script for PDF file size and optimization
 * This script tests PDF generation with varying resume lengths and verifies file sizes
 * 
 * Run with: npx tsx scripts/test-file-size-optimization.ts
 */

import { generatePdf } from '../src/app/actions/generate-pdf-action';
import type { ResumeData, Experience, Education } from '../src/lib/types';
import * as fs from 'fs';
import * as path from 'path';

// Helper to create experience entries
function createExperienceEntry(index: number): Experience {
  return {
    id: `exp-${index}`,
    company: `Company ${index}`,
    jobRole: `Software Engineer Level ${index}`,
    duration: `Jan ${2020 - index} - Dec ${2021 - index}`,
    description: `Led development of scalable microservices architecture using modern technologies\nImplemented comprehensive CI/CD pipelines with automated testing and deployment\nMentored team of ${3 + index} junior developers and conducted code reviews\nCollaborated with product managers to define technical requirements\nOptimized application performance resulting in 40% faster load times`
  };
}

// Helper to create education entries
function createEducationEntry(index: number): Education {
  return {
    id: `edu-${index}`,
    school: `University ${index}`,
    degree: index === 0 ? 'Bachelor of Science' : 'Master of Science',
    field: 'Computer Science',
    duration: `${2013 + index * 4} - ${2017 + index * 4}`,
    gpa: '3.8',
    description: 'Graduated with honors, Dean\'s List'
  };
}

// Create test resume with varying content lengths
function createTestResume(
  experienceCount: number,
  educationCount: number,
  skillsCount: number,
  template: 'professional' | 'modern' | 'creative'
): ResumeData {
  const experiences: Experience[] = [];
  for (let i = 0; i < experienceCount; i++) {
    experiences.push(createExperienceEntry(i));
  }

  const educations: Education[] = [];
  for (let i = 0; i < educationCount; i++) {
    educations.push(createEducationEntry(i));
  }

  const skills: string[] = [];
  const baseSkills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java',
    'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'Redis',
    'GraphQL', 'REST APIs', 'Microservices', 'CI/CD', 'Git', 'Agile',
    'TDD', 'System Design', 'Leadership', 'Mentoring'
  ];
  for (let i = 0; i < Math.min(skillsCount, baseSkills.length); i++) {
    skills.push(baseSkills[i]);
  }

  return {
    personal: {
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      address: 'New York, NY',
      jobTitle: 'Senior Full Stack Developer',
      linkedin: 'linkedin.com/in/janesmith',
      portfolio: 'janesmith.dev'
    },
    experience: experiences,
    education: educations,
    skills,
    summary: 'Highly skilled software engineer with extensive experience in building scalable web applications and leading development teams. Passionate about clean code, system architecture, and continuous learning. Proven track record of delivering high-quality software solutions that drive business value.',
    template,
    style: {
      color: 'hsl(220, 19%, 38%)',
      font: 'Inter, sans-serif'
    }
  };
}

// Generate HTML content (simplified version)
function generateHtmlContent(resumeData: ResumeData): string {
  const { personal, summary, experience, education, skills, style, template } = resumeData;
  const accentColor = style?.color || 'hsl(220, 19%, 38%)';
  const fontFamily = style?.font || 'Inter, sans-serif';

  let templateHtml = '';
  
  if (template === 'professional') {
    templateHtml = `
      <div style="font-family: ${fontFamily}; color: #374151; font-size: 12px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: ${accentColor}; font-size: 28px; margin: 0;">${personal.fullName}</h1>
          <p style="font-size: 14px; margin: 5px 0;">${personal.jobTitle}</p>
          <p style="font-size: 12px; margin: 0;">${personal.email} | ${personal.phone} | ${personal.address}</p>
        </div>
        <section style="margin-bottom: 20px;">
          <h2 style="color: ${accentColor}; font-size: 18px; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px;">Summary</h2>
          <p>${summary}</p>
        </section>
        <section style="margin-bottom: 20px;">
          <h2 style="color: ${accentColor}; font-size: 18px; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px;">Experience</h2>
          ${experience.map(exp => `
            <div class="experience-item" style="margin-bottom: 15px;">
              <h3 style="font-size: 14px; font-weight: bold;">${exp.jobRole}</h3>
              <p style="font-size: 12px; font-style: italic;">${exp.company} | ${exp.duration}</p>
              <div>${exp.description.replace(/\n/g, '<br />')}</div>
            </div>
          `).join('')}
        </section>
        <section style="margin-bottom: 20px;">
          <h2 style="color: ${accentColor}; font-size: 18px; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px;">Education</h2>
          ${education.map(edu => `
            <div class="education-item" style="margin-bottom: 15px;">
              <h3 style="font-size: 14px; font-weight: bold;">${edu.school}</h3>
              <p style="font-size: 12px;">${edu.degree} in ${edu.field} (${edu.duration})</p>
            </div>
          `).join('')}
        </section>
        <section>
          <h2 style="color: ${accentColor}; font-size: 18px; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px;">Skills</h2>
          <p>${skills.join(', ')}</p>
        </section>
      </div>
    `;
  } else {
    // Use professional template for all for simplicity
    templateHtml = `
      <div style="font-family: ${fontFamily}; color: #374151; font-size: 12px;">
        <h1 style="color: ${accentColor};">${personal.fullName}</h1>
        <p>${personal.jobTitle}</p>
        <section><h2>Summary</h2><p>${summary}</p></section>
        <section><h2>Experience</h2>${experience.map(exp => `<div class="experience-item"><h3>${exp.jobRole}</h3><p>${exp.company}</p></div>`).join('')}</section>
        <section><h2>Education</h2>${education.map(edu => `<div class="education-item"><h3>${edu.school}</h3></div>`).join('')}</section>
        <section><h2>Skills</h2><p>${skills.join(', ')}</p></section>
      </div>
    `;
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
        @page { size: A4; margin: 15mm; }
        body { margin: 0; padding: 0; font-family: ${fontFamily}; }
        .experience-item, .education-item { page-break-inside: avoid; }
      </style>
    </head>
    <body>${templateHtml}</body>
    </html>
  `;
}

// Test configurations with varying content lengths
const testConfigs = [
  { name: 'Minimal Resume', experience: 1, education: 1, skills: 5, description: 'Entry-level resume' },
  { name: 'Typical Resume', experience: 3, education: 1, skills: 10, description: 'Standard mid-level resume' },
  { name: 'Detailed Resume', experience: 5, education: 2, skills: 15, description: 'Senior-level resume' },
  { name: 'Extensive Resume', experience: 8, education: 2, skills: 20, description: 'Very experienced professional' },
  { name: 'Maximum Resume', experience: 12, education: 3, skills: 22, description: 'Multi-page resume with extensive history' }
];

interface TestResult {
  name: string;
  description: string;
  fileSizeBytes: number;
  fileSizeKB: number;
  fileSizeMB: number;
  generationTimeMs: number;
  experienceCount: number;
  educationCount: number;
  skillsCount: number;
  passedSizeCheck: boolean;
}

async function runTests() {
  console.log('🚀 Starting PDF File Size and Optimization Tests\n');
  console.log('=' .repeat(70));
  
  const outputDir = path.join(process.cwd(), 'test-output');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const results: TestResult[] = [];
  let passedTests = 0;
  let failedTests = 0;

  for (const config of testConfigs) {
    console.log(`\n📄 Testing: ${config.name}`);
    console.log(`   Description: ${config.description}`);
    console.log(`   Content: ${config.experience} experiences, ${config.education} education, ${config.skills} skills`);
    console.log('-'.repeat(70));
    
    try {
      // Create test resume
      const resumeData = createTestResume(
        config.experience,
        config.education,
        config.skills,
        'professional'
      );
      
      // Generate HTML
      const htmlContent = generateHtmlContent(resumeData);
      
      // Generate PDF and measure time
      const startTime = Date.now();
      const base64Pdf = await generatePdf({ htmlContent, resumeData });
      const generationTime = Date.now() - startTime;
      
      // Convert to buffer and save
      const pdfBuffer = Buffer.from(base64Pdf, 'base64');
      const fileName = config.name.toLowerCase().replace(/\s+/g, '-');
      const pdfPath = path.join(outputDir, `${fileName}.pdf`);
      fs.writeFileSync(pdfPath, pdfBuffer);
      
      // Calculate file sizes
      const fileSizeBytes = pdfBuffer.length;
      const fileSizeKB = fileSizeBytes / 1024;
      const fileSizeMB = fileSizeBytes / (1024 * 1024);
      
      // Check if under 2MB limit
      const passedSizeCheck = fileSizeMB < 2.0;
      
      // Store results
      const result: TestResult = {
        name: config.name,
        description: config.description,
        fileSizeBytes,
        fileSizeKB,
        fileSizeMB,
        generationTimeMs: generationTime,
        experienceCount: config.experience,
        educationCount: config.education,
        skillsCount: config.skills,
        passedSizeCheck
      };
      results.push(result);
      
      // Display results
      console.log(`   ✓ PDF generated in ${generationTime}ms`);
      console.log(`   ✓ File size: ${fileSizeKB.toFixed(2)} KB (${fileSizeMB.toFixed(3)} MB)`);
      console.log(`   ✓ Saved to: ${pdfPath}`);
      
      if (passedSizeCheck) {
        console.log(`   ✅ PASSED: File size is under 2MB limit`);
        passedTests++;
      } else {
        console.log(`   ❌ FAILED: File size exceeds 2MB limit (${fileSizeMB.toFixed(3)} MB)`);
        failedTests++;
      }
      
    } catch (error) {
      console.log(`   ❌ Test failed with error:`);
      console.error(`      ${error instanceof Error ? error.message : String(error)}`);
      failedTests++;
    }
  }

  // Generate summary report
  console.log('\n' + '='.repeat(70));
  console.log('📊 File Size Optimization Test Results');
  console.log('='.repeat(70));
  console.log('\n');
  
  // Table header
  console.log('Resume Type'.padEnd(20) + 
              'Size (KB)'.padEnd(12) + 
              'Size (MB)'.padEnd(12) + 
              'Time (ms)'.padEnd(12) + 
              'Status');
  console.log('-'.repeat(70));
  
  // Table rows
  results.forEach(result => {
    const status = result.passedSizeCheck ? '✅ PASS' : '❌ FAIL';
    console.log(
      result.name.padEnd(20) +
      result.fileSizeKB.toFixed(2).padEnd(12) +
      result.fileSizeMB.toFixed(3).padEnd(12) +
      result.generationTimeMs.toString().padEnd(12) +
      status
    );
  });
  
  console.log('\n' + '='.repeat(70));
  console.log('📈 Statistics');
  console.log('='.repeat(70));
  
  if (results.length > 0) {
    const avgSize = results.reduce((sum, r) => sum + r.fileSizeKB, 0) / results.length;
    const maxSize = Math.max(...results.map(r => r.fileSizeKB));
    const minSize = Math.min(...results.map(r => r.fileSizeKB));
    const avgTime = results.reduce((sum, r) => sum + r.generationTimeMs, 0) / results.length;
    
    console.log(`Average file size: ${avgSize.toFixed(2)} KB (${(avgSize / 1024).toFixed(3)} MB)`);
    console.log(`Minimum file size: ${minSize.toFixed(2)} KB (${(minSize / 1024).toFixed(3)} MB)`);
    console.log(`Maximum file size: ${maxSize.toFixed(2)} KB (${(maxSize / 1024).toFixed(3)} MB)`);
    console.log(`Average generation time: ${avgTime.toFixed(0)}ms`);
    console.log(`\nTests passed: ${passedTests}/${testConfigs.length}`);
    console.log(`Tests failed: ${failedTests}/${testConfigs.length}`);
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ Font Embedding Verification');
  console.log('='.repeat(70));
  console.log('Font embedding is handled automatically by Puppeteer.');
  console.log('To verify font embedding:');
  console.log('  1. Open any generated PDF in Adobe Acrobat Reader');
  console.log('  2. Go to File > Properties > Fonts');
  console.log('  3. Verify that Inter font is listed as "Embedded Subset"');
  console.log('  4. This confirms fonts are optimized (only used characters embedded)');
  
  console.log('\n' + '='.repeat(70));
  console.log('📁 Output Location');
  console.log('='.repeat(70));
  console.log(`All test PDFs saved to: ${outputDir}`);
  
  console.log('\n' + '='.repeat(70));
  console.log('🔍 Manual Verification Steps');
  console.log('='.repeat(70));
  console.log('1. Open each PDF and verify text is selectable');
  console.log('2. Check that fonts render correctly (Inter font family)');
  console.log('3. Verify multi-page resumes have proper page breaks');
  console.log('4. Confirm file sizes are reasonable for content length');
  console.log('5. Test opening PDFs in different PDF readers');
  
  if (failedTests === 0) {
    console.log('\n🎉 All file size tests passed!');
    console.log('✅ All PDFs are under the 2MB limit');
    console.log('✅ Font embedding is optimized by Puppeteer');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Review the results above.');
    process.exit(1);
  }
}

// Run the tests
runTests().catch(error => {
  console.error('Fatal error running tests:', error);
  process.exit(1);
});
