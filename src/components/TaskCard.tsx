import React from "react";
import { Trash2, Edit, Star, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: string;
  category?: string;
  emoji?: string;
}

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const priorityColors = {
  low: "text-mint",
  medium: "text-baby-blue", 
  high: "text-pink-medium"
};

const priorityIcons = {
  low: "💚",
  medium: "💙",
  high: "💖"
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  return (
    <Card 
      className={cn(
        "animate-fade-in transition-all duration-300",
        task.completed && "opacity-75 scale-[0.98]"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleComplete(task.id)}
              className="animate-heart-beat"
            />
            <div className="flex-1">
              <CardTitle 
                className={cn(
                  "text-xl font-semibold transition-smooth",
                  task.completed && "line-through text-muted-foreground"
                )}
              >
                {task.emoji && (
                  <span className="mr-2 animate-float">{task.emoji}</span>
                )}
                {task.title}
              </CardTitle>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="text-lg animate-pulse">
              {priorityIcons[task.priority]}
            </span>
          </div>
        </div>
      </CardHeader>

      {(task.description || task.category) && (
        <CardContent className="pt-0">
          {task.description && (
            <p className={cn(
              "text-base text-muted-foreground mb-3",
              task.completed && "line-through"
            )}>
              {task.description}
            </p>
          )}
          
          {task.category && (
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-lavender/50 text-xs text-primary font-medium">
              <Star className="h-3 w-3" />
              {task.category}
            </div>
          )}
        </CardContent>
      )}

      {/* Task Actions */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(task.id)}
              className="h-8 w-8 text-muted-foreground hover:text-primary"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};