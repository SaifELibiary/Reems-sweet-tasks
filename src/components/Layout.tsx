import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import reemLogo from "@/assets/reem-logo.png";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <img 
              src={reemLogo} 
              alt="Reem's Logo" 
              className="w-10 h-10 animate-float"
            />
            <h1 className="text-2xl font-bold font-dancing gradient-primary bg-clip-text text-transparent shadow-glow">
              Reem's ToDo
            </h1>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-3">
            <Sun className="h-4 w-4 text-yellow-500" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-purple-500"
            />
            <Moon className="h-4 w-4 text-purple-500" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};