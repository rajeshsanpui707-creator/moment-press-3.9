export interface CategoryItem {
  id: string;
  slug: string;
  title: string;
  emoji: string;
  description: string;
  imageUrl: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: "couple",
    slug: "couple",
    title: "Couple",
    emoji: "❤️",
    description: "For couples, special memories and meaningful moments.",
    imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "birthday",
    slug: "birthday",
    title: "Birthday",
    emoji: "🎂",
    description: "Personalized birthday frames with photos, names and dates.",
    imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "education",
    slug: "education",
    title: "Education",
    emoji: "🎓",
    description: "School, college, graduation and academic achievement memories.",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "teachers-day",
    slug: "teacher-day",
    title: "Teacher's Day",
    emoji: "👩‍🏫",
    description: "Special thank-you frames made for respected teachers and mentors.",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "family",
    slug: "family",
    title: "Family",
    emoji: "👨‍👩‍👧",
    description: "Family portraits, reunions, and warm household moments.",
    imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "friendship",
    slug: "friendship",
    title: "Friendship",
    emoji: "🧑‍🤝‍🧑",
    description: "Best-friend memories, trips, and unforgettable bond stories.",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "anniversary",
    slug: "anniversary",
    title: "Anniversary",
    emoji: "🎉",
    description: "Celebrate milestones of love and togetherness.",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "islamic",
    slug: "islamic",
    title: "Islamic",
    emoji: "🕌",
    description: "Islamic-themed personalized memories, Nikah blessings and gifts.",
    imageUrl: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "achievement",
    slug: "achievement",
    title: "Achievement",
    emoji: "🏆",
    description: "Awards, milestones, career achievements, and honors.",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "memories",
    slug: "memories",
    title: "Memories",
    emoji: "📸",
    description: "For any heartfelt moment that deserves to be remembered forever.",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "custom",
    slug: "custom",
    title: "Custom",
    emoji: "✨",
    description: "Have something unique in mind? Tell us what you want.",
    imageUrl: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=600&q=80",
  },
];
