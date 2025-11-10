
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

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
  duration?: string;
};

export type Template = 'professional' | 'modern' | 'creative';

export type ResumeData = {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  summary: string;
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
