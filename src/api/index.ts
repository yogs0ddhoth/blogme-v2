import axios from "axios";
import { Comment, Post, User, Vote } from "custom-types";

export const apiUsers = async (method:string, path?:string, data?:User) => {
  try {
    return await axios({
      method: method,
      url: '/users/' + `${(path !== undefined) ? path : ''}`,
      data: data
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const apiPosts = async (method:string, path?:string|number, data?:Post|Comment|Vote) => {
  try {
    return await axios({
      method: method,
      url: '/posts/' + `${(path !== undefined) ? path : ''}`,
      data: data
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

// export const apiComments = async (method:string, path?:string|number, data?:Comment) => {
//   try {
//     return await axios({
//       method: method,
//       url: '/comment/' + `${(path !== undefined) ? path : ''}`,
//       data: data
//     });
//   } catch (error) {
//     throw new Error(`${error}`);
//   }
// };
export const getHello = async () => { // get('/api/hello')
  try {
    return await axios.get('/api/hello');
  } catch (error) {
    throw new Error(`${error}`);
  }
};