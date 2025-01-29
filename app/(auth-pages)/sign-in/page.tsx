'use client'
import React,{useState} from 'react'
import { Input } from '@/app/components/ui/Input'
import { SubmitButton } from '@/app/components/Submit-Button';
import { Button } from '@/app/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import GoogleIcon from '@/app/components/GoogleIcon';
import { FormMessage, type FormMessageType } from '@/app/components/FormMessage';
import { AtSign,LockKeyhole,CircleUserRound } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Reveal from '@/app/components/animation/Reveal';
// import { sign } from 'crypto';
import { Suspense } from 'react';
import BounceLoader from '@/app/components/animation/BouceLoader';

interface UserData{
  email:string,
  password:string,
}


const initialUser:UserData = {
  email:'',
  password:'',
}

const initialFormState:FormMessageType = {
  success:false,
  message:'',
}

export default function SignInPage() {
  const router = useRouter();
  const [userData,setUserData] = useState<UserData>(initialUser);
  const [formState, setFormState] = useState<FormMessageType>(initialFormState);

  const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value}  = e.target;
    // console.log(`name:${name} | value:${value}`);

    // set state userData
    setUserData((prevState)=>{ 
      return prevState? {
        ...prevState,
        [name] : value
      }:
      prevState
    })

  } 
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault(); //prevent refresh after submit
    // console.log(userData);
    try{
      if(!userData.email && !userData.password){
        throw new Error('name or email or password is require. !!');
      }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)){
        throw new Error('Email is invalid !!');
      }
      if(userData.password.length < 6){
        throw new Error('Password length is invalid !!');
      }

      // Sign in with Next-auth
      const signInResult = await signIn('credentials',{
        email: userData.email,
        password: userData.password,
        redirect: false,
      })
      console.log('Sign in:',signInResult);
      if(!signInResult?.ok && signInResult?.error){
        throw new Error(signInResult.error);
      }
      
      router.push('/');

      
      
    }catch(error){
      setFormState({success:false, message: (error as Error).message})
      console.log((error as Error).message)
    }
  }
  
  // console.log('form state:',formState);
  
  return (
    <div className='min-h-screen w-full flex justify-center md:pt-10  bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200'>
        <Reveal className='w-full px-5 md:w-9/12'>
        <div className='bg-white h-fit mt-20 md:mt-0 md:w-full  rounded-2xl shadow-lg md:grid md:grid-cols-12'>
            <div className='col-span-7 relative rounded-s-2xl'>
              <Suspense fallback={<BounceLoader/>}>
                <Image
                alt='city-vibe'
                src={"https://images.pexels.com/photos/315191/pexels-photo-315191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                fill
                sizes='(max-width:768px) 300px '
                priority={true}
                style={{objectFit:'cover', }}
                className='rounded-s-2xl hidden md:flex'
                />
                </Suspense>
            </div>

            <div className='col-span-5 flex flex-col px-8 py-5 w-full gap-5 md:border-l-2'>
                <h1 className='font-extrabold self-center text-2xl text-purple-800'>Sign In</h1>
                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-3'>
                  <CircleUserRound color='purple' size={80} className='self-center'/>
                  <div className='w-full flex items-center gap-3 border border-gray-300 rounded-2xl ps-3 py-1'>
                    <AtSign color="purple" size={34}/>
                    <Input type='email' variant={'form'} name='email' onChange={handleChangeInput} placeholder='You@example.com'/>
                  </div>
                  <div className='w-full flex items-center gap-3 border border-gray-300 rounded-2xl ps-3 py-1'>
                  <LockKeyhole color="purple" size={34}/>
                    <Input type='password' variant={'form'} name='password' onChange={handleChangeInput} placeholder='Your password'/>
                  </div>
                  {formState.message && <FormMessage success={formState.success} message={formState.message} />}
                  <div className='flex justify-between'>
                    <Link href='/sign-up'>
                      <p className='text-sm text-gray-500 hover:text-purple-800/90'>{`Didn't have an account? Sign up`}</p>
                    </Link>
                    <Link href={'/forgot-password'}>
                      <p className='text-sm text-gray-500 hover:text-purple-800/90'>Forget password?</p>
                    </Link>
                  </div>
                  
                  <SubmitButton variant={'form'} size={'sm'} className='self-center w-full rounded-full'>Sign In</SubmitButton>
                </form>
                <div className='w-full flex items-center gap-2'>
                  <hr className='w-1/2  bg-gray-600'/>
                  <p className='text-gray-500'>Or</p>
                  <hr className='w-1/2 h-0.25 bg-gray-600'/>
                </div>
                <div className='w-full flex justify-center border border-gray-500 rounded-2xl hover:shadow-lg '>
                  <Button size={'sm'}  className='w-full border-gray-500 rounded-full flex gap-1'
                    onClick={()=>{
                      signIn('google' ,{callbackUrl:`/`})
                      // signIn('google',{callbackUrl:`/user/${session?.user.id}/profile`});
                      
                    }}>
                    <GoogleIcon width='30' height='30'/>
                    Continue with Google
                  </Button>
                </div> 
            </div>
        </div>
        </Reveal>
    </div>
  )
}


