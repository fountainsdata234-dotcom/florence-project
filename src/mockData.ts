import { Product, NotificationItem } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'AeroPulse Wireless Active Noise-Cancelling Headphones',
    subtitle: 'Ultra-low latency, 48-hr battery life, studio acoustic tuning',
    category: 'electronics',
    price: 49.99,
    originalPrice: 159.00,
    rating: 4.9,
    reviewsCount: 12450,
    soldCount: 38200,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80'
    ],
    badge: 'FLASH SALE 68% OFF',
    stock: 14,
    isFlashDeal: true,
    isTrending: true,
    freeShipping: true,
    description: 'Immerse in pure high-fidelity sound. Features aerospace titanium diaphragms, personalized EQ profiles via app, and dual transparency modes.',
    specs: {
      'Battery': '48 Hours playback',
      'Connectivity': 'Bluetooth 5.3 + 3.5mm AUX',
      'Weight': '248g',
      'Warranty': '2 Years Replacement'
    }
  },
  {
    id: 'prod-2',
    title: 'Chronos Smart Minimalist Titanium Watch Series X',
    subtitle: 'Continuous ECG, SpO2, sapphire crystal mirror & ceramic case',
    category: 'smart-tech',
    price: 38.50,
    originalPrice: 129.99,
    rating: 4.8,
    reviewsCount: 8940,
    soldCount: 24300,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80'
    ],
    badge: 'FLORID FAVORITE',
    stock: 22,
    isFlashDeal: true,
    isTrending: true,
    freeShipping: true,
    description: 'Precision aerospace titanium casing with 1.96-inch AMOLED 1000-nit display. Water resistant up to 50 meters with 14-day endurance.',
    specs: {
      'Display': '1.96" AMOLED 410x502',
      'Waterproof': '5ATM / 50M',
      'Sensors': 'Optical heart, Bio-ECG, SpO2',
      'Strap': 'Hypoallergenic fluoroelastomer'
    }
  },
  {
    id: 'prod-3',
    title: 'Florid Signature Minimal Leather Crossbody Pack',
    subtitle: 'Full-grain Italian Nappa leather with waterproof security zip',
    category: 'fashion',
    price: 28.90,
    originalPrice: 85.00,
    rating: 4.95,
    reviewsCount: 5420,
    soldCount: 16800,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80'
    ],
    badge: 'BESTSELLER',
    stock: 31,
    isFlashDeal: false,
    isTrending: true,
    freeShipping: true,
    description: 'Exquisite craftsmanship meets modern utility. Equipped with anti-theft hidden pocket, magnetic German Fidlock buckle, and quick-adjust sling strap.',
    specs: {
      'Material': 'Full-grain Nappa Leather',
      'Dimensions': '28 x 16 x 8 cm',
      'Hardware': 'Brushed Florid Slate Metal',
      'Lining': 'Scratch-resistant velvet'
    }
  },
  {
    id: 'prod-4',
    title: 'SonicCare Ultrasonic Intelligent Whitening Toothbrush',
    subtitle: '42,000 VPM acoustic micro-bubbles with wireless induction base',
    category: 'beauty',
    price: 18.99,
    originalPrice: 59.99,
    rating: 4.85,
    reviewsCount: 14200,
    soldCount: 45000,
    image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800&q=80'
    ],
    badge: 'HOT DEAL -68%',
    stock: 45,
    isFlashDeal: true,
    isTrending: true,
    freeShipping: true,
    description: 'Dentist-recommended sonic cavitation lifts 10x more plaque than manual brushes. Includes 8 DuPont antibacterial replacement heads.',
    specs: {
      'Motor': 'Maglev 42,000 VPM',
      'Modes': 'Clean, White, Polish, Sensitive, Gum Care',
      'Battery': '100-Day Standby',
      'Waterproof': 'IPX8 Fully Washable'
    }
  },
  {
    id: 'prod-5',
    title: 'Lumina Nordic Ambient Magnetic Levitation Desk Lamp',
    subtitle: 'Warm sunset glow, touch dimming, integrated 15W Qi fast charging',
    category: 'home',
    price: 34.20,
    originalPrice: 99.00,
    rating: 4.78,
    reviewsCount: 3120,
    soldCount: 11000,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'
    ],
    badge: 'TRENDING VIRAL',
    stock: 19,
    isFlashDeal: false,
    isTrending: true,
    freeShipping: true,
    description: 'Futuristic magnetic suspension bulb floating in mid-air. Emits warm soothing 2700K light with zero flicker, paired with a solid oak and forged aluminum base.',
    specs: {
      'Base': 'Solid Natural Oak + Slate Zinc',
      'Power': '12V DC Adapter + 15W Wireless Qi Base',
      'Bulb Life': '50,000 Hours LED'
    }
  },
  {
    id: 'prod-6',
    title: 'Florid Pro Mechanical Wireless Keyboard 75%',
    subtitle: 'Gasket-mounted acoustic dampening with hot-swappable tactile switches',
    category: 'electronics',
    price: 52.00,
    originalPrice: 145.00,
    rating: 4.92,
    reviewsCount: 7800,
    soldCount: 19500,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80'
    ],
    badge: 'LIMITED TIME',
    stock: 9,
    isFlashDeal: true,
    isTrending: false,
    freeShipping: true,
    description: 'Thocky sound profile achieved with Poron foam gaskets and factory-lubed custom switches. Features aluminum volume knob and multi-device Bluetooth switching.',
    specs: {
      'Layout': '75% Compact (82 Keys)',
      'Switches': 'Custom Pre-lubed Linear Florid Jade',
      'Battery': '4000mAh Rechargeable'
    }
  },
  {
    id: 'prod-7',
    title: 'Urban Explorer Waterproof Roll-Top Commuter Backpack',
    subtitle: 'Cordura ballistic fabric, TSA laptop sleeve, ergonomic back ventilation',
    category: 'accessories',
    price: 39.99,
    originalPrice: 110.00,
    rating: 4.88,
    reviewsCount: 6510,
    soldCount: 18200,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'
    ],
    badge: 'TOP RATED',
    stock: 28,
    isFlashDeal: false,
    isTrending: true,
    freeShipping: true,
    description: 'Designed for the modern city traveler. Expands from 22L to 30L, with water-sealed YKK zips and hidden RFID-blocking passport compartment.',
    specs: {
      'Capacity': '22L - 30L Expandable',
      'Fits Laptop': 'Up to 16-inch MacBook Pro',
      'Fabric': '1000D Waterproof Cordura'
    }
  },
  {
    id: 'prod-8',
    title: 'Aura Glow Botanical Botanical Hydrating Serum 50ml',
    subtitle: 'Pure hyaluronic multi-complex with niacinamide & cold-pressed rosehip',
    category: 'beauty',
    price: 14.50,
    originalPrice: 42.00,
    rating: 4.96,
    reviewsCount: 16800,
    soldCount: 62000,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'
    ],
    badge: 'SUPER CHEAP',
    stock: 75,
    isFlashDeal: true,
    isTrending: true,
    freeShipping: true,
    description: 'Deep cellular hydration instantly plumps dull skin. 100% cruelty-free, fragrance-free, vegan certified formula suitable for all skin types.',
    specs: {
      'Volume': '50ml (1.7 fl oz)',
      'Active Ingredients': 'Hyaluronic Acid 3%, Niacinamide 5%, Centella Asiatica',
      'Origin': 'Dermatologically formulated'
    }
  },
  {
    id: 'prod-9',
    title: 'Verve Matte Ceramic Pour-Over Coffee Dripper Set',
    subtitle: 'Handmade double-walled insulation with brass gooseneck serving carafe',
    category: 'home',
    price: 26.50,
    originalPrice: 72.00,
    rating: 4.82,
    reviewsCount: 2900,
    soldCount: 9400,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80'
    ],
    badge: 'ARTISAN CHOICE',
    stock: 15,
    isFlashDeal: false,
    isTrending: false,
    freeShipping: true,
    description: 'Engineered spiral rib geometry optimizes extraction flow rate. Includes heat-resistant borosilicate glass server and 50 unbleached paper filters.',
    specs: {
      'Material': 'High-density Ceramic + Borosilicate Glass',
      'Capacity': '600ml (2-4 Cups)',
      'Dishwasher Safe': 'Yes'
    }
  },
  {
    id: 'prod-10',
    title: 'AirGlide Magnetic MagSafe PowerBank 10,000mAh',
    subtitle: 'Ultra-thin 12mm profile with 22.5W PD fast charging & stand kick',
    category: 'smart-tech',
    price: 24.99,
    originalPrice: 65.00,
    rating: 4.89,
    reviewsCount: 11200,
    soldCount: 34000,
    image: 'https://images.unsplash.com/photo-1609592807908-1e4e466cb1a8?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609592807908-1e4e466cb1a8?w=800&q=80'
    ],
    badge: 'BEST DEAL',
    stock: 40,
    isFlashDeal: true,
    isTrending: true,
    freeShipping: true,
    description: 'Snaps firmly onto MagSafe-compatible phones with strong N52 rare earth magnets. Charges up to 3 devices simultaneously.',
    specs: {
      'Capacity': '10,000mAh (38.5Wh)',
      'Outputs': '15W Qi Wireless, 22.5W USB-C PD, USB-A',
      'Thickness': '12.5mm'
    }
  },
  {
    id: 'prod-11',
    title: 'Retro Classic Round Polarized Sunglasses',
    subtitle: 'Florid Slate alloy frame with UV400 anti-glare scratchproof TAC lenses',
    category: 'fashion',
    price: 12.99,
    originalPrice: 48.00,
    rating: 4.75,
    reviewsCount: 4200,
    soldCount: 22100,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'
    ],
    badge: 'FLASH -73%',
    stock: 58,
    isFlashDeal: true,
    isTrending: true,
    freeShipping: true,
    description: 'Timeless silhouette crafted from ultralight memory metal with spring hinges. Comes with hard protective case and microfiber lens cloth.',
    specs: {
      'Lens': 'UV400 Polarized TAC Grade A',
      'Frame': 'Florid Grey Slate Magnesium Alloy',
      'Weight': '21g'
    }
  },
  {
    id: 'prod-12',
    title: 'Precision Bluetooth Body Fat Composition Scale',
    subtitle: '16 Biometric health indicators, ITO glass coating & auto multi-sync',
    category: 'smart-tech',
    price: 21.00,
    originalPrice: 62.00,
    rating: 4.87,
    reviewsCount: 8800,
    soldCount: 31000,
    image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=800&q=80'
    ],
    badge: 'POPULAR',
    stock: 33,
    isFlashDeal: false,
    isTrending: true,
    freeShipping: true,
    description: 'Medical-grade BIA sensors accurately evaluate BMI, visceral fat, muscle mass, metabolic age and hydration. Syncs with Apple Health & Google Fit.',
    specs: {
      'Metrics': '16 Body Metrics',
      'Surface': 'Tempered ITO Conductive Glass',
      'Capacity': '0.2kg - 180kg'
    }
  },
  {
    id: 'prod-13',
    title: 'TerraSip Stainless Steel Insulated Travel Tumbler',
    subtitle: 'Leak-resistant  tumbler with ceramic interior and reusable straw',
    category: 'home',
    price: 19.99,
    originalPrice: 44.00,
    rating: 4.86,
    reviewsCount: 5360,
    soldCount: 17600,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80'],
    badge: 'NEW ARRIVAL',
    stock: 42,
    isFlashDeal: false,
    isTrending: true,
    freeShipping: true,
    description: 'A durable everyday tumbler that keeps drinks cold for 24 hours or hot for 8, with a comfortable carry handle for commutes and travel.',
    specs: {
      'Capacity': '30 oz / 887ml',
      'Insulation': 'Double-wall vacuum sealed',
      'Material': 'Food-safe stainless steel'
    }
  },
  {
    id: 'prod-14',
    title: 'NexaFit Lightweight Training Sneakers',
    subtitle: 'Breathable knit upper with responsive foam and flexible grip sole',
    category: 'fashion',
    price: 42.00,
    originalPrice: 98.00,
    rating: 4.83,
    reviewsCount: 4680,
    soldCount: 12900,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'],
    badge: 'JUST DROPPED',
    stock: 24,
    isFlashDeal: true,
    isTrending: true,
    freeShipping: true,
    description: 'Lightweight everyday trainers with breathable support, cushioned landings, and a durable outsole for walks, workouts, and city commutes.',
    specs: {
      'Upper': 'Breathable engineered knit',
      'Midsole': 'Responsive EVA foam',
      'Outsole': 'Textured rubber traction'
    }
  },
  {
    id: 'prod-15',
    title: 'LumaBeam Portable LED Reading Light',
    subtitle: 'Three color temperatures, flexible neck and rechargeable USB-C battery',
    category: 'smart-tech',
    price: 16.80,
    originalPrice: 38.00,
    rating: 4.81,
    reviewsCount: 3270,
    soldCount: 10100,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'],
    badge: 'SMART PICK',
    stock: 37,
    isFlashDeal: false,
    isTrending: true,
    freeShipping: true,
    description: 'A compact reading light with warm, neutral, and cool modes, stepless brightness control, and a flexible clip for desks, bedsides, and travel.',
    specs: {
      'Modes': 'Warm, neutral, cool white',
      'Battery': 'Up to 36 hours',
      'Charging': 'USB-C rechargeable'
    }
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Flash Sale Alert! ⚡',
    message: 'Up to 75% off electronics & lifestyle essentials ends in 03:42:15!',
    time: '5m ago',
    read: false,
    type: 'deal'
  },
  {
    id: 'notif-2',
    title: 'Two-Factor Security Activated',
    message: 'Your account is protected with secure verification.',
    time: '1h ago',
    read: false,
    type: 'security'
  },
  {
    id: 'notif-3',
    title: 'Free Shipping Voucher Claimed',
    message: 'Code FREESHIP applied automatically on all orders over $25.',
    time: '3h ago',
    read: true,
    type: 'discount'
  }
];
