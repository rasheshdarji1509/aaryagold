import React, { createContext, useContext, useState } from 'react';

const STORAGE_KEY = 'aarya_hero_slides_v1';

const defaultSlides = [
  {
    id: 1,
    tag: 'New Collection 2025',
    title: 'Crafted in\nPure Gold',
    subtitle: 'Discover timeless jewellery from the heart of Kalbadevi, Mumbai — where tradition meets contemporary elegance.',
    cta: 'Explore Collection',
    ctaLink: '/products',
    img: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=1600',
    objectPosition: '20% center',
    accent: 'Premium Gold Jewellery Wholesaler',
  },
  {
    id: 2,
    tag: 'Bridal Season',
    title: 'Royal Bridal\nCollections',
    subtitle: 'Make every wedding moment unforgettable with our exquisite bridal sets — crafted for the queen in you.',
    cta: 'View Bridal Sets',
    ctaLink: '/products?category=sets',
    img: 'https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=1600',
    objectPosition: '30% center',
    accent: 'Exclusive Bridal & Festive Wear',
  },
  {
    id: 3,
    tag: 'Diamond Selection',
    title: 'Diamonds\nForever Shine',
    subtitle: 'From solitaire rings to eternity bands — our certified diamond collection sparkles with brilliance.',
    cta: 'Shop Diamonds',
    ctaLink: '/products?category=diamond',
    img: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=1600',
    objectPosition: 'left center',
    accent: 'Certified Diamond Jewellery',
  },
];

function readSlides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSlides;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultSlides;
  } catch {
    return defaultSlides;
  }
}

const HeroContext = createContext();

export function HeroProvider({ children }) {
  const [slides, setSlides] = useState(readSlides);

  const persist = (next) => {
    setSlides(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addSlide = (slide) => {
    const id = Date.now();
    persist([...slides, { ...slide, id }]);
  };

  const updateSlide = (id, patch) => {
    persist(slides.map(s => s.id === id ? { ...s, ...patch } : s));
  };

  const deleteSlide = (id) => {
    persist(slides.filter(s => s.id !== id));
  };

  const reorderSlides = (newOrder) => {
    persist(newOrder);
  };

  const resetSlides = () => {
    persist(defaultSlides);
  };

  return (
    <HeroContext.Provider value={{ slides, addSlide, updateSlide, deleteSlide, reorderSlides, resetSlides }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHero() {
  const ctx = useContext(HeroContext);
  if (!ctx) throw new Error('useHero must be used inside HeroProvider');
  return ctx;
}
