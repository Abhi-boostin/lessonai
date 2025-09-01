import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API with Flash model
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });

// Generate lesson plan with Gemini Flash
export async function generateLessonPlan(prompt: string): Promise<string> {
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

    // Generate content using Gemini 2.5 Flash
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt,
    });

    if (!response.text) {
      throw new Error("No response text received from Gemini");
    }

    // Format the response for better readability
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
    throw new Error(`Failed to generate lesson plan: ${error.message}`);
  }
}
