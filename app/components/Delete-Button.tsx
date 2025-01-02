'use client'
import React, {ComponentProps} from 'react'
import { Button } from './ui/Button'
import axios from 'axios'
import { useRouter } from 'next/navigation'


export interface DeleteBtnProp extends ComponentProps<typeof Button>{
    postId:number
}


const DeleteButton = ({
    children,
    postId,
    ...props}:DeleteBtnProp ) => {

    const router = useRouter();

    // const fetchPost = async () =>{
    //     try{
    //         axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);

    //     }catch(error){
    //         if(axios.isAxiosError(error)){
    //             console.log(error.message);
    //         }
    //         else{
    //             console.log((error as Error).message)
    //         }
    //     }
    // }

    const deletePost = async () =>{
        try{
            // delete post 
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`)
            alert(`Delete Post${postId} Successfully `)
            // fetchPost();
            router.refresh()
            

        }catch(error){
            if(axios.isAxiosError(error)){
                console.log(error.message);
            }
            else{
                console.log((error as Error).message);
            }
        }
    } 
    

  return (
    <Button variant={'danger'} onClick={deletePost} {...props}>
    {children}
    </Button>
  )
}


export {DeleteButton}