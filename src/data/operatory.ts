export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface TimelineEvent {
  year: string;
  label: string;
  detail: string;
  progress: number; // 0-1 position on timeline
}

export interface ChairPartData {
  id: string;
  label: string;
  category: ProductCategory;
  // Initial transform in assembled chair (relative to center, in px/%)
  assembled: {
    x: number;
    y: number;
    z: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    width: number;
    height: number;
    depth: number;
  };
  // Final transform when exploded
  exploded: {
    x: number;
    y: number;
    z: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    scale: number;
  };
}

export const COMPANY = {
  name: 'ELECTRODENT',
  tagline: 'TRADERS',
  subtitle: 'House of Dental Excellence',
  headline: 'Serving Dentists, Students & Lab Technicians Across Moradabad Since 2000',
  subheadline: 'Wholesale & Retail Dental Equipment — Chairs, X-Rays, Handpieces, Sterilizers & More',
  phone: '9219635447',
  whatsapp: '919219635447',
  address: 'Shop No-32, Near Kapoor Company Chowk, Hallet Road, Civil Lines, Moradabad, Uttar Pradesh 244001',
  hours: 'Monday – Saturday: 10:30 AM – 8:00 PM',
  closedNote: 'Closed on Tuesdays',
};

export const CATEGORIES: ProductCategory[] = [
  {
    id: 'heavy-equipment',
    title: 'Heavy Clinic Equipment',
    description: 'Hydraulic & electrical dental chairs, X-ray machines, air compressors.',
    image: '/images/hero-dental-chair.jpg',
  },
  {
    id: 'operatory-apparatus',
    title: 'Operatory Apparatus',
    description: 'LED curing lights, high/low-speed handpieces, micro-motors.',
    image: '/images/led-curing-light.jpg',
  },
  {
    id: 'hand-instruments',
    title: 'Hand Instruments',
    description: 'Probes, extraction forceps, luxury syringes, scaling mirrors.',
    image: '/images/handpiece-set.jpg',
  },
  {
    id: 'lab-sterilization',
    title: 'Lab & Sterilization',
    description: 'Autoclaves, glass bead sterilizers, dental lab benches.',
    image: '/images/autoclave-sterilizer.jpg',
  },
  {
    id: 'endodontic-tools',
    title: 'Endodontic Tools',
    description: 'Root canal files, apex locators, obturation systems.',
    image: '/images/root-canal-files.jpg',
  },
  {
    id: 'consumables',
    title: 'Consumables & Materials',
    description: 'Dental plaster, composites, cements, chemical impressions.',
    image: '/images/root-canal-files.jpg',
  },
];

export const CHAIR_PARTS: ChairPartData[] = [
  {
    id: 'seat',
    label: 'Patient Module',
    category: CATEGORIES[0],
    assembled: { x: 0, y: 40, z: 0, rotateX: -5, rotateY: 0, rotateZ: 0, width: 180, height: 220, depth: 160 },
    exploded: { x: -180, y: -60, z: 80, rotateX: 0, rotateY: -25, rotateZ: -8, scale: 1.15 },
  },
  {
    id: 'overhead-light',
    label: 'Illumination Arm',
    category: CATEGORIES[1],
    assembled: { x: 0, y: -180, z: 40, rotateX: 15, rotateY: 0, rotateZ: 0, width: 160, height: 80, depth: 80 },
    exploded: { x: 40, y: -260, z: 140, rotateX: 20, rotateY: 35, rotateZ: 5, scale: 1.1 },
  },
  {
    id: 'tray',
    label: 'Instrument Tray',
    category: CATEGORIES[2],
    assembled: { x: 140, y: -20, z: 60, rotateX: 0, rotateY: -30, rotateZ: 0, width: 120, height: 60, depth: 80 },
    exploded: { x: 240, y: -40, z: 160, rotateX: 0, rotateY: -45, rotateZ: 10, scale: 1.2 },
  },
  {
    id: 'base',
    label: 'Sterilization Base',
    category: CATEGORIES[3],
    assembled: { x: 0, y: 200, z: -20, rotateX: 0, rotateY: 0, rotateZ: 0, width: 160, height: 80, depth: 140 },
    exploded: { x: -40, y: 320, z: -40, rotateX: 10, rotateY: 20, rotateZ: -5, scale: 1.15 },
  },
  {
    id: 'left-arm',
    label: 'Endodontic Column',
    category: CATEGORIES[4],
    assembled: { x: -130, y: 20, z: 30, rotateX: 0, rotateY: 35, rotateZ: 0, width: 80, height: 160, depth: 80 },
    exploded: { x: -280, y: 80, z: 120, rotateX: 0, rotateY: 55, rotateZ: -12, scale: 1.1 },
  },
  {
    id: 'right-panel',
    label: 'Consumables Bay',
    category: CATEGORIES[5],
    assembled: { x: 130, y: 100, z: -30, rotateX: 0, rotateY: -25, rotateZ: 0, width: 80, height: 120, depth: 60 },
    exploded: { x: 260, y: 160, z: -80, rotateX: 0, rotateY: -60, rotateZ: 8, scale: 1.1 },
  },
];

export const TIMELINE: TimelineEvent[] = [
  { year: '2000', label: 'Founded', detail: 'A small clinic supply store opens in Moradabad.', progress: 0 },
  { year: '2010', label: 'Expanded', detail: 'Began supplying dental institutes across Uttar Pradesh.', progress: 0.4 },
  { year: '2024', label: '1000+ Dentists', detail: 'Trusted by over a thousand dental professionals.', progress: 1 },
];

export const TRUST_SIGNALS = [
  'Quick supply turnarounds',
  'Face-to-face dealer interactions',
  'Bulk order reductions',
  'Personalized pricing',
];

export const STATS = [
  { value: 2000, suffix: '+', label: 'Products Available' },
  { value: 25, suffix: '+', label: 'Years of Service' },
  { value: 500, suffix: '+', label: 'Happy Dentists' },
];
