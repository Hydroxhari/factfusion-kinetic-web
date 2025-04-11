
# FactFusion

FactFusion is an AI-powered fact-checking platform that allows users to analyze text, images, audio, and video content for factual accuracy.

## Key Features

- **User Authentication**: Secure login and registration system
- **Content Analysis**: Support for multiple content types
  - Text files (TXT, DOC, DOCX, PDF, RTF)
  - Image files (JPG, PNG, GIF, WEBP)
  - Audio files (MP3, WAV, OGG, M4A)
  - Video files (MP4, MOV, AVI, WEBM)
- **Interactive UI**: Rich animations and intuitive user interface
- **Analysis Results**: Detailed reports with trust scores
- **Export Options**: Download analysis reports in different formats

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- Shadcn UI components
- React Router
- React Query

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `/src/components`: Reusable UI components
- `/src/contexts`: Context providers (e.g., authentication)
- `/src/pages`: Main application pages
- `/src/hooks`: Custom React hooks
- `/public`: Static assets

## Notes

This application uses localStorage for demonstration purposes. In a production environment, it would connect to a proper backend service for user authentication and data storage.
