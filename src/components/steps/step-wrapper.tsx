
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Step } from '@/lib/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

type StepWrapperProps = {
  step: Step;
  children: React.ReactNode;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
};

export function StepWrapper({ step, children, onNext, onPrev, isFirstStep, isLastStep }: StepWrapperProps) {
  const { t } = useLanguage();
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl text-primary">
          <step.icon className="h-7 w-7" />
          {step.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onPrev} disabled={isFirstStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> {t.navigation.previous}
        </Button>
        {!isLastStep && (
          <Button onClick={onNext}>
            {t.navigation.next} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
