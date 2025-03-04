
import React, { useEffect } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/components/Layout";
import MoodSelector from "@/components/MoodSelector";
import ThemePreview from "@/components/ThemePreview";
import AiThemeSuggestions from "@/components/AiThemeSuggestions";
import SentimentAnalysis from "@/components/SentimentAnalysis";
import DarkModeToggle from "@/components/DarkModeToggle";
import ThemeCustomizer from "@/components/ThemeCustomizer";
import MusicRecommendation from "@/components/MusicRecommendation";
import { Separator } from "@/components/ui/separator";
import { preloadAudio } from "@/services/soundService";

const Index = () => {
  // Preload audio files when the component mounts
  useEffect(() => {
    preloadAudio();
  }, []);

  return (
    <ThemeProvider>
      <Layout>
        <DarkModeToggle />
        <ThemeCustomizer />
        
        <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
          <h1 className="text-5xl font-bold tracking-tight text-center mb-4 animate-slide-down bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Mood-Based Theme Switcher
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl text-lg animate-slide-down" style={{ animationDelay: "100ms" }}>
            Experience a UI that adapts to your emotional state with fluid transitions and beautiful design
          </p>
        </div>
        
        <MoodSelector />
        
        <Separator className="my-16 max-w-2xl mx-auto opacity-50" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="animation-stagger" style={{ animationDelay: "300ms" }}>
            <SentimentAnalysis />
          </div>
          <div className="animation-stagger" style={{ animationDelay: "400ms" }}>
            <AiThemeSuggestions />
          </div>
        </div>
        
        <div className="animation-stagger mb-16" style={{ animationDelay: "500ms" }}>
          <MusicRecommendation />
        </div>
        
        <ThemePreview />
      </Layout>
    </ThemeProvider>
  );
};

export default Index;
