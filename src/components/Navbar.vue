<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand text-primary" href="#">DraftMaster</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
        <button class="btn btn-outline-primary rounded-pill px-4 py-2" @click="navigateTo('/login')">
          Start Writing 📝<i class="fas fa-arrow-up-right-from-square ms-2"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
// import { useRouter } from 'vue-router';

// const router = useRouter();

// const navigateTo = (path) => {
//   router.push(path);
// };
</script>