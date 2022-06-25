import type { GetServerSideProps, NextPage } from 'next';
// npm
import axios from 'axios';
// MUI
import { Container, Stack, Typography, Divider } from '@mui/material';
// components
import Post from '@components/Post';
import Wrapper from '@components/Wrapper';
// utils
import { IPost } from '@utils/interfaces';
import {
  errorGettingPosts,
  getPostsAsync,
  postsData,
  setPosts,
  startGettingPosts,
} from 'state/postSlice';
import { useSelector } from 'react-redux';
import { useAppSelector, wrapper, RootState } from 'state/store';

interface IProps {
  posts: Array<IPost>;
}

const Home: NextPage<IProps> = ({}) => {
  const {
    data: posts,
    isLoading,
    error,
  } = useAppSelector((state) => state.post);

  return (
    <Wrapper>
      <Stack>
        <Typography variant="h2" component="h1" mb={5}>
          Posts
        </Typography>
        <Stack spacing={3}>
          {posts.map((post: IPost, indx) => (
            <>
              <Post
                key={post.id}
                body={post.body}
                title={post.title}
                userId={post.userId}
                id={post.id}
              />
              {indx !== posts.length - 1 && <Divider />}
            </>
          ))}
        </Stack>
      </Stack>
    </Wrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      store.dispatch(startGettingPosts());
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );
      store.dispatch(setPosts(response.data));
    } catch (err) {
      store.dispatch(errorGettingPosts(err));
    }
    return { props: {} };
  }
);

export default Home;
