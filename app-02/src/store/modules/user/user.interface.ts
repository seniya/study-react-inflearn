export interface IUser {
  id: number | null;
  email: string;
  name: string;
  lv: number | null;
  photo: string;
}

export interface ISigninRequest {
  email: string;
  password: string;
}

export interface IUserResponse {
  user: IUser;
}

export interface ISigninResponse {
  data: {
    user: IUser;
    token: string | null;
  };
  result: {
    code: string | null;
    message: string | null;
  };
}

export interface IGetUserRequest {
  token: string;
}

export interface IGetUserResponse {
  data: {
    user: IUser;
    token: string | null;
  };
  result: {
    code: string | null;
    message: string | null;
  };
}
