import React from "react";
import { Camera, Lightbulb, Palette, Frame, ArrowRight, Sparkles } from "lucide-react";

interface CustomizationFirstProps {
  onStartCustomOrder: () => void;
}

export const CustomizationFirst: React.FC<CustomizationFirstProps> = ({ onStartCustomOrder }) => {
  const steps = [
    { title: "Your Photos", subtitle: "Upload or send via WhatsApp", icon: Camera },
    { title: "Your Idea", subtitle: "Tell us names, dates & vibe", icon: Lightbulb },
    { title: "Our Design", subtitle: "We handcraft your proof", icon: Palette },
    { title: "Your Frame", subtitle: "Printed & framed with care", icon: Frame },
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#F5F1EA] border-y border-[#E8E2D9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Philosophy Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADBCE] text-xs font-semibold text-[#8C4629]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalized Craft</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            Not Just a Template. It's Yours.
          </h2>

          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl mx-auto">
            Send us your photos, tell us what you have in mind, and we'll create a personalized design around your story.
          </p>
        </div>

        {/* Visual: Your Photos → Your Idea → Our Design → Your Frame */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative">
                  <div className="bg-white rounded-2xl p-6 border border-[#E2DBD1] shadow-2xs text-center flex flex-col items-center justify-center space-y-2.5 h-full">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#EADBCE] flex items-center justify-center text-[#8C4629]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-serif text-base font-bold text-[#1C1917] block">
                        {step.title}
                      </span>
                      <span className="text-xs text-[#78716C] block mt-0.5">
                        {step.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Arrow for Desktop */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#DDD5C9] items-center justify-center text-[#8C827A] shadow-xs">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Call To Action Box */}
        <div className="text-center">
          <button
            id="custom-message-create-btn"
            onClick={onStartCustomOrder}
            className="inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-[#1C1917] hover:bg-[#8C4629] rounded-full shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#EADBCE]" />
            <span>Create My Frame</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
