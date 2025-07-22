import React, { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TaskCard, Task } from "@/components/TaskCard";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export const CalendarPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTasksForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return tasks.filter(task => task.dueDate === dateString);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks(prev => [...prev, task]);
    toast({
      title: "Task Created! ✨",
      description: `"${task.title}" has been added for ${format(new Date(task.dueDate), 'MMM d')}.`,
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
    toast({
      title: "Edit Feature Coming Soon! 🚧",
      description: "Task editing will be available in the next update.",
    });
  };

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="text-center space-y-3 animate-fade-in">
        <h1 className="text-3xl font-bold font-dancing gradient-primary bg-clip-text text-transparent flex items-center justify-center gap-2">
          <CalendarIcon className="h-8 w-8 text-pink-medium" />
          Task Calendar
        </h1>
        <p className="text-muted-foreground">
          Plan your tasks and stay organized! 📅
        </p>
      </div>

      {/* Calendar Navigation */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousMonth}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <CardTitle className="text-xl font-dancing">
              {format(currentDate, 'MMMM yyyy')}
            </CardTitle>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextMonth}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {daysInMonth.map(date => {
              const dayTasks = getTasksForDate(date);
              const hasCompletedTasks = dayTasks.some(task => task.completed);
              const hasPendingTasks = dayTasks.some(task => !task.completed);
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const isTodayDate = isToday(date);
              
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateClick(date)}
                  className={cn(
                    "relative p-2 text-sm rounded-lg transition-all hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring",
                    isTodayDate && "bg-primary text-primary-foreground shadow-glow",
                    isSelected && !isTodayDate && "bg-accent text-accent-foreground ring-2 ring-ring",
                    !isTodayDate && !isSelected && "hover:bg-muted"
                  )}
                >
                  <div className="font-medium">
                    {format(date, 'd')}
                  </div>
                  
                  {/* Task Indicators */}
                  {dayTasks.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                      {hasPendingTasks && (
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-medium animate-pulse" />
                      )}
                      {hasCompletedTasks && (
                        <div className="w-1.5 h-1.5 rounded-full bg-mint" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Tasks */}
      {selectedDate && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold font-dancing">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h2>
            <AddTaskDialog 
              onAddTask={handleAddTask} 
              selectedDate={format(selectedDate, 'yyyy-MM-dd')}
            />
          </div>

          {selectedDateTasks.length === 0 ? (
            <Card className="text-center py-8">
              <CardContent>
                <div className="space-y-3">
                  <div className="text-4xl animate-float">🌸</div>
                  <h3 className="text-lg font-medium text-muted-foreground">
                    No tasks for this day
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click "Add New Task" to schedule something!
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {selectedDateTasks
                .sort((a, b) => {
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
      )}

      {/* Quick Stats */}
      <Card className="animate-fade-in gradient-primary text-white">
        <CardContent className="text-center py-6">
          <div className="space-y-2">
            <div className="text-2xl animate-float">📊</div>
            <h3 className="text-lg font-semibold">
              Monthly Overview
            </h3>
            <p className="text-sm opacity-90">
              {tasks.filter(task => {
                const taskDate = new Date(task.dueDate);
                return taskDate.getMonth() === currentDate.getMonth() && 
                       taskDate.getFullYear() === currentDate.getFullYear();
              }).length} tasks scheduled this month
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};