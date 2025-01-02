import React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import { cn } from '@/utills/utils';

const buttonVariants = cva(
    // initial className
    "inline-flex items-center justify-center rounded-md text-sm font-medium shadow-md hover:shadow-lg",
    {
        variants:{
          variant:{
            default: "bg-white text-black",
            primary: "bg-blue-800 text-white hover:bg-blue-800/90",
            success: "bg-green-600 text-white hover:bg-green-800/90",
            warning: "bg-yellow-600 text-black hover:bg-yellow-800/90",
            danger: "bg-red-600 text-white hover:bg-red-800/90",
          },
          size:{
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3 py-2",
            lg: "j-10 rounded-md px-4 py-2 text-lg",
          },
        },
        defaultVariants:{
          // Define use "default" for each variant
          variant:"default",
          size:"default",
        },
    },
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof buttonVariants>{}

const Button = React.forwardRef<HTMLButtonElement,ButtonProps>(
  ({className,variant,size, ...props},ref) => {
  return (
    <button
      className={cn(buttonVariants({variant, size, className}))}
      ref={ref}
      {...props}
      >
      
    </button>
    )
  },
)

Button.displayName = "Button";
export {Button}