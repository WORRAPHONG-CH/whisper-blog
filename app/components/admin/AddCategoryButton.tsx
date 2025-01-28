'use client'
import React, {useState,ComponentProps} from 'react'
import { Button } from '@/app/components/ui/Button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import {X, Check} from 'lucide-react'
import { Label } from '../ui/Label'
import { Input } from '../ui/Input'
import { SubmitButton } from '../Submit-Button'



const AddButtonCategory = ({
    children,
    ...props}:ComponentProps<typeof Button> ) => {

    const router = useRouter();
    const [click,setClick] = useState<boolean>(false);
    const [newCategory,setNewCategory] = useState<string>('');


    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault();
        console.log('add:',newCategory);

        try{
            // create category 
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/category`,{
                name:newCategory
            })
            alert(`Add Category: ${newCategory} Successfully `)
            
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
        {!click && <Button variant={'default'} onClick={()=>{setClick(!click)}} {...props}
            >
            {children}
        </Button>}

        {click && <div className='fixed w-full h-screen inset-0  top-0 start-0 end-0 bottom  z-50  rounded-3xl backdrop-blur-sm bg-white/30 flex justify-center items-center '>  
            
            <div className='h-fit w-3/4 md:w-8/12 lg:w-6/12  rounded-2xl px-7 py-5 shadow-xl bg-slate-50 border-2 border-purple-500'>
                <div className='h-1/6 flex flex-col gap-2 mb-3'>
                    <p className='text-xl font-medium text-purple-400'>Add Category</p>
                </div>
                
                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-6 '>
                    <div className='w-full flex flex-col gap-2' >
                        <Label>Category Name</Label>
                        <Input 
                        type='text'
                        name='name'
                        placeholder='Enter category name'
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                            setNewCategory(e.target.value);
                        }}
                        className='focus:border-2 focus:border-purple-400'
                        />

                    </div>

                    <div className='w-full h-fit flex justify-end items-end gap-2'>
                    <Button className='p-0 m-0 flex' onClick={()=>{setClick(!click)}}>
                        <X size={25} color='gray'/>
                        <p>Cancel</p>
                    </Button>
                    <SubmitButton className='p-0 m-0 flex  text-green-500' >
                        <Check size={25} color='green'/>
                        <p>Confirm</p>
                    </SubmitButton>
                    </div>
                
                </form>
                </div>
                
                
                
            </div>
      
            
        }

    </div>
    
  )
}


export {AddButtonCategory}