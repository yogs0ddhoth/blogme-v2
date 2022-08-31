import { useParams } from 'react-router-dom';
import PostCard from '../components/Post';
import useControllers from '../utils/api';

export default function PostPage() {
  const id = useParams().postId as string;
  const { post } = useControllers();
  const { status, data, error } = post.init(undefined, id);
  if (status === 'loading') {
    return <div className="loader" />;
  }
  if (status === 'error') {
    return <span>Error: {`${error}`}</span>;
  }

  // TODO: create loading spinner modal for refetching
  return <PostCard post={data.data} />;
}
