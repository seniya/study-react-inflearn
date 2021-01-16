import { AxiosResponse } from 'axios';
import { axiosInstance } from '../../../utils/axiosInstance';
import { IGetUserRequest, ISigninRequest } from './user.interface';

export async function apiSignin(payload: ISigninRequest) {
  try {
    const response: AxiosResponse = await axiosInstance({
      method: 'POST',
      url: '/authentication/sign-in',
      data: payload,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function apiGetUser(payload: IGetUserRequest) {
  try {
    const response: AxiosResponse = await axiosInstance({
      method: 'POST',
      url: '/authentication/getMe',
      data: payload,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
