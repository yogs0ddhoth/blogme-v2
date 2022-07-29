import axios from "axios";

export const getHello = async () => {
  try {
    const response = await axios.get('/api/hello');

    console.log('success', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async () => {
  try {
    const response = await axios.get('/users/');

    console.log('success', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const signup = async () => {
  try {
    const response = await axios.post('/users/signup')

    console.log('success', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const login = async () => {
  try {
    const response = await axios.post('/users/login')

    console.log('success', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const logout = async () => {
  try {
    const response = await axios.post('/users/logout')

    console.log('success', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get('/posts/')

    console.log('success', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const createPost = async () => {
  try {
    const response = await axios.post('/posts/')

    console.log('success', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editPost = async (id:string) => {
  try {
    const response = await axios.get(`/posts/${id}`)

    console.log('success', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = async (id:string) => {
  try {
    const response = await axios.put(`/posts/${id}`)

    console.log('success', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = async (id:string) => {
  try {
    const response = await axios.delete(`/posts/${id}`)

    console.log('success', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
// export const upVote = async () => {
//   try {
//     const response = await axios.put('/posts/upVote')

//     console.log('success', response);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };
export const comment = async () => {
  try {
    const response = await axios.post('/posts/comment')

    console.log('success', response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
// export const  = async () => {
//   try {
//     const response = await axios.

//     console.log('success', response);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }