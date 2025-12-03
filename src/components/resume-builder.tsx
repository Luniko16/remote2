
'use client';

import React, { useState, useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bot, Briefcase, GraduationCap, Palette, FileText, User, Wrench, RotateCw, Mail, Users } from 'lucide-react';
import { useResumeData } from '@/hooks/use-resume-data';
import type { Step } from '@/lib/types';
import { resumeSchema } from '@/lib/schema';
import type { ResumeData } from '@/lib/types';
import { ProgressStepper } from './progress-stepper';
import { StepWrapper } from './steps/step-wrapper';
import { PersonalInfoStep } from './steps/personal-info-step';
import { ExperienceStep } from './steps/experience-step';
import { EducationStep } from './steps/education-step';
import { SkillsStep } from './steps/skills-step';
import { SummaryStep } from './steps/summary-step';
import { ReferencesStep } from './steps/references-step';
import { TemplateStep } from './steps/template-step';
import { CoverLetterStep } from './steps/cover-letter-step';
import { ResumePreview } from './resume-preview';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';
import { LanguageSelector } from './language-selector';
import { CvUpload } from './cv-upload';


export function ResumeBuilder() {
  const { language } = useLanguage();
  const t = translations[language];

  const steps: Step[] = [
    { id: 0, name: t.steps.personalInfo, icon: User },
    { id: 1, name: t.steps.experience, icon: Briefcase },
    { id: 2, name: t.steps.education, icon: GraduationCap },
    { id: 3, name: t.steps.skills, icon: Wrench },
    { id: 4, name: t.steps.summary, icon: FileText },
    { id: 5, name: t.steps.references, icon: Users },
    { id: 6, name: t.steps.coverLetter, icon: Mail },
    { id: 7, name: t.steps.template, icon: Palette },
  ];

  const { initialData, setResumeData, resetResumeData, isMounted } = useResumeData();
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema(t)),
    defaultValues: initialData,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (isMounted && initialData) {
      methods.reset(initialData);
    }
  }, [isMounted, initialData, methods]);

  const watchedData = useWatch({ control: methods.control });
  useEffect(() => {
    if (isMounted) {
      setResumeData(watchedData as ResumeData);
    }
  }, [watchedData, setResumeData, isMounted]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    resetResumeData();
    window.location.reload();
  };

  const handleCvDataExtracted = (extractedData: Partial<ResumeData>) => {
    // Merge extracted data with current form data
    const currentData = methods.getValues();
    const mergedData = {
      ...currentData,
      ...extractedData,
      template: currentData.template, // Keep current template
      style: currentData.style, // Keep current style
    };
    methods.reset(mergedData);
    setResumeData(mergedData as ResumeData);
  };

  const resumeData = methods.getValues();

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <ExperienceStep />;
      case 2:
        return <EducationStep />;
      case 3:
        return <SkillsStep />;
      case 4:
        return <SummaryStep />;
      case 5:
        return <ReferencesStep />;
      case 6:
        return <CoverLetterStep />;
      case 7:
        return <TemplateStep />;
      default:
        return null;
    }
  };

  if (!isMounted) {
    return (
       <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8 p-4 md:p-8 bg-gradient-to-r from-primary to-slate-600 text-white rounded-xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-3">
            <Bot size={40} />
            AI Resume
          </h1>
          <p className="text-base md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            {t.header.description}
          </p>
        </div>
      </header>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="lg:w-1/2">
            <Skeleton className="h-[800px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8 p-4 md:p-8 bg-gradient-to-r from-primary to-slate-600 text-white rounded-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20 flex flex-col items-end md:flex-row md:items-center gap-2">
             <LanguageSelector />
             <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="bg-white/20 text-white border-white/40 hover:bg-white/10 hover:text-white">
                  <RotateCw className="mr-0 md:mr-2 h-4 w-4" /> <span className="hidden md:inline">{t.resetButton.text}</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t.resetDialog.title}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t.resetDialog.description}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t.resetDialog.cancel}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset}>{t.resetDialog.continue}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-3">
              <Bot size={40} />
              AI Resume
            </h1>
            <p className="text-base md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              {t.header.description}
            </p>
          </div>
        </header>

        <div className="mb-10">
          <ProgressStepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <CvUpload onDataExtracted={handleCvDataExtracted} />
            <StepWrapper
              step={steps[currentStep]}
              onNext={handleNext}
              onPrev={handlePrev}
              isFirstStep={currentStep === 0}
              isLastStep={currentStep === steps.length - 1}
            >
              {renderStepContent()}
            </StepWrapper>
          </div>
          <div className="lg:w-1/2">
            <div className="sticky top-8">
              <ResumePreview resumeData={resumeData} isMounted={isMounted} />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
