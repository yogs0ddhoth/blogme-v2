import { Post } from "custom-types";
import { usePosts } from "../api/queries";
import { useCreatePost } from "../api/mutations";
import PostForm from "../components/PostForm";
import PostCard from "../components/Post";

export default function Dashboard() {
  const { status, error, data, isFetching } = usePosts();
  if (status === 'loading') {
    return <div className="loader"/>
  };
  if (status === 'error') {
    return <span>{`${error}`}</span>
  };
  console.log(data);
  
  // const data =  {
  //   data: {
  //     "id": 1,
  //     "name": "seed1",
  //     "posts": [
  //       {
  //         "comments": [
  //           {
  //             "created_at": "07/26/22",
  //             "id": 3,
  //             "text": "Aliquam erat volutpat. In congue.",
  //             "user": {
  //               "name": "seed2"
  //             }
  //           }
  //         ],
  //         "created_at": "07/26/22",
  //         "id": 1,
  //         "text": "https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png",
  //         "title": "Donec posuere metus vitae ipsum",
  //         "updated_at": "07/26/22"
  //       },
  //       {
  //         "comments": [
  //           {
  //             "created_at": "07/26/22",
  //             "id": 1,
  //             "text": "Nunc rhoncus dui vel sem.",
  //             "user": {
  //               "name": "seed1"
  //             }
  //           }
  //         ],
  //         "created_at": "07/26/22",
  //         "id": 2,
  //         "text": "https://nasa.gov/donec.json",
  //         "title": "Morbi non quam nec dui luctus rutrum",
  //         "updated_at": "07/26/22"
  //       },
  //       {
  //         "comments": [],
  //         "created_at": "07/31/22",
  //         "id": 24,
  //         "text": "Test Post Post",
  //         "title": "Test Post Title",
  //         "updated_at": "07/31/22"
  //       },
  //       {
  //         "comments": [],
  //         "created_at": "07/31/22",
  //         "id": 25,
  //         "text": "Text: Test Post 2",
  //         "title": "Title: Test Post 2",
  //         "updated_at": "07/31/22"
  //       }
  //     ]
  //   }
  // }

  return (
    <div className="grid grid-cols-6 text-[white]">

      <div className="col-span-6">
        <h2>Welcome, {"INSER_NAME"}!</h2>
      </div>

      <div className="col-span-6 md:col-span-3">
        <h3>Create a New Post:</h3>
        <PostForm/>
      </div> 

      <div className="col-span-6 md:col-span-3 post-list">
        <h3>Posts:</h3>
        {
          data.data.posts.map(
            (post:Post) => <PostCard post={{...post, user: {name: data.data.name}}}/>
          )
        }
      </div>

    </div>
  )
}