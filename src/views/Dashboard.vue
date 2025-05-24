<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter(); 

const user = ref(null);

onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  user.value = data.user;

  if (!user.value) {
    router.push("/");
  }
});
</script>

<style scoped></style>
