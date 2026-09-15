import React from "react";
import { MessageSquare, Upload, Palette, Eye, CheckCircle, Package } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "01 — Share Your Idea",
      desc: "Tell us what kind of frame you want and what occasion it is for.",
      icon: MessageSquare,
    },
    {
      num: "02",
      title: "02 — Send Your Photos",
      desc: "Send your photos through the website upload or WhatsApp.",
      icon: Upload,
    },
    {
      num: "03",
      title: "03 — We Design",
      desc: "Our team creates a personalized design based on your requirements.",
      icon: Palette,
    },
    {
      num: "04",
      title: "04 — Preview & Revision",
      desc: "We send you the design preview. You can request up to 2 free revisions.",
      icon: Eye,
      highlight: "2 Free Revisions",
    },
    {
      num: "05",
      title: "05 — Approve",
      desc: "We proceed only after you approve the final design.",
      icon: CheckCircle,
    },
    {
      num: "06",
      title: "06 — Print, Frame & Deliver",
      desc: "We print, frame and deliver your finished product.",
      icon: Package,
    },
  ];

  return (
    <section id="how-it-works" className="py-14 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            How It Works
          </h2>
          <p className="text-base text-[#6B635B]">
            From your photos to your wall in a simple, personal step-by-step process.
          </p>
        </div>

        {/* Steps Grid (6 clean steps) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#A85A3C]">
                      <Icon className="w-5 h-5" />
                    </div>
                    {step.highlight && (
                      <span className="text-[10px] font-semibold text-[#8C4629] bg-[#FAF3EC] px-2 py-0.5 rounded-full border border-[#E4CEBD]">
                        {step.highlight}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#1C1917] mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B635B] leading-relaxed">
                    {step.desc}
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
