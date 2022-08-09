import * as React from 'react';
import { Post } from "custom-types";

import PostForm from "../components/PostForm";
import PostCard from "../components/Post";

import { usePosts } from "../api/queries";
import { authContext } from '../utils/context/contexts';
import { useCreatePost } from '../api/mutations';

export default function Dashboard() {
  const {state, dispatch} = React.useContext(authContext);

  const createPost = useCreatePost(state.auth);

  const { status, error, data } = usePosts(state.auth);
  if (status === 'loading') {
    return <div className="loader"/>
  };
  if (status === 'error') {
    return <span>Your session has timed out. Redirecting to login..</span>;
  };
  console.log(data);
  
  return (
    <div className="grid grid-cols-6">

      <div className="col-span-6">
        <h2>Welcome, {"INSER_NAME"}!</h2>
      </div>

      <div className="col-span-6 md:col-span-3">
        <h3>Create a New Post:</h3>
        <PostForm mutation={createPost} />
      </div> 

      <div className="col-span-6 md:col-span-3 post-list">
        <h3>Posts:</h3>
        {
          data.data.posts.map(
            (post:Post) => <PostCard key={post.id} post={{...post}}/>
          )
        }
      </div>

    </div>
  )
}