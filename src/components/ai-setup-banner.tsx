'use client';

import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Bot, X, Settings } from 'lucide-react';
import { useApiKey } from '@/hooks/use-api-key';
import Link from 'next/link';

export function AiSetupBanner() {
  const { hasValidKey, isLoading } = useApiKey();
  const [dismissed, setDismissed] = useState(false);

  // Don't show if loading, has valid key, or was dismissed
  if (isLoading || hasValidKey || dismissed) {
    return null;
  }

  return (
    <Alert className="mb-6 border-blue-200 bg-blue-50">
      <Bot className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex-1">
          <strong>Unlock AI-powered features!</strong> Configure your Google AI API key to enable smart resume generation, content enhancement, and cover letter creation.
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Link href="/settings">
            <Button size="sm" className="gap-1">
              <Settings className="h-3 w-3" />
              Setup AI
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setDismissed(true)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}