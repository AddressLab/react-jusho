import { useState } from 'react';

import { Address, AddressKeys } from '@/types';
import { getAddressFromPostCode } from '@/api';
import axios from 'axios';

const usePostcode = (
  refs?: { [key in AddressKeys]?: React.MutableRefObject<HTMLInputElement> }
): {
  address: Address | null;
  error: string | null;
  searchAddress: (postcode: string) => void;
} => {
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchAddress = async (postCode: string) => {
    try {
      if (postCode.match(/^\d{3}-?\d{4}$/)) {
        const { data } = await getAddressFromPostCode(postCode.replace('-', ''));
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
      }
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        setError(e.message);
      } else {
        setError(e.toString());
      }
    }
  };

  return { address, error, searchAddress };
};

export { usePostcode };
