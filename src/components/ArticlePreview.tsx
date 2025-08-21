import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, ExternalLink, Globe, FileText } from "lucide-react";

interface Article {
  title: string;
  url: string;
  source: string;
}

interface ArticlePreviewProps {
  articles: Article[];
}

const ArticlePreview = ({ articles }: ArticlePreviewProps) => {
  if (!articles.length) return null;

  const openArticle = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getSourceIcon = (source: string) => {
    if (source.includes('arxiv')) return <FileText className="h-4 w-4 text-academic-purple" />;
    if (source.includes('medium') || source.includes('blog')) return <Newspaper className="h-4 w-4 text-academic-blue" />;
    return <Globe className="h-4 w-4 text-academic-blue" />;
  };

  const getSourceColor = (source: string) => {
    if (source.includes('arxiv')) return 'border-academic-purple/50 text-academic-purple';
    if (source.includes('medium')) return 'border-orange-500/50 text-orange-500';
    if (source.includes('github')) return 'border-gray-500/50 text-gray-500';
    return 'border-academic-blue/50 text-academic-blue';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Newspaper className="h-6 w-6 text-academic-blue" />
        <h3 className="text-xl font-bold text-foreground">Recent Articles & Publications</h3>
        <Badge variant="outline" className="border-academic-blue/50 text-academic-blue">
          {articles.length} Articles
        </Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <Card 
            key={index}
            className="bg-card/80 backdrop-blur-sm border-academic-blue/10 hover:border-academic-purple/30 transition-all duration-300 hover:shadow-glow group cursor-pointer"
            onClick={() => openArticle(article.url)}
          >
            <CardHeader className="p-4">
              <div className="flex items-start justify-between space-x-2">
                <CardTitle className="text-sm font-semibold text-foreground line-clamp-3 flex-1">
                  {article.title}
                </CardTitle>
                {getSourceIcon(article.source)}
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <Badge variant="outline" className={`text-xs ${getSourceColor(article.source)}`}>
                  {article.source}
                </Badge>
                <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardHeader>
            
            <CardContent className="p-4 pt-0">
              <CardDescription className="text-xs text-muted-foreground mb-3 line-clamp-2">
                Click to read the full article on {article.source}
              </CardDescription>
              
              <Button 
                size="sm" 
                variant="outline"
                className="w-full border-academic-blue/30 text-academic-blue hover:bg-academic-blue/10"
                onClick={(e) => {
                  e.stopPropagation();
                  openArticle(article.url);
                }}
              >
                <ExternalLink className="h-3 w-3 mr-2" />
                Read Article
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArticlePreview;