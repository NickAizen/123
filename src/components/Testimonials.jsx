import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonialsData = [
  {
    name: "Jó Sales",
    role: "CEO, MHR Curso de Música",
    content:
      "A parceria com a Aizen Agência foi um divisor de águas. Suas estratégias de vídeo marketing aumentaram nosso engajamento em 60% e as vendas subiram 25% em apenas 3 meses!",
    avatarSlug: "jo-sales-music-ceo",
    stars: 5,
  },
  {
    name: "Katia Cilene",
    role: "Gerente Comercial, Equipe Prime - Vivere Imóveis",
    content:
      "Os vídeos produzidos pela equipe são incríveis! Capturaram perfeitamente a essência da nossa marca. O alcance nas redes sociais triplicou desde que começamos.",
    avatarSlug: "katia-cilene-real-estate",
    stars: 5,
  },
  {
    name: "Alcides Júnior",
    role: "Dono, Hamonna Cosméticos",
    content:
      "Eu não sabia por onde começar com marketing digital. A Aizen me guiou em cada passo e os resultados foram surpreendentes para minha pequena empresa.",
    avatarSlug: "alcides-junior-cosmetics",
    stars: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">
            Histórias de <span className="gradient-text">Sucesso</span> de Nossos Clientes
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja como ajudamos empresas como a sua a crescerem e alcançarem seus objetivos de marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="glassmorphism glassmorphism-hover rounded-xl p-8 shadow-xl flex flex-col"
            >
              <Quote className="h-10 w-10 text-orange-400 mb-4 opacity-50" />
              <p className="text-gray-300 mb-6 flex-grow italic">"{testimonial.content}"</p>
              <div className="flex items-center mt-auto">
                <img  
                  className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-orange-500/50"
                  alt={`Avatar de ${testimonial.name}`}
                  // The avatarSlug can be used to generate a unique placeholder image description
                 src="https://images.unsplash.com/photo-1575383596664-30f4489f9786" />
                <div>
                  <h4 className="font-semibold text-gray-100">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex mt-4 border-t border-gray-700/50 pt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.stars
                        ? "text-orange-400 fill-orange-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;