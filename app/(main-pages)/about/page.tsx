import React from 'react';
import Reveal from '@/app/components/animation/Reveal';
import TextDrop from '@/app/components/animation/TextDrop';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200">
      {/* Hero Section */}
      <section className="text-center py-16">
        <Reveal>
        <h1 className="text-5xl font-bold  text-gray-800">
          About Whisper
        </h1>
        </Reveal>
        
        <TextDrop classname='mt-4 text-xl text-gray-600 max-w-2xl mx-auto' 
        text={`Whisper is a fresh, innovative platform created to inspire creativity, spark conversations, and bring ideas to life. Let's write our story together.`}
        />

      </section>

      {/* Features Section */}
      <section className="py-10 bg-white">
        <Reveal>
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          What Makes Whisper Unique
        </h2>
        </Reveal>

        <TextDrop classname='text-gray-600 text-center mt-2 max-w-3xl mx-auto'
        text={`Explore the key features and vision that set Whisper apart.`}
        />
        

        <div className="max-w-7xl mx-auto px-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {/* Features Cards */}
          <Reveal>
          <div className="bg-gradient-to-r h-40 from-purple-200 via-pink-200 to-blue-200 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              A Space for Creativity
            </h3>
            <p className="text-gray-700 mt-2">
              Whisper offers a unique platform to express your thoughts, ideas, and creativity with a vibrant and supportive community.
            </p>
          </div>
          </Reveal>

          <Reveal>
          <div className="bg-gradient-to-r h-40 from-green-200 via-yellow-200 to-red-200 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Designed for You
            </h3>
            <p className="text-gray-700 mt-2">
              A user-friendly experience designed to make writing, sharing, and collaborating seamless and enjoyable.
            </p>
          </div>
          </Reveal>

          <Reveal>
          <div className="bg-gradient-to-r h-40 from-teal-200 via-purple-200 to-orange-200 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              A Vision for the Future
            </h3>
            <p className="text-gray-700 mt-2">
              Whisper is dedicated to growing with its users, introducing innovative tools and features.
            </p>
          </div>
          </Reveal>
        </div>
      </section>

      {/* Quotation Section */}
      <section className="py-16 bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100 text-center">
        <Reveal>
        <h2 className="text-3xl font-semibold text-gray-800">
          A Word to Inspire
        </h2>
        </Reveal>
        <Reveal>
        <blockquote className="mt-6 text-2xl italic font-light text-gray-700 max-w-3xl mx-auto">
          {`"Every great idea starts with a whisper."`}
        </blockquote>
        </Reveal>
        <Reveal><p className="mt-4 text-lg text-gray-600">– Anonymous</p></Reveal>
      </section>
    </div>
  );
};
export default AboutPage