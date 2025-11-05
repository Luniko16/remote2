'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { aiClient } from '@/lib/ai-client';

export function AITest() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testAI = async () => {
    setLoading(true);
    setResult('');
    
    try {
      console.log('Testing AI with simple input...');
      const response = await aiClient.generateSummary({
        jobTitle: 'Software Developer',
        skills: 'JavaScript, React, Node.js',
        experience: 'Frontend Developer',
        language: 'en'
      });
      
      console.log('AI Test Response:', response);
      setResult(response.summary);
    } catch (error) {
      console.error('AI Test Error:', error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkApiKey = () => {
    const hasKey = aiClient.hasApiKey();
    const key = localStorage.getItem('google_ai_api_key');
    console.log('API Key Check:');
    console.log('- Has valid key:', hasKey);
    console.log('- Key exists:', !!key);
    console.log('- Key length:', key?.length);
    console.log('- Key starts with AIza:', key?.startsWith('AIza'));
    setResult(`API Key Status: ${hasKey ? 'Valid' : 'Invalid or Missing'}`);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>AI Test Component</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={checkApiKey} variant="outline">
            Check API Key
          </Button>
          <Button onClick={testAI} disabled={loading}>
            {loading ? 'Testing...' : 'Test AI'}
          </Button>
        </div>
        
        {result && (
          <div className="p-3 bg-gray-100 rounded text-sm">
            <strong>Result:</strong>
            <pre className="whitespace-pre-wrap mt-2">{result}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}