import { AxiosResponse } from 'axios';
import { axiosInstance } from '../../../utils/axiosInstance';

export async function apiGetPosts() {
  const response: AxiosResponse = await axiosInstance({
    method: 'GET',
    url: '/posts',
  });
  if (response.data?.result?.code === 'RS0000') {
    return response.data;
  } else {
    throw new Error(response.data?.result?.message);
  }
}
