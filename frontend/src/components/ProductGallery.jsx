"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import { useState } from "react";
import "swiper/css";
import "swiper/css/thumbs";

export const ProductGallery = ({ image }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Sample: replicate main image for thumbnails (can be real gallery in future)
  const images = Array(4).fill(image);

  return (
    <div>
      <Swiper
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
        className="mb-4"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Product ${index}`}
              className="rounded-lg object-cover w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        modules={[Thumbs]}
        watchSlidesProgress
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Thumb ${index}`}
              className="rounded-md cursor-pointer border"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
