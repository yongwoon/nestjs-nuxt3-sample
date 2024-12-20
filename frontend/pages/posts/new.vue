<!-- pages/posts/new.vue -->
<template>
  <v-container>
    <h1>Create New Post</h1>
    <v-alert v-if="error" type="error" class="mb-4"> Error: {{ error }} </v-alert>
    <PostForm submit-label="Create" :is-loading="isCreating" @submit="handleSubmit" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePosts } from '~/composables/usePosts';
import PostForm from '~/components/posts/PostForm';

const router = useRouter();
const { createPost } = usePosts();
const isCreating = ref(false);
const error = ref<string | null>(null);

const handleSubmit = async (formData: { title: string; content: string }) => {
  try {
    isCreating.value = true;
    error.value = null;
    await createPost.mutateAsync(formData);
    router.push('/');
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to create post';
  } finally {
    isCreating.value = false;
  }
};
</script>
