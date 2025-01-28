
import React from 'react';
import { Button } from './ui/Button';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import TextDrop from './animation/TextDrop';
import Reveal from './animation/Reveal';

export default async function Hero() {
  const session = await getServerSession(authOptions);
  // console.log('hero session:',session)
  // console.log('hero path:',session?.user ? `/${session?.user.role === 'admin' ? 'admin': 'user'}/${session?.user.id}/profile`: '/sign-in' )
  
  return (
    <div className="h-[380px] md:h-[600px] bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 text-center py-24 px-6 md:py-48 md:px-6">
      <TextDrop text="Share Your Whisper With the World"  classname='text-3xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-purple-800 via-pink-500 to-red-400'/>
      
      <Reveal>
      <p className="mt-4 text-lg text-gray-600 sm:text-2xl">
        Because every story deserves to be heard—big or small.
      </p>
      </Reveal>
      <div className="mt-5 flex flex-col gap-2 md:flex-row md:gap-5 justify-center">
        <Reveal className=''>
        <Link href={session?.user ? `/${session.user.role === 'admin' ? 'admin': 'user'}/${session.user.id}/profile`: '/sign-in' }>
          <Button variant={'default'} className="px-6 py-3 h-10 text-white bg-purple-600 rounded-lg hover:bg-purple-700">
            {session?.user ? `See your Profile` :'Start Sharing Your Story'}
          </Button>
        </Link>
        </Reveal>
        <Reveal className=''>
        <Link href={`/blogs`}>
          <Button className="px-6 py-3 h-10 text-purple-600 bg-white border border-purple-600 rounded-lg hover:bg-gray-100">
            Explore Stories
          </Button>
        </Link>
        </Reveal>
        
      </div>
      {/* <div className="absolute inset-0 opacity-30 -z-10 bg-slate-900 mix-blend-multiply">
        <Image/>
      </div> */}
    </div>
  );
}

