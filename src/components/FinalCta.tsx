import React from "react";
import { useBrand } from "../context/BrandContext";
import { buildWhatsAppInquiryUrl } from "../config/brand";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";

interface FinalCtaProps {
  onOpenOrder: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenOrder }) => {
  const { config } = useBrand();
  const whatsappUrl = buildWhatsAppInquiryUrl(config);

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E8E2D9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        {/* Emotionally resonant prompt headline */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight leading-tight max-w-3xl mx-auto">
          Have a Moment Worth Framing?
        </h2>

        <p className="text-base sm:text-lg text-[#6B635B] max-w-xl mx-auto font-medium">
          Send us your photos and idea. We'll turn them into something you can keep.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            id="final-cta-create-btn"
            onClick={onOpenOrder}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-[#1C1917] hover:bg-[#8C4629] rounded-full shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#EADBCE]" />
            <span>Create Your Frame</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            id="final-cta-whatsapp-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-medium text-[#2E6038] bg-[#E8F3EB] hover:bg-[#DDF0E2] border border-[#C5E3CE] rounded-full shadow-xs transition-colors cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-[#2E6038]/20" />
            <span>WhatsApp Us</span>
          </a>
        </div>

      </div>
    </section>
  );
};
