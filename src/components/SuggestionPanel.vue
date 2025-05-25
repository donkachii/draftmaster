<template>
  <div class="card p-3 shadow-sm">
    <h5 class="card-title"><i class="bi-stars"></i> AI Suggestions</h5>

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

    <ul v-else-if="suggestions.length" class="list-group list-group-flush">
      <li class="list-group-item" v-for="(s, i) in suggestions" :key="i">
        {{ s }}
      </li>
    </ul>

    <div v-else class="text-center text-muted py-5">
      No {{ activeTab.toLowerCase() }} yet. Generate some!
    </div>

    <button
      class="btn btn-primary w-100 mt-3"
      @click="generate(activeTab.toLowerCase())"
    >
      Generate {{ activeTab }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import openaiService from "../services/openaiService";

const props = defineProps({ content: String });
const tabs = ["Titles", "Summary", "Keywords"];
const activeTab = ref("Titles");
const suggestions = ref([]);
const loading = ref(false);

watch(
  () => props.content,
  () => {
    suggestions.value = [];
  }
);

async function generate(type) {
  if (!props.content.trim()) return alert("Write some content first.");
  loading.value = true;

  console.log(props.content, " props.content ", type, " type ");
  try {
    const result = await openaiService.generateSuggestions(props.content, type);
    console.log(result);
    suggestions.value = result;
  } catch {
    alert("Error fetching from AI.");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.card {
  border-radius: 1rem;
  margin-bottom: 1rem;
}
</style>
