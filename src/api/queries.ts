import { useQuery } from "@tanstack/react-query";
import { apiPosts, apiUsers } from ".";

export function usePosts(auth:string|null) { 
  return useQuery(['userPosts'], () => apiUsers('get', undefined, auth), {retry:false})
}

export function useAllPosts() {
  return useQuery(['allPosts'], () => apiPosts('get'))
};

export function usePost(id:number) {
  return useQuery(['post'], () => apiPosts('get', id))
};