import axios from "axios";
import { Comment, Post, User, Vote } from "custom-types";

function api(input:string) {
  return async (
    method:string, 
    path?:string|number, 
    auth?:string|null, 
    data?:User|Post|Comment|Vote
  ) => {
    try {
      const url = input;
      return await axios({
        method: method,
        url: url + `${(path !== undefined) ? path : ''}`,
        headers: (auth === undefined || auth === null) ? {} : {
          Authorization: "Bearer " + auth
          // 'Content-type': 'application/json',
        },
        data: (data !== undefined) ? data : {}
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };
}

export const apiUsers = api('/users/');
export const apiPosts = api('/posts/');