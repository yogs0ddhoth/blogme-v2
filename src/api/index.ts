import axios from "axios";
import { Comment, Post, User, Vote } from "custom-types";

function api(input:string) {
  return async function api(method:string, path?:string|number, auth?:string, data?:User|Post|Comment|Vote) {
    try {
      const url = input;
      return await axios({
        method: method,
        url: url + `${(path !== undefined) ? path : ''}`,
        headers: (auth === undefined) ? {} : {
          Authorization: 'Bearer ' + auth
        },
        data: data
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };
}

export const apiUsers = api('/users/');
export const apiPosts = api('/posts/');