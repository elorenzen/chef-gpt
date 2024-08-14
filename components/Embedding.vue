<template>
    <div>
        <div class="flex justify-center p-2">
            <UTextarea placeholder="Enter your ingredients..." v-model="embeddings"></UTextarea>
        </div>
            <div class="flex justify-center py-2">
            <UButton @click="showIngredients">Button</UButton>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup () {
        const embeddings = ref('')
        function showIngredients() { console.log (embeddings.value) }

        return { embeddings, showIngredients }
    }
}
</script>

<style lang="scss" scoped>

</style>