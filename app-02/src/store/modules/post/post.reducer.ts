import { ActionType, createReducer, createAsyncAction } from 'typesafe-actions';
import { IPost, IPostRequest, IPostResponse, IPostError } from './post.interface';

export const FETCH_POSTS = {
  REQUEST: 'POSTS_FETCH_REQUEST',
  SUCCESS: 'POSTS_FETCH_SUCCESS',
  FAILURE: 'POSTS_FETCH_FAILURE',
};

export const fetchPosts = createAsyncAction(
  FETCH_POSTS.REQUEST,
  FETCH_POSTS.SUCCESS,
  FETCH_POSTS.FAILURE,
)<IPostRequest, IPostResponse, IPostError>();

const actions = {
  fetchPosts,
};

type Actions = ActionType<typeof actions>;
type State = {
  posts: IPost[];
  message: string;
};

const initialState: State = {
  posts: [],
  message: '',
};

const reducer = createReducer<State, Actions>(initialState)
  .handleAction(fetchPosts.success, (state, action) => {
    return { ...state, posts: action.payload.posts };
  })
  .handleAction(fetchPosts.failure, (state, action) => {
    return { ...state, message: action.payload.message };
  })
  .handleAction(fetchPosts.request, (state) => {
    return { ...state };
  });

export default reducer;
