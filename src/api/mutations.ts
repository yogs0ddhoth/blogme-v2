import { useMutation } from "@tanstack/react-query";
import { Comment, Post, User } from "custom-types";
import { apiPosts, apiUsers } from ".";

export function useSignup() {
  return useMutation( (data:User) => apiUsers('post', 'signup', undefined, data), {
    // onSuccess: () => window.location.assign('/dashboard')
  });
};
export function useLogin() {
  return useMutation( (data:User) => apiUsers('post', 'login', undefined, data), {
    // onSuccess: () => window.location.assign('/dashboard')
  });
};
export function useLogout() {
  return useMutation( () => apiUsers('post', 'logout'), {
    // onSuccess: () => window.location.assign('/')
  })
};

export function useCreatePost(auth:string) {
  return useMutation( (data:Post) => apiPosts('post', undefined, auth, data), {
    // onSuccess: () => window.location.reload()
  });
};
export function useUpdatePost(auth:string) {
  return useMutation( (data:{id:number, data:Post}) => apiPosts('put', data.id, auth, data.data), {
    // onSuccess: () => window.location.reload()
  });
};
export function useDeletePost(auth:string) {
  return useMutation( (id:number) => apiPosts('delete', id, auth), {
    // onSuccess: () => window.location.reload()
  });
};

export function useComment(auth:string) {
  return useMutation( (data:Comment) => apiPosts('post', 'comment', auth, data) );
};

export function useVote(auth:string) {
  return useMutation( (post_id:number) => apiPosts('put', 'upvote', auth, {post_id}) )
}