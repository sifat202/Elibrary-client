import React, { useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay,  } from 'swiper/modules';
import AOS from 'aos';

// Import Swiper styles
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination'; // Only if you are using the default bullet pagination dots
import 'aos/dist/aos.css';

// Import Icons
import { 
  FaBookOpen, FaUpload, FaHandHoldingHeart, FaEnvelope, 
  FaTrashAlt, FaUsers, FaArrowRight, FaCheckCircle, 
  FaPaperPlane, FaUserShield, FaExclamationTriangle, FaInfoCircle
} from 'react-icons/fa';

const Tutorial = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const marqueeKeywords = [
    "Seamless Book Swapping", "Automated Notifications", "Community Library", 
    "Zero Financial Cost", "Infinite Knowledge Pipeline", "Interactive Dashboard",
    "Real-time Expiry Trackers", "Secure Lending Channels"
  ];

  const emailLogs = [
    {
      role: "Lender Notification",
      subject: "📖 Your book \"The Great Gatsby\" has been borrowed",
      body: "Hey there! Your book has been borrowed by another user. They are expected to return it by the specified due date. You'll receive another automated alert once the lending cycle closes.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      role: "Borrower Invoice",
      subject: "✅ You borrowed \"The Great Gatsby\" — return details",
      body: "Hi reader! You have successfully borrowed this item. Please ensure you return it on time. Keeping books past their expiration is unfair to lenders who trusted you with them!",
      color: "from-blue-500 to-indigo-600"
    },
    {
      role: "System Expiry Warning",
      subject: "⏰ Lending period ended — Action Required",
      body: "Time's up! The allocation window has run out. Borrowers are instructed to match back with the lender immediately. Public integrity is what keeps our E-Library thriving.",
      color: "from-rose-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      
      {/* ─── SCROLLING BANNER KEYWORDS (React Fast Marquee) ─── */}
      {/* * <div className="bg-slate-900 text-slate-400 text-xs font-semibold tracking-widest py-3 uppercase border-b border-slate-800">
        <Marquee gradient={false} speed={40}>
          {marqueeKeywords.map((word, idx) => (
            <span key={idx} className="mx-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {word}
            </span>
          ))}
        </Marquee>
      </div>  */}

      {/* ─── HERO SECTION (The Big Flex Speech) ─── */}
      <section className="relative py-20 px-4 max-w-5xl mx-auto text-center" data-aos="zoom-in">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-xs">
          <FaBookOpen /> Empowering Shared Intelligence
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6">
          Any Book, Anytime. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
            We've Got You Covered.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
          Welcome to the ultimate mutual knowledge framework. Our platform isn't just a database; 
          it's an active community engine. Whether you are hunting for a rare engineering manuscript, 
          a classic fiction text, or looking to lend your own physical volumes to deep-thinking peers, 
          <strong> our automated platform clears the path.</strong> No paywalls, no barriers—just pure, 
          unadulterated sharing power supported by real-time notification handshakes.
        </p>
      </section>

      {/* ─── STEP 1 & 2 PIPELINE (Responsive Aesthetic Layout) ─── */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-stretch">
        
        {/* HOW TO UPLOAD A BOOK */}
        <div 
          className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 flex flex-col justify-between transition-all hover:border-emerald-300"
          data-aos="fade-right"
        >
          <div>
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 border border-emerald-100">
              <FaUpload />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Step 1: Outlining & Uploading Your Collection
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Ready to enrich the library ecosystem? Navigating to the submission interface allows you to introduce your book logs to thousands of active seekers instantly.
            </p>
            
            <ul className="space-y-3.5 text-sm font-medium text-slate-700">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0" />
                <span>Provide a clean thumbnail cover image via a persistent public web URL.</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0" />
                <span>Specify the correct metadata parameters (Author details, brief overview descriptions).</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0" />
                <span>Your administrative account token ties you automatically as the proud original supplier!</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 -mx-8 -mb-8 p-8 rounded-b-3xl flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-700"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Status set to "Available" by default</span>
            <span>Takes &lt; 1 minute</span>
          </div>
        </div>

        {/* HOW TO LEND/BORROW A BOOK */}
        <div 
          className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 flex flex-col justify-between transition-all hover:border-teal-300"
          data-aos="fade-left"
        >
          <div>
            <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 border border-teal-100">
              <FaHandHoldingHeart />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Step 2: How Peers Request & Borrow From You
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              When an outside explorer lands on your item's dedicated detail screen, they trigger our precision borrowing transaction flow.
            </p>
            
            <ul className="space-y-3.5 text-sm font-medium text-slate-700">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-teal-500 mt-0.5 shrink-0" />
                <span>Borrowers select their desired tracking timeline in Days, Hours, and Minutes.</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-teal-500 mt-0.5 shrink-0" />
                <span>Upon submittal, the catalog state changes from <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded font-bold">available</span> to <span className="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded font-bold">unavailable</span> globally.</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-teal-500 mt-0.5 shrink-0" />
                <span>The request links their user context profile directly onto your custom tracking records.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 -mx-8 -mb-8 p-8 rounded-b-3xl flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5 text-teal-700">Locks other users out instantly</span>
            <span>Live Aggregation</span>
          </div>
        </div>

      </section>

      {/* ─── TRANSACTING COMMUNICATIONS (Swiper.js Carousel Showcase) ─── */}
      <section className="bg-slate-900 text-white py-20 my-12" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4 text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <FaEnvelope className="text-sky-400" /> Automated SMTP Email Framework
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Full-Spectrum Email Dispatches
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            No guessing games. Our internal NodeMailer communication bridge acts as an un-biased bookkeeper, emailing both parties relevant tracking milestones immediately.
          </p>
        </div>

        {/* SWIPER COMPONENT */}
        <div className="max-w-2xl mx-auto px-4">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="pb-14"
          >
            {emailLogs.map((mail, index) => (
              <SwiperSlide key={index}>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Pseudo Mail Header */}
                  <div className={`bg-gradient-to-r ${mail.color} px-6 py-4 flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-white/40"></div>
                      <span className="text-xs font-bold uppercase tracking-wider text-white/90">{mail.role}</span>
                    </div>
                    <span className="text-[11px] font-mono opacity-75">Noreply@elibrary.com</span>
                  </div>
                  
                  {/* Pseudo Mail Content */}
                  <div className="p-6 font-sans text-left">
                    <div className="mb-4 pb-3 border-b border-slate-700/60">
                      <span className="text-slate-400 text-xs block mb-1 font-semibold uppercase">Subject Line:</span>
                      <h4 className="text-slate-100 font-bold text-base md:text-lg">{mail.subject}</h4>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs block mb-1 font-semibold uppercase">Message Payload:</span>
                      <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-700/40">
                        {mail.body}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ─── MANAGE BOOKS DASHBOARD OVERVIEW (End Section Summary) ─── */}
      <section className="max-w-4xl mx-auto px-4 py-16 mb-12 text-center" data-aos="zoom-in-up">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 text-emerald-400 border border-slate-700">
            <FaUserShield />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
            Ultimate Administrative Autonomy
          </h2>
          
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Ownership remains absolute. By jumping over to your **Manage Books** page layout, you unlock real-time tracking diagnostics. View exactly who has your physical materials alongside their target email identifiers instantly. 
            Should your goals change, you can instantly terminate and remove any listing with a single action—granted it is not out on active loan.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex gap-3 items-start">
              <FaUsers className="text-sky-400 text-lg mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-200">Borrower Analytics</h4>
                <p className="text-xs text-slate-400 mt-1">Readily check target borrower emails and metadata tags attached to active loans.</p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex gap-3 items-start">
              <FaTrashAlt className="text-rose-400 text-lg mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-200">Instant Listing Drops</h4>
                <p className="text-xs text-slate-400 mt-1">Delete records cleanly when you no longer desire to maintain public circulation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MINI FOOTER NOTE ─── */}
      <footer className="text-center text-xs text-slate-400 pb-12 font-medium flex items-center justify-center gap-1.5">
        <FaInfoCircle className="text-slate-300" /> Interactive E-Library Navigation Documentation Manual Pipeline.
      </footer>

    </div>
  );
};

export default Tutorial;