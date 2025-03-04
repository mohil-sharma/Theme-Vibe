
import React, { useState } from "react";
import { useMoodTheme, type MoodType, type CustomTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paintbrush, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker = ({ label, value, onChange }: ColorPickerProps) => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="flex-1">
        <Label htmlFor={label.toLowerCase()}>{label}</Label>
        <div className="flex items-center gap-2 mt-1">
          <div 
            className="h-8 w-8 rounded-full border border-border cursor-pointer"
            style={{ backgroundColor: value }}
          />
          <Input
            id={label.toLowerCase()}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 flex-1"
          />
        </div>
      </div>
    </div>
  );
};

const ThemeCustomizer = () => {
  const { currentMood, customThemes, updateCustomTheme, resetCustomTheme } = useMoodTheme();
  const [selectedMood, setSelectedMood] = useState<MoodType>(currentMood);
  const [localTheme, setLocalTheme] = useState<CustomTheme>(customThemes[selectedMood]);

  // Update local theme when selected mood changes
  React.useEffect(() => {
    setLocalTheme(customThemes[selectedMood]);
  }, [selectedMood, customThemes]);

  const handleSave = () => {
    updateCustomTheme(selectedMood, localTheme);
    toast.success(`${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} theme customized successfully!`);
  };

  const handleReset = () => {
    resetCustomTheme(selectedMood);
    setLocalTheme(customThemes[selectedMood]);
    toast.info(`${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} theme reset to default.`);
  };

  const updateColor = (key: keyof CustomTheme, value: string) => {
    setLocalTheme(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="fixed bottom-4 right-4 z-40 gap-1 shadow-md animate-fade-in"
        >
          <Paintbrush className="h-4 w-4" />
          Customize Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b border-border">
          <h4 className="font-medium text-lg">Customize Themes</h4>
          <p className="text-sm text-muted-foreground">
            Personalize colors for each mood.
          </p>
        </div>
        
        <Tabs defaultValue={currentMood} value={selectedMood} onValueChange={(value) => setSelectedMood(value as MoodType)}>
          <div className="p-4 border-b border-border">
            <TabsList className="grid grid-cols-3 gap-1">
              <TabsTrigger value="neutral">Neutral</TabsTrigger>
              <TabsTrigger value="happy">Happy</TabsTrigger>
              <TabsTrigger value="calm">Calm</TabsTrigger>
            </TabsList>
            <div className="mt-2">
              <TabsList className="grid grid-cols-3 gap-1">
                <TabsTrigger value="energetic">Energetic</TabsTrigger>
                <TabsTrigger value="melancholy">Melancholy</TabsTrigger>
                <TabsTrigger value="creative">Creative</TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          {Object.keys(customThemes).map((mood) => (
            <TabsContent key={mood} value={mood} className="p-4 space-y-4">
              <ColorPicker
                label="Primary"
                value={localTheme.primary}
                onChange={(value) => updateColor("primary", value)}
              />
              <ColorPicker
                label="Secondary"
                value={localTheme.secondary}
                onChange={(value) => updateColor("secondary", value)}
              />
              <ColorPicker
                label="Accent"
                value={localTheme.accent}
                onChange={(value) => updateColor("accent", value)}
              />
              
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeCustomizer;
