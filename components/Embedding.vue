<template>
    <div>
        <div class="flex justify-center p-2">
            <UTextarea placeholder="Enter your ingredients..." v-model="input"></UTextarea>
        </div>
        <div class="flex justify-center px-2">
            <div class="m-2"><UButton color="indigo" @click="clear">Clear</UButton></div>
            <div class="m-2"><UButton @click="getRecipes">Get recipes</UButton></div>
        </div>

        <UCard v-if="recipes !== '' && recipes.length > 0" v-for="recipe in recipes" :key="recipe.uri">
            {{ recipe }}
        </UCard>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup () {
        const config = useRuntimeConfig()

        const input = ref('')
        const recipes = ref('')

        function clear() { input.value = '' }
        const getRecipes = async () => {
            const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${config.public.foodId}&number=50&ranking=1&ignorePantry=true&ingredients=`

            const parsedIngredients = input.value.split(',')
            let paramStr = ''
            parsedIngredients.forEach((ing, idx) => {
                idx + 1 < parsedIngredients.length ?
                    paramStr += `${ing},` :
                    paramStr += ing
            });
            
            const res = await $fetch(`${url}${paramStr}`, { method: 'GET' })
            console.log('RES: ', res)
        }
        

        return {
            input,
            recipes,
            getRecipes,
            clear
        }
    }
}
</script>

<style lang="scss" scoped>

</style>