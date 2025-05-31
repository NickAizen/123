import React from "react";
import { motion } from "framer-motion";
import { Target, Smartphone, TrendingUp, Users, Palette, Sparkles as SparklesIcon } from 'lucide-react';

const features = [
  {
    icon: <Target className="h-10 w-10 text-orange-400" />,
    title: "Estratégia de Conteúdo Personalizada",
    description:
      "Elaboramos um plano de estratégia de conteúdo completo e sob medida para seu público-alvo, garantindo engajamento e conversões.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-orange-400" />,
    title: "Produção de Vídeos Mobile de Alto Impacto",
    description:
      "Criamos vídeos que capturam a atenção, desde curtas para redes sociais até produções institucionais completas.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-orange-400" />,
    title: "Gestão de Tráfego Pago (Ads)",
    description:
      "Otimizamos seus investimentos em anúncios online no Meta para alcançar o público certo e maximizar o seus lucros.",
  },
  {
    icon: <Users className="h-10 w-10 text-orange-400" />,
    title: "Gerenciamento de Redes Sociais",
    description:
      "Construímos e gerenciamos sua presença online, criando comunidades engajadas e fortalecendo sua marca.",
  },
  {
    icon: <Palette className="h-10 w-10 text-orange-400" />,
    title: "Design Gráfico e Digital",
    description:
      "Elaboramos peças de design para você estabelecer sua identidade visual de forma marcante e profissional.",
  },
  {
    icon: <SparklesIcon className="h-10 w-10 text-orange-400" />,
    title: "Identidade Visual Completa",
    description:
      "Criamos identidades visuais completas que traduzem os valores, a personalidade e o propósito da sua marca.",
  },
];

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <section id="features" className="py-20 dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">
            Nossos Serviços para <span className="gradient-text">Impulsionar Sua Marca</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Soluções completas de marketing digital para transformar sua presença online e alcançar resultados extraordinários.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glassmorphism glassmorphism-hover rounded-xl p-6 shadow-lg flex flex-col"
            >
              <div className="mb-5 rounded-lg w-16 h-16 flex items-center justify-center bg-orange-500/10 border border-orange-500/20">
                {React.cloneElement(feature.icon, { className: "h-8 w-8 text-orange-400" })}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">{feature.title}</h3>
              <p className="text-muted-foreground flex-grow">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;