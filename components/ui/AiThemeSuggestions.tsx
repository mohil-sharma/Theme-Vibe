
import React, { useState } from "react";
import { useMoodTheme } from "@/contexts/ThemeContext";
import { getAiThemeSuggestion } from "@/services/aiService";
import { Button } from "@/components/ui/button";
import { Sparkles, Palette, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const AiThemeSuggestions = () => {
  const { currentMood } = useMoodTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<{
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  } | null>(null);

  const handleGetSuggestion = async () => {
    setIsLoading(true);
    try {
      const aiSuggestion = await getAiThemeSuggestion(currentMood);
      setSuggestion(aiSuggestion);
      toast({
        title: "AI Suggestion Ready",
        description: "We've generated a new color palette based on your mood.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error getting AI theme suggestion:", error);
      toast({
        title: "Couldn't Generate Suggestion",
        description: "There was an error getting the AI theme suggestion.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={cn(
      "backdrop-blur-sm shadow-lg border-primary/10 transition-all duration-300",
      "hover:shadow-xl hover:border-primary/20",
      "animate-scale-in"
    )}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          AI Theme Suggestions
        </CardTitle>
        <CardDescription>
          Get AI-generated color palette suggestions based on your current mood
        </CardDescription>
      </CardHeader>
      <CardContent>
        {suggestion ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-3">
              Here's a custom palette for your <span className="font-medium text-primary">{currentMood}</span> mood:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center">
                <div className="w-full h-16 rounded-md mb-2" style={{ backgroundColor: suggestion.primary }}></div>
                <span className="text-xs font-medium">Primary: {suggestion.primary}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full h-16 rounded-md mb-2" style={{ backgroundColor: suggestion.secondary }}></div>
                <span className="text-xs font-medium">Secondary: {suggestion.secondary}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full h-16 rounded-md mb-2" style={{ backgroundColor: suggestion.accent }}></div>
                <span className="text-xs font-medium">Accent: {suggestion.accent}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-full h-16 rounded-md mb-2 bg-gradient-to-br ${suggestion.background}`}></div>
                <span className="text-xs font-medium">Background</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <Palette className="h-12 w-12 text-primary/30 mb-4" />
            <p className="text-center text-muted-foreground">
              Click the button below to get AI-generated color suggestions for your current mood
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGetSuggestion}
          disabled={isLoading}
          className="w-full flex items-center gap-2 group relative overflow-hidden"
          variant={suggestion ? "outline" : "default"}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating Suggestions...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
              {suggestion ? "Generate New Suggestion" : "Get AI Suggestions"}
            </>
          )}
          <span className="absolute -z-10 top-0 left-0 right-0 h-full w-full bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: 'translateX(-100%)' }}></span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AiThemeSuggestions;
