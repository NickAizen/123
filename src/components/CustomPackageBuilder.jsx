import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Video, PlusCircle, MinusCircle, ShoppingCart, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const videoTypes = [
  { id: "short", name: "Vídeos Curtos (Reels/TikTok)", price: 250, max: 20 },
  { id: "short_aerial", name: "Vídeo Curtos com imagem aérea (Reels/TikTok)", price: 350, max: 15 },
  { id: "institutional", name: "Vídeos Institucionais Empresarial", price: 500, max: 10 },
];

const additionalServices = [
  { id: "script", name: "Roteirização Profissional", price: 0, perVideo: true, bonus: true },
  { id: "vfx_editing", name: "Edição Avançada com VFX", price: 60, perVideo: true },
  { id: "photo_session", name: "Sessão de Fotografia (hora)", price: 120, perVideo: false, flat: true },
  { id: "custom_thumbnail", name: "Capa Personalizada", price: 50, perVideo: true },
  { id: "voice_direction", name: "Direção Vocal", price: 100, perVideo: true },
  { id: "presenter", name: "Apresentador do vídeo ou produto", price: 250, perVideo: false, flat: true },
];

const CustomPackageBuilder = () => {
  const { toast } = useToast();
  const [videoQuantities, setVideoQuantities] = useState(
    videoTypes.reduce((acc, type) => ({ ...acc, [type.id]: 0 }), {})
  );
  const [selectedServices, setSelectedServices] = useState(
    additionalServices.reduce((acc, service) => ({ ...acc, [service.id]: false }), {})
  );
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let currentTotal = 0;
    let totalVideos = 0;

    videoTypes.forEach(video => {
      const quantity = videoQuantities[video.id] || 0;
      currentTotal += quantity * video.price;
      totalVideos += quantity;
    });

    additionalServices.forEach(service => {
      if (selectedServices[service.id] && !service.bonus) {
        if (service.perVideo) {
          currentTotal += service.price * totalVideos;
        } else if (service.flat) {
          currentTotal += service.price;
        }
      }
    });

    setTotalPrice(currentTotal);
  }, [videoQuantities, selectedServices]);

  const handleQuantityChange = (id, value) => {
    const videoType = videoTypes.find(v => v.id === id);
    const newValue = Math.max(0, Math.min(parseInt(value) || 0, videoType.max));
    setVideoQuantities(prev => ({ ...prev, [id]: newValue }));
  };
  
  const incrementQuantity = (id) => {
    const videoType = videoTypes.find(v => v.id === id);
    setVideoQuantities(prev => ({ ...prev, [id]: Math.min((prev[id] || 0) + 1, videoType.max)}));
  };

  const decrementQuantity = (id) => {
    setVideoQuantities(prev => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0)}));
  };

  const handleServiceToggle = (id) => {
    setSelectedServices(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmitPackage = () => {
    if (totalPrice === 0 && Object.values(videoQuantities).every(q => q === 0)) {
      toast({
        title: "Pacote Vazio!",
        description: "Por favor, adicione vídeos ou serviços para montar seu pacote.",
        variant: "destructive",
      });
      return;
    }

    let message = "Olá Aizen Agência, gostaria de solicitar um orçamento para o seguinte pacote personalizado:\n\n";
    message += "*Vídeos:*\n";
    let videoDetailsAdded = false;
    videoTypes.forEach(video => {
      if (videoQuantities[video.id] > 0) {
        message += `- ${video.name}: ${videoQuantities[video.id]} unidade(s)\n`;
        videoDetailsAdded = true;
      }
    });
    if (!videoDetailsAdded) {
      message += "- Nenhum vídeo selecionado\n";
    }

    message += "\n*Serviços Adicionais:*\n";
    let serviceDetailsAdded = false;
    additionalServices.forEach(service => {
      if (selectedServices[service.id]) {
        message += `- ${service.name}${service.bonus ? " (Bônus Gratuito)" : ""}\n`;
        serviceDetailsAdded = true;
      }
    });
    if (!serviceDetailsAdded) {
      message += "- Nenhum serviço adicional selecionado\n";
    }
    
    message += `\n*Total Estimado: R$ ${totalPrice.toFixed(2)}*\n`;
    message += "\nAguardo o contato para finalizarmos os detalhes.";

    const whatsappUrl = `https://wa.me/5592981786614?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "Redirecionando para WhatsApp!",
      description: `Seu pacote personalizado está sendo preparado para envio.`,
      duration: 5000,
    });
  };

  return (
    <section id="custom-package" className="py-20 dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Sparkles className="mx-auto h-12 w-12 text-orange-400 mb-4" />
          <h2 className="mb-4">
            Monte o Plano <span className="gradient-text">Ideal para sua Empresa</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Crie seu próprio pacote de vídeos e adicione os serviços que sua marca realmente necessita.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2 bg-card p-6 sm:p-8 rounded-xl shadow-xl border border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-100">1. Selecione a Quantidade e Tipo de Vídeo</h3>
            <div className="space-y-8">
              {videoTypes.map(video => (
                <div key={video.id} className="p-4 border border-gray-700 rounded-lg bg-background/50">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                    <div>
                      <Label htmlFor={video.id} className="text-lg font-medium text-gray-200">{video.name}</Label>
                      <p className="text-sm text-muted-foreground">R$ {video.price.toFixed(2)} por vídeo. Máx: {video.max}</p>
                    </div>
                    <div className="flex items-center space-x-3 mt-2 sm:mt-0">
                      <Button variant="outline" size="icon" onClick={() => decrementQuantity(video.id)} className="h-8 w-8 border-gray-600 hover:bg-orange-500/10">
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <Input 
                        id={video.id}
                        type="number" 
                        value={videoQuantities[video.id] || 0}
                        onChange={(e) => handleQuantityChange(video.id, e.target.value)}
                        className="w-16 h-8 text-center bg-transparent border-gray-600 focus:border-orange-500"
                        min="0"
                        max={video.max}
                      />
                      <Button variant="outline" size="icon" onClick={() => incrementQuantity(video.id)} className="h-8 w-8 border-gray-600 hover:bg-orange-500/10">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Slider
                    id={`slider-${video.id}`}
                    value={[videoQuantities[video.id] || 0]}
                    onValueChange={([value]) => handleQuantityChange(video.id, value)}
                    max={video.max}
                    step={1}
                    className="[&>span:first-child]:h-1 [&>span:first-child]:bg-orange-500"
                  />
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-semibold mt-10 mb-6 text-gray-100">2. Adicione Serviços Extras</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {additionalServices.map(service => (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * additionalServices.indexOf(service) }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 p-3 bg-background/50 rounded-md border border-gray-700 hover:border-orange-500/50 transition-colors"
                >
                  <Checkbox 
                    id={service.id} 
                    checked={selectedServices[service.id]}
                    onCheckedChange={() => handleServiceToggle(service.id)}
                    className="border-gray-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor={service.id} className="text-sm font-medium text-gray-200 cursor-pointer">
                      {service.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {service.bonus ? <span className="text-green-400 font-semibold">Bônus Gratuito!</span> : `+ R$ ${service.price.toFixed(2)} ${service.perVideo ? "por vídeo" : (service.flat ? "" : "")}`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="sticky top-24 bg-card p-6 sm:p-8 rounded-xl shadow-xl border border-orange-500/30">
              <h3 className="text-2xl font-semibold mb-6 text-gray-100 flex items-center">
                <ShoppingCart className="h-7 w-7 mr-3 text-orange-400"/>
                Resumo do Pacote
              </h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={totalPrice}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {videoTypes.map(video => (videoQuantities[video.id] || 0) > 0 && (
                    <div key={`summary-${video.id}`} className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">{video.name} x{videoQuantities[video.id]}</span>
                      <span className="font-medium text-gray-200">R$ {(videoQuantities[video.id] * video.price).toFixed(2)}</span>
                    </div>
                  ))}

                  {additionalServices.map(service => selectedServices[service.id] && (
                    <div key={`summary-service-${service.id}`} className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">{service.name}</span>
                      <span className="font-medium text-gray-200">
                        {service.bonus ? <span className="text-green-400">Gratuito</span> : 
                        `R$ ${(service.perVideo ? service.price * Object.values(videoQuantities).reduce((a,b)=>(a || 0)+(b || 0),0) : service.price).toFixed(2)}`}
                      </span>
                    </div>
                  ))}
                  
                  {(totalPrice > 0 || Object.values(videoQuantities).some(q => q > 0)) && <hr className="border-gray-700 my-4" />}

                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span className="text-gray-100">Total Estimado:</span>
                    <span className="gradient-text">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <Button 
                size="lg" 
                className="w-full mt-8 gradient-bg text-white font-semibold shadow-md hover:shadow-orange-500/40"
                onClick={handleSubmitPackage}
                disabled={totalPrice === 0 && Object.values(videoQuantities).every(q => q === 0)}
              >
                Solicitar Orçamento via WhatsApp
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Você será redirecionado para o WhatsApp.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomPackageBuilder;
