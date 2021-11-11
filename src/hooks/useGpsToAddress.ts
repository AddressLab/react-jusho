import { useGeolocation } from '@/hooks/useGeolocation';
import { getAddressFromGeo } from '@/api/index';
import { Address, AddressKeys } from '@/types';
import axios from 'axios';
import { useState } from 'react';

const useGpsToAddress = (
  refs?: { [key in AddressKeys]?: React.MutableRefObject<HTMLInputElement> }
) => {
  const { latitude, longitude } = useGeolocation();
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getAddress = async (): Promise<void> => {
    if (latitude !== null && longitude !== null) {
      try {
        const { data } = await getAddressFromGeo(latitude, longitude);
        if (data.length > 0) {
          setAddress(data[0]);
          setError(null);
          if (refs) {
            Object.entries(refs).forEach(([key, value]) => {
              if (value !== undefined && value.current.value !== undefined) {
                value.current.value = data[0][key];
              }
            });
          }
        } else {
          setError('No entries.');
        }
      } catch (e: any) {
        if (axios.isAxiosError(e)) {
          setError(e.message);
        } else {
          setError(e.toString());
        }
      }
    } else {
      setError('Could not get the latitude or longitude.');
    }
  };

  return {
    address,
    error,
    getAddress,
  };
};

export { useGpsToAddress };
