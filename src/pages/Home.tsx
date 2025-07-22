import React, { useState, useEffect } from "react";
import { Calendar, CheckCircle, Clock, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskCard, Task } from "@/components/TaskCard";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { toast } from "@/hooks/use-toast";

export const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("reem-tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("reem-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.dueDate === today);
  const completedToday = todayTasks.filter(task => task.completed).length;

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks(prev => [...prev, task]);
    toast({
      title: "Task Created! ✨",
      description: `"${task.title}" has been added to your list.`,
    });
  };

  const handleToggleComplete = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed }
        : task
    ));
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.completed ? "Task Reopened 🔄" : "Task Completed! 🎉",
        description: task.completed ? "Task marked as incomplete" : "Great job! Keep it up! 💪",
      });
    }
  };

  const handleDeleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: "Task Deleted 🗑️",
      description: `"${task?.title}" has been removed.`,
    });
  };

  const handleEditTask = (id: string) => {
    // TODO: Implement edit functionality
    toast({
      title: "Edit Feature Coming Soon! 🚧",
      description: "Task editing will be available in the next update.",
    });
  };

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Welcome Header */}
      <div className="text-center space-y-3 animate-fade-in">
        <h1 className="text-3xl font-bold font-dancing gradient-primary bg-clip-text text-transparent">
          {getCurrentGreeting()}, Reem! 👋
        </h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Daily Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
        <Card className="text-center">
          <CardHeader className="pb-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-pink-soft/20 flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-pink-medium" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-medium">
              {completedToday}/{todayTasks.length}
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-lavender/20 flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-purple-500" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">
              {todayTasks.length - completedToday}
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-baby-blue/20 flex items-center justify-center mb-2">
              <Sparkles className="h-6 w-6 text-blue-500" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {tasks.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Task Button */}
      <div className="animate-fade-in">
        <AddTaskDialog onAddTask={handleAddTask} selectedDate={today} />
      </div>

      {/* Today's Tasks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold font-dancing flex items-center gap-2">
            <Calendar className="h-5 w-5 text-pink-medium" />
            Today's Tasks
          </h2>
          {todayTasks.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {completedToday}/{todayTasks.length} completed
            </span>
          )}
        </div>

        {todayTasks.length === 0 ? (
          <Card className="text-center py-12 animate-fade-in">
            <CardContent>
              <div className="space-y-3">
                <div className="text-6xl animate-float">🌸</div>
                <h3 className="text-lg font-medium text-muted-foreground">
                  No tasks for today
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enjoy your free time or add a new task to get started!
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {todayTasks
              .sort((a, b) => {
                // Sort by completion status (incomplete first), then by priority
                if (a.completed !== b.completed) {
                  return a.completed ? 1 : -1;
                }
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
              })
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              ))}
          </div>
        )}
      </div>

      {/* Motivational Message */}
      {completedToday > 0 && (
        <Card className="text-center gradient-primary text-white animate-fade-in">
          <CardContent className="py-6">
            <div className="space-y-2">
              <div className="text-3xl animate-bounce-in">🎉</div>
              <h3 className="text-lg font-semibold">
                You're doing amazing!
              </h3>
              <p className="text-sm opacity-90">
                You've completed {completedToday} task{completedToday > 1 ? 's' : ''} today. Keep up the great work!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};