declare module 'custom-types' {
  interface Login {
    email: string
    password: string
  }
  interface Signup extends Login {
    name: string
  }

  interface User {
    id: number
    name: string
    posts?: Post[]
  }

  interface PostInput {
    title: string
    text: string
  }
  interface Post extends PostInput {
    id: number
    user: User
    created_at: string
    updated_at: string
    comments: Comment[]
    vote_count: number
  }

  interface CommentInput {
    post_id?: number
    text: string
  }
  interface Comment extends CommentInput {
    id: number
    user: User
    created_at: string
    updated_at: string
  }
  interface Vote {
    id?: number
    user_id?: number
    post_id: number
  }

  interface AuthAction {
    type: string
    payload?: {
      auth: string
    }
  }
  interface AuthContext {
    user: string
    id: number
    auth: string | null
  }
}
