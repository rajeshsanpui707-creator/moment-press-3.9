import React, { useState } from "react";
import { useBrand } from "../context/BrandContext";
import { Sparkles, Check, ArrowRight, Layers, SlidersHorizontal, Heart } from "lucide-react";

interface FeaturedProductProps {
  onCustomizeThisFrame: (productType: string, frameSize: string) => void;
}

export const FeaturedProduct: React.FC<FeaturedProductProps> = ({ onCustomizeThisFrame }) => {
  const { config } = useBrand();
  const [selectedLayout, setSelectedLayout] = useState<"trio" | "solo" | "grid">("trio");
  const [selectedFrameFinish, setSelectedFrameFinish] = useState<"black" | "oak" | "white">("oak");

  const finishBorders = {
    black: "border-[#1F1E1D] bg-[#141413] shadow-black/20",
    oak: "border-[#8C6239] bg-[#7A532E] shadow-[#644B36]/20",
    white: "border-[#E5DFD5] bg-[#F5F2EC] shadow-[#3A332C]/10",
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F5F2EB] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Realistic Frame Visualization & Layout Switcher */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* The Realistic Frame */}
            <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
              
              {/* Wooden / Molded Edge */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border-4 transition-all duration-300 shadow-2xl ${finishBorders[selectedFrameFinish]}`}
              >
                {/* Inner Matting Mount */}
                <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-md frame-matting shadow-inner">
                  
                  {/* Layout Option 1: Trio Story */}
                  {selectedLayout === "trio" && (
                    <div className="space-y-3 animate-in fade-in duration-300">
                      <div className="text-center pb-2 border-b border-[#E8E2D9]">
                        <span className="text-[10px] uppercase tracking-widest text-[#8C827A] font-semibold">
                          Sample Custom Layout
                        </span>
                        <h4 className="font-serif text-base font-bold text-[#1C1917]">
                          "The Days We Remember"
                        </h4>
                        <p className="text-[9px] text-[#A85A3C]">Names, Special Date & Custom Note</p>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5">
                        <div className="aspect-3/4 rounded overflow-hidden bg-stone-200">
                          <img
                            src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=300&q=80"
                            alt="Sample memory 1"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="aspect-3/4 rounded overflow-hidden bg-stone-200">
                          <img
                            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=300&q=80"
                            alt="Sample memory 2"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="aspect-3/4 rounded overflow-hidden bg-stone-200">
                          <img
                            src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=300&q=80"
                            alt="Sample memory 3"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="text-center pt-2">
                        <p className="text-[10px] italic text-[#57534E] font-serif">
                          "Together is our favorite place to be."
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Layout Option 2: Solo Portrait + Dedicated Typography */}
                  {selectedLayout === "solo" && (
                    <div className="space-y-3 animate-in fade-in duration-300">
                      <div className="aspect-4/3 rounded-lg overflow-hidden bg-stone-200 relative">
                        <img
                          src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80"
                          alt="Solo Family Portrait"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center pt-2 border-t border-[#E8E2D9]">
                        <h4 className="font-serif text-lg font-bold text-[#1C1917]">
                          The Sanpui Family
                        </h4>
                        <p className="text-[10px] text-[#A85A3C] font-mono mt-0.5">
                          Home Sweet Home • Est. 2018
                        </p>
                        <p className="text-[9px] text-[#78716C] mt-1 italic">
                          "Surrounded by love, laughter, and lifelong memories."
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Layout Option 3: Mini Grid (9-photo mosaic) */}
                  {selectedLayout === "grid" && (
                    <div className="space-y-2.5 animate-in fade-in duration-300">
                      <div className="text-center pb-1">
                        <span className="text-[10px] uppercase tracking-widest text-[#8C827A] font-semibold">
                          Year In Review Grid
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          "1516589178581-6cd7833ae3b2",
                          "1464349095431-e9a21285b5f3",
                          "1523050854058-8df90110c9f1",
                          "1529156069898-49953e39b3ac",
                          "1519741497674-611481863552",
                          "1581579438747-1dc8d17bbce4",
                          "1539635278303-d4002c07eae3",
                          "1577896851231-70ef18881754",
                          "1492691527719-9d1e07e534b4"
                        ].map((id, i) => (
                          <div key={i} className="aspect-square rounded overflow-hidden bg-stone-200">
                            <img
                              src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=150&q=80`}
                              alt={`Memory ${i}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-center text-[9px] text-[#78716C] pt-1 font-mono">
                        9 Photos • Custom Caption Below
                      </p>
                    </div>
                  )}

                </div>
              </div>

              {/* Dimensions callout sticker */}
              <div className="absolute -top-3 -left-3 bg-[#1C1917] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#EADBCE]" />
                <span>Standard A4 (8.3 × 11.7 in)</span>
              </div>
            </div>

            {/* Interactive preview switches */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#E8E2D9] text-xs">
                <span className="text-[#8C827A] px-2 text-[11px] font-medium">Layout:</span>
                <button
                  onClick={() => setSelectedLayout("trio")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    selectedLayout === "trio" ? "bg-[#1C1917] text-white" : "text-[#44403C] hover:bg-stone-100"
                  }`}
                >
                  3-Photo Story
                </button>
                <button
                  onClick={() => setSelectedLayout("solo")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    selectedLayout === "solo" ? "bg-[#1C1917] text-white" : "text-[#44403C] hover:bg-stone-100"
                  }`}
                >
                  Portrait & Text
                </button>
                <button
                  onClick={() => setSelectedLayout("grid")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    selectedLayout === "grid" ? "bg-[#1C1917] text-white" : "text-[#44403C] hover:bg-stone-100"
                  }`}
                >
                  9-Photo Grid
                </button>
              </div>

              <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#E8E2D9] text-xs">
                <span className="text-[#8C827A] px-2 text-[11px] font-medium">Finish:</span>
                <button
                  onClick={() => setSelectedFrameFinish("oak")}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer ${
                    selectedFrameFinish === "oak" ? "bg-[#7A532E] text-white" : "text-[#44403C]"
                  }`}
                >
                  Oak
                </button>
                <button
                  onClick={() => setSelectedFrameFinish("black")}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer ${
                    selectedFrameFinish === "black" ? "bg-black text-white" : "text-[#44403C]"
                  }`}
                >
                  Black
                </button>
                <button
                  onClick={() => setSelectedFrameFinish("white")}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer ${
                    selectedFrameFinish === "white" ? "bg-stone-200 text-[#1C1917]" : "text-[#44403C]"
                  }`}
                >
                  Ivory
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Product details & Customizable Notice */}
          {/* Right Column: Product details & Customizable Notice */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADBCE] text-xs font-semibold text-[#8C4629]">
              <span>Featured Choice</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
              Personalized Photo Frame
            </h2>

            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
              A custom-designed frame created around your favorite photos and memories.
            </p>

            {/* Standard Size Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="text-xs font-medium text-[#78716C]">Standard Size:</span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#DDD5C9] text-xs font-bold text-[#1C1917]">
                A4 Frame
              </span>
            </div>

            {/* Price display with easy-to-change configuration */}
            <div className="pt-1 flex flex-col sm:flex-row sm:items-baseline gap-2 justify-center lg:justify-start">
              <span className="text-sm font-medium text-[#78716C]">Price:</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
                  Starting from {config.startingPrice.toString().startsWith("₹") ? config.startingPrice : `₹${config.startingPrice}`}
                </span>
              </div>
            </div>

            {/* Key product specs */}
            <div className="grid grid-cols-2 gap-3 text-left pt-2">
              <div className="flex items-start gap-2 text-xs sm:text-sm text-[#57534E]">
                <Check className="w-4 h-4 text-[#A85A3C] shrink-0 mt-0.5" />
                <span>Custom layout tailored to your photos</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-[#57534E]">
                <Check className="w-4 h-4 text-[#A85A3C] shrink-0 mt-0.5" />
                <span>Archival fine art print quality</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-[#57534E]">
                <Check className="w-4 h-4 text-[#A85A3C] shrink-0 mt-0.5" />
                <span>Dual tabletop stand + Wall hook</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-[#57534E]">
                <Check className="w-4 h-4 text-[#A85A3C] shrink-0 mt-0.5" />
                <span>Free preview before printing</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-3">
              <button
                id="featured-customize-btn"
                onClick={() => onCustomizeThisFrame("Personalized Photo Frame", "A4 Frame")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-[#1C1917] hover:bg-[#8C4629] rounded-full shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#EADBCE]" />
                <span>Customize This Frame</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
