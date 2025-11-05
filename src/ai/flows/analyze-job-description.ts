// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Analyzes a job description to identify matching and missing skills in a resume.
 *
 * - analyzeJobDescription - A function that handles the job description analysis process.
 * - AnalyzeJobDescriptionInput - The input type for the analyzeJobDescription function.
 * - AnalyzeJobDescriptionOutput - The return type for the analyzeJobDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeJobDescriptionInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description to analyze.'),
  resumeSkills: z
    .array(z.string())
    .describe('A list of skills from the resume.'),
});
export type AnalyzeJobDescriptionInput = z.infer<
  typeof AnalyzeJobDescriptionInputSchema
>;

const AnalyzeJobDescriptionOutputSchema = z.object({
  analysisResult: z
    .string()
    .describe(
      'Analysis of the job description, including matched and missing skills.'
    ),
});
export type AnalyzeJobDescriptionOutput = z.infer<
  typeof AnalyzeJobDescriptionOutputSchema
>;

export async function analyzeJobDescription(
  input: AnalyzeJobDescriptionInput
): Promise<AnalyzeJobDescriptionOutput> {
  return analyzeJobDescriptionFlow(input);
}

const analyzeJobDescriptionPrompt = ai.definePrompt({
  name: 'analyzeJobDescriptionPrompt',
  input: {schema: AnalyzeJobDescriptionInputSchema},
  output: {schema: AnalyzeJobDescriptionOutputSchema},
  prompt: `Analyze the following job description and identify the key skills, technologies, and qualifications required. Also compare it to these resume skills: {{{resumeSkills}}}. Provide a list of matched skills and missing skills. Format the response with clear headings for "Matched Skills" and "Skills to Consider Adding".\n\nJob Description:\n{{{jobDescription}}}`,
});

const analyzeJobDescriptionFlow = ai.defineFlow(
  {
    name: 'analyzeJobDescriptionFlow',
    inputSchema: AnalyzeJobDescriptionInputSchema,
    outputSchema: AnalyzeJobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await analyzeJobDescriptionPrompt(input);
    return output!;
  }
);
