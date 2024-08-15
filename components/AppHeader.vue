<script setup lang="ts">
const route = useRoute()

const links = [
  [{
    label: 'Login/Register',
    icon: 'i-heroicons-user',
    to: '/auth'
  }]
]
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>

