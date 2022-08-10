import { useQueryClient } from "@tanstack/react-query";
import { Post } from "custom-types";
import { useAllPosts } from "../api/queries";
import PostCard from "../components/Post";

export default function Home() {
  const queryClient = useQueryClient();
  const { status, data, error } = useAllPosts();
  if (status === 'loading') {
    return <div className="loader"/>
  };
  if (status === 'error') {
    return <span>Error: {`${error}`}</span>
  };
  console.log(data);

  return (
    <div className="mb-6 box-content text-center min-h-full bg-react-background">
      {data.data.map(
        (post:Post) => <PostCard key={post.id} post={post}/>
      )}
    </div>
  )
}