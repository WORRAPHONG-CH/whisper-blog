'use client'
import { motion } from 'framer-motion'
import DropCharacters from './DropCharacters'

const TextDrop = ({ text,classname }: { text: string, classname?:string }) => {
  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={container}>
      <div>
        <DropCharacters
          text={text}
          className={classname}
        />
      </div>
    </motion.div>
  )
}

export default TextDrop