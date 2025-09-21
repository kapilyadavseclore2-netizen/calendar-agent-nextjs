# Quick Setup Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create Environment File**
   ```bash
   copy env.example .env.local
   ```

3. **Add Your API Keys** (Required for OAuth)
   - Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/) (optional - app works with static responses)
   - Get your Descope Project ID from [Descope Dashboard](https://app.descope.com/)
   - Add them to `.env.local`:
   ```
   # Optional - app works without this for development
   OPENAI_API_KEY=your_actual_api_key_here
   # Required for OAuth authentication
   DESCOPE_PROJECT_ID=your_descope_project_id_here
   NEXT_PUBLIC_DESCOPE_PROJECT_ID=your_descope_project_id_here
   DESCOPE_MANAGEMENT_KEY=your_descope_management_key_here
   ```

4. **Get Google OAuth Credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the Google+ API and Google Calendar API
   - Go to Credentials → Create Credentials → OAuth 2.0 Client ID
   - Set application type to "Web application"
   - Add authorized redirect URI: `https://api.descope.com/v1/auth/oauth/google/callback`
   - Copy the Client ID and Client Secret

5. **Configure Google OAuth in Descope**
   - Go to your [Descope Dashboard](https://app.descope.com/)
   - Navigate to Authentication → Social Providers
   - Enable Google OAuth provider
   - Configure Google OAuth settings:
     - **Client ID**: Your Google OAuth client ID (from step 4)
     - **Client Secret**: Your Google OAuth client secret (from step 4)
     - **Redirect URI**: `http://localhost:3000/v1/outbound/oauth/callback`
   - Save the configuration

6. **Run the Development Server**
   ```bash
   npm run dev
   ```

7. **Access the App**
   - Open [http://localhost:3000](http://localhost:3000) - You'll see the login page
   - Click "Connect Google Calendar" to sign in
   - Grant calendar permissions when prompted
   - After successful authentication, you'll be redirected to the chat interface

## Features Available

✅ **Chat Interface** - AI-powered conversation
✅ **Calendar Scheduling** - Natural language meeting scheduling
✅ **Authentication** - Mock authentication system (ready for Descope integration)
✅ **No API Keys Required** - Works with static responses for development
✅ **Responsive Design** - Works on all devices
✅ **Development Ready** - App runs without external dependencies

## Optional Integrations

- **Google Calendar API** - For actual calendar event creation

## Troubleshooting

If you encounter PowerShell execution policy issues:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then run:
```bash
npm install
```
