import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function generateLessonPlan(prompt: string): Promise<string> {
  try {
    // Use the latest available model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const systemPrompt = `Create a detailed lesson plan for the following topic:

Lesson Plan: ${prompt}

# Basic Information:

Subject Area: [Specify subject area]
Grade Level: [Specify grade level]
Duration: [Specify duration]
Prerequisites: [List prerequisites]

# Learning Objectives:

[List 3-4 specific, measurable objectives separated by line breaks]

# Materials and Resources:

Required Materials:
[List materials]

Technology Needs:
[List technology requirements]

Additional Resources:
[List additional resources]

# Lesson Structure:

Introduction (10 minutes):
[Describe engaging hook and activation of prior knowledge]

Main Content (30 minutes):
[Describe step-by-step instruction and activities]

Guided Practice (20 minutes):
[Describe interactive activities and demonstrations]

Independent Practice (15 minutes):
[Describe student-centered activities]

Assessment (10 minutes):
[Describe formative assessment strategies]

Conclusion (5 minutes):
[Describe summary and reflection]

# Extensions and Modifications:

For Advanced Learners:
[Provide extensions]

For Struggling Learners:
[Provide modifications]

Homework/Follow-up:
[Specify homework or follow-up activities]`;

    // Generate content using the correct format
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
    });

    // Extract text from the response
    const text = result.response.candidates[0]?.content?.parts[0]?.text || "No response generated.";

    // Format the response for better readability
    let formattedResponse = text
      .replace(/^#\s+([^:]+):/gm, '\n# $1:')
      .replace(/([A-Za-z]+)\s*\((\d+)\s*minutes\):/g, '\n$1 ($2 minutes):')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line)
      .join('\n\n');

    return formattedResponse;
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    throw new Error("Failed to generate lesson plan.");
  }
}
