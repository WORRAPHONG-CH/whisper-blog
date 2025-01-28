import React from 'react'
import { cn } from '@/lib/utils';
import {cva , type VariantProps} from 'class-variance-authority';


const inputVariants = cva(
    'flex items-center px-3 py-2 ',
    {
        variants:{
            variant:{
                default: " border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-lg",
                form: "w-full outline-none  border-l-2  rounded-e-2xl focus:outline-none"
            },
        },
        defaultVariants:{
            variant: "default",
        }
    },
    
)
// export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{}
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>
    , VariantProps<typeof inputVariants>{}

const Input = React.forwardRef<HTMLInputElement,InputProps>(
    ({ className,type, variant, ...props },ref) => {
  return (
    <input type={type}
        className = {cn(inputVariants({variant}),className,)}
        ref = {ref}
        {...props}
            />
        )
    }
)
Input.displayName = "Input";

export {Input}