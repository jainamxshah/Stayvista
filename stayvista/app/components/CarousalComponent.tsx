'use client'

// components/CarouselComponent.tsx
import React, { useState } from "react";
import Image from "next/image";
import image1 from '/public/steffen-lemmerzahl-fix8XASpE44-unsplash.jpg'; 
import image2 from '/public/artists-eyes-UW0gND4RcfQ-unsplash.jpg'; 
import image3 from '/public/abinash-satapathy-rPZIDViMDCg-unsplash.jpg'; 
import image4 from '/public/edwin-petrus-4fRZLd32GQY-unsplash.jpg'; 
import image5 from '/public/jonas-allert-8Jqmm6T29yk-unsplash.jpg'; 

const CarouselComponent: React.FC = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
  ];

  // Text for each slide
  // Text for each slide, suitable for an Airbnb-like website
const slideTexts = [
  "Find Your Perfect Getaway",
  "Stay Anywhere, Live Like a Local",
  "Unique Homes, Unforgettable Experiences",
  "Discover Amazing Places to Stay",
  "Book Your Next Adventure Today"
];


  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-full overflow-hidden mb-[50px]">
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="w-full flex-shrink-0 h-[500px] relative">
            <Image 
              src={src} 
              alt={`Slide ${index + 1}`} 
              layout="fill" 
              objectFit="cover" 
              style={{opacity: 0.65}}
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-stayvista font-bold text-3xl md:text-5xl text-center">
                {slideTexts[index]}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Hidden but clickable prev/next buttons */}
      <button 
        onClick={prevSlide} 
        className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 pointer-events-auto bg-gray-700 text-white px-2 py-1 rounded"
      >
        Prev
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 pointer-events-auto bg-gray-700 text-white px-2 py-1 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default CarouselComponent;
