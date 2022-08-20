import { useParams } from 'react-router-dom';
import PostCard from '../components/Post';
import useControllers from '../controllers';

export default function PostPage() {
  const id = useParams().postId as string;
  const { usePost } = useControllers();
  const { status, data, error, isFetching } = usePost({id: parseInt(id)});
  if (status === 'loading') {
    return <div className="loader" />;
  }
  if (status === 'error') {
    return <span>Error: {`${error}`}</span>;
  }
  console.log(data);

  // TODO: create loading spinner modal for refetching
  return <PostCard post={data.data} />;
}
