import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Comment, Post, User, AuthAction, Vote, Signup, Login, PostInput, CommentInput } from "custom-types";
import React from "react";
import { apiPosts, apiUsers } from ".";
import { LOGIN, LOGOUT } from '../utils/context/actions';

// data?:User => apiUsers(method:string, path:string, data)
export function useSignup(dispatch:React.Dispatch<AuthAction>) {
  return useMutation( (data:Signup) => apiUsers('post', 'signup', data), {
    onSuccess: ({data}) => {
      dispatch({
        type: LOGIN, 
        payload: { auth: data.access_token }
      });
      window.location.assign('/dashboard');
    }
  });
}
export function useLogin(dispatch:React.Dispatch<AuthAction>) {
  return useMutation( (data:Login) => apiUsers('post', 'login', data), {
    onSuccess: ({data}) => {
      dispatch({
        type: LOGIN, 
        payload: { auth: data.access_token }
      });
      window.location.assign('/dashboard');
    }
  });
}
export function useLogout(dispatch:React.Dispatch<AuthAction>) {
  return useMutation( () => apiUsers('post', 'logout'), {
    onSuccess: () => {
      dispatch({type: LOGOUT});
      window.location.assign('/');
    }
  });
}

// data: Post|Comment|Vote => usePosts(method:string, path:string|number, data, auth:string|null)
export function useCreatePost(auth:string|null) {
  return useMutation( (data:PostInput) => apiPosts('post', undefined, data, auth), {
    onSuccess: () => window.location.reload()
  });
}
export function useUpdatePost(auth:string|null, id:number) {
  return useMutation( (data:PostInput) => apiPosts('put', id, data, auth), {
    // onSuccess: () => window.location.reload()
  });
}
export function useDeletePost(auth:string|null, id:number) {
  return useMutation( () => apiPosts('delete', id, undefined, auth), {
    onSuccess: () => window.location.reload()
  });
}

export function useComment(auth:string|null) {
  return useMutation( (data:CommentInput) => apiPosts('post', 'comment', data, auth) );
}

export function useVote(auth:string|null) {
  return useMutation( (data:Vote) => apiPosts('put', 'upvote', data, auth) );
}