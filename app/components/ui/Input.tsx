import React from 'react'
import { cn } from '@/utills/utils';
import {cva , type VariantProps} from 'class-variance-authority';


const inputVariants = cva(
    'flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-lg',
)
// export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{}
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>
    , VariantProps<typeof inputVariants>{}

const Input = React.forwardRef<HTMLInputElement,InputProps>(
    ({ className,type, ...props },ref) => {
  return (
    <input type={type}
        className = {cn(inputVariants(),className,)}
        ref = {ref}
        {...props}
            />
        )
    }
)
Input.displayName = "Input";

export {Input}