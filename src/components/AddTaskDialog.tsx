import React, { useState } from "react";
import { Plus, Calendar, Tag, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, CuteButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Task } from "./TaskCard";

interface AddTaskDialogProps {
  onAddTask: (task: Omit<Task, "id">) => void;
  selectedDate?: string;
}

const emojis = ["💖", "✨", "🌸", "🦄", "🌟", "💫", "🎀", "🌺", "🍃", "🌈"];
const categories = ["Work", "Personal", "Health", "Shopping", "Study", "Fun"];

export const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ 
  onAddTask, 
  selectedDate 
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState(selectedDate || new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState("");
  const [emoji, setEmoji] = useState("💖");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    onAddTask({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
      priority,
      dueDate,
      category: category || undefined,
      emoji
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate(selectedDate || new Date().toISOString().split('T')[0]);
    setCategory("");
    setEmoji("💖");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CuteButton 
          emoji="✨" 
          size="lg"
          className="w-full animate-bounce-in"
        >
          Add New Task
        </CuteButton>
      </DialogTrigger>
      
      <DialogContent className="w-[95vw] max-w-lg rounded-xl shadow-glow">
        <DialogHeader>
          <DialogTitle className="text-2xl font-dancing gradient-primary bg-clip-text text-transparent flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-pink-medium animate-float" />
            Create New Task
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a cute new task to your list! ✨
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Emoji Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Choose an emoji</Label>
            <div className="flex flex-wrap gap-2">
              {emojis.map((e) => (
                <Button
                  key={e}
                  type="button"
                  variant={emoji === e ? "default" : "outline"}
                  size="icon"
                  onClick={() => setEmoji(e)}
                  className="h-10 w-10 text-lg transition-bounce"
                >
                  {e}
                </Button>
              ))}
            </div>
          </div>

          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Task Title</Label>
            <Input
              id="title"
              placeholder="What needs to be done? 💭"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Add some details... 📝"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl min-h-[80px] resize-none"
            />
          </div>

          {/* Date and Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-sm font-medium flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Priority</Label>
              <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="low">💚 Low</SelectItem>
                  <SelectItem value="medium">💙 Medium</SelectItem>
                  <SelectItem value="high">💖 High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-1">
              <Tag className="h-4 w-4" />
              Category (optional)
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Choose a category..." />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <CuteButton
              type="submit"
              emoji="💫"
              className="flex-1"
            >
              Create Task
            </CuteButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};