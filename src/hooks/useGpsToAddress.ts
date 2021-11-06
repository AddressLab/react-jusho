import { useGeolocation } from '@/hooks/useGeolocation';
import { reverseGeocodingAPI } from '@/api/geocoding';
import { Address } from '@/types';

const useGpsToAddress = () => {
  const { latitude, longitude } = useGeolocation();

  const getAddress = async (): Promise<Partial<Address>> => {
    const formattedAddress: Partial<Address> = {
      postcode: '',
      pref: '',
      city: '',
      town: '',
      allAddress: '',
    };
    if (latitude !== null && longitude !== null) {
      try {
        const res = await reverseGeocodingAPI(latitude, longitude);
        const componentsCounts: number[] = res.results.map((r) => {
          return r.address_components.filter((c) => !c.types.includes('route')).length;
        });
        const resultIndex = componentsCounts.indexOf(Math.max(...componentsCounts));
        const result = res.results[resultIndex];
        const address = result.address_components.reverse();

        let municipalitiesText = '';
        let banchiText = '';
        address.forEach(({ long_name, types }) => {
          if (types.includes('postal_code')) {
            formattedAddress.postcode = long_name;
          } else if (types.includes('administrative_area_level_1')) {
            formattedAddress.pref = long_name;
          } else if (types.includes('locality')) {
            municipalitiesText += long_name;
          } else if (types.includes('sublocality_level_2')) {
            municipalitiesText += long_name;
          } else if (types.includes('sublocality_level_3')) {
            banchiText += long_name;
          } else if (types.includes('sublocality_level_4')) {
            banchiText += long_name;
          }
        });

        if (municipalitiesText !== '') {
          formattedAddress.city = municipalitiesText;
        }
        if (banchiText !== '') {
          formattedAddress.allAddress = `${formattedAddress.pref}${formattedAddress.city}${formattedAddress.town}${banchiText}`;
        }
      } catch (err) {
        console.log({ err });
      }
    }

    return formattedAddress;
  };

  return {
    getAddress,
  };
};

export { useGpsToAddress };
