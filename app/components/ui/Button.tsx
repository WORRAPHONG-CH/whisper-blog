import React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    // initial className
    "inline-flex items-center justify-center text-sm font-medium  ",
    {
        variants:{
          variant:{
            default: "text-black",
            primary: "bg-blue-800 rounded-md text-white hover:bg-blue-800/90 hover:shadow-lg",
            secondary: "bg-gray-400 rounded-md text-white hover:bg-gray-800/90 hover:shadow-lg",
            success: "bg-green-600 rounded-md text-white hover:bg-green-800/90 hover:shadow-lg",
            warning: "bg-yellow-600 rounded-md text-black hover:bg-yellow-800/90 hover:shadow-lg",
            danger: "bg-red-600 rounded-md text-white hover:bg-red-800/90 hover:shadow-lg",
            form: ' bg-gradient-to-tr1 from-blue-8001 to-purple-7001 bg-[#5D43E5] rounded-2xl text-white  hover:bg-[#523bc3] hover:shadow-lg'
          },
          size:{
            default: "h-4 px-2 py-2",
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