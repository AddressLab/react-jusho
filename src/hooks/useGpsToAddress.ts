import { useGeolocation } from '@/hooks/useGeolocation';
import { getAddressFromGeo } from '@/api/index';
import { Address } from '@/types';
import axios from 'axios';

const useGpsToAddress = () => {
  const { latitude, longitude } = useGeolocation();

  const getAddress = async (): Promise<{
    address: Address | null;
    error: string | null;
  }> => {
    if (latitude !== null && longitude !== null) {
      try {
        const { data } = await getAddressFromGeo(latitude, longitude);
        return { address: data, error: null };
      } catch (e) {
        if (axios.isAxiosError(e)) {
          return { address: null, error: e.message };
        }
        return { address: null, error: (e as any).toString() };
      }
    }
    return { address: null, error: 'Could not get the latitude or longitude' };
  };

  return {
    getAddress,
  };
};

export { useGpsToAddress };
