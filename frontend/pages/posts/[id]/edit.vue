<!-- posts/[id]/edit.vue -->
<template>
  <v-container>
    <template v-if="pending">
      <PostCardSkeleton v-for="n in 3" :key="n" />
    </template>

    <v-alert v-else-if="error" type="error" class="mb-4">
      Error: {{ error?.message || 'Failed to load posts' }}
    </v-alert>

    <template v-else-if="data">
      <h1>Edit Post</h1>
      <PostForm
        :initial-data="data"
        submit-label="Update"
        :is-loading="updatePost.isPending"
        @submit="handleSubmit"
      />
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { usePosts } from '~/composables/usePosts';

const route = useRoute();
const router = useRouter();

console.log('Edit page');

const id = Number(route.params.id);

console.log('Current ID:', id, typeof id);

const { post, updatePost } = usePosts();

const { isPending: pending, isError: error, data } = post(id);

const handleSubmit = async (formData: { title: string; content: string }) => {
  await updatePost.mutateAsync({ id, post: formData });
  router.push(`/posts/${id}`);
};
</script>
