import { useState } from 'react';

import { Address } from '@/types';
import { getAddressFromPostCode } from '@/api';
import axios from 'axios';

const usePostcode = ({
  prefRef,
  cityRef,
  townRef,
}: {
  prefRef?: React.MutableRefObject<HTMLInputElement>;
  cityRef?: React.MutableRefObject<HTMLInputElement>;
  townRef?: React.MutableRefObject<HTMLInputElement>;
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
        const { data } = await getAddressFromPostCode(postCode);
        setAddress(data);
        if (prefRef) {
          prefRef.current.value = data.pref;
        }
        if (cityRef) {
          cityRef.current.value = data.city;
        }
        if (townRef) {
          townRef.current.value = data.town;
        }
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        setError(e.message);
      }
    }
  };

  return { address, error, searchAddress };
};

export type { Address };
export { usePostcode };
