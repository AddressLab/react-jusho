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

export type { Kana, Address };
