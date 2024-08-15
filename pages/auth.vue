<script setup>
const user = useSupabaseUser()
</script>

<template>
  <div class="flex justify-center p-2">
      <h1 class="text-4xl">Login/Register</h1>
  </div>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="user" />
    <Auth v-else />
  </div>
</template>