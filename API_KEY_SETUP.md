# API Key Setup Guide

This application uses Google AI (Gemini 1.5 Flash) for AI-powered resume features. Here's how to set up and manage your API keys.

## Quick Setup

1. **Get your API key:**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Copy the key (starts with `AIza...`)

2. **Configure the key:**
   - Create a `.env.local` file in the project root
   - Add: `GOOGLE_GENAI_API_KEY=your_api_key_here`
   - Restart your development server

## Alternative: In-App Configuration

You can also configure the API key directly in the application:
1. Look for the "AI Features Setup" section in the app
2. Enter your API key
3. The key is stored locally in your browser

## Key Rotation & Management

### Environment Variables
```bash
# Primary key
GOOGLE_GENAI_API_KEY=your_primary_key

# Backup key (optional)
GOOGLE_GENAI_API_KEY_BACKUP=your_backup_key

# Disable AI features entirely
ENABLE_AI_FEATURES=false
```

### Automatic Fallback
The app automatically:
- Uses the primary key first
- Falls back to backup key if primary fails
- Gracefully disables AI features if no keys work

### Key Validation
- Keys are validated before use
- Invalid keys trigger fallback mechanisms
- Users get clear error messages

## Troubleshooting

### "AI features are disabled"
- Check if `ENABLE_AI_FEATURES` is set to `false`
- Verify your API key is valid
- Ensure the key has proper permissions

### "Invalid API key"
- Confirm the key starts with `AIza`
- Check for extra spaces or characters
- Verify the key hasn't expired

### Frequent key updates
- Use the backup key system
- Consider using Google Cloud IAM for key rotation
- Monitor usage quotas

## Security Best Practices

1. **Never commit API keys to version control**
2. **Use environment variables for production**
3. **Rotate keys regularly**
4. **Monitor API usage and quotas**
5. **Use least-privilege permissions**

## Production Deployment

For production environments:
1. Use secure environment variable management
2. Consider using Google Cloud Secret Manager
3. Implement proper key rotation policies
4. Monitor and alert on API failures
## Mo
del Information

The application uses **Gemini 1.5 Flash** model which provides:
- Fast response times
- Good quality for resume content generation
- Cost-effective for most use cases

### Available Models
- `gemini-1.5-flash` (default) - Fast and efficient
- `gemini-1.5-pro` - More capable for complex tasks
- `gemini-1.0-pro` - Legacy model

To change the model, update the `model` field in `src/ai/genkit.ts`.

## Quick Test Setup

For immediate testing, you can set your API key as an environment variable:

1. Create a `.env.local` file in your project root
2. Add your API key:
   ```
   GOOGLE_GENAI_API_KEY=your_actual_api_key_here
   ENABLE_AI_FEATURES=true
   ```
3. Restart your development server
4. The AI features should work immediately

## Debugging Steps

If you're still getting errors:

1. **Check Browser Console**: Open browser dev tools and look for console logs
2. **Check Server Logs**: Look at your terminal where the dev server is running
3. **Verify API Key**: Make sure your key starts with `AIza` and is valid
4. **Test Environment Variable**: Try setting the key in `.env.local` first
5. **Check Network**: Ensure you can reach Google AI services

## Common Issues

- **"Model not found"**: Make sure you're using `gemini-1.5-flash` (not 2.5)
- **"API key not configured"**: Check both localStorage and environment variables
- **Network errors**: Check your internet connection and firewall settings