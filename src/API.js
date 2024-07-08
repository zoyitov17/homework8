import axios from 'axios';

const API = axios.create({
  baseURL: 'https://your-render-url/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createPost = async (newPost) => {
  try {
    const response = await API.post('/posts', newPost);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating post: ${error.message}`);
  }
};

export default API;
