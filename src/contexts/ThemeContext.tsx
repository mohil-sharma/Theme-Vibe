
import React, { createContext, useContext, useState, useEffect } from "react";

export type MoodType = "neutral" | "happy" | "calm" | "energetic" | "melancholy" | "creative";
export type ColorMode = "light" | "dark";

export interface CustomTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

interface ThemeContextType {
  currentMood: MoodType;
  setMood: (mood: MoodType) => void;
  surpriseMe: () => void;
  colorMode: ColorMode;
  toggleColorMode: () => void;
  customThemes: Record<MoodType, CustomTheme>;
  updateCustomTheme: (mood: MoodType, theme: Partial<CustomTheme>) => void;
  resetCustomTheme: (mood: MoodType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const moodOptions: { value: MoodType; label: string; description: string }[] = [
  { 
    value: "neutral", 
    label: "Neutral", 
    description: "The default balanced state" 
  },
  { 
    value: "happy", 
    label: "Happy", 
    description: "Bright and optimistic" 
  },
  { 
    value: "calm", 
    label: "Calm", 
    description: "Serene and peaceful" 
  },
  { 
    value: "energetic", 
    label: "Energetic", 
    description: "Dynamic and lively" 
  },
  { 
    value: "melancholy", 
    label: "Melancholy", 
    description: "Thoughtful and introspective" 
  },
  { 
    value: "creative", 
    label: "Creative", 
    description: "Innovative and imaginative" 
  },
];

// Default theme values for each mood
const defaultThemes: Record<MoodType, CustomTheme> = {
  neutral: {
    primary: "#6B7280",
    secondary: "#9CA3AF",
    accent: "#4B5563",
    background: "from-gray-50 via-slate-50 to-zinc-50",
  },
  happy: {
    primary: "#FFB11B",
    secondary: "#FFC847",
    accent: "#FF8F00",
    background: "from-amber-100 via-yellow-50 to-orange-50",
  },
  calm: {
    primary: "#0EA5E9",
    secondary: "#38BDF8",
    accent: "#0284C7",
    background: "from-blue-50 via-sky-50 to-indigo-50",
  },
  energetic: {
    primary: "#EF4444",
    secondary: "#F87171",
    accent: "#DC2626",
    background: "from-rose-50 via-red-50 to-orange-50",
  },
  melancholy: {
    primary: "#8B5CF6",
    secondary: "#A78BFA",
    accent: "#7C3AED",
    background: "from-indigo-50 via-purple-50 to-slate-100",
  },
  creative: {
    primary: "#D946EF",
    secondary: "#E879F9",
    accent: "#C026D3",
    background: "from-fuchsia-50 via-pink-50 to-purple-50",
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get saved mood from localStorage or default to neutral
  const getSavedMood = (): MoodType => {
    if (typeof window !== "undefined") {
      const savedMood = localStorage.getItem("currentMood");
      return savedMood && isValidMood(savedMood) ? savedMood as MoodType : "neutral";
    }
    return "neutral";
  };

  // Get saved color mode from localStorage or default to light
  const getSavedColorMode = (): ColorMode => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("colorMode");
      return savedMode === "dark" ? "dark" : "light";
    }
    return "light";
  };

  // Get saved custom themes from localStorage or use defaults
  const getSavedCustomThemes = (): Record<MoodType, CustomTheme> => {
    if (typeof window !== "undefined") {
      const savedThemes = localStorage.getItem("customThemes");
      if (savedThemes) {
        try {
          return JSON.parse(savedThemes);
        } catch (e) {
          console.error("Error parsing saved themes:", e);
        }
      }
    }
    return defaultThemes;
  };

  const isValidMood = (mood: string): boolean => {
    return moodOptions.some(option => option.value === mood);
  };

  const [currentMood, setCurrentMood] = useState<MoodType>(getSavedMood);
  const [colorMode, setColorMode] = useState<ColorMode>(getSavedColorMode);
  const [customThemes, setCustomThemes] = useState<Record<MoodType, CustomTheme>>(getSavedCustomThemes);

  // Set the theme class on the document body
  useEffect(() => {
    // Remove all theme classes
    document.body.classList.remove(
      "theme-neutral",
      "theme-happy",
      "theme-calm",
      "theme-energetic",
      "theme-melancholy",
      "theme-creative"
    );

    // Remove color mode classes
    document.body.classList.remove("light-mode", "dark-mode");

    // Add the current theme class
    document.body.classList.add(`theme-${currentMood}`);
    
    // Add the current color mode class
    document.body.classList.add(`${colorMode}-mode`);

    // Save to localStorage
    localStorage.setItem("currentMood", currentMood);
    localStorage.setItem("colorMode", colorMode);

    // For debugging
    console.log(`Theme changed to: ${currentMood}, Color mode: ${colorMode}`);
  }, [currentMood, colorMode]);

  // Save custom themes to localStorage when they change
  useEffect(() => {
    localStorage.setItem("customThemes", JSON.stringify(customThemes));
  }, [customThemes]);

  // Set mood with transition
  const setMood = (newMood: MoodType) => {
    setCurrentMood(newMood);
  };

  // Toggle between light and dark mode
  const toggleColorMode = () => {
    setColorMode(prev => prev === "light" ? "dark" : "light");
  };

  // Update custom theme for a specific mood
  const updateCustomTheme = (mood: MoodType, theme: Partial<CustomTheme>) => {
    setCustomThemes(prev => ({
      ...prev,
      [mood]: {
        ...prev[mood],
        ...theme
      }
    }));
  };

  // Reset custom theme for a specific mood to default
  const resetCustomTheme = (mood: MoodType) => {
    setCustomThemes(prev => ({
      ...prev,
      [mood]: defaultThemes[mood]
    }));
  };

  // Random mood selector for "Surprise Me" feature
  const surpriseMe = () => {
    const moods = moodOptions.filter(mood => mood.value !== currentMood);
    const randomMood = moods[Math.floor(Math.random() * moods.length)].value;
    setCurrentMood(randomMood);
  };

  return (
    <ThemeContext.Provider value={{ 
      currentMood, 
      setMood, 
      surpriseMe, 
      colorMode, 
      toggleColorMode, 
      customThemes, 
      updateCustomTheme, 
      resetCustomTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useMoodTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useMoodTheme must be used within a ThemeProvider");
  }
  return context;
};
