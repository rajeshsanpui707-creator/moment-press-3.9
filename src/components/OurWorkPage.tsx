import React, { useState } from "react";
import { GALLERY_ITEMS, GalleryItem } from "../data/gallery";
import { Sparkles, ArrowRight, Eye, ImagePlus } from "lucide-react";

interface OurWorkPageProps {
  onOpenOrder: (category?: string) => void;
}

export const OurWorkPage: React.FC<OurWorkPageProps> = ({ onOpenOrder }) => {
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  // Curated, honest showcase items
  const workItems = GALLERY_ITEMS;

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE9DF] border border-[#DDD5C9] text-xs font-medium text-[#6B635B]">
            <Sparkles className="w-3.5 h-3.5 text-[#A85A3C]" />
            <span>Handcrafted Portfolio</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            Our Work
          </h1>

          <p className="text-base sm:text-lg text-[#57534E] max-w-2xl mx-auto">
            Real examples of completed MomentPress frames and custom layouts created for our customers.
          </p>

          <p className="text-xs text-[#8C827A] pt-1">
            Genuine craft preview: Each piece is individually typeset and custom framed around your photos.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                item.isPlaceholder
                  ? "bg-[#F7F4EE] border-dashed border-[#D6CEC3] hover:border-[#A85A3C]"
                  : "bg-white border-[#E8E2D9] hover:border-[#D6CEC3] shadow-2xs hover:shadow-md"
              }`}
            >
              {item.isPlaceholder ? (
                /* Reserved Spot / Placeholder Card */
                <div className="p-8 flex flex-col items-center justify-center text-center min-h-[300px] space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#DDD5C9] flex items-center justify-center text-[#A85A3C] shadow-2xs">
                    <ImagePlus className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A85A3C] bg-white px-2.5 py-0.5 rounded-full border border-[#DDD5C9]">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#1C1917] pt-1">
                      Your Moment Could Be Here
                    </h3>
                    <p className="text-xs text-[#6B635B] max-w-xs">
                      Send your photos and requirements to create your frame.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenOrder(item.category === "Other" ? "Memories" : item.category)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1C1917] hover:bg-[#8C4629] rounded-full shadow-2xs cursor-pointer transition-colors"
                  >
                    <span>Create Your Frame</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                /* Real completed frame work */
                <div
                  onClick={() => setActiveModalItem(item)}
                  className="cursor-pointer flex flex-col h-full justify-between group"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-[#EFE9DF]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-[#1C1917] shadow-sm">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </span>
                    </div>
                    <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/95 text-[#1C1917] shadow-2xs">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-[#78716C]">
                      <span>{item.size}</span>
                      <span>{item.frameColor}</span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#1C1917] group-hover:text-[#A85A3C] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6B635B] line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Call to Action per Section 8 */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-12 rounded-3xl bg-white border border-[#E8E2D9] text-center max-w-3xl mx-auto shadow-sm space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1917] tracking-tight">
            Want Something Like This?
          </h2>

          <p className="text-sm sm:text-base text-[#6B635B] max-w-xl mx-auto leading-relaxed">
            Send us your photos and tell us what you have in mind. We'll design a custom personalized frame created specially for your memory.
          </p>

          <div className="pt-2">
            <button
              id="our-work-create-btn"
              onClick={() => onOpenOrder()}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#1C1917] hover:bg-[#8C4629] rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#EADBCE]" />
              <span>Create Your Frame</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Modal for viewing frame item details */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-2xl max-w-md w-full border border-[#DDD5C9] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#A85A3C] bg-[#EADBCE]/50 px-2.5 py-0.5 rounded-full">
                  {activeModalItem.category}
                </span>
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="text-[#78716C] hover:text-[#1C1917] p-1 text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {activeModalItem.imageUrl && (
                <div className="rounded-xl overflow-hidden aspect-4/3 bg-[#EFE9DF]">
                  <img
                    src={activeModalItem.imageUrl}
                    alt={activeModalItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div>
                <h3 className="font-serif text-xl font-bold text-[#1C1917]">
                  {activeModalItem.title}
                </h3>
                <p className="text-xs text-[#6B635B] mt-1">
                  {activeModalItem.subtitle}
                </p>
                {activeModalItem.sampleNotes && (
                  <p className="text-xs text-[#78716C] mt-2 italic bg-white p-3 rounded-lg border border-[#E8E2D9]">
                    "{activeModalItem.sampleNotes}"
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-end gap-2">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2 text-xs text-[#57534E] hover:bg-stone-200 rounded-full cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const cat = activeModalItem.category === "Other" ? "Memories" : activeModalItem.category;
                    setActiveModalItem(null);
                    onOpenOrder(cat);
                  }}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#1C1917] hover:bg-[#8C4629] rounded-full shadow-2xs cursor-pointer"
                >
                  Create Your Frame
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
