import React from 'react'
import { CircleCheck,CircleX } from 'lucide-react'

export interface FormMessageType{
  success:boolean,
  message?:string,
}


export const FormMessage:React.FC<FormMessageType> = (
  {success,message}
) => {
  return (
    <div>
        {success ? <div className='text-green-600 text-sm items-center flex gap-1'>
          <CircleCheck color='green' size={20} />
          {message}
          </div>
        :
        <div className='text-red-600 text-sm flex items-center gap-1'>
          <CircleX color="red" size={20}/>
          {message}</div>
        }
        
    </div>
  )
}
