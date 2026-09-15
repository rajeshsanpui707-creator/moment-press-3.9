import React, { useState, useEffect, useRef } from "react";
import { useBrand } from "../context/BrandContext";
import { buildWhatsAppOrderUrl, buildWhatsAppInquiryUrl } from "../config/brand";
import { CATEGORIES } from "../data/categories";
import { 
  UploadCloud, 
  Image as ImageIcon, 
  X, 
  MessageCircle, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Send
} from "lucide-react";

interface CustomOrderSectionProps {
  selectedCategory?: string;
  selectedSize?: string;
}

export const CustomOrderSection: React.FC<CustomOrderSectionProps> = ({
  selectedCategory,
  selectedSize,
}) => {
  const { config } = useBrand();
  const formRef = useRef<HTMLDivElement>(null);

  // Form states
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [category, setCategory] = useState(selectedCategory || "Couple");
  const [frameSize, setFrameSize] = useState(selectedSize || "A4 Frame");
  const [quantity, setQuantity] = useState(1);
  const [requirements, setRequirements] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState<{ id: string; name: string; url: string }[]>([]);
  const [referenceImage, setReferenceImage] = useState<{ name: string; url: string } | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update category when prop changes
  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSize) {
      setFrameSize(selectedSize);
    }
  }, [selectedSize]);

  // Handle Photo file selection (multi-file)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files: File[] = Array.from(e.target.files);

    const newPhotos = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  // Handle Reference Image selection (optional single file)
  const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setReferenceImage({
      name: file.name,
      url: URL.createObjectURL(file),
    });
  };

  const removeReference = () => {
    setReferenceImage(null);
  };

  // Generate WhatsApp order URL
  const whatsappOrderUrl = buildWhatsAppOrderUrl(config, {
    name,
    category,
    sizePreference: frameSize,
    quantity,
    requirements: requirements || "Custom collage with my photos",
    location,
  });

  const whatsappInquiryUrl = buildWhatsAppInquiryUrl(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean local submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setName("");
    setWhatsapp("");
    setRequirements("");
    setPhotos([]);
    setReferenceImage(null);
    setQuantity(1);
  };

  return (
    <section id="order" className="py-20 lg:py-28 bg-[#FAF8F5] relative scroll-mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={formRef}>
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EADBCE] text-xs font-semibold text-[#8C4629]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom Order</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            Let's Create Your Memory
          </h2>
          <p className="text-base text-[#6B635B]">
            Tell us about your moment. We will prepare a design preview and discuss everything with you on WhatsApp before printing.
          </p>
        </div>

        {/* WhatsApp Direct Option Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-[#E8F3EB] border border-[#C5E3CE] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#2E6038] text-white flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1C1917]">
                Prefer to order directly via WhatsApp?
              </p>
              <p className="text-xs text-[#44403C]">
                You can chat with us and send your photos straight on WhatsApp anytime.
              </p>
            </div>
          </div>
          <a
            id="order-section-wa-banner-btn"
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2E6038] hover:bg-[#234b2c] rounded-full transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Order Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D9] shadow-sm">
          
          {submitted ? (
            /* Success State */
            <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-[#E8F3EB] text-[#2E6038] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                  Thank you!
                </h3>
                <p className="text-base text-[#44403C] font-medium">
                  We'll contact you on WhatsApp to confirm your order and price.
                </p>
                <p className="text-xs text-[#78716C] pt-2">
                  Our designer will review your requirements and send a free digital proof.
                </p>
              </div>

              {/* Instant WhatsApp Hand-off Option */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  id="order-submitted-wa-btn"
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#2E6038] hover:bg-[#234b2c] rounded-full shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Details on WhatsApp Now</span>
                </a>

                <button
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-6 py-3.5 text-xs font-medium text-[#78716C] hover:text-[#1C1917] bg-[#FAF8F5] hover:bg-[#F2ECE4] rounded-full transition-colors cursor-pointer"
                >
                  Place Another Request
                </button>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name & WhatsApp Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="order-name" className="block text-xs font-bold text-[#1C1917]">
                    Your Name <span className="text-[#A85A3C]">*</span>
                  </label>
                  <input
                    id="order-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#DDD5C9] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A85A3C]/30 focus:border-[#A85A3C] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="order-whatsapp" className="block text-xs font-bold text-[#1C1917]">
                    WhatsApp Number <span className="text-[#A85A3C]">*</span>
                  </label>
                  <input
                    id="order-whatsapp"
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#DDD5C9] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A85A3C]/30 focus:border-[#A85A3C] transition-all"
                  />
                  <p className="text-[11px] text-[#78716C]">
                    We will send the design proof directly to this number.
                  </p>
                </div>
              </div>

              {/* Row 2: Category, Frame Size, Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="order-category" className="block text-xs font-bold text-[#1C1917]">
                    Category <span className="text-[#A85A3C]">*</span>
                  </label>
                  <select
                    id="order-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#DDD5C9] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A85A3C]/30 focus:border-[#A85A3C] transition-all cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.title}>
                        {cat.emoji} {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="order-framesize" className="block text-xs font-bold text-[#1C1917]">
                    Frame Size <span className="text-[#A85A3C]">*</span>
                  </label>
                  <select
                    id="order-framesize"
                    value={frameSize}
                    onChange={(e) => setFrameSize(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#DDD5C9] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A85A3C]/30 focus:border-[#A85A3C] transition-all cursor-pointer"
                  >
                    <option value="A4 Frame">A4 Frame (8.3 × 11.7 in) — Most Popular</option>
                    <option value="A3 Frame">A3 Frame (11.7 × 16.5 in) — Statement</option>
                    <option value="Square Frame">Square Frame (8 × 8 in / 10 × 10 in)</option>
                    <option value="Custom Size">Custom Dimensions (specify below)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="order-quantity" className="block text-xs font-bold text-[#1C1917]">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <input
                      id="order-quantity"
                      type="number"
                      min="1"
                      max="50"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-[#DDD5C9] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A85A3C]/30 focus:border-[#A85A3C] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Your Requirements */}
              <div className="space-y-1.5">
                <label htmlFor="order-requirements" className="block text-xs font-bold text-[#1C1917]">
                  Your Requirements <span className="text-[#A85A3C]">*</span>
                </label>
                <textarea
                  id="order-requirements"
                  required
                  rows={4}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Tell us what you want — for example: 5 photos, names, date, simple background, birthday theme, etc."
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#DDD5C9] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A85A3C]/30 focus:border-[#A85A3C] transition-all"
                />
              </div>

              {/* Row 4: Photo Upload & Reference Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Photos Upload */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#1C1917]">
                    Photo Upload
                  </label>
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#DDD5C9] hover:border-[#A85A3C] bg-[#FAF8F5] hover:bg-white rounded-2xl cursor-pointer transition-all">
                    <UploadCloud className="w-7 h-7 text-[#A85A3C] mb-1.5" />
                    <span className="text-xs font-semibold text-[#1C1917]">Click to select photos</span>
                    <span className="text-[11px] text-[#78716C] mt-0.5">JPG, PNG, HEIC from your camera roll</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Thumbnail previews */}
                  {photos.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {photos.map((p) => (
                        <div key={p.id} className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#DDD5C9] group">
                          <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(p.id)}
                            className="absolute top-0.5 right-0.5 p-0.5 bg-black/60 text-white rounded-full hover:bg-red-600 transition-colors"
                            aria-label="Remove photo"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <span className="text-[11px] text-[#78716C] self-center">
                        {photos.length} photo{photos.length > 1 ? "s" : ""} selected
                      </span>
                    </div>
                  )}
                </div>

                {/* Reference Image (Optional) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#1C1917]">
                    Reference Image <span className="text-[#78716C] font-normal">(optional)</span>
                  </label>
                  {referenceImage ? (
                    <div className="relative p-3 rounded-xl border border-[#DDD5C9] bg-[#FAF8F5] flex items-center justify-between">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <img src={referenceImage.url} alt="Reference" className="w-10 h-10 rounded object-cover shrink-0" />
                        <span className="text-xs text-[#1C1917] truncate">{referenceImage.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeReference}
                        className="p-1 text-[#78716C] hover:text-red-600"
                        aria-label="Remove reference"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-4 border border-dashed border-[#DDD5C9] hover:border-[#A85A3C] bg-[#FAF8F5] hover:bg-white rounded-2xl cursor-pointer transition-all">
                      <ImageIcon className="w-6 h-6 text-[#78716C] mb-1.5" />
                      <span className="text-xs font-medium text-[#44403C]">Have a design or layout reference?</span>
                      <span className="text-[11px] text-[#78716C] mt-0.5">Upload a screenshot or reference photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleReferenceUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

              </div>

              {/* Row 5: Location */}
              <div className="space-y-1.5">
                <label htmlFor="order-location" className="block text-xs font-bold text-[#1C1917]">
                  Delivery Location / City
                </label>
                <input
                  id="order-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Mumbai, Bangalore, Delhi NCR, etc."
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#DDD5C9] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A85A3C]/30 focus:border-[#A85A3C] transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <button
                  id="submit-order-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-[#1C1917] hover:bg-[#8C4629] rounded-full shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#EADBCE]" />
                  <span>{isSubmitting ? "Submitting..." : "Submit Order Request"}</span>
                </button>

                <a
                  id="order-via-whatsapp-btn"
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-[#2E6038] bg-[#E8F3EB] hover:bg-[#DDF0E2] border border-[#C5E3CE] rounded-full shadow-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-[#2E6038]/20" />
                  <span>Order via WhatsApp</span>
                </a>
              </div>

              {/* Trust reassurance note */}
              <div className="pt-2 text-center">
                <p className="text-xs text-[#78716C] inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#A85A3C]" />
                  <span>No upfront payment required. You only pay after approving the design proof.</span>
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
