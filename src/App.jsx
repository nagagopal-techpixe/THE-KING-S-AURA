import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroVideo from "./assets/Herovideo.mp4"
import Homeclassic from "./assets/images/6.png"
import  HeroPREMIUM from "./assets/images/5.png"
import HomePrinted from "./assets/images/7.png"
import HomeEXCLUSIVE from "./assets/images/8.png"
import royal from "./assets/royal.jpeg"

import p1 from "./assets/images/1.jpg"
import p2 from "./assets/images/2.jpg"
import p3 from "./assets/images/3.jpg"
import p4 from "./assets/images/4.jpg"
import p9 from "./assets/images/9.png"
import p10 from "./assets/images/10.png"
import p11 from "./assets/images/11.png"
import p12 from "./assets/images/12.png"
import p13 from "./assets/images/13.png"
import p14 from "./assets/images/14.png"

import Logo from "./assets/logo.png"
import star from "./assets/star.jpeg"
import mainlogo from "./assets/main4.png"
import { 
  Menu, 
  X, 
  ChevronRight, 
  Shield, 
  Award, 
  Crown,
  History,
  MapPin,
  Sparkles,
  Mail,
  User,
  MessageSquare
} from 'lucide-react';

/**
 * THE KING'S AURA - LUXURY ARTIFACT
 * Optimized for stability in the preview environment.
 * Fixed "t is not a function" error by ensuring libraries are fully loaded 
 * and using safer animation initialization patterns.
 */

// --- STYLING CONSTANTS ---
const COLORS = {
  gold: '#D4AF37', 
  goldLight: '#F9E4B7',
  charcoal: '#0D0D0D',
  deepBlack: '#050505',
};

const FONTS = {
  heading: "'Oswald', sans-serif",
  body: "'Inter', sans-serif",
};

const ASSETS = {
  heroVideo: HeroVideo,
  heroPoster: "https://images.unsplash.com/photo-1617130863154-964ff3e44584?auto=format&fit=crop&q=80&w=2000",
  abstract: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1600",
  classic: Homeclassic,
  premium: HeroPREMIUM,
  printed: HomePrinted,
  exclusive: HomeEXCLUSIVE,
  heritage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
  fabric: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=2000",
};

// --- HELPER: ROBUST SCRIPT LOADER ---
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(script);
  });
};

// --- REUSABLE BRAND COMPONENTS ---

const Emblem = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5L60 35H90L65 55L75 85L50 65L25 85L35 55L10 35H40L50 5Z" stroke={COLORS.gold} strokeWidth="1" />
    <circle cx="50" cy="52" r="40" stroke={COLORS.gold} strokeWidth="0.5" strokeDasharray="2 4" />
    <path d="M30 52H70M50 32V72" stroke={COLORS.gold} strokeWidth="0.5" opacity="0.5" />
  </svg>
); 


const RegalFrame = ({ children, className = "" }) => (
  <div className={`relative p-4 ${className}`}>
    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]" />
    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#D4AF37]" />
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#D4AF37]" />
    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37]" />
    {children}
  </div>
);

