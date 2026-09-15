import React from "react";
import { useBrand } from "../context/BrandContext";
import { Sparkles, ArrowRight, Tag, ShieldCheck, Truck } from "lucide-react";

interface PricingSectionProps {
  onOpenOrder: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenOrder }) => {
  const { config } = useBrand();

  const priceDisplay = config.startingPrice.toString().startsWith("₹")
    ? config.startingPrice
    : `₹${config.startingPrice}`;

  return (
    <section id="pricing" className="py-12 lg:py-16 bg-[#F5F2EB] border-y border-[#E8E2D9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DDD5C9] shadow-xs space-y-8">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E8E2D9]">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3EC] border border-[#E4CEBD] text-xs font-semibold text-[#8C4629]">
                <Tag className="w-3.5 h-3.5" />
                <span>Simple & Transparent Pricing</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                Starting from just <span className="text-[#A85A3C]">{priceDisplay}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#6B635B] max-w-xl">
                Final pricing depends on size, quality, customization and quantity. Contact us for your exact quotation.
              </p>
            </div>

            {/* Discount Highlight */}
            <div className="bg-[#FAF8F5] border border-[#DDD5C9] p-4 rounded-2xl flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#1C1917] text-[#EADBCE] flex items-center justify-center font-bold text-sm shrink-0">
                {config.discountPercent}%
              </div>
              <div>
                <p className="text-xs font-bold text-[#1C1917]">Special Quantity Offer</p>
                <p className="text-xs text-[#6B635B]">{config.discountPercent}% OFF when ordering 2 or more frames</p>
              </div>
            </div>
          </div>

          {/* Details Grid: Quality Options & Delivery Terms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Quality: Normal */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#78716C]">
                Print Quality Option 1
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                Normal Quality
              </h3>
              <p className="text-xs text-[#6B635B] leading-relaxed">
                Standard photo print quality, suitable for everyday gifts and casual memory displays.
              </p>
            </div>

            {/* Quality: Best */}
            <div className="p-5 rounded-2xl bg-[#FAF3EC] border border-[#E4CEBD] space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C4629]">
                Print Quality Option 2 (Recommended)
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                Best Quality
              </h3>
              <p className="text-xs text-[#6B635B] leading-relaxed">
                Higher-quality print option with enhanced color depth and longevity for special moments.
              </p>
            </div>

            {/* Payment & Order Terms */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#78716C]">
                Fair Payment Terms
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                {config.advancePercent}% Advance
              </h3>
              <p className="text-xs text-[#6B635B] leading-relaxed">
                {config.paymentTerms}
              </p>
            </div>

          </div>

          {/* Delivery & CTA Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E8E2D9] text-xs text-[#6B635B]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#A85A3C]" />
                <span className="font-medium text-[#1C1917]">Delivery Available Across India</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Handcrafted Wooden Frames</span>
              </div>
            </div>

            <button
              onClick={onOpenOrder}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1C1917] hover:bg-[#8C4629] rounded-full shadow-2xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EADBCE]" />
              <span>Create Your Frame</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
