<template>
  <div class="container py-4">
    <div class="mb-3">
      <quill-editor v-model="content" :options="editorOptions" />
    </div>
    <div class="mb-3 d-flex flex-wrap gap-2">
      <button class="btn btn-primary" @click="handleAISuggestion('title')">Generate Title</button>
      <button class="btn btn-secondary" @click="handleAISuggestion('summary')">Summarize Content</button>
      <button class="btn btn-info" @click="handleAISuggestion('keywords')">Suggest Keywords</button>
    </div>
    <div v-if="suggestions.length" class="mt-3">
      <h5>AI Suggestions</h5>
      <ul>
        <li v-for="(suggestion, idx) in suggestions" :key="idx">{{ suggestion }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QuillEditor } from 'vue3-quill';
import openaiService from '../services/openaiService';

const content = ref('');
const suggestions = ref([]);
const editorOptions = {
  theme: 'snow',
  placeholder: 'Write your blog content here...'
};

async function handleAISuggestion(type) {
  if (!content.value) return;
  try {
    const result = await openaiService.generateSuggestions(content.value, type);
    if (Array.isArray(result)) {
      suggestions.value = result;
    } else if (typeof result === 'string') {
      suggestions.value = [result];
    } else {
      suggestions.value = ['No suggestion returned.'];
    }
  } catch (e) {
    suggestions.value = ['Error fetching suggestion.'];
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>
