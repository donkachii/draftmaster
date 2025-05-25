<template>
  <div class="card p-3 shadow-sm">
    <h5 class="card-title"><i class="bi-file-text"></i> Blog Stats</h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item d-flex justify-content-between">
        Word Count <span>{{ wordCount }}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between">
        Character Count <span>{{ charCount }}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between">
        Reading Time <span>{{ readingTime }} min</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({ content: String });

const wordCount = computed(() => {
  return props.content.trim() ? props.content.trim().split(/\s+/).length : 0;
});

const charCount = computed(() => props.content.length);
const readingTime = computed(() =>
  Math.max(1, Math.ceil(wordCount.value / 200))
);
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
</style>
