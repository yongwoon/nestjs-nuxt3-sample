<!-- components/posts/PostCard.vue -->
<template>
  <v-card class="mb-4">
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-text>{{ post.content }}</v-card-text>
    <v-card-actions>
      <v-btn color="primary" :to="`/posts/${post.id}`">VIEW</v-btn>
      <v-btn color="warning" :to="`/posts/${post.id}/edit`">EDIT</v-btn>
      <v-btn
        color="error"
        @click="$emit('delete', post.id)"
        :loading="isDeleting"
        :disabled="isDeleting"
      >
        <v-icon v-if="!isDeleting">mdi-delete</v-icon>
        <template v-slot:loader>
          <v-progress-circular indeterminate size="20"></v-progress-circular>
        </template>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Post } from '~/types/post';

defineProps<{
  post: Post;
  isDeleting: boolean;
}>();

defineEmits<{
  (e: 'delete', id: number): void;
}>();
</script>
