'use client'
import React,{useState} from 'react'
import { Menu,X } from 'lucide-react'
import { Button } from './ui/Button'
import Link from 'next/link'
import { motion } from 'motion/react'

interface SidebarProps {
    navList: string[][];
}

export const SidebarNav:React.FC<SidebarProps> = (
    {navList}
)=> {
    const [isClick,setIsClick] = useState<boolean>(false);

    return (
    <div className='flex  md:hidden'>
        {!isClick && <div className='w-full '>
            <Button variant={'default'} className='p-2 flex justify-center items-center' onClick={()=>{setIsClick(!isClick)}}>
                <Menu size={20} color='gray'/>
            </Button>

        </div>
        }
        
        {/* Sidebar */}
        { isClick && <motion.div className='absolute inset-y-0 top-0 left-0 z-50 w-8/12 min-h-screen  bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 py-8 px-3 flex flex-col items-end'
        initial={{opacity:1}} animate={{opacity:1,right:['80%','30%']}} transition={{duration:0.25, delay:0.25, ease:'easeIn'}}
        >
            <Button variant={'default'} className='p-2 ' onClick={()=>{setIsClick(!isClick)}}>
                <X size={30} color='gray'/>
            </Button>
            <ul className='flex flex-col items-end gap-5 my-10'>
                {
                    navList.map(([menu,link],index)=>{
                        return(
                            <li key={index} className='text-gray-800 font-medium text-xl border-b-4 border-purple-600 ' onClick={()=>{setIsClick(!isClick)}}>
                                <Link href={link}>{menu}</Link>

                            </li>
                        )
                    })
                }
            </ul>
                
            </motion.div>
        }
        
    </div>
  )
}

