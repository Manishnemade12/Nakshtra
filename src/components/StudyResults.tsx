import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, TrendingUp, Clock, ExternalLink, Youtube, BookOpen, Users, Lightbulb, Globe, Volume2 } from "lucide-react";
import { useState } from "react";
import YouTubePlayer from "./YouTubePlayer";
import ArticlePreview from "./ArticlePreview";
import TextToSpeech from "./TextToSpeech";

interface StudyResultsProps {
  content: string;
  branch: string;
  field: string;
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

const StudyResults = ({ content, branch, field, youtubeVideos = [], articles = [] }: StudyResultsProps) => {
  const [showTextToSpeech, setShowTextToSpeech] = useState(false);
  // Enhanced content formatting with section icons
  const formatContent = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    const sections: { title: string; content: string[]; icon: string }[] = [];
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
      
      // Check if this looks like a header
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

    return sections.length > 0 ? sections : [{ title: 'Latest Updates', content: [content], icon: 'external-link' }];
  };

  const getIcon = (iconName: string) => {
    const iconProps = { className: "h-5 w-5 text-academic-blue" };
    switch (iconName) {
      case 'lightbulb': return <Lightbulb {...iconProps} />;
      case 'trending': return <TrendingUp {...iconProps} />;
      case 'book': return <BookOpen {...iconProps} />;
      case 'youtube': return <Youtube {...iconProps} />;
      case 'newspaper': return <Newspaper {...iconProps} />;
      case 'globe': return <Globe {...iconProps} />;
      case 'users': return <Users {...iconProps} />;
      default: return <ExternalLink {...iconProps} />;
    }
  };

  const sections = formatContent(content);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-academic-light to-academic-lighter border-academic-blue/20 shadow-elegant">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Newspaper className="h-6 w-6 text-academic-blue" />
            <CardTitle className="text-2xl font-bold text-foreground">
              Comprehensive Study Guide: {field}
            </CardTitle>
          </div>
          <div className="flex justify-center space-x-2">
            <Badge variant="outline" className="border-academic-blue/50 text-academic-blue">
              <TrendingUp className="h-3 w-3 mr-1" />
              {branch}
            </Badge>
            <Badge variant="outline" className="border-academic-purple/50 text-academic-purple">
              <Clock className="h-3 w-3 mr-1" />
              {new Date().toLocaleDateString()}
            </Badge>
          </div>
          <CardDescription className="text-muted-foreground mt-2">
            AI-powered comprehensive resources including videos, articles, and learning paths
          </CardDescription>
          
          {/* Text-to-Speech Toggle */}
          <div className="mt-4">
            <Button
              onClick={() => setShowTextToSpeech(!showTextToSpeech)}
              variant="outline"
              className="border-academic-blue/30 text-academic-blue hover:bg-academic-blue/10"
            >
              <Volume2 className="h-4 w-4 mr-2" />
              {showTextToSpeech ? 'Hide Audio Player' : 'Listen to Content'}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Text-to-Speech Component */}
      <TextToSpeech content={content} isVisible={showTextToSpeech} />

      {/* YouTube Videos Section */}
      {youtubeVideos.length > 0 && (
        <YouTubePlayer videos={youtubeVideos} />
      )}

      {/* Articles Section */}
      {articles.length > 0 && (
        <ArticlePreview articles={articles} />
      )}

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => (
          <Card 
            key={index} 
            className="bg-card/80 backdrop-blur-sm border-academic-blue/10 hover:border-academic-purple/30 transition-all duration-300 hover:shadow-glow group h-fit"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
                {getIcon(section.icon)}
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.content.map((item, pIndex) => (
                  <div key={pIndex} className="text-sm text-muted-foreground leading-relaxed">
                    {item.startsWith('-') ? (
                      <div className="flex items-start space-x-2">
                        <span className="text-academic-blue mt-1">•</span>
                        <span>{item.substring(1).trim()}</span>
                      </div>
                    ) : (
                      <p>{item}</p>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Action Button for sections with external content */}
              {(section.icon === 'youtube' || section.icon === 'newspaper' || section.icon === 'book') && (
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-academic-blue/30 text-academic-blue hover:bg-academic-blue/10"
                  >
                    {section.icon === 'youtube' && 'Watch Videos'}
                    {section.icon === 'newspaper' && 'Read Articles'}
                    {section.icon === 'book' && 'Start Learning'}
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Action Cards */}
      <div className="grid gap-4 md:grid-cols-3 mt-8">
        <Card className="bg-gradient-to-br from-academic-blue/10 to-academic-blue/5 border-academic-blue/20 hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 text-center">
            <Youtube className="h-8 w-8 text-academic-blue mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Video Learning</h3>
            <p className="text-sm text-muted-foreground">Curated YouTube channels and playlists</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-academic-purple/10 to-academic-purple/5 border-academic-purple/20 hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 text-academic-purple mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Online Courses</h3>
            <p className="text-sm text-muted-foreground">Professional certifications and courses</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-academic-light/50 to-academic-lighter/50 border-academic-blue/10 hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-academic-blue mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Community</h3>
            <p className="text-sm text-muted-foreground">Connect with peers and experts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyResults;