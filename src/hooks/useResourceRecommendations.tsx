import { GoogleGenerativeAI } from '@google/generative-ai';

interface Resource {
  title: string;
  description: string;
  url: string;
  type: 'youtube' | 'article' | 'documentation' | 'course';
  thumbnail?: string;
  duration?: string;
}

const GEMINI_API_KEY = 'AIzaSyBKZSGdJJ4rGpCBhvLm8uX1zRqJzNLKJYw'; // You should replace this with your actual API key

export const useResourceRecommendations = () => {
  const fetchResources = async (
    subject: string,
    step: number,
    userLevel: string = 'beginner'
  ): Promise<Resource[]> => {
    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const stepContext = {
        1: 'getting started and introduction',
        2: 'choosing the right subject and learning path',
        3: 'setting learning goals and objectives',
        4: 'building confidence and assessing skill level',
        5: 'creating an effective study schedule'
      };

      const prompt = `
        Generate 4 high-quality learning resources for a ${userLevel} level student who wants to learn ${subject || 'general studies'}.
        Focus on: ${stepContext[step as keyof typeof stepContext]}
        
        For each resource, provide:
        - title: Clear, engaging title
        - description: Brief 1-2 sentence description
        - url: Real, working URL (prefer popular educational platforms)
        - type: one of [youtube, article, documentation, course]
        - duration: estimated time (for videos/courses)
        
        Prioritize:
        - Khan Academy, Coursera, edX for courses
        - YouTube channels like Crash Course, 3Blue1Brown, TED-Ed for videos
        - MDN, W3Schools for documentation (if programming)
        - Harvard Business Review, MIT Technology Review for articles
        
        Return as valid JSON array only, no additional text:
        [
          {
            "title": "Resource Title",
            "description": "Brief description",
            "url": "https://example.com",
            "type": "youtube",
            "duration": "15 min"
          }
        ]
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const resources = JSON.parse(jsonMatch[0]);
        return resources.slice(0, 4); // Limit to 4 resources
      }
      
      // Fallback resources if API fails
      return getFallbackResources(subject, step);
    } catch (error) {
      console.error('Error fetching resources:', error);
      return getFallbackResources(subject, step);
    }
  };

  return { fetchResources };
};

const getFallbackResources = (subject: string, step: number): Resource[] => {
  const fallbackResources: Record<number, Resource[]> = {
    1: [
      {
        title: "How to Start Learning Anything",
        description: "A comprehensive guide to beginning your learning journey effectively.",
        url: "https://www.youtube.com/watch?v=nTYVLAdu2KI",
        type: "youtube",
        duration: "12 min"
      },
      {
        title: "The Science of Learning",
        description: "Research-backed strategies for effective learning and retention.",
        url: "https://www.coursera.org/learn/learning-how-to-learn",
        type: "course",
        duration: "4 weeks"
      }
    ],
    2: [
      {
        title: "Khan Academy - Free Online Courses",
        description: "World-class education for anyone, anywhere. Covers all major subjects.",
        url: "https://www.khanacademy.org/",
        type: "course"
      },
      {
        title: "Coursera Subject Catalog",
        description: "Explore courses from top universities in your chosen field.",
        url: "https://www.coursera.org/browse",
        type: "course"
      }
    ],
    3: [
      {
        title: "Setting SMART Learning Goals",
        description: "How to create specific, measurable, achievable learning objectives.",
        url: "https://www.youtube.com/watch?v=1-SvuFIQjK8",
        type: "youtube",
        duration: "8 min"
      },
      {
        title: "Goal Setting for Students",
        description: "Proven strategies for academic success and personal growth.",
        url: "https://www.edutopia.org/article/goal-setting-students",
        type: "article"
      }
    ],
    4: [
      {
        title: "Building Confidence in Learning",
        description: "Overcome self-doubt and develop a growth mindset for success.",
        url: "https://www.youtube.com/watch?v=pN34FNbOKXc",
        type: "youtube",
        duration: "15 min"
      },
      {
        title: "Growth Mindset for Students",
        description: "How to embrace challenges and learn from failures.",
        url: "https://www.mindsetworks.com/science/",
        type: "article"
      }
    ],
    5: [
      {
        title: "How to Create a Study Schedule",
        description: "Time management techniques for effective studying and learning.",
        url: "https://www.youtube.com/watch?v=p60rN9JEapg",
        type: "youtube",
        duration: "10 min"
      },
      {
        title: "The Pomodoro Technique",
        description: "A time management method to improve focus and productivity.",
        url: "https://todoist.com/productivity-methods/pomodoro-technique",
        type: "article"
      }
    ]
  };

  return fallbackResources[step] || [];
};