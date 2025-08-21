const GEMINI_API_KEY = 'AIzaSyA2Tsox4MHVXvwxlthszkxElBOJAXmY3Yk';

export interface GeminiResponse {
  content: string;
  success: boolean;
  error?: string;
  youtubeVideos?: Array<{
    title: string;
    videoId: string;
    channel: string;
  }>;
  articles?: Array<{
    title: string;
    url: string;
    source: string;
  }>;
}

interface ParsedContent {
  sections: Array<{
    title: string;
    content: string[];
    icon: string;
  }>;
  youtubeVideos: Array<{
    title: string;
    videoId: string;
    channel: string;
  }>;
  articles: Array<{
    title: string;
    url: string;
    source: string;
  }>;
}

function parseContentWithLinks(content: string): ParsedContent {
  const youtubeVideos: ParsedContent['youtubeVideos'] = [];
  const articles: ParsedContent['articles'] = [];
  
  // Extract YouTube links from content
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
  const articleRegex = /(https?:\/\/[^\s]+)/g;
  
  let match;
  
  // Find YouTube videos in content
  while ((match = youtubeRegex.exec(content)) !== null) {
    const videoId = match[1];
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.includes(match[0])) {
        const titleMatch = line.match(/["']([^"']+)["']|([^-•\n]+)(?=https?|$)/);
        if (titleMatch) {
          youtubeVideos.push({
            title: (titleMatch[1] || titleMatch[2] || `Educational Video ${youtubeVideos.length + 1}`).trim(),
            videoId,
            channel: 'Educational Channel'
          });
        }
        break;
      }
    }
  }
  
  // Find article links
  while ((match = articleRegex.exec(content)) !== null) {
    if (!match[0].includes('youtube') && !match[0].includes('youtu.be')) {
      try {
        const url = match[0];
        const hostname = new URL(url).hostname;
        const lines = content.split('\n');
        let title = `Article ${articles.length + 1}`;
        
        // Try to find title near the URL
        for (const line of lines) {
          if (line.includes(url)) {
            const titleMatch = line.match(/["']([^"']+)["']|([^-•\n]+)(?=https?|$)/);
            if (titleMatch) {
              title = (titleMatch[1] || titleMatch[2] || title).trim();
            }
            break;
          }
        }
        
        articles.push({
          title,
          url,
          source: hostname
        });
      } catch (e) {
        // Skip malformed URLs
      }
    }
  }
  
  // Add sample content if no URLs found in response
  if (youtubeVideos.length === 0) {
    // Add some popular educational videos as examples
    const sampleVideos = [
      { title: "Introduction to Machine Learning", videoId: "ukzFI9rgwfU", channel: "MIT OpenCourseWare" },
      { title: "Deep Learning Explained", videoId: "6M5VXKLf4D4", channel: "Zach Star" },
      { title: "AI and the Future", videoId: "2ePf9rue1Ao", channel: "TED" }
    ];
    youtubeVideos.push(...sampleVideos.slice(0, 2));
  }
  
  if (articles.length === 0) {
    // Add sample articles
    const sampleArticles = [
      { title: "Latest AI Research Breakthroughs", url: "https://arxiv.org/list/cs.AI/recent", source: "arxiv.org" },
      { title: "Industry Trends in Technology", url: "https://www.nature.com/subjects/computer-science", source: "nature.com" },
      { title: "Career Guide for Tech Professionals", url: "https://www.coursera.org/browse/computer-science", source: "coursera.org" }
    ];
    articles.push(...sampleArticles.slice(0, 2));
  }
  
  // Parse sections
  const lines = content.split('\n').filter(line => line.trim());
  const sections: ParsedContent['sections'] = [];
  let currentSection: { title: string; content: string[]; icon: string } | null = null;
  
  const getSectionIcon = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('breakthrough') || lowerTitle.includes('research')) return 'lightbulb';
    if (lowerTitle.includes('trend') || lowerTitle.includes('market')) return 'trending';
    if (lowerTitle.includes('learning') || lowerTitle.includes('course')) return 'book';
    if (lowerTitle.includes('youtube') || lowerTitle.includes('video')) return 'youtube';
    if (lowerTitle.includes('article') || lowerTitle.includes('publication')) return 'newspaper';
    if (lowerTitle.includes('application') || lowerTitle.includes('real-world')) return 'globe';
    if (lowerTitle.includes('community') || lowerTitle.includes('event')) return 'users';
    return 'external-link';
  };
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    if (
      trimmedLine.startsWith('#') || 
      trimmedLine.startsWith('**') || 
      (trimmedLine.includes('🔬') || trimmedLine.includes('📈') || trimmedLine.includes('📚') || 
       trimmedLine.includes('🎥') || trimmedLine.includes('📰') || trimmedLine.includes('🏢') || 
       trimmedLine.includes('🌐'))
    ) {
      if (currentSection) {
        sections.push(currentSection);
      }
      const cleanTitle = trimmedLine.replace(/[#*🔬📈📚🎥📰🏢🌐]/g, '').trim();
      currentSection = {
        title: cleanTitle,
        content: [],
        icon: getSectionIcon(cleanTitle)
      };
    } else if (currentSection && trimmedLine) {
      currentSection.content.push(trimmedLine);
    } else if (trimmedLine) {
      if (!currentSection) {
        currentSection = { title: 'Latest Updates', content: [], icon: 'external-link' };
      }
      currentSection.content.push(trimmedLine);
    }
  });
  
  if (currentSection) {
    sections.push(currentSection);
  }
  
  return { sections, youtubeVideos, articles };
}

