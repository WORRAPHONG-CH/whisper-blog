import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components/NavBar";
import Provider from "./components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Footer from "./components/Footer";


const rubik = Rubik({
  variable: "--font-rubik",
  subsets:['latin'],
  weight: ['300','400','500','600','700','800','900'],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whipser Blog",
  description: "A blog for everyone",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} antialiased font-rubik 
        bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 text-black `}
      >
        <Provider session={session} >
          <NavBar/>
          {children}
          <Footer/>
        </Provider>
        
      </body>
    </html>
  );
}
//from-[#fa8cff] via-[#9182ff] to-[#0476ff]
