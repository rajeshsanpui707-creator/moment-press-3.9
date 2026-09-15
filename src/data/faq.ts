import { BrandConfig } from "../config/brand";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export function getFaqs(config: BrandConfig): FAQItem[] {
  const priceDisplay = config.startingPrice.toString().startsWith("₹") 
    ? config.startingPrice 
    : `₹${config.startingPrice}`;

  return [
    {
      id: "frame-type",
      question: "What kind of photo frames do you make?",
      answer: `We create personalized wooden photo frames using your photos and requirements.`,
    },
    {
      id: "custom-design",
      question: "Can I request a completely custom design?",
      answer: "Yes. You can provide your photos, idea, text, preferences and reference image. We create the design according to your requirements.",
    },
    {
      id: "ready-made-templates",
      question: "Do I have to choose a ready-made template?",
      answer: `No. ${config.brandName || "MomentPress"} focuses on personalized designs rather than a large ready-made template catalog.`,
    },
    {
      id: "design-process",
      question: "How does the design process work?",
      answer: `You send your photos and requirements → we create the design → you preview it → up to ${config.freeRevisions || 2} free revisions → final approval → printing.`,
    },
    {
      id: "request-changes",
      question: "Can I request changes?",
      answer: `Yes. Up to ${config.freeRevisions || 2} revisions are included.`,
    },
    {
      id: "sizes-available",
      question: "What sizes are available?",
      answer: "We offer Small, Medium and Big size options, and can recommend a suitable size based on your requirements.",
    },
    {
      id: "print-quality",
      question: "What print quality options are available?",
      answer: "We offer Normal and Best quality options. Pricing depends on the selected quality.",
    },
    {
      id: "pricing-cost",
      question: "How much does it cost?",
      answer: `Our frames start from just ${priceDisplay}. Final pricing depends on size, quality, customization and quantity. Contact us for a quotation.`,
    },
    {
      id: "delivery-coverage",
      question: "Do you deliver outside our local area?",
      answer: "Yes. We provide delivery across India.",
    },
    {
      id: "discounts-offer",
      question: "Do you offer discounts?",
      answer: `Yes. Orders of 2 or more frames receive ${config.discountPercent || 10}% OFF.`,
    },
  ];
}
