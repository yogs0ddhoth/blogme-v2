import { useMutation } from "@tanstack/react-query";
import { Comment, Post, User } from "custom-types";
import { apiPosts, apiUsers } from ".";

export function useSignup() {
  return useMutation( (data:User) => apiUsers('post', 'signup', data), {
    onSuccess: () => window.location.assign('/dashboard')
  });
};
export function useLogin() {
  return useMutation( (data:User) => apiUsers('post', 'login', data), {
    onSuccess: () => window.location.assign('/dashboard')
  });
};
export function useLogout() {
  return useMutation( () => apiUsers('post', 'logout'), {
    onSuccess: () => window.location.assign('/')
  })
};

export function useCreatePost() {
  return useMutation( (data:Post) => apiPosts('post', '', data), {
    onSuccess: () => window.location.reload()
  });
};
export function useUpdatePost() {
  return useMutation( (data:{id:number, data:Post}) => apiPosts('put', data.id, data.data), {
    onSuccess: () => window.location.reload()
  });
};
export function useDeletePost() {
  return useMutation( (id:number) => apiPosts('delete', id), {
    onSuccess: () => window.location.reload()
  });
};

export function useComment() {
  return useMutation( (data:Comment) => apiPosts('post', 'comment', data), {
    onSuccess: () => window.location.reload()
  });
};

export function useVote() {
  return useMutation( (post_id:number) => apiPosts('put', 'upvote', {post_id}) )
}