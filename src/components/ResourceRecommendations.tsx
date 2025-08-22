import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Youtube, FileText, BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Resource {
  title: string;
  description: string;
  url: string;
  type: "youtube" | "article" | "documentation" | "course";
  thumbnail?: string;
  duration?: string;
}

interface ResourceCardProps {
  resources: Resource[];
  isLoading: boolean;
  title: string;
}

const getResourceIcon = (type: Resource["type"]) => {
  switch (type) {
    case "youtube":
      return <Youtube className="h-4 w-4 text-red-500" />;
    case "article":
      return <FileText className="h-4 w-4 text-blue-500" />;
    case "documentation":
      return <BookOpen className="h-4 w-4 text-green-500" />;
    case "course":
      return <BookOpen className="h-4 w-4 text-purple-500" />;
    default:
      return <ExternalLink className="h-4 w-4" />;
  }
};

const getResourceBadgeColor = (type: Resource["type"]) => {
  switch (type) {
    case "youtube":
      return "bg-red-100 text-red-800 border-red-200";
    case "article":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "documentation":
      return "bg-green-100 text-green-800 border-green-200";
    case "course":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const ResourceRecommendations: React.FC<ResourceCardProps> = ({
  resources,
  isLoading,
  title,
}) => {
  useEffect(() => {
    console.log("Resources received:", resources);
  }, [resources]);

  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">
              Finding best resources for you...
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (resources.length === 0) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {resources.map((resource, index) => {
            const isExternal = resource.url.startsWith("http");

            const CardContentBox = (
              <div className="group border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="secondary"
                        className={getResourceBadgeColor(resource.type)}
                      >
                        {resource.type}
                      </Badge>
                      {resource.duration && (
                        <span className="text-xs text-muted-foreground">
                          {resource.duration}
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                      {resource.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {resource.description}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-primary">
                      <span>Open resource</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            );

            return isExternal ? (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CardContentBox}
              </a>
            ) : (
              <Link key={index} href={resource.url}>
                {CardContentBox}
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
