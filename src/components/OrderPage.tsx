import React, { useState, useEffect } from "react";
import { useBrand } from "../context/BrandContext";
import { 
  buildWhatsAppSendPhotosUrl, 
  buildWhatsAppInquiryUrl 
} from "../config/brand";
import { submitOrderToGoogleSheets } from "../lib/googleSheets";
import { 
  MessageCircle, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck,
  Send,
  AlertCircle,
  Tag,
  Info,
  Copy,
  Check,
  MapPin
} from "lucide-react";

interface OrderPageProps {
  initialCategory?: string;
  onNavigateHome?: () => void;
}

export interface OrderSubmissionData {
  orderId: string;
  name: string;
  whatsapp: string;
  category: string;
  sizePreference: string;
  quality: "Normal" | "Best";
  quantity: number;
  requirements: string;
  location: string;
  submittedAt: string;
}

export const OrderPage: React.FC<OrderPageProps> = ({ initialCategory, onNavigateHome }) => {
  const { config } = useBrand();

  const categories = [
    "Couple",
    "Birthday",
    "Education",
    "Teacher's Day",
    "Family",
    "Friendship",
    "Anniversary",
    "Islamic",
    "Achievement",
    "Memories",
    "Custom",
  ];

  const sizeOptions = [
    "Small",
    "Medium",
    "Big",
    "Not Sure — Recommend a Size",
  ];

  // Form states
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [category, setCategory] = useState(initialCategory || "Couple");
  const [sizePreference, setSizePreference] = useState("Medium");
  const [quality, setQuality] = useState<"Normal" | "Best">("Best");
  const [quantity, setQuantity] = useState(1);
  const [requirements, setRequirements] = useState("");
  const [location, setLocation] = useState("");

  // Validation error state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Submission state
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<OrderSubmissionData | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  // Sync category if passed
  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  // Generate unique Order ID in the format MP-XXXX
  const generateOrderId = (): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `MP-${randomNum}`;
  };

  // Form Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Please enter your name (at least 2 letters).";
    }

    const cleanPhone = whatsapp.replace(/[^0-9]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.whatsapp = "Please enter a valid 10-digit WhatsApp phone number.";
    }

    if (!location.trim() || location.trim().length < 3) {
      newErrors.location = "Please enter your delivery location (City, State, PIN Code).";
    }

    if (quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    const generatedId = generateOrderId();

    const orderPayload: OrderSubmissionData = {
      orderId: generatedId,
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      category,
      sizePreference,
      quality,
      quantity,
      requirements: requirements.trim(),
      location: location.trim(),
      submittedAt: new Date().toISOString(),
    };

    // Submit the order to Google Sheets
    const result = await submitOrderToGoogleSheets({
      order_id: generatedId,
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      category,
      size_preference: sizePreference,
      quality,
      quantity,
      requirements: requirements.trim(),
      location: location.trim(),
      status: "pending",
    });

    if (!result.success) {
      console.error("Failed to submit order to Google Sheets:", result.message);
      setSubmissionError(
        result.message || "Unable to submit your order right now. Please check your internet connection or reach out on WhatsApp."
      );
      setIsSubmitting(false);
      return;
    }

    // Advance to confirmation screen ONLY when Google Sheets submission succeeded
    setSubmittedOrder(orderPayload);
    setIsSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setSubmittedOrder(null);
    setSubmissionError(null);
    setName("");
    setWhatsapp("");
    setRequirements("");
    setLocation("");
    setQuantity(1);
    setErrors({});
    setCopiedOrderId(false);
  };

  const handleCopyOrderId = () => {
    if (submittedOrder?.orderId) {
      navigator.clipboard.writeText(submittedOrder.orderId);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
  };

  const whatsappInquiryUrl = buildWhatsAppInquiryUrl(config);

  // Success screen WhatsApp URL with Order ID and Name pre-filled
  const whatsappSendPhotosUrl = submittedOrder
    ? buildWhatsAppSendPhotosUrl(config, {
        orderId: submittedOrder.orderId,
        name: submittedOrder.name,
      })
    : buildWhatsAppSendPhotosUrl(config);

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE9DF] border border-[#DDD5C9] text-xs font-medium text-[#6B635B]">
            <Sparkles className="w-3.5 h-3.5 text-[#A85A3C]" />
            <span>Personalized Design Request</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            Create Your Frame
          </h1>

          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            Tell us what you have in mind. Send your requirements and preferences — we'll take care of the design.
          </p>

          {/* Pricing transparency note */}
          <div className="pt-2">
            <div className="inline-block p-3 rounded-xl bg-white border border-[#E8E2D9] text-xs text-[#6B635B] shadow-2xs">
              <p className="font-medium text-[#1C1917]">
                Starting from just <span className="text-[#A85A3C] font-bold">₹{config.startingPrice.toString().replace(/^₹/, "") || "99"}</span>
              </p>
              <p className="text-[11px] text-[#78716C] mt-0.5">
                Final pricing depends on size, quality, customization and quantity. Contact us for your exact quotation.
              </p>
            </div>
          </div>
        </div>

        {/* Post-Submission Success View */}
        {submitted && submittedOrder ? (
          <div className="bg-white rounded-3xl border border-[#C5E3CE] p-8 sm:p-10 shadow-lg text-center space-y-6 animate-in fade-in-50 duration-300">
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-[#E8F3EB] text-[#2E6038] flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle className="w-9 h-9" />
            </div>

            {/* Success Header */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                Request Received!
              </h2>

              {/* Prominent Order ID */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#FAF3EC] border border-[#E4CEBD] text-[#8C4629] shadow-2xs">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#A85A3C]">Order ID:</span>
                <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-[#1C1917]">
                  {submittedOrder.orderId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyOrderId}
                  className="ml-1.5 p-1.5 rounded-lg text-[#8C4629] hover:bg-[#F3E2D3] transition-colors cursor-pointer"
                  title="Copy Order ID"
                  aria-label="Copy Order ID"
                >
                  {copiedOrderId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Instructions */}
              <p className="text-sm sm:text-base text-[#57534E] max-w-md mx-auto leading-relaxed pt-1">
                Please send your photos on WhatsApp using the button below. Mention your Order ID so we can match your photos with your request.
              </p>
            </div>

            {/* Prominent WhatsApp Button */}
            <div className="pt-2 max-w-md mx-auto space-y-2.5">
              <a
                id="order-confirm-send-photos-btn"
                href={whatsappSendPhotosUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full px-6 py-4 text-base font-semibold text-white bg-[#2E6038] hover:bg-[#244E2E] active:scale-98 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Send Photos on WhatsApp</span>
              </a>

              <p className="text-[11px] text-[#78716C]">
                WhatsApp: <span className="font-semibold text-[#1C1917]">+91 79808 55821</span> • Send your photos with Order ID: <span className="font-mono font-bold text-[#1C1917]">{submittedOrder.orderId}</span>
              </p>
            </div>

            {/* Request Summary Snapshot */}
            <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#E8E2D9] text-left text-xs sm:text-sm space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between pb-1.5 border-b border-[#E8E2D9]">
                <span className="text-[#78716C]">Order ID:</span>
                <span className="font-mono font-bold text-[#1C1917]">{submittedOrder.orderId}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#E8E2D9]">
                <span className="text-[#78716C]">Name:</span>
                <span className="font-semibold text-[#1C1917]">{submittedOrder.name}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#E8E2D9]">
                <span className="text-[#78716C]">WhatsApp:</span>
                <span className="font-semibold text-[#1C1917]">{submittedOrder.whatsapp}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#E8E2D9]">
                <span className="text-[#78716C]">Category:</span>
                <span className="font-semibold text-[#A85A3C]">{submittedOrder.category}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#E8E2D9]">
                <span className="text-[#78716C]">Size Preference:</span>
                <span className="font-semibold text-[#1C1917]">{submittedOrder.sizePreference}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#E8E2D9]">
                <span className="text-[#78716C]">Print Quality:</span>
                <span className="font-semibold text-[#1C1917]">{submittedOrder.quality} Quality</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#E8E2D9]">
                <span className="text-[#78716C]">Quantity:</span>
                <span className="font-semibold text-[#1C1917]">
                  {submittedOrder.quantity} {submittedOrder.quantity >= 2 && <span className="text-[#8C4629] font-bold text-xs">(10% OFF applied)</span>}
                </span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#E8E2D9]">
                <span className="text-[#78716C]">Delivery Location:</span>
                <span className="font-semibold text-[#1C1917] text-right">{submittedOrder.location}</span>
              </div>
              {submittedOrder.requirements && (
                <div className="pt-1">
                  <span className="text-[#78716C] block mb-0.5">Notes:</span>
                  <p className="text-[#1C1917] bg-white p-2.5 rounded-lg border border-[#E8E2D9] text-xs leading-relaxed">
                    {submittedOrder.requirements}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={handleResetForm}
                className="text-xs font-semibold text-[#6B635B] hover:text-[#1C1917] underline cursor-pointer"
              >
                Submit another request
              </button>
              {onNavigateHome && (
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="text-xs font-semibold text-[#A85A3C] hover:underline cursor-pointer"
                >
                  Return to Home
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Main Order Form */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-3xl border border-[#E8E2D9] p-6 sm:p-8 lg:p-10 shadow-sm space-y-6"
          >
            {/* Quick WhatsApp contact option */}
            <div className="p-4 rounded-2xl bg-[#E8F3EB] border border-[#C5E3CE] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-[#1C1917]">
                  Prefer chatting directly on WhatsApp?
                </p>
                <p className="text-xs text-[#4F6E55]">
                  You can send your photos and idea straight to our WhatsApp chat.
                </p>
              </div>
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#2E6038] bg-white border border-[#C5E3CE] rounded-full shadow-2xs hover:bg-[#DDF0E2] transition-colors shrink-0 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Field 1 & 2: Name & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="order-name" className="block text-xs sm:text-sm font-semibold text-[#1C1917] mb-1.5">
                  1. Your Name <span className="text-[#A85A3C]">*</span>
                </label>
                <input
                  id="order-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  placeholder="e.g. Rajesh Sharma"
                  className={`w-full px-4 py-2.5 bg-[#FAF8F5] border rounded-xl text-sm text-[#1C1917] placeholder:text-[#9E9589] focus:outline-none focus:bg-white transition-all ${
                    errors.name ? "border-red-500 focus:border-red-500" : "border-[#DDD5C9] focus:border-[#A85A3C]"
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="order-whatsapp" className="block text-xs sm:text-sm font-semibold text-[#1C1917] mb-1.5">
                  2. WhatsApp Number <span className="text-[#A85A3C]">*</span>
                </label>
                <input
                  id="order-whatsapp"
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => {
                    setWhatsapp(e.target.value);
                    if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: "" }));
                  }}
                  placeholder="e.g. +91 79808 55821"
                  className={`w-full px-4 py-2.5 bg-[#FAF8F5] border rounded-xl text-sm text-[#1C1917] placeholder:text-[#9E9589] focus:outline-none focus:bg-white transition-all ${
                    errors.whatsapp ? "border-red-500 focus:border-red-500" : "border-[#DDD5C9] focus:border-[#A85A3C]"
                  }`}
                />
                {errors.whatsapp && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.whatsapp}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Field 3 & 4: Category & Size Preference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="order-category" className="block text-xs sm:text-sm font-semibold text-[#1C1917] mb-1.5">
                  3. Category
                </label>
                <select
                  id="order-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C9] rounded-xl text-sm text-[#1C1917] focus:outline-none focus:border-[#A85A3C] focus:bg-white transition-all cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#78716C] mt-1">
                  Helps us understand your occasion and theme.
                </p>
              </div>

              <div>
                <label htmlFor="order-size" className="block text-xs sm:text-sm font-semibold text-[#1C1917] mb-1.5">
                  4. Size Preference
                </label>
                <select
                  id="order-size"
                  value={sizePreference}
                  onChange={(e) => setSizePreference(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C9] rounded-xl text-sm text-[#1C1917] focus:outline-none focus:border-[#A85A3C] focus:bg-white transition-all cursor-pointer"
                >
                  {sizeOptions.map((sz) => (
                    <option key={sz} value={sz}>
                      {sz}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#78716C] mt-1">
                  Final exact size can be confirmed on WhatsApp.
                </p>
              </div>
            </div>

            {/* Field 5 & 6: Quality & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
              {/* Quality options */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1C1917] mb-1.5">
                  5. Quality
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setQuality("Normal")}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      quality === "Normal"
                        ? "bg-[#FAF3EC] border-[#A85A3C] text-[#1C1917]"
                        : "bg-[#FAF8F5] border-[#DDD5C9] text-[#6B635B] hover:bg-white"
                    }`}
                  >
                    <span className="block text-xs font-bold">Normal</span>
                    <span className="block text-[10px] text-[#78716C] mt-0.5">Standard print quality</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setQuality("Best")}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      quality === "Best"
                        ? "bg-[#FAF3EC] border-[#A85A3C] text-[#1C1917] ring-1 ring-[#A85A3C]"
                        : "bg-[#FAF8F5] border-[#DDD5C9] text-[#6B635B] hover:bg-white"
                    }`}
                  >
                    <span className="block text-xs font-bold text-[#A85A3C]">Best</span>
                    <span className="block text-[10px] text-[#78716C] mt-0.5">Higher-quality print</span>
                  </button>
                </div>
              </div>

              {/* Quantity field */}
              <div>
                <label htmlFor="order-quantity" className="block text-xs sm:text-sm font-semibold text-[#1C1917] mb-1.5">
                  6. Quantity
                </label>
                <input
                  id="order-quantity"
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => {
                    const val = Math.max(1, parseInt(e.target.value) || 1);
                    setQuantity(val);
                  }}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#DDD5C9] rounded-xl text-sm text-[#1C1917] focus:outline-none focus:border-[#A85A3C] focus:bg-white transition-all"
                />

                {/* 10% OFF Note if quantity >= 2 */}
                {quantity >= 2 ? (
                  <div className="mt-1.5 p-2 rounded-lg bg-[#FAF3EC] border border-[#E4CEBD] flex items-center gap-1.5 text-xs text-[#8C4629] font-medium animate-in fade-in duration-200">
                    <Tag className="w-3.5 h-3.5 text-[#A85A3C]" />
                    <span>You qualify for {config.discountPercent}% OFF.</span>
                  </div>
                ) : (
                  <p className="text-[11px] text-[#78716C] mt-1">
                    Order 2 or more frames to get 10% OFF.
                  </p>
                )}
              </div>
            </div>

            {/* Field 7: Tell Us What You Want */}
            <div>
              <label htmlFor="order-requirements" className="block text-xs sm:text-sm font-semibold text-[#1C1917] mb-1.5">
                7. Tell Us What You Want
              </label>
              <textarea
                id="order-requirements"
                rows={4}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Tell us about your occasion, preferred style, text, number of photos, colours, layout or anything else you want."
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD5C9] rounded-xl text-sm text-[#1C1917] placeholder:text-[#9E9589] focus:outline-none focus:border-[#A85A3C] focus:bg-white transition-all"
              />
            </div>

            {/* Field 8: Delivery Location */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="order-location" className="block text-xs sm:text-sm font-semibold text-[#1C1917]">
                  8. Delivery Location <span className="text-[#A85A3C]">*</span>
                </label>
                <span className="text-[11px] text-[#78716C] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#A85A3C]" />
                  <span>Delivery across All India</span>
                </span>
              </div>
              <input
                id="order-location"
                type="text"
                required
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errors.location) setErrors((prev) => ({ ...prev, location: "" }));
                }}
                placeholder="City, State, PIN Code"
                className={`w-full px-4 py-2.5 bg-[#FAF8F5] border rounded-xl text-sm text-[#1C1917] placeholder:text-[#9E9589] focus:outline-none focus:bg-white transition-all ${
                  errors.location ? "border-red-500 focus:border-red-500" : "border-[#DDD5C9] focus:border-[#A85A3C]"
                }`}
              />
              {errors.location && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.location}</span>
                </p>
              )}
            </div>

            {/* Photos Notice */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#E8F3EB] text-[#2E6038] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-[#1C1917]">
                  Photos: Send on WhatsApp after submission
                </h3>
              </div>
              <p className="text-xs text-[#57534E] leading-relaxed pl-9.5">
                After submitting your request, you will receive an <strong>Order ID</strong> and instructions to send your photos directly to us on WhatsApp.
              </p>
            </div>

            {/* Pricing transparency note before submit */}
            <div className="p-3.5 rounded-xl bg-[#FAF3EC] border border-[#E4CEBD] text-xs text-[#8C4629] space-y-0.5">
              <p className="font-semibold">
                Starting from just ₹{config.startingPrice.toString().replace(/^₹/, "") || "99"}
              </p>
              <p className="text-[11px] text-[#A85A3C]">
                Final pricing depends on size, quality, customization and quantity. Contact us for your exact quotation. Handcrafted wooden frames delivered across India.
              </p>
            </div>

            {/* Submission Error Banner */}
            {submissionError && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-red-900">Submission Error</p>
                  <p className="leading-relaxed">{submissionError}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                id="order-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 text-sm sm:text-base font-semibold text-white bg-[#1C1917] hover:bg-[#8C4629] active:scale-98 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generating Order ID...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Request & Get Order ID</span>
                  </>
                )}
              </button>
            </div>

            {/* Assurance footer */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-[#78716C] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Up to 2 free revisions included • 50% advance upon final design confirmation</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
