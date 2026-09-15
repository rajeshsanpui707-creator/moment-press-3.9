import React from "react";
import { useBrand } from "../context/BrandContext";
import { RefreshCcw, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";

interface RefundPolicyProps {
  onBack: () => void;
}

export const RefundPolicy: React.FC<RefundPolicyProps> = ({ onBack }) => {
  const { config } = useBrand();

  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B635B] hover:text-[#1C1917] mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl border border-[#E8E2D9] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2 border-b border-[#E8E2D9] pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3EC] text-[#8C4629] text-xs font-semibold">
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Customer Satisfaction & Policy</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#1C1917]">
              Cancellation, Refund & Replacement Policy
            </h1>
            <p className="text-xs text-[#78716C]">
              Fair, clear policies for {config.brandName || "MomentPress"} personalized frames
            </p>
          </div>

          <div className="space-y-6 text-sm text-[#57534E] leading-relaxed">
            
            {/* Cancellation Section */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-2">
              <h2 className="font-serif text-base font-bold text-[#1C1917] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#A85A3C]" />
                <span>1. Cancellation Policy</span>
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#57534E]">
                <li>
                  <strong>Before Printing:</strong> Orders can be cancelled at any time <em>before</em> physical printing and framing begin.
                </li>
                <li>
                  <strong>After Printing:</strong> Because each piece is custom designed and printed specifically with your personal photos and dates, cancellation is not possible once printing or framing has commenced.
                </li>
              </ul>
            </div>

            {/* Replacement for Shipping Damage */}
            <div className="p-4 rounded-2xl bg-[#E8F3EB] border border-[#C5E3CE] space-y-2">
              <h2 className="font-serif text-base font-bold text-[#1C1917] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E6038]" />
                <span>2. Transit Damage & Replacement Guarantee</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#385E41]">
                We package each wooden frame with heavy protective multi-layer cushioning. However, if your package arrives damaged in transit:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#385E41]">
                <li>
                  Please share clear photographs or an unboxing video of the damaged package and frame within <strong>24 hours of delivery</strong> to our WhatsApp (+91 79808 55821).
                </li>
                <li>
                  <strong>All genuine transit damage cases will be replaced free of charge</strong>. We will reprint, re-frame, and dispatch a replacement promptly.
                </li>
              </ul>
            </div>

            {/* Personalized Products Nature */}
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                3. Quality Verification & Free Revisions
              </h2>
              <p>
                To avoid any dissatisfaction with the finished product, we provide digital design previews before printing and include up to 2 free revisions. Printing begins only after you confirm that the design, spelling, and photo alignments are satisfactory.
              </p>
            </div>

            {/* How to initiate replacement */}
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                4. How to Report an Issue
              </h2>
              <p>
                Contact us directly with your order details and photos:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm">
                <li>WhatsApp: <strong>{config.whatsappDisplay}</strong></li>
                <li>Phone: <strong>{config.phoneNumber}</strong></li>
                <li>Email: <strong>{config.email}</strong></li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
