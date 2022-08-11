import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
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
} from 'custom-types'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { apiComments, apiPosts, apiUsers } from './api'
import { LOGIN, LOGOUT } from '../utils/context/actions'

export default function useControllers() {
  const queryClient = new QueryClient()

  function usePosts(auth: string | null) {
    return useQuery(
      ['userPosts'],
      () => apiUsers('get', undefined, undefined, auth),
      {
        retry: false,
        onError: () => window.location.assign('/login'),
      },
    )
  }
  
  function useAllPosts() {
    return useQuery(['allPosts'], () => apiPosts('get'))
  }
  
  function usePost(id: number) {
    return useQuery(['post'], () => apiPosts('get', id))
  }

  function useSignup(dispatch: React.Dispatch<AuthAction>) {
    return useMutation((data: Signup) => apiUsers('post', 'signup', data), {
      onSuccess: ({ data }) => {
        dispatch({
          type: LOGIN,
          payload: { auth: data.access_token },
        })
        window.location.assign('/dashboard')
      },
    })
  }
  function useLogin(dispatch: React.Dispatch<AuthAction>) {
    return useMutation((data: Login) => apiUsers('post', 'login', data), {
      onSuccess: ({ data }) => {
        dispatch({
          type: LOGIN,
          payload: { auth: data.access_token },
        })
        window.location.assign('/dashboard')
      },
    })
  }
  function useLogout(dispatch: React.Dispatch<AuthAction>) {
    return useMutation(() => apiUsers('post', 'logout'), {
      onSuccess: () => {
        dispatch({ type: LOGOUT })
        window.location.assign('/')
      },
    })
  }
  function useCreatePost(auth: string | null) {
    return useMutation(
      (data: PostInput) => apiPosts('post', undefined, data, auth),
      {
        onSuccess: () => window.location.reload(),
      },
    )
  }
  function useUpdatePost(auth: string | null, id: number) {
    return useMutation((data: PostInput) => apiPosts('put', id, data, auth), {
      onSuccess: () => window.location.reload(),
    })
  }
  function useDeletePost(auth: string | null, id: number) {
    return useMutation(() => apiPosts('delete', id, undefined, auth), {
      onSuccess: () => window.location.reload(),
    })
  }
  
  function useUpVote(auth: string | null) {
    return useMutation((data: Vote) => apiPosts('put', 'upvote', data, auth))
  }
  function useDeleteVote() {
    return {}
  }
  
  function useCreateComment(auth: string | null) {
    const queryClient = new QueryClient();
    return useMutation(
      (data: CommentInput) => apiComments('post', undefined, data, auth),
      {
        onSuccess: () => window.location.reload(),
        // onSuccess: async () => await queryClient.setQueriesData(['userPosts', 'allPosts', 'post'])
        onError: () => window.location.assign('/login'),
      },
    )
  }
  function useUpdateComment(auth: string | null, id: number) {
    return useMutation(
      (data: CommentInput) => apiComments('put', id, data, auth),
      {
        onSuccess: () => window.location.reload(),
        onError: () => window.location.assign('/login'),
      },
    )
  }
  function useDeleteComment(auth: string | null, id: number) {
    return useMutation(() => apiComments('delete', id, undefined, auth), {
      onSuccess: () => window.location.reload(),
      onError: () => window.location.assign('/login'),
    })
  }  
  return {
    usePosts, useAllPosts, usePost, useSignup, useLogin, useLogout, useCreatePost, useUpdatePost, useDeletePost, useUpVote, useDeleteVote, useCreateComment, useUpdateComment, useDeleteComment
  }
}