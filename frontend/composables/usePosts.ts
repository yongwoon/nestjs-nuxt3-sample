// composables/usePosts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { postApi } from '~/utils/posts';
import type { CreatePostDto, UpdatePostDto } from '~/types/post';

export const usePosts = () => {
  const queryClient = useQueryClient();

  const posts = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const data = await postApi.getAll();
      return data;
    },
    staleTime: 1000 * 60, // 1分間はキャッシュを使用
    // refetchOnMount: true,
  });

  const post = (id: number) => {
    const query = useQuery({
      queryKey: ['posts', id],
      queryFn: async () => {
        const response = await postApi.getById(id);
        return response;
      },
      enabled: !!id,
      retry: false, // デバッグのために一時的にリトライを無効化
    });

    // クエリの状態をログ出力
    // console.log('Query state:', {
    //   isLoading: query.isLoading,
    //   isError: query.isError,
    //   data: query.data,
    //   error: query.error,
    //   enabled: !!id,
    // });

    return query;
  };
  const createPost = useMutation({
    mutationFn: async (newPost: CreatePostDto) => {
      const data = await postApi.create(newPost);

      return data;
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const updatePost = useMutation({
    mutationFn: async ({ id, post }: { id: number; post: UpdatePostDto }) => {
      const data = await postApi.update(id, post);
      return data;
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: number) => {
      await postApi.delete(id);
    },
    onSuccess: () => {
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
