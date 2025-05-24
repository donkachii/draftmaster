<template>
  <div class="card h-100">
    <div class="card-body p-4">
      <div class="bg-primary rounded-3 p-4 w-">
        <i :class="feature.icon" class="fs-1"></i>
      </div>
      <h5 class="card-title">{{ feature.title }}</h5>
      <p class="card-text mt-auto">
        {{ feature.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  feature: {
    type: Object,
    required: true,
  },
});
</script>
