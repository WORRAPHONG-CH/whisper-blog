import Hero from "./components/Hero";
import CarouselCategories from "./components/CarouselCategories";
import {Button} from "./components/ui/Button";
import Link from "next/link";
// import { motion } from "framer-motion";
// import { stagger } from "motion";
import Reveal from "./components/animation/Reveal";

// const containerVariant = {
//   hidden:{opacity:0},
//   visible:{
//     opacity:1,
//     transition:{
//       staggerChildren: 0.3
//     }
    
//   }
// }


export default async function Home() {
  // const session = await getServerSession(authOptions);
  return (
    <div className="min-h-screen h-fit min-w-full text-white"
      // variants={containerVariant}
      >
      
      <Hero/>
      
      <main>
        <CarouselCategories/>

        <section className="py-16  bg-slate-50">
          <Reveal><h2 className="text-3xl font-semibold text-center text-gray-800">What Whisper Offers</h2></Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-10 max-w-6xl mx-auto px-6">
            <Reveal>
            <div className="p-6 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">Create Stunning Blog Posts</h3>
              <p className="text-gray-600 mt-2">Share your thoughts, stories, or expertise with a beautiful and easy-to-use editor.</p>
            </div>
            </Reveal>
            <Reveal>
            <div className="p-6 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">Responsive Design</h3>
              <p className="text-gray-600 mt-2">{`Enjoy seamless browsing on any device, whether it's desktop, tablet, or mobile.`}</p>
            </div>
            </Reveal>
            <Reveal>
            <div className="p-6 bg-gradient-to-r from-teal-200 via-purple-200 to-orange-200 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">Stay Organized</h3>
              <p className="text-gray-600 mt-2">Categorize your posts, save drafts, and manage content effortlessly.</p>
            </div>
            </Reveal>
          </div>
        </section>

        
      {/* Vison Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 text-center">
        <Reveal><h2 className="text-3xl font-bold text-gray-800">Our Vision</h2></Reveal>
        <Reveal>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          {`Whisper is a platform built to help creators and thinkers share their voices with the world. 
          Whether you're here to inspire, learn, or explore, we're committed to building a community 
          where ideas thrive.`}
        </p>
        </Reveal>
      </section>

      


      
      {/* Final section */}
      <section className="py-12 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-center">
        <Reveal>
        <h2 className="text-3xl font-bold text-gray-800">
          Ready to Start Whispering Your Ideas?
        </h2>
        </Reveal>
        <Reveal>
        <p className="text-gray-600 mt-4">Join our growing community today and share your thoughts with the world.</p>
        </Reveal>
        <Reveal>
        <Link href={'/blogs'}>
          <Button className="mt-6 h-10 px-6 py-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600">
            Get Started
          </Button>
        </Link>
        </Reveal>
      </section>

      



      </main>
      
    </div>
  );
}
