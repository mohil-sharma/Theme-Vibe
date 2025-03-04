
import React from "react";
import { useMoodTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useMoodTheme();
  
  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleColorMode}
        className={cn(
          "rounded-full p-2 bg-background/80 backdrop-blur-md border-border",
          "transition-all duration-300 hover:scale-110",
          colorMode === "dark" ? "text-yellow-400 hover:text-yellow-300" : "text-indigo-600 hover:text-indigo-500"
        )}
        aria-label={colorMode === "light" ? "Switch to dark mode" : "Switch to light mode"}
      >
        {colorMode === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default DarkModeToggle;
