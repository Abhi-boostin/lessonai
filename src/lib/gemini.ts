import { GoogleGenAI } from "@google/genai";

// Initialize the API with your key
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });

// Maximum number of retries
const MAX_RETRIES = 3;
// Base delay in milliseconds
const BASE_DELAY = 1000;

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to calculate exponential backoff delay
const getBackoffDelay = (retryCount: number): number => {
  return Math.min(BASE_DELAY * Math.pow(2, retryCount), 30000); // Max 30 seconds
};

// Enhanced lesson plan generator with professional formatting
export async function generateLessonPlan(prompt: string): Promise<string> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const systemPrompt = `You are an expert educational consultant and curriculum designer. Create a comprehensive, professionally structured lesson plan for: "${prompt}"

🎯 **LESSON PLAN FRAMEWORK**

## 📋 LESSON OVERVIEW
**Subject Area:** [Auto-detect and specify]
**Target Audience:** [Determine appropriate grade/skill level]
**Duration:** [Optimize based on content complexity]
**Difficulty Level:** [Beginner/Intermediate/Advanced]
**Prerequisites:** [List essential prior knowledge]

## 🎯 LEARNING OUTCOMES
**Primary Objectives:** [3-4 SMART objectives using Bloom's Taxonomy]
**Skills Developed:** [Cognitive, Psychomotor, Affective skills]
**Assessment Criteria:** [How success will be measured]

## 📚 COMPREHENSIVE RESOURCE TOOLKIT
**Essential Materials:** [Physical and digital resources]
**Technology Integration:** [Specific tools and platforms]
**Multimedia Resources:** [Videos, simulations, interactive content]
**Assessment Tools:** [Rubrics, checklists, self-assessment forms]

## 🏗️ STRUCTURED LESSON FLOW
**🚀 Engagement Hook (8-10 min):** [Attention-grabbing opener with real-world connection]
**🧠 Knowledge Building (25-30 min):** [Scaffolded content delivery with multiple modalities]
**🤝 Collaborative Practice (20-25 min):** [Peer learning and guided application]
**💪 Independent Application (15-20 min):** [Individual skill demonstration]
**📊 Formative Assessment (10-12 min):** [Real-time learning checks]
**🎯 Synthesis & Closure (5-8 min):** [Key takeaways and next steps]

## 🔄 DIFFERENTIATION STRATEGIES
**🌟 Advanced Learners:** [Enrichment activities and extension challenges]
**🎯 Core Learners:** [Standard practice and reinforcement]
**🤝 Support Needed:** [Scaffolding, modifications, and alternative approaches]
**🌍 Cultural Responsiveness:** [Inclusive practices and diverse perspectives]

## 📈 ASSESSMENT & REFLECTION
**Formative Checks:** [During-lesson assessment strategies]
**Summative Evaluation:** [End-of-lesson assessment options]
**Self-Reflection Prompts:** [Student metacognition questions]
**Teacher Reflection:** [Lesson effectiveness evaluation]

## 🏠 EXTENSION & HOMEWORK
**Practice Activities:** [Skill reinforcement tasks]
**Real-World Applications:** [Authentic problem-solving]
**Preparation for Next Lesson:** [Bridge to future learning]

**📝 PROFESSIONAL FORMATTING REQUIREMENTS:**
- Use clear headings and subheadings
- Include specific time allocations
- Provide detailed activity descriptions
- Include assessment rubrics where applicable
- Add safety considerations if relevant
- Suggest alternative approaches for different learning styles`;

      // Generate content using the latest API format with Gemini 2.5 Flash
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: systemPrompt,
      });

      if (!response.text) {
        throw new Error("No response text received from the model");
      }

      // Enhanced formatting for better readability
      let formattedResponse = response.text
        .replace(/^#\s+([^:]+):/gm, '\n# $1:')
        .replace(/([A-Za-z]+)\s*\((\d+)\s*minutes\):/g, '\n$1 ($2 minutes):')
        .replace(/\*\*([^*]+):\*\*/g, '\n**$1:**')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .join('\n\n');

      return formattedResponse;
    } catch (error: any) {
      lastError = error;
      
      // Check if it's a rate limit error
      if (error.message?.includes('429') || error.message?.includes('quota')) {
        const delayMs = getBackoffDelay(attempt);
        console.log(`Rate limit hit. Retrying in ${delayMs/1000} seconds... (Attempt ${attempt + 1}/${MAX_RETRIES})`);
        await delay(delayMs);
        continue;
      }
      
      // For other errors, throw immediately
      throw error;
    }
  }

  // If we've exhausted all retries, throw the last error
  throw new Error(
    `Failed to generate lesson plan after ${MAX_RETRIES} attempts. ${
      lastError?.message || 'Unknown error'
    }`
  );
}

