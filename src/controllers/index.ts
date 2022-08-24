import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import {
  Post,
  AuthAction,
  Vote,
  Signup,
  Login,
  PostInput,
  CommentInput,
  UserPosts,
} from 'custom-types';
import React from 'react';
import api from './api';
import { LOGIN, LOGOUT } from '../utils/context/actions';
import { useNavigate } from 'react-router-dom';

export default function useControllers() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getLastQuery = () => {
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
  };
  const refreshCache = async () => {
    try {
      const lastQuery = getLastQuery();
      if (lastQuery !== null) {
        await queryClient.refetchQueries(lastQuery);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Query Factory
   * @param url root api path
   * @returns further config
   */
  const apiQuery = (url: string) => {
    /**
     * Query Factory
     * @param key queryKey - see react-query docs
     * @returns Query Hook
     */
    return <ResponseData>(key: string) => {
      interface QueryArgs {
        auth?: string;
        id?: number;
      }
      return ({ auth, id }: QueryArgs) => useQuery(
        [key],
        () =>
          api<number, void, ResponseData>(
            'get',
            url,
            id ? id : undefined,
            undefined,
            auth ? auth : undefined
          ),
        {
          retry: false,
          onError: () => navigate('/login')
        }
      );
    }
  };
  const userQuery = apiQuery('/users/');
  const postQuery = apiQuery('/posts/');

  /**
   * Mutation Factory
   * @param url root api path
   * @returns further config
   */
  const apiMutation = (url: string) => {
    /**
     * Mutation Factory
     * @param method request method
     * @param path optional additional path
     * @returns Mutation Hook
     */
    return <DataType>(method: string, path?: string) => {
      interface MutationArgs {
        id?: number;
        auth?: string;
        dispatch?: React.Dispatch<AuthAction>;
        onMutate?: () => void;
      }
      return ({ id, auth, dispatch, onMutate }: MutationArgs) => useMutation(
        (data: DataType) =>
          api<string | number, DataType, any>(
            method,
            url,
            path ? path : id ? id : undefined,
            data,
            auth ? auth : undefined
          ),
        {
          onMutate: onMutate ? () => onMutate() : undefined,
          onSuccess: dispatch ? ({ data }) => {
            dispatch(
              path === 'logout'
                ? { type: LOGOUT }
                : {
                    type: LOGIN,
                    payload: { auth: data.access_token },
                  }
            );
            if (path === 'logout' && window.location.pathname === '/dashboard') {
              navigate('/');
            }
            if (path === 'login') {
              navigate('/dashboard');
            }
          } : () => refreshCache(),
          onError: () => navigate('/login'),
        }
      );
    }
  };
  const userMutation = apiMutation('/users/');
  const postMutation = apiMutation('/posts/');
  const commentMutation = apiMutation('/comments/');

  return {
    usePosts: userQuery<UserPosts>('userPosts'),

    useAllPosts: postQuery<Post[]>('allPosts'),
    usePost: postQuery<Post>('post'),

    useSignup: userMutation<Signup>('post', 'signup'),
    useLogin: userMutation<Login>('post', 'login'),
    useLogout: userMutation<void>('post', 'logout'),

    useCreatePost: postMutation<PostInput>('post'),
    useUpdatePost: postMutation<PostInput>('put'),
    useDeletePost: postMutation<void>('delete'),

    useUpVote: postMutation<Vote>('put', 'upvote'),
    useDeleteVote: postMutation<Vote>('delete', 'upvote'),

    useCreateComment: commentMutation<CommentInput>('post'),
    useUpdateComment: commentMutation<CommentInput>('put'),
    useDeleteComment: commentMutation<void>('delete'),

    refreshCache,
  };
}
