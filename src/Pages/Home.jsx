import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importing styles locally if preferred
import HomeBanner from '../Components/HomeBanner';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true,     // Whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <div className="min-h-screen bg-base-100 overflow-x-hidden">
      
      {/* 🌟 New Welcome Section (Hero) */}
      <section 
        className="pt-7  px-4 max-w-6xl mx-auto text-center"
        data-aos="fade-down"
      >
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 pb-2 text-transparent bg-clip-text bg-linear-to-r from-[#00A3E0] via-[#7030A0] to-[#E6007E]">
  Welcome to ELibrary
</h1>
        <p className="text-lg md:text-xl text-base-content/80 max-w-2xl mx-auto mb-6">
          Your ultimate digital gateway to knowledge. Borrow, explore, and dive into 
          thousands of academic and creative books instantly.
        </p>
       
      </section>

      {/* 🖼️ Banner Section */}
      <div 
        className="m-2 max-w-7xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <HomeBanner />
      </div>

    </div>
  );
};

export default Home;