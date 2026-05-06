// Product data with categories, multiple images, and details
export const categories = [
  { id: 'all', label: 'All', icon: '✦' },
  { id: 'rings', label: 'Rings', icon: '💍' },
  { id: 'necklaces', label: 'Necklaces', icon: '📿' },
  { id: 'earrings', label: 'Earrings', icon: '✨' },
  { id: 'bracelets', label: 'Bracelets', icon: '⛓' },
  { id: 'bangles', label: 'Bangles', icon: '🔮' },
  { id: 'pendants', label: 'Pendants', icon: '🌟' },
  { id: 'chains', label: 'Chains', icon: '🔗' },
  { id: 'sets', label: 'Bridal Sets', icon: '👑' },
  { id: 'forher', label: 'For Her', icon: '🌸' },
  { id: 'forhim', label: 'For Him', icon: '🦁' },
  { id: 'diamond', label: 'Diamond', icon: '💎' },
];

// Curated reliable jewellery images by category
const IMGS = {
  ring1: [
    'https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/265730/pexels-photo-265730.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/234798/pexels-photo-234798.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  ring2: [
    'https://images.pexels.com/photos/265730/pexels-photo-265730.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/234798/pexels-photo-234798.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  ring3: [
    'https://images.pexels.com/photos/234798/pexels-photo-234798.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/265730/pexels-photo-265730.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  necklace1: [
    'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/13316688/pexels-photo-13316688.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/10983783/pexels-photo-10983783.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  necklace2: [
    'https://images.pexels.com/photos/10983783/pexels-photo-10983783.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/13316688/pexels-photo-13316688.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  earring1: [
    'https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/11984221/pexels-photo-11984221.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/11984226/pexels-photo-11984226.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  earring2: [
    'https://images.pexels.com/photos/11984226/pexels-photo-11984226.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/11984221/pexels-photo-11984221.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  bracelet1: [
    'https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/11984225/pexels-photo-11984225.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/11984227/pexels-photo-11984227.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  bracelet2: [
    'https://images.pexels.com/photos/11984225/pexels-photo-11984225.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/11984227/pexels-photo-11984227.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  bangle1: [
    'https://images.pexels.com/photos/1616035/pexels-photo-1616035.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/11984224/pexels-photo-11984224.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  pendant1: [
    'https://images.pexels.com/photos/10983783/pexels-photo-10983783.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/13316688/pexels-photo-13316688.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  chain1: [
    'https://images.pexels.com/photos/13316688/pexels-photo-13316688.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/10983783/pexels-photo-10983783.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  set1: [
    'https://images.pexels.com/photos/1616035/pexels-photo-1616035.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/11984224/pexels-photo-11984224.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/13316688/pexels-photo-13316688.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  diamond1: [
    'https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/265730/pexels-photo-265730.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  diamond2: [
    'https://images.pexels.com/photos/265730/pexels-photo-265730.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
};

export const products = [
  // RINGS
  {
    id: 1, name: 'Celestial Solitaire Ring', category: ['rings', 'diamond', 'forher'],
    price: '₹45,000', weight: '4.2g', purity: '18K Gold',
    badge: 'Bestseller', images: IMGS.ring1,
    description: 'A timeless solitaire diamond ring set in 18K gold, perfect for engagements and special occasions.',
    tags: ['diamond', 'solitaire', 'engagement'],
  },
  {
    id: 2, name: 'Royal Cluster Ring', category: ['rings', 'forher'],
    price: '₹32,000', weight: '5.8g', purity: '22K Gold',
    badge: 'New', images: IMGS.ring2,
    description: 'Elegant cluster design with intricate gold work, inspired by Mughal architecture.',
    tags: ['cluster', 'traditional', 'floral'],
  },
  {
    id: 3, name: 'Men\'s Bold Band Ring', category: ['rings', 'forhim'],
    price: '₹28,000', weight: '8.5g', purity: '22K Gold',
    badge: null, images: IMGS.ring3,
    description: 'A strong, masculine band ring with textured finish, crafted for the modern man.',
    tags: ['band', 'mens', 'textured'],
  },
  // NECKLACES
  {
    id: 4, name: 'Heritage Kundan Necklace', category: ['necklaces', 'sets', 'forher'],
    price: '₹1,25,000', weight: '42g', purity: '22K Gold',
    badge: 'Premium', images: IMGS.necklace1,
    description: 'Handcrafted Kundan necklace with traditional motifs, perfect for bridal wear.',
    tags: ['kundan', 'bridal', 'traditional'],
  },
  {
    id: 5, name: 'Layered Gold Necklace', category: ['necklaces', 'forher'],
    price: '₹58,000', weight: '18g', purity: '18K Gold',
    badge: 'Trending', images: IMGS.necklace2,
    description: 'Modern layered design that transitions seamlessly from day to evening wear.',
    tags: ['layered', 'modern', 'everyday'],
  },
  // EARRINGS
  {
    id: 6, name: 'Jhumka Drop Earrings', category: ['earrings', 'forher'],
    price: '₹22,000', weight: '12g', purity: '22K Gold',
    badge: 'Bestseller', images: IMGS.earring1,
    description: 'Classic gold jhumka earrings with pearl drops and intricate filigree work.',
    tags: ['jhumka', 'traditional', 'festive'],
  },
  {
    id: 7, name: 'Diamond Stud Earrings', category: ['earrings', 'diamond', 'forher'],
    price: '₹38,000', weight: '3.2g', purity: '18K Gold',
    badge: 'New', images: IMGS.earring2,
    description: 'Brilliant-cut diamond studs in four-prong setting, a timeless classic.',
    tags: ['studs', 'diamond', 'classic'],
  },
  // BRACELETS
  {
    id: 8, name: 'Tennis Bracelet', category: ['bracelets', 'diamond', 'forher'],
    price: '₹85,000', weight: '8g', purity: '18K Gold',
    badge: 'Premium', images: IMGS.bracelet1,
    description: 'Stunning diamond tennis bracelet with channel-set stones in lustrous 18K gold.',
    tags: ['tennis', 'diamond', 'luxury'],
  },
  {
    id: 9, name: 'Men\'s Gold Bracelet', category: ['bracelets', 'forhim'],
    price: '₹42,000', weight: '15g', purity: '22K Gold',
    badge: null, images: IMGS.bracelet2,
    description: 'Heavy-link gold bracelet with brushed finish, designed for the discerning man.',
    tags: ['link', 'mens', 'bold'],
  },
  // BANGLES
  {
    id: 10, name: 'Pola Bangle Set', category: ['bangles', 'forher', 'sets'],
    price: '₹72,000', weight: '28g', purity: '22K Gold',
    badge: 'Bestseller', images: IMGS.bangle1,
    description: 'Traditional Bengali pola bangles in solid 22K gold with subtle floral engravings.',
    tags: ['pola', 'traditional', 'set'],
  },
  // PENDANTS
  {
    id: 11, name: 'Ganesh Gold Pendant', category: ['pendants', 'forhim', 'forher'],
    price: '₹15,000', weight: '6g', purity: '22K Gold',
    badge: null, images: IMGS.pendant1,
    description: 'Auspicious Lord Ganesh pendant in detailed 22K gold, blessed for prosperity.',
    tags: ['religious', 'ganesh', 'auspicious'],
  },
  // CHAINS
  {
    id: 12, name: 'Figaro Gold Chain', category: ['chains', 'forhim'],
    price: '₹55,000', weight: '20g', purity: '22K Gold',
    badge: 'Trending', images: IMGS.chain1,
    description: 'Classic Figaro chain link, a wardrobe essential for the modern man.',
    tags: ['figaro', 'chain', 'mens'],
  },
  // BRIDAL SETS
  {
    id: 13, name: 'Royal Bridal Set', category: ['sets', 'forher', 'necklaces'],
    price: '₹3,50,000', weight: '120g', purity: '22K Gold',
    badge: 'Exclusive', images: IMGS.set1,
    description: 'Complete bridal jewellery set including necklace, earrings, bangles and maang tikka.',
    tags: ['bridal', 'complete', 'wedding'],
  },
  // DIAMOND
  {
    id: 14, name: 'Diamond Solitaire Pendant', category: ['pendants', 'diamond', 'forher'],
    price: '₹68,000', weight: '2.8g', purity: '18K Gold',
    badge: 'New', images: IMGS.diamond1,
    description: 'Breathtaking 0.5ct solitaire diamond pendant suspended in delicate 18K gold.',
    tags: ['diamond', 'pendant', 'solitaire'],
  },
  {
    id: 15, name: 'Diamond Eternity Band', category: ['rings', 'diamond', 'forher'],
    price: '₹95,000', weight: '4.5g', purity: '18K Gold',
    badge: 'Premium', images: IMGS.diamond2,
    description: 'Full eternity band with channel-set brilliant diamonds all the way around.',
    tags: ['eternity', 'diamond', 'band'],
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
