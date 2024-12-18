<template>
  <v-container>
    <h1>Create New Post</h1>
    <PostForm submit-label="Create" :is-loading="createPost.isPending" @submit="handleSubmit" />
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { usePosts } from '~/composables/usePosts';

const router = useRouter();
const { createPost } = usePosts();

const handleSubmit = async (formData: { title: string; content: string }) => {
  await createPost.mutateAsync(formData);
  router.push('/');
};
</script>
