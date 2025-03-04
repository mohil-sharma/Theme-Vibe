
import { MoodType } from "@/contexts/ThemeContext";

// Sound file URLs mapped to moods
const moodSounds: Record<MoodType, string> = {
  happy: "/sounds/happy-chime.mp3",
  calm: "/sounds/calm-chime.mp3",
  energetic: "/sounds/energetic-whoosh.mp3",
  melancholy: "/sounds/melancholy-note.mp3",
  creative: "/sounds/creative-bell.mp3",
  neutral: "/sounds/neutral-click.mp3"
};

// Audio instance for playing sounds
let audioInstance: HTMLAudioElement | null = null;

// Function to play a sound effect based on mood
export const playMoodSound = (mood: MoodType): void => {
  try {
    // If there's already a sound playing, stop it
    if (audioInstance) {
      audioInstance.pause();
      audioInstance.currentTime = 0;
    }
    
    // Create a new audio instance with the mood sound
    audioInstance = new Audio(moodSounds[mood]);
    
    // Set volume to a low level for subtlety
    audioInstance.volume = 0.2;
    
    // Play the sound
    const playPromise = audioInstance.play();
    
    // Handle potential play() promise rejection (happens in some browsers)
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Audio playback error:", error);
      });
    }
  } catch (error) {
    console.log("Error playing mood sound:", error);
  }
};

// Create preload function to preload all audio files
export const preloadAudio = (): void => {
  Object.values(moodSounds).forEach(soundUrl => {
    const audio = new Audio();
    audio.src = soundUrl;
    audio.preload = "auto";
  });
};

