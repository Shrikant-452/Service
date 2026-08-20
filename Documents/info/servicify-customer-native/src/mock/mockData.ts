export interface Category {
  id: string;
  name: string;
  iconName: string;
  iconBg: string;
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  avatar: string;
  startingPrice: number;
  isVerified: boolean;
  distance: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  warrantyDays: number;
  responseTimeMins: number;
  heroImage: string;
  description: string;
  whatsIncluded: string[];
}

export const CATEGORIES: Category[] = [
  { id: 'electrician', name: 'Electrician', iconName: 'zap', iconBg: '#FEF3C7', description: 'Wiring, fixtures & appliances' },
  { id: 'plumber', name: 'Plumber', iconName: 'droplet', iconBg: '#E0F2FE', description: 'Pipes, leaks & fittings' },
  { id: 'ac-repair', name: 'AC Repair', iconName: 'wind', iconBg: '#E0E7FF', description: 'Service, repair & gas refill' },
  { id: 'cleaning', name: 'Cleaning', iconName: 'sparkles', iconBg: '#FCE7F3', description: 'Full home & deep clean' },
  { id: 'carpenter', name: 'Carpenter', iconName: 'hammer', iconBg: '#FEF3C7', description: 'Furniture repair & custom wood' },
  { id: 'painting', name: 'Painting', iconName: 'paintbrush', iconBg: '#DCFCE7', description: 'Interior & exterior painting' },
];

export const POPULAR_PROVIDERS: Provider[] = [
  {
    id: 'p1',
    name: 'Ramesh Electrician',
    category: 'Electrician',
    rating: 4.8,
    reviewsCount: 184,
    experienceYears: 12,
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200',
    startingPrice: 399,
    isVerified: true,
    distance: '1.2 km',
  },
  {
    id: 'p2',
    name: 'Suresh AC Repair Specialist',
    category: 'AC Repair',
    rating: 4.9,
    reviewsCount: 230,
    experienceYears: 9,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    startingPrice: 599,
    isVerified: true,
    distance: '0.8 km',
  },
  {
    id: 'p3',
    name: 'Amit Plumbing Solutions',
    category: 'Plumber',
    rating: 4.7,
    reviewsCount: 142,
    experienceYears: 8,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    startingPrice: 450,
    isVerified: true,
    distance: '2.4 km',
  },
];

export const AC_REPAIR_SERVICE_DETAILS: ServiceDetail = {
  id: 'ac-repair-service',
  title: 'AC Repair & Service',
  category: 'AC Repair',
  rating: 4.7,
  reviewsCount: 230,
  startingPrice: 599,
  warrantyDays: 60,
  responseTimeMins: 30,
  heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
  description: 'Expert in all types of AC repair, installation & gas refilling. Certified technicians with advanced diagnostic tools.',
  whatsIncluded: [
    'AC General Service',
    'Gas Refilling & Leak Detection',
    'Filter Cleaning & Sanitization',
    'Performance Check & Electrical Audit',
  ],
};

export const AVAILABLE_DATES = [
  { day: 'Mon', date: '20', fullDate: '20 May 2024' },
  { day: 'Tue', date: '21', fullDate: '21 May 2024' },
  { day: 'Wed', date: '22', fullDate: '22 May 2024' },
  { day: 'Thu', date: '23', fullDate: '23 May 2024' },
  { day: 'Fri', date: '24', fullDate: '24 May 2024' },
];

export const TIME_SLOTS = [
  '10:00 AM',
  '12:00 PM',
  '02:00 PM',
  '04:00 PM',
  '06:00 PM',
];

export const SAVED_ADDRESSES = [
  {
    id: 'addr-1',
    label: 'Home',
    fullAddress: '12, Green Park, Andheri West, Mumbai - 400058',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Office',
    fullAddress: '402, Business Bay, BKC, Mumbai - 400051',
    isDefault: false,
  },
];

export const USER_PROFILE = {
  name: 'Priya Sharma',
  phone: '+91 98765 43210',
  email: 'priya.sharma@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  walletBalance: 1250,
};
