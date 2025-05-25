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
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  title: { type: String, default: "" },
  content: { type: String, default: "" },
});
const emit = defineEmits(["update:title", "update:content"]);

const localTitle = ref(props.title);
const localContent = ref(props.content);

watch(
  () => props.title,
  (val) => (localTitle.value = val)
);
watch(
  () => props.content,
  (val) => (localContent.value = val)
);
watch(localTitle, (val) => emit("update:title", val));
watch(localContent, (val) => emit("update:content", val));
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
</style>
