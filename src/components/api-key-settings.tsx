'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Key, AlertCircle, CheckCircle } from 'lucide-react';

interface ApiKeySettingsProps {
  onKeyUpdate?: (key: string) => void;
}

export function ApiKeySettings({ onKeyUpdate }: ApiKeySettingsProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a saved key in localStorage
    const saved = localStorage.getItem('google_ai_api_key');
    if (saved) {
      setSavedKey('***' + saved.slice(-4));
    }
  }, []);

  const validateApiKey = async (key: string): Promise<boolean> => {
    // Basic validation
    if (!key || key.length < 10 || !key.startsWith('AIza')) {
      return false;
    }

    try {
      // Basic format validation - in a real app you might want to test the API
      // For now, we'll just validate the format since testing requires a working endpoint
      return true;
    } catch {
      return false;
    }
  };

  const handleSaveKey = async () => {
    if (!apiKey.trim()) return;

    setIsValidating(true);
    const isValid = await validateApiKey(apiKey);
    
    if (isValid) {
      localStorage.setItem('google_ai_api_key', apiKey);
      setSavedKey('***' + apiKey.slice(-4));
      setValidationStatus('valid');
      onKeyUpdate?.(apiKey);
      setApiKey('');
      
      // Trigger a page refresh to update AI status throughout the app
      window.dispatchEvent(new Event('apiKeyUpdated'));
    } else {
      setValidationStatus('invalid');
    }
    
    setIsValidating(false);
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('google_ai_api_key');
    setSavedKey(null);
    setValidationStatus('idle');
    onKeyUpdate?.('');
    
    // Trigger a page refresh to update AI status throughout the app
    window.dispatchEvent(new Event('apiKeyUpdated'));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          AI Features Setup
        </CardTitle>
        <CardDescription>
          Configure your Google AI API key to enable AI-powered resume features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {savedKey ? (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              API key configured: {savedKey}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No API key configured. AI features are disabled.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="api-key">Google AI API Key</Label>
          <div className="relative">
            <Input
              id="api-key"
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setValidationStatus('idle');
              }}
              placeholder="Enter your Google AI API key"
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {validationStatus === 'invalid' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Invalid API key format. Please check your key and try again.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={handleSaveKey} 
            disabled={!apiKey.trim() || isValidating}
            className="flex-1"
          >
            {isValidating ? 'Validating...' : 'Save Key'}
          </Button>
          {savedKey && (
            <Button 
              variant="outline" 
              onClick={handleRemoveKey}
            >
              Remove
            </Button>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            Get your API key from{' '}
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google AI Studio
            </a>
          </p>
          <p className="mt-1">
            Your key is stored locally and never sent to our servers.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}