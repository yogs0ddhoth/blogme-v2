declare module "custom-types" {
  interface hello {
    key_1: string
    key_2: string
  }

  interface User {
    id?: number
    name?: string
    email: string
    password: string
  }
  interface Post {
    id?:number
    title?: string
    text?: string
    user?: {
      id: number
      name: string
    }
    created_at?: string
    updated_at?: string
    vote_count?: number
  }
  interface Comment {
    id?: number
    text: string
    user_id?: number
    post_id: number
  }
  interface Vote {
    id?: number
    user_id?: number
    post_id: number
  }

  interface Action {
    type: string
  }
}