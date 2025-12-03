
export type PersonalInfo = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  jobTitle: string;
  linkedin: string;
  portfolio: string;
};

export type Experience = {
  id: string;
  company: string;
  jobRole: string;
  duration: string;
  description: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  duration: string;
  gpa: string;
  description: string;
};

export type Reference = {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
};

export type Template = 'professional' | 'modern' | 'creative' | 'elegant' | 'bold' | 'minimalist' | 'ai-powered' | 'capaciti-style';

export type ResumeData = {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  summary: string;
  references: Reference[];
  coverLetter?: string;
  template: Template;
  style: {
    color: string;
    font: string;
  };
};

export type Step = {
  id: number;
  name: string;
  icon: React.ElementType;
};
