import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Export additional button types for task actions
export type ButtonAction = "complete" | "delete" | "edit"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-soft hover:shadow-medium active:scale-95 transition-smooth",
        destructive:
          "bg-destructive text-destructive-foreground shadow-soft hover:bg-destructive/90 active:scale-95 transition-smooth",
        outline:
          "border border-input bg-background/50 backdrop-blur-md shadow-soft hover:border-primary hover:text-primary active:scale-95 transition-smooth",
        secondary:
          "bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary/80 active:scale-95 transition-smooth",
        ghost: "hover:bg-accent hover:text-accent-foreground active:scale-95 transition-smooth",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-smooth",
        cute: 
          "gradient-primary text-white shadow-soft hover:shadow-glow active:scale-95 transition-smooth",
        pastel: 
          "bg-lavender text-primary shadow-soft hover:bg-lavender/80 active:scale-95 transition-smooth",
        pink: 
          "bg-pink-medium text-white shadow-soft hover:shadow-glow active:scale-95 transition-smooth",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// Custom cute button with emoji
export const CuteButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    emoji?: string;
  }
>(({ emoji, children, className, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    variant="cute"
    {...props}
  >
    {emoji && <span className="animate-float">{emoji}</span>}
    {children}
  </Button>
))
CuteButton.displayName = "CuteButton"

export { Button, buttonVariants }
