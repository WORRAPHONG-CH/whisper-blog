'use client'
import React,{useState,useEffect} from 'react'
import Reveal from '../animation/Reveal'
import { DeleteUserButton } from './DeleteUserButton'
import { EditUserButton } from './EditUserButton'
import axios,{AxiosError} from 'axios'

interface UserProps{
    id:string;
    name:string;
    email:string;
    role:string;
    posts?: {
        id: string;
        title: string;
        imgUrl?: string;
    }[]
}

export default function UserManagement(
    // {users}: {users:UserProps[]}
){

    const [users,setUsers] = useState<UserProps[] | null>(null);

    const fetchUsers = async ()=> {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
                withCredentials: true // Ensures cookies are sent with the request
            });
    
            if (response.statusText !== 'OK') {
                throw new Error('Failed to fetch users');
            }
    
            setUsers(response.data.users);
    
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.message);
                throw (error as AxiosError).message;
            } else {
                console.error((error as Error).message);
                throw (error as Error).message;
            }
        }
    };

    useEffect(()=>{
        fetchUsers();

    },[])
  return (
    <Reveal>
    <div className="max-w-5xl w-full mx-auto  overflow-x-auto">
                <h3 className="text-2xl font-bold mb-2">Manage Users</h3>
                <div className="bg-white px-6 rounded-lg shadow-md overflow-x-auto"> 
                    <table className="w-full border-collapse table-auto ">
                        <thead>
                            <tr className="bg-purple-100 text-left">
                                <th className="p-2 text-sm font-medium text-gray-700 text-center">Name</th>
                                <th className="p-2 text-sm font-medium text-gray-700 text-center">Email</th>
                                <th className="p-2 text-sm font-medium text-gray-700 text-center">Role</th>
                                <th className="p-2 text-sm font-medium text-gray-700 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* User rows */}
                            {users? users.map((user) =>{
                                return(
                                    <tr key={user.id} className="border-b border-gray-200">
                                        <td className="p-2 text-sm text-gray-800">{user.name}</td>
                                        <td className="p-2 text-sm text-gray-800">{user.email}</td>
                                        <td className="p-2 text-sm text-gray-800">{user.role}</td>
                                        <td className="p-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <EditUserButton className='gap-1 px-3 py-4 rounded-xl bg-gray-500 hover:bg-gray-600 text-white'
                                                userId={user.id}
                                                userName={user.name}
                                                role={user.role}
                                                >
                                                    Edit
                                                </EditUserButton>

                                                <DeleteUserButton  className=' gap-1 px-2 py-4 rounded-xl bg-red-500 hover:bg-red-600 text-white'
                                                userId={user.id}
                                                userName={user.name}
                                                posts={user.posts}
                                                >
                                                    Delete
                                                </DeleteUserButton>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }):
                            <tr className=''>
                                <td colSpan={4} className="p-2 text-sm text-center text-gray-800">Data not found</td>
                            </tr>
                        
                        }
                            
                        </tbody>
                    </table>
                </div>
            </div>
            </Reveal>
  )
}

