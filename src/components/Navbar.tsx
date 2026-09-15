import React, { useState } from "react";
import { useBrand } from "../context/BrandContext";
import { buildWhatsAppInquiryUrl } from "../config/brand";
import { Menu, X, MessageCircle, Sparkles } from "lucide-react";

export type PageId = 
  | "home" 
  | "gallery" 
  | "order" 
  | "contact" 
  | "faq" 
  | "privacy" 
  | "terms" 
  | "refund";

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, category?: string) => void;
  onNavigateFaq: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onNavigateFaq,
}) => {
  const { config } = useBrand();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappInquiryUrl = buildWhatsAppInquiryUrl(config);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleFaqClick = () => {
    onNavigateFaq();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick("home")}
              className="text-left group flex items-baseline gap-1.5 focus:outline-none cursor-pointer"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917] group-hover:text-[#A85A3C] transition-colors">
                {config.brandName || "MomentPress"}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A85A3C]"></span>
            </button>
            <span className="hidden xl:inline-block text-xs uppercase tracking-widest text-[#78716C] border-l border-[#D6CEC3] pl-3">
              Personalized Wooden Frames
            </span>
          </div>

          {/* Desktop Navigation Menu: Home | Gallery | FAQ | Contact */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            <button
              onClick={() => handleNavClick("home")}
              className={`px-3.5 py-1.5 text-sm font-medium transition-colors rounded-full cursor-pointer ${
                currentPage === "home"
                  ? "text-[#A85A3C] bg-[#EADBCE]/50 font-semibold"
                  : "text-[#44403C] hover:text-[#1C1917] hover:bg-[#F2ECE4]"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick("gallery")}
              className={`px-3.5 py-1.5 text-sm font-medium transition-colors rounded-full cursor-pointer ${
                currentPage === "gallery"
                  ? "text-[#A85A3C] bg-[#EADBCE]/50 font-semibold"
                  : "text-[#44403C] hover:text-[#1C1917] hover:bg-[#F2ECE4]"
              }`}
            >
              Gallery
            </button>

            <button
              onClick={handleFaqClick}
              className={`px-3.5 py-1.5 text-sm font-medium transition-colors rounded-full cursor-pointer ${
                currentPage === "faq"
                  ? "text-[#A85A3C] bg-[#EADBCE]/50 font-semibold"
                  : "text-[#44403C] hover:text-[#1C1917] hover:bg-[#F2ECE4]"
              }`}
            >
              FAQ
            </button>

            <button
              onClick={() => handleNavClick("contact")}
              className={`px-3.5 py-1.5 text-sm font-medium transition-colors rounded-full cursor-pointer ${
                currentPage === "contact"
                  ? "text-[#A85A3C] bg-[#EADBCE]/50 font-semibold"
                  : "text-[#44403C] hover:text-[#1C1917] hover:bg-[#F2ECE4]"
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs: WhatsApp Us | Create Your Frame */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* WhatsApp Us */}
            <a
              id="navbar-whatsapp-link"
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#2E6038] bg-[#E8F3EB] hover:bg-[#DDF0E2] border border-[#C5E3CE] rounded-full transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>

            {/* Main Highlighted Button: Create Your Frame */}
            <button
              id="navbar-create-frame-btn"
              onClick={() => handleNavClick("order")}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer shadow-sm hover:shadow active:scale-95 ${
                currentPage === "order"
                  ? "text-white bg-[#A85A3C] ring-2 ring-[#A85A3C]/40"
                  : "text-white bg-[#1C1917] hover:bg-[#8C4629]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EADBCE]" />
              <span>Create Your Frame</span>
            </button>
          </div>

          {/* Mobile hamburger & quick button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => handleNavClick("order")}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1C1917] rounded-full cursor-pointer"
            >
              Create
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#292524] hover:bg-[#EFE9DF] rounded-lg transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D9] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1 pb-3 border-b border-[#E8E2D9]">
            <button
              onClick={() => handleNavClick("home")}
              className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === "home" ? "bg-[#EFE9DF] font-semibold text-[#1C1917]" : "text-[#292524]"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("gallery")}
              className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === "gallery" ? "bg-[#EFE9DF] font-semibold text-[#1C1917]" : "text-[#292524]"
              }`}
            >
              Gallery
            </button>
            <button
              onClick={handleFaqClick}
              className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === "faq" ? "bg-[#EFE9DF] font-semibold text-[#1C1917]" : "text-[#292524]"
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === "contact" ? "bg-[#EFE9DF] font-semibold text-[#1C1917]" : "text-[#292524]"
              }`}
            >
              Contact
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleNavClick("order")}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#1C1917] rounded-xl shadow-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#EADBCE]" />
              <span>Create Your Frame</span>
            </button>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-[#2E6038] bg-[#E8F3EB] border border-[#C5E3CE] rounded-xl cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
