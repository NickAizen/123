import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ logoUrl }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Serviços", href: "#features" },
    { name: "Planos", href: "#pricing" },
    { name: "Monte seu Pacote", href: "#custom-package" },
    { name: "Depoimentos", href: "#testimonials" },
    { name: "Contato", href: "#contact" },
  ];

  const handleWhatsAppContact = (message) => {
    const whatsappNumber = "5592981786614";
    const fullMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${fullMessage}`, "_blank");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-lg border-b border-gray-700/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="#" className="flex items-center space-x-2">
            <img src={logoUrl} alt="Aizen Agência Logo" className="h-10 md:h-12" />
          </a>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-orange-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <Button 
              size="sm" 
              className="gradient-bg text-white font-semibold shadow-md hover:shadow-orange-500/40"
              onClick={() => handleWhatsAppContact("Olá, vim do site www.aizenagencia.com.br, e gostaria de marcar uma reunião com vocês")}
            >
              Agendar Reunião
            </Button>
          </div>

          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              className="text-gray-300 hover:bg-orange-500/10 hover:text-orange-300"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-background/95 backdrop-blur-md border-b border-gray-700/50"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-2 px-3 rounded-md text-base font-medium text-gray-200 hover:bg-orange-500/10 hover:text-orange-300 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-700/50">
                <Button 
                  className="w-full gradient-bg text-white font-semibold"
                  onClick={() => {
                    handleWhatsAppContact("Olá, vim do site www.aizenagencia.com.br, e gostaria de marcar uma reunião com vocês");
                    setMobileMenuOpen(false);
                  }}
                >
                  Agendar Reunião
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;