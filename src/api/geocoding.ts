import axios from 'axios';

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface GeocodingGeometry {
  location: google.maps.LatLngLiteral;
}

export interface GeocodingResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: GeocodingGeometry;
}

export interface GeocodingResponse {
  plus_code?: any;
  results: GeocodingResult[];
}

export interface JPAddressFormat {
  郵便番号: string;
  住所: string;
  建物名: string;
  部屋名: string;
}

export const reverseGeocodingAPI = async (lat: number, lng: number): Promise<GeocodingResponse> => {
  const apiKey = process.env.GoogleMapsAPIKey!;
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=ja`
  );
  if (response.data.status !== 'OK') {
    throw new Error('API Request Error!');
  }
  const data = response.data as GeocodingResponse;
  return data;
};

export const formatGeocodingResult = (res: GeocodingResponse) => {
  const componentsCounts: number[] = res.results.map((r) => {
    return r.address_components.filter((c) => !c.types.includes('route')).length;
  });
  const resultIndex = componentsCounts.indexOf(Math.max(...componentsCounts));
  const result = res.results[resultIndex];
  const address = result.address_components.reverse();
  const addressFormat: JPAddressFormat = {
    郵便番号: '',
    住所: '',
    建物名: '',
    部屋名: '',
  };
  address.forEach((component) => {
    if (component.types.includes('postal_code')) {
      addressFormat.郵便番号 = component.long_name;
    } else if (component.types.includes('administrative_area_level_1')) {
      addressFormat.住所 += component.long_name;
    } else if (component.types.includes('administrative_area_level_2')) {
      addressFormat.住所 += component.long_name;
    } else if (component.types.includes('locality')) {
      addressFormat.住所 += component.long_name;
    } else if (component.types.includes('sublocality_level_1')) {
      addressFormat.住所 += component.long_name;
    } else if (component.types.includes('sublocality_level_2')) {
      addressFormat.住所 += component.long_name;
    } else if (component.types.includes('sublocality_level_3')) {
      addressFormat.住所 += component.long_name;
    } else if (component.types.includes('sublocality_level_4')) {
      addressFormat.住所 += component.long_name;
    } else if (component.types.includes('premise')) {
      if (component.long_name.length > 3) {
        addressFormat.建物名 = component.long_name;
      } else {
        addressFormat.住所 += '-' + component.long_name;
      }
    } else if (component.types.includes('room') || component.types.includes('subpremise')) {
      addressFormat.部屋名 = component.long_name;
    }
  });
  return addressFormat;
};

export const geocodingAPI = async (address: string): Promise<GeocodingResponse> => {
  const apiKey = process.env.GoogleMapsAPIKey!;
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}&language=ja`
  );
  if (response.data.status !== 'OK') {
    throw new Error('API Request Error!');
  }
  const data = response.data as GeocodingResponse;
  return data;
};
