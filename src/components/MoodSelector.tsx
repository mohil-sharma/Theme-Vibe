
import React, { useEffect } from "react";
import { useMoodTheme, moodOptions, MoodType } from "@/contexts/ThemeContext";
import { 
  Smile, 
  Coffee, 
  Zap, 
  CloudMoon, 
  Palette, 
  CircleUser,
  Sparkles,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { playMoodSound } from "@/services/soundService";

const getMoodIcon = (mood: MoodType) => {
  switch (mood) {
    case "happy":
      return <Smile className="h-6 w-6" />;
    case "calm":
      return <Coffee className="h-6 w-6" />;
    case "energetic":
      return <Zap className="h-6 w-6" />;
    case "melancholy":
      return <CloudMoon className="h-6 w-6" />;
    case "creative":
      return <Palette className="h-6 w-6" />;
    default:
      return <CircleUser className="h-6 w-6" />;
  }
};

const getMoodAnimation = (mood: MoodType) => {
  switch (mood) {
    case "happy":
      return "animate-bounce";
    case "calm":
      return "animate-float";
    case "energetic":
      return "animate-pulse-soft";
    case "melancholy":
      return "animate-float";
    case "creative":
      return "animate-pulse-soft";
    default:
      return "";
  }
};

const getMoodCardAnimation = (mood: MoodType) => {
  switch (mood) {
    case "happy":
      return "hover:scale-105 transition-transform duration-300";
    case "calm":
      return "hover:translate-y-[-5px] transition-transform duration-500";
    case "energetic":
      return "hover:rotate-1 hover:scale-105 transition-all duration-200";
    case "melancholy":
      return "hover:translate-y-[-3px] transition-transform duration-700";
    case "creative":
      return "hover:rotate-[-1deg] hover:scale-[1.03] transition-all duration-300";
    default:
      return "hover:scale-[1.02] transition-transform duration-300";
  }
};

const getMoodCardGlow = (mood: MoodType, isActive: boolean) => {
  if (!isActive) return "";
  
  switch (mood) {
    case "happy":
      return "shadow-[0_0_15px_rgba(255,200,0,0.3)]";
    case "calm":
      return "shadow-[0_0_15px_rgba(0,150,255,0.2)]";
    case "energetic":
      return "shadow-[0_0_15px_rgba(255,100,100,0.3)]";
    case "melancholy":
      return "shadow-[0_0_15px_rgba(130,100,200,0.25)]";
    case "creative":
      return "shadow-[0_0_15px_rgba(200,100,255,0.3)]";
    default:
      return "shadow-[0_0_10px_rgba(100,100,100,0.2)]";
  }
};

const MoodSelector = () => {
  const { currentMood, setMood, surpriseMe } = useMoodTheme();

  // Play sound effect when mood changes
  useEffect(() => {
    playMoodSound(currentMood);
  }, [currentMood]);

  // Handle mood selection with sound effect
  const handleMoodSelect = (mood: MoodType) => {
    if (mood !== currentMood) {
      setMood(mood);
    }
  };

  // Handle surprise me with sound effect
  const handleSurpriseMe = () => {
    surpriseMe();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-medium mb-3 animate-slide-down">How are you feeling today?</h2>
        <p className="text-muted-foreground text-lg animate-slide-down" style={{ animationDelay: "100ms" }}>
          Select a mood to customize your experience
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {moodOptions.map((mood, index) => {
          const isActive = currentMood === mood.value;
          
          return (
            <div
              key={mood.value}
              className={cn(
                "mood-card theme-transition relative overflow-hidden backdrop-blur-sm",
                getMoodCardAnimation(mood.value),
                getMoodCardGlow(mood.value, isActive),
                isActive ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg" : ""
              )}
              onClick={() => handleMoodSelect(mood.value)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {isActive && (
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary rounded-full opacity-10 animate-pulse-soft"></div>
              )}
              
              <div className="flex items-center gap-3 mb-3">
                <div className={cn(
                  "p-3 rounded-full bg-primary/15 text-primary",
                  getMoodAnimation(mood.value)
                )}>
                  {getMoodIcon(mood.value)}
                </div>
                <h3 className="font-medium text-lg">{mood.label}</h3>
              </div>
              <p className="text-muted-foreground">{mood.description}</p>
              
              {isActive && (
                <div className="absolute top-3 right-3">
                  <Heart size={12} className="text-primary animate-pulse fill-primary" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center animate-slide-up" style={{ animationDelay: "600ms" }}>
        <Button 
          onClick={handleSurpriseMe}
          className="group relative overflow-hidden flex items-center gap-2 px-8 py-3 text-base font-medium"
          variant="outline"
        >
          <span className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300"></span>
          <Sparkles className="h-4 w-4 group-hover:animate-pulse group-hover:text-primary transition-colors duration-300" />
          <span className="relative z-10">Surprise Me</span>
          <span className="absolute -z-10 top-0 left-0 right-0 h-full w-full bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: 'translateX(-100%)' }}></span>
        </Button>
      </div>
    </div>
  );
};

export default MoodSelector;
