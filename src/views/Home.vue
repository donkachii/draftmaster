<script setup>
import FeatureCard from "../components/FeatureCard.vue";

const features = [
  {
    icon: "fas fa-brain",
    title: "AI-Powered Suggestions",
    description:
      "Get intelligent suggestions for titles, summaries, and keywords based on your content. Let AI help you optimize your blog posts.",
  },
  {
    icon: "fas fa-bolt",
    title: "Instant Analysis",
    description:
      "Real-time statistics and insights about your content. Track word count, reading time, and other key metrics as you write.",
  },
  {
    icon: "fas fa-keyboard",
    title: "Distraction-Free Writing",
    description:
      "Focus on your content with our clean, minimal editor. All the tools you need, right when you need them.",
  },
];
</script>

<template>
  <div class="container-md py-5">
    <div
      class="d-flex flex-column justify-content-center align-items-center text-center"
    >
      <h1 class="display-2 fw-bold">
        Craft Perfect Blog Posts with
        <span class="text-primary">DraftMaster AI</span>
      </h1>
      <p class="text-muted w-80 fs-4">
        Transform your writing process with intelligent suggestions for titles,
        summaries, and keywords. Let AI help you create engaging content faster
        than ever.
      </p>
      <div class="d-flex justify-content-center align-items-center gap-4">
        <button class="btn btn-primary rounded-pill px-4 py-3">
          Get Started<i class="fas fa-arrow-up-right-from-square ms-2"></i>
        </button>
      </div>
    </div>
  </div>
  <div class="container-md py-5">
    <div class="row g-4">
      <div class="col-md-4" v-for="feature in features" :key="feature.title">
        <FeatureCard :feature="feature" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    FeatureCard,
  },
};
</script>
