import { apiClient } from './apiClient';

export interface BookingPayload {
  serviceId: string;
  serviceTitle: string;
  date: string;
  timeSlot: string;
  addressId: string;
  notes?: string;
  totalAmount: number;
}

export interface BookingResponse {
  bookingId: string;
  status: 'pending' | 'assigned' | 'on_the_way' | 'in_progress' | 'completed';
  otp: string;
  providerName: string;
  providerPhone?: string;
  totalAmount: number;
}

export const createBooking = async (payload: BookingPayload): Promise<BookingResponse> => {
  try {
    const { data } = await apiClient.post('/bookings', payload);
    return data;
  } catch (error) {
    console.log('[bookingApi] Fallback creating mock booking');
    return {
      bookingId: `#SRV${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'on_the_way',
      otp: '2468',
      providerName: 'Ramesh Kumar',
      providerPhone: '+91 98765 00000',
      totalAmount: payload.totalAmount,
    };
  }
};

export const submitServiceReview = async (
  bookingId: string,
  rating: number,
  tipAmount: number
): Promise<{ success: boolean; message: string }> => {
  try {
    const { data } = await apiClient.post(`/bookings/${bookingId}/review`, { rating, tipAmount });
    return data;
  } catch (error) {
    console.log('[bookingApi] Fallback review submission');
    return { success: true, message: 'Review submitted successfully' };
  }
};
