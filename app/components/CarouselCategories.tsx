// components/CategoryCarousel.tsx
'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from 'swiper/modules';
import Image from "next/image";
import Reveal from "./animation/Reveal";
import TextDrop from "./animation/TextDrop";

const categories = [
    { name: "Travel", image: "/assets/categories/travel2.jpg" },
    { name: "Food", image: "/assets/categories/food.jpg" },
    { name: "Lifestyle", image: "/assets/categories/lifestyle1.jpg" },
    { name: "Animal", image:"/assets/categories/animal.jpg"},
    { name: "Technology", image: "/assets/categories/technology.jpg"},
    { name: "Articles", image: "/assets/categories/article1.jpg" },

];

const CarouselCategories: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto pt-8 pb-20">
      <div className="text-center mb-8">
      <Reveal>
      <h2 className="text-4xl font-extrabold text-gray-800 sm:text-5xl">
        Discover Stories That Inspire
      </h2>
      </Reveal>
      <Reveal>
      <TextDrop text="Explore categories like Lifestyle, Food, Travel, and more. Find your next source of inspiration!"
      classname="mt-2 text-lg text-gray-600 sm:text-xl"
      />
      
      </Reveal>
    </div>
    <Reveal>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          300: {slidesPerView: 1},
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.name}>
            <div className="relative group w-full h-full">
              <Image
                src={category.image}
                alt={category.name}
                // fill
                width={500} height={500}
                priority={true}
                style={{objectFit:'cover'}}
                className=" rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white text-xl font-bold">{category.name}</h3>
              </div>
            </div>
            
          </SwiperSlide>
        ))}
      </Swiper>
      </Reveal>
    </div>
  );
};

export default CarouselCategories;
