/**
 * Crayola Design Studio — Portfolio Projects Registry
 * Simplified Taxonomy: Interior, Exterior, and 3D Visualizations
 * Headlined by the 4 Top Selected Works:
 *   1. Anthem Villa (N Studios)
 *   2. Rudra (Interactive 3D Master Layout & Township Development)
 *   3. Santhosh Project
 *   4. Jonathan Residence
 */

export const projects = [
  // ==========================================
  // TOP SELECTED WORK 1: Anthem Villa (N Studios)
  // ==========================================
  {
    id: 'anthem-villa',
    title: 'Anthem Villa (N Studios)',
    category: 'exterior',
    featured: true,
    topSelected: true,
    badge: 'Flagship Villa',
    typology: 'Luxury Villa & Architectural Visualization',
    location: 'Bangalore, India',
    area: '9,500 sq ft',
    year: '2026',
    thumbnail: '/projects/selected/anthem-villa/hero-facade.webp',
    heroPosition: 'center 45%',
    cardPosition: 'center 45%',
    images: [
      '/projects/selected/anthem-villa/hero-facade.webp',
      '/projects/selected/anthem-villa/grand-double-height-living.webp',
      '/projects/selected/anthem-villa/dining-terrace-suite.webp',
      '/projects/selected/anthem-villa/upper-lounge-salon.webp',
      '/projects/selected/anthem-villa/pooja-sanctuary.webp',
      '/projects/selected/anthem-villa/master-suite-bedroom.webp',
      '/projects/selected/anthem-villa/executive-office.webp',
      '/projects/selected/anthem-villa/courtyard-terrace.webp'
    ],
    description: [
      "Commissioned by N Studios, Anthem Villa represents an architectural synthesis of monumental white rectilinear planes, warm timber soffits, and tropical indoor-outdoor fluidity.",
      "The residence features cantilevered glass balconies, twilight landscape accent lighting, and custom interior suites encompassing a double-height grand salon, private screening theater, and master spa retreat."
    ]
  },

  // ==========================================
  // TOP SELECTED WORK 2: Rudra 3D Master Layout
  // ==========================================
  {
    id: 'rudra',
    title: 'Rudra 3D Master Layout',
    category: '3d-viz',
    featured: true,
    topSelected: true,
    badge: '3D Township Masterplan',
    typology: '24-Acre Gated Township Visualization',
    location: 'Tamil Nadu, India',
    area: '24 Acres Masterplan',
    year: '2026',
    thumbnail: '/projects/selected/rudra/master-layout-3d.webp',
    heroPosition: 'center 50%',
    cardPosition: 'center 50%',
    masterLayout3D: '/projects/selected/rudra/master-layout-3d.webp',
    masterLayoutPlan: '/projects/selected/rudra/master-layout-plan.webp',
    // Spatial interactive coordinates on master-layout-3d.webp
    masterplanPins: [
      {
        id: 'arch',
        name: 'Grand Entrance Arch',
        category: 'Infrastructure',
        x: 67,
        y: 50,
        image: '/projects/selected/rudra/entrance-arch.webp',
        desc: 'Monumental modern cantilevered entrance gateway with integrated warm architectural lighting and dual-lane security ingress.'
      },
      {
        id: 'clubhouse',
        name: 'Club House & Wellness',
        category: 'Amenities',
        x: 18,
        y: 54,
        image: '/projects/selected/rudra/clubhouse-pool.webp',
        desc: 'Triple-height contemporary glass clubhouse featuring banquet facilities, private fitness center, and executive rooftop lounge.'
      },
      {
        id: 'pool',
        name: 'Swimming Pool & Sun Deck',
        category: 'Recreation',
        x: 15,
        y: 63,
        image: '/projects/selected/rudra/swimming-pool.webp',
        desc: 'Resort-grade open-air pool deck with submerged loungers, kids shallow splash area, and shaded poolside cabanas.'
      },
      {
        id: 'tennis',
        name: 'Tennis & Sports Complex',
        category: 'Sports',
        x: 19,
        y: 47,
        image: '/projects/selected/rudra/tennis-court.webp',
        desc: 'All-weather championship tennis court and multipurpose sports grounds enclosed by dense acoustic privacy hedges.'
      },
      {
        id: 'temple',
        name: 'Township Temple',
        category: 'Spiritual',
        x: 82,
        y: 28,
        image: '/projects/selected/rudra/temple.webp',
        desc: 'Traditional South Indian stone temple with hand-carved pillars, quiet reflective gardens, and serene pedestrian approach.'
      },
      {
        id: 'park',
        name: 'Central Park & Gazebo',
        category: 'Greenery',
        x: 74,
        y: 40,
        image: '/projects/selected/rudra/park-promenade.webp',
        gallery: [
          '/projects/selected/rudra/park-promenade.webp',
          '/projects/selected/rudra/park-gazebo.webp'
        ],
        desc: 'Lush landscaped green corridor featuring flowering cherry blossom groves, the signature artisanal wooden gazebo pavilion (HUT), and children play park.'
      },
      {
        id: 'apartments',
        name: 'Residential Apartment Towers',
        category: 'Residential',
        x: 13,
        y: 43,
        image: '/projects/selected/rudra/apartment-01.webp',
        gallery: [
          '/projects/selected/rudra/apartment-01.webp',
          '/projects/selected/rudra/apartment-02.webp'
        ],
        desc: 'Contemporary residential apartment elevations featuring Plot 47 modern cantilevered balconies, stilt parking, and township view terraces.'
      },
      {
        id: 'streetviews',
        name: 'Avenue Streetscapes',
        category: 'Urban Design',
        x: 42,
        y: 44,
        image: '/projects/selected/rudra/street-view-01.webp',
        gallery: [
          '/projects/selected/rudra/street-view-01.webp',
          '/projects/selected/rudra/street-view-02.webp',
          '/projects/selected/rudra/street-view-03.webp',
          '/projects/selected/rudra/street-view-04.webp'
        ],
        desc: 'Interconnected tree-lined residential avenues with reflective asphalt, lush perimeter planters, and bespoke modern villa elevations.'
      }
    ],
    images: [
      '/projects/selected/rudra/master-layout-3d.webp',
      '/projects/selected/rudra/master-layout-plan.webp',
      '/projects/selected/rudra/entrance-arch.webp',
      '/projects/selected/rudra/clubhouse-pool.webp',
      '/projects/selected/rudra/swimming-pool.webp',
      '/projects/selected/rudra/tennis-court.webp',
      '/projects/selected/rudra/temple.webp',
      '/projects/selected/rudra/park-promenade.webp',
      '/projects/selected/rudra/park-gazebo.webp',
      '/projects/selected/rudra/apartment-01.webp',
      '/projects/selected/rudra/apartment-02.webp',
      '/projects/selected/rudra/street-view-01.webp',
      '/projects/selected/rudra/street-view-02.webp'
    ],
    description: [
      "A monumental 24-acre integrated township masterplan visualised for Rudra Developers, balancing density, human-scaled avenues, and world-class communal amenities.",
      "Crayola Design Studio developed the full spatial narrative — from the iconic vehicular entrance arch and 5 distinct residential streetscapes to the civic temple gardens, recreation sports pavilion, and apartment towers."
    ]
  },

  // ==========================================
  // TOP SELECTED WORK 3: Santhosh Project
  // ==========================================
  {
    id: 'santhosh-project',
    title: 'Santhosh Project',
    category: 'exterior',
    featured: true,
    topSelected: true,
    badge: 'Contemporary Living',
    typology: 'Contemporary Residence & Interior Architecture',
    location: 'Chennai, India',
    area: '4,800 sq ft',
    year: '2026',
    thumbnail: '/projects/selected/santhosh/hero-living.webp',
    heroPosition: 'center 50%',
    cardPosition: 'center 50%',
    images: [
      '/projects/selected/santhosh/hero-living.webp',
      '/projects/selected/santhosh/dining-suite.webp',
      '/projects/selected/santhosh/entertainment-wall.webp',
      '/projects/selected/santhosh/lounge-seating.webp',
      '/projects/selected/santhosh/exterior-elevation.webp',
      '/projects/selected/santhosh/exterior-side-angle.webp'
    ],
    description: [
      "An organic contemporary residence balancing understated architectural facades with masterfully crafted interior living spaces.",
      "The design highlights curved walnut archways, floating illuminated joinery, textured marble paneling, and sheer floor-to-ceiling drapery that filters natural daylight across peaceful entertaining zones."
    ]
  },

  // ==========================================
  // TOP SELECTED WORK 4: Jonathan Residence
  // ==========================================
  {
    id: 'jonathan',
    title: 'Jonathan Residence',
    category: 'interior',
    featured: true,
    topSelected: true,
    badge: 'Luxury Interior',
    typology: 'Luxury Modern Interior Suite',
    location: 'Bangalore, India',
    area: '3,200 sq ft',
    year: '2026',
    thumbnail: '/projects/selected/jonathan/hero-living.webp',
    heroPosition: 'center 50%',
    cardPosition: 'center 50%',
    images: [
      '/projects/selected/jonathan/hero-living.webp',
      '/projects/selected/jonathan/dining-suite.webp',
      '/projects/selected/jonathan/lounge-area.webp',
      '/projects/selected/jonathan/bar-counter.webp',
      '/projects/selected/jonathan/master-bed.webp',
      '/projects/selected/jonathan/kids-bedroom.webp'
    ],
    description: [
      "A tailored private interior commission crafted around modern entertaining and serene domestic warmth.",
      "Rich fluted wood paneling, backlit marble bar counters, plush sectional seating, and delicate brass architectural accents transform the space into an enduring retreat of refined elegance."
    ]
  },

  // ==========================================
  // SECONDARY ARCHIVE WORKS (Existing Portfolio)
  // ==========================================
  {
    id: 'grand-villa-facade',
    title: 'Grand Villa Facade',
    category: 'exterior',
    location: 'Coimbatore, India',
    area: '7,800 sq ft',
    year: '2026',
    thumbnail: '/projects/real/grand-villa-elevation-front.jpg',
    heroPosition: 'center 50%',
    cardPosition: 'center 50%',
    images: [
      '/projects/real/grand-villa-elevation-front.jpg',
      '/projects/real/grand-villa-elevation-angle.jpg',
      '/projects/img-001.jpg',
      '/projects/img-002.jpg'
    ],
    description: [
      "A monumental private residence elevation balancing sculptural white geometry with natural warmth. Vertical timber louvers and arched window cutouts filter the tropical sun while bougainvillea pergolas soften the exterior roofline.",
      "Linear yellow architectural LED insets trace the primary volumetric transitions, lending dramatic presence to the porte-cochère and street-facing elevation at twilight."
    ]
  },
  {
    id: 'chennai-residence',
    title: 'Chennai Residence',
    category: 'exterior',
    location: 'Chennai, India',
    area: '5,200 sq ft',
    year: '2026',
    thumbnail: '/projects/real/chennai-residence-elevation.jpg',
    heroPosition: 'center 42%',
    cardPosition: 'center 40%',
    images: [
      '/projects/real/chennai-residence-elevation.jpg',
      '/projects/img-003.jpg',
      '/projects/img-004.jpg',
      '/projects/img-005.jpg'
    ],
    description: [
      "An organic multi-tiered contemporary elevation featuring curvilinear white concrete balconies, arched backlit marble niches, and cascading planters.",
      "The building skin acts as a microclimate buffer for coastal South Indian heat, creating deep recessed overhangs that invite natural sea breezes while maintaining strict thermal comfort."
    ]
  },
  {
    id: 'mr-amar-residence',
    aliases: ['james-residence'],
    title: 'Mr. Amar Residence',
    category: 'interior',
    badge: 'Luxury Residential Interior',
    location: 'Bangalore, India',
    area: '4,600 sq ft',
    year: '2026',
    thumbnail: '/projects/mr-amar/hero-living.webp',
    heroPosition: 'center 50%',
    cardPosition: 'center 50%',
    fullWidthIndexes: [0, 3, 6, 9],
    images: [
      '/projects/mr-amar/hero-living.webp',
      '/projects/mr-amar/living-salon-01.webp',
      '/projects/mr-amar/living-salon-02.webp',
      '/projects/mr-amar/kitchen-dining.webp',
      '/projects/mr-amar/dining-suite.webp',
      '/projects/mr-amar/courtyard-garden.webp',
      '/projects/mr-amar/master-suite-bed.webp',
      '/projects/mr-amar/master-suite-tv.webp',
      '/projects/mr-amar/executive-study.webp',
      '/projects/mr-amar/pooja-mandir-door.webp',
      '/projects/mr-amar/guest-suite-ff.webp',
      '/projects/mr-amar/guest-bedroom-gf.webp',
      '/projects/mr-amar/architectural-staircase.webp',
      '/projects/mr-amar/ensuite-bathroom.webp'
    ],
    description: [
      "Commissioned for Mr. Amar, this bespoke 4,600 sq ft private residence embodies contemporary Indian luxury, seamlessly blending monumental spatial volumes with refined bespoke joinery, warm ambient lighting, and rich organic materials.",
      "The residence unfolds across a grand double-height living salon with Statuario marble feature claddings, an open gourmet kitchen with fluted breakfast bar, dedicated home executive office, sacred artisanal pooja sanctum, cantilevered floating staircase, and lavish master retreats."
    ]
  },
  {
    id: 'high-profession-suite',
    title: 'High-Profession Master Suite',
    category: 'interior',
    location: 'Hyderabad, India',
    area: '1,450 sq ft',
    year: '2025',
    thumbnail: '/projects/real/master-suite-acoustic-slats.jpg',
    heroPosition: 'center 78%',
    cardPosition: 'center 76%',
    images: [
      '/projects/real/master-suite-acoustic-slats.jpg',
      '/projects/real/master-suite-side-angle.jpg',
      '/projects/img-048.jpg',
      '/projects/img-049.jpg'
    ],
    description: [
      "An executive bedroom suite balancing private acoustic focus with luxurious comfort. Vertical dark fluted timber slats line the headboard wall, concealing ambient LED channels and acoustic insulation for peaceful rest.",
      "A cantilevered marble desk and sculptural boucle lounge chair establish a sophisticated workspace zone without encroaching on bedroom tranquility."
    ]
  },
  {
    id: 'urban-stone-tower',
    title: 'Urban Stone Tower',
    category: '3d-viz',
    location: 'Hyderabad, India',
    area: '18,500 sq ft',
    year: '2026',
    thumbnail: '/projects/real/urban-stone-tower-elevation.png',
    heroPosition: 'center 35%',
    cardPosition: 'center 35%',
    images: [
      '/projects/real/urban-stone-tower-elevation.png',
      '/projects/img-008.jpg',
      '/projects/img-009.jpg',
      '/projects/img-010.jpg'
    ],
    description: [
      "A vertical architectural statement cloaked in textured fluted grey stone, dark graphite fenestration, and recessed garden verandas.",
      "Engineered for mixed commercial and luxury residential use, the tower features floating glass balconies and integrated tropical landscaping across each tier."
    ]
  },
  {
    id: 'japandi-bedroom-sanctuary',
    title: 'Japandi Bedroom Sanctuary',
    category: 'interior',
    location: 'Coimbatore, India',
    area: '980 sq ft',
    year: '2025',
    thumbnail: '/projects/real/japandi-platform-bedroom.jpg',
    heroPosition: 'center 40%',
    cardPosition: 'center 40%',
    images: [
      '/projects/real/japandi-platform-bedroom.jpg',
      '/projects/real/japandi-platform-bedroom-angle.jpg',
      '/projects/img-050.jpg',
      '/projects/img-051.jpg'
    ],
    description: [
      "A serene master bedroom informed by Japanese minimalism and Scandinavian warmth. A floating low-profile platform bed rests against micro-cement wall finishes, framed by curved reeded glass partitions and warm cove uplighting.",
      "Floor-to-ceiling linen drapery softens incoming natural light, creating a restorative space designed for mindful pause."
    ]
  }
];

export const categories = [
  { id: 'all', label: 'All Works' },
  { id: 'interior', label: 'Interior' },
  { id: 'exterior', label: 'Exterior' },
  { id: '3d-viz', label: '3D Visualizations' }
];
