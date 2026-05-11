// Product data with categories, multiple images, and details
export const categories = [
  { id: 'all', label: 'All', image: ring1 },
  { id: 'rings', label: 'Rings', image: ring1 },
  { id: 'necklaces', label: 'Necklaces', image: neckless1 },
  { id: 'earrings', label: 'Earrings', image: earrings1 },
  { id: 'bracelets', label: 'Bracelets', image: bracelet1 },
  { id: 'bangles', label: 'Bangles', image: bangles1 },
  { id: 'pendants', label: 'Pendants', image: pendants1 },
  { id: 'chains', label: 'Chains', image: chain1 },
  { id: 'sets', label: 'Bridal Sets', image: bridalAvif },
  { id: 'forher', label: 'For Her', image: earrings2 },
  { id: 'forhim', label: 'For Him', image: ring3 },
  { id: 'diamond', label: 'Diamond', image: diamond1 },
];

// Import user-provided jewelry assets
import ring1 from '../assets/ring1.jpg';
import ring2 from '../assets/ring2.jpg';
import ring3 from '../assets/ring.jpg';
import neckless1 from '../assets/neckless.jpg';
import neckless2 from '../assets/neckless1.jpg';
import neckless3 from '../assets/neckless3.webp';
import earrings1 from '../assets/earrings.jpg';
import earrings2 from '../assets/earrring2.jpg';
import bracelet1 from '../assets/braclet.jpg';
import bracelet2 from '../assets/braclet1.jpg';
import bangles1 from '../assets/bangals.avif';
import bangles2 from '../assets/bangals1.avif';
import pendants1 from '../assets/pendats.jpg';
import pendants2 from '../assets/pendats1.jpg';
import chain1 from '../assets/chain.avif';
import chain2 from '../assets/chain1.avif';
import diamond1 from '../assets/diamond.avif';
import diamond2 from '../assets/diamond1.avif';
import bridalAvif from '../assets/bridal.avif';
import bridalWebp1 from '../assets/bridal1.webp';
import bridalWebp2 from '../assets/bridal2.webp';


// Curated reliable jewellery images by category using user assets
const IMGS = {
  ring1: {
    'Gold': [ring1, ring2],
    'Rose Gold': [ring2, ring1],
    'White Gold': [ring3, ring1]
  },
  necklace1: {
    'Gold': [neckless1, neckless2],
    'Rose Gold': [neckless2, neckless3]
  },
  earrings: [earrings1, earrings2],
  bracelets: [bracelet1, bracelet2],
  bangles: [bangles1, bangles2],
  pendants: [pendants1, pendants2],
  chains: [chain1, chain2],
  diamond: [diamond1, diamond2],
  bridal: [bridalAvif, bridalWebp1, bridalWebp2],
  default: [ring1, neckless1, earrings1]
};

