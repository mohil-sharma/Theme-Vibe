
import React from "react";
import { cn } from "@/lib/utils";
import { useMoodTheme } from "@/contexts/ThemeContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { currentMood, customThemes, colorMode } = useMoodTheme();
  
  // Apply gradient based on mood and color mode
  const getGradientFromTheme = () => {
    const theme = customThemes[currentMood];
    const isDark = colorMode === "dark";
    
    if (isDark) {
      return `bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 bg-opacity-80`;
    }
    
    return `bg-gradient-to-br ${theme.background}`;
  };

  const gradientClass = getGradientFromTheme();

  return (
    <div 
      className={cn(
        "min-h-screen w-full theme-transition relative",
        "px-4 py-8 md:py-12",
        gradientClass,
        "before:content-[''] before:absolute before:inset-0 before:opacity-20 before:bg-gradient-to-b before:from-primary/20 before:via-transparent before:to-transparent before:z-0",
        colorMode === "dark" ? "text-gray-200" : ""
      )}
    >
      <div 
        className={cn(
          "absolute inset-0 opacity-30 mix-blend-overlay",
          colorMode === "dark" ? "opacity-10" : "opacity-30"
        )} 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23000000\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundSize: '150px 150px'
        }}
      ></div>

      <main className="max-w-5xl mx-auto relative z-10 animate-fade-in">
        {children}
      </main>
      
      <footer className="mt-16 py-6 text-center text-sm text-muted-foreground relative z-10">
        <p className="animate-fade-in" style={{ animationDelay: "800ms" }}>
          Mood-Based Theme Switcher
        </p>
      </footer>
    </div>
  );
};

export default Layout;
