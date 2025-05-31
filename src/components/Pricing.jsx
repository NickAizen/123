import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, CreditCard, Zap as PixIcon } from "lucide-react";
import { motion } from "framer-motion";

const Pricing = () => {
  const [sixMonths, setSixMonths] = useState(false);
  const whatsappNumber = "5592981786614";

  const paymentMethods = [
    { icon: <PixIcon className="h-4 w-4 mr-1.5 text-green-400" />, text: "À vista no PIX" },
    { icon: <PixIcon className="h-4 w-4 mr-1.5 text-sky-400" />, text: "Quinzenalmente no PIX" },
    { icon: <CreditCard className="h-4 w-4 mr-1.5 text-purple-400" />, text: "Cartão de Crédito / Link" },
  ];

  const plans = [
    {
      id: "basico",
      name: "Básico",
      description: "Ideal para quem está começando a estruturar sua presença digital.",
      priceMonthly: "R$2.500",
      priceSixMonths: "R$2.250", 
      features: [
        "Gerenciamento de Redes Sociais",
        "Roteirização de vídeos",
        "Criação de 04 posts / mês",
        "04 vídeos para reels",
        "Gestor de tráfego",
        "Análise de Métricas",
      ],
      cta: "Quero o Plano Básico",
      popular: false,
    },
    {
      id: "intermediario",
      name: "Intermediário",
      description: "Para negócios que buscam acelerar o crescimento e engajamento.",
      priceMonthly: "R$3.800",
      priceSixMonths: "R$3.420",
      features: [
        "Gerenciamento de Redes Sociais",
        "Roteirização de vídeos",
        "Criação de 06 posts / mês",
        "06 vídeos com imagem aérea / mês",
        "Gestor de tráfego",
        "Análise de Métricas",
      ],
      cta: "Quero o Plano Intermediário",
      popular: true,
    },
    {
      id: "aizen",
      name: "Plano Aizen",
      description: "A solução completa para dominar seu mercado e maximizar resultados.",
      priceMonthly: "R$5.000",
      priceSixMonths: "R$4.500",
      features: [
        "Gerenciamento de Redes Sociais",
        "Roteirização de vídeos",
        "Vídeos trends",
        "Criação de 10 posts / mês",
        "Vídeos editados com imagem aérea",
        "Efeitos Visuais (VFX)",
        "Gestor de tráfego",
        "Análise de Métricas",
      ],
      cta: "Quero o Plano Aizen",
      popular: false,
    },
  ];

  const handlePlanContact = (planName, planPrice, isSixMonths) => {
    const period = isSixMonths ? "semestral (fidelidade 06 meses)" : "mensal";
    const message = encodeURIComponent(`Olá, vim do site www.aizenagencia.com.br, e gostaria de saber mais sobre o Plano ${planName} (${period}) no valor de ${planPrice}.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };


  return (
    <section id="pricing" className="py-20 dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">
            Planos Estratégicos para seu <span className="gradient-text">Sucesso Digital</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Escolha o pacote de marketing que impulsionará sua marca ao próximo nível. Flexibilidade para suas necessidades.
          </p>

          <div className="flex items-center justify-center mb-8">
            <span
              className={`mr-3 text-sm font-medium transition-colors ${
                !sixMonths ? "text-orange-400" : "text-muted-foreground"
              }`}
            >
              Mensal
            </span>
            <button
              onClick={() => setSixMonths(!sixMonths)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                sixMonths ? "gradient-bg" : "bg-muted"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition-transform ${
                  sixMonths ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`ml-3 text-sm font-medium transition-colors ${
                sixMonths ? "text-orange-400" : "text-muted-foreground"
              }`}
            >
              06 Meses <span className="text-green-400 text-xs">(-10%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl flex flex-col ${
                plan.popular
                  ? "border-orange-500 shadow-orange-500/20" 
                  : "border-gray-700 hover:border-orange-500/50"
              } bg-card`}
            >
              {plan.popular && (
                <div className="absolute top-0 -right-10 transform rotate-45 gradient-bg text-white text-xs font-bold px-10 py-1.5 shadow-md">
                  <Sparkles className="inline-block h-3 w-3 mr-1 mb-0.5" /> Popular
                </div>
              )}
              <div className="p-6 lg:p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-gray-100">{plan.name}</h3>
                <p className="text-muted-foreground mb-6 min-h-[40px]">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-50">
                    {sixMonths ? plan.priceSixMonths : plan.priceMonthly}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {sixMonths ? "/mês (fidelidade 06 meses)" : "/mês"}
                  </span>
                </div>
                <Button
                  className={`w-full mb-6 font-semibold ${
                    plan.popular ? "gradient-bg text-white shadow-md hover:shadow-orange-500/40" : "hover:bg-orange-500/10 hover:text-orange-300"
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => handlePlanContact(plan.name, sixMonths ? plan.priceSixMonths : plan.priceMonthly, sixMonths)}
                >
                  {plan.cta}
                </Button>
                <ul className="space-y-3 text-sm flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                {sixMonths && (
                  <div className="mt-auto pt-6 border-t border-gray-700/50">
                    <p className="text-xs font-medium text-orange-400 mb-2">Formas de Pagamento (Plano Semestral):</p>
                    <ul className="space-y-1.5">
                      {paymentMethods.map((method, i) => (
                        <li key={i} className="flex items-center text-xs text-muted-foreground">
                          {method.icon}
                          <span>{method.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;