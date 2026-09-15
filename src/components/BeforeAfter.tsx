import React, { useState } from "react";
import { ArrowRight, Image as ImageIcon, Sparkles, CheckCircle2 } from "lucide-react";

export const BeforeAfter: React.FC<{ onStartOrder: () => void }> = ({ onStartOrder }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const stages = [
    {
      step: "Phase 1",
      title: "Original Photos",
      subtitle: "Unedited camera roll captures",
      desc: "Regular casual photos sent from your phone—no professional camera needed.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80",
      badge: "What You Send",
      tagColor: "bg-[#EFE9DF] text-[#6B635B]",
    },
    {
      step: "Phase 2",
      title: "Personalized Design",
      subtitle: "Digital proof handcrafted for you",
      desc: "Our design team harmonizes the colors, balances the collage, and adds custom dates and typography.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80",
      badge: "What We Design",
      tagColor: "bg-[#EADBCE] text-[#8C4629]",
    },
    {
      step: "Phase 3",
      title: "Finished Frame",
      subtitle: "Ready to mount on your wall",
      desc: "Printed on 300 GSM archival paper, mounted with museum matting in a handcrafted wooden frame.",
      image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80",
      badge: "What You Receive",
      tagColor: "bg-[#1C1917] text-white",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#A85A3C]">
            The Transformation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            From Photo to Frame
          </h2>
          <p className="text-base text-[#6B635B]">
            See how everyday candid moments in your camera roll become art pieces you'll cherish forever.
          </p>
        </div>

        {/* 3-Stage Visual Progression */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-stretch">
          {stages.map((stage, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Image Preview */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#EFE9DF]">
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span
                  className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full shadow-xs ${stage.tagColor}`}
                >
                  {stage.badge}
                </span>
                <span className="absolute bottom-3 right-3 text-[10px] font-mono bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                  {stage.step}
                </span>
              </div>

              {/* Text content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A85A3C]" />
                    <span className="text-xs font-semibold text-[#8C827A] uppercase tracking-wider">
                      {stage.subtitle}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1C1917]">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-[#6B635B] leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F5F2EB] flex items-center justify-between text-xs text-[#78716C]">
                  <span>Step {idx + 1} of 3</span>
                  {idx < 2 && <ArrowRight className="w-4 h-4 text-[#A85A3C]" />}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
