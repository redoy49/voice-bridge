# VoiceBridge AI: Real-Time Multilingual Communication

VoiceBridge is a high-performance, real-time voice translation platform designed to bridge language gaps. Built with modern AI and streaming technologies, it provides low-latency speech-to-speech translation with a focus on natural conversational flow and accuracy.

Live Demo: [voicebridge.web.app](https://voicebridge.web.app/)

## Core Features

- Real-Time Speech Recognition: Converts spoken language to text instantly using the Web Speech API.
- AI-Powered Translation: Leverages Gemini 1.5 models via Supabase Edge Functions for context-aware, high-accuracy translations.
- Low-Latency Streaming: Utilizes Server-Sent Events (SSE) to deliver translation updates in real-time.
- Natural Text-to-Speech: Synthesizes translated text into natural-sounding audio for seamless interaction.
- Automatic Language Detection: Intelligently identifies source languages to streamline the user experience.
- Secure Authentication: Full user lifecycle management integrated with Supabase Auth.
- Responsive Design: Fully optimized for desktop, tablet, and mobile environments.

## Tech Stack

### Frontend
- Framework: React 18 with Vite
- Language: TypeScript
- Styling: Tailwind CSS
- Animation: Framer Motion
- UI Components: Radix UI / Shadcn UI
- State Management: TanStack Query

### Backend and Infrastructure
- Backend as a Service: Supabase (Auth, Database)
- Serverless Logic: Supabase Edge Functions (Deno)
- AI Integration: Gemini 1.5 Pro and Flash
- Speech Processing: Web Speech API
- Hosting: Firebase Hosting

## Technical Architecture

VoiceBridge is engineered for performance and reliability:

1. Speech Capture: The application captures audio input through the browser's SpeechRecognition interface.
2. Streaming Pipeline: Text is forwarded to a Supabase Edge Function, which interfaces with Gemini AI.
3. Real-Time Delivery: Translated text is streamed back to the client using Server-Sent Events (SSE), allowing for immediate UI updates.
4. Audio Output: The final translated string is processed by the SpeechSynthesis interface to provide spoken feedback.

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- A Supabase account and project

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/voice-bridge.git
   cd voice-bridge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a .env file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Future Roadmap

- Mobile Application: React Native implementation for native mobile support.
- Translation History: Persistent storage for past sessions with search capabilities.
- Advanced Voice Models: Integration with high-fidelity TTS engines like ElevenLabs.
- API Access: External API endpoints for third-party service integration.

## License

This project is licensed under the MIT License.
