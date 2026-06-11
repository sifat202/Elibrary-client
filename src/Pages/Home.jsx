import React, { useEffect } from 'react';
import { Link } from 'react-router'; // Imported for routing
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import HomeBanner from '../Components/HomeBanner';

// Image Imports
import imgZia1 from '../../src/assets/zia/2408371.webp';
import imgZia2 from '../../src/assets/zia/2601586.webp';
import imgZia3 from '../../src/assets/zia/409EAEF9FD3A9BEDE704D9923C59A08969FA6675.jpg';
import imgZia4 from '../../src/assets/zia/Akjon_Rastronayok_Ziaur_Rahman-Abdus_Salam-ce496-459263.jpg';
import imgZia5 from '../../src/assets/zia/aman.png';
import imgZia6 from '../../src/assets/zia/Scan_20250312-3-250x389.jpg';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,    
    });
  }, []);

  const images = [imgZia1, imgZia2, imgZia3, imgZia4, imgZia5, imgZia6];

  return (
    <div className="min-h-screen bg-base-100 overflow-x-hidden">
      <section 
        className="pt-5 my-4 px-4 max-w-6xl mx-auto text-center"
        data-aos="fade-down"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 pb-1 text-transparent bg-clip-text bg-linear-to-r from-[#00A3E0] via-[#7030A0] to-[#E6007E]">
          Welcome to ELibrary
        </h1>
</section>
       <div 
        className="mt-4 mb-2 mx-auto max-w-5xl overflow-hidden pointer-events-none [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="flex w-max gap-8 animate-marquee hover:[animation-play-state:paused]">
          
          {/* First set of images */}
          <div className="flex gap-8 shrink-0">
            {images.map((img, index) => (
              <img 
                key={`set1-${index}`} 
                src={img} 
                alt={`Book Cover ${index + 1}`} 
                className="h-48 w-36 object-cover rounded-lg shadow-md border border-base-300"
              />
            ))}
          </div>

          {/* Duplicated set to create the seamless infinite loop illusion */}
          <div className="flex gap-8 shrink-0" aria-hidden="true">
            {images.map((img, index) => (
              <img 
                key={`set2-${index}`} 
                src={img} 
                alt={`Book Cover Duplicated ${index + 1}`} 
                className="h-48 w-36 object-cover rounded-lg shadow-md border border-base-300"
              />
            ))}
          </div>

        </div>
      </div>
      {/* 🌟 Welcome Section */}
      <section 
        className="pt-5 px-4 max-w-6xl mx-auto text-center"
        data-aos="fade-down"
      >
        
        <p className="text-[15px] md:text-xl text-base-content/80 max-w-2xl mx-auto mb-2">
          Your ultimate digital gateway to knowledge. Borrow, explore, and dive into 
          thousands of academic and creative books instantly.
        </p>
      </section>

      {/* 🖼️ Banner Section */}
      <div 
        className="my-2 max-w-7xl mx-auto px-2"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <HomeBanner />
        <div className="my-3 mx-auto max-w-80">
           <Link 
          to="/books" 
          className="relative group flex items-center justify-center w-full py-2.5 px-6 text-white font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg overflow-hidden"
        >
          {/* BD Flag inspired linear gradient backdrop */}
          <div className="absolute inset-0 bg-linear-to-r from-[#006A4E] via-[#006A4E] to-[#F42A41] transition-transform duration-500 group-hover:scale-105" />
          
          {/* Subtle glossy overlay */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <span className="relative flex items-center gap-2 text-[15px] tracking-wide">
            View Available Books
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </Link>
        </div>
      </div>

      {/* 🇧🇩 BD Flag Themed Action Button (With tighter margins) */}
      {/* <div 
        className="mt-4 mb-2 max-w-md mx-auto px-4"
        data-aos="fade-up"
        data-aos-delay="300"
      >
       
      </div> */}

      {/* 🔄 Infinite Flowing Loop Section (Brought closer to the button) */}
     

    </div>
  );
};

export default Home;