// utils/posts.ts
import { api } from './api';
import type { Post, CreatePostDto, UpdatePostDto } from '~/types/post';

export const postApi = {
  getAll: async (): Promise<Post[]> => {
    const { data } = await api.get<Post[]>('/posts');
    return data;
  },

  getById: async (id: number): Promise<Post> => {
    const { data } = await api.get<Post>(`/posts/${id}`);
    return data;
  },

  create: async (post: CreatePostDto): Promise<Post> => {
    const { data } = await api.post<Post>('/posts', post);
    return data;
  },

  update: async (id: number, post: UpdatePostDto): Promise<Post> => {
    const { data } = await api.put<Post>(`/posts/${id}`, post);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },
};
