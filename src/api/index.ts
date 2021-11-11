import axios, { AxiosResponse } from 'axios';
import { GetAddressFromPostCodeResponse, GetAddressFromGeoResponse } from './interface';

const BASE_URL = 'http://api.jusho2.jp/jusho1/v1';

const getAddressFromPostCode = async (
  postCode: string
): Promise<AxiosResponse<GetAddressFromPostCodeResponse>> => {
  return axios.get(`${BASE_URL}/postcode?postcode=${postCode}`);
};

const getAddressFromGeo = async (
  latitude: number | null,
  longitude: number | null
): Promise<AxiosResponse<GetAddressFromGeoResponse>> => {
  return axios.get(`${BASE_URL}/geocode?lat=${latitude}&lng=${longitude}`);
};

export { getAddressFromPostCode, getAddressFromGeo, BASE_URL };
