export interface GalleryItem {
  id: string;
  category: "Couple" | "Birthday" | "Education" | "Teacher's Day" | "Family" | "Friendship" | "Other";
  title: string;
  subtitle: string;
  aspectRatio: "portrait" | "square" | "landscape";
  frameColor: "Black Matte" | "Natural Oak" | "Warm White";
  isPlaceholder?: boolean;
  size: string;
  sampleNotes?: string;
  imageUrl?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    category: "Couple",
    title: "Minimalist Anniversary Collage",
    subtitle: "Couple initials, date & coordinates layout",
    aspectRatio: "portrait",
    frameColor: "Natural Oak",
    size: "A4 Frame",
    sampleNotes: "Clean ivory matting with 3 candid moments and wedding date",
    imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gal-placeholder-1",
    category: "Birthday",
    title: "Your Moment Could Be Here",
    subtitle: "A glimpse of what your memories can become",
    aspectRatio: "portrait",
    frameColor: "Black Matte",
    size: "A4 Frame",
    isPlaceholder: true,
    sampleNotes: "We're reserving this spot for your custom birthday story",
  },
  {
    id: "gal-2",
    category: "Family",
    title: "Three Generations Portrait",
    subtitle: "Restored vintage photograph + recent reunion",
    aspectRatio: "square",
    frameColor: "Warm White",
    size: "Square 10x10",
    sampleNotes: "Warm neutral border with custom family surname script",
    imageUrl: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gal-3",
    category: "Friendship",
    title: "College Roadtrip Quad-Grid",
    subtitle: "4 curated film-style moments with travel date",
    aspectRatio: "portrait",
    frameColor: "Black Matte",
    size: "A4 Frame",
    sampleNotes: "Polaroid aesthetic with custom song lyrics",
    imageUrl: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gal-placeholder-2",
    category: "Education",
    title: "Your Moment Could Be Here",
    subtitle: "A glimpse of what your memories can become",
    aspectRatio: "landscape",
    frameColor: "Natural Oak",
    size: "A3 Frame",
    isPlaceholder: true,
    sampleNotes: "Your graduation degree, milestone photos & batch year",
  },
  {
    id: "gal-4",
    category: "Teacher's Day",
    title: "Mentor Dedication Plaque",
    subtitle: "Class group photo with personal student notes",
    aspectRatio: "portrait",
    frameColor: "Warm White",
    size: "A4 Frame",
    sampleNotes: "Hand-lettered quote with teacher appreciation badge",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gal-5",
    category: "Other",
    title: "Islamic Spiritual Remembrance",
    subtitle: "Ayat-ul-Kursi with personal Nikah snapshot",
    aspectRatio: "portrait",
    frameColor: "Natural Oak",
    size: "A4 Frame",
    sampleNotes: "Gold foil Arabic script accent with high-res portrait",
    imageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gal-placeholder-3",
    category: "Couple",
    title: "Your Moment Could Be Here",
    subtitle: "A glimpse of what your memories can become",
    aspectRatio: "square",
    frameColor: "Black Matte",
    size: "Square 8x8",
    isPlaceholder: true,
    sampleNotes: "Send your pictures and let our team craft your story",
  },
];
