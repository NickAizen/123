import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageCircle, BarChart2, Target, Zap, TrendingUp } from "lucide-react";
import { TypeAnimation } from "@/components/TypeAnimation";

const Hero = ({ logoUrl }) => {
  const heroRef = useRef(null);
  const [isGlowActive, setIsGlowActive] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const handleMouseMove = (e) => {
      if (window.matchMedia("(hover: none) or (pointer: coarse)").matches) return;
      const rect = heroElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroElement.style.setProperty("--mouse-x", `${x}px`);
      heroElement.style.setProperty("--mouse-y", `${y}px`);
    };
    
    const handleMouseEnter = () => setIsGlowActive(true);
    const handleMouseLeave = () => setIsGlowActive(false);

    heroElement.addEventListener("mousemove", handleMouseMove);
    heroElement.addEventListener("mouseenter", handleMouseEnter);
    heroElement.addEventListener("mouseleave", handleMouseLeave);
    
    if (window.matchMedia("(hover: none) or (pointer: coarse)").matches) {
      setIsGlowActive(true); 
    }

    return () => {
      heroElement.removeEventListener("mousemove", handleMouseMove);
      heroElement.removeEventListener("mouseenter", handleMouseEnter);
      heroElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleContactClick = () => {
    const whatsappNumber = "5592981786614";
    const message = encodeURIComponent("Olá, vim do site www.aizenagencia.com.br, e gostaria de marcar uma reunião com vocês");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const marketingElements = [
    { icon: <BarChart2 className="h-8 w-8 text-orange-400" />, delay: 0.2, x: -50, y: -30, r: 10 },
    { icon: <Target className="h-10 w-10 text-orange-500" />, delay: 0.4, x: 50, y: -40, r: -15 },
    { icon: <Zap className="h-12 w-12 text-amber-500" />, delay: 0.6, x: -60, y: 40, r: 20 },
    { icon: <TrendingUp className="h-9 w-9 text-orange-600" />, delay: 0.8, x: 70, y: 30, r: -5 },
  ];

  return (
    <section ref={heroRef} className="relative overflow-hidden py-20 md:py-28 dark-bg min-h-screen flex flex-col justify-center">
      <div className={`interactive-neon-glow ${isGlowActive ? 'active' : ''}`} />
      
      <div className="absolute inset-0 z-0">
        {marketingElements.map((el, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.5 }}
            animate={{ opacity: 0.15, x: el.x, y: el.y, rotate: el.r, scale: 1 }}
            transition={{ duration: 1.5, delay: el.delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            className="absolute"
            style={{ 
              top: `${Math.random() * 80 + 10}%`, 
              left: `${Math.random() * 80 + 10}%`,
            }}
          >
            {React.cloneElement(el.icon, { 
              className: `${el.icon.props.className} opacity-70 animate-pulse-glow`
            })}
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center mb-10 lg:hidden"> 
          <img src={logoUrl} alt="Aizen Agência Logo" className="h-16 md:h-20" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="mb-8 font-extrabold tracking-tight text-gray-100 text-3xl md:text-4xl lg:text-5xl">
              A sua agência 360° de <TypeAnimation
                sequence={[
                  'resultados', 3000,
                  'inovação', 3000,
                  'crescimento', 3000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                speed={50}
                style={{ display: 'inline-block' }}
                className="gradient-text" 
              />
            </h1>
            
            <p className="mb-10 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Transformamos ideias em impacto digital. Estratégias completas para sua marca decolar no universo online.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12"
          >
            <div 
              className="relative mx-auto max-w-2xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-orange-500/30 cursor-pointer group bg-black"
              onClick={() => setShowVideo(true)}
            >
              {!showVideo ? (
                <>
                  <img-replace 
                    alt="Placeholder para vídeo do YouTube sobre marketing digital da Aizen Agência"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <PlayCircle className="h-20 w-20 text-white/80 group-hover:text-white transition-colors" />
                  </div>
                </>
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0" 
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <Button 
              size="lg" 
              className="mt-10 gradient-bg text-white font-semibold shadow-lg hover:shadow-orange-500/50 transition-all duration-300 group"
              onClick={handleContactClick}
            >
              Entrar em contato com a Aizen <MessageCircle className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PlayCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.855 3.29-1.126-.562L8.5 12l5.642-3.172.882.494z" clipRule="evenodd" />
  </svg>
);


export default Hero;