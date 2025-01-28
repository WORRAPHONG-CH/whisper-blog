import React from 'react'
import Link from 'next/link';
import { UserAccountButton } from './UserAccountButton';
import { SidebarNav } from './SidebarNav';
// import Reveal from './animation/Reveal';

export async function NavBar() {
    const navList = [
        ['Home', '/'],
        ['About','/about'],
        ['Blogs', '/blogs'],
        ['Contact', '/contact'],
    ];

    return (
        <div className='min-w-full h-20'>
            <nav className='fixed z-50 flex w-full h-20  justify-between items-center px-8 py-2 bg-gradient-to-b from-slate-50 to-white backdrop-blur-md backdrop-brightness-150 bg-white/30 shadow-lg'>
            <div className='flex justify-between items-center'>
                <div className='md:hidden'>
                    <SidebarNav navList={navList}/>
                </div>
                
                <Link href='/'>
                    <h1 className='text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
                        Whisper
                    </h1>
                </Link>
            </div>
                

                <div className='hidden md:flex md:font-medium md:h-10 md:bg-white md:flex-row md:gap-4 md:min-w-96 md:justify-center md:items-center md:rounded-full md:shadow-xl'>
                    <ul className='flex flex-row gap-5'>
                        {navList.map(([title, path], index) => (
                            <Link href={path} key={index}>
                                <li className='hover:text-purple-500'>{title}</li>
                            </Link>
                        ))}
                    </ul>
                </div>
                
                <UserAccountButton />
                

                
                
            </nav>
            
            

        </div>
    );
}