// Tiered learning path generator with career counselor approach
export async function generateLearningPath(subject: string): Promise<string> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const pathPrompt = `Create a comprehensive 5-tier learning pathway for mastering: "${subject}"

🎯 **COMPLETE MASTERY ROADMAP FOR ${subject.toUpperCase()}**

## 🌱 TIER 1: BEGINNER FOUNDATION
**Learning Focus:** [Core concepts and basic terminology]
**Time Investment:** [Estimated hours/weeks]
**Key Topics to Master:**
- [Topic 1 with brief description]
- [Topic 2 with brief description]
- [Topic 3 with brief description]

**📚 Recommended Resources:**
- **Articles:** [Specific article titles with brief descriptions]
- **YouTube Channels:** [Channel names with subscriber counts and why they're good]
- **Online Courses:** [Platform and course names with ratings]
- **Books:** [Author and title with reading level]
- **Practice Platforms:** [Websites/apps for hands-on practice]

**✅ Milestone Checkpoints:**
- [Specific skills to demonstrate mastery]
- [Projects or assessments to complete]

---

## 🚀 TIER 2: DEVELOPING COMPETENCE
**Learning Focus:** [Intermediate concepts and practical application]
**Prerequisites:** [What must be completed from Tier 1]
**Time Investment:** [Estimated duration]

**Key Topics to Master:**
- [Advanced topic 1]
- [Advanced topic 2]
- [Advanced topic 3]

**📚 Recommended Resources:**
- **Advanced Articles:** [Specific publications and journals]
- **Video Tutorials:** [Specific creators and series]
- **Interactive Courses:** [Platform-specific recommendations]
- **Community Forums:** [Where to ask questions and get help]
- **Practice Projects:** [Specific project ideas with difficulty levels]

**✅ Milestone Checkpoints:**
- [Intermediate skill demonstrations]
- [Portfolio pieces to create]

---

## 💪 TIER 3: ADVANCED PROFICIENCY
**Learning Focus:** [Complex problem-solving and specialized knowledge]
**Prerequisites:** [Tier 2 completion requirements]
**Time Investment:** [Realistic timeframe]

**Key Topics to Master:**
- [Specialized area 1]
- [Specialized area 2]
- [Integration and synthesis skills]

**📚 Recommended Resources:**
- **Professional Publications:** [Industry journals and whitepapers]
- **Expert-Led Courses:** [University or professional programs]
- **Certification Programs:** [Industry-recognized credentials]
- **Mentorship Opportunities:** [How to find and connect with experts]
- **Advanced Practice:** [Complex project suggestions]

**✅ Milestone Checkpoints:**
- [Advanced project completion]
- [Peer teaching or presentation opportunities]

---

## 🏆 TIER 4: ELITE EXPERTISE
**Learning Focus:** [Innovation, leadership, and cutting-edge applications]
**Prerequisites:** [Advanced proficiency demonstration]
**Time Investment:** [Long-term commitment expectations]

**Key Topics to Master:**
- [Cutting-edge developments]
- [Research and innovation methods]
- [Leadership and teaching skills]

**📚 Recommended Resources:**
- **Research Papers:** [Key journals and recent publications]
- **Conference Proceedings:** [Major industry conferences]
- **Professional Networks:** [Organizations and associations to join]
- **Research Opportunities:** [How to get involved in research]
- **Innovation Projects:** [Contribution to field advancement]

**✅ Milestone Checkpoints:**
- [Original research or innovation]
- [Professional recognition or publication]

---

## 🎖️ TIER 5: MASTER PRACTITIONER
**Learning Focus:** [Thought leadership and field advancement]
**Prerequisites:** [Elite-level achievements]
**Time Investment:** [Career-long commitment]

**Key Topics to Master:**
- [Paradigm-shifting concepts]
- [Cross-disciplinary integration]
- [Global impact and influence]

**📚 Recommended Resources:**
- **Cutting-Edge Research:** [Emerging trends and future directions]
- **International Collaborations:** [Global networks and partnerships]
- **Speaking Opportunities:** [Conferences and thought leadership platforms]
- **Publishing Opportunities:** [Journals, books, and media outlets]
- **Mentoring Programs:** [Giving back to the community]

**✅ Milestone Checkpoints:**
- [Industry recognition and awards]
- [Significant contributions to field knowledge]
- [Mentoring next generation of experts]

---

## 🎯 **PERSONALIZED STUDY PLAN**
**Daily Practice:** [Specific daily habits and routines]
**Weekly Goals:** [Measurable weekly objectives]
**Monthly Assessments:** [Progress evaluation methods]
**Quarterly Reviews:** [Major milestone evaluations]
**Annual Advancement:** [Tier progression criteria]

## 🤝 **CAREER COUNSELOR INSIGHTS**
**Industry Connections:** [Professional networks to join]
**Job Market Trends:** [Current and future opportunities]
**Salary Expectations:** [Realistic compensation ranges by tier]
**Career Pathways:** [Different specialization options]
**Success Stories:** [Examples of successful practitioners]`;

      // Generate content using the latest API format with Gemini 2.5 Flash
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: pathPrompt,
      });

      if (!response.text) {
        throw new Error("No response text received from the model");
      }

      // Format the response for better readability
      let formattedResponse = response.text
        .replace(/^#\s+([^:]+):/gm, '\n# $1:')
        .replace(/\*\*([^*]+):\*\*/g, '\n**$1:**')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .join('\n\n');

      return formattedResponse;
    } catch (error: any) {
      lastError = error;
      
      // Check if it's a rate limit error
      if (error.message?.includes('429') || error.message?.includes('quota')) {
        const delayMs = getBackoffDelay(attempt);
        console.log(`Learning path rate limit hit. Retrying in ${delayMs/1000} seconds... (Attempt ${attempt + 1}/${MAX_RETRIES})`);
        await delay(delayMs);
        continue;
      }
      
      // For other errors, throw immediately
      throw error;
    }
  }

  // If we've exhausted all retries, throw the last error
  throw new Error(
    `Failed to generate learning path after ${MAX_RETRIES} attempts. ${
      lastError?.message || 'Unknown error'
    }`
  );
}

// Combined function that generates both lesson plan and learning path
export async function generateCompleteEducationalContent(
  prompt: string, 
  includePathway: boolean = false
): Promise<{ lessonPlan: string; learningPath?: string }> {
  try {
    const lessonPlan = await generateLessonPlan(prompt);
    
    if (includePathway) {
      const learningPath = await generateLearningPath(prompt);
      return { lessonPlan, learningPath };
    }
    
    return { lessonPlan };
  } catch (error: any) {
    throw new Error(`Failed to generate educational content: ${error.message}`);
  }
}

// Utility function to format output for display
export function formatEducationalContent(
  content: { lessonPlan: string; learningPath?: string }
): string {
  let formatted = `# 📚 COMPREHENSIVE EDUCATIONAL PACKAGE\n\n`;
  formatted += `## 🎯 DETAILED LESSON PLAN\n\n${content.lessonPlan}\n\n`;
  
  if (content.learningPath) {
    formatted += `---\n\n## 🚀 COMPLETE LEARNING PATHWAY\n\n${content.learningPath}`;
  }
  
  return formatted;
}
