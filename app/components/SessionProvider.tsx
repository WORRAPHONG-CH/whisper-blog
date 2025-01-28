'use client';
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface ProviderProp {
    children: React.ReactNode,
    session: Session | null
};

const Provider:React.FC<ProviderProp> = (
    {children,session}) =>{
    return(
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default Provider;