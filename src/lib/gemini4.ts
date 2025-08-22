import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDe54LzV_ZpC-xngIrZ-gbZnrh7vpm8Epg";

if (!API_KEY) {
  throw new Error("Gemini API key not found");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.6,
  },
});

interface OnboardingData {
  name: string;
  age: number;
  subject: string;
  goals: string;
  confidenceLevel: number;
  hoursPerWeek: number;
  preferredTime: string;
}

export interface StudyStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

export interface StudyPlan {
  title: string;
  description: string;
  estimatedDuration: string;
  steps: StudyStep[];
  milestones: Milestone[];
  motivationalTips: string[];
}

export async function generateStudyPlan(userData: OnboardingData): Promise<StudyPlan> {
  const prompt = `
    Create a comprehensive, personalized study plan based on the following user data:
    
    Name: ${userData.name}
    Age: ${userData.age}
    Subject: ${userData.subject}
    Goals: ${userData.goals}
    Confidence Level: ${userData.confidenceLevel}%
    Available Study Time: ${userData.hoursPerWeek} hours per week
    Preferred Study Time: ${userData.preferredTime}
    
    Please generate a detailed study plan with the following structure in JSON format.

    IMPORTANT OUTPUT RULES:
    - Respond with a single JSON object only.
    - Do NOT include code fences, markdown, or any explanatory text.
    - The JSON must adhere exactly to the schema below.

    {
      "title": "A catchy title for the study plan",
      "description": "A brief description of what the plan covers",
      "estimatedDuration": "How long the plan should take (e.g., '8 weeks', '3 months')",
      "steps": [
        {
          "id": "unique-id",
          "title": "Step title",
          "description": "Detailed description of what to do in this step",
          "completed": false,
          "estimatedTime": "Time needed (e.g., '2 hours', '1 week')",
          "difficulty": "easy|medium|hard"
        }
      ],
      "milestones": [
        {
          "id": "unique-id",
          "title": "Milestone title",
          "description": "What achieving this milestone means",
          "completed": false,
          "dueDate": "Expected completion date (e.g., 'Week 3', 'End of Month 1')"
        }
      ],
      "motivationalTips": [
        "Array of 8-10 motivational tips and study advice specific to the subject and goals"
      ]
    }
    
    Guidelines:
    - Create 8-12 progressive study steps that build upon each other
    - Include 4-6 meaningful milestones spread throughout the plan
    - Adjust difficulty based on confidence level (${userData.confidenceLevel}%)
    - Consider the available time (${userData.hoursPerWeek} hours/week)
    - Make it specific to ${userData.subject} and the stated goals
    - Include practical, actionable steps with explicit "Assignments:" in each step description
    - Start the description with a short, friendly introduction tailored to the user
    - Design milestones that clearly correspond to completing specific steps (e.g., "After completing Steps 1-2")
    - Ensure the timeline is realistic for the available study hours
    
    Return only valid JSON, no additional text.
  `;

  try {
    let text = "";
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }]}],
          generationConfig: { responseMimeType: "application/json", temperature: 0.6 },
        });
        const response = await result.response;
        text = response.text();
        break;
      } catch (err: any) {
        const msg = String(err?.message || "");
        if (attempt < 2 && (msg.includes("429") || msg.includes("RATE_LIMIT") || msg.includes("RESOURCE_EXHAUSTED"))) {
          await new Promise((r) => setTimeout(r, (attempt + 1) * 1500));
          continue;
        }
        throw err;
      }
    }

    let studyPlan: StudyPlan;

    // Prefer direct JSON when model is configured for JSON output
    try {
      studyPlan = JSON.parse(text) as StudyPlan;
    } catch {
      // Fallback: Clean the response to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in response");
      }
      studyPlan = JSON.parse(jsonMatch[0]) as StudyPlan;
    }

    // Validate the structure
    if (!studyPlan.title || !studyPlan.steps || !studyPlan.milestones) {
      throw new Error("Invalid study plan structure");
    }

    return studyPlan;
  } catch (error) {
    console.error("Error generating study plan:", error);
    
    // Fallback study plan
    return {
      title: `Master ${userData.subject} - Your Personalized Journey`,
      description: `A comprehensive study plan tailored for ${userData.name} to achieve their learning goals in ${userData.subject}.`,
      estimatedDuration: "8 weeks",
      steps: [
        {
          id: "step-1",
          title: "Foundation Assessment",
          description: `Review your current knowledge in ${userData.subject} and identify key areas for improvement.`,
          completed: false,
          estimatedTime: "2 hours",
          difficulty: "easy"
        },
        {
          id: "step-2",
          title: "Core Concepts Introduction",
          description: `Learn the fundamental concepts and principles of ${userData.subject}.`,
          completed: false,
          estimatedTime: "1 week",
          difficulty: userData.confidenceLevel > 60 ? "medium" : "easy"
        },
        {
          id: "step-3",
          title: "Practice Exercises",
          description: "Complete guided practice exercises to reinforce your understanding.",
          completed: false,
          estimatedTime: "1 week",
          difficulty: "medium"
        },
        {
          id: "step-4",
          title: "Advanced Applications",
          description: "Apply your knowledge to solve more complex problems and scenarios.",
          completed: false,
          estimatedTime: "2 weeks",
          difficulty: "hard"
        },
        {
          id: "step-5",
          title: "Final Assessment",
          description: "Demonstrate your mastery through comprehensive evaluation.",
          completed: false,
          estimatedTime: "1 week",
          difficulty: "medium"
        }
      ],
      milestones: [
        {
          id: "milestone-1",
          title: "Foundation Complete",
          description: "Successfully completed the foundational knowledge assessment.",
          completed: false,
          dueDate: "End of Week 2"
        },
        {
          id: "milestone-2",
          title: "Halfway Point",
          description: "Reached the midpoint of your learning journey with solid understanding.",
          completed: false,
          dueDate: "End of Week 4"
        },
        {
          id: "milestone-3",
          title: "Goal Achievement",
          description: "Successfully achieved your stated learning goals!",
          completed: false,
          dueDate: "End of Week 8"
        }
      ],
      motivationalTips: [
        "Break down complex topics into smaller, manageable chunks.",
        "Practice consistently every day, even if it's just for 15 minutes.",
        "Don't be afraid to ask questions - curiosity drives learning.",
        "Celebrate small wins along the way to stay motivated.",
        "Connect new concepts to things you already know.",
        "Take regular breaks to let your brain process information.",
        "Review previous material regularly to strengthen memory.",
        "Find a study buddy or join a community for support.",
        "Apply what you learn to real-world situations when possible.",
        "Remember: progress, not perfection, is the goal."
      ]
    };
  }
}