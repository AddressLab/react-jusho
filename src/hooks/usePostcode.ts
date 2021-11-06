import { useState } from 'react';

import { Address } from '@/types';

const usePostcode = ({
  prefRef,
  cityRef,
  townRef,
}: {
  prefRef?: { current: HTMLInputElement };
  cityRef?: { current: HTMLInputElement };
  townRef?: { current: HTMLInputElement };
}): {
  address: Partial<Address> | null;
  error: string | null;
  searchAddress: (postcode: string) => void;
} => {
  const [address, setAddress] = useState<Partial<Address> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchAddress = async (postCode: string) => {
    try {
      if (postCode.match(/^\d{3}-?\d{4}$/)) {
        setAddress({
          pref: '東京都',
          city: '港区',
          town: '芝公園４丁目',
        });
        if (prefRef) {
          prefRef.current.value = '東京都';
        }
        if (cityRef) {
          cityRef.current.value = '港区';
        }
        if (townRef) {
          townRef.current.value = '芝公園４丁目';
        }
      }
    } catch (err: any) {
      setError(err.toString());
    }
  };

  return { address, error, searchAddress };
};

export type { Address };
export { usePostcode };
