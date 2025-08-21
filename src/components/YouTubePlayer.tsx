import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, Youtube } from "lucide-react";

interface YouTubeVideo {
  title: string;
  videoId: string;
  channel: string;
}

interface YouTubePlayerProps {
  videos: YouTubeVideo[];
}

const YouTubePlayer = ({ videos }: YouTubePlayerProps) => {
  if (!videos.length) return null;

  const openInNewTab = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Youtube className="h-6 w-6 text-red-500" />
        <h3 className="text-xl font-bold text-foreground">Educational Videos</h3>
        <Badge variant="outline" className="border-red-500/50 text-red-500">
          {videos.length} Videos
        </Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, index) => (
          <Card 
            key={index}
            className="bg-card/80 backdrop-blur-sm border-academic-blue/10 hover:border-red-500/30 transition-all duration-300 hover:shadow-glow group overflow-hidden"
          >
            <div className="relative">
              {/* YouTube Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-t-lg"
                />
              </div>
              
              {/* Overlay with play button */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  onClick={() => openInNewTab(video.videoId)}
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open
                </Button>
              </div>
            </div>
            
            <CardHeader className="p-3">
              <CardTitle className="text-sm font-semibold text-foreground line-clamp-2">
                {video.title}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                By {video.channel}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-3 pt-0">
              <Button 
                onClick={() => openInNewTab(video.videoId)}
                size="sm" 
                variant="outline"
                className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10"
              >
                <Play className="h-3 w-3 mr-2" />
                Watch Video
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default YouTubePlayer;