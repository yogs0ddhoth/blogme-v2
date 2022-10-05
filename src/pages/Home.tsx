import { Post } from 'custom-types';
import PostCard from '../components/Post';
import useControllers from '../utils/api';

export default function Home() {
  const { allPosts } = useControllers();
  const { status, data, error } = allPosts.init();

  if (status === 'loading') {
    return <div className="m-auto loader" />;
  }
  if (status === 'error') {
    return <span>Error: {`${error}`}</span>;
  }
  // console.log(data);

  // TODO: create loading spinner modal for refetching
  return (
    <div
      className="
        p-6 
        flex flex-col text-center 
        gap-5
      "
    >
      {data.data.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
