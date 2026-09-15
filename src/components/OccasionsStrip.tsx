import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface OccasionsStripProps {
  onSelectOccasion: (occasion: string) => void;
  onCustomOrder: () => void;
}

export const OccasionsStrip: React.FC<OccasionsStripProps> = ({
  onSelectOccasion,
  onCustomOrder,
}) => {
  const occasions = [
    { name: "Birthday", emoji: "🎂" },
    { name: "Couple & Love", emoji: "❤️" },
    { name: "Friendship", emoji: "🧑‍🤝‍🧑" },
    { name: "Family", emoji: "👨‍👩‍👧" },
    { name: "Teacher's Day", emoji: "👩‍🏫" },
    { name: "Graduation", emoji: "🎓" },
    { name: "Anniversary", emoji: "🎉" },
    { name: "Achievement", emoji: "🏆" },
    { name: "Islamic occasions", emoji: "🕌" },
    { name: "Special Memories", emoji: "📸" },
  ];

  return (
    <section className="py-14 bg-[#FAF8F5] border-y border-[#E8E2D9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#E8E2D9]">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl font-bold text-[#1C1917]">
              Perfect For
            </span>
            <span className="text-xs text-[#78716C] bg-[#EFE9DF] px-2.5 py-1 rounded-full">
              Every Life Milestone
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[#6B635B] hidden sm:inline">
              Have Something Else In Mind?
            </span>
            <button
              onClick={onCustomOrder}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#1C1917] hover:text-white bg-white hover:bg-[#1C1917] border border-[#DDD5C9] rounded-full shadow-2xs transition-colors cursor-pointer"
            >
              <span>Create a Custom Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable / wrapped responsive pills */}
        <div className="pt-6 flex flex-wrap gap-2.5 items-center justify-center md:justify-start">
          {occasions.map((occ, idx) => (
            <button
              key={idx}
              onClick={() => onSelectOccasion(occ.name)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#F2ECE4] border border-[#E8E2D9] hover:border-[#D6CEC3] text-xs sm:text-sm font-medium text-[#292524] transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
            >
              <span className="text-base group-hover:scale-110 transition-transform">{occ.emoji}</span>
              <span>{occ.name}</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
