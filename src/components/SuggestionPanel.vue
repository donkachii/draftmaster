<template>
  <div class="card p-3 shadow-sm">
    <h5 class="mb-3"><slot name="header">AI Suggestions</slot></h5>
    <div v-if="suggestions.title && suggestions.title.length">
      <h6><slot name="title-header">Titles</slot></h6>
      <ul class="list-group mb-3">
        <li v-for="(t, i) in suggestions.title" :key="'title-' + i" class="list-group-item">{{ t }}</li>
      </ul>
    </div>
    <div v-if="suggestions.summary">
      <h6><slot name="summary-header">Summary</slot></h6>
      <div class="alert alert-info" style="white-space: pre-line;">{{ suggestions.summary }}</div>
    </div>
    <div v-if="suggestions.keywords && suggestions.keywords.length">
      <h6><slot name="keywords-header">Keywords</slot></h6>
      <ul class="list-group mb-3">
        <li v-for="(k, i) in suggestions.keywords" :key="'kw-' + i" class="list-group-item">{{ k }}</li>
      </ul>
    </div>
    <div v-if="!suggestions.title?.length && !suggestions.summary && !suggestions.keywords?.length" class="text-center text-muted">
      <slot name="empty">No suggestions yet.</slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  suggestions: {
    type: Object,
    required: true,
    default: () => ({ title: [], summary: '', keywords: [] })
  }
});
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
</style> 