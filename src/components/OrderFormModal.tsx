import React, { useState, useRef, useEffect } from "react";
import { useBrand } from "../context/BrandContext";
import { buildWhatsAppOrderUrl } from "../config/brand";
import {
  X,
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  ArrowRight,
  Info,
  ShieldCheck,
} from "lucide-react";

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  initialProduct?: string;
  initialSize?: string;
}

export const OrderFormModal: React.FC<OrderFormModalProps> = ({
  isOpen,
  onClose,
  initialCategory = "Memories",
  initialProduct = "Personalized A4 Photo Frame",
  initialSize = "A4 (8.3 x 11.7 in)",
}) => {
  const { config } = useBrand();

  // Form State
  const [fullName, setFullName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cityLocation, setCityLocation] = useState("");

  const [productType, setProductType] = useState(initialProduct);
  const [frameSize, setFrameSize] = useState(initialSize);
  const [quantity, setQuantity] = useState<number>(1);
  const [occasion, setOccasion] = useState(initialCategory);
  const [customRequirements, setCustomRequirements] = useState("");
  const [contactMethod, setContactMethod] = useState<"WhatsApp" | "Phone" | "Email">("WhatsApp");

  // Uploaded Photos State
  const [uploadedPhotos, setUploadedPhotos] = useState<{ id: string; name: string; url: string; size: string }[]>([]);
  const [referencePhoto, setReferencePhoto] = useState<{ name: string; url: string } | null>(null);

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const photosInputRef = useRef<HTMLInputElement>(null);
  const refInputRef = useRef<HTMLInputElement>(null);

  // Sync initial props when opened
  useEffect(() => {
    if (isOpen) {
      if (initialCategory) setOccasion(initialCategory);
      if (initialProduct) setProductType(initialProduct);
      if (initialSize) setFrameSize(initialSize);
      setIsSubmitted(false);
      setErrorMsg("");
    }
  }, [isOpen, initialCategory, initialProduct, initialSize]);

  if (!isOpen) return null;

  const handlePhotoFiles = (files: FileList | null) => {
    if (!files) return;
    const newItems: { id: string; name: string; url: string; size: string }[] = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      newItems.push({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        url,
        size: `${sizeMb} MB`,
      });
    });
    setUploadedPhotos((prev) => [...prev, ...newItems]);
  };

  const handleRefFile = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setReferencePhoto({ name: file.name, url });
  };

  const removePhoto = (id: string) => {
    setUploadedPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!whatsappNumber.trim()) {
      setErrorMsg("Please enter your WhatsApp number.");
      return;
    }
    if (!cityLocation.trim()) {
      setErrorMsg("Please enter your city/location for delivery.");
      return;
    }

    setErrorMsg("");
    setIsSubmitted(true);
  };

  const generatedWhatsAppUrl = buildWhatsAppOrderUrl(config, {
    name: fullName,
    category: occasion,
    quantity,
    sizePreference: frameSize,
    requirements: customRequirements || "Custom photo collage layout with custom details",
    location: cityLocation,
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-3xl max-w-3xl w-full border border-[#DDD5C9] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E8E2D9] bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#EADBCE] flex items-center justify-center text-[#8C4629]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                Let's Create Your Memory
              </h2>
              <p className="text-xs text-[#78716C]">
                Customized framing • Zero obligations • Human designer proof
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EFE9DF] text-[#78716C] hover:text-[#1C1917] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Submission Success Screen */}
          {isSubmitted ? (
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-[#E8F8EE] border border-[#B6E5C4] flex items-center justify-center text-[#25D366] mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                  Thank You!
                </h3>
                <p className="text-base text-[#57534E] leading-relaxed">
                  Your request has been received. We'll contact you on WhatsApp to confirm the details and price.
                </p>
              </div>

              {/* Order Summary Recap */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-[#F5F2EB]">
                  <span className="text-[#78716C]">Customer:</span>
                  <span className="font-semibold text-[#1C1917]">{fullName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F5F2EB]">
                  <span className="text-[#78716C]">Product:</span>
                  <span className="font-semibold text-[#1C1917]">{productType} ({frameSize})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F5F2EB]">
                  <span className="text-[#78716C]">Occasion:</span>
                  <span className="font-semibold text-[#1C1917]">{occasion}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F5F2EB]">
                  <span className="text-[#78716C]">Quantity:</span>
                  <span className="font-semibold text-[#1C1917]">{quantity}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F5F2EB]">
                  <span className="text-[#78716C]">Delivery City:</span>
                  <span className="font-semibold text-[#1C1917]">{cityLocation}</span>
                </div>
                {uploadedPhotos.length > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-[#78716C]">Photos Selected:</span>
                    <span className="font-semibold text-[#25D366]">{uploadedPhotos.length} files</span>
                  </div>
                )}
              </div>

              {/* Direct WhatsApp Action as required in #11 */}
              <div className="space-y-3 max-w-md mx-auto pt-2">
                <a
                  href={generatedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span>Continue on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <p className="text-xs text-[#78716C]">
                  Click above to immediately send this order summary directly to {config.brandName} on WhatsApp.
                </p>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="text-xs font-semibold text-[#6B635B] hover:text-[#1C1917] underline cursor-pointer"
                  >
                    Back to website
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* Order Submission Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                  {errorMsg}
                </div>
              )}

              {/* Step 1: Customer Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E8E2D9]">
                  <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white text-xs font-semibold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">
                    Customer Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#44403C] mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rajesh Sanpui"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD5C9] focus:outline-none focus:ring-2 focus:ring-[#1C1917] text-sm text-[#1C1917]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#44403C] mb-1">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD5C9] focus:outline-none focus:ring-2 focus:ring-[#1C1917] text-sm text-[#1C1917]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#44403C] mb-1">
                      Email Address <span className="text-[#8C827A]">(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yourname@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD5C9] focus:outline-none focus:ring-2 focus:ring-[#1C1917] text-sm text-[#1C1917]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#44403C] mb-1">
                      City / Delivery Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={cityLocation}
                      onChange={(e) => setCityLocation(e.target.value)}
                      placeholder="e.g. Mumbai / Bangalore / Kolkata"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD5C9] focus:outline-none focus:ring-2 focus:ring-[#1C1917] text-sm text-[#1C1917]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Product & Occasion */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E8E2D9]">
                  <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white text-xs font-semibold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">
                    Product & Occasion
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#44403C] mb-1">
                      Product Type
                    </label>
                    <select
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD5C9] focus:outline-none focus:ring-2 focus:ring-[#1C1917] text-sm text-[#1C1917] cursor-pointer"
                    >
                      <option value="Personalized A4 Photo Frame">Personalized A4 Photo Frame</option>
                      <option value="Personalized A3 Large Frame">Personalized A3 Large Frame</option>
                      <option value="Square Gallery Frame (8x8)">Square Gallery Frame (8x8 in)</option>
                      <option value="Desktop Mini Frame (4x6)">Desktop Mini Frame (4x6 in)</option>
                      <option value="Custom Archival Canvas Print">Custom Archival Canvas Print</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#44403C] mb-1">
                      Frame Size
                    </label>
                    <select
                      value={frameSize}
                      onChange={(e) => setFrameSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD5C9] focus:outline-none focus:ring-2 focus:ring-[#1C1917] text-sm text-[#1C1917] cursor-pointer"
                    >
                      <option value="A4 (8.3 x 11.7 in)">A4 (8.3 × 11.7 in) — Most Popular</option>
                      <option value="A3 (11.7 x 16.5 in)">A3 (11.7 × 16.5 in) — Statement Size</option>
                      <option value="Square (8 x 8 in)">Square 8 × 8 in</option>
                      <option value="Square (10 x 10 in)">Square 10 × 10 in</option>
                      <option value="Mini (4 x 6 in)">Mini 4 × 6 in Tabletop</option>
                      <option value="Custom Dimensions">Custom / Other Dimension</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#44403C] mb-1">
                      Quantity
                    </label>
                    <div className="flex items-center rounded-xl bg-white border border-[#DDD5C9] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3.5 py-2.5 text-sm font-semibold hover:bg-stone-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center text-sm font-bold text-[#1C1917]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3.5 py-2.5 text-sm font-semibold hover:bg-stone-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Occasion Dropdown */}
                <div>
                  <label className="block text-xs font-medium text-[#44403C] mb-1">
                    Occasion / Theme
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD5C9] focus:outline-none focus:ring-2 focus:ring-[#1C1917] text-sm text-[#1C1917] cursor-pointer"
                  >
                    <option value="Couple & Love">❤️ Couple & Love</option>
                    <option value="Birthday">🎂 Birthday</option>
                    <option value="Education">🎓 Education</option>
                    <option value="Teacher's Day">👩‍🏫 Teacher's Day</option>
                    <option value="Family">👨‍👩‍👧 Family</option>
                    <option value="Friendship">🧑‍🤝‍🧑 Friendship</option>
                    <option value="Anniversary">🎉 Anniversary</option>
                    <option value="Islamic">🕌 Islamic</option>
                    <option value="Achievement">🏆 Achievement</option>
                    <option value="Memories">📸 Memories</option>
                    <option value="Custom">🎁 Custom</option>
                  </select>
                </div>

              </div>

              {/* Step 3: Custom Requirements */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E8E2D9]">
                  <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white text-xs font-semibold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">
                    Custom Requirements
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#44403C] mb-1">
                    Tell us what you want...
                  </label>
                  <textarea
                    rows={3}
                    value={customRequirements}
                    onChange={(e) => setCustomRequirements(e.target.value)}
                    placeholder="5 photos, name in the center, birthday date below, simple elegant background."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD5C9] focus:outline-none focus:ring-2 focus:ring-[#1C1917] text-sm text-[#1C1917]"
                  />
                  <p className="text-[11px] text-[#78716C] mt-1">
                    Include any special quotes, dates, song codes, or aesthetic preferences. You can also tell us directly on WhatsApp.
                  </p>
                </div>
              </div>

              {/* Step 4: Photo Uploads & References */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E8E2D9]">
                  <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white text-xs font-semibold flex items-center justify-center">
                    4
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">
                    Photo Upload
                  </h3>
                </div>

                {/* Multiple Image Drop Area */}
                <div>
                  <div
                    onClick={() => photosInputRef.current?.click()}
                    className="border-2 border-dashed border-[#DDD5C9] hover:border-[#A85A3C] bg-white rounded-2xl p-6 text-center cursor-pointer transition-colors group"
                  >
                    <input
                      ref={photosInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handlePhotoFiles(e.target.files)}
                      className="hidden"
                    />
                    <UploadCloud className="w-8 h-8 text-[#8C827A] group-hover:text-[#A85A3C] mx-auto mb-2 transition-colors" />
                    <p className="text-sm font-semibold text-[#1C1917]">
                      Upload your photos
                    </p>
                    <p className="text-xs text-[#78716C] mt-0.5">
                      Drag and drop or click to select multiple photos (PNG, JPG, HEIC, WebP)
                    </p>
                  </div>

                  {/* Uploaded Thumbnails list */}
                  {uploadedPhotos.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {uploadedPhotos.map((photo) => (
                        <div
                          key={photo.id}
                          className="relative group rounded-xl overflow-hidden aspect-square border border-[#E8E2D9] bg-stone-100"
                        >
                          <img
                            src={photo.url}
                            alt={photo.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => removePhoto(photo.id)}
                              className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 cursor-pointer"
                              title="Remove photo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="absolute bottom-1 left-1 text-[9px] bg-black/60 text-white px-1 rounded truncate max-w-[90%]">
                            {photo.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Optional Reference Image upload */}
                <div>
                  <label className="block text-xs font-medium text-[#44403C] mb-1">
                    Have a design/reference in mind? Upload it here <span className="text-[#8C827A]">(optional)</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => refInputRef.current?.click()}
                      className="px-4 py-2 text-xs font-medium text-[#1C1917] bg-white border border-[#DDD5C9] rounded-xl hover:bg-stone-50 cursor-pointer flex items-center gap-1.5"
                    >
                      <ImageIcon className="w-4 h-4 text-[#8C827A]" />
                      <span>{referencePhoto ? "Change Reference" : "Upload Reference Image"}</span>
                    </button>
                    <input
                      ref={refInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleRefFile(e.target.files)}
                      className="hidden"
                    />
                    {referencePhoto && (
                      <span className="text-xs text-emerald-700 font-medium truncate max-w-xs">
                        ✓ {referencePhoto.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Preferred contact method */}
                <div className="pt-2">
                  <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                    Preferred Contact Method
                  </label>
                  <div className="flex items-center gap-3">
                    {(["WhatsApp", "Phone", "Email"] as const).map((method) => (
                      <label
                        key={method}
                        className="inline-flex items-center gap-2 text-xs text-[#292524] cursor-pointer bg-white px-3 py-2 rounded-xl border border-[#DDD5C9]"
                      >
                        <input
                          type="radio"
                          name="contactMethod"
                          checked={contactMethod === method}
                          onChange={() => setContactMethod(method)}
                          className="accent-[#1C1917]"
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#78716C]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your photos are kept strictly private & confidential.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-[#1C1917] hover:bg-[#8C4629] rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#EADBCE]" />
                  <span>Submit Custom Order</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
