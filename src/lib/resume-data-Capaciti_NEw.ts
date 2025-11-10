
import type { ResumeData } from './types';

export const initialResumeData: ResumeData = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    jobTitle: '',
    linkedin: '',
    portfolio: '',
  },
  experience: [],
  education: [],
  projects: [],
  skills: [],
  summary: '',
  coverLetter: '',
  template: 'professional',
  style: {
    color: 'hsl(220, 19%, 38%)',
    font: 'var(--font-inter)',
  },
};
