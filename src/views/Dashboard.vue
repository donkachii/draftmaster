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
        <button
          class="btn btn-success w-100 mb-4"
          @click="saveDraft"
          :disabled="!title.trim() || !content.trim() || saving"
        >
          <span v-if="saving">Saving...</span>
          <span v-else>Save Draft</span>
        </button>
        <SuggestionPanel :suggestions="suggestions" />
      </div>
      <div class="col-md-4">
        <HistoryPanel :user-id="user && user.id ? user.id : ''" />
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
const saving = ref(false);

onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  user.value = data.user;

  if (!user.value) {
    router.push("/");
  }
});

async function generateSuggestion(type) {
  if (!content.value.trim() || !title.value.trim()) {
    alert("Write some content and title first.");
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

async function saveDraft() {
  if (!title.value.trim() || !content.value.trim()) {
    alert("Title and content are required.");
    return;
  }
  saving.value = true;
  try {
    /*
    const { data: postData, error: postError } = await supabase
      .from("blog_posts")
      .insert({
        title: title.value,
        content: content.value,
        user_id: user.value.id,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (postError || !postData)
      throw postError || new Error("No post data returned");
    const blogPostId = postData.id;

    const aiInserts = [];
    if (suggestions.value.title && suggestions.value.title.length) {
      for (const t of suggestions.value.title) {
        aiInserts.push({
          blogs_post_id: blogPostId,
          type: "title",
          content: t,
          created_at: new Date().toISOString(),
        });
      }
    }
    if (suggestions.value.summary) {
      aiInserts.push({
        blogs_post_id: blogPostId,
        type: "summary",
        content: suggestions.value.summary,
        created_at: new Date().toISOString(),
      });
    }
    if (suggestions.value.keywords && suggestions.value.keywords.length) {
      for (const k of suggestions.value.keywords) {
        aiInserts.push({
          blogs_post_id: blogPostId,
          type: "keywords",
          content: k,
          created_at: new Date().toISOString(),
        });
      }
    }
    if (aiInserts.length) {
      const { error: aiError } = await supabase
        .from("ai_suggestions")
        .insert(aiInserts);
      if (aiError) throw aiError;
    }
    */


    const STORAGE_KEY = 'draftmaster_drafts';
    const raw = localStorage.getItem(STORAGE_KEY);
    let drafts = [];
    if (raw) {
      try { drafts = JSON.parse(raw); } catch {}
    }
    const newDraft = {
      id: Date.now(),
      title: title.value,
      content: content.value,
      suggestions: JSON.parse(JSON.stringify(suggestions.value)),
      created_at: new Date().toISOString(),
    };
    drafts.unshift(newDraft);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    alert("Draft saved locally!");
  } catch (e) {
    alert("Error saving draft: " + (e.message || e));
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.go {
  color: purple;
}
</style>
