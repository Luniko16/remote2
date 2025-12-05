'use server';

import { extractCvData as extractCvDataFlow } from '@/ai/flows/extract-cv-data';

export async function extractCvData(cvText: string) {
  try {
    const result = await extractCvDataFlow({ cvText });
    
    // Add IDs to experience, education, and references
    const processedResult = {
      ...result,
      experience: result.experience.map((exp, index) => ({
        ...exp,
        id: `exp-${Date.now()}-${index}`,
      })),
      education: result.education.map((edu, index) => ({
        ...edu,
        id: `edu-${Date.now()}-${index}`,
        gpa: edu.gpa || '',
        description: edu.description || '',
      })),
      references: result.references?.map((ref, index) => ({
        ...ref,
        id: `ref-${Date.now()}-${index}`,
        relationship: ref.relationship || '',
      })) || [],
    };

    return { success: true, data: processedResult };
  } catch (error) {
    console.error('Error extracting CV data:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to extract CV data' 
    };
  }
}
