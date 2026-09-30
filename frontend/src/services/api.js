import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postService = {
  // Get posts with optional filtering and search
  getAll: async (params = {}) => {
    const response = await client.get('/posts', { params });
    return response.data;
  },

  // Get a single post by id or slug
  getById: async (id) => {
    const response = await client.get(`/posts/${id}`);
    return response.data;
  },

  // Create new blog post
  create: async (postData) => {
    const response = await client.post('/posts', postData);
    return response.data;
  },

  // Update existing blog post
  update: async (id, postData) => {
    const response = await client.put(`/posts/${id}`, postData);
    return response.data;
  },

  // Delete post
  delete: async (id) => {
    const response = await client.delete(`/posts/${id}`);
    return response.data;
  },

  // Like a post
  like: async (id) => {
    const response = await client.post(`/posts/${id}/like`);
    return response.data;
  },

  // Fetch category counts
  getCategories: async () => {
    const response = await client.get('/posts/meta/categories');
    return response.data;
  },
};

export default postService;
