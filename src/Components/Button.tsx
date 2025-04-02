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
  
  // Base styles with font-weight
  const baseStyles = "py-2 px-6 rounded-full transition-colors font-normal";
  
  // Font stack similar to Myriad Pro (sans-serif fonts that are commonly available)
  const fontFamily = "'Segoe UI', 'Frutiger', 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif";
  
  const variantStyles = variant === 'primary'
    ? "bg-blue-600 hover:bg-blue-700 text-white"
    : "border border-blue-600 text-blue-600 hover:bg-blue-50";
  
  return (
    <Comp
      className={`${baseStyles} ${variantStyles} ${className || ''}`}
      ref={ref}
      style={{ 
        fontFamily,
        // fontWeight: 400, // Normal weight
        letterSpacing: '0.02em' // Slight letter spacing to match Myriad Pro
      }}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };