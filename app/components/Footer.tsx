
import React from "react";
import Link from "next/link";
import Reveal from "./animation/Reveal";
const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-10">
      <Reveal>
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-6 sm:mb-0 text-center sm:text-left">
            <h2 className="text-3xl font-extrabold">Whisper</h2>
            <p className="mt-2 text-sm">
              Share your experiences, whisper your thoughts, and inspire the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-8 text-center sm:text-left">
            <ul className="space-y-2">
              <Link href="/about"><p  className="hover:underline">About Us</p></Link>
              <Link href="/contact"><p  className="hover:underline">Contact</p></Link>
            </ul>
            
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/50"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="mb-4 sm:mb-0">
            © {new Date().getFullYear()} Whisper. All rights reserved.
          </p>
          
        </div>
      </div>
      </Reveal>
    </footer>
  );
};

export default Footer;
