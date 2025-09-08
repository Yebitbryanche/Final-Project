
import { useState } from 'react'
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";


import image1 from "../assets/images/still-life-wireless-cyberpunk-headphones.jpg"

import image2 from "../assets/images/elegangown2.jpg"
import image3 from "../assets/images/pc.jpg"

const images= [
    image1,
    image2,
    image3,

];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

return (
    <div className="relative  overflow-hidden rounded-lg">
      {/* Images container */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((images, idx) => (
          <img key={idx} src={images} className="w-full h-[600px] object-cover flex-shrink-0" />
        ))}
      </div>

      {/* Controls */}
      <div className="bg-primary/50 absolute rounded-full p-4 left-2 top-1/2 translate-y-1/2">
        <HiChevronLeft
        onClick={prevSlide}
        size={30}
        color='white'
        />
      </div>
        
      <div className="bg-primary/50 absolute rounded-full p-4 right-2 top-1/2 translate-y-1/2">
        <HiChevronRight
        onClick={nextSlide}
        size={30}
        color='white'
        />
      </div>


      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full ${
              current === idx ? "bg-gray-500" : "bg-[var(--color-primary)] "
            }`}
          ></button>
        ))}
      </div>
    </div>
  );


}
  


 