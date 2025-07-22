import React from "react";
import { Home, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentPage: "home" | "calendar";
  onPageChange: (page: "home" | "calendar") => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentPage, 
  onPageChange 
}) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-2">
        <Button
          variant={currentPage === "home" ? "cute" : "ghost"}
          size="sm"
          onClick={() => onPageChange("home")}
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Today
        </Button>
        <Button
          variant={currentPage === "calendar" ? "cute" : "ghost"}
          size="sm"
          onClick={() => onPageChange("calendar")}
          className="flex items-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          Calendar
        </Button>
      </div>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-border shadow-soft md:hidden z-50">
        <div className="flex items-center justify-around h-16">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "flex flex-col gap-1 h-auto py-2 transition-smooth",
              currentPage === "home" && "text-primary"
            )}
            onClick={() => onPageChange("home")}
          >
            <Home className={cn(
              "h-5 w-5 transition-smooth",
              currentPage === "home" && "animate-bounce-in"
            )} />
            <span className="text-xs">Today</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "flex flex-col gap-1 h-auto py-2 transition-smooth",
              currentPage === "calendar" && "text-primary"
            )}
            onClick={() => onPageChange("calendar")}
          >
            <Calendar className={cn(
              "h-5 w-5 transition-smooth",
              currentPage === "calendar" && "animate-bounce-in"
            )} />
            <span className="text-xs">Calendar</span>
          </Button>
        </div>
      </nav>
    </>
  );
};