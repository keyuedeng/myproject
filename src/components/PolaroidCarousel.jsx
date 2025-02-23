import React, { useState } from 'react';

const PolaroidCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Replace these with your actual image paths
  const images = [
    'images/image1.jpg',   // Update with your image paths
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg',
    'images/image5.jpg'
  ];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-[400px] flex items-center justify-center">
      {/* Navigation buttons */}
      <button 
        onClick={prevImage}
        className="absolute left-0 z-50 px-4 py-2 text-pink-400 text-2xl hover:text-pink-600"
      >
        ←
      </button>
      <button 
        onClick={nextImage}
        className="absolute right-0 z-50 px-4 py-2 text-pink-400 text-2xl hover:text-pink-600"
      >
        →
      </button>

      {/* Polaroid stack */}
      <div className="relative w-[280px] h-[350px]">
        {images.map((img, index) => {
          // Calculate the position in relation to current index
          const position = (index - currentIndex + images.length) % images.length;
          
          // Calculate the offset and rotation for stacked effect
          let transform = '';
          let zIndex = 0;
          
          if (position === 0) {
            // Current image
            transform = 'translate(0, 0) rotate(0deg)';
            zIndex = 5;
          } else if (position === 1) {
            // Next image
            transform = 'translate(20px, 10px) rotate(5deg)';
            zIndex = 4;
          } else if (position === images.length - 1) {
            // Previous image
            transform = 'translate(-20px, 10px) rotate(-5deg)';
            zIndex = 4;
          } else {
            // Other images
            transform = `translate(${position % 2 ? 30 : -30}px, ${20 * Math.min(position, 3)}px) rotate(${position % 2 ? 8 : -8}deg)`;
            zIndex = 3;
          }

          return (
            <div
              key={index}
              className="absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out"
              style={{
                transform,
                zIndex
              }}
            >
              {/* Polaroid frame */}
              <div className="w-full h-full bg-white p-3 shadow-lg">
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[240px] object-cover mb-3"
                />
                <div className="text-center text-gray-600 font-handwriting">
                  Photo {index + 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PolaroidCarousel;