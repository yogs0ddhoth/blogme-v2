import axios from 'axios'
import { Signup, Login, CommentInput, PostInput, Vote } from 'custom-types'

function api<PathType, DataType>(input: string) {
  return async (
    method: string,
    path?: PathType,
    data?: DataType,
    auth?: string | null,
  ) => {
    try {
      const url = input
      return await axios({
        method: method,
        url: url + `${path !== undefined ? path : ''}`,
        headers:
          typeof auth === 'string'
            ? {
                Authorization: 'Bearer ' + auth,
              }
            : {},
        data: data !== undefined ? data : {},
      })
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
}

export const apiUsers = api<string, Signup | Login>('/users/')
export const apiPosts = api<string | number, PostInput | Vote>('/posts/')
export const apiComments = api<string | number, CommentInput>('/comments/')
