import { io, Socket } from 'socket.io-client';
import { SOCKET_URL, getAuthToken } from '../api/config';

let socket: Socket | null = null;

export const initSocket = async (): Promise<Socket> => {
  if (!socket) {
    const token = await getAuthToken();
    socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
      auth: { token },
    });

    socket.on('connect', () => {
      console.log('[Socket] Connected to server:', socket?.id);
    });

    socket.on('connect_error', (err) => {
      console.warn('[Socket] Connection error:', err.message);
    });

    socket.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected:', reason);
    });
  }

  if (!socket.connected) {
    socket.connect();
  }

  return socket;
};

export const joinBookingRoom = (bookingId: string) => {
  if (socket && socket.connected) {
    socket.emit('join_booking', { bookingId });
    console.log(`[Socket] Joined room for booking ${bookingId}`);
  }
};

export const subscribeToLocationUpdates = (
  callback: (data: { lat: number; lng: number; etaMins: number }) => void
) => {
  if (socket) {
    socket.on('location_update', callback);
  }
};

export const subscribeToStatusUpdates = (
  callback: (data: { status: string; otp?: string }) => void
) => {
  if (socket) {
    socket.on('status_update', callback);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.off('location_update');
    socket.off('status_update');
    socket.disconnect();
    socket = null;
    console.log('[Socket] Socket disconnected and cleaned up');
  }
};
