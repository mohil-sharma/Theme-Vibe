
import { MoodType } from "@/contexts/ThemeContext";

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  externalUrl: string;
}

// Mock data for Spotify playlists based on moods
// In a real implementation, this would call the Spotify API
const moodPlaylists: Record<MoodType, SpotifyPlaylist[]> = {
  happy: [
    {
      id: "37i9dQZF1DX3rxVfibe1L0",
      name: "Mood Booster",
      description: "Get happy with this playlist of upbeat songs!",
      imageUrl: "https://i.scdn.co/image/ab67706f00000002bd0e19e810bb4b55ab164a95",
      externalUrl: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0",
    },
    {
      id: "37i9dQZF1DXdPec7aLTmlC",
      name: "Happy Hits!",
      description: "Hits to put you in a good mood!",
      imageUrl: "https://i.scdn.co/image/ab67706f00000002aa93fe4e8c2d24fc62556cba",
      externalUrl: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC",
    },
  ],
  calm: [
    {
      id: "37i9dQZF1DX1s9knjP51Oa",
      name: "Calm Vibes",
      description: "Ambient music for relaxation and focus.",
      imageUrl: "https://i.scdn.co/image/ab67706f00000002ea1a33145aa53e6d5505c661",
      externalUrl: "https://open.spotify.com/playlist/37i9dQZF1DX1s9knjP51Oa",
    },
    {
      id: "37i9dQZF1DWZqd5JICZI0u",
      name: "Peaceful Piano",
      description: "Peaceful piano to help you slow down, breathe, and relax.",
      imageUrl: "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a4",
      externalUrl: "https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u",
    },
  ],
  energetic: [
    {
      id: "37i9dQZF1DX76Wlfdnj7AP",
      name: "Beast Mode",
      description: "Push yourself to the limit with this energy-boosting playlist.",
      imageUrl: "https://i.scdn.co/image/ab67706f000000029249b35f23fb56b148fe6842",
      externalUrl: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP",
    },
    {
      id: "37i9dQZF1DX4eRPd9frC1m",
      name: "Hype",
      description: "Pump-up, energy, and motivation!",
      imageUrl: "https://i.scdn.co/image/ab67706f00000002fe24d7084be472288cd6ee6c",
      externalUrl: "https://open.spotify.com/playlist/37i9dQZF1DX4eRPd9frC1m",
    },
  ],
  melancholy: [
    {
      id: "37i9dQZF1DX7qK8ma5wgG1",
      name: "Melancholia",
      description: "Beautifully dark, dramatic tracks.",
      imageUrl: "https://i.scdn.co/image/ab67706f000000025fd2e0d4120badeb983d8e30",
      externalUrl: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1",
    },
    {
      id: "37i9dQZF1DXbm0dp7JzNeL",
      name: "Sad Songs",
      description: "Beautiful songs to break your heart...",
      imageUrl: "https://i.scdn.co/image/ab67706f0000000213601c129d7343292f074ab4",
      externalUrl: "https://open.spotify.com/playlist/37i9dQZF1DXbm0dp7JzNeL",
    },
  ],
  creative: [
    {
      id: "37i9dQZF1DX56qfiUZBnFU",
      name: "Creativity Boost",
      description: "Inspiring instrumentals to help you create.",
      imageUrl: "https://i.scdn.co/image/ab67706f0000000287bba1e95137ad119ed3b4a2",
      externalUrl: "https://open.spotify.com/playlist/37i9dQZF1DX56qfiUZBnFU",
    },
    {
      id: "37i9dQZF1DX9sIqqvKsjG8",
      name: "Focus Flow",
      description: "Uptempo instrumental hip hop beats.",
      imageUrl: "https://i.scdn.co/image/ab67706f00000002724554ed6bed6f051d9b0bfc",
      externalUrl: "https://open.spotify.com/playlist/37i9dQZF1DX9sIqqvKsjG8",
    },
  ],
  neutral: [
    {
      id: "37i9dQZF1DWWQRwui0ExPn",
      name: "Lofi Beats",
      description: "Beats to relax, study, and focus.",
      imageUrl: "https://i.scdn.co/image/ab67706f00000002d72ef75e14ca6f60ea2364c2",
      externalUrl: "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn",
    },
    {
      id: "37i9dQZF1DX8Uebhn9wzrS",
      name: "Chill Tracks",
      description: "Softer kinda dance.",
      imageUrl: "https://i.scdn.co/image/ab67706f000000023e0130a4c5d5847f57d9376c",
      externalUrl: "https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS",
    },
  ],
};

// Function to get Spotify playlist recommendations based on mood
export const getMoodPlaylist = async (mood: MoodType): Promise<SpotifyPlaylist[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return playlists for the given mood
  return moodPlaylists[mood];
};

