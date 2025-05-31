import React, { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";

const Footer = ({ logoUrl }) => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const [isGlowActive, setIsGlowActive] = useState(false);

  useEffect(() => {
    const footerElement = footerRef.current;
    if (!footerElement) return;

    const handleMouseMove = (e) => {
      if (window.matchMedia("(hover: none) or (pointer: coarse)").matches) return;
      const rect = footerElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      footerElement.style.setProperty("--mouse-x", `${x}px`);
      footerElement.style.setProperty("--mouse-y", `${y}px`);
    };
    
    const handleMouseEnter = () => setIsGlowActive(true);
    const handleMouseLeave = () => setIsGlowActive(false);

    footerElement.addEventListener("mousemove", handleMouseMove);
    footerElement.addEventListener("mouseenter", handleMouseEnter);
    footerElement.addEventListener("mouseleave", handleMouseLeave);

    if (window.matchMedia("(hover: none) or (pointer: coarse)").matches) {
      setIsGlowActive(true); 
    }

    return () => {
      footerElement.removeEventListener("mousemove", handleMouseMove);
      footerElement.removeEventListener("mouseenter", handleMouseEnter);
      footerElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  
  return (
    <footer ref={footerRef} className="relative dark-bg border-t border-gray-700/50 overflow-hidden">
      <div className={`interactive-neon-glow ${isGlowActive ? 'active' : ''}`} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <a href="#" className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <img src={logoUrl} alt="Aizen Agência Logo" className="h-10" />
            </a>
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} Aizen Agência. Todos os direitos reservados.
            </p>
          </div>

          <div className="text-xs text-muted-foreground">
             Aizen Agência - Sua agência 360° de <span className="gradient-text font-semibold">resultados</span>
          </div>

          <div>
            <a
              href="http://instagram.com/aizenagencia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Aizen Agência"
              className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group"
            >
              <Instagram className="h-6 w-6 mr-1.5 group-hover:scale-110 transition-transform" />
              <span className="text-sm">@aizenagencia</span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;