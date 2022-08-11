import { useMutation } from '@tanstack/react-query'
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
import { apiComments, apiPosts, apiUsers } from '.'
import { LOGIN, LOGOUT } from '../utils/context/actions'

// data?:User => apiUsers(method:string, path:string, data)
export function useSignup(dispatch: React.Dispatch<AuthAction>) {
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
export function useLogin(dispatch: React.Dispatch<AuthAction>) {
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
export function useLogout(dispatch: React.Dispatch<AuthAction>) {
  return useMutation(() => apiUsers('post', 'logout'), {
    onSuccess: () => {
      dispatch({ type: LOGOUT })
      window.location.assign('/')
    },
  })
}

export function useCreatePost(auth: string | null) {
  return useMutation(
    (data: PostInput) => apiPosts('post', undefined, data, auth),
    {
      onSuccess: () => window.location.reload(),
    },
  )
}
export function useUpdatePost(auth: string | null, id: number) {
  return useMutation((data: PostInput) => apiPosts('put', id, data, auth), {
    onSuccess: () => window.location.reload(),
  })
}
export function useDeletePost(auth: string | null, id: number) {
  return useMutation(() => apiPosts('delete', id, undefined, auth), {
    onSuccess: () => window.location.reload(),
  })
}

export function useVote(auth: string | null) {
  return useMutation((data: Vote) => apiPosts('put', 'upvote', data, auth))
}

export function useCreateComment(auth: string | null) {
  return useMutation(
    (data: CommentInput) => apiComments('post', undefined, data, auth),
    {
      onSuccess: () => window.location.reload(),
      onError: () => window.location.assign('/login'),
    },
  )
}
export function useUpdateComment(auth: string | null, id: number) {
  return useMutation(
    (data: CommentInput) => apiComments('put', id, data, auth),
    {
      onSuccess: () => window.location.reload(),
      onError: () => window.location.assign('/login'),
    },
  )
}
export function useDeleteComment(auth: string | null, id: number) {
  return useMutation(() => apiComments('delete', id, undefined, auth), {
    onSuccess: () => window.location.reload(),
    onError: () => window.location.assign('/login'),
  })
}
