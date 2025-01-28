import { type ClassValue,clsx } from "clsx"; 
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]){
    return twMerge(clsx(inputs));
}

// clsx => utility for constructing className strings conditionally. 
// Also serves as a faster & smaller drop-in replacement for the classnames module.
// twMerge => Utility function to efficiently merge Tailwind CSS classes in JS without style conflicts.