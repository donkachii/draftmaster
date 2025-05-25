<template>
  <nav class="navbar navbar-expand-lg bg-white border-bottom">
    <div class="container-fluid px-5 py-2">
      <a
        class="navbar-brand text-primary cursor-pointer"
        @click="navigateTo('/')"
        >DraftMaster</a
      >
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
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarTogglerDemo02"
      >
        <button
          v-if="!user"
          class="btn btn-outline-primary rounded-pill px-4 py-2"
          @click="navigateTo('/login')"
        >
          Start Writing 📝<i class="fas fa-arrow-up-right-from-square ms-2"></i>
        </button>
        <button v-else class="btn btn-danger" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { supabase } from "../supabase";
import { ref, onMounted } from "vue";

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};

const user = ref(null);

onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  user.value = data.user;
});

async function logout() {
  await supabase.auth.signOut();
  user.value = null;
  router.push("/");
}
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
