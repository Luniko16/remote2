'use server';

import { createAI } from '../genkit';
import { z } from 'genkit';

const extractCvDataSchema = z.object({
  personal: z.object({
    fullName: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    jobTitle: z.string(),
    linkedin: z.string().optional(),
    portfolio: z.string().optional(),
  }),
  summary: z.string(),
  experience: z.array(z.object({
    company: z.string(),
    jobRole: z.string(),
    duration: z.string(),
    description: z.string(),
  })),
  education: z.array(z.object({
    school: z.string(),
    degree: z.string(),
    field: z.string(),
    duration: z.string(),
    gpa: z.string().optional(),
    description: z.string().optional(),
  })),
  skills: z.array(z.string()),
  references: z.array(z.object({
    name: z.string(),
    title: z.string(),
    company: z.string(),
    email: z.string(),
    phone: z.string(),
    relationship: z.string().optional(),
  })).optional(),
});

const ExtractCvDataInputSchema = z.object({
  cvText: z.string().describe('The text content extracted from the CV/resume'),
  apiKey: z.string().optional().describe('The Google AI API key for authentication.'),
});

export type ExtractCvDataInput = z.infer<typeof ExtractCvDataInputSchema>;
export type ExtractCvDataOutput = z.infer<typeof extractCvDataSchema>;

export async function extractCvData(input: ExtractCvDataInput): Promise<ExtractCvDataOutput> {
  // Get API key from input, environment, or use hardcoded fallback
  const apiKey = input.apiKey ||
    process.env.GOOGLE_GENAI_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY_BACKUP ||
    'AIzaSyAMey9HpHfweRLO62_BOAYJewKqO20Qe54';

  if (!apiKey) {
    throw new Error('No API key available for CV extraction');
  }

  try {
    // Create AI instance with the API key
    const ai = createAI(apiKey);

    const prompt = ai.definePrompt({
      name: 'extractCvDataPrompt',
      model: 'gemini-1.5-flash',
      input: { schema: ExtractCvDataInputSchema },
      output: { schema: extractCvDataSchema },
      prompt: `You are an expert CV/resume parser. Extract all relevant information from the following CV text and structure it according to the schema.

Instructions:
- Extract personal information (name, email, phone, address, job title, LinkedIn, portfolio)
- Extract professional summary or objective
- Extract all work experience with company names, job roles, durations, and descriptions
- Extract all education with school names, degrees, fields of study, and durations
- Extract all skills mentioned
- Extract references if available
- If information is missing, use empty strings or empty arrays
- For durations, keep the original format (e.g., "Jan 2020 - Dec 2023")

CV Text:
{{{cvText}}}

Return the extracted data in valid JSON format matching the schema.`,
    });

    const extractCvDataFlow = ai.defineFlow(
      {
        name: 'extractCvDataFlow',
        inputSchema: ExtractCvDataInputSchema,
        outputSchema: extractCvDataSchema,
      },
      async input => {
        const { output } = await prompt(input);
        return output!;
      }
    );

    return extractCvDataFlow(input);
  } catch (error) {
    console.error('Error extracting CV data:', error);
    throw new Error('Failed to extract CV data. Please try again.');
  }
}
