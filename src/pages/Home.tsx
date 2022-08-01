import { useQueryClient } from "@tanstack/react-query";
import { Post } from "custom-types";
import { useAllPosts } from "../api/queries";
import PostCard from "../components/Post";

export default function Home() {
  // state: {allPosts:Post[]}
  // const queryClient = useQueryClient();
  // const { status, data, error, isFetching } = useAllPosts();
  // if (status === 'loading') {
  //   return <div className="loader"/>
  // };
  // if (status === 'error') {
  //   return <span>Error: {`${error}`}</span>
  // };
  // console.log(data);

  const data = {
    data: [
      {
        "id": 1,
        "title": "Donec posuere metus vitae ipsum",
        "text": "https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png",
        "user": {
          "user_id": 1,
          "name": "seed1"
        },
        "comments": [
          {
            "id": 3,
            "text": "Aliquam erat volutpat. In congue.",
            "user": {
              "name": "seed2"
            },
            "created_at": "07/26/22"
          }
        ],
        "created_at": "07/26/22",
        "updated_at": "07/26/22"
      },
      {
        "id": 2,
        "title": "Morbi non quam nec dui luctus rutrum",
        "text": "https://nasa.gov/donec.json",
        "user": {
          "user_id": 1,
          "name": "seed1"
        },
        "comments": [
          {
            "id": 1,
            "text": "Nunc rhoncus dui vel sem.",
            "user": {
              "name": "seed1"
            },
            "created_at": "07/26/22"
          }
        ],
        "created_at": "07/26/22",
        "updated_at": "07/26/22"
      },
      {
        "id": 3,
        "title": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue",
        "text": "https://europa.eu/parturient/montes/nascetur/ridiculus/mus/etiam/vel.aspx",
        "user": {
          "user_id": 2,
          "name": "seed2"
        },
        "comments": [
          {
            "id": 2,
            "text": "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
            "user": {
              "name": "seed1"
            },
            "created_at": "07/26/22"
          },
          {
            "id": 4,
            "text": "Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
            "user": {
              "name": "seed2"
            },
            "created_at": "07/26/22"
          },
          {
            "id": 5,
            "text": "In hac habitasse platea dictumst.",
            "user": {
              "name": "seed3"
            },
            "created_at": "07/26/22"
          }
        ],
        "created_at": "07/26/22",
        "updated_at": "07/26/22"
      },
      {
        "id": 4,
        "title": "Nunc purus",
        "text": "http://desdev.cn/enim/blandit/mi.jpg",
        "user": {
          "user_id": 3,
          "name": "seed3"
        },
        "comments": [],
        "created_at": "07/26/22",
        "updated_at": "07/26/22"
      }
    ]
  }
  return (
    <div className="mb-6 box-content text-center">
      {data.data.map((post:Post) => <PostCard post={post}/>)}
    </div>
  )
}