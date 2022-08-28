import * as React from 'react';
import { Post } from 'custom-types';

import PostForm from '../components/Forms/PostForm';
import PostCard from '../components/Post';

import { authContext } from '../utils/context/contexts';
import useControllers from '../controllers';

export default function Dashboard() {
  const { state } = React.useContext(authContext);

  const { usePosts, useCreatePost } = useControllers();
  const createPost = useCreatePost({ auth: state.auth });

  const { status, data } = usePosts({ auth: state.auth });
  if (status === 'loading') {
    return <div className="loader" />;
  }
  if (status === 'error') {
    return <span>Your session has timed out. Redirecting to login..</span>;
  }
  // console.log(data);

  // TODO: create loading spinner modal for refetching
  return (
    <div 
      className="
        mb-6 min-h-full box-content text-center 
        flex flex-col lg:grid lg:grid-cols-12
      "
    >
      <div 
        className="lg:col-span-12"
      >
        <h2>Welcome, {data.data.name}!</h2>
      </div>

      <div 
        className="lg:col-span-6 lg:px-2 flex flex-col"
      >
        <h3>Create a New Post:</h3>
        <PostForm mutation={createPost} className="mt-5" />
      </div>

      <div 
        className="lg:col-span-6 lg:px-2 flex flex-col"
      >
        <h3>Posts:</h3>
        {data.data.posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
