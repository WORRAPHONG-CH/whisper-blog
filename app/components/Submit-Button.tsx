'use client'
import React from 'react'
import { type ComponentProps } from 'react'
import { Button,  } from './ui/Button'
import { useFormStatus } from 'react-dom'

interface SubmitButtonProps extends ComponentProps<typeof Button>{
    pendingText?: string,
};

// type SubmitButtonProps = ComponentProps<typeof Button> &{
//     pendingText?:string,
// }

const SubmitButton = ({
    children,
    pendingText = "Submitting..."
    ,...props} :SubmitButtonProps) => {

    const { pending } = useFormStatus();
  return (
    <Button type="submit"
        aria-disabled = {pending}
        {...props}
    >
    {pending ? pendingText : children}
    </Button>
  )
}


export {SubmitButton}