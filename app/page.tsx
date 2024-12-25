import { Button } from "./components/ui/Button";
import PostTable from './components/PostTable';
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  
  return (
    <div className="bg-slate-200 min-h-screen min-w-full py-10 px-10 flex flex-col gap-3">
      <h2 className="text-black font-bold text-2xl">Blog Posts</h2>
      <main className="bg-white  rounded-md shadow-md ">
        <Suspense fallback={
          <p className="text-md w-full self-center "> Loading Data... </p>}>
          <PostTable/>
        </Suspense>
      </main>
      
      <Button variant={"success"} size={'sm'} className="w-1/4 self-start">
        <Link href='/create-post'>Create a New Post</Link>
      </Button>
    </div>
  );
}
