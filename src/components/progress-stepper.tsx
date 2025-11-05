'use client';

import type { Step } from '@/lib/types';
import { cn } from '@/lib/utils';

type ProgressStepperProps = {
  steps: Step[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

export function ProgressStepper({ steps, currentStep, setCurrentStep }: ProgressStepperProps) {
  return (
    <div className="bg-card p-2 rounded-xl shadow-md overflow-x-auto">
      <div className="flex items-center justify-center space-x-2 min-w-max">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={cn(
                'flex-1 text-center px-4 py-3 font-medium rounded-lg transition-colors duration-300 flex items-center justify-center gap-2',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background',
                {
                  'bg-primary text-primary-foreground': isActive,
                  'bg-accent/50 text-accent-foreground': isCompleted,
                  'hover:bg-muted': !isActive && !isCompleted,
                }
              )}
            >
              <step.icon
                className={cn('h-5 w-5', {
                  'text-primary-foreground': isActive,
                  'text-accent-foreground': isCompleted,
                })}
              />
              <span className="hidden sm:inline">{step.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
