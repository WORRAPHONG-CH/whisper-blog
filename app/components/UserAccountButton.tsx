'use client';
import { Button } from "./ui/Button";
import Link from "next/link";
import React,{useState} from 'react'
import { UserCircle, LogOut , GalleryVerticalEnd} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
// import { useRouter } from "next/navigation";

export const UserAccountButton = () => {
  // const router = useRouter();
  const {data:session,status} = useSession();
  const [isOpen,setIsOpen] = useState<boolean>(false);
  // console.log('session id:',session?.user.id);
  return (

    <div className="w-28 relative flex  ">
        {status === 'unauthenticated' && 
        <div className="w-full">
          <Link href='/sign-in' className="flex justify-center gap-1 items-center">        
                <Button className='flex gap-1 w-32 h-10 text-white bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 rounded-full'
                  >
                    <UserCircle color='white' size={24}/>
                    <p>Sign In</p>
                </Button>
            </Link>
        </div>}
      {status === 'authenticated' && 
      <div className="w-full h-10 flex justify-center gap-1 items-center">
              <div className='bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 rounded-full hover:cursor-pointer'
                  onClick={() =>{setIsOpen(!isOpen)}}
                >
                {/* <div className='flex gap-1 h-full w-full justify-center items-center text-white bg-gradient-to-tr from-blue-800 to-[#5D43E5] rounded-full'
                  onClick={() =>{setIsOpen(!isOpen)}}
                > */}
                    {session?.user.image ? 
                    <Image src={session.user.image} alt='profile' width={50} height={50} style={{objectFit:'cover'}}  
                    className="rounded-full"
                    />
                    :
                    <UserCircle color='white' size={45}/>}
                    {/* <p>{session?.user.name}</p> */}
                </div>
          
      </div>}
        
        {status === 'authenticated' && isOpen && 
            <div className="bg-white absolute  top-12 -left-12  h-fit w-40  px-2 py-3 text-md  rounded-md border border-gray-300 shadow-lg   
              flex flex-col gap-2">
              <Link href={`/${session.user.role === 'admin' ? 'admin' :'user'}/${session.user.id}/profile`} className="flex w-full items-center gap-2 " onClick={()=>{setIsOpen(!isOpen)}}>
                  <UserCircle color="purple" size={28}/>
                  <p>Profile</p>
              </Link>
              <Link href={`/${session.user.role ==='admin'? 'admin' : 'user'}/${session.user.id}/profile`} className="flex w-full items-center  gap-2 " onClick={()=>{setIsOpen(!isOpen)}}>
                  <GalleryVerticalEnd />
                  <p>Your Blogs</p>
              </Link>
              <div className="flex items-center w-3/4 gap-1 hover:cursor-pointer"
                  onClick={() =>{
                    setIsOpen(!isOpen)
                    signOut({callbackUrl:'/sign-in'});
                    
                    }}>
                  <LogOut color="purple" size={25}/>
                  <p>Sign Out</p>
              </div>
              
            </div>
              }
    </div>
    
  )
}

