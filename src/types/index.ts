interface Kana {
  pref: string;
  city: string;
  town: string;
  office: string;
  allAddress: string;
}

interface Address {
  prefCode: string;
  cityCode: string;
  postcode: string;
  pref: string;
  city: string;
  town: string;
  allAddress: string;
  office: string;
  hiragana: Kana;
  halfWidthKana: Kana;
  fullWidthKana: Kana;
  generalPostcode: boolean;
  officePostcode: boolean;
}

type AddressKeys =
  | 'prefCode'
  | 'cityCode'
  | 'postcode'
  | 'pref'
  | 'city'
  | 'town'
  | 'allAddress'
  | 'office';

export type { Kana, Address, AddressKeys };
