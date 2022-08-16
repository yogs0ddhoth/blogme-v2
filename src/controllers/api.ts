import axios from 'axios';
import { Signup, Login, CommentInput, PostInput, Vote } from 'custom-types';

export default function api<PathType, DataType>(input: string) {
  return async <ResponseData>(
    method: string,
    path?: PathType,
    data?: DataType,
    auth?: string | null
  ) => {
    try {
      const url = input;
      return await axios.request<ResponseData>({
        method: method,
        url: url + `${path ? path : ''}`,
        headers:
          typeof auth === 'string'
            ? {
                Authorization: 'Bearer ' + auth,
              }
            : {},
        data: data ? data : {},
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };
}
