'use client'
import React, {useEffect} from 'react'
import { motion, useAnimate, useInView } from 'motion/react'

interface RevealProps{
    children: React.JSX.Element,
    width?: 'fit' | '100%',
    className?: string
}

const Reveal:React.FC<RevealProps> = (
    {children,width='fit', className}
) => {
    const [scope,animate] = useAnimate()
    const isInView = useInView(scope)

    useEffect(()=>{
        if(isInView){
            const handleAnimate = async () =>{
                await animate([
                    [scope.current, {opacity:[0,1], y:[20,0]}, {duration:0.75}]
                ])
            }
            handleAnimate();
        }
    },[isInView,scope,animate])

  return (
    <div ref={scope} className={`w-${width} ${className}`}>
        <motion.div id='target' >
            {children}
        </motion.div>

    </div>
  )
}

export default Reveal