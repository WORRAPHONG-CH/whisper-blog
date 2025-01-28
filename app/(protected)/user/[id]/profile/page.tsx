import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { UserCircle, Mail, User, Users, Plus } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
// import { Post } from "@prisma/client";
import { CardPosts } from "@/app/components/CardPostsProfile";
import axios  from "axios";
import { Category } from "@prisma/client";
import { Button } from "@/app/components/ui/Button";
import Reveal from "@/app/components/animation/Reveal";
import TextDrop from "@/app/components/animation/TextDrop";

interface PostProps{
  id:string,
  title:string,
  content:string,
  category:Category,
  updateAt:Date
  image?:string

}


const fetchPosts = async (userId: string): Promise<PostProps[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user-posts/${userId}`,
      {
        headers: {
          "Cache-Control": "no-store", // Ensure data is always fresh (SSR)
        },
      }
    );
    return response.data.posts;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      throw error;
    } else {
      console.error((error as Error).message);
      throw error;
    }
  }
};

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/sign-in");
  }

  // const categories = await fetchCategory()
  const posts = await fetchPosts(session?.user.id);
  // console.log(posts);

  return (
    <div className="min-h-screen w-full py-10 bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200">
      <main className="w-11/12 md:w-7/12 mx-auto py-8 px-6 bg-white/90 shadow-xl rounded-3xl">
        {/* Profile Header */}
        <div className="text-center">
          <Reveal>
          <h1 className="text-4xl font-bold text-gray-800">Your Profile</h1>
          </Reveal>

          <TextDrop classname="mt-2 text-gray-600" 
          text={"Manage your account and explore your blog posts."}
          />
          
            
         
        </div>

        {/* Profile Details */}
        <div className="mt-10 flex flex-col items-center justify-center gap-6">
          {/* Profile Image */}
          <Reveal>
          <div className="relative w-full flex justify-center ">
            {session?.user.image ? (
              <Image
                src={session?.user.image}
                alt="User Profile"
                width={180}
                height={180}
                className="rounded-full border-4 border-white shadow-md"
              />
            ) : (
              <UserCircle className=" text-gray-300" size={120} color="purple"/>
            )}
          </div>
          </Reveal>

          <div className="w-full font-semibold text-gray-800 flex flex-col items-center ">
            <Reveal className="flex justify-center">
            <p className="text-2xl md:text-3xl">Welcome</p>
            </Reveal>
            <Reveal className="flex justify-center">
            <span className="text-purple-600 text-lg md:text-2xl">Khun {session?.user.name}</span>
            </Reveal>
          </div>
        </div>

        {/* User Info */}
        <Reveal>
        <div className="mt-6 mx-auto md:w-3/4  bg-gradient-to-r text-md md:text-lg from-indigo-200 to-pink-200 p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-4  text-gray-800">
            <User  className="text-purple-500" />
            <p>{session?.user.name}</p>
          </div>
          <div className="flex items-center gap-4 mt-4 text-gray-800">
            <Mail className="text-blue-500" />
            <p>{session?.user.email}</p>
          </div>
          <div className="flex items-center gap-4 mt-4  text-gray-800">
            <Users className="text-green-500" />
            <p>{session?.user.role}</p>
          </div>
        </div>
        </Reveal>

        {/* Blog Posts Section */}
        <Reveal>
        <div className="my-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Your Blogs</h2>
            <Link
              href="post/create-post"
              className="flex  items-center gap-2 px-3 py-2 text-sm md:text-md bg-purple-500 text-white rounded-xl shadow-md hover:bg-purple-700 transition"
            >
              <Plus size={20}/>
              <span>Create Post</span>
            </Link>
          </div>
          <div className="mt-6 space-y-4 overflow-y-auto max-h-[30rem] shadow-md rounded-xl">

            {posts.length > 0 ? (
              posts.map((post) => (
                <CardPosts
                  key={post.id}
                  userId={session?.user.id}
                  postId={post.id}
                  title={post.title}
                  content={post.content || ""}
                  categoryName={post.category.name}
                  updateAt={post.updateAt}
                  imageUrl={post.image}
                />
              ))
            ) : (
              <p className="text-gray-600 text-center">No blog posts yet!</p>
            )}
          </div>
        </div>
        </Reveal>

          
        <div className="flex flex-col items-center gap-5">
          <Reveal>
          <p className="text-xl md:text-3xl font-bold text-purple-500">{`Let's Explore People Blog`}</p>
          </Reveal>
          <Reveal >
          <Link href={'/blogs'}>
            <Button variant={'default'} className="px-6 py-4 h-8 md:h-11 text-md md:text-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold rounded-lg shadow hover:opacity-90">
              See more
              </Button>
          </Link>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
