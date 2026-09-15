import React from "react";
import { useBrand } from "../context/BrandContext";
import { Heart, Sparkles, Compass } from "lucide-react";

export const AboutSection: React.FC<{ onStartOrder: () => void }> = ({ onStartOrder }) => {
  const { config } = useBrand();

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual card */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-4/5 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-[#EFE9DF]">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
                alt="Framed wall memories"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-2xl border border-[#DDD5C9] shadow-lg max-w-[220px]">
              <p className="font-serif italic text-xs text-[#1C1917]">
                "Every picture you take is a story waiting to be held."
              </p>
            </div>
          </div>

          {/* Text strictly following authentic copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE9DF] text-xs font-semibold text-[#8C4629]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Story</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
              Made For Moments That Matter.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
              <p>
                {config.brandName} started with a simple idea: some photographs deserve to live outside your phone.
              </p>
              <p>
                We create personalized photo frames and printed memories designed around the people, occasions and stories that matter to you.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onStartOrder}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#1C1917] hover:bg-[#8C4629] transition-colors cursor-pointer"
              >
                <span>Create Your Frame</span>
              </button>
              <span className="text-xs text-[#78716C]">
                Serving nationwide with handcrafted care
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
