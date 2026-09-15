import React, { useState } from "react";
import { useBrand } from "../context/BrandContext";
import { buildWhatsAppInquiryUrl } from "../config/brand";
import { Sparkles, ArrowRight, MessageCircle, Check, Heart } from "lucide-react";

interface HeroProps {
  onOpenOrder: () => void;
  onViewWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrder, onViewWork }) => {
  const { config } = useBrand();
  const [activeFinish, setActiveFinish] = useState<"oak" | "black" | "ivory">("oak");

  const finishStyles = {
    oak: {
      border: "border-[#A07855] bg-[#936C4A]",
      innerBevel: "border-[#815B3C]",
      label: "Natural Wooden Oak",
      shadow: "shadow-2xl shadow-[#644B36]/20",
    },
    black: {
      border: "border-[#1F1E1D] bg-[#141413]",
      innerBevel: "border-[#2B2A28]",
      label: "Matte Black Wood",
      shadow: "shadow-2xl shadow-black/25",
    },
    ivory: {
      border: "border-[#E7E1D8] bg-[#F2EDE5]",
      innerBevel: "border-[#DDD5C9]",
      label: "Warm Ivory Wood",
      shadow: "shadow-2xl shadow-[#3A332C]/10",
    },
  };

  const whatsappInquiryUrl = buildWhatsAppInquiryUrl(config);

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-20">
      {/* Background radial warmth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-[#F0EAE1]/70 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-6">
            
            {/* Tagline Badge + Starting Price */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE9DF] border border-[#DDD5C9] text-xs font-medium text-[#6B635B]">
                <span className="w-2 h-2 rounded-full bg-[#A85A3C]"></span>
                <span>Handcrafted Wooden Frames & Custom Printing</span>
              </div>

              {/* Noticeable & elegant starting price */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF3EC] border border-[#E4CEBD] text-xs font-semibold text-[#8C4629] shadow-2xs">
                <span>Starting from just</span>
                <span className="font-bold text-sm text-[#A85A3C]">₹99</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1917] leading-[1.12]">
              Your Photos. Your Story. Your Frame.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#57534E] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Personalized photo frames made specially for your favorite moments. You send us your photos and idea — we create the design for you.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                id="hero-create-frame-btn"
                onClick={onOpenOrder}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#1C1917] hover:bg-[#8C4629] rounded-full shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#EADBCE]" />
                <span>Create Your Frame</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-view-work-btn"
                onClick={onViewWork}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-medium text-[#1C1917] bg-white hover:bg-[#F2ECE4] border border-[#DDD5C9] rounded-full shadow-2xs transition-colors cursor-pointer"
              >
                <span>View Our Work</span>
                <ArrowRight className="w-4 h-4 text-[#78716C]" />
              </button>

              {/* Small WhatsApp Option */}
              <a
                id="hero-whatsapp-link"
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs sm:text-sm font-semibold text-[#2E6038] hover:bg-[#E8F3EB] rounded-full transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Reassurance highlights */}
            <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-3 max-w-lg mx-auto lg:mx-0 border-t border-[#E8E2D9] text-center sm:text-left">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#6B635B]">
                <Check className="w-3.5 h-3.5 text-[#A85A3C] shrink-0" />
                <span>Wooden Frames</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#6B635B]">
                <Check className="w-3.5 h-3.5 text-[#A85A3C] shrink-0" />
                <span>Up to 2 Free Revisions</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#6B635B]">
                <Check className="w-3.5 h-3.5 text-[#A85A3C] shrink-0" />
                <span>All India Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Column: Realistic Tasteful Collage Photo-Frame Visual */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Interactive Frame Visual Container */}
            <div className="relative w-full max-w-sm sm:max-w-md mx-auto group">
              
              {/* Outer Realistic Frame Molding */}
              <div
                className={`p-3 sm:p-4 rounded-xl border-4 transition-all duration-300 ${finishStyles[activeFinish].border} ${finishStyles[activeFinish].shadow}`}
              >
                {/* Inner Bevel line */}
                <div className={`p-1.5 sm:p-2 rounded-lg border-2 ${finishStyles[activeFinish].innerBevel}`}>
                  
                  {/* Art Glass & Paper Matting */}
                  <div className="bg-[#FAF9F5] p-4 sm:p-5 rounded-md frame-matting relative">
                    
                    {/* Art Print: Memory Collage Composition */}
                    <div className="space-y-3">
                      {/* Top Header of the customized print */}
                      <div className="text-center border-b border-[#E8E2D9] pb-2">
                        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#8C827A]">
                          Our Journey Together
                        </span>
                        <h2 className="font-serif text-sm sm:text-base font-bold text-[#1C1917]">
                          Moments That Made Us
                        </h2>
                        <span className="text-[9px] text-[#A85A3C] font-mono">
                          Personalized with your photos & text
                        </span>
                      </div>

                      {/* Collage Grid: Tasteful candid photos */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative rounded overflow-hidden aspect-4/3 bg-[#E5DFD7]">
                          <img
                            src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80"
                            alt="Couple candid memory"
                            className="w-full h-full object-cover"
                            loading="eager"
                          />
                          <span className="absolute bottom-1 right-1 text-[8px] bg-black/40 text-white px-1 rounded backdrop-blur-xs">
                            Kashmir
                          </span>
                        </div>
                        <div className="relative rounded overflow-hidden aspect-4/3 bg-[#E5DFD7]">
                          <img
                            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80"
                            alt="Sunset laugh moment"
                            className="w-full h-full object-cover"
                            loading="eager"
                          />
                          <span className="absolute bottom-1 right-1 text-[8px] bg-black/40 text-white px-1 rounded backdrop-blur-xs">
                            Sunset drive
                          </span>
                        </div>
                      </div>

                      {/* Centered Large Feature Photo */}
                      <div className="relative rounded overflow-hidden aspect-16/9 bg-[#E5DFD7]">
                        <img
                          src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80"
                          alt="Special milestone celebration"
                          className="w-full h-full object-cover"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-2">
                          <p className="text-[10px] text-white font-medium italic font-serif">
                            "Every laugh, every road, every little memory."
                          </p>
                        </div>
                      </div>

                      {/* Bottom customized detail */}
                      <div className="flex items-center justify-between pt-1 text-[9px] text-[#78716C]">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3 text-[#A85A3C] fill-[#A85A3C]" />
                          <span>Custom Wooden Frame</span>
                        </div>
                        <span className="font-mono text-[9px] font-semibold text-[#1C1917]">
                          High-Quality Photo Print
                        </span>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

              {/* Floating interactive badge */}
              <div className="absolute -bottom-3 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#DDD5C9] shadow-lg text-left text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="font-semibold text-[#1C1917]">Personalized Design</span>
                </div>
                <p className="text-[10px] text-[#78716C] mt-0.5">Crafted around your favorite photos</p>
              </div>

            </div>

            {/* Frame Finish Selector */}
            <div className="mt-6 flex items-center gap-3 bg-[#EFE9DF] px-3.5 py-2 rounded-full border border-[#DDD5C9] text-xs">
              <span className="text-[#6B635B] font-medium text-[11px]">Wooden Finish:</span>
              <button
                onClick={() => setActiveFinish("oak")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  activeFinish === "oak"
                    ? "bg-[#936C4A] text-white shadow-xs"
                    : "text-[#44403C] hover:bg-white/50"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#A07855] border border-white/50"></span>
                <span>Oak</span>
              </button>

              <button
                onClick={() => setActiveFinish("black")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  activeFinish === "black"
                    ? "bg-[#141413] text-white shadow-xs"
                    : "text-[#44403C] hover:bg-white/50"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-black border border-white/50"></span>
                <span>Black</span>
              </button>

              <button
                onClick={() => setActiveFinish("ivory")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  activeFinish === "ivory"
                    ? "bg-[#DDD5C9] text-[#1C1917] font-semibold shadow-xs"
                    : "text-[#44403C] hover:bg-white/50"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#F5F2EB] border border-stone-400"></span>
                <span>Ivory</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
