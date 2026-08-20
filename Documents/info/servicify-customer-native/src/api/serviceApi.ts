import { apiClient } from './apiClient';
import { CATEGORIES, POPULAR_PROVIDERS, AC_REPAIR_SERVICE_DETAILS, Category, Provider, ServiceDetail } from '../mock/mockData';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await apiClient.get('/categories');
    return data;
  } catch (error) {
    // Fallback to local mock data if backend server is unreachable
    console.log('[serviceApi] Using mock categories');
    return CATEGORIES;
  }
};

export const getNearbyProviders = async (lat = 19.0760, lng = 72.8777): Promise<Provider[]> => {
  try {
    const { data } = await apiClient.get('/providers/nearby', { params: { lat, lng } });
    return data;
  } catch (error) {
    console.log('[serviceApi] Using mock providers');
    return POPULAR_PROVIDERS;
  }
};

export const getServiceDetails = async (serviceId: string): Promise<ServiceDetail> => {
  try {
    const { data } = await apiClient.get(`/services/${serviceId}`);
    return data;
  } catch (error) {
    console.log('[serviceApi] Using mock service details');
    return AC_REPAIR_SERVICE_DETAILS;
  }
};
