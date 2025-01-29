// 'use client'
import React from 'react'
import Reveal from '../animation/Reveal'
import { DeleteUserButton } from './DeleteUserButton'
import { EditUserButton } from './EditUserButton'

type Userprops = {
    id: string,
    name: string | null,
    email: string,
    role: string,
    image: string | null,
    posts?: {
        id: string,
        image: string | null,
        title: string
    }[]
}

export default function UserManagement(
    { users }: { users: Userprops[] }
) {
    return (
        <Reveal>
            <div className="max-w-5xl w-full mx-auto overflow-x-auto">
                <h3 className="text-2xl font-bold mb-2">Manage Users</h3>
                <div className="bg-white px-6 rounded-lg shadow-md overflow-x-auto">
                    <table className="w-full border-collapse table-auto">
                        <thead>
                            <tr className="bg-purple-100 text-left">
                                <th className="p-2 text-sm font-medium text-gray-700 text-center">Name</th>
                                <th className="p-2 text-sm font-medium text-gray-700 text-center">Email</th>
                                <th className="p-2 text-sm font-medium text-gray-700 text-center">Role</th>
                                <th className="p-2 text-sm font-medium text-gray-700 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users ? users.map((user) => {
                                return (
                                    <tr key={user.id} className="border-b border-gray-200">
                                        <td className="p-2 text-sm text-gray-800">{user.name}</td>
                                        <td className="p-2 text-sm text-gray-800">{user.email}</td>
                                        <td className="p-2 text-sm text-gray-800">{user.role}</td>
                                        <td className="p-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <EditUserButton className='gap-1 px-3 py-4 rounded-xl bg-gray-500 hover:bg-gray-600 text-white'
                                                    userId={user.id}
                                                    userName={user.name || ''}
                                                    role={user.role}
                                                >
                                                    Edit
                                                </EditUserButton>

                                                <DeleteUserButton className='gap-1 px-2 py-4 rounded-xl bg-red-500 hover:bg-red-600 text-white'
                                                    userId={user.id}
                                                    userName={user.name || ''}
                                                    posts={user.posts}
                                                >
                                                    Delete
                                                </DeleteUserButton>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }) :
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

