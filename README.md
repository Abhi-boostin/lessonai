# LessonAI - AI-Powered Lesson Planning Platform

A modern, AI-driven lesson planning application built with Next.js, TypeScript, and Google Gemini AI.

## 🏗️ Project Structure

```
lessonai/
├── types/                          # Type definitions and interfaces
│   └── index.ts                   # All component interfaces
├── src/
│   ├── lib/                       # Utility functions and API clients
│   │   ├── gemini.ts             # Gemini AI integration
│   │   └── utils.ts              # PDF generation, formatting, validation
│   ├── components/                # React components
│   │   ├── auth/                 # Authentication components
│   │   │   ├── index.tsx         # Main Auth component
│   │   │   └── LoginForm.tsx     # Login form sub-component
│   │   ├── lesson-creator/       # Lesson creation components
│   │   │   ├── index.tsx         # Main LessonCreator component
│   │   │   ├── PromptInput.tsx   # Input form sub-component
│   │   │   ├── LessonPlanHeader.tsx # Header sub-component
│   │   │   ├── LessonPlanContent.tsx # Content rendering sub-component
│   │   │   └── LessonPlanActions.tsx # Action buttons sub-component
│   │   ├── lesson-drawer/        # Lesson plan viewer components
│   │   │   ├── index.tsx         # Main LessonPlanDrawer component
│   │   │   ├── DrawerHeader.tsx  # Drawer header sub-component
│   │   │   ├── DrawerContent.tsx # Drawer content sub-component
│   │   │   └── DrawerFooter.tsx  # Drawer footer sub-component
│   │   ├── ui/                   # Reusable UI components
│   │   └── background/           # Background animation components
│   └── app/                      # Next.js app router pages
```

## 🎯 Key Features

- **AI-Powered Lesson Planning**: Generate comprehensive lesson plans using Google Gemini AI
- **Professional Formatting**: Structured lesson plans with clear sections and time allocations
- **PDF Export**: Download lesson plans as PDF documents
- **Plan Management**: Save, view, and manage multiple lesson plans
- **Responsive Design**: Modern UI with backdrop blur effects and animations
- **Type Safety**: Full TypeScript support with organized interfaces

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000)

## 🔧 Code Organization Principles

### Types & Interfaces
- All interfaces are centralized in `types/index.ts`
- Clear separation of concerns with specific interface types
- Reusable types across components

### Component Structure
- Main components act as containers and state managers
- Sub-components handle specific UI responsibilities
- Clear separation of logic and presentation

### Utility Functions
- PDF generation logic in `lib/utils.ts`
- Content formatting and parsing utilities
- Validation and helper functions

## 🎨 UI Components

- **PromptInput**: Lesson topic input with validation
- **LessonPlanHeader**: Plan title and edit controls
- **LessonPlanContent**: Structured content rendering with editing
- **LessonPlanActions**: PDF download and save functionality
- **Drawer Components**: Modal view for saved plans

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Backdrop blur effects and glass morphism
- Smooth animations and transitions
- Adaptive layouts for different screen sizes

## 🔐 Authentication

- Simple credential-based authentication
- Local storage for session management
- Protected routes for lesson planner

## 📄 PDF Generation

- HTML to PDF conversion using jsPDF
- High-quality output with proper scaling
- Multi-page support for long lesson plans

## 🛠️ Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **AI Integration**: Google Gemini AI API
- **PDF Generation**: jsPDF, html2canvas
- **UI Components**: Custom component library
- **State Management**: React hooks and local storage

## 📝 Development Notes

- All components use TypeScript for type safety
- Sub-components are organized by feature
- Utility functions are separated by responsibility
- Consistent naming conventions throughout
- Proper error handling and loading states

## 🚀 Future Enhancements

- User authentication system
- Cloud storage for lesson plans
- Collaborative editing features
- Advanced AI customization options
- Mobile app development
- Integration with LMS platforms