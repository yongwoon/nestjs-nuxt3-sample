<!-- posts/[id]/edit.vue -->
<template>
  <v-container>
    <template v-if="pending">
      <PostCardSkeleton v-for="n in 3" :key="n" />
    </template>

    <v-alert v-else-if="error" type="error" class="mb-4">
      Error: {{ error?.message || 'Failed to load posts' }}
    </v-alert>

    <v-alert v-if="updateError" type="error" class="mb-4"> Error: {{ updateError }} </v-alert>

    <template v-else-if="data">
      <h1>Edit Post</h1>
      <PostForm
        :initial-data="data"
        submit-label="Update"
        :is-loading="isUpdating"
        @submit="handleSubmit"
      />
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { usePosts } from '~/composables/usePosts';
import PostForm from '~/components/posts/PostForm';

const route = useRoute();
const router = useRouter();

const id = Number(route.params.id);

const { post, updatePost } = usePosts();

const { isPending: pending, isError: error, data } = post(id);

// 更新処理の状態
const { mutateAsync: updatePostMutation, isPending: isUpdating, error: updateError } = updatePost;

const handleSubmit = async (formData: { title: string; content: string }) => {
  try {
    await updatePostMutation({ id, post: formData });
    router.push(`/posts/${id}`);
  } catch (e) {
    console.error('Failed to update post:', e); // エラーログを追加
  }
};
</script>
