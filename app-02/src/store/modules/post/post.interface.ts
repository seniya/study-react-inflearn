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
  posts: IPost[];
}

export interface IPostError {
  message: string;
}
