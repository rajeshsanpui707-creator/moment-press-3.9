import React, { useState, useEffect } from "react";
import { BrandProvider } from "./context/BrandContext";
import { Navbar, PageId } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WhatWeOffer } from "./components/WhatWeOffer";
import { HowItWorks } from "./components/HowItWorks";
import { PricingSection } from "./components/PricingSection";
import { FaqSection } from "./components/FaqSection";
import { FinalCta } from "./components/FinalCta";
import { OrderPage } from "./components/OrderPage";
import { OurWorkPage } from "./components/OurWorkPage";
import { ContactSection } from "./components/ContactSection";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsConditions } from "./components/TermsConditions";
import { RefundPolicy } from "./components/RefundPolicy";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { Home, Image as ImageIcon, Sparkles, Phone, ArrowLeft } from "lucide-react";

function MainContent() {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("Couple");

  // Read URL hash on load & hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("create") || hash.includes("order")) {
        setCurrentPage("order");
      } else if (hash.includes("our-work") || hash.includes("work") || hash.includes("gallery")) {
        setCurrentPage("gallery");
      } else if (hash.includes("contact")) {
        setCurrentPage("contact");
      } else if (hash.includes("privacy")) {
        setCurrentPage("privacy");
      } else if (hash.includes("terms")) {
        setCurrentPage("terms");
      } else if (hash.includes("refund") || hash.includes("cancellation")) {
        setCurrentPage("refund");
      } else if (hash.includes("faq")) {
        setCurrentPage("home");
        setTimeout(() => {
          document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        setCurrentPage("home");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (page: PageId, category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentPage(page);

    // Update URL hash smoothly
    if (page === "home") window.location.hash = "";
    else if (page === "gallery") window.location.hash = "gallery";
    else if (page === "order") window.location.hash = "create";
    else if (page === "contact") window.location.hash = "contact";
    else if (page === "faq") window.location.hash = "faq";
    else if (page === "privacy") window.location.hash = "privacy";
    else if (page === "terms") window.location.hash = "terms";
    else if (page === "refund") window.location.hash = "refund";

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateFaq = () => {
    if (currentPage === "home") {
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
    } else {
      setCurrentPage("home");
      window.location.hash = "faq";
      setTimeout(() => {
        document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] selection:bg-[#EADBCE] pb-16 md:pb-0">
      
      {/* 1. Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onNavigateFaq={handleNavigateFaq}
      />

      {/* 2. Page Content Rendered Based on Active Route */}
      <main className="flex-1">
        {currentPage === "home" && (
          <>
            {/* Hero Section */}
            <Hero
              onOpenOrder={() => navigateTo("order")}
              onViewWork={() => navigateTo("gallery")}
            />

            {/* 1. What We Offer (3 services) */}
            <WhatWeOffer />

            {/* 2. How It Works (6 steps) */}
            <HowItWorks />

            {/* 3. Pricing & Discount Highlights */}
            <PricingSection onOpenOrder={() => navigateTo("order")} />

            {/* 4. Frequently Asked Questions */}
            <FaqSection />

            {/* 5. Final CTA */}
            <FinalCta
              onOpenOrder={() => navigateTo("order")}
            />
          </>
        )}

        {currentPage === "gallery" && (
          <OurWorkPage
            onOpenOrder={(category) => navigateTo("order", category)}
          />
        )}

        {currentPage === "order" && (
          <OrderPage
            initialCategory={selectedCategory}
            onNavigateHome={() => navigateTo("home")}
          />
        )}

        {currentPage === "contact" && (
          <ContactSection
            isStandalone={true}
            onBack={() => navigateTo("home")}
          />
        )}

        {currentPage === "faq" && (
          <div className="py-12 bg-[#FAF8F5] min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <button
                onClick={() => navigateTo("home")}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B635B] hover:text-[#1C1917] mb-6 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
              <FaqSection />
            </div>
          </div>
        )}

        {currentPage === "privacy" && (
          <PrivacyPolicy onBack={() => navigateTo("home")} />
        )}

        {currentPage === "terms" && (
          <TermsConditions onBack={() => navigateTo("home")} />
        )}

        {currentPage === "refund" && (
          <RefundPolicy onBack={() => navigateTo("home")} />
        )}
      </main>

      {/* 3. Footer */}
      <Footer
        onNavigate={navigateTo}
        onNavigateFaq={handleNavigateFaq}
      />

      {/* Floating WhatsApp CTA */}
      <WhatsAppButton />

      {/* Mobile Bottom Quick Navigation Bar */}
      <nav aria-label="Mobile quick navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#E8E2D9] px-6 py-2 flex items-center justify-between shadow-lg">
        <button
          onClick={() => navigateTo("home")}
          className={`flex flex-col items-center gap-1 cursor-pointer ${
            currentPage === "home" ? "text-[#A85A3C] font-semibold" : "text-[#78716C]"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => navigateTo("gallery")}
          className={`flex flex-col items-center gap-1 cursor-pointer ${
            currentPage === "gallery" ? "text-[#A85A3C] font-semibold" : "text-[#78716C]"
          }`}
        >
          <ImageIcon className="w-5 h-5" />
          <span className="text-[10px]">Gallery</span>
        </button>

        <button
          onClick={() => navigateTo("contact")}
          className={`flex flex-col items-center gap-1 cursor-pointer ${
            currentPage === "contact" ? "text-[#A85A3C] font-semibold" : "text-[#78716C]"
          }`}
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px]">Contact</span>
        </button>

        <button
          onClick={() => navigateTo("order")}
          className="flex flex-col items-center gap-1 text-[#8C4629] font-bold cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-[#1C1917] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#EADBCE]" />
          </div>
          <span className="text-[10px] font-bold text-[#1C1917]">Create</span>
        </button>
      </nav>

    </div>
  );
}

export default function App() {
  return (
    <BrandProvider>
      <MainContent />
    </BrandProvider>
  );
}
