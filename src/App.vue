<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div>
    <Navbar />
    <div class="container-md my-5">
      <div
        class="d-flex flex-column justify-content-center align-items-center text-center"
      >
        <h1 class="display-2 fw-bold">
          Craft Perfect Blog Posts with
          <span class="text-primary">DraftMaster AI</span>
        </h1>
        <p class="text-muted w-80 fs-4">
          Transform your writing process with intelligent suggestions for
          titles, summaries, and keywords. Let AI help you create engaging
          content faster than ever.
        </p>

        <div class="d-flex justify-content-center align-items-center gap-4">
          <button class="btn btn-primary rounded-pill px-4 py-3">
            Get Started<i class="fas fa-arrow-up-right-from-square ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
