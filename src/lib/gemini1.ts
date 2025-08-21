const GEMINI_API_KEY = "AIzaSyAh3vaNPtuc4o6NA1QoeWmjyw8ic7-PJuo";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export interface MotivationRequest {
  subject?: string;
  currentMood?: "motivated" | "tired" | "stressed" | "confident" | "overwhelmed";
  studyGoal?: string;
  sessionDuration?: number;
  previousProgress?: number;
}

export interface StudyTip {
  title: string;
  description: string;
  category: "motivation" | "technique" | "planning" | "wellbeing";
}

export class GeminiStudyBuddy {
  private apiKey: string;

  constructor() {
    this.apiKey = GEMINI_API_KEY;
  }

  private async makeRequest(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API request failed:', error);
      return this.getFallbackMessage();
    }
  }

  private getFallbackMessage(): string {
    const fallbackMessages = [
      "You've got this! Every study session brings you closer to your goals. 🎯",
      "Consistency beats perfection. Keep showing up for yourself! 💪", 
      "Your brain is like a muscle - the more you use it, the stronger it gets! 🧠",
      "Take breaks when needed, but never give up on your dreams! ⭐",
      "Progress, not perfection. You're doing amazing! 🚀",
      "Focus on progress, not perfection. You're building something great! 💎",
      "Every expert was once a beginner. Keep pushing forward! 🌟",
      "Your dedication today creates your success tomorrow! 🔥"
    ];
    return fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
  }

  async getMotivationalMessage(request: MotivationRequest = {}): Promise<string> {
    const { subject, currentMood, studyGoal, sessionDuration, previousProgress } = request;
    
    let prompt = `You are an AI study motivation coach. Generate a personalized, encouraging message (max 50 words) for a student.`;
    
    if (subject) prompt += ` They are studying ${subject}.`;
    if (currentMood) prompt += ` They are currently feeling ${currentMood}.`;
    if (studyGoal) prompt += ` Their goal is: ${studyGoal}.`;
    if (sessionDuration) prompt += ` They plan to study for ${sessionDuration} minutes.`;
    if (previousProgress) prompt += ` They have completed ${previousProgress}% of their current topic.`;
    
    prompt += ` Make it personal, energetic, and actionable. Include an emoji at the end.`;

    return await this.makeRequest(prompt);
  }

  async getStudyTechnique(subject?: string): Promise<StudyTip> {
    let prompt = `Suggest one effective study technique`;
    if (subject) prompt += ` specifically for ${subject}`;
    prompt += `. Respond with a JSON object containing "title", "description", and "category" (motivation/technique/planning/wellbeing).`;

    try {
      const response = await this.makeRequest(prompt);
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Failed to parse study technique:', error);
    }

    // Fallback technique
    return {
      title: "Pomodoro Technique",
      description: "Study for 25 minutes, then take a 5-minute break. Repeat for maximum focus and retention.",
      category: "technique"
    };
  }

  async generateStudyPlan(subjects: string[], totalHours: number): Promise<string[]> {
    const prompt = `Create a balanced study schedule for these subjects: ${subjects.join(', ')}. 
    Total available time: ${totalHours} hours per week. 
    Provide a list of specific time allocations and study strategies. Keep each point under 30 words.`;

    try {
      const response = await this.makeRequest(prompt);
      return response.split('\n').filter(line => line.trim().length > 0).slice(0, 6);
    } catch (error) {
      return [
        `Allocate ${Math.floor(totalHours / subjects.length)} hours per week to each subject`,
        "Start with your most challenging subject when energy is highest",
        "Use spaced repetition for better retention",
        "Take 10-minute breaks every hour",
        "Review previous material before learning new concepts",
        "End each session with a quick summary"
      ];
    }
  }

  async getProgressEncouragement(progressPercentage: number, subject: string): Promise<string> {
    const prompt = `A student has completed ${progressPercentage}% of their ${subject} studies. 
    Give them encouraging feedback about their progress (max 40 words). 
    Be specific about their achievement level and motivate them to continue.`;

    return await this.makeRequest(prompt);
  }
}

// Export singleton instance
export const studyBuddy = new GeminiStudyBuddy();