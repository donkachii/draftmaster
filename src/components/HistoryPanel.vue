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

    <div v-else>
      <div v-if="activeTab === 'Drafts'">
        <div v-if="drafts.length">
          <ul class="list-group mb-3">
            <li v-for="draft in drafts" :key="draft.id" class="list-group-item">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{{ draft.title }}</strong>
                  <div class="text-muted small">{{ new Date(draft.created_at).toLocaleString() }}</div>
                </div>
                <button class="btn btn-sm btn-outline-primary" @click="$emit('load-draft', draft)">Load</button>
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="text-center text-muted py-5">No drafts saved yet.</div>
      </div>
      <div v-else-if="activeTab === 'Summary' && suggestionsByType.Summary.length">
        <div class="alert alert-info" style="white-space: pre-line">
          <div
            v-for="(s, i) in suggestionsByType.Summary"
            :key="'summary-' + i"
          >
            {{ s }}
          </div>
        </div>
      </div>
      <ul
        v-else-if="
          (activeTab === 'Titles' && suggestionsByType.Titles.length) ||
          (activeTab === 'Keywords' && suggestionsByType.Keywords.length)
        "
        class="list-group list-group-flush"
      >
        <li
          class="list-group-item"
          v-for="(s, i) in activeTab === 'Titles'
            ? suggestionsByType.Titles
            : suggestionsByType.Keywords"
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  userId: { type: String, required: false },
});

const tabs = ["Drafts", "Titles", "Summary", "Keywords"];
const activeTab = ref("Drafts");
const loading = ref(false);
const suggestionsByType = ref({ Titles: [], Summary: [], Keywords: [] });
const drafts = ref([]);

const STORAGE_KEY = "ai_suggestions_history";
const DRAFTS_KEY = "draftmaster_drafts";

function loadHistory() {
  loading.value = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      suggestionsByType.value = {
        Titles: parsed.Titles || [],
        Summary: parsed.Summary || [],
        Keywords: parsed.Keywords || [],
      };
    } else {
      suggestionsByType.value = { Titles: [], Summary: [], Keywords: [] };
    }
    
    const draftsRaw = localStorage.getItem(DRAFTS_KEY);
    if (draftsRaw) {
      drafts.value = JSON.parse(draftsRaw);
    } else {
      drafts.value = [];
    }
  } catch (e) {
    suggestionsByType.value = { Titles: [], Summary: [], Keywords: [] };
    drafts.value = [];
  } finally {
    loading.value = false;
  }
}

function addToHistory(type, content) {
  loadHistory();
  if (type === "title") suggestionsByType.value.Titles.unshift(content);
  else if (type === "summary") suggestionsByType.value.Summary.unshift(content);
  else if (type === "keywords")
    suggestionsByType.value.Keywords.unshift(content);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(suggestionsByType.value));
}

defineExpose({ addToHistory });

onMounted(loadHistory);

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
