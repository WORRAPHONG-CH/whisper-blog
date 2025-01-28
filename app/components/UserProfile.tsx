'use client'
import React from 'react'
import { useSession } from 'next-auth/react'

function UserProfile() {
    const {data:session,status} = useSession()

    return (
        <div>
            {JSON.stringify(session) + JSON.stringify(status)}; 
        </div>
    )
}

export default UserProfile