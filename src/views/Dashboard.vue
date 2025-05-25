<template>
  <h1>Dashboard</h1>
  <div class="container my-4">
    <div class="row">
      <div class="col-md-8">
        <EditorPanel v-model:title="title" v-model:content="content" />
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
