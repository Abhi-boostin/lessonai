# Lesson Planner AI

An AI-powered lesson planning assistant built with Next.js, Tailwind CSS, and Google's Gemini AI. Create, manage, and export professional lesson plans with ease.

## Features

- 🤖 AI-Powered Lesson Generation
- 🎨 Beautiful UI with Light/Dark Mode
- 📱 Responsive Design
- 💾 Local Storage for Saved Plans
- 📄 Export to PDF
- 🖨️ Print Support
- 🔐 Simple Authentication System

## Features in Detail

### AI Lesson Plan Generation
- Input your lesson topic or requirements
- AI generates structured lesson plans with:
  - Basic Information
  - Learning Objectives
  - Materials and Resources
  - Lesson Structure
  - Extensions and Modifications

### Plan Management
- Save generated plans locally
- View saved plans
- Delete unwanted plans
- Export plans as PDF
- Print plans directly

### User Interface
- Clean, modern design
- Smooth theme transitions
- Responsive layout
- Interactive animations
- Accessible components

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Gemini AI](https://ai.google.dev/) - AI Model
- [Radix UI](https://www.radix-ui.com/) - UI Components
- [shadcn/ui](https://ui.shadcn.com/) - Component Library
- [jsPDF](https://github.com/parallax/jsPDF) - PDF Generation
- [html2canvas](https://html2canvas.hertzen.com/) - HTML to Canvas Conversion

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lessonai.git
cd lessonai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Demo Credentials

```README.md
Username: abhiboostin
Password: abhiboostin123
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Google Generative AI](https://ai.google.dev/)
- [shadcn/ui Components](https://ui.shadcn.com/)