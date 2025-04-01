import React from 'react';
import { Slot } from "@radix-ui/react-slot";

const Button = React.forwardRef<
  HTMLButtonElement, 
  React.ButtonHTMLAttributes<HTMLButtonElement> & { 
    asChild?: boolean;
    variant?: 'primary' | 'outline';
  }
>(({ className, asChild, variant = 'primary', ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  
  const baseStyles = "py-2 px-6 rounded-full font-medium transition-colors";
  const variantStyles = variant === 'primary'
    ? "bg-blue-600 hover:bg-blue-700 text-white"
    : "border border-blue-600 text-blue-600 hover:bg-blue-50";
  
  return (
    <Comp
      className={`${baseStyles} ${variantStyles} ${className || ''}`}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };