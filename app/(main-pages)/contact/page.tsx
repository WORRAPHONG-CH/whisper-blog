'use client'
import React from 'react';
import { SubmitButton } from '@/app/components/Submit-Button';
import { Label } from '@/app/components/ui/Label';
import { Input } from '@/app/components/ui/Input';
import Reveal from '@/app/components/animation/Reveal';
import TextDrop from '@/app/components/animation/TextDrop';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 via-pink-200 to-blue-200 flex flex-col justify-center items-center py-12">
      <Reveal>
      <h1 className="text-4xl font-bold text-purple-600 mb-6 text-center">Get in Touch</h1>
      </Reveal>
      
      <TextDrop  classname='text-lg text-gray-600 text-center max-w-2xl mb-8'
      text={`Have questions or want to collaborate? We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.`}
      />

      <Reveal className='w-full max-w-lg bg-white rounded-2xl shadow-lg p-8  border-2 border-purple-400'>
      <form className=" flex flex-col gap-6">
        <div>
          <Label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</Label>
          <Input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <Label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</Label>
          <Input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <Label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</Label>
          <textarea
            id="message"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            rows={5}
            placeholder="Write your message here..."
          ></textarea>
        </div>

        <SubmitButton
          className="w-full py-2 px-4 h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-md shadow-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Send Message
        </SubmitButton>
      </form>
      </Reveal>

      <Reveal>
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Other Ways to Reach Us</h2>
        <p className="text-lg text-gray-600 mt-4">
          Email: <a href="mailto:Worraphong.che@gmail.com" className="text-blue-600 hover:underline">Worraphong.che@gmail.com</a>
        </p>
        <p className="text-lg text-gray-600">
          Phone: <a href="tel:0641865550" className="text-blue-600 hover:underline">064-186-5550</a>
        </p>
      </div>
      </Reveal>
    </div>
  );
};

export default ContactPage;
