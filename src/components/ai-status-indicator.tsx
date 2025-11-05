'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Bot, AlertCircle } from 'lucide-react';
import { useApiKey } from '@/hooks/use-api-key';

export function AiStatusIndicator() {
  const { hasValidKey, isLoading } = useApiKey();

  if (isLoading) {
    return null;
  }

  return (
    <Badge 
      variant={hasValidKey ? "default" : "secondary"} 
      className={`gap-1 ${hasValidKey ? 'bg-green-100 text-green-800 border-green-200' : 'bg-orange-100 text-orange-800 border-orange-200'}`}
    >
      {hasValidKey ? (
        <>
          <Bot className="h-3 w-3" />
          AI Enabled
        </>
      ) : (
        <>
          <AlertCircle className="h-3 w-3" />
          AI Disabled
        </>
      )}
    </Badge>
  );
}