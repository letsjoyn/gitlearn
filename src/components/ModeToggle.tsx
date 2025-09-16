import { useState, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap } from "lucide-react";

interface ModeContextType {
  mode: 'tourist' | 'researcher';
  setMode: (mode: 'tourist' | 'researcher') => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'tourist' | 'researcher'>('tourist');

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};

export const ModeToggle = () => {
  const { mode, setMode } = useMode();

  const handleModeChange = (newMode: 'tourist' | 'researcher') => {
    setMode(newMode);
    
    // Force hide AI assistants when switching modes to trigger re-render
    const aiAssistantEvent = new CustomEvent('toggleAIAssistant', { 
      detail: { mode: newMode } 
    });
    window.dispatchEvent(aiAssistantEvent);
  };

  return (
    <div className="flex items-center gap-2 p-1 bg-muted rounded-xl">
      <Button
        variant={mode === 'tourist' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleModeChange('tourist')}
        className="flex items-center gap-2 text-sm font-medium transition-all duration-300"
      >
        <Users className="h-4 w-4" />
        <span className="hidden sm:inline">Tourist</span>
      </Button>
      <Button
        variant={mode === 'researcher' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleModeChange('researcher')}
        className="flex items-center gap-2 text-sm font-medium transition-all duration-300"
      >
        <GraduationCap className="h-4 w-4" />
        <span className="hidden sm:inline">Researcher</span>
      </Button>
    </div>
  );
};

export const ModeBadge = () => {
  const { mode } = useMode();
  
  return (
    <Badge 
      variant={mode === 'tourist' ? 'default' : 'secondary'}
      className="capitalize"
    >
      {mode === 'tourist' ? (
        <>
          <Users className="h-3 w-3 mr-1" />
          Tourist Mode
        </>
      ) : (
        <>
          <GraduationCap className="h-3 w-3 mr-1" />
          Researcher Mode
        </>
      )}
    </Badge>
  );
};