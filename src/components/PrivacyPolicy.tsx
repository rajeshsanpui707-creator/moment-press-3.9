import React from "react";
import { useBrand } from "../context/BrandContext";
import { Shield, ArrowLeft } from "lucide-react";

interface PolicyPageProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PolicyPageProps> = ({ onBack }) => {
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
              <Shield className="w-3.5 h-3.5" />
              <span>Customer Privacy & Image Protection</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#1C1917]">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#78716C]">
              Last updated for {config.brandName || "MomentPress"}
            </p>
          </div>

          <div className="space-y-5 text-sm text-[#57534E] leading-relaxed">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                1. Your Photos & Personal Information
              </h2>
              <p>
                At {config.brandName}, we treat your memories and personal photographs with the utmost respect and confidentiality. The photographs, names, dates, quotes, and delivery details you provide through our website or WhatsApp are used exclusively for designing, printing, framing, and delivering your custom orders.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                2. No Public Sharing Without Explicit Permission
              </h2>
              <p>
                We never publicly display customer photographs, family portraits, or personal frames on our website, social media, or marketing materials without your prior explicit written consent.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                3. Secure Handling & Photo Retention
              </h2>
              <p>
                Uploaded and shared photographs are stored only for the duration required to complete your design preview, printing, framing, and delivery. After an order is completed and received safely, high-resolution original image files are cleared from our active production queue.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                4. Communication
              </h2>
              <p>
                We use your phone number and WhatsApp exclusively to share design proofs, discuss revisions, provide order quotations, and send dispatch tracking information. We do not sell or share your contact information with any third-party advertisers.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                5. Contact Us
              </h2>
              <p>
                If you have questions regarding your data or photos, reach out to us at:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm">
                <li>Email: {config.email}</li>
                <li>WhatsApp: {config.whatsappDisplay}</li>
                <li>Phone: {config.phoneNumber}</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