export async function generateStudyContent(
  branch: string, 
  field: string
): Promise<GeminiResponse> {
  try {
    const prompt = `As an expert academic advisor and researcher, provide comprehensive and current information about ${field} in ${branch}. 

Structure your response with these sections and include SPECIFIC YouTube video links and article URLs:

## 🔬 Latest Breakthroughs & Research (2024-2025)
- Recent discoveries and innovations
- Key research papers with URLs when available
- Emerging technologies and methodologies

## 📈 Industry Trends & Market Analysis  
- Current market trends and statistics
- Future predictions and opportunities
- Career paths and salary insights

## 📚 Learning Resources & Courses
- Recommended online courses with specific URLs
- YouTube channels with actual channel links
- Free learning platforms and resources
- Professional certifications

## 🎥 Educational YouTube Videos & Channels
IMPORTANT: Include ACTUAL YouTube video links in this format:
- "Video Title" by Channel Name - https://www.youtube.com/watch?v=VIDEO_ID
- "Another Video Title" - https://youtu.be/VIDEO_ID
- Focus on recent (2023-2025) educational content

## 📰 Articles & Publications
IMPORTANT: Include ACTUAL article URLs in this format:
- "Article Title" - https://website.com/article-url
- "Research Paper Title" - https://arxiv.org/paper-link
- Recent blog posts and industry publications with URLs

## 🏢 Real-World Applications
- Industry implementations with company examples
- Startup innovations with websites
- Enterprise solutions and case studies

## 🌐 Communities & Events
- Professional communities with URLs
- Upcoming conferences with registration links
- Online forums and Discord/Reddit communities

CRITICAL: For YouTube and article sections, you MUST include actual, working URLs. Search your knowledge for real YouTube videos and articles about ${field} in ${branch}. Include at least 3-5 YouTube videos and 3-5 articles with actual URLs.

Prioritize recent content from 2023-2025. Make sure all URLs are real and functional.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates.length > 0) {
      const content = data.candidates[0].content.parts[0].text;
      const parsedContent = parseContentWithLinks(content);
      
      return {
        content,
        success: true,
        youtubeVideos: parsedContent.youtubeVideos,
        articles: parsedContent.articles
      };
    } else {
      throw new Error('No content generated');
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      content: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      youtubeVideos: [],
      articles: []
    };
  }
}