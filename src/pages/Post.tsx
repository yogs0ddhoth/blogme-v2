import { useParams } from "react-router-dom"
import { usePost } from "../api/queries";
import PostCard from "../components/Post";

export default function PostPage() {
  // data: {postId:string}

  const id = useParams().postId;
  const { status, data, error, isFetching } = usePost(parseInt(id as string));
  if (status === 'loading') {
    return <div className="loader"/>
  };
  if (status === 'error') {
    return <span>Error: {`${error}`}</span>
  };
  console.log(data);
  
  // const data = {
  //   data: {
  //     "comments": [
  //       {
  //         "created_at": "07/26/22",
  //         "id": 2,
  //         "text": "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
  //         "user": {
  //           "name": "seed1"
  //         }
  //       },
  //       {
  //         "created_at": "07/26/22",
  //         "id": 4,
  //         "text": "Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
  //         "user": {
  //           "name": "seed2"
  //         }
  //       },
  //       {
  //         "created_at": "07/26/22",
  //         "id": 5,
  //         "text": "In hac habitasse platea dictumst.",
  //         "user": {
  //           "name": "seed3"
  //         }
  //       }
  //     ],
  //     "created_at": "07/26/22",
  //     "id": 3,
  //     "text": "https://europa.eu/parturient/montes/nascetur/ridiculus/mus/etiam/vel.aspx",
  //     "title": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue",
  //     "updated_at": "07/26/22",
  //     "user": {
  //       "name": "seed2",
  //       "user_id": 2
  //     }
  //   }
  // }

  return (

    <PostCard post={data.data}/>
  )
}