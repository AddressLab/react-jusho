import { Address } from '@/types';

type GetAddressFromPostCodeResponse = Array<Address>;
type GetAddressFromGeoResponse = Address;

export type { GetAddressFromPostCodeResponse, GetAddressFromGeoResponse };
