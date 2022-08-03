declare module "custom-types" {
  interface User {
    id?: number
    name?: string
    email?: string
    password?: string
    posts?: Post[]
  }
  interface Post {
    id?:number
    title?: string
    text?: string
    user?: User
    created_at?: string
    updated_at?: string
    comments?:Comment[]
    vote_count?: number
  }
  interface Comment {
    id?: number
    text: string
    user_id?: number
    post_id?: number
    user?: User
    created_at?: String
    updated_at?: String
  }
  interface Vote {
    id?: number
    user_id?: number
    post_id: number
  }

  interface Action {
    type: string
    payload?: AppContext
  }

  interface AppContext {
    user?: string
    auth?: string
  }
}