const FadeIn = ({ children, delay = 0, className = "", direction = "up" }) => {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- FORM COMPONENTS ---

const GoldInput = ({ label, type = "text", placeholder = " ", textarea = false }) => (
  <div className="group relative z-0 w-full mb-8">
    {textarea ? (
      <textarea
        placeholder={placeholder}
        rows="4"
        className="peer block w-full appearance-none bg-transparent border-b border-[#D4AF37]/30 py-2.5 px-0 text-sm text-white focus:border-[#D4AF37] focus:outline-none focus:ring-0 transition-colors"
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        className="peer block w-full appearance-none bg-transparent border-b border-[#D4AF37]/30 py-2.5 px-0 text-sm text-white focus:border-[#D4AF37] focus:outline-none focus:ring-0 transition-colors"
      />
    )}
    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/60 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#D4AF37]">
      {label}
    </label>
  </div>
);

// --- INTEGRATED HERO SCROLL VIDEO COMPONENT ---
const HeroScrollVideo = ({
  title,
  subtitle,
  meta,
  media,
  poster,
  mediaType = "video",
  overlay,
  initialBoxSize = 360,
  targetSize = "fullscreen",
  scrollHeightVh = 280,
  showHeroExitAnimation = true,
  sticky = true,
  overlayBlur = 15,
}) => {
  const rootRef = useRef(null);
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const overlayRef = useRef(null);
  const overlayCaptionRef = useRef(null);
  const overlayContentRef = useRef(null);
  const [libReady, setLibReady] = useState(false);

  const cssVars = useMemo(() => ({
    "--initial-size": `${initialBoxSize}px`,
    "--overlay-blur": `${overlayBlur}px`,
  }), [initialBoxSize, overlayBlur]);

  useEffect(() => {
    let mounted = true;
    const initLibraries = async () => {
      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");
        await loadScript("https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js");
        
        if (mounted && window.gsap && window.ScrollTrigger) {
          setLibReady(true);
        }
      } catch (e) {
        console.warn("The King's Aura: Advanced animations disabled due to script load failure.");
      }
    };
    initLibraries();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!libReady || !window.gsap || !window.ScrollTrigger) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const Lenis = window.Lenis;

    if (!gsap.plugins || !gsap.plugins.scrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    let lenisInstance;
    let rafId;

    try {
      if (Lenis) {
        lenisInstance = new Lenis({ 
          duration: 1.2, 
          smoothWheel: true,
        });
        
        const raf = (time) => {
          lenisInstance.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
        lenisInstance.on("scroll", () => {
          ScrollTrigger.update();
        });
      }

      const container = containerRef.current;
      const overlayEl = overlayRef.current;
      const headline = headlineRef.current;

      if (!container || !headline) return;

      if (showHeroExitAnimation) {
        gsap.timeline({
          scrollTrigger: {
            trigger: headline,
            start: "top top",
            end: "top+=400 top",
            scrub: 1,
          },
        }).to(headline.querySelectorAll(".hsv-headline > *"), {
          rotationX: 70,
          y: -50,
          opacity: 0,
          scale: 0.9,
          filter: "blur(10px)",
          stagger: 0.1,
          ease: "power3.inOut",
        });
      }

      const triggerEl = rootRef.current?.querySelector("[data-sticky-scroll]");
      if (triggerEl) {
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        const target = targetSize === "fullscreen" 
          ? { width: "100vw", height: "100vh", borderRadius: 0 } 
          : { width: "92vw", height: "92vh", borderRadius: 20 };

        gsap.set(container, { width: initialBoxSize, height: initialBoxSize, borderRadius: 20 });
        gsap.set(overlayEl, { clipPath: "inset(100% 0 0 0)" });
        gsap.set([overlayContentRef.current, overlayCaptionRef.current], { y: 40, opacity: 0 });

        mainTl
          .to(container, { width: target.width, height: target.height, borderRadius: target.borderRadius, ease: "none" }, 0)
          .to(overlayEl, { clipPath: "inset(0% 0 0 0)", ease: "none" }, 0.35)
          .to(overlayCaptionRef.current, { y: 0, opacity: 1, ease: "power2.out" }, 0.45)
          .to(overlayContentRef.current, { y: 0, opacity: 1, ease: "power2.out" }, 0.5);
      }
    } catch (err) {
      console.error("The King's Aura Engine Error:", err);
    }

    return () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(st => st.kill());
      }
      if (rafId) cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
    };
  }, [libReady, targetSize, initialBoxSize, showHeroExitAnimation]);

  return (
    <div ref={rootRef} className="hsv-root relative w-full" style={{ ...cssVars }}>
      <div className="hsv-container h-screen flex items-center justify-center relative z-20" ref={headlineRef}>
        <div className="hsv-headline text-center px-4 flex flex-col items-center">
          <div className="hsv-emblem-wrapper mb-8 opacity-80">
             <Emblem className="w-14 h-14" />
          </div>
          <h1 className="hsv-title font-bold uppercase tracking-tighter leading-none relative z-10" style={{ fontFamily: FONTS.heading }}>
            <span className="hsv-text-gradient">
              {title}
            </span>
          </h1>
          {subtitle && (
            <div className="hsv-subtitle-wrapper flex items-center gap-6 mt-8">
              <div className="hsv-line-left"></div>
              <h2 className="hsv-subtitle uppercase tracking-[0.4em] md:tracking-[0.6em] font-light text-[#F9E4B7] text-xs md:text-sm" style={{ fontFamily: FONTS.body }}>
                {subtitle}
              </h2>
              <div className="hsv-line-right"></div>
            </div>
          )}
          {meta && (
            <div className="hsv-meta mt-8 flex items-center gap-4 opacity-80">
              <span className="hsv-diamond"></span>
              <span className="hsv-meta-text">{meta}</span>
              <span className="hsv-diamond"></span>
            </div>
          )}
        </div>
      </div>

      <div className="hsv-scroll relative" data-sticky-scroll style={{ height: `${scrollHeightVh}vh` }}>
        <div className={`hsv-sticky top-0 h-screen flex items-center justify-center overflow-hidden ${sticky ? "sticky" : ""}`}>
          <div className="hsv-media relative overflow-hidden bg-black" ref={containerRef}>
            {mediaType === "video" ? (
              <video src={media} poster={poster} muted loop playsInline autoPlay className="w-full h-full object-cover" />
            ) : (
              <img src={media} className="w-full h-full object-cover" alt="" />
            )}

            <div className="hsv-overlay absolute inset-0 flex flex-col items-center justify-center p-8 text-center" ref={overlayRef}>
              <div className="hsv-caption mb-4 text-[#D4AF37] text-[10px] tracking-[0.6em] font-bold uppercase" ref={overlayCaptionRef}>{overlay?.caption}</div>
              <div className="hsv-overlay-content max-w-2xl" ref={overlayContentRef}>
                <h3 className="text-4xl md:text-6xl font-bold uppercase mb-6 text-[#D4AF37]" style={{ fontFamily: FONTS.heading }}>{overlay?.heading}</h3>
                {overlay?.paragraphs?.map((p, i) => <p key={i} className="text-lg opacity-80 mb-4 text-white font-light leading-relaxed">{p}</p>)}
                {overlay?.extra}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hsv-root { background: ${COLORS.deepBlack}; color: #fff; }
        .hsv-container { perspective: 1000px; }
        .hsv-title { 
          font-size: clamp(3rem, 10vw, 10rem); 
          color: #fff; 
        }
        .hsv-text-gradient {
          background: linear-gradient(to bottom, #F9E4B7, #D4AF37, #8C7030);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
        }
        .hsv-line-left, .hsv-line-right {
          height: 1px;
          width: 3rem;
          background: ${COLORS.gold};
        }
        @media (min-width: 768px) {
           .hsv-line-left, .hsv-line-right { width: 6rem; }
        }
        .hsv-line-left { background: linear-gradient(to right, transparent, ${COLORS.gold}); }
        .hsv-line-right { background: linear-gradient(to left, transparent, ${COLORS.gold}); }
        .hsv-meta {
          color: ${COLORS.gold};
          letter-spacing: 0.5em;
          font-size: 10px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .hsv-diamond {
          width: 6px;
          height: 6px;
          background-color: ${COLORS.gold};
          transform: rotate(45deg);
          box-shadow: 0 0 10px ${COLORS.gold};
        }
        .hsv-media { box-shadow: 0 30px 60px rgba(0,0,0,0.8); width: var(--initial-size); height: var(--initial-size); }
        .hsv-overlay { background: rgba(5,5,5,0.7); backdrop-filter: blur(var(--overlay-blur)); z-index: 2; border: 1px solid ${COLORS.gold}33; }
      `}</style>
    </div>
  );
};

// --- MAIN PAGES ---

const HomePage = ({ setPage }) => (
  <div className="bg-[#050505] text-[#F5F5F1]">
    <HeroScrollVideo 
      title="THE KING’S AURA"
      subtitle="SOVEREIGN STANDARD IN TAILORING"
      meta="EST. MCMXCIV"
      media={ASSETS.heroVideo}
      poster={ASSETS.heroPoster}
      overlay={{
        caption: "THE ATELIER PHILOSOPHY",
        heading: "TRUE POWER IS SILENT",
        paragraphs: [
          "We forge the vessels through which a man manifests internal authority.",
          "Legacy is not inherited. It is carried in the way you stand."
        ],
        extra: (
          <button 
            onClick={() => setPage('collections')}
            className="mt-8 px-12 py-4 border border-[#D4AF37] text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
          >
            Explore Wardrobe
          </button>
        )
      }}
    />

    <section className="py-48 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%"><defs><pattern id="regal" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 40L40 0M-10 10L10 -10M30 50L50 30" stroke="#D4AF37" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#regal)"/></svg>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 text-center">
        <FadeIn>
          <Emblem className="w-16 h-16 mx-auto mb-12" />
          <h2 className="text-5xl md:text-8xl uppercase tracking-tighter mb-12 font-bold" style={{ fontFamily: FONTS.heading }}>
            LEGACY IS WRITTEN <br/> IN THE DETAILS.
          </h2>
          <div className="w-[1px] h-24 bg-[#D4AF37] mx-auto mb-12" />
          <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-3xl mx-auto italic" style={{ fontFamily: FONTS.body }}>
            "The atmosphere changes the moment you enter. That is the aura. We provide the structure for that presence."
          </p>
        </FadeIn>
      </div>
    </section>

    <section className="pb-48 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {[
    { id: 'classic', title: 'CLASSIC', mood: 'THE FOUNDATION', img: ASSETS.classic },
    { id: 'premium', title: 'PREMIUM', mood: 'THE ASCENT', img: ASSETS.premium },
    { id: 'printed', title: 'PRINTED', mood: 'THE EXPRESSION', img: ASSETS.printed },
    { id: 'exclusive', title: 'EXCLUSIVE', mood: 'THE APEX', img: ASSETS.exclusive },
  ].map((item, idx) => (
    <FadeIn key={item.id} delay={idx * 0.2} direction="none">
      <RegalFrame>
        <div className="relative aspect-[3/4] overflow-hidden bg-[#111] cursor-pointer" onClick={() => setPage('collections')}>
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5 }}
            src={item.img} 
            className="w-full h-full object-cover opacity-100 grayscale-0 transition-all duration-1000" 
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/40">
            <h3 className="text-4xl text-white uppercase tracking-tighter font-bold" style={{ fontFamily: FONTS.heading }}>{item.title}</h3>
            <div className="h-[1px] w-8 bg-[#D4AF37] my-4" />
            <p className="text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase font-bold">{item.mood}</p>
          </div>
        </div>
      </RegalFrame>
    </FadeIn>
  ))}
</section>
  </div>
);

const CollectionsPage = () => (
  <div className="bg-[#050505] text-[#F5F5F1]">
    <section className="h-[80vh] relative flex items-center justify-center overflow-hidden">
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5 }}
        src={p2} // same background image
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative text-center z-10 px-4">
        <FadeIn>
          <Emblem className="w-214 h-14 mx-auto mb-9" />
        <h1
  className="text-5xl md:text-9xl uppercase tracking-tighter mb-4 font-bold leading-tight"
  style={{ fontFamily: FONTS.heading }}
>
  GALLERY OF COMMAND
</h1>

          <p className="text-xs tracking-[1em] uppercase text-[#D4AF37] font-bold">THE ATELIER COLLECTIONS</p>
        </FadeIn>
      </div>
    </section>

    {[
      { title: "THE CLASSIC REGIMENT", copy: "Structured discipline for the modern leader. Precise, unyielding, and eternal.", img: p9, label: "01" },
      { title: "THE SOVEREIGN SILKS", copy: "Opulence redefined. Fluid textures that command attention without effort.", img: p10, label: "02" },
      { title: "THE NOBLE PRINT", copy: "Bold geometry for those who define their own era.", img: p11, label: "03" },
      { title: "THE APEX RESERVE", copy: "The highest expression of craft. By special invitation only.", img: p12, label: "04" },
    ].map((col, idx) => (
      <section key={idx} className="py-32 md:py-48 px-6 md:px-24 flex flex-col md:flex-row gap-24 items-center border-b border-white/5 last:border-0">
        <div className={`w-full md:w-1/2 ${idx % 2 !== 0 ? 'md:order-2' : ''}`}>
          <RegalFrame>
            <div className="aspect-[4/5] overflow-hidden">
              <img src={col.img} className="w-full h-full object-cover opacity-70" alt={col.title} />
            </div>
          </RegalFrame>
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <FadeIn direction={idx % 2 === 0 ? "left" : "right"}>
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.5em] mb-6">COLLECTION {col.label}</p>
            <h2 className="text-5xl md:text-7xl uppercase tracking-tighter mb-8 font-bold leading-tight" style={{ fontFamily: FONTS.heading }}>{col.title}</h2>
            <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light mb-12 max-w-lg" style={{ fontFamily: FONTS.body }}>{col.copy}</p>
            <button className="group relative px-12 py-4 border border-[#D4AF37] overflow-hidden">
              <span className="relative z-10 text-[#D4AF37] group-hover:text-black transition-colors duration-500 uppercase tracking-[0.3em] text-[10px] font-bold">Inquire of Piece</span>
              <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </FadeIn>
        </div>
      </section>
    ))}
  </div>
);

const HeritagePage = () => (
  <div className="bg-[#050505] text-[#F5F5F1]">
    <section className="h-[80vh] relative flex items-center justify-center overflow-hidden">
      <motion.img 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5 }}
        src={p3} 
        className="absolute inset-0 w-full h-full object-cover opacity-20" 
      />
      <div className="relative text-center z-10 px-4">
        <FadeIn>
          <Emblem className="w-14 h-14 mx-auto mb-1" />
          <h1 className="text-6xl md:text-[10rem] uppercase tracking-tighter mb-4 font-bold leading-none" style={{ fontFamily: FONTS.heading }}>THE BLOODLINE</h1>
          <p className="text-xs tracking-[1em] uppercase text-[#D4AF37] font-bold">LEGACY BEYOND TIME</p>
        </FadeIn>
      </div>
    </section>

    <div className="max-w-4xl mx-auto py-48 px-6 space-y-48">
      {[
        { title: "THE FIRST COMMAND", icon: <Shield size={40} />, copy: "Founded on the principle that armor must be as noble as the man within." },
        { title: "UNYIELDING CRAFT", icon: <Award size={40} />, copy: "Every stitch is an oath. Every pattern is a legacy." },
        { title: "GLOBAL PRESENCE", icon: <MapPin size={40} />, copy: "From the cobblestones of Milan to the glass spires of London." },
      ].map((item, idx) => (
        <FadeIn key={idx} className="text-center group">
          <div className="text-[#D4AF37] mb-8 flex justify-center group-hover:scale-110 transition-transform duration-700">{item.icon}</div>
          <h2 className="text-5xl md:text-8xl uppercase tracking-tighter mb-8 font-bold" style={{ fontFamily: FONTS.heading }}>{item.title}</h2>
          <div className="h-[2px] w-12 bg-[#D4AF37] mx-auto mb-10 group-hover:w-24 transition-all duration-700" />
          <p className="text-xl md:text-2xl font-light opacity-60 leading-relaxed italic max-w-2xl mx-auto" style={{ fontFamily: FONTS.body }}>"{item.copy}"</p>
        </FadeIn>
      ))}
    </div>
  </div>
);

const ConciergePage = () => (
  <div className="bg-[#050505] text-[#F5F5F1] min-h-screen pt-40 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
      <div className="order-2 md:order-1">
        <FadeIn delay={0.2} direction="right">
          <h1 className="text-6xl md:text-8xl uppercase tracking-tighter mb-8 font-bold leading-none text-[#F5F5F1]" style={{ fontFamily: FONTS.heading }}>
            ROYAL <br/> CONCIERGE
          </h1>
          <p className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase mb-16 font-bold">PRIVATE SERVICE FOR THE DISTINGUISHED</p>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <GoldInput label="Full Name" type="text" />
            <GoldInput label="Email Address" type="email" />
            <div className="group relative z-0 w-full mb-8">
              <select className="peer block w-full appearance-none bg-transparent border-b border-[#D4AF37]/30 py-2.5 px-0 text-sm text-white focus:border-[#D4AF37] focus:outline-none focus:ring-0 transition-colors">
                <option className="bg-black">Fit Consultation</option>
                <option className="bg-black">Private Styling</option>
                <option className="bg-black">Order Inquiry</option>
                <option className="bg-black">Other</option>
              </select>
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/60 duration-300">
                Inquiry Type
              </label>
            </div>
            <GoldInput label="Message" textarea />
            
            <button className="group relative px-12 py-5 mt-8 border border-[#D4AF37] overflow-hidden w-full md:w-auto">
              <span className="relative z-10 text-[#D4AF37] group-hover:text-black transition-colors duration-500 uppercase tracking-[0.4em] text-[10px] font-bold">
                Request Audience
              </span>
              <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </form>
        </FadeIn>
      </div>
      
    <div className="order-1 md:order-2 h-[60vh] md:h-auto relative overflow-hidden">
  <RegalFrame className="h-full">
    <img 
      src={royal} 
      className="w-full h-full object-cover opacity-60 transition-all duration-1000" 
      alt="Concierge" 
    />
    <div className="absolute bottom-10 left-10">
      <div className="flex items-center gap-4 text-[#D4AF37] mb-4">
        <Sparkles size={20} />
        <span className="text-xs tracking-[0.3em] uppercase">Private Atelier</span>
      </div>
      <p className="text-white/60 text-sm max-w-xs leading-relaxed">
        "We provide more than garments. We provide the architecture of a king's presence."
      </p>
    </div>
  </RegalFrame>
</div>

    </div>
  </div>
);


const InnerCirclePage = () => (
  <div className="bg-[#050505] text-[#F5F5F1] min-h-screen relative overflow-hidden px-6">
    {/* HERO SECTION WITH HERITAGE BACKGROUND */}
    <section className="h-[80vh] relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5 }}
        src={p1} // Heritage background
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Overlay Text */}
      <div className="relative z-10 text-center px-4">
        <FadeIn>
          <Emblem className="w-14 h-14 mx-auto mb-7 animate-pulse mt-12" />
          <h1
            className="text-6xl md:text-9xl uppercase tracking-tighter mb-6 font-bold leading-none text-[#F5F5F1]"
            style={{ fontFamily: FONTS.heading }}
          >
            THE INNER CIRCLE
          </h1>
          <p className="text-[#D4AF37] text-xs tracking-[0.6em] uppercase mb-16 font-bold">
            ACCESS TO THE EXCEPTIONAL
          </p>
        </FadeIn>
      </div>
    </section>

    {/* CONTENT BELOW HERO */}
    <div className="max-w-2xl w-full relative z-10 mx-auto text-center mt-10">
      <FadeIn>
        <p className="text-white/60 text-lg mb-12 leading-relaxed italic">
          "Membership is not purchased. It is granted to those who understand that true value is found in what is rare."
        </p>

        <form className="max-w-md mx-auto space-y-8 text-left" onSubmit={(e) => e.preventDefault()}>
          <div className="w-full">
            <GoldInput label="Email Address for Consideration" type="email" />
          </div>

          <button className="group relative px-16 py-6 border border-[#D4AF37] overflow-hidden w-full">
            <span className="relative z-10 text-[#D4AF37] group-hover:text-black transition-colors duration-500 uppercase tracking-[0.4em] text-[10px] font-bold">
              Submit Petition
            </span>
            <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </form>

        <p className="mt-8 text-[10px] text-white/30 uppercase tracking-[0.2em]">
          Applications are reviewed weekly.
        </p>
      </FadeIn>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="bg-[#050505] text-[#F5F5F1]">
    {/* Header */}
  <section className="h-[80vh] relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5 }}
        src={p4} // Heritage background
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Overlay Text */}
      <div className="relative z-10 text-center px-4">
        <FadeIn>
          <Emblem className="w-14 h-14 mx-auto mb-7 animate-pulse mt-12" />
          <h1
            className="text-6xl md:text-9xl uppercase tracking-tighter mb-6 font-bold leading-none text-[#F5F5F1]"
            style={{ fontFamily: FONTS.heading }}
          >
             THE CODE
          </h1>
         <p className="text-[10px] tracking-[0.8em] uppercase text-[#D4AF37] font-bold">
          IDENTITY • PRESENCE • PURPOSE
        </p>
        </FadeIn>
      </div>
    </section>

    {/* Belief Section */}
    <section className="py-32 px-6 max-w-4xl mx-auto text-center">
      <FadeIn>
        <h2 className="text-4xl md:text-6xl uppercase tracking-tighter mb-12 font-bold text-[#F5F5F1]" style={{ fontFamily: FONTS.heading }}>
          TRUE STYLE IS NOT TRENDS.<br/>IT IS IDENTITY.
        </h2>
        <div className="w-[1px] h-24 bg-[#D4AF37] mx-auto mb-12" />
        <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
          We design for men who understand the power of presence. Men who lead with quiet confidence, discipline, and purpose. Men whose aura is felt before a single word is spoken.
        </p>
        <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light mt-8">
          Every King’s Aura piece is crafted to project structure, strength, and timeless masculinity. Our designs blend modern tailoring with classic form, creating garments that enhance how a man moves, stands, and is perceived. This is clothing that reinforces self-respect, leadership, and command—naturally and effortlessly.
        </p>
      </FadeIn>
    </section>

    {/* Craftsmanship & Comfort Grid */}
    <section className="py-24 px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-24 items-center">
        {/* Craftsmanship */}
        <div className="order-2 md:order-1">
           <FadeIn direction="right">
             <RegalFrame>
              <div className="aspect-[4/5] overflow-hidden bg-black">
  <img 
    src={p13} 
    className="w-full h-full object-cover opacity-60 transition-all duration-1000" 
    alt="Craftsmanship" 
  />
</div>

             </RegalFrame>
           </FadeIn>
        </div>
        <div className="order-1 md:order-2">
          <FadeIn direction="left">
            <p className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase mb-6 font-bold">UNCOMPROMISING QUALITY</p>
            <h3 className="text-4xl md:text-5xl uppercase tracking-tighter mb-8 font-bold" style={{ fontFamily: FONTS.heading }}>CRAFTSMANSHIP WITH PURPOSE</h3>
            <p className="text-lg text-white/60 leading-relaxed font-light mb-8">
              At King’s Aura, quality is non-negotiable. Each shirt is made using premium cotton blends, clean patterns, and refined detailing. From precise stitching to high-quality embroidery, every element is thoughtfully executed with care and intention.
            </p>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              Our collections balance classic elegance with modern versatility, making them suitable for every environment—professional, social, or personal. These are shirts designed not just to be worn, but to be felt.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-24 items-center mt-32">
        {/* Comfort */}
        <div>
          <FadeIn direction="right">
            <p className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase mb-6 font-bold">ENGINEERED ELEGANCE</p>
            <h3 className="text-4xl md:text-5xl uppercase tracking-tighter mb-8 font-bold" style={{ fontFamily: FONTS.heading }}>DESIGNED FOR COMFORT.<br/>TAILORED FOR PRESENCE.</h3>
            <p className="text-lg text-white/60 leading-relaxed font-light mb-8">
              Every King’s Aura shirt is stretchable, breathable, and textured, ensuring all-day comfort without compromising on sharpness or style. Our tailored fits are designed to deliver a polished, elegant look that adapts seamlessly across seasons and occasions.
            </p>
            <div className="flex items-center gap-4 text-[#D4AF37] italic opacity-80">
              <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
              Where ease meets elegance.
            </div>
          </FadeIn>
        </div>
        <div>
           <FadeIn direction="left">
             <RegalFrame>
                <div className="aspect-[4/5] overflow-hidden bg-black">
  <img 
    src={p14} 
    className="w-full h-full object-cover opacity-60 transition-all duration-1000" 
    alt="Comfort" 
  />
</div>

             </RegalFrame>
           </FadeIn>
        </div>
      </div>
    </section>

    {/* Statement Closing */}
    <section className="py-48 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent pointer-events-none"></div>
        <FadeIn>
          <Emblem className="w-16 h-16 mx-auto mb-12" />
          <h2 className="text-5xl md:text-7xl uppercase tracking-tighter mb-12 font-bold" style={{ fontFamily: FONTS.heading }}>
            MORE THAN CLOTHING.<br/>A STATEMENT.
          </h2>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed italic mb-16">
            "King’s Aura is a statement of class, a reflection of personality, and a symbol of refined royalty. We exist for the man who understands that style should feel as good as it looks."
          </p>
          <p className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase font-bold">
            EXPERIENCE COMFORT WITH A ROYAL TOUCH
          </p>
        </FadeIn>
    </section>
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [page, setPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'collections', label: 'WARDROBE' },
      { id: 'about', label: 'ABOUT' },

    { id: 'heritage', label: 'HERITAGE' },
    { id: 'concierge', label: 'CONCIERGE' },
    { id: 'circle', label: 'INNER CIRCLE' },
  ];
const leftNavItems = navItems.slice(0, 3);
const rightNavItems = navItems.slice(3);

  const handlePageChange = (id) => {
    setPage(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#D4AF37] selection:text-black text-[#F5F5F1]" style={{ fontFamily: FONTS.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Oswald:wght@300;400;500;700&display=swap');
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #D4AF37; }
        
        h1, h2, h3, h4, h5, h6 { font-family: 'Oswald', sans-serif !important; }
      `}</style>

      {/* NAVBAR */}
     <nav
  className={`fixed top-0 left-0 w-full z-[100] transition-all duration-1000 px-6 md:px-12 pointer-events-auto py-1 ${
    isScrolled
      ? 'bg-black/95 py-6 border-b border-[#D4AF37]/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
      : 'bg-transparent'
  }`}
>
  <div className="relative flex items-center justify-center ">
    
    {/* LEFT NAV */}
    <div className="absolute left-0 hidden md:flex gap-12">
      {leftNavItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handlePageChange(item.id)}
          className={`text-[10px] tracking-[0.5em] uppercase font-bold transition-all duration-500 relative group ${
            page === item.id
              ? 'text-[#D4AF37]'
              : 'text-white/60 hover:text-[#D4AF37]'
          }`}
        >
          {item.label}
          <span
            className={`absolute -bottom-2 left-0 w-full h-[1px] bg-[#D4AF37] transition-transform duration-700 origin-left ${
              page === item.id
                ? 'scale-x-100'
                : 'scale-x-0 group-hover:scale-x-100'
            }`}
          />
        </button>
      ))}
    </div>

    {/* CENTER LOGO */}
    <div
      className="cursor-pointer group"
      onClick={() => handlePageChange('home')}
    >
      <img
        src={mainlogo}
        alt="THE KING’S AURA Logo"
        // className="w-40 h-40 md:w-20 md:h-20 object-contain"
        className="w-20 h-20 md:w-32 md:h-32 object-contain"

      />
    </div>

    {/* RIGHT NAV */}
    <div className="absolute right-0 hidden md:flex gap-12">
      {rightNavItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handlePageChange(item.id)}
          className={`text-[10px] tracking-[0.5em] uppercase font-bold transition-all duration-500 relative group ${
            page === item.id
              ? 'text-[#D4AF37]'
              : 'text-white/60 hover:text-[#D4AF37]'
          }`}
        >
          {item.label}
          <span
            className={`absolute -bottom-2 left-0 w-full h-[1px] bg-[#D4AF37] transition-transform duration-700 origin-left ${
              page === item.id
                ? 'scale-x-100'
                : 'scale-x-0 group-hover:scale-x-100'
            }`}
          />
        </button>
      ))}
    </div>
  </div>

  {/* MOBILE MENU BUTTON */}
  <button
    className="md:hidden absolute right-6 top-1/2 -translate-y-1/2 text-[#D4AF37]"
    onClick={() => setIsMenuOpen(!isMenuOpen)}
  >
    {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
  </button>
</nav>


      {/* MOBILE NAV */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-black flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="space-y-12">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`block text-5xl uppercase tracking-tighter font-bold ${page === item.id ? 'text-[#D4AF37]' : 'text-white'}`}
                  style={{ fontFamily: FONTS.heading }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {page === 'home' && <HomePage setPage={handlePageChange} />}
            {page === 'collections' && <CollectionsPage />}
            {page === 'heritage' && <HeritagePage />}
            {page === 'concierge' && <ConciergePage />}
            {page === 'circle' && <InnerCirclePage />}
             {page === 'about' && <AboutPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-black py-32 px-6 border-t border-[#D4AF37]/20 text-center">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <Emblem className="w-10 h-10 mx-auto mt-20" />
            <div className="text-5xl md:text-7xl uppercase tracking-tighter mb-16 font-bold" style={{ fontFamily: FONTS.heading }}>
              THE KING’S AURA
            </div>
            <div className="grid md:grid-cols-3 gap-16 text-[10px] tracking-[0.5em] uppercase font-bold text-white/40 mb-20">
              <div className="flex flex-col gap-4 items-center">
                <MapPin size={16} className="text-[#D4AF37]" />
                LONDON • MILAN • TOKYO
              </div>
              <div className="flex flex-col gap-4 items-center">
                <Sparkles size={16} className="text-[#D4AF37]" />
                PRIVATE ATELIER SERVICE
              </div>
              <div className="flex flex-col gap-4 items-center">
                <History size={16} className="text-[#D4AF37]" />
                SINCE MCMXCIV
              </div>
            </div>
            <div className="h-[1px] w-24 bg-[#D4AF37] mx-auto mb-12" />
            <p className="text-[10px] tracking-[0.6em] uppercase text-[#D4AF37] font-black italic">EXCELLENCE IS NOT OPTIONAL.</p>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}