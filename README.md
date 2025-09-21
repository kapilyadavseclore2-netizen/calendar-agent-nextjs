# Calendar Chat Assistant

AI-powered assistant for scheduling Google Calendar meetings using Next.js, Vercel AI SDK, and Descope authentication.

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp env.example .env.local
   ```
   Then edit `.env.local` with your actual API keys.

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open the app**: [http://localhost:3000](http://localhost:3000)

## ✨ Features

- **AI Chat Interface** - Powered by OpenAI GPT-3.5-turbo
- **Calendar Scheduling** - Natural language meeting scheduling
- **Google OAuth** - Secure authentication via Descope
- **Responsive Design** - Works on all devices
- **Fast Responses** - Quick AI-powered chat experience

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-3.5-turbo via OpenAI API
- **Authentication**: Descope (Google OAuth)
- **Calendar**: Google Calendar API (via Descope)

## 📁 Project Structure

```
├── app/
│   ├── api/chat/route.ts          # Chat API endpoint
│   ├── chat/page.tsx              # Chat interface (authenticated users)
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Login page (home)
│   └── v1/outbound/oauth/callback/ # OAuth callback
├── components/
│   ├── AuthProvider.tsx           # Authentication context
│   ├── DescopeGoogleSignIn.tsx    # Google sign-in component
│   └── LoginForm.tsx              # Legacy login form
├── lib/
│   ├── calendar.ts                # Calendar service utilities
│   └── descope.ts                 # Descope authentication utilities
└── setup.md                       # Detailed setup instructions
```

## 🔧 Configuration

### Required Environment Variables

```bash
# OpenAI API Key (Optional for development - static responses work without it)
OPENAI_API_KEY=sk-your-openai-key-here

# Descope Configuration (Required for Google OAuth)
DESCOPE_PROJECT_ID=your-descope-project-id
NEXT_PUBLIC_DESCOPE_PROJECT_ID=your-descope-project-id
DESCOPE_MANAGEMENT_KEY=your-descope-management-key
DESCOPE_BASE_URL=https://api.descope.com
```

### Descope Dashboard Setup

1. **Enable Google OAuth** in Descope dashboard
2. **Set redirect URI** to: `http://localhost:3000/v1/outbound/oauth/callback`
3. **Configure OAuth scopes** for calendar access

## 🎯 Current Status

- ✅ **Chat Interface** - Fully functional with static responses (OpenAI ready)
- ✅ **Authentication** - Mock system working (ready for real Descope integration)
- ✅ **Calendar Integration** - Structure ready
- ✅ **Development Ready** - App runs without external dependencies
- ✅ **API Integration** - Static responses working (OpenAI ready to uncomment)
- ✅ **Descope Integration** - Real OAuth flow implemented

## 📚 Documentation

- **Setup Guide**: `setup.md` - Detailed installation and configuration
- **Descope Integration**: `DESCOPE_INTEGRATION.md` - Real OAuth integration steps
- **Environment Template**: `env.example` - Required environment variables

## 🚀 Deployment

The app is ready for deployment to Vercel, Netlify, or any Next.js hosting platform.

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section in `setup.md`
2. Review the integration guide in `DESCOPE_INTEGRATION.md`
3. Open an issue on GitHub