'use client'
import React, {useState,ComponentProps} from 'react'
import { Button } from './ui/Button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import {X, Trash2} from 'lucide-react'
import { deleteImage } from '@/utills/supabase/storage/clientStorage'


export interface DeleteBtnProp extends ComponentProps<typeof Button>{
    postId:string
    imageUrl?:string
}


const DeleteButton = ({
    children,
    postId,
    imageUrl,
    ...props}:DeleteBtnProp ) => {

    const router = useRouter();
    const [click,setClick] = useState<boolean>(false);


    const deletePost = async (postId:string,imageUrl?:string) =>{
        try{
            
            // delete image 
            if(imageUrl){
                await deleteImage(imageUrl);
            }
            
            // delete post 
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`)
            alert(`Delete Post:${postId} Successfully `)
            
            setClick(!click)
            router.refresh()
            
        }catch(error){
            if(axios.isAxiosError(error)){
                console.log(error.message);
                setClick(!click)
                router.refresh()
            }
            else{
                console.log((error as Error).message);
                setClick(!click)
                router.refresh()
            }
        }
    } 
    

  return (
    <div className='static'>
        {!click && <Button variant={'danger'} onClick={()=>{setClick(!click)}} {...props}>
            {children}
        </Button>}

        {click && <div className='fixed w-full h-screen inset-0  top-0 start-0 end-0 bottom  z-50  rounded-3xl backdrop-blur-sm bg-white/30 flex justify-center items-center '> 
            <div className='w-3/4 h-fit md:w-6/12 md:h-40 rounded-2xl px-7 py-5 shadow-xl bg-white'>
                <div className='h-1/6 flex flex-col gap-2'>
                    <p className='text-xl font-medium'>Are you sure to delete this post?</p>
                    <p className='text-md'>This will delete post permanent, Please be careful your action ! </p>
                </div>
                
                <div className='w-full h-5/6 flex justify-end items-end gap-2'>
                    <Button className='p-0 m-0 flex' onClick={()=>{setClick(!click)}}>
                        <X size={25} color='gray'/>
                        <p>Cancel</p>
                    </Button>
                    <Button className='p-0 m-0 flex  text-red-500' onClick={() =>{deletePost(postId,imageUrl)}}>
                        <Trash2 size={25} color='red'/>
                        <p>Delete</p>
                    </Button>
                </div>
            </div>
                
                
            </div>
      
            
        }

    </div>
    
  )
}


export {DeleteButton}