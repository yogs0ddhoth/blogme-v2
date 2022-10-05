import * as React from 'react';
import { Post } from 'custom-types';

import PostForm from '../components/Forms/PostForm';
import PostCard from '../components/Post';

import { authContext } from '../utils/context/contexts';
import useControllers from '../utils/api';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export default function Dashboard() {
  const { state } = React.useContext(authContext);
  const { auth } = state;

  const { userPosts, createPost } = useControllers();
  const useCreatePost = createPost.init(auth);
  const { status, data } = userPosts.init(auth);
  if (status === 'loading') {
    return <div className="m-auto loader" />;
  }
  if (status === 'error') {
    return (
      <div className='m-auto'>
        <div className="m-auto loader" />
        <span>Your session has timed out. Redirecting to login..</span>
      </div>
    );
  }
  return (
    <div
      className="
        p-6 
        flex flex-col text-center 
        gap-5
        lg:grid lg:grid-cols-12 
      "
    >
      <div className="lg:col-span-12">
        <Card>
          <Typography>Welcome, {data.data.name}!</Typography>
        </Card>
      </div>

      <div className="lg:col-span-6 flex flex-col gap-6">
        <Card>
          <Typography>Create a New Post:</Typography>
        </Card>
        <PostForm mutation={useCreatePost} />
      </div>

      <div className="lg:col-span-6 flex flex-col gap-3">
        <Card>
          <Typography>Posts:</Typography>
        </Card>
        {data.data.posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
