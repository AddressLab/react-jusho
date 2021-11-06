import { useState } from 'react';

import { Address } from '@/types';
import { getAddressFromPostCode } from '@/api';
import axios from 'axios';

type AddressKeys =
  | 'prefCode'
  | 'cityCode'
  | 'postcode'
  | 'pref'
  | 'city'
  | 'town'
  | 'allAddress'
  | 'office';

const usePostcode = ({
  refs,
}: {
  refs: { [key in AddressKeys]?: React.MutableRefObject<HTMLInputElement> };
}): {
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
        setAddress(data);
        Object.entries(refs).forEach(([key, value]) => {
          if (value !== undefined && value.current.value !== undefined) {
            value.current.value = data[key];
          }
        });
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.message);
      }
    }
  };

  return { address, error, searchAddress };
};

export type { AddressKeys };
export { usePostcode };
