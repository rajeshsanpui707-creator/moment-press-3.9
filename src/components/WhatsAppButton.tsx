import React from "react";
import { useBrand } from "../context/BrandContext";
import { buildWhatsAppInquiryUrl } from "../config/brand";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton: React.FC = () => {
  const { config } = useBrand();
  const whatsappUrl = buildWhatsAppInquiryUrl(config, `Hi ${config.brandName}! I'm interested in ordering a personalized photo frame. Could you guide me?`);

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-5 right-5 z-40 flex items-center group">
      {/* Tooltip on desktop hover */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 text-xs font-medium text-[#1C1917] bg-white border border-[#E8E2D9] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with us on WhatsApp
      </span>
      
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
      >
        <MessageCircle className="w-7 h-7 fill-white/20" />
      </a>
    </aside>
  );
};
