'use client';

import { useState, useEffect } from 'react';

export function useApiKey() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load API key from localStorage on mount
    const loadApiKey = () => {
      // First check localStorage
      let savedKey = localStorage.getItem('google_ai_api_key');
      
      // If no key in localStorage, use the hardcoded fallback from env
      if (!savedKey) {
        savedKey = 'AIzaSyAMey9HpHfweRLO62_BOAYJewKqO20Qe54';
        // Optionally save it to localStorage for future use
        localStorage.setItem('google_ai_api_key', savedKey);
      }
      
      setApiKey(savedKey);
      setIsLoading(false);
    };

    loadApiKey();

    // Listen for API key updates
    const handleApiKeyUpdate = () => {
      loadApiKey();
    };

    window.addEventListener('apiKeyUpdated', handleApiKeyUpdate);
    
    return () => {
      window.removeEventListener('apiKeyUpdated', handleApiKeyUpdate);
    };
  }, []);

  const updateApiKey = (newKey: string) => {
    if (newKey) {
      localStorage.setItem('google_ai_api_key', newKey);
      setApiKey(newKey);
    } else {
      localStorage.removeItem('google_ai_api_key');
      setApiKey(null);
    }
  };

  const hasValidKey = () => {
    return apiKey && apiKey.length > 10 && apiKey.startsWith('AIza');
  };

  return {
    apiKey,
    hasValidKey: hasValidKey(),
    isLoading,
    updateApiKey,
  };
}