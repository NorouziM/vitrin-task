import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '@utils/interfaces';
import { AppThunk, RootState } from './store';
const axios = require('axios');

export interface IState {
  data: Array<IPost>;
  isLoading: boolean;
  error: any;
}

export const initialState: IState = {
  data: [],
  isLoading: false,
  error: null,
};

export const postSlide = createSlice({
  name: 'post',
  initialState,
  reducers: {
    startGettingPosts: (state) => {
      state.isLoading = true;
    },
    setPosts: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    errorGettingPosts: (state, action) => {
      state.error = [action.payload];
      state.isLoading = false;
    },
  },
});

export const getPostsAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startGettingPosts());
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
    return dispatch(setPosts(response.data));
  } catch (err) {
    return dispatch(errorGettingPosts(err));
  }
};

export const { setPosts, startGettingPosts, errorGettingPosts } =
  postSlide.actions;
export const postsData = (state: RootState) => state.post.data;
export default postSlide.reducer;
