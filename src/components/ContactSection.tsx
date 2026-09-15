import React from "react";
import { useBrand } from "../context/BrandContext";
import { buildWhatsAppInquiryUrl } from "../config/brand";
import { MessageCircle, Phone, Mail, Instagram, MapPin, ArrowRight, ArrowLeft } from "lucide-react";

interface ContactSectionProps {
  isStandalone?: boolean;
  onBack?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isStandalone = false, onBack }) => {
  const { config } = useBrand();
  const whatsappUrl = buildWhatsAppInquiryUrl(config);
  const cleanPhone = config.phoneNumber.replace(/[^0-9+]/g, "");

  return (
    <section id="contact" className={`py-16 lg:py-24 bg-[#F5F1EA] ${isStandalone ? "min-h-screen" : "border-t border-[#E8E2D9]"}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {isStandalone && onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B635B] hover:text-[#1C1917] mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        )}

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#A85A3C]">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            Let's Create Something Personal.
          </h2>
          <p className="text-base text-[#6B635B]">
            Whether you have an idea, want to send photos, or have a question about frame sizes and delivery, reach out to us anytime.
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* WhatsApp Card */}
          <a
            id="contact-whatsapp-card"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-6 border border-[#E2DBD1] hover:border-[#25D366] shadow-xs hover:shadow-md transition-all group block"
          >
            <div className="w-12 h-12 rounded-xl bg-[#E8F8EE] text-[#25D366] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6 fill-[#25D366]/20" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
              WhatsApp Direct
            </span>
            <h3 className="font-serif text-lg font-bold text-[#1C1917] mt-1 group-hover:text-[#25D366] transition-colors">
              {config.whatsappDisplay}
            </h3>
            <p className="text-xs text-[#6B635B] mt-1">
              Fastest response for design inquiries and photo sharing.
            </p>
          </a>

          {/* Phone Card */}
          <a
            id="contact-phone-card"
            href={`tel:${cleanPhone}`}
            className="bg-white rounded-2xl p-6 border border-[#E2DBD1] hover:border-[#1C1917] shadow-xs hover:shadow-md transition-all group block"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] text-[#1C1917] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
              Phone Support
            </span>
            <h3 className="font-serif text-lg font-bold text-[#1C1917] mt-1">
              {config.phoneNumber}
            </h3>
            <p className="text-xs text-[#6B635B] mt-1">
              Available 10:00 AM – 7:00 PM (Monday to Saturday)
            </p>
          </a>

          {/* Email Card */}
          <a
            id="contact-email-card"
            href={`mailto:${config.email}`}
            className="bg-white rounded-2xl p-6 border border-[#E2DBD1] hover:border-[#1C1917] shadow-xs hover:shadow-md transition-all group block"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] text-[#1C1917] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
              Email
            </span>
            <h3 className="font-serif text-lg font-bold text-[#1C1917] mt-1">
              {config.email}
            </h3>
            <p className="text-xs text-[#6B635B] mt-1">
              For quotations, requirements and custom inquiries.
            </p>
          </a>

          {/* Instagram Card */}
          <a
            id="contact-instagram-card"
            href={config.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-6 border border-[#E2DBD1] hover:border-[#E1306C] shadow-xs hover:shadow-md transition-all group block"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FDF0F4] text-[#E1306C] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Instagram className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
              Instagram
            </span>
            <h3 className="font-serif text-lg font-bold text-[#1C1917] mt-1 group-hover:text-[#E1306C] transition-colors">
              {config.instagramHandle}
            </h3>
            <p className="text-xs text-[#6B635B] mt-1">
              Check out our latest handcrafted work and creative designs.
            </p>
          </a>

          {/* Delivery & Material Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2DBD1] shadow-xs md:col-span-2 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] text-[#8C4629] flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                Delivery Coverage
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] mt-1">
                {config.deliveryInfo} ({config.serviceArea})
              </h3>
              <p className="text-xs sm:text-sm text-[#6B635B] mt-2 leading-relaxed">
                Handcrafted wooden frames packaged with multi-layer protective materials and delivered safely right to your doorstep across India.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F5F2EB]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8C4629] hover:underline"
              >
                <span>Chat with us on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
