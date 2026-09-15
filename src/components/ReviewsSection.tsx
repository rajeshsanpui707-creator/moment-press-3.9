import React from "react";
import { useBrand } from "../context/BrandContext";
import { Heart, Sparkles, Shield, MessageSquarePlus } from "lucide-react";

export const ReviewsSection: React.FC<{ onStartFirstMemory: () => void }> = ({ onStartFirstMemory }) => {
  const { config } = useBrand();

  return (
    <section className="py-20 lg:py-24 bg-[#F5F1EA] border-t border-[#E8E2D9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Aesthetic icon */}
        <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2DBD1] flex items-center justify-center text-[#8C4629] mx-auto shadow-2xs">
          <Heart className="w-7 h-7 fill-[#8C4629]/15" />
        </div>

        {/* Heading & Subtitle strictly per requirement */}
        <div className="space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C4629]">
            Client Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            Your Story Could Be Our Next One.
          </h2>
          <p className="text-base sm:text-lg text-[#6B635B] max-w-xl mx-auto leading-relaxed">
            We're just getting started—and we'd love to create your first {config.brandName} memory.
          </p>
        </div>

        {/* Authentic Founder Guarantee / Transparent Note */}
        <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-[#E2DBD1] shadow-xs text-left space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FAF6F0] border border-[#EADBCE] flex items-center justify-center text-[#8C4629] shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#1C1917] text-base">
                Our Early Supporter Promise
              </h4>
              <p className="text-xs text-[#78716C]">
                Personal attention from our head designer on every frame
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
            Unlike massive automated websites, every single frame created right now receives hands-on care from our design team. We work with you on WhatsApp until you're completely delighted with the digital proof.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#F5F2EB]">
            <span className="text-xs text-[#8C827A] italic">
              Ready to frame your favorite moment?
            </span>
            <button
              onClick={onStartFirstMemory}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#1C1917] hover:bg-[#8C4629] transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EADBCE]" />
              <span>Create Your First Frame</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
