import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  Comment,
  Post,
  User,
  AuthAction,
  Vote,
  Signup,
  Login,
  PostInput,
  CommentInput,
} from 'custom-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import { LOGIN, LOGOUT } from '../utils/context/actions';

interface UserPosts {
  id: number;
  name: string;
  posts: Post[];
}
const apiUsers = api<string, Signup | Login>('/users/');
const apiPosts = api<string | number, PostInput | Vote>('/posts/');
const apiComments = api<string | number, CommentInput>('/comments/');

export default function useControllers() {
  const queryClient = useQueryClient();

  function getLastQuery() {
    // get the last updated query data - corresponds to current page
    const keys = ['userPosts', 'allPosts', 'post'];
    const queries = keys.map((query) => ({
      key: query,
      state: queryClient.getQueryState([query]),
    }));

    let lastUpdated = -Infinity;
    let index = null;
    for (let i = 0; i < queries.length; i++) {
      const state = queries[i].state;
      if (state === undefined) {
        continue;
      }
      if (state.dataUpdatedAt > lastUpdated) {
        lastUpdated = state.dataUpdatedAt;
        index = i;
      }
    }
    if (index === null) {
      return null;
    }
    return [queries[index].key];
  }
  async function refreshCache() {
    const lastQuery = getLastQuery();
    lastQuery !== null
      ? await queryClient.refetchQueries(lastQuery)
      : window.location.reload();
  }

  return {
    usePosts: function (auth: string | null) {
      return useQuery(
        ['userPosts'],
        () => apiUsers<UserPosts>('get', undefined, undefined, auth),
        {
          retry: false,
          onError: () => window.location.assign('/login'),
        }
      );
    },

    useAllPosts: function () {
      return useQuery(['allPosts'], () => apiPosts<Post[]>('get'), {
        retry: false,
      });
    },

    usePost(id: number) {
      return useQuery(['post'], () => apiPosts<Post>('get', id), {
        retry: false,
        onError: () => window.location.assign('/login'),
      });
    },

    useSignup: function (dispatch: React.Dispatch<AuthAction>) {
      return useMutation(
        (data: Signup) => apiUsers<any>('post', 'signup', data),
        {
          onSuccess: ({ data }) => {
            dispatch({
              type: LOGIN,
              payload: { auth: data.access_token },
            });
            window.location.assign('/dashboard');
          },
        }
      );
    },
    useLogin: function (dispatch: React.Dispatch<AuthAction>) {
      return useMutation(
        (data: Login) => apiUsers<any>('post', 'login', data),
        {
          onSuccess: ({ data }) => {
            dispatch({
              type: LOGIN,
              payload: { auth: data.access_token },
            });
            window.location.assign('/dashboard');
          },
        }
      );
    },
    useLogout: function (dispatch: React.Dispatch<AuthAction>) {
      return useMutation(() => apiUsers<any>('post', 'logout'), {
        onSuccess: () => {
          dispatch({ type: LOGOUT });
          window.location.assign('/');
        },
      });
    },

    // useCreatePost: useMutationApi<PostInput>(apiPosts<any>, )

    useCreatePost: (auth: string | null) => {
      return useMutation(
        (data: PostInput) => apiPosts<any>('post', undefined, data, auth),
        {
          // onSuccess method declared in component call
        }
      );
    },

    useUpdatePost: (auth: string | null, id: number) => {
      return useMutation(
        (data: PostInput) => apiPosts<any>('put', id, data, auth),
        {
          // onSuccess method declared in component call
        }
      );
    },
    useDeletePost: (auth: string | null, id: number) => {
      return useMutation(() => apiPosts<any>('delete', id, undefined, auth), {
        onSuccess: () => refreshCache(),
      });
    },

    useUpVote: function (auth: string | null, onMutate?: () => void) {
      return useMutation(
        (data: Vote) => apiPosts<any>('put', 'upvote', data, auth),
        {
          onMutate: onMutate ? () => onMutate() : undefined,
          onSuccess: () => refreshCache(),
        }
      );
    },
    useDeleteVote: function (auth: string | null, onMutate?: () => void) {
      return useMutation(
        (data: Vote) => apiPosts<any>('delete', 'upvote', data, auth),
        {
          onMutate: onMutate ? () => onMutate() : undefined,
          onSuccess: () => refreshCache(),
        }
      );
    },

    useCreateComment: function (auth: string | null) {
      return useMutation(
        (data: CommentInput) => apiComments<any>('post', undefined, data, auth),
        {
          // onSuccess method declared in component call
          onError: () => window.location.assign('/login'),
        }
      );
    },
    useUpdateComment: function (auth: string | null, id: number) {
      return useMutation(
        (data: CommentInput) => apiComments<any>('put', id, data, auth),
        {
          // onSuccess method declared in component call
          onError: () => window.location.assign('/login'),
        }
      );
    },
    useDeleteComment: function (auth: string | null, id: number) {
      return useMutation(
        () => apiComments<any>('delete', id, undefined, auth),
        {
          onSuccess: () => refreshCache(),
          onError: () => window.location.assign('/login'),
        }
      );
    },

    refreshCache,
  };
}
