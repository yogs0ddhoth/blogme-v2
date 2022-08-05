import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Comment, Post, User, AuthAction, Vote } from "custom-types";
import React from "react";
import { apiPosts, apiUsers } from ".";
import { LOGIN, LOGOUT } from '../utils/context/actions';

export function useSignup(dispatch:React.Dispatch<AuthAction>) {
  return useMutation( (data:User) => apiUsers('post', 'signup', undefined, data), {
    onSuccess: ({data}) => {
      dispatch({
        type:LOGIN, 
        payload:{user: data.user, id: data.id, auth: data.access_token}
      });
      // window.location.assign('/dashboard');
    }
  });
}
export function useLogin(dispatch:React.Dispatch<AuthAction>) {
  return useMutation( (data:User) => apiUsers('post', 'login', undefined, data), {
    onSuccess: ({data}) => {
      dispatch({
        type:LOGIN, 
        payload:{user: data.user, id: data.id, auth: data.access_token}
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

export function useCreatePost(auth:string|null) {
  return useMutation( (data:Post) => apiPosts('post', undefined, auth, data), {
    onSuccess: () => window.location.reload()
  });
}
export function useUpdatePost(auth:string|null, id:number) {
  return useMutation( (data:Post) => apiPosts('put', id, auth, data), {
    // onSuccess: () => window.location.reload()
  });
}
export function useDeletePost(auth:string|null, id:number) {
  return useMutation( () => apiPosts('delete', id, auth), {
    onSuccess: () => window.location.reload()
  });
}

export function useComment(auth:string|null) {
  return useMutation( (data:Comment) => apiPosts('post', 'comment', auth, data) );
}

export function useVote(auth:string|null) {
  return useMutation( (data:Vote) => apiPosts('put', 'upvote', auth, data) );
}