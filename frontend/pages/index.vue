<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Posts</h1>
        <v-btn to="/posts/create" color="primary" class="mb-4">CREATE NEW POST</v-btn>

        <template v-if="pending">
          <PostCardSkeleton v-for="n in 3" :key="n" />
        </template>

        <v-alert v-else-if="error" type="error" class="mb-4">
          Error: {{ error?.message || 'Failed to load posts' }}
        </v-alert>

        <template v-else>
          <template v-if="data && data.length > 0">
            <PostCard
              v-for="post in data"
              :key="post.id"
              :post="post"
              :is-deleting="deletingPosts[post.id] || false"
              @delete="handleDelete"
            />
          </template>
          <v-alert v-else type="info" class="mt-4">
            No posts found. Create your first post!
          </v-alert>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { usePosts } from '~/composables/usePosts';
import PostCard from '~/components/posts/PostCard.vue';
import PostCardSkeleton from '~/components/posts/PostCardSkeleton.vue';

const { posts, deletePost } = usePosts();

// 明示的にクエリの状態を分解
const { isPending: pending, isError: error, data } = posts;

const deletingPosts = ref<Record<number, boolean>>({});

const handleDelete = async (id: number) => {
  try {
    deletingPosts.value[id] = true;
    await deletePost.mutateAsync(id);
  } catch (err) {
    console.error('Failed to delete post:', err);
  } finally {
    deletingPosts.value[id] = false;
  }
};

// デバッグ用
watchEffect(() => {
  console.log('Query State:', {
    pending,
    error,
    data: data?.length,
    rawData: data,
  });
});
</script>
