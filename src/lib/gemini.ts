import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function generateLessonPlan(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const systemPrompt = `Create a detailed lesson plan for the following topic:

${prompt}

Basic Information
- Subject Area:
- Grade Level:
- Duration:
- Prerequisites:

Learning Objectives
[List 3-4 specific, measurable objectives]

Materials and Resources
- Required Materials:
- Technology Needs:
- Additional Resources:

Lesson Structure

1. Introduction (10 minutes)
[Engaging hook and activation of prior knowledge]

2. Main Content (30 minutes)
[Step-by-step instruction and activities]

3. Guided Practice (20 minutes)
[Interactive activities and demonstrations]

4. Independent Practice (15 minutes)
[Student-centered activities]

5. Assessment (10 minutes)
[Formative assessment strategies]

6. Conclusion (5 minutes)
[Summary and reflection]

Extensions and Modifications
- For Advanced Learners:
- For Struggling Learners:
- Homework/Follow-up:`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating lesson plan:', error);
    throw new Error('Failed to generate lesson plan');
  }
} 