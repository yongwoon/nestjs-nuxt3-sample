<template>
  <v-container>
    <div v-if="postQuery.isLoading">Loading...</div>
    <div v-else-if="postQuery.isError">Error: {{ postQuery.error }}</div>
    <template v-else-if="postQuery.data">
      <h1>Edit Post</h1>
      <PostForm
        :initial-data="postQuery.data"
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
const id = Number(route.params.id);
const { post, updatePost } = usePosts();
const postQuery = post(id);

const handleSubmit = async (formData: { title: string; content: string }) => {
  await updatePost.mutateAsync({ id, post: formData });
  router.push(`/posts/${id}`);
};
</script>
