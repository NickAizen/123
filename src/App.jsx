import React from "react";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar"; 
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import CustomPackageBuilder from "@/components/CustomPackageBuilder";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

function App() {
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/d44f484a-eadd-412e-903b-19defce2bee0/6ee655e979042ee5d0d135b1dbc318d0.png";
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground dark-bg">
      <Navbar logoUrl={logoUrl} />
      <main className="flex-grow">
        <Hero logoUrl={logoUrl} />
        <Features />
        <Pricing />
        <CustomPackageBuilder />
        <Testimonials />
        <CTA />
      </main>
      <Footer logoUrl={logoUrl} />
      <Toaster />
    </div>
  );
}

export default App;