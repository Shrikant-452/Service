export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  OtpVerification: {
    name: string;
    mobile: string;
    email: string;
    address: string;
    gender: string;
    dob: string;
    demoOtp: string;
  };
  MainTabs: undefined;
  ServiceDetails: {
    serviceId: string;
    title: string;
    category?: string;
    price?: number;
  };
  Booking: {
    serviceId: string;
    serviceTitle: string;
    price: number;
  };
  LiveTracking: {
    bookingId: string;
    otp: string;
    providerName: string;
    providerRating: number;
    serviceTitle: string;
  };
  ServiceComplete: {
    bookingId: string;
    providerName: string;
    totalAmount: number;
  };
};

export type TabParamList = {
  HomeTab: undefined;
  BookingsTab: undefined;
  WalletTab: undefined;
  ProfileTab: undefined;
};
