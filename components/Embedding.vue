<template>
    <div>
        <div class="flex justify-center p-2">
            <UTextarea placeholder="Enter your ingredients..." v-model="input"></UTextarea>
        </div>
        <div class="flex justify-center px-2">
            <div class="m-2"><UButton color="indigo" @click="clear">Clear</UButton></div>
            <div class="m-2"><UButton @click="getRecipes">Get recipes</UButton></div>
        </div>

        <v-card class="ma-2 py-2" color="#BF360C" v-if="recipes !== '' && recipes.length > 0" v-for="recipe in recipes" :key="recipe.uri">
          <v-row>
            <v-col cols="10">
              <v-card-title class="text-h5">{{ recipe.title }}</v-card-title>
              <v-row>
                <v-col cols="6">
                    <v-card-subtitle>Used ingredients: </v-card-subtitle>
                </v-col>
                <v-col cols="6">
                    <v-card-subtitle>Needed ingredients: </v-card-subtitle>
                </v-col>
              </v-row>

              <!-- <v-card-actions>
                <v-btn
                  class="ms-2"
                  size="small"
                  text="START RADIO"
                  variant="outlined"
                ></v-btn>
              </v-card-actions> -->
            </v-col>

            <v-avatar
              class="ma-3"
              rounded="sm"
              size="125"
            >
              <v-img class="rounded-":src="recipe.image"></v-img>
            </v-avatar>

            <!-- TURN TO EXPANSION PANEL -->
            <!-- <v-btn
                class="ma-2"
                color="primary"
                block
                variant="text"
            >
                View Recipe
                <v-icon icon="mdi-arrow-down" end></v-icon>
            </v-btn> -->
          </v-row>
        </v-card>
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
            const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${config.public.foodId}&number=5&ranking=1&ignorePantry=true&ingredients=`

            const parsedIngredients = input.value.split(',')
            let paramStr = ''
            parsedIngredients.forEach((ing, idx) => {
                idx + 1 < parsedIngredients.length ?
                    paramStr += `${ing},` :
                    paramStr += ing
            });
            
            recipes.value = await $fetch(`${url}${paramStr}`, { method: 'GET' })
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