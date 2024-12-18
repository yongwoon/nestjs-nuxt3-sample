<template>
  <v-container>
    <div v-if="postQuery.isLoading">Loading...</div>
    <div v-else-if="postQuery.isError">Error: {{ postQuery.error }}</div>
    <template v-else-if="postQuery.data">
      <v-card>
        <v-card-title>{{ postQuery.data.title }}</v-card-title>
        <v-card-text>
          <p>{{ postQuery.data.content }}</p>
          <p class="text-caption">
            Created at: {{ new Date(postQuery.data.createdAt).toLocaleString() }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn :to="`/posts/${id}/edit`" color="warning"> Edit </v-btn>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn color="error" v-bind="props" :loading="deletePost.isPending"> Delete </v-btn>
            </template>
            <v-card>
              <v-card-title>Confirm Delete</v-card-title>
              <v-card-text> Are you sure you want to delete this post? </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" @click="dialog = false"> Cancel </v-btn>
                <v-btn
                  color="error"
                  variant="text"
                  @click="confirmDelete"
                  :loading="deletePost.isPending"
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
const postQuery = post(id);

const dialog = ref(false);

const confirmDelete = async () => {
  await deletePost.mutateAsync(id);
  dialog.value = false;
  router.push('/');
};
</script>
