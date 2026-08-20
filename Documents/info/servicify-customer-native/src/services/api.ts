import axios from 'axios';
import { CATEGORIES, POPULAR_PROVIDERS, USER_PROFILE } from '../mock/mockData';

// --------------------------------------------------------
// REAL API SETUP (For when backend is ready)
// --------------------------------------------------------

export const api = axios.create({
  baseURL: 'https://your-api.example.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add request interceptors to automatically inject Auth Tokens
api.interceptors.request.use(async (config) => {
  // const token = await AsyncStorage.getItem('userToken');
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --------------------------------------------------------
// MOCK API SERVICES (For UI Development)
// --------------------------------------------------------

// Helper to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchHomeData = async () => {
  await delay(1200); // simulate 1.2s network delay
  
  // In the future, this would be:
  // const response = await api.get('/home');
  // return response.data;
  
  return {
    categories: CATEGORIES,
    popularProviders: POPULAR_PROVIDERS,
  };
};

export const fetchUserProfile = async () => {
  await delay(1000);
  
  return USER_PROFILE;
};

export const fetchBookingsList = async () => {
  await delay(1500);
  
  // Mocking some past and upcoming bookings
  return [
    {
      id: 'BKG-001',
      serviceTitle: 'AC Repair & Service',
      providerName: 'Ramesh Kumar',
      date: '21 May 2024',
      time: '12:00 PM',
      status: 'Upcoming',
      price: 629,
    },
    {
      id: 'BKG-002',
      serviceTitle: 'Deep Home Cleaning',
      providerName: 'Anita Sharma',
      date: '10 Apr 2024',
      time: '09:00 AM',
      status: 'Completed',
      price: 1499,
    }
  ];
};

export const fetchWalletDetails = async () => {
  await delay(1200);
  
  return {
    balance: USER_PROFILE.walletBalance,
    transactions: [
      { id: 'TXN-001', title: 'Added to Wallet', date: '15 May 2024', amount: 500, type: 'credit' },
      { id: 'TXN-002', title: 'AC Repair Payment', date: '01 May 2024', amount: -629, type: 'debit' },
      { id: 'TXN-003', title: 'Referral Bonus', date: '28 Apr 2024', amount: 100, type: 'credit' },
    ]
  };
};
