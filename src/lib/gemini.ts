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

export async function generateLessonPlan(prompt: string): Promise<string> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
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

      // Generate content using the latest API format with Gemini 2.5 Flash
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: systemPrompt,
      });

      if (!response.text) {
        throw new Error("No response text received from the model");
      }

      // Format the response for better readability
      let formattedResponse = response.text
        .replace(/^#\s+([^:]+):/gm, '\n# $1:')
        .replace(/([A-Za-z]+)\s*\((\d+)\s*minutes\):/g, '\n$1 ($2 minutes):')
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
