import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import {
  Post,
  Vote,
  Signup,
  Login,
  PostInput,
  CommentInput,
  UserPosts,
  UserAccess,
} from 'custom-types';
import api from './api';
import { NavigateFunction, useNavigate } from 'react-router-dom';

/** Parent Class */
class Controller {
  #url;
  #navigate;
  /**
   * @param url base url
   * @param navigate instance of useNavigate()
   */
  constructor(url: string, navigate: NavigateFunction) {
    this.#url = url;
    this.#navigate = navigate;
  }
  get url() {
    return this.#url;
  }
  get navigate() {
    return this.#navigate;
  }
}

class Query<ResponseDataType> extends Controller {
  static #method = 'get';
  #key;
  /**
   * @param url base url
   * @param key query key
   * @param navigate instance of useNavigate()
   */
  constructor(url: string, key: string, navigate: NavigateFunction) {
    super(url, navigate);
    this.#key = key;
  }
  /**
   * Query Controller
   * @param auth token
   * @param id user_id
   * @returns instance of useQuery()
   */
  init(auth?: string, id?: string) {
    const { url, navigate } = this;
    return useQuery(
      [this.#key],
      () =>
        api<string, void, ResponseDataType>(
          Query.#method,
          url,
          id,
          undefined,
          auth
        ),
      {
        retry: false,
        onError: () => navigate('/login'),
      }
    );
  }
}

class Mutation<DataType, ResponseDataType> extends Controller {
  #method;
  #path;
  #refreshCache;
  /**
   * Mutation Controller
   * @param url base url
   * @param method http method
   * @param navigate instance of useNavigate()
   * @param refreshCache instance of refreshCache()
   * @param path path
   */
  constructor(
    url: string,
    method: string,
    navigate: NavigateFunction,
    refreshCache: () => Promise<void>,
    path?: string
  ) {
    super(url, navigate);
    this.#method = method;
    this.#path = path;
    this.#refreshCache = refreshCache;
  }
  /**
   * Mutation Controller
   * @param auth token
   * @param id post_id | comment_id
   * @param onMutate hook to be called on Mutate
   * @returns instance of useMutation()
   */
  init(auth?: string, id?: number, onMutate?: () => void) {
    const { url, navigate } = this;
    const path = this.#path;

    return useMutation(
      (data: DataType) =>
        api<string | number, DataType, ResponseDataType>(
          this.#method,
          url,
          path ? path : id ? id : undefined,
          data,
          auth
        ),
      {
        onMutate: onMutate ? () => onMutate() : undefined,
        onSuccess:
          path === 'signup' || path === 'login'
            ? () => navigate('/dashboard')
            : path === 'logout' && window.location.pathname === '/dashboard'
            ? () => navigate('/')
            : () => this.#refreshCache(),
        onError: () => navigate('/login'),
      }
    );
  }
}

export default function useControllers() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /** get and refetch the last query; update cache */
  const refreshCache = async () => {
    try {
      // get the last updated query data - corresponds to current page
      const keys = ['userPosts', 'allPosts', 'post'];
      const queries = keys.map((query) => ({
        key: query,
        state: queryClient.getQueryState([query]),
      }));

      let lastUpdated = -Infinity;
      let index = null;
      for (let i = 0; i < queries.length; i++) {
        const state = queries[i].state;
        if (state === undefined) {
          continue;
        }
        if (state.dataUpdatedAt > lastUpdated) {
          lastUpdated = state.dataUpdatedAt;
          index = i;
        }
      }
      if (index !== null) {
        await queryClient.refetchQueries([queries[index].key]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    userPosts: new Query<UserPosts>('/users/', 'userPosts', navigate),
    allPosts: new Query<Post[]>('/posts/', 'allPosts', navigate),
    post: new Query<Post>('/posts/', 'post', navigate),

    signup: new Mutation<Signup, UserAccess>(
      '/users/',
      'post',
      navigate,
      refreshCache,
      'signup'
    ),
    login: new Mutation<Login, UserAccess>(
      '/users/',
      'post',
      navigate,
      refreshCache,
      'login'
    ),
    logout: new Mutation<void, any>(
      '/users/',
      'post',
      navigate,
      refreshCache,
      'logout'
    ),

    createPost: new Mutation<PostInput, void>(
      '/posts/',
      'post',
      navigate,
      refreshCache
    ),
    updatePost: new Mutation<PostInput, any>(
      '/posts/',
      'put',
      navigate,
      refreshCache
    ),
    deletePost: new Mutation<void, any>(
      '/posts/',
      'delete',
      navigate,
      refreshCache
    ),

    upVote: new Mutation<Vote, any>(
      '/posts/',
      'put',
      navigate,
      refreshCache,
      'upvote'
    ),
    deleteVote: new Mutation<Vote, any>(
      '/posts/',
      'delete',
      navigate,
      refreshCache,
      'upvote'
    ),

    createComment: new Mutation<CommentInput, any>(
      '/comments/',
      'post',
      navigate,
      refreshCache
    ),
    updateComment: new Mutation<CommentInput, any>(
      '/comments/',
      'put',
      navigate,
      refreshCache
    ),
    deleteComment: new Mutation<void, any>(
      '/comments/',
      'delete',
      navigate,
      refreshCache
    ),
  };
}
