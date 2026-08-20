import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// On Android emulator, localhost maps to 10.0.2.2. On iOS simulator/web, it is localhost.
const defaultHost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const API_BASE_URL = `http://${defaultHost}:5000/api`;
export const SOCKET_URL = `http://${defaultHost}:5000`;

const TOKEN_KEY = '@servicify_token';

export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    return null;
  }
};

export const setAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

export const removeAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};
