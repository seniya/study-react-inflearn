export interface IPost {
  id: number;
  title: string;
  subject: string;
  content: string;
  contentHtml: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostRequest {}

export interface IPostResponse {
  data: IPost[];
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
}
