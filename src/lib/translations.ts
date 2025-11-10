export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  ru: 'Русский',
  ja: '日本語',
  zh: '中文 (简体)',
  ko: '한국어',
  ar: 'العربية',
  xh: 'isiXhosa',
};

export type Language = keyof typeof languages;

export const translations = {
  en: {
    header: { description: 'Create professional, ATS-friendly resumes with AI-enhanced content powered by Google Gemini' },
    steps: { personalInfo: 'Personal Info', experience: 'Experience', education: 'Education', skills: 'Skills', summary: 'Summary', references: 'References', coverLetter: 'Cover Letter', template: 'Template' },
    resetButton: { text: 'Reset Form' },
    resetDialog: { title: 'Are you absolutely sure?', description: 'This action cannot be undone. This will permanently delete all your resume data from this browser.', cancel: 'Cancel', continue: 'Continue' },
    signOut: { button: 'Sign Out', title: 'Signed Out', description: 'You have been successfully signed out.' },
    navigation: { next: 'Next', previous: 'Previous' },
    personalInfo: {
      fullName: 'Full Name', fullNameError: 'Full name is required.',
      jobTitle: 'Desired Job Title', jobTitleError: 'Job title is required.',
      email: 'Email', emailError: 'Invalid email address.',
      phone: 'Phone', phoneError: 'Phone number is required.',
      address: 'Address', addressError: 'Address is required.',
      linkedin: 'LinkedIn URL (Optional)',
      portfolio: 'Portfolio URL (Optional)'
    },
    experience: {
      title: 'Position',
      jobRole: 'Job Title', jobRoleError: 'Job role is required.',
      company: 'Company', companyError: 'Company is required.',
      duration: 'Duration', durationError: 'Duration is required.',
      description: 'Description', descriptionError: 'Description is required.',
      enhance: 'Enhance with AI',
      addAnother: 'Add Another Position'
    },
    education: {
      title: 'Education',
      school: 'School / University', schoolError: 'School is required.',
      degree: 'Degree', degreeError: 'Degree is required.',
      field: 'Field of Study', fieldError: 'Field of study is required.',
      duration: 'Duration', durationError: 'Duration is required.',
      gpa: 'GPA (Optional)',
      description: 'Description (Optional)',
      addAnother: 'Add Another Education'
    },
    skills: {
      addSkill: 'Add a skill',
      add: 'Add',
      yourSkills: 'Your Skills',
      noSkills: 'No skills added yet.',
      error: 'At least one skill is required.'
    },
    summary: {
      professionalSummary: 'Professional Summary',
      generate: 'Generate AI Summary',
      analysisTitle: 'Job Description Analysis',
      analysisLabel: 'Paste a job description to optimize your resume',
      analyze: 'Analyze',
      aiAnalysis: 'AI Analysis',
      error: 'Summary is required.'
    },
    coverLetter: {
      companyName: 'Company Name',
      generate: 'Generate AI Cover Letter',
      download: 'Download Cover Letter',
      yourCoverLetter: 'Your Cover Letter',
      placeholder: 'Your generated cover letter will appear here. You can edit it directly.',
      companyNameError: 'Please enter the name of the company you are applying to.'
    },
    template: {
      chooseTemplate: 'Choose a Template',
      customization: 'Customization',
      accentColor: 'Accent Color',
      fontFamily: 'Font Family',
      selectFont: 'Select a font'
    },
    preview: {
      title: 'Resume Preview',
      pdf: 'PDF', word: 'Word', html: 'HTML'
    },
    toast: {
      success: 'Success',
      error: 'Error',
      loginSuccess: 'You have been logged in.',
      loginError: 'Please enter both email and password.',
      accountCreated: 'Account Created',
      accountCreatedDesc: 'Please check your email for a verification code.',
      signupError: 'Please enter both email and password.',
      verificationSuccess: 'Your account has been verified and you are now logged in.',
      verificationError: 'Please enter the verification code.',
      resetSuccess: 'Form has been reset.',
      enhanceSuccess: 'Description enhanced with AI.',
      enhanceError: 'Failed to enhance description with AI. Please try again.',
      summarySuccess: 'AI summary generated.',
      summaryError: 'Failed to generate AI summary.',
      analysisSuccess: 'Job description analyzed for key skills.',
      analysisError: 'Failed to analyze job description.',
      coverLetterSuccess: 'AI Cover Letter generated.',
      coverLetterError: 'Failed to generate AI cover letter.',
      noCoverLetter: 'There is no cover letter content to download.',
      inputRequired: 'Input Required'
    }
  }
};
