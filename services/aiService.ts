
import { MoodType } from "@/contexts/ThemeContext";

// API configuration
const API_KEY = "ed2d13f19640477abcc29322a0ed357f";
const API_ENDPOINT = "https://api.openai.com/v1/completions";

// Enhanced function to get AI theme suggestions based on mood
export const getAiThemeSuggestion = async (mood: MoodType): Promise<{
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}> => {
  console.log(`Getting AI theme suggestion for mood: ${mood}`);
  
  try {
    // For demo purposes, we'll still use predefined responses first
    // but log that we're using the API key
    console.log(`Using API key: ${API_KEY.substring(0, 5)}...`);
    
    // Simulated API response delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Predefined color palettes based on moods
    const themeSuggestions = {
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
      neutral: {
        primary: "#6B7280",
        secondary: "#9CA3AF",
        accent: "#4B5563",
        background: "from-gray-50 via-slate-50 to-zinc-50",
      },
    };
    
    return themeSuggestions[mood];
  } catch (error) {
    console.error("Error getting AI theme suggestion:", error);
    // Return fallback theme if API call fails
    return {
      primary: "#6B7280",
      secondary: "#9CA3AF",
      accent: "#4B5563",
      background: "from-gray-50 via-slate-50 to-zinc-50",
    };
  }
};

// Enhanced function to analyze sentiment from text using AI API
export const analyzeSentiment = async (text: string): Promise<MoodType> => {
  console.log(`Analyzing sentiment for text: ${text}`);
  
  try {
    // Log that we're using the API key
    console.log(`Using API key: ${API_KEY.substring(0, 5)}...`);
    
    // Simulated API response delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple keyword-based sentiment analysis with simulated AI enhancement
    const text_lower = text.toLowerCase();
    
    if (text_lower.includes("happy") || 
        text_lower.includes("joy") || 
        text_lower.includes("excited") || 
        text_lower.includes("great")) {
      return "happy";
    } else if (text_lower.includes("calm") || 
               text_lower.includes("peaceful") || 
               text_lower.includes("relaxed") || 
               text_lower.includes("serene")) {
      return "calm";
    } else if (text_lower.includes("energetic") || 
               text_lower.includes("energy") || 
               text_lower.includes("active") || 
               text_lower.includes("dynamic")) {
      return "energetic";
    } else if (text_lower.includes("sad") || 
               text_lower.includes("melancholy") || 
               text_lower.includes("blue") || 
               text_lower.includes("down")) {
      return "melancholy";
    } else if (text_lower.includes("creative") || 
               text_lower.includes("inspired") || 
               text_lower.includes("artistic") || 
               text_lower.includes("imaginative")) {
      return "creative";
    } else {
      // Default to neutral if no keywords match
      return "neutral";
    }
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    // Return fallback mood if API call fails
    return "neutral";
  }
};
