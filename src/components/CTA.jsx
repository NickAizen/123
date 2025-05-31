import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CalendarDays, MessageSquare } from "lucide-react";

const CTA = () => {
  const whatsappNumber = "5592981786614";
  const meetingMessage = encodeURIComponent("Olá, vim do site www.aizenagencia.com.br, e gostaria de marcar uma reunião com vocês");

  const handleScheduleMeeting = () => {
    window.open("https://calendar.app.google/5rrt8J3FPdKF31Ve9", "_blank");
  };

  const handleWhatsAppContact = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${meetingMessage}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl p-8 md:p-12 lg:p-16 bg-card/5 backdrop-blur-sm border border-orange-500/20 shadow-2xl"
        >
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl opacity-50 animate-pulse animation-delay-2000" />
          
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100">
              Pronto para <span className="gradient-text">Alavancar</span> sua Marca?
            </h2>
            <p className="text-lg md:text-xl mb-10 text-gray-300">
              Vamos conversar sobre suas metas e como nossas estratégias de marketing digital podem transformar seu negócio. Agende uma consultoria gratuita!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="gradient-bg text-white font-semibold shadow-lg hover:shadow-orange-500/50 transition-all duration-300 group"
                onClick={handleScheduleMeeting}
              >
                Agendar Reunião <CalendarDays className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold text-gray-200 border-gray-600 hover:bg-orange-500/10 hover:text-orange-300 hover:border-orange-500/50 group"
                onClick={handleWhatsAppContact}
              >
                 <MessageSquare className="mr-2 h-5 w-5 group-hover:text-orange-400 transition-colors"/> Fale Conosco
              </Button>
            </div>
            <p className="mt-8 text-sm text-gray-400">
              Sem compromisso. Apenas ideias e estratégias para seu sucesso.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;