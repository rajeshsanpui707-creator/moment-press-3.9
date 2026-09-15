import React from "react";
import { useBrand } from "../context/BrandContext";
import { UserCheck, Hammer, Palette, HeartHandshake } from "lucide-react";

export const WhyMomentPress: React.FC = () => {
  const { config } = useBrand();

  const cards = [
    {
      title: "Personalized",
      desc: "Designed around your photos and requirements.",
      icon: UserCheck,
    },
    {
      title: "Made To Order",
      desc: "Every order is created specifically for you.",
      icon: Hammer,
    },
    {
      title: "Design Support",
      desc: "Tell us your idea and we'll help bring it to life.",
      icon: Palette,
    },
    {
      title: "Thoughtful",
      desc: "Because some memories deserve more than a place in your phone gallery.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F5F1EA] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            Why {config.brandName || "MomentPress"}
          </h2>
          <p className="text-base text-[#6B635B]">
            Simple, personal service tailored around what matters to you.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E2DBD1] shadow-2xs hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FAF6F0] border border-[#EADBCE] flex items-center justify-center text-[#8C4629] mb-4 group-hover:bg-[#1C1917] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B635B] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
