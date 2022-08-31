import { Post } from 'custom-types';
import PostCard from '../components/Post';
import useControllers from '../utils/api';

export default function Home() {
  const { allPosts } = useControllers();
  const { status, data, error } = allPosts.init();

  if (status === 'loading') {
    return <div className="loader" />;
  }
  if (status === 'error') {
    return <span>Error: {`${error}`}</span>;
  }
  // console.log(data);

  // TODO: create loading spinner modal for refetching
  return (
    <div className="mb-6 px-5 box-content text-center min-h-full flex flex-col">
      {data.data.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