export const products = [
  // RINGS
  {
    id: 1, name: 'Celestial Solitaire Ring', category: ['rings', 'diamond', 'forher'],
    price: '₹45,000', weight: '4.2g', purity: '18K Gold',
    badge: 'Bestseller',
    colorImages: IMGS.ring1,
    images: IMGS.ring1['Gold'],
    description: 'A timeless solitaire diamond ring set in 18K gold, perfect for engagements and special occasions. Featuring a brilliant cut center stone with side view details.',
    fullDescription: 'Crafted with precision, the Celestial Solitaire Ring represents eternal love. Each diamond is hand-selected for its brilliance and set in a classic four-prong setting that allows maximum light to pass through. The band is contoured for comfort, making it ideal for daily wear.',
    tags: ['diamond', 'solitaire', 'engagement'],
    colors: ['Gold', 'Rose Gold', 'White Gold'],
    sizes: ['6', '7', '8', '9'],
    qualityGrade: 'Signature AAA',
    diamondQualities: ['FG / VVS VS', 'EF / VVS'],
    details: {
      sku: 'KOLRG14615-18KT-1Y',
      metalStamp: '18K Yellow Gold',
      goldWeight: '4.200 gram',
      diamondCarat: '0.15 Ct',
      height: '2 mm',
      width: '20 mm'
    }
  },
  {
    id: 2, name: 'Royal Cluster Ring', category: ['rings', 'forher'],
    price: '₹32,000', weight: '5.8g', purity: '22K Gold',
    badge: 'New',
    colorImages: IMGS.ring1,
    images: IMGS.ring1['Gold'],
    description: 'Elegant cluster design with intricate gold work, inspired by Mughal architecture. Stunning from every angle.',
    fullDescription: 'The Royal Cluster Ring is a tribute to heritage craftsmanship. Featuring a central floral motif surrounded by delicate gold granules (Rawa work), this piece captures the essence of traditional Indian jewellery with a modern silhouette.',
    tags: ['cluster', 'traditional', 'floral'],
    colors: ['Gold', 'Antique Gold'],
    sizes: ['6', '7', '8'],
    qualityGrade: 'Premium',
    details: {
      sku: 'KOLRG9921-22KT',
      metalStamp: '22K Yellow Gold',
      goldWeight: '5.800 gram',
      diamondCarat: 'N/A',
      height: '1.5 mm',
      width: '18 mm'
    }
  },
  {
    id: 3, name: 'Men\'s Bold Band Ring', category: ['rings', 'forhim'],
    price: '₹28,000', weight: '8.5g', purity: '22K Gold',
    badge: null,
    colorImages: IMGS.ring1,
    images: IMGS.ring1['Gold'],
    description: 'A strong, masculine band ring with textured finish, crafted for the modern man. Robust design for daily wear.',
    fullDescription: 'Designed for the man who values strength and simplicity. The Bold Band features a unique brushed texture that resists scratches while maintaining a sophisticated dull shine. Perfectly weighted for a premium feel on the hand.',
    tags: ['band', 'mens', 'textured'],
    colors: ['Gold', 'Matte Gold'],
    sizes: ['9', '10', '11', '12'],
    qualityGrade: 'Standard',
    details: {
      sku: 'KOLMB102-22KT',
      metalStamp: '22K Yellow Gold',
      goldWeight: '8.500 gram',
      diamondCarat: 'N/A',
      height: '3 mm',
      width: '22 mm'
    }
  },
  // NECKLACES
  {
    id: 4, name: 'Heritage Kundan Necklace', category: ['necklaces', 'sets', 'forher'],
    price: '₹1,25,000', weight: '42g', purity: '22K Gold',
    badge: 'Premium',
    colorImages: IMGS.necklace1,
    images: IMGS.necklace1['Gold'],
    description: 'Handcrafted Kundan necklace with traditional motifs, perfect for bridal wear. Detailed side profile highlights craftsmanship.',
    fullDescription: 'Our Heritage Kundan Necklace is a masterpiece of traditional craftsmanship. Each stone is set using the age-old Jadau technique, creating a regal look that has been favoured by royalty for centuries.',
    tags: ['kundan', 'bridal', 'traditional'],
    colors: ['Gold', 'Rose Gold'],
    sizes: ['Adjustable'],
    qualityGrade: 'Heritage AAA+'
  },
  {
    id: 5, name: 'Layered Gold Necklace', category: ['necklaces', 'forher'],
    price: '₹58,000', weight: '18g', purity: '18K Gold',
    badge: 'Trending',
    colorImages: IMGS.necklace1,
    images: IMGS.necklace1['Gold'],
    description: 'Modern layered design that transitions seamlessly from day to evening wear.',
    fullDescription: 'The Layered Gold Necklace offers a contemporary take on elegance. With three distinct chains of varying lengths, it creates a full, rich look that remains lightweight and easy to wear all day long.',
    tags: ['layered', 'modern', 'everyday'],
    colors: ['Gold', 'Rose Gold'],
    sizes: ['16"', '18"', '20"'],
    qualityGrade: 'Premium'
  },
  // EARRINGS
  {
    id: 6, name: 'Jhumka Drop Earrings', category: ['earrings', 'forher'],
    price: '₹22,000', weight: '12g', purity: '22K Gold',
    badge: 'Bestseller',
    colorImages: IMGS.earrings,
    images: IMGS.earrings,
    description: 'Classic gold jhumka earrings with pearl drops and intricate filigree work.',
    fullDescription: 'The timeless appeal of the Jhumka is reborn in this exquisite pair. Hand-carved with floral patterns and finished with natural freshwater pearls, these earrings are a must-have for festive occasions.',
    tags: ['jhumka', 'traditional', 'festive'],
    colors: ['Gold', 'Rose Gold'],
    sizes: ['Medium'],
    qualityGrade: 'Traditional A',
    details: {
      sku: 'KOLE672-22KT',
      metalStamp: '22K Yellow Gold',
      goldWeight: '12.000 gram',
      diamondCarat: 'N/A',
      height: '35 mm',
      width: '20 mm'
    }
  },
  {
    id: 7, name: 'Diamond Stud Earrings', category: ['earrings', 'diamond', 'forher'],
    price: '₹38,000', weight: '3.2g', purity: '18K Gold',
    badge: 'New',
    colorImages: {
      'Gold': IMGS.earrings,
      'White Gold': [earrings2, earrings1]
    },
    images: IMGS.earrings,
    description: 'Brilliant-cut diamond studs in four-prong setting, a timeless classic.',
    fullDescription: 'Sometimes, simplicity is the ultimate sophistication. Our Diamond Studs feature VS clarity diamonds that catch the light from every angle, set in minimal 18K gold to let the stones shine.',
    tags: ['studs', 'diamond', 'classic'],
    colors: ['Gold', 'White Gold'],
    sizes: ['Small'],
    qualityGrade: 'Signature',
    details: {
      sku: 'KOLE102-18KT',
      metalStamp: '18K White Gold',
      goldWeight: '3.200 gram',
      diamondCarat: '0.50 Ct',
      height: '5 mm',
      width: '5 mm'
    }
  },
  // BRACELETS
  {
    id: 8, name: 'Tennis Bracelet', category: ['bracelets', 'diamond', 'forher'],
    price: '₹85,000', weight: '8g', purity: '18K Gold',
    badge: 'Premium',
    colorImages: {
      'Gold': IMGS.bracelets,
      'Rose Gold': [bracelet2, bracelet1],
      'White Gold': [bracelet1, bracelet2]
    },
    images: IMGS.bracelets,
    description: 'Stunning diamond tennis bracelet with channel-set stones in lustrous 18K gold.',
    fullDescription: 'A continuous line of brilliance for your wrist. This Tennis Bracelet is meticulously crafted to ensure flexibility and comfort, featuring 2.5 carats of brilliant-cut diamonds.',
    tags: ['tennis', 'diamond', 'luxury'],
    colors: ['Gold', 'Rose Gold', 'White Gold'],
    sizes: ['6.5"', '7"', '7.5"'],
    qualityGrade: 'Elite',
    details: {
      sku: 'KOLB223-18KT',
      metalStamp: '18K Yellow Gold',
      goldWeight: '8.000 gram',
      diamondCarat: '2.50 Ct',
      height: '3 mm',
      width: '180 mm'
    }
  },
  {
    id: 9, name: 'Men\'s Gold Bracelet', category: ['bracelets', 'forhim'],
    price: '₹42,000', weight: '15g', purity: '22K Gold',
    badge: null,
    colorImages: {
      'Gold': IMGS.bracelets,
      'Matte Gold': [bracelet2, bracelet1]
    },
    images: IMGS.bracelets,
    description: 'Heavy-link gold bracelet with brushed finish, designed for the discerning man.',
    fullDescription: 'The Men\'s Gold Bracelet is a statement of refined masculinity. Featuring a modified Cuban link with a custom box lock, it offers a secure and stylish fit for the modern gentleman.',
    tags: ['link', 'mens', 'bold'],
    colors: ['Gold'],
    sizes: ['8"', '8.5"'],
    qualityGrade: 'Premium',
    details: {
      sku: 'KOLB552-22KT',
      metalStamp: '22K Yellow Gold',
      goldWeight: '15.000 gram',
      diamondCarat: 'N/A',
      height: '8 mm',
      width: '210 mm'
    }
  },
  // BANGLES
  {
    id: 10, name: 'Pola Bangle Set', category: ['bangles', 'forher', 'sets'],
    price: '₹72,000', weight: '28g', purity: '22K Gold',
    badge: 'Bestseller',
    colorImages: {
      'Gold': IMGS.bangles,
      'Antique Gold': [bangles2, bangles1]
    },
    images: IMGS.bangles,
    description: 'Traditional Bengali pola bangles in solid 22K gold with subtle floral engravings.',
    fullDescription: 'A symbol of tradition and auspicious beginnings. Our Pola Bangles are made with high-quality resin encased in 22K gold, featuring intricate "Chilai" hand-work.',
    tags: ['pola', 'traditional', 'set'],
    colors: ['Gold'],
    sizes: ['2.4', '2.6', '2.8'],
    qualityGrade: 'Authentic',
    details: {
      sku: 'KOLBG881-22KT',
      metalStamp: '22K Yellow Gold',
      goldWeight: '28.000 gram',
      diamondCarat: 'N/A',
      height: '10 mm',
      width: '60 mm'
    }
  },
  // PENDANTS
  {
    id: 11, name: 'Ganesh Gold Pendant', category: ['pendants', 'forhim', 'forher'],
    price: '₹15,000', weight: '6g', purity: '22K Gold',
    badge: null,
    colorImages: {
      'Gold': IMGS.pendants,
      'Rose Gold': [pendants2, pendants1]
    },
    images: IMGS.pendants,
    description: 'Auspicious Lord Ganesh pendant in detailed 22K gold, blessed for prosperity.',
    fullDescription: 'Carry divine blessings with you. This Lord Ganesh pendant is intricately carved in 22K gold, capturing every detail of the Vighnaharta in a compact, wearable form.',
    tags: ['religious', 'ganesh', 'auspicious'],
    colors: ['Gold'],
    sizes: ['Standard'],
    qualityGrade: 'Premium',
    details: {
      sku: 'KOLP441-22KT',
      metalStamp: '22K Yellow Gold',
      goldWeight: '6.000 gram',
      diamondCarat: 'N/A',
      height: '25 mm',
      width: '18 mm'
    }
  },
  // CHAINS
  {
    id: 12, name: 'Figaro Gold Chain', category: ['chains', 'forhim'],
    price: '₹55,000', weight: '20g', purity: '22K Gold',
    badge: 'Trending',
    colorImages: {
      'Gold': IMGS.chains,
      'Rose Gold': [chain2, chain1]
    },
    images: IMGS.chains,
    description: 'Classic Figaro chain link, a wardrobe essential for the modern man.',
    fullDescription: 'The Figaro chain is a timeless Italian design. Crafted in solid 22K gold, this chain features the classic pattern of three short links followed by one elongated link, polished to a mirror finish.',
    tags: ['figaro', 'chain', 'mens'],
    colors: ['Gold'],
    sizes: ['20"', '22"', '24"'],
    qualityGrade: 'Signature',
    details: {
      sku: 'KOLC112-22KT',
      metalStamp: '22K Yellow Gold',
      goldWeight: '20.000 gram',
      diamondCarat: 'N/A',
      height: '4 mm',
      width: '550 mm'
    }
  },
  // BRIDAL SETS
  {
    id: 13, name: 'Royal Bridal Set', category: ['sets', 'forher', 'necklaces'],
    price: '₹3,50,000', weight: '120g', purity: '22K Gold',
    badge: 'Exclusive',
    colorImages: {
      'Gold': IMGS.bridal,
      'Rose Gold': IMGS.bridal
    },
    images: IMGS.bridal,
    description: 'Complete bridal jewellery set including necklace, earrings, bangles and maang tikka.',
    fullDescription: 'Make your special day unforgettable with the Royal Bridal Set. Inspired by the opulence of the Rajputana era, this set includes a heavy Haar, matching Jhumkas, and detailed Bangles.',
    tags: ['bridal', 'complete', 'wedding'],
    colors: ['Gold'],
    sizes: ['Adjustable'],
    qualityGrade: 'Bridal AAA',
    details: {
      sku: 'KOLBS990-22KT',
      metalStamp: '22K Yellow Gold',
      goldWeight: '120.000 gram',
      diamondCarat: 'N/A',
      height: 'Varies',
      width: 'Varies'
    }
  },
  // DIAMOND
  {
    id: 14, name: 'Diamond Solitaire Pendant', category: ['pendants', 'diamond', 'forher'],
    price: '₹68,000', weight: '2.8g', purity: '18K Gold',
    badge: 'New',
    colorImages: {
      'Gold': IMGS.diamond,
      'White Gold': [diamond2, diamond1]
    },
    images: IMGS.diamond,
    description: 'Breathtaking 0.5ct solitaire diamond pendant suspended in delicate 18K gold.',
    fullDescription: 'The Diamond Solitaire Pendant is the epitome of grace. A single, brilliant-cut diamond is held in a minimalist basket setting, allowing it to take center stage and reflect light brilliantly.',
    tags: ['diamond', 'pendant', 'solitaire'],
    colors: ['Gold', 'White Gold'],
    sizes: ['Small'],
    qualityGrade: 'Elite',
    details: {
      sku: 'KOLDP101-18KT',
      metalStamp: '18K Yellow Gold',
      goldWeight: '2.800 gram',
      diamondCarat: '0.50 Ct',
      height: '10 mm',
      width: '8 mm'
    }
  },
  {
    id: 15, name: 'Diamond Eternity Band', category: ['rings', 'diamond', 'forher'],
    price: '₹95,000', weight: '4.5g', purity: '18K Gold',
    badge: 'Premium',
    colorImages: {
      'Gold': IMGS.ring1['Gold'],
      'Rose Gold': IMGS.ring1['Rose Gold'],
      'White Gold': IMGS.ring1['White Gold']
    },
    images: IMGS.ring1['Gold'],
    description: 'Full eternity band with channel-set brilliant diamonds all the way around.',
    fullDescription: 'Symbolize your eternal bond with this stunning Eternity Band. A continuous circle of matched diamonds represents a love that has no end, set in a secure channel of 18K gold.',
    tags: ['eternity', 'diamond', 'band'],
    colors: ['Gold', 'Rose Gold', 'White Gold'],
    sizes: ['6', '7', '8'],
    qualityGrade: 'Signature',
    details: {
      sku: 'KOLRE101-18KT',
      metalStamp: '18K Yellow Gold',
      goldWeight: '4.500 gram',
      diamondCarat: '1.20 Ct',
      height: '3 mm',
      width: '20 mm'
    }
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Rajesh Mehta',
    business: 'Rajesh Jewellers, Mumbai',
    rating: 5,
    text: 'Aarya Gold has been our trusted supplier for over 5 years. Their commitment to quality and timely delivery has helped our retail business thrive in a competitive market. Sagarbhai personally ensures every order is perfect.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    id: 2,
    name: 'Priti Sharma',
    business: 'Shree Ganesh Jewellers, Pune',
    rating: 5,
    text: 'The craftsmanship and design variety offered by Aarya Gold is exceptional. Our customers are always impressed with the quality of their pieces. The bridal sets are our best-selling items every wedding season.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80',
  },
  {
    id: 3,
    name: 'Vikram Patel',
    business: 'Lakshmi Gold House, Surat',
    rating: 5,
    text: 'We switched to Aarya Gold two years ago and never looked back. Their pricing is competitive, purity is guaranteed, and their diamond collection is unmatched at the wholesale level. Highly recommended.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
  {
    id: 4,
    name: 'Anita Desai',
    business: 'Radha Jewels, Ahmedabad',
    rating: 5,
    text: 'From the moment I visited their Kalbadevi showroom, I knew this was a different class of wholesaler. The collection, the service, and the transparency in pricing — everything is world-class.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
];
