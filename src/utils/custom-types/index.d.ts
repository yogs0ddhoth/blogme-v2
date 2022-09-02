declare module 'custom-types' {
  import { UseMutationResult } from '@tanstack/react-query';
  import { AxiosResponse } from 'axios';

  interface Login {
    email: string;
    password: string;
  }
  interface Signup extends Login {
    name: string;
  }

  interface UserAccess {
    access_token: string;
  }

  interface User {
    id: number;
    name: string;
    posts?: Post[];
  }

  interface UserPosts {
    id: number;
    name: string;
    posts: Post[];
  }

  interface PostInput {
    title: string;
    text: string;
  }
  interface Post extends PostInput {
    id: number;
    user: User;
    created_at: string;
    updated_at: string;
    comments: Comment[];
    vote_count: number;
    votes: Vote[];
  }

  interface CommentInput {
    post_id: number;
    text: string;
  }
  interface Comment extends CommentInput {
    id: number;
    user: User;
    created_at: string;
    updated_at: string;
  }
  interface Vote {
    id?: number;
    post_id: number;
    user: User;
  }

  interface AuthAction {
    type: string;
    payload?: {
      auth: string;
    };
  }
  interface UserAuth {
    user: string;
    id: number;
    auth: string;
  }
  type MutationInstance<InputType> = UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    InputType,
    void
  >;
}
