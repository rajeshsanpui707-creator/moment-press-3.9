/**
 * Central Business & Brand Configuration for MomentPress
 * 
 * To update contact details, pricing, discount percentages, delivery coverage,
 * or policies, modify the values below in `brandConfig`.
 * Any changes made here are immediately reflected across the entire website.
 */

export interface BrandConfig {
  brandName: string;
  tagline: string;
  supportingLine: string;
  whatsappNumber: string; // Dialing format, e.g. "+917980855821" or digits only
  whatsappDisplay: string; // Formatted display, e.g. "+91 79808 55821"
  phoneNumber: string; // Call phone number, e.g. "6291681660"
  email: string; // Support email, e.g. "connect.rrstudio@gmail.com"
  instagramUrl: string; // Instagram profile URL, e.g. "https://www.instagram.com/rr.studio_/"
  instagramHandle: string; // Instagram handle, e.g. "rr.studio_"
  startingPrice: string | number; // "99" (displayed as ₹99)
  discountPercent: number; // 10 (% off on 2 or more frames)
  advancePercent: number; // 50 (% advance required after quotation approval)
  freeRevisions: number; // 2 (free layout revisions included before printing)
  serviceArea: string; // "All India"
  deliveryInfo: string; // "Delivery Available Across India"
  frameMaterial: string; // "Wooden"
  paymentTerms: string; // "50% advance after final quotation/order confirmation. Remaining 50% before dispatch."
}

export const brandConfig: BrandConfig = {
  brandName: "MomentPress",
  tagline: "Your Photos. Your Story. Your Frame.",
  supportingLine: "Personalized photo frames made specially for your favorite moments. You send us your photos and idea — we create the design for you.",
  whatsappNumber: "+917980855821",
  whatsappDisplay: "+91 79808 55821",
  phoneNumber: "6291681660",
  email: "connect.rrstudio@gmail.com",
  instagramUrl: "https://www.instagram.com/rr.studio_/",
  instagramHandle: "rr.studio_",
  startingPrice: "99",
  discountPercent: 10,
  advancePercent: 50,
  freeRevisions: 2,
  serviceArea: "All India",
  deliveryInfo: "Delivery Available Across India",
  frameMaterial: "Wooden",
  paymentTerms: "50% advance after quotation approval, 50% before dispatch.",
};

export const defaultBrandConfig = brandConfig;

/**
 * Format raw WhatsApp number to pure numeric string for wa.me links
 */
export function getCleanWhatsAppDigits(phone: string): string {
  return phone.replace(/[^0-9]/g, "");
}

/**
 * Build structured WhatsApp link for custom orders
 */
export function buildWhatsAppOrderUrl(
  config: BrandConfig,
  details: {
    name?: string;
    whatsapp?: string;
    category?: string;
    sizePreference?: string;
    quality?: string;
    quantity?: number;
    requirements?: string;
    location?: string;
    hasPhotosUploaded?: boolean;
    photoCount?: number;
  }
): string {
  const digits = getCleanWhatsAppDigits(config.whatsappNumber);
  const qty = details.quantity || 1;
  const discountText = qty >= 2 ? ` (Qualifies for ${config.discountPercent}% OFF!)` : "";

  const lines = [
    `Hi ${config.brandName || "MomentPress"}! I would like to create a personalized photo frame.`,
    "",
    `*Customer Name:* ${details.name || "Not provided"}`,
    `*WhatsApp:* ${details.whatsapp || "Shared here"}`,
    `*Occasion / Category:* ${details.category || "Memories"}`,
    `*Size Preference:* ${details.sizePreference || "Not Sure — Recommend a Size"}`,
    `*Print Quality:* ${details.quality || "Best"}`,
    `*Quantity:* ${qty}${discountText}`,
    `*Delivery Location:* ${details.location || "Not specified"}`,
    "",
    `*Requirements & Ideas:*`,
    details.requirements || "I have photos and would like design recommendations.",
    "",
    details.photoCount && details.photoCount > 0
      ? `(I have selected ${details.photoCount} photo(s) and will share them here)`
      : `(I am ready to share my photos here in WhatsApp)`,
    "",
    `Please confirm the design proof and quotation. Thank you!`
  ];

  const encoded = encodeURIComponent(lines.join("\n"));
  return digits ? `https://wa.me/${digits}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
}

/**
 * Build generic inquiry link
 */
export function buildWhatsAppInquiryUrl(config: BrandConfig, customMessage?: string): string {
  const digits = getCleanWhatsAppDigits(config.whatsappNumber);
  const defaultMsg = `Hi ${config.brandName || "MomentPress"}, I want to create a personalized photo frame.`;
  const encoded = encodeURIComponent(customMessage || defaultMsg);
  return digits ? `https://wa.me/${digits}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
}

/**
 * Build "Send Photos on WhatsApp" link with Order ID and Name
 */
export function buildWhatsAppSendPhotosUrl(
  config: BrandConfig,
  details?: { orderId?: string; name?: string }
): string {
  const digits = getCleanWhatsAppDigits(config.whatsappNumber);
  const brand = config.brandName || "MomentPress";

  const lines = [
    `Hello ${brand}, I have submitted a frame request.`,
    details?.orderId ? `Order ID: ${details.orderId}` : "",
    details?.name ? `Name: ${details.name}` : "",
    "",
    "I am sending my photos here."
  ].filter(line => line !== "");

  // Join lines with newline, ensuring the empty line before "I am sending..." is preserved
  const message = [
    `Hello ${brand}, I have submitted a frame request.`,
    ...(details?.orderId ? [`Order ID: ${details.orderId}`] : []),
    ...(details?.name ? [`Name: ${details.name}`] : []),
    "",
    "I am sending my photos here."
  ].join("\n");

  const encoded = encodeURIComponent(message);
  return digits ? `https://wa.me/${digits}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
}
