
import React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps} from 'class-variance-authority'


const labelVariants = cva(
    // initial className
    "text-md font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants>{}

const Label = React.forwardRef<HTMLLabelElement,LabelProps> (
    ({className, ...props},ref) => {
  return (
    <label 
        className = {cn(labelVariants(),className)}
        ref = {ref}
        {...props}
    >

    </label>
    )
    }
)
Label.displayName = "Label";
export {Label}