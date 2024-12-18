import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { postApi } from '~/utils/posts';
import type { Post, CreatePostDto, UpdatePostDto } from '~/types/post';

export const usePosts = () => {
  const queryClient = useQueryClient();

  const posts = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      console.log('Fetching posts...');
      try {
        const data = await postApi.getAll();
        console.log('Posts fetched successfully:', data);
        return data;
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60, // 1分間はキャッシュを使用
    refetchOnMount: true,
    retry: 2,
  });

  const post = (id: number) =>
    useQuery({
      queryKey: ['posts', id],
      queryFn: async () => {
        console.log(`Fetching post ${id}...`);
        try {
          const data = await postApi.getById(id);
          console.log(`Post ${id} fetched successfully:`, data);
          return data;
        } catch (error) {
          console.error(`Failed to fetch post ${id}:`, error);
          throw error;
        }
      },
      enabled: !!id,
    });

  const createPost = useMutation({
    mutationFn: async (newPost: CreatePostDto) => {
      console.log('Creating new post:', newPost);
      try {
        const data = await postApi.create(newPost);
        console.log('Post created successfully:', data);
        return data;
      } catch (error) {
        console.error('Failed to create post:', error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Invalidating posts query cache after creation');
      return queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const updatePost = useMutation({
    mutationFn: async ({ id, post }: { id: number; post: UpdatePostDto }) => {
      console.log(`Updating post ${id}:`, post);
      try {
        const data = await postApi.update(id, post);
        console.log(`Post ${id} updated successfully:`, data);
        return data;
      } catch (error) {
        console.error(`Failed to update post ${id}:`, error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Invalidating posts query cache after update');
      return queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: number) => {
      console.log(`Deleting post ${id}...`);
      try {
        await postApi.delete(id);
        console.log(`Post ${id} deleted successfully`);
      } catch (error) {
        console.error(`Failed to delete post ${id}:`, error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Invalidating posts query cache after deletion');
      return queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact: true,
      });
    },
  });

  return {
    posts,
    post,
    createPost,
    updatePost,
    deletePost,
  };
};
