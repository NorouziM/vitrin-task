import { GetServerSideProps, NextPage } from 'next';
// npm
import axios from 'axios';
// components
import PostDetail from '@components/PostDetail';
import Wrapper from '@components/Wrapper';
// utils
import { IPost } from '@utils/interfaces';

const SinglePost: NextPage<{ data: IPost }> = ({ data }) => {
  return (
    <Wrapper metaTitle={data.title} metaDescription={data.body}>
      <PostDetail body={data.body} title={data.title} userId={data.userId} />
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  let hasAxiosError = false;
  const res = await axios
    .get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    .catch(() => {
      hasAxiosError = true;
    });

  if (!res?.data || hasAxiosError) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return { props: { data: res.data } };
};

export default SinglePost;
