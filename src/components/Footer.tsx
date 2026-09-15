import React from "react";
import { useBrand } from "../context/BrandContext";
import { Instagram, MessageCircle, Phone, Mail, Sparkles, MapPin, Clock } from "lucide-react";
import { buildWhatsAppInquiryUrl } from "../config/brand";
import { PageId } from "./Navbar";

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onNavigateFaq: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onNavigateFaq }) => {
  const { config } = useBrand();

  const whatsappInquiryUrl = buildWhatsAppInquiryUrl(config);
  const cleanPhone = config.phoneNumber.replace(/[^0-9+]/g, "");

  const priceDisplay = config.startingPrice.toString().startsWith("₹") 
    ? config.startingPrice 
    : `₹${config.startingPrice}`;

  return (
    <footer className="bg-[#1C1917] text-[#E8E2D9] pt-14 pb-12 border-t border-[#2B2825]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2E2A27]">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {config.brandName || "MomentPress"}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A85A3C]"></span>
            </div>
            
            <p className="text-sm font-serif italic text-[#C5BDB2]">
              {config.tagline}
            </p>

            <p className="text-xs text-[#9E9589] max-w-sm leading-relaxed">
              Personalized wooden photo frames made around your favorite moments. You send us your photos and idea — we create the design for you. Starting from just {priceDisplay}.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-[#9E9589]">
              <Clock className="w-3.5 h-3.5 text-[#A85A3C]" />
              <span>Available Mon–Sat: 10:00 AM – 7:00 PM</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#B3AAA0]">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("gallery")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateFaq}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => onNavigate("order")}
                  className="text-[#EADBCE] font-semibold hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#A85A3C]" />
                  <span>Create Your Frame</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Assurances */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              Policies & Terms
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#B3AAA0]">
              <li>
                <button
                  onClick={() => onNavigate("privacy")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("terms")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("refund")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cancellation, Refund & Replacement
                </button>
              </li>
            </ul>

            <div className="pt-2 text-xs text-[#9E9589] space-y-1">
              <p>• {config.paymentTerms}</p>
              <p>• Up to {config.freeRevisions || 2} free revisions included</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              Contact & Orders
            </h4>
            
            <div className="space-y-2 text-xs sm:text-sm text-[#B3AAA0]">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: {config.whatsappDisplay}</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#EADBCE]" />
                <span>Call: {config.phoneNumber}</span>
              </a>

              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#EADBCE]" />
                <span>{config.email}</span>
              </a>

              {config.instagramUrl && (
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#E1306C] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>Instagram: {config.instagramHandle}</span>
                </a>
              )}

              <div className="flex items-start gap-2 pt-1 text-xs text-[#9E9589]">
                <MapPin className="w-4 h-4 text-[#A85A3C] shrink-0 mt-0.5" />
                <span>{config.deliveryInfo} ({config.serviceArea})</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C827A]">
          <p>© {new Date().getFullYear()} {config.brandName || "MomentPress"}. Handcrafted Personalized Photo Frames.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate("privacy")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate("terms")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate("refund")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cancellation & Replacement
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
