import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { useAllPosts } from "../api/queries";

export default function Home() {
  // state: {allPosts:Post[]}
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useAllPosts();
  if (status === 'loading') {
    return <div className="loader"/>
  };
  if (status === 'error') {
    return <span>Error: {`${error}`}</span>
  };
  console.log(data);
  return (
  <div className="mb-6 box-content text-center">
    <div className="bg-react-blue text-react-background">
      <h2>
        <a href="/post/{{post.id}}">
          {/* {{post.name}} */}
          post name
        </a>
      </h2>
      <p className="author">
        {/* Created by {{post.user.name}} on {{format_date post.date_created}} */}
        created by
      </p>
    </div>
    <div className="card-body">
      <p className="whitespace-pre-line">
        {/* {{post.description}} */}
        description
      </p>
    </div>
  </div>
  )
}