import { ai } from '../genkit';
import { z } from 'zod';

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

export const extractCvDataFlow = ai.defineFlow(
  {
    name: 'extractCvData',
    inputSchema: z.object({
      cvText: z.string().describe('The text content extracted from the CV/resume'),
    }),
    outputSchema: extractCvDataSchema,
  },
  async (input) => {
    const { text } = await ai.generate({
      model: 'gemini-1.5-flash',
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
- Generate unique IDs are not needed, they will be added later

CV Text:
${input.cvText}

Return the extracted data in valid JSON format matching the schema.`,
      output: {
        format: 'json',
        schema: extractCvDataSchema,
      },
    });

    return JSON.parse(text) as z.infer<typeof extractCvDataSchema>;
  }
);
