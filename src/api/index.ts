import axios, { AxiosResponse } from 'axios';
import { GetAddressFromPostCodeResponse } from './interface';

const BASE_URL = '';

const getAddressFromPostCode = async (
  postCode
): Promise<AxiosResponse<GetAddressFromPostCodeResponse>> => {
  return axios.get(`${BASE_URL}?postcode=${postCode}`);
};

export { getAddressFromPostCode, BASE_URL };
