<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";

const loading = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center bg-light mt-5">
    <div
      class="card shadow-lg p-4"
      style="max-width: 370px; width: 100%; border-radius: 1.5rem"
    >
      <h1 class="h2 fw-bold text-center mb-2">Welcome to DraftMaster</h1>
      <p class="text-secondary text-center mb-4">
        Sign in to unlock AI-powered writing and content suggestions.
      </p>
      <form @submit.prevent="handleLogin">
        <button
          type="submit"
          class="btn btn-light border d-flex align-items-center justify-content-center w-100 py-2 fs-5 fw-semibold shadow-sm gap-2"
          :disabled="loading"
        >
          <span class="d-flex align-items-center">
            <i class="fab fa-google"></i>
          </span>
          <span v-if="loading">Loading...</span>
          <span v-else>Continue with Google</span>
        </button>
      </form>
    </div>
  </div>
</template>
