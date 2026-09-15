import React from "react";
import { CATEGORIES } from "../data/categories";
import { ArrowRight, Sparkles } from "lucide-react";

interface CategoriesSectionProps {
  onOpenOrderWithCategory: (categoryName: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onOpenOrderWithCategory,
}) => {
  return (
    <section id="categories" className="py-16 lg:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE9DF] text-xs font-semibold text-[#A85A3C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Occasions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            Made For Every Moment
          </h2>
          <p className="text-base sm:text-lg text-[#6B635B]">
            Choose your occasion. Tell us your idea. We'll create the design.
          </p>
        </div>

        {/* Categories Grid - 11 Clean, Clickable Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              id={`cat-card-${cat.slug}`}
              onClick={() => onOpenOrderWithCategory(cat.title)}
              className="group text-left bg-white rounded-2xl border border-[#E8E2D9] hover:border-[#A85A3C]/50 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A85A3C]/40"
            >
              {/* Card Image with Emoji badge */}
              <div className="relative aspect-16/10 overflow-hidden bg-[#F2ECE4]">
                <img
                  src={cat.imageUrl}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Emoji Overlay */}
                <span className="absolute bottom-2.5 left-2.5 text-lg bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-xs flex items-center gap-1.5 font-medium text-xs text-[#1C1917]">
                  <span>{cat.emoji}</span>
                  <span>{cat.title}</span>
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#1C1917] group-hover:text-[#A85A3C] transition-colors flex items-center justify-between">
                    <span>{cat.title}</span>
                    <ArrowRight className="w-4 h-4 text-[#A85A3C] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-xs text-[#6B635B] mt-1 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F5F2EB] flex items-center justify-between text-[11px] font-semibold text-[#A85A3C]">
                  <span>Create {cat.title} Frame</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
