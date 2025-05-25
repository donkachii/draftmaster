<template>
  <h1>Dashboard</h1>
  <div class="container my-4">
    <div class="row">
      <div class="col-md-8">
        <EditorPanel v-model:title="title" v-model:content="content" />
        <div class="mt-4">
          <div class="card p-3 shadow-sm">
            <h5 class="mb-3">AI Suggestions</h5>
            <div v-if="suggestions.length > 0">
              <div
                v-for="(suggestion, index) in suggestions"
                :key="index"
                class="mb-3"
              >
                <div class="d-flex align-items-center mb-2">
                  <i class="fas fa-lightbulb text-warning me-2"></i>
                  <h6 class="mb-0">Suggestion {{ index + 1 }}</h6>
                </div>
                <p class="mb-0">{{ suggestion }}</p>
              </div>
            </div>
            <div v-else class="text-center text-muted">
              <i class="fas fa-spinner fa-spin me-2"></i>
              No suggestions yet.
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <SuggestionPanel :content="content" />
        <StatsPanel :content="content" class="mt-4" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import EditorPanel from "../components/EditorPanel.vue";
import SuggestionPanel from "../components/SuggestionPanel.vue";
import StatsPanel from "../components/StatsPanel.vue";

const router = useRouter();

const user = ref(null);
const title = ref("");
const content = ref("");
const suggestions = ref([]);

onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  user.value = data.user;

  if (!user.value) {
    router.push("/");
  }
});
</script>

<style scoped>
.go {
  color: purple;
}
</style>
