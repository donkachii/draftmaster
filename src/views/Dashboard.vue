<template>
  <h1>Dashboard</h1>
  <div class="container my-4">
    <div class="row">
      <div class="col-md-8">
        <div class="card p-3 shadow-sm mb-4">
          <input
            v-model="title"
            class="form-control mb-2"
            placeholder="Enter your blog title..."
          />
          <textarea
            v-model="content"
            class="form-control mb-2"
            rows="10"
            placeholder="Start writing your blog post here..."
          ></textarea>
          <div class="d-flex justify-content-between gap-2 mt-2">
            <button
              class="btn btn-primary w-100"
              @click="generateSuggestion('title')"
              :disabled="loading.title || !content.trim()"
            >
              <span v-if="loading.title">Loading...</span>
              <span v-else>Generate Title</span>
            </button>
            <button
              class="btn btn-primary w-100"
              @click="generateSuggestion('summary')"
              :disabled="loading.summary || !content.trim()"
            >
              <span v-if="loading.summary">Loading...</span>
              <span v-else>Summarize Content</span>
            </button>
            <button
              class="btn btn-primary w-100"
              @click="generateSuggestion('keywords')"
              :disabled="loading.keywords || !content.trim()"
            >
              <span v-if="loading.keywords">Loading...</span>
              <span v-else>Suggest Keywords</span>
            </button>
          </div>
        </div>
        <SuggestionPanel :suggestions="suggestions" />
      </div>
      <div class="col-md-4">
        <HistoryPanel :suggestions="suggestions" />
        <StatsPanel :content="content" class="mt-4" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import SuggestionPanel from "../components/SuggestionPanel.vue";
import HistoryPanel from "../components/HistoryPanel.vue";
import StatsPanel from "../components/StatsPanel.vue";
import openaiService from "../services/openaiService";

const router = useRouter();

const user = ref(null);
const title = ref("");
const content = ref("");
const suggestions = ref({ title: [], summary: "", keywords: [] });
const loading = ref({ title: false, summary: false, keywords: false });

onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  user.value = data.user;

  if (!user.value) {
    router.push("/");
  }
});

async function generateSuggestion(type) {
  if (!content.value.trim()) {
    alert("Write some content first.");
    return;
  }
  loading.value[type] = true;
  try {
    const result = await openaiService.generateSuggestions(content.value, type);
    if (type === "title") {
      suggestions.value.title = Array.isArray(result) ? result : [result];
      if (result && typeof result === "string") title.value = result;
    } else if (type === "summary") {
      suggestions.value.summary = Array.isArray(result)
        ? result.join("\n")
        : result;
    } else if (type === "keywords") {
      suggestions.value.keywords = Array.isArray(result) ? result : [result];
    }
  } catch (e) {
    alert("Error fetching from AI.");
  } finally {
    loading.value[type] = false;
  }
}
</script>

<style scoped>
.go {
  color: purple;
}
</style>
