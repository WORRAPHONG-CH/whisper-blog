'use client'
import React, {useState,} from 'react'
import { Input } from '@/app/components/ui/Input'
import { SubmitButton } from '@/app/components/Submit-Button';
import { Button } from '@/app/components/ui/Button';
import { FormMessage, type FormMessageType } from '@/app/components/FormMessage';
import Link from 'next/link';
import Image from 'next/image';
import axios,{AxiosError} from 'axios';
import GoogleIcon from '@/app/components/GoogleIcon';
import { useRouter } from 'next/navigation';
import Reveal from '@/app/components/animation/Reveal';
// import { signIn } from 'next-auth/react';
// import { Label } from '@/app/components/ui/Label'

import { CircleUserRound, AtSign,LockKeyhole,CircleCheck } from 'lucide-react';

interface UserData {
  name:string,
  email:string,
  password:string
}

const initialUserData:UserData = {
  name:'',
  email:'',
  password:'',

}

const initFormMessage:FormMessageType = {
  success: false,
  message: '',
}


export default function SignupPage() {
  const router = useRouter();
  const [userData,setUserData] = useState<UserData>(initialUserData);
  const [confirmPassword,setConfirmPassword] = useState<string>('');
  const [matchPassword,setMatchPassword] = useState<boolean>(false);
  const [submitState, setSubmitState] = useState<FormMessageType>(initFormMessage);
  
  // console.log(userData)


  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name,value} = e.target;
    // console.log(`name:${name} | value:${value}`);

    // Set value to userData
    setUserData((prevState)=>{
        return prevState? {
          ...prevState,
          [name] : value
        }:
        prevState
    }) 
  }

  const handleConfirmPassword = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const confirmPasswordChange = e.target.value;
    setConfirmPassword(confirmPasswordChange);
    setMatchPassword(userData.password === confirmPasswordChange);

  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault(); // prevent refresh after submit
    console.log('user:',userData)
    
    try{
      if(!userData.name || !userData.email || !userData.password){
        throw new Error('name or email or password is require. !!')
      }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)){
        throw new Error('Email is invalid. !!')
      }
      if(userData.password.length < 6){
        throw new Error('Password length should more than 6 characters. !!')
      }
      
      // Send userData to api 
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-up`,{
        name:userData.name,
        email:userData.email,
        password: userData.password
      })
      router.push('/sign-in')
      
    }catch(error){
      
      if(axios.isAxiosError(error)){
        const axiosError = error as AxiosError
        setSubmitState({success:false,message: axiosError.message})
      }
      else{
        setSubmitState({success:false, message: (error as Error).message})
      }
    }
  }



  return (
    <div className='min-h-screen w-full flex justify-center pt-10  bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200'>
        <Reveal className='w-full md:w-9/12 '>
        <div className='bg-white h-fit  md:mt-0 md:w-full  rounded-2xl shadow-lg md:grid md:grid-cols-12 '>
            <div className='col-span-7 relative rounded-s-2xl'>
                <Image alt='city-vibe' src={'https://images.pexels.com/photos/10170503/pexels-photo-10170503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                fill
                sizes='(max-width:768px) 200px'
                priority={true}
                style={{objectFit:'cover'}}
                className='rounded-s-2xl'
                />
            </div>

            <div className='col-span-5 flex flex-col px-6 py-5 w-full gap-5 md:border-l-2'>
                <h1 className='font-extrabold self-center text-2xl text-purple-800'>Sign Up</h1>
                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-3'>
                  <div className='w-full flex items-center gap-3 border border-gray-300 rounded-2xl ps-3 py-1 focus:border focus:border-purple-700'>
                    <CircleUserRound color='purple' size={38}/>
                    <Input type='text' variant={'form'} name='name' onChange={handleInputChange} placeholder='Enter your name' required/>
                      
                  </div>
                  <div className='w-full flex items-center gap-3 border border-gray-300 rounded-2xl ps-3 py-1'>
                    <AtSign color="purple" size={34}/>
                    <Input type='email' variant={'form'} name='email' onChange={handleInputChange} placeholder='You@example.com' required/>
                  </div>
                  <div className='w-full flex items-center gap-3 border border-gray-300 rounded-2xl ps-3 py-1'>
                  <LockKeyhole color="purple" size={34}/>
                    <Input type='password' variant={'form'} name='password' onChange={handleInputChange} placeholder='Your password' required/>
                  </div>
                  <div className='w-full flex items-center gap-3 border border-gray-300 rounded-2xl ps-3 py-1'>
                    <CircleCheck color="purple" size={34}/>
                    <Input type='password' variant={'form'} name='confirmPassword' onChange={handleConfirmPassword} placeholder='Confirm your password' required/>
                  </div>

                  { confirmPassword && matchPassword && <FormMessage success={matchPassword} message={'Password match!'}/>}
                  { confirmPassword && !matchPassword && <FormMessage success={matchPassword} message={'Password not Match!'}/>}                  
                  { submitState.message && <FormMessage success={submitState.success} message={submitState.message} /> }

                  <Link href='/api/auth/signin'>
                    <p className='text-sm text-gray-500 hover:text-purple-800/90'>{`Have an account? Sign in`}</p>
                  </Link>
                  <SubmitButton disabled={!matchPassword} size={'sm'} variant={'form'} className='self-center w-full rounded-full '
                  >Sign up</SubmitButton>
                </form> 
                <div className='w-full flex items-center gap-2'>
                  <hr className='w-1/2  bg-gray-600'/>
                  <p className='text-gray-500'>Or</p>
                  <hr className='w-1/2 h-0.25 bg-gray-600'/>
                </div>
                <Link href={'#'} className='w-full flex justify-center border border-gray-500 rounded-2xl hover:shadow-lg '>
                  <Button size={'sm'}  className='w-full border-gray-500 rounded-full flex gap-1 ' 
                    onClick={()=>{
                      // signIn('google',{callbackUrl:'/'});
                    }}
                    >
                    <GoogleIcon width='30' height='30'/>
                    Continue with Google
                  </Button>
                </Link>
            </div>
        </div>
        </Reveal>
    </div>
  )
}

