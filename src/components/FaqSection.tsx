import React, { useState } from "react";
import { useBrand } from "../context/BrandContext";
import { getFaqs } from "../data/faq";
import { ChevronDown, MessageCircle } from "lucide-react";
import { buildWhatsAppInquiryUrl } from "../config/brand";

export const FaqSection: React.FC = () => {
  const { config } = useBrand();
  const faqs = getFaqs(config);
  const [openId, setOpenId] = useState<string | null>("custom-frame");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const whatsappInquiryUrl = buildWhatsAppInquiryUrl(config);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#E8E2D9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#6B635B] max-w-xl mx-auto">
            Everything you need to know about ordering, design proofing, and delivery.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none cursor-pointer hover:bg-[#FAF8F5] transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#1C1917] pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#78716C] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#1C1917] text-white border-transparent" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-[#57534E] leading-relaxed border-t border-[#F5F2EB] pt-4 animate-in fade-in-50 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Ask on WhatsApp callout */}
        <div className="mt-10 p-6 rounded-2xl bg-[#EFE9DF] border border-[#DDD5C9] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif font-bold text-[#1C1917] text-base">
              Have another question?
            </h4>
            <p className="text-xs sm:text-sm text-[#6B635B] mt-0.5">
              Talk directly to us on WhatsApp anytime.
            </p>
          </div>

          <a
            id="faq-whatsapp-btn"
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#2E6038] bg-white hover:bg-[#DDF0E2] border border-[#C5E3CE] shadow-2xs transition-colors shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
