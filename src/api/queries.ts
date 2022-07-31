import { useQuery } from "@tanstack/react-query";
import { apiPosts, apiUsers } from ".";

export function usePosts() {
  return useQuery(['userPosts'], () => apiUsers('get'))
}

export function useAllPosts() {
  return useQuery(['allPosts'], () => apiPosts('get'))
};

export function usePost(id:number) {
  return useQuery(['post'], () => apiPosts('get', id))
};