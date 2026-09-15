import React from "react";
import { Frame, Printer, Palette } from "lucide-react";

export const WhatWeOffer: React.FC = () => {
  const services = [
    {
      icon: Frame,
      title: "Personalized Photo Frames",
      description: "Wooden photo frames created using your own photos.",
      badge: "Wooden Frames",
    },
    {
      icon: Printer,
      title: "Custom Photo Printing",
      description: "We print your photos according to your requirements.",
      badge: "Normal & Best Quality",
    },
    {
      icon: Palette,
      title: "Custom Designs",
      description: "Tell us your idea, occasion and preferences. We create a design specially for you.",
      badge: "Up to 2 Free Revisions",
    },
  ];

  return (
    <section id="what-we-offer" className="py-14 lg:py-20 bg-[#FAF8F5] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            What We Offer
          </h2>
          <p className="text-base text-[#6B635B]">
            Simple, honest craftsmanship made around your personal memories.
          </p>
        </div>

        {/* 3 Clean Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-7 border border-[#E8E2D9] shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#A85A3C]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#8C4629] bg-[#FAF3EC] px-2.5 py-1 rounded-full border border-[#E4CEBD]">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1C1917] leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#6B635B] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
