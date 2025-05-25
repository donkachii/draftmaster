<template>
  <div class="card p-3 shadow-sm">
    <input
      v-model="localTitle"
      class="form-control mb-2"
      placeholder="Enter your blog title..."
    />
    <textarea
      v-model="localContent"
      class="form-control"
      rows="10"
      placeholder="Start writing your blog post here..."
    ></textarea>
  </div>

  <div class="d-flex justify-content-between mt-3 gap-2">
    <button 
      class="btn btn-primary w-100" 
      @click="generate('title')"
      :disabled="loading || !localContent.trim()"
    >
      <span v-if="loading">Loading...</span>
      <span v-else>Generate Title</span>
    </button>
    <button 
      class="btn btn-primary w-100" 
      @click="generate('summary')"
      :disabled="loading || !localContent.trim()"
    >
      <span v-if="loading">Loading...</span>
      <span v-else>Summarize Content</span>
    </button>
    <button 
      class="btn btn-primary w-100" 
      @click="generate('keywords')"
      :disabled="loading || !localContent.trim()"
    >
      <span v-if="loading">Loading...</span>
      <span v-else>Suggest Keywords</span>
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import openaiService from "../services/openaiService";

const props = defineProps({
  title: { type: String, default: "" },
  content: { type: String, default: "" },
  suggestions: { type: Array, default: () => [] },
});
const emit = defineEmits(["update:title", "update:content"]);

const localTitle = ref(props.title);
const localContent = ref(props.content);
const localSuggestions = ref(props.suggestions);
const loading = ref(false);

watch(
  () => props.title,
  (val) => (localTitle.value = val)
);
watch(
  () => props.content,
  (val) => (localContent.value = val)
);

watch(
  () => props.content,
  () => {
    localSuggestions.value = [];
  }
);

watch(localTitle, (val) => emit("update:title", val));
watch(localContent, (val) => emit("update:content", val));

async function generate(type) {
  if (!localContent.value.trim()) {
    alert("Write some content first.");
    return;
  }
  
  loading.value = true;
  localSuggestions.value = [];

  try {
    const result = await openaiService.generateSuggestions(
      localContent.value,
      type
    );
    
    if (type === 'title' && result) {
      localTitle.value = result;
    } else {
      localSuggestions.value = Array.isArray(result) ? result : [result];
    }
  } catch (error) {
    console.error('Error generating suggestions:', error);
    alert("Error fetching from AI. Please try again.");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.card {
  border-radius: 1rem;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
