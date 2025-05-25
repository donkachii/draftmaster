<template>
  <div class="card p-3 shadow-sm">
    <h5 class="card-title"><i class="bi-stars"></i>History</h5>

    <ul class="nav nav-pills mb-3">
      <li class="nav-item" v-for="tab in tabs" :key="tab">
        <button
          class="nav-link"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </li>
    </ul>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-else-if="suggestions.length && activeTab === 'Summary'">
      <div class="alert alert-info" style="white-space: pre-line;">
        {{ Array.isArray(suggestions) ? suggestions.join('\n') : suggestions }}
      </div>
    </div>
    <ul v-else-if="suggestions.length && (activeTab === 'Titles' || activeTab === 'Keywords')" class="list-group list-group-flush">
      <li
        class="list-group-item"
        v-for="(s, i) in suggestions"
        :key="i"
        @click="copyToClipboard(s)"
      >
        {{ s }}
      </li>
    </ul>

    <div v-else class="text-center text-muted py-5">
      No {{ activeTab.toLowerCase() }} yet. Generate some!
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  suggestions: { type: Array, default: () => [] },
});

const tabs = ["Titles", "Summary", "Keywords"];
const activeTab = ref("Titles");

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard");
}
</script>

<style scoped>
.card {
  border-radius: 1rem;
  margin-bottom: 1rem;
}
</style>
