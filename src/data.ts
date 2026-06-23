import { Product, Review, ProcessStep } from './types';

export const MASALA_PRODUCTS: Product[] = [
  {
    id: 'garam-masala',
    name: 'Regal Rajput Garam Masala',
    hindiName: 'शाही गरम मसाला',
    price: 490,
    weight: '150g',
    shortDescription: 'Slow-roasted whole spices ground at ultra-low speeds in traditional stone mortars to capture intense, aromatic volatile oils.',
    fullDescription: 'Our signature blend is hand-crafted in small batches of just 12 jars. Every seed is painstakingly picked, sun-infused on bamboo trays, and dry-roasted in seasoned iron woks over a low coal fire. We grind it under heavy stone wheels at less than 40 RPM, preventing the heat friction that destroys the delicate volatile oils of wild cardamom, black stone flower (kalpasi), star anise, and heirloom Ceylon cinnamon.',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=800'
    ],
    ingredients: [
      'Heirloom Ceylon Cinnamon',
      'Wild Green Cardamom',
      'Black Stone Flower (Kalpasi)',
      'High-Grade Mace & Nutmeg',
      'Tellicherry Black Pepper',
      'Cloves & Star Anise',
      'Toasted Cumin Seeds'
    ],
    benefits: [
      'Aids digestion through thermal spice compounds',
      'Contains powerful anti-inflammatory black stone flower',
      'Completely free of fillers, starch, or preservative oils',
      'Highly concentrated - use just half a teaspoon'
    ],
    storageInstructions: 'Store in this airtight glass jar in a dry, dark pantry away from direct heat. Do not use wet copper spoons.',
    cookingSuggestions: 'Incorporate during the final 3 minutes of slow-cooking, or dust lightly on hot buttered flatbreads and slow-stewed lentil broths.',
    rating: 4.9,
    reviews: [
      {
        id: 'gm-rev-1',
        author: 'Ananya Roy',
        location: 'Lucknow ancestral home',
        headline: 'My grandma\'s kitchen in Lucknow',
        text: '"The aroma of the Shahi Garam Masala transported me back to my grandmother\'s winter courtyard in Kakori. The texture is coarse, incredibly dense, and has a fragrance that commercial packets cannot duplicate." ',
        rating: 5,
        date: 'June 18, 2026',
        reviewImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
        helpfulVotes: 42
      },
      {
        id: 'gm-rev-2',
        author: 'Vikram Mehta',
        location: 'Gurugram',
        headline: 'Takes Rogan Josh to another level!',
        text: 'Outstanding robust blend. Used it in my mutton roghan josh, and the fragrance filled the entire floor of the apartment! You can immediately smell the stone-ground difference. Zero artificial heat.',
        rating: 5,
        date: 'June 15, 2026',
        reviewImage: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=400',
        helpfulVotes: 18
      },
      {
        id: 'gm-rev-3',
        author: 'Priya K.',
        location: 'Delhi NCR',
        headline: 'Highly concentrated & authentic style',
        text: 'Just half a teaspoon does wonders. The packaging is absolutely beautiful with those wax seals and raw burlap wrappers. Highly recommend this Tuesday batch!',
        rating: 4,
        date: 'May 24, 2026',
        helpfulVotes: 9
      }
    ]
  },
  {
    id: 'kashmiri-mirch',
    name: 'Sun-Infused Kashmiri Lal Mirch',
    hindiName: 'कश्मीरी लाल मिर्च',
    price: 360,
    weight: '150g',
    shortDescription: 'Locally sourced whole Kashmiri chilies, hand-destemmed and pounded for a brilliant deep terracotta crimson and mild warmth.',
    fullDescription: 'Not all red chili is made equal. Our Kashmiri Lal Mirch is made exclusively from heirloom wrinkly chilies grown in the gentle glacial soils of Srinagar. We hand-remove the seeds and stems to moderate heat levels, capturing a rich, sweet red flesh. Pounded slowly in stone mortars, this powder imparts a warm, theatrical, glowing crimson tone to your dishes, accompanied by a clean, earthy, non-burning heat.',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800'
    ],
    ingredients: [
      'Hand-Selected Kashmiri Red Chilies',
      'A drop of cold-pressed organic Mustard Oil (used during natural sun curing)'
    ],
    benefits: [
      'Rich in Vitamin C and carotenoids containing high cell-defense properties',
      'Low capsaicin warmth makes it gentle on sensitive stomachs',
      'Zero artificial coloring, paprika dilution, or brick dust'
    ],
    storageInstructions: 'Keep sealed tightly in glass. Keep away from bright daylight to preserve its natural vibrant red pigment.',
    cookingSuggestions: 'Temper in warm ghee or coconut oil alongside crushed ginger to unlock the natural fat-soluble red color pigments.',
    rating: 4.8,
    reviews: [
      {
        id: 'km-rev-1',
        author: 'Kabir Sengupta',
        location: 'Gurugram Sector-45',
        headline: 'Liquid Volcanic Glass color, polite warmth!',
        text: '"Spectacular depth of color in the Kashmiri Mirch. Our curries glow red like liquid volcanic glass, but with a deeply comforting, polite warmth rather than a sharp burn. Absolute masterpieces." ',
        rating: 5,
        date: 'May 29, 2026',
        reviewImage: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400',
        helpfulVotes: 34
      },
      {
        id: 'km-rev-2',
        author: 'Sunita Shah',
        location: 'Ahmedabad',
        headline: 'Pure terracotta red warmth, kids love it too',
        text: 'Authentic wrinkly sweet chilies. I made natural red chilli pickle with this. No artificial red dye or toxic brick dust mixed like popular commercial brands. So safe and aromatic.',
        rating: 5,
        date: 'May 20, 2026',
        reviewImage: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=400',
        helpfulVotes: 15
      }
    ]
  },
  {
    id: 'stone-ground-haldi',
    name: 'Vedic Stone-Ground Haldi',
    hindiName: 'पत्थर-पिसी हल्दी',
    price: 280,
    weight: '150g',
    shortDescription: 'Organic Sangli turmeric rhizomes, cured in traditional earthen pots and stone-milled to retain over 5.5% active Curcumin.',
    fullDescription: 'This is not the bright yellow, heavily processed turmeric sold in supermarket plastic bags. Our Haldi is grown biologically in Sangli, cured using heirloom open-kettle steam cooking, and sliced before being dried by the sun. The cured fingers are crushed in custom stone chakkis under cold-grind conditions, guaranteeing the retention of curcumin oil, volatile gingerols, and an authentic earthy, bitter-sweet aroma.',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800'
    ],
    ingredients: [
      '100% Organically Cultivated Dried Turmeric Rhizomes (High Curcumin Sangli Variety)'
    ],
    benefits: [
      'Incredibly high active curcumin oil content (avg. 5.68%)',
      'Powerful natural antiseptic, antioxidant, and tissue balancer',
      'Zero chemical polishers, lead-chromate dyes, or starch powders'
    ],
    storageInstructions: 'Store in our dark violet-tinted glass jar or a dark, dry cabinet. Direct light oxidizes active curcumin.',
    cookingSuggestions: 'Combine with a pinch of our black pepper during cooking to increase curcumin bio-absorption by 2000%. Highly recommended for traditional milk brews (haldi doodh).',
    rating: 5.0,
    reviews: [
      {
        id: 'hld-rev-1',
        author: 'Dr. David Hegde',
        location: 'Bangalore Quiet Retreats',
        headline: 'Immense Curcumin content, genuine therapeutic quality',
        text: 'My morning yellow milk (haldi doodh) tastes deep, woody, and therapeutic now. Outstanding purity. The yellow stained our hand-block wooden tables instantly, indicating organic curcumin content, not chalk. Zero chemical sand washers!',
        rating: 5,
        date: 'May 10, 2026',
        reviewImage: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&q=80&w=400',
        helpfulVotes: 51
      },
      {
        id: 'hld-rev-2',
        author: 'Meenakshi J.',
        location: 'Pune Hills',
        headline: 'The real hand-pounded yellow gold',
        text: 'I threw away my store-bought turmeric packets immediately when this arrived in its beautiful linen latch jar. It smells like healthy Maharashtrian wet soil. Deep herbal flavor.',
        rating: 5,
        date: 'April 28, 2026',
        helpfulVotes: 11
      }
    ]
  },
  {
    id: 'tellicherry-dhania',
    name: 'Malabar Black Pepper & Coriander',
    hindiName: 'कालीमिर्च और धनिया',
    price: 330,
    weight: '150g',
    shortDescription: 'Coarsely hand-crushed Tellicherry peppercorns married with citric toasted green coriander seeds for rustic textures.',
    fullDescription: 'Designed for cooks who love texture and coarse, sudden releases of flavor. We marry premium sun-ripened Tellicherry black peppercorns from Malabar coast with fat, citrus-heavy green coriander seeds from Rajasthan nurseries. They are lightly par-roasted and cracked coarsely in granite pestles rather than fine-ground. This leaves distinct, mouth-watering specks that burst open with heat and citrus zest.',
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=800'
    ],
    ingredients: [
      'Malabar TGSEB (Tellicherry Garbled Special Extra Bold) Black Peppercorns',
      'Toasted Rajasthan Coriander Seeds'
    ],
    benefits: [
      'Improves gut motility and digestive enzymes naturally',
      'Fascinating crisp texture with zero chemical fumes or heavy crushing oil loss'
    ],
    storageInstructions: 'Keep in dry air-safe environments. Ensure the linen lid seal is fully secured.',
    cookingSuggestions: 'Sensational as a rub for roasted sweet potatoes, cottage cheese planks, baked pumpkin, or sautéed wild local mushrooms.',
    rating: 4.7,
    reviews: [
      {
        id: 'td-rev-1',
        author: 'Rohan Das',
        location: 'Kolkata ancestral apartment',
        headline: 'Phenomenal coarse crunch for tempering!',
        text: 'That coarse green coriander seed crunch is phenomenal. Perfect for tempering with local yellow mung dals. My family loved the sudden zesty pop of pepper contrast rather than tasteless powder.',
        rating: 5,
        date: 'May 06, 2026',
        reviewImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
        helpfulVotes: 12
      }
    ]
  },
  {
    id: 'chai-karha',
    name: 'Slow-Stoved Chai Karha Masala',
    hindiName: 'कढ़ाह चाय मसाला',
    price: 390,
    weight: '100g',
    shortDescription: 'An ancient soothing formulation of dried white ginger roots, forest cardamoms, and black pepper. Perfect for rain and woolly days.',
    fullDescription: 'This recipe has been in our family for four generations. Prepared in small quantities of only 15 tins every Tuesday, it features sharp, sun-baked dry Sonth (ginger root), high-altitude cardamoms, Saigon cinnamon bark, Ceylon black pepper, cloves, and a shaving of nutmeg. The warm, comforting spice blend naturally warms the chest and clears the sinuses on wet, misty mornings.',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&q=80&w=800'
    ],
    ingredients: [
      'Organic Dried White Ginger (Sonth)',
      'Green Cardamom Shells & Seeds',
      'Toasted Saigon Cinnamon Shavings',
      'Stretched Cloves',
      'Cracked Nutmeg'
    ],
    benefits: [
      'Combats cold symptoms with natural anti-viral gingerols',
      'Instantly boosts circulation and relaxes nervous tension',
      'No added sugarcane dust, black tea sweepings, or emulsifiers'
    ],
    storageInstructions: 'Ensure the copper-tight latch is pressed flat. Keep away from moist steam during tea preparation.',
    cookingSuggestions: 'Whisk a brief pinch (1/4th tsp) into milk or water while boiling your tea leaves. Boil for 3 minutes to allow complete flavor infusion.',
    rating: 4.9,
    reviews: [
      {
        id: 'ck-rev-1',
        author: 'Dr. David Hegde',
        location: 'Bangalore Quiet Retreats',
        headline: 'My morning tea routine has become sacred',
        text: '"My morning tea routine has become a sacred ritual. The Chai Karha Masala contains genuine sun-dried ginger root grains that settle beautifully at the bottom of the earthen kulhar. Earthy and clean." ',
        rating: 5,
        date: 'June 02, 2026',
        reviewImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400',
        helpfulVotes: 29
      },
      {
        id: 'ck-rev-2',
        author: 'Shirley T.',
        location: 'Shillong misty peaks',
        headline: 'Pure warmth for cozy woolly days',
        text: 'Absolutely magnificent on cold, drizzly mornings in Shillong. Clears the chest and fills the house with cinnamon and black-pepper comfort. I love that it is made fresh every Tuesday.',
        rating: 5,
        date: 'May 14, 2026',
        helpfulVotes: 14
      }
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Forest Sourcing',
    subtitle: 'Regenerative Farms',
    description: 'We dry-lease land segments from indigenous farmers in Kerala and Sangli who raise spices beneath old-growth forest canopies without synthetic chemicals.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    title: 'Terracotta Sun Curing',
    subtitle: 'Slow Bamboo Drying',
    description: 'Spices are spread out on hand-woven bamboo trays at precise heights above floor levels to solar-infuse aromatic qualities naturally.',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    title: 'Mud Stove Roasting',
    subtitle: 'Coal & Heavy Soapstone',
    description: 'Dry roasting in dense iron and mud cauldrons allows the spices to sweat their oils up to skin surfaces without caramelizing their inner seeds.',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 4,
    title: 'Granite Stone Grinding',
    subtitle: 'Cold grinding < 40 RPM',
    description: 'Traditional heavy stone mortars circle slowly. Avoiding high temperature friction enables the spice blends to retain their natural shelf-life.',
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 5,
    title: 'Hand Linen Wax Sealed',
    subtitle: 'Small Glass Vessels',
    description: 'Each spice jar is packed using natural parchment labels, layered linen cloth capping, and poured wax seals by local village craftswomen.',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=400'
  }
];

