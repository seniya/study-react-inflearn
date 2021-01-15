import fetch from 'node-fetch';
import { IPost } from './post.interface';

const url = 'http://localhost:3000/posts';
export const apiEmployees = async (): Promise<IPost> => {
  return await fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<IPost>;
  });
};
