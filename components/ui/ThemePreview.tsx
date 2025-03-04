
import React from "react";
import { useMoodTheme, moodOptions } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Function to get mood-specific animation classes
const getMoodAnimationClass = (mood: string) => {
  switch (mood) {
    case "happy":
      return "hover:scale-105 transition-all duration-300";
    case "calm":
      return "hover:translate-y-[-5px] transition-all duration-500";
    case "energetic":
      return "hover:rotate-1 hover:scale-[1.02] transition-all duration-200";
    case "melancholy":
      return "hover:translate-y-[-3px] transition-all duration-700";
    case "creative":
      return "hover:rotate-[-1deg] hover:scale-[1.03] transition-all duration-300";
    default:
      return "hover:scale-[1.02] transition-all duration-300";
  }
};

// Function to get mood-specific shadow classes
const getMoodShadowClass = (mood: string) => {
  switch (mood) {
    case "happy":
      return "hover:shadow-[0_10px_25px_-5px_rgba(255,200,0,0.2)]";
    case "calm":
      return "hover:shadow-[0_10px_25px_-5px_rgba(0,150,255,0.15)]";
    case "energetic":
      return "hover:shadow-[0_10px_25px_-5px_rgba(255,100,100,0.2)]";
    case "melancholy":
      return "hover:shadow-[0_10px_25px_-5px_rgba(130,100,200,0.2)]";
    case "creative":
      return "hover:shadow-[0_10px_25px_-5px_rgba(200,100,255,0.2)]";
    default:
      return "hover:shadow-[0_10px_25px_-5px_rgba(100,100,100,0.15)]";
  }
};

// Function to get mood-specific button animation
const getMoodButtonAnimation = (mood: string) => {
  switch (mood) {
    case "happy":
      return "hover:scale-105 active:scale-95 transition-transform duration-200";
    case "calm":
      return "hover:translate-y-[-2px] active:translate-y-[1px] transition-transform duration-300";
    case "energetic":
      return "hover:scale-105 active:scale-90 transition-transform duration-150";
    case "melancholy":
      return "hover:opacity-90 active:opacity-100 transition-opacity duration-300";
    case "creative":
      return "hover:rotate-1 hover:scale-[1.03] active:rotate-0 active:scale-[0.98] transition-all duration-200";
    default:
      return "hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200";
  }
};

const ThemePreview = () => {
  const { currentMood } = useMoodTheme();
  
  const currentMoodData = moodOptions.find(mood => mood.value === currentMood);
  const animationClass = getMoodAnimationClass(currentMood);
  const shadowClass = getMoodShadowClass(currentMood);
  const buttonAnimation = getMoodButtonAnimation(currentMood);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-10 text-center">
        <Badge variant="outline" className="mb-3 px-4 py-1.5 text-base animate-scale-in backdrop-blur-sm">
          Current Mood: {currentMoodData?.label}
        </Badge>
        <h2 className="text-3xl font-medium mb-3 animate-slide-down">
          Theme Preview
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg animate-slide-down" style={{ animationDelay: "100ms" }}>
          Here's how your interface looks with your selected mood theme
        </p>
      </div>

      <div className="grid gap-8">
        <Card className={cn(
          "overflow-hidden animate-scale-in shadow-lg border-primary/10 transition-all duration-300",
          animationClass,
          shadowClass
        )} style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
            <CardDescription>
              The colors are dynamically adjusted to match your mood
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <div className="w-full h-20 rounded-lg shadow-sm mb-3 bg-primary transform hover:scale-105 transition-transform"></div>
                <span className="text-sm font-medium">Primary</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full h-20 rounded-lg shadow-sm mb-3 bg-secondary transform hover:scale-105 transition-transform"></div>
                <span className="text-sm font-medium">Secondary</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full h-20 rounded-lg shadow-sm mb-3 bg-accent transform hover:scale-105 transition-transform"></div>
                <span className="text-sm font-medium">Accent</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full h-20 rounded-lg shadow-sm mb-3 bg-muted transform hover:scale-105 transition-transform"></div>
                <span className="text-sm font-medium">Muted</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className={cn(
            "animate-scale-in shadow-lg border-primary/10 transition-all duration-300",
            animationClass,
            shadowClass
          )} style={{ animationDelay: "300ms" }}>
            <CardHeader>
              <CardTitle>Components</CardTitle>
              <CardDescription>
                UI elements adapt to your selected mood
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">Buttons</p>
                <div className="flex flex-wrap gap-3">
                  <Button className={cn("shadow-sm", buttonAnimation)}>Primary</Button>
                  <Button variant="secondary" className={cn("shadow-sm", buttonAnimation)}>Secondary</Button>
                  <Button variant="outline" className={cn("shadow-sm", buttonAnimation)}>Outline</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Badges</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className={cn("shadow-sm", buttonAnimation)}>Default</Badge>
                  <Badge variant="secondary" className={cn("shadow-sm", buttonAnimation)}>Secondary</Badge>
                  <Badge variant="outline" className={cn("shadow-sm", buttonAnimation)}>Outline</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            "animate-scale-in shadow-lg border-primary/10 transition-all duration-300",
            animationClass,
            shadowClass
          )} style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>
                Text elements with your mood-based theme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">Heading 1</h1>
                <h2 className="text-xl font-semibold mb-1">Heading 2</h2>
                <h3 className="text-lg font-medium">Heading 3</h3>
              </div>
              <div>
                <p className="mb-2">Regular paragraph text with your mood theme applied.</p>
                <p className="text-muted-foreground">Secondary text with muted color.</p>
              </div>
              <div>
                <a href="#" className={cn(
                  "text-primary hover:underline transition-colors",
                  currentMood === "energetic" ? "hover:text-primary/80" : "",
                  currentMood === "creative" ? "hover:underline hover:decoration-wavy" : ""
                )}>Text Link</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;
