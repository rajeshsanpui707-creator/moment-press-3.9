import React from "react";
import { useBrand } from "../context/BrandContext";
import { FileText, ArrowLeft } from "lucide-react";

interface TermsPageProps {
  onBack: () => void;
}

export const TermsConditions: React.FC<TermsPageProps> = ({ onBack }) => {
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
              <FileText className="w-3.5 h-3.5" />
              <span>Simple & Transparent Business Terms</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#1C1917]">
              Terms & Conditions
            </h1>
            <p className="text-xs text-[#78716C]">
              Transparent terms governing orders with {config.brandName || "MomentPress"}
            </p>
          </div>

          <div className="space-y-5 text-sm text-[#57534E] leading-relaxed">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                1. Order Process & Advance Payment
              </h2>
              <p>
                Submitting a form on this website is an initial design and quotation request. Orders are officially confirmed once both parties agree on size, layout, quality, and price.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm">
                <li>Orders require a <strong>{config.advancePercent || 50}% advance payment</strong> after quotation approval and order confirmation.</li>
                <li>The remaining 50% balance must be settled prior to dispatch.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                2. Design Approval & Free Revisions
              </h2>
              <p>
                Every frame design is personalized around your photos and specifications.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm">
                <li>A digital design preview will be sent to you via WhatsApp or Email for review before printing.</li>
                <li>You receive up to <strong>{config.freeRevisions || 2} free revisions</strong> to adjust text, crop, photo placement, or minor layout details.</li>
                <li>Once you provide final approval for the design preview, the layout is locked into production and cannot be altered.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                3. Materials & Craftsmanship
              </h2>
              <p>
                Our frames are handcrafted using genuine {config.frameMaterial || "Wooden"} material. We provide high-quality photo prints available in Normal and Best print quality options. Because each wooden frame has natural grain characteristics, subtle surface grain variations are normal hallmarks of real wood.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                4. Delivery Across India
              </h2>
              <p>
                We deliver to addresses all over India. Estimated dispatch and delivery dates are communicated during WhatsApp order confirmation depending on your PIN code and location.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                5. Quantity Discounts
              </h2>
              <p>
                Orders containing 2 or more frames qualify for a <strong>{config.discountPercent || 10}% discount</strong> applied to the total frame order value.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                6. Customer Support
              </h2>
              <p>
                For questions regarding your ongoing order or terms, contact us on WhatsApp at <strong>{config.whatsappDisplay}</strong> or phone at <strong>{config.phoneNumber}</strong>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
