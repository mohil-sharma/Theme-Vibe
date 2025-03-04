
import React, { useState } from "react";
import { useMoodTheme, MoodType } from "@/contexts/ThemeContext";
import { analyzeSentiment } from "@/services/aiService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Loader2, MessageSquareText, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const SentimentAnalysis = () => {
  const { setMood } = useMoodTheme();
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedMood, setDetectedMood] = useState<MoodType | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setDetectedMood(null); // Reset detected mood when text changes
  };

  const handleAnalyzeSentiment = async () => {
    if (!text.trim()) {
      toast({
        title: "No Text",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const mood = await analyzeSentiment(text);
      setDetectedMood(mood);
      toast({
        title: "Sentiment Analyzed",
        description: `We detected a ${mood} mood from your text.`,
        duration: 5000,
      });
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your text.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplyMood = () => {
    if (detectedMood) {
      setMood(detectedMood);
      toast({
        title: "Mood Applied",
        description: `Your theme has been updated to match your ${detectedMood} mood.`,
      });
    }
  };

  const getMoodEmoji = (mood: MoodType): string => {
    switch (mood) {
      case "happy": return "😊";
      case "calm": return "😌";
      case "energetic": return "⚡";
      case "melancholy": return "😔";
      case "creative": return "🎨";
      default: return "😐";
    }
  };

  return (
    <Card className={cn(
      "backdrop-blur-sm shadow-lg border-primary/10 transition-all duration-300",
      "hover:shadow-xl hover:border-primary/20",
      "animate-scale-in",
      "overflow-hidden"
    )}>
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5" />
          Sentiment Analysis
        </CardTitle>
        <CardDescription>
          Describe how you feel, and we'll detect your mood
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea 
            placeholder="Type how you're feeling today... (e.g., 'I feel really energetic and ready to take on the day!')"
            className="min-h-[120px] resize-none"
            value={text}
            onChange={handleTextChange}
          />
          
          {detectedMood && (
            <div className="p-4 rounded-md bg-primary/5 animate-fade-in flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1 flex items-center">
                  <MessageSquareText className="h-4 w-4 mr-2" />
                  Detected Mood: 
                </p>
                <div className="text-lg font-bold text-primary flex items-center">
                  {getMoodEmoji(detectedMood)} <span className="ml-2 capitalize">{detectedMood}</span>
                </div>
              </div>
              <Button 
                onClick={handleApplyMood}
                variant="outline"
                size="sm"
                className="relative overflow-hidden group"
              >
                <span className="relative z-10">Apply This Mood</span>
                <span className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300"></span>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleAnalyzeSentiment}
          disabled={isAnalyzing || !text.trim()}
          className="w-full flex items-center gap-2 group relative overflow-hidden"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing Your Sentiment...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
              Analyze My Mood
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SentimentAnalysis;
