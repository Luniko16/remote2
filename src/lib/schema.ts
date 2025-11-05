
'use client';

import { z } from 'zod';
import type { translations } from './translations';

type TranslationObject = typeof translations['en'];

export const resumeSchema = (t: TranslationObject) => z.object({
  personal: z.object({
    fullName: z.string().min(1, { message: t.personalInfo.fullNameError }),
    email: z.string().email({ message: t.personalInfo.emailError }),
    phone: z.string().min(1, { message: t.personalInfo.phoneError }),
    address: z.string().min(1, { message: t.personalInfo.addressError }),
    jobTitle: z.string().min(1, { message: t.personalInfo.jobTitleError }),
    linkedin: z.string().url().optional().or(z.literal('')),
    portfolio: z.string().url().optional().or(z.literal('')),
  }),
  experience: z.array(z.object({
    id: z.string(),
    company: z.string().min(1, t.experience.companyError),
    jobRole: z.string().min(1, t.experience.jobRoleError),
    duration: z.string().min(1, t.experience.durationError),
    description: z.string().min(1, t.experience.descriptionError),
  })),
  education: z.array(z.object({
    id: z.string(),
    school: z.string().min(1, t.education.schoolError),
    degree: z.string().min(1, t.education.degreeError),
    field: z.string().min(1, t.education.fieldError),
    duration: z.string().min(1, t.education.durationError),
    gpa: z.string().optional(),
    description: z.string().optional(),
  })),
  skills: z.array(z.string()).min(1, { message: t.skills.error }),
  summary: z.string().min(1, { message: t.summary.error }),
  references: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, 'Name is required'),
    title: z.string().min(1, 'Job title is required'),
    company: z.string().min(1, 'Company is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().min(1, 'Phone number is required'),
    relationship: z.string().min(1, 'Relationship is required'),
  })).optional(),
  coverLetter: z.string().optional(),
  template: z.enum(['professional', 'modern', 'creative']),
  style: z.object({
    color: z.string(),
    font: z.string(),
  }),
});
