import { IUser } from '../user/user.interface';

export interface IPost {
  id?: number;
  title: string;
  desc: string;
  subject: string;
  subjectTitle?: string;
  subjectOrder?: number;
  content: string;
  contentHtml: string;
  createdAt?: Date;
  updatedAt?: Date;
  author?: IUser;
  categories?: [];
}

export interface IPostRequest {
  title: string;
  desc: string;
  subject: string;
  subjectTitle?: string;
  subjectOrder?: number;
  content: string;
  contentHtml: string;
  createdAt?: Date;
  updatedAt?: Date;
  author?: IUser;
  categories?: [];
}

export interface IPostsResponse {
  data: IPost[];
  result: {
    code: string | null;
    message: string | null;
  };
}

export interface IPostResponse {
  data: IPost;
  result: {
    code: string | null;
    message: string | null;
  };
}

export interface IPostState {
  isLoading: boolean;
  isDone: boolean;
  error: string | null;
  posts: IPost[];
  post?: IPost;
}
