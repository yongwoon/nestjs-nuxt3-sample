<!-- posts/[id]/index.vue -->
<template>
  <v-container>
    <div v-if="pending">
      <p>Loading...</p>
    </div>
    <div v-else-if="error">
      <p>Error occurred:</p>
      <pre>{{ error }}</pre>
    </div>
    <template v-else-if="data">
      <v-card>
        <v-card-title>{{ data.title }}</v-card-title>
        <v-card-text>
          <p>{{ data.content }}</p>
          <p class="text-caption">Created at: {{ new Date(data.createdAt).toLocaleString() }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn :to="`/posts/${id}/edit`" color="warning">Edit</v-btn>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn color="error" v-bind="props" :loading="isDeleting"> Delete </v-btn>
            </template>
            <v-card>
              <v-card-title>Confirm Delete</v-card-title>
              <v-card-text>Are you sure you want to delete this post?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  variant="text"
                  @click="dialog = false"
                  :disabled="isDeleting"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="error"
                  variant="text"
                  @click="handleDelete"
                  :loading="isDeleting"
                  :disabled="isDeleting"
                >
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePosts } from '~/composables/usePosts';

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const { post, deletePost } = usePosts();

// 投稿データの取得状態を明示的に分解
const { isPending: pending, isError: error, data } = post(id);

// 削除関連の状態
const dialog = ref(false);
const isDeleting = ref(false);

const handleDelete = async () => {
  try {
    isDeleting.value = true;
    await deletePost.mutateAsync(id);
    dialog.value = false;
    router.push('/');
  } catch (e) {
    console.error('Failed to delete post:', e);
  } finally {
    isDeleting.value = false;
  }
};
</script>