export const TESTIMONIALS: Review[] = [
  {
    id: 'rev-1',
    author: 'Ananya Roy',
    location: 'Lucknow ancestral home',
    text: '"The aroma of the Shahi Garam Masala transported me back to my grandmother\'s winter courtyard in Kakori. The texture is coarse, incredibly dense, and has a fragrance that commercial packets cannot duplicate." ',
    rating: 5,
    date: 'June 18, 2026',
    reviewImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'rev-2',
    author: 'Kabir Sengupta',
    location: 'Gurugram',
    text: '"Spectacular depth of color in the Kashmiri Mirch. Our curries glow red like liquid volcanic glass, but with a deeply comforting, polite warmth rather than a sharp burn. Absolute masterpieces." ',
    rating: 5,
    date: 'May 29, 2026',
    reviewImage: 'https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'rev-3',
    author: 'Dr. David Hegde',
    location: 'Bangalore Quiet Retreats',
    text: '"My morning tea routine has become a sacred ritual. The Chai Karha Masala contains genuine sun-dried ginger root grains that settle beautifully at the bottom of the earthen kulhar. Earthy and clean." ',
    rating: 5,
    date: 'June 02, 2026',
    reviewImage: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=400'
  }
];

export const FLOATING_PIECES = [
  { type: 'chili', label: '🌶️', top: '15%', left: '8%', delay: 0.5, size: 'text-xl' },
  { type: 'star', label: '⭐', top: '45%', left: '4%', delay: 2.1, size: 'text-sm' },
  { type: 'cinnamon', label: '🟤', top: '75%', left: '12%', delay: 1.2, size: 'text-md' },
  { type: 'coriander', label: '🟢', top: '22%', right: '10%', delay: 3.4, size: 'text-xs' },
  { type: 'pepper', label: '⚫', top: '55%', right: '6%', delay: 0.8, size: 'text-sm' },
  { type: 'turmeric', label: '🟡', top: '82%', right: '14%', delay: 1.9, size: 'text-lg' }
];
