from ariadne import gql

type_defs = gql("""
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
  
  type Post {
    id: ID!
    title: String!
    text: String!
    user_id: ID
    created_at: String
    updated_at: String
    vote_count: Int
    user: User
    comments: [Comment]
    votes: [Vote]
  }
  type PostResult {
      success: Boolean!
      errors: [String]
      post: Post
  }
  
  type PostsResult {
      success: Boolean!
      errors: [String]
      posts: [Post]
  }
  
  type Comment {
    id: ID!
    text: String!
    user_id: ID
    post_id: ID
    created_at: String
    updated_at: String
    user: User
  }
  
  type Vote {
    id: ID!
    user_id: ID
    post_id: ID
  }
  
  type Query {
    getAllPosts: PostsResult!
    getPost(id: ID!): PostResult!
  }
  type Mutation {
    createPost(title: String!, text: String!): PostResult!
    updatePost(id: ID!, title: String, text: String): PostResult!
  }
""")