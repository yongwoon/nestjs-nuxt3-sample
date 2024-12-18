<template>
  <v-form @submit.prevent="handleSubmit">
    <v-container>
      <v-text-field v-model="form.title" label="Title" :error-messages="errors.title" required />

      <v-textarea
        v-model="form.content"
        label="Content"
        :error-messages="errors.content"
        required
      />

      <v-btn type="submit" color="primary" :loading="isLoading">
        {{ submitLabel }}
      </v-btn>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Post } from '~/types/post';

const props = defineProps<{
  initialData?: Post;
  submitLabel?: string;
  isLoading?: boolean;
}>();

const emit = defineEmits<{
  submit: [{ title: string; content: string }];
}>();

const form = ref({
  title: props.initialData?.title ?? '',
  content: props.initialData?.content ?? '',
});

const errors = ref({
  title: '',
  content: '',
});

const handleSubmit = () => {
  errors.value = { title: '', content: '' };

  if (!form.value.title) {
    errors.value.title = 'Title is required';
    return;
  }
  if (!form.value.content) {
    errors.value.content = 'Content is required';
    return;
  }

  emit('submit', form.value);
};
</script>
