import React from "react";
import { CategoryItem } from "../data/categories";
import { X, Sparkles, Check, ArrowRight } from "lucide-react";

interface CategoryDetailModalProps {
  category: CategoryItem | null;
  onClose: () => void;
  onOrderThisCategory: (categoryTitle: string) => void;
}

export const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({
  category,
  onClose,
  onOrderThisCategory,
}) => {
  if (!category) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-3xl max-w-xl w-full border border-[#DDD5C9] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="relative aspect-16/9 overflow-hidden bg-stone-200">
          <img
            src={category.imageUrl}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
            <div className="text-white space-y-1">
              <span className="text-2xl">{category.emoji}</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                {category.title}
              </h3>
              <p className="text-xs text-stone-200">
                {category.popularFor}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A85A3C]">
              What We Can Create
            </span>
            <p className="text-base text-[#1C1917] mt-1 font-medium">
              {category.description}
            </p>
          </div>

          {/* Ideas you can request */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
              Inspiration Ideas You Can Request
            </h4>
            <div className="space-y-2">
              {category.customIdeas.map((idea, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E8E2D9] text-xs sm:text-sm text-[#44403C]"
                >
                  <Check className="w-4 h-4 text-[#A85A3C] shrink-0 mt-0.5" />
                  <span>{idea}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#EADBCE] text-xs text-[#6B635B]">
            <p>
              💡 <strong>Remember:</strong> You are not locked into any template. Send 1 photo or 10 photos, with or without text. Our designer will arrange them harmoniously for your approval.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-medium text-[#78716C] hover:text-[#1C1917] cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => {
                onClose();
                onOrderThisCategory(category.title);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#1C1917] hover:bg-[#8C4629] shadow-md transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EADBCE]" />
              <span>Create {category.title} Frame</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
