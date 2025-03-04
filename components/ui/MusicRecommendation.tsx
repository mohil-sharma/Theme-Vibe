
import React, { useEffect, useState } from "react";
import { useMoodTheme } from "@/contexts/ThemeContext";
import { getMoodPlaylist } from "@/services/musicService";
import { Headphones, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  externalUrl: string;
}

const MusicRecommendation = () => {
  const { currentMood, colorMode } = useMoodTheme();
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setIsLoading(true);
      try {
        const result = await getMoodPlaylist(currentMood);
        setPlaylists(result);
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, [currentMood]);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-medium flex items-center gap-2">
          <Headphones className="h-5 w-5 text-primary" />
          <span>Mood-Based Music</span>
        </h2>
        <p className="text-muted-foreground mt-1">
          Music recommendations that match your current mood
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="h-8 w-8 border-4 border-primary border-r-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Finding the perfect playlists...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className={cn(
                "group relative overflow-hidden rounded-lg p-4 transition-all duration-300",
                "bg-background/80 backdrop-blur-md border border-border/50",
                "hover:shadow-md hover:border-primary/30",
                colorMode === "dark" ? "hover:bg-background/90" : "hover:bg-background"
              )}
            >
              <div className="flex gap-3">
                <div className="w-16 h-16 shrink-0 relative overflow-hidden rounded-md">
                  <img
                    src={playlist.imageUrl}
                    alt={playlist.name}
                    className="object-cover h-full w-full"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-center h-full">
                      <Headphones className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{playlist.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {playlist.description}
                  </p>
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs gap-1 h-8"
                      onClick={() => window.open(playlist.externalUrl, '_blank')}
                    >
                      <span>Listen on Spotify</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MusicRecommendation;
