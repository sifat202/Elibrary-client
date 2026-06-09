// src/Components/HomeBanner.jsx
import React from 'react';
import img1 from '../assets/HomeBanner/Gemini_Generated_Image_33jtke33jtke33jt.png';
import img2 from '../assets/HomeBanner/Gemini_Generated_Image_d5xsvwd5xsvwd5xs.png';
import img3 from '../assets/HomeBanner/Gemini_Generated_Image_djcxmvdjcxmvdjcx.png';
import img4 from '../assets/HomeBanner/Gemini_Generated_Image_gtej2rgtej2rgtej.png';
import img5 from '../assets/HomeBanner/Gemini_Generated_Image_tanpchtanpchtanp.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules'; 

import 'swiper/css';
import 'swiper/css/navigation';

const HomeBanner = () => {
    const bannerImages = [
        { src: img1, alt: "Banner 1" },
        { src: img2, alt: "Banner 2" },
        { src: img3, alt: "Banner 3" },
        { src: img4, alt: "Banner 4" },
        { src: img5, alt: "Banner 5" },
    ];

    return (
        <Swiper 
            navigation={false} 
            pagination={false} 
            loop={true} 
            autoplay={{ 
                delay: 2000, 
                disableOnInteraction: false, 
            }}
            modules={[Navigation, Autoplay]} 
            /* max-w-[1200px]: Keeps it at exactly 1200px max on desktop screens */
            /* mx-auto: Centers the entire swiper container when the screen is wider than 1200px */
            className="mySwiper w-full max-w-[900px] max-h-[400px] mx-auto  h-[220px] sm:h-[320px] md:h-[400px] lg:h-[450px] rounded-xl overflow-hidden shadow-md my-4"
        >
            {bannerImages.map((image, index) => (
                <SwiperSlide key={index}>
                    <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover object-center block" 
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default HomeBanner;