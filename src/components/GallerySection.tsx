import React, { useState } from "react";
import { GALLERY_ITEMS, GalleryItem } from "../data/gallery";
import { ArrowRight, ImagePlus } from "lucide-react";

interface GallerySectionProps {
  onOrderInspiredBy: (item: GalleryItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOrderInspiredBy }) => {
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  // Keep section small: display 6 curated items (mix of real layout ideas & placeholders)
  const displayItems = GALLERY_ITEMS.slice(0, 6);

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            Moments We've Created
          </h2>
          <p className="text-base text-[#6B635B]">
            A glimpse of what your memories can become.
          </p>
        </div>

        {/* Small, Clean Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                item.isPlaceholder
                  ? "bg-[#F7F4EE] border-dashed border-[#D6CEC3] hover:border-[#A85A3C]"
                  : "bg-white border-[#E8E2D9] hover:border-[#D6CEC3] shadow-2xs hover:shadow-lg"
              }`}
            >
              {item.isPlaceholder ? (
                /* Simple Placeholder: Your Moment Could Be Here */
                <div className="p-8 flex flex-col items-center justify-center text-center min-h-[300px] space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#DDD5C9] flex items-center justify-center text-[#A85A3C] shadow-2xs group-hover:scale-105 transition-transform">
                    <ImagePlus className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-bold text-[#1C1917]">
                      Your Moment Could Be Here
                    </h3>
                    <p className="text-xs text-[#6B635B] max-w-xs">
                      Send your photos and requirements to create your frame.
                    </p>
                  </div>
                  <button
                    onClick={() => onOrderInspiredBy(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1C1917] hover:bg-[#8C4629] rounded-full shadow-2xs cursor-pointer transition-colors"
                  >
                    <span>Create Your Frame</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                /* Showcase Example Card */
                <div 
                  onClick={() => setActiveModalItem(item)} 
                  className="cursor-pointer flex flex-col h-full justify-between"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-[#EFE9DF]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/95 text-[#1C1917] shadow-2xs">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-[#78716C]">
                      <span>{item.size}</span>
                      <span>{item.frameColor}</span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#1C1917] group-hover:text-[#A85A3C] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6B635B]">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Modal for Previewing Sample Details */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-2xl max-w-md w-full border border-[#DDD5C9] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#A85A3C] bg-[#EADBCE]/50 px-2.5 py-0.5 rounded-full">
                  {activeModalItem.category} • {activeModalItem.size}
                </span>
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="text-[#78716C] hover:text-[#1C1917] p-1 text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {activeModalItem.imageUrl && (
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-stone-200">
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
                    const item = activeModalItem;
                    setActiveModalItem(null);
                    onOrderInspiredBy(item);
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
    </section>
  );
};
