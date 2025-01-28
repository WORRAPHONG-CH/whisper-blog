'use client'
import React, { useState, ComponentProps } from 'react'
import { Button } from '@/app/components/ui/Button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { X, Check } from 'lucide-react'
import { Label } from '../ui/Label'
import { SubmitButton } from '../Submit-Button'

interface EditCategoryProps extends ComponentProps<typeof Button> {
    userId: string
    userName:string
    role: string
}

const EditUserButton = ({
    children,
    userId,
    userName,
    role,
    ...props
}: EditCategoryProps) => {

    const router = useRouter();
    const [click, setClick] = useState<boolean>(false);
    const [newRole, setNewRole] = useState<string>(role);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // edit user role 
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
            {
                role: newRole
            },
            {
                withCredentials:true
            })

            alert(`Edit Role: ${role} To ${newRole} Successfully `)

            setClick(!click)
            router.refresh()

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.message);
                setClick(!click)
                router.refresh()
            }
            else {
                console.log((error as Error).message);
                setClick(!click)
                router.refresh()
            }
        }
    }

    return (
        <div className='static'>
            {!click && <Button variant={'default'} onClick={() => { setClick(!click) }} {...props}>
                {children}
            </Button>}

            {click && <div className='fixed w-full h-screen inset-0 top-0 start-0 end-0 bottom z-50 rounded-3xl backdrop-blur-sm bg-white/30 flex justify-center items-center'>
                <div className='w-3/4 h-fit md:w-6/12 lg:w-4/12 rounded-2xl px-7 py-5 shadow-xl bg-slate-50 border-2 border-purple-500'>
                    <div className='h-1/6 flex flex-col gap-2 mb-3'>
                        <p className='text-xl font-medium text-purple-400'>Edit User Role</p>
                    </div>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-6'>
                        <div className='w-full flex flex-col gap-2'>
                            <Label>Change Role User: {userName}</Label>
                            <select name="role"  className='w-2/4'
                            onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setNewRole(e.target.value)} 
                            >
                                <option value={role}>{role}</option>
                                <option value={role === 'admin' ? 'member' : 'admin'}>
                                    {role === 'admin' ? 'member' : 'admin'}
                                </option>
                            </select>
                            
                            
                        </div>

                        <div className='w-full h-fit flex justify-end items-end gap-2'>
                            <Button className='p-0 m-0 flex' onClick={() => { setClick(!click) }}>
                                <X size={25} color='gray' />
                                <p>Cancel</p>
                            </Button>
                            <SubmitButton className='p-0 m-0 flex text-green-500'>
                                <Check size={25} color='green' />
                                <p>Confirm</p>
                            </SubmitButton>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    )
}

export { EditUserButton }
