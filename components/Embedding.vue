<template>
    <div>
        <div class="flex justify-center p-2">
            <UTextarea placeholder="Enter your ingredients..." v-model="input"></UTextarea>
        </div>
        <div class="flex justify-center px-2">
            <div class="m-2"><UButton color="indigo" @click="clear">Clear</UButton></div>
            <div class="m-2"><UButton @click="getRecipes">Get recipes</UButton></div>
        </div>

        <v-card
            class="ma-2 py-2"
            color="#BF360C"
            v-if="recipes !== '' && recipes.length > 0"
            v-for="(recipe, index) in recipes" :key="recipe.uri">
          <v-row>
            <v-col cols="10">
              <v-card-title class="text-h5">{{ recipe.title }}</v-card-title>
              <v-row>
                <v-col cols="6">
                    <v-card-subtitle class="text-h6 pl-6">Used ingredients: {{ recipe.usedIngredientCount }}</v-card-subtitle>
                    <v-list class="bg-deep-orange-darken-4" density="compact">
                        <v-list-item
                            class="pl-8"
                            disabled
                            v-for="(item, i) in recipe.usedIngredients"
                            :key="i"
                            :value="item"
                        >
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-col>
                <v-col cols="6">
                    <v-card-subtitle class="text-h6 pl-6">Needed ingredients: {{ recipe.missedIngredientCount }}</v-card-subtitle>
                    <v-list class="bg-deep-orange-darken-4" density="compact">
                        <v-list-item
                            class="pl-8"
                            disabled
                            v-for="(item, i) in recipe.missedIngredients"
                            :key="i"
                            :value="item"
                        >
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
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
                <v-col cols="2">
                    <v-avatar
                    rounded="sm"
                    size="125"
                    >
                    <v-img :src="recipe.image"></v-img>
                    </v-avatar>

                    <v-btn
                        class="mt-1"
                        variant="text"
                        @click="getRecipe(recipe.id, index)"
                    >
                        View Recipe
                    </v-btn>
                </v-col>
            </v-row>
            <v-card v-if="recipe.recipe" variant="outlined" color="grey-darken-4" class="mx-2">
                <v-row>
                    <!-- INGREDIENTS -->
                    <v-col cols="6">
                        <v-card-subtitle class="text-h6 pl-6">Ingredients</v-card-subtitle>
                        <v-list class="bg-deep-orange-darken-4" density="compact">
                            <v-list-item
                                class="pl-8"
                                disabled
                                v-for="(item, i) in recipe.recipe.extendedIngredients"
                                :key="i"
                                :value="item"
                            >
                                <v-list-item-title>{{ item.original }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <!-- INSTRUCTIONS -->
                    <v-col cols="6">
                        <v-card-subtitle class="text-h6 pl-6">Instructions</v-card-subtitle>
                        <v-list class="bg-deep-orange-darken-4" density="compact">
                            <v-list-item
                                class="pl-8"
                                disabled
                                v-for="(item, i) in recipe.recipe.analyzedInstructions[0].steps"
                                :key="i"
                                :value="item"
                            >
                                <v-list-item-title class="text-wrap">{{ item.number }} - {{ item.step }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card>
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
        const selectedRecipe = ref('')

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
            console.log('RES: ', recipes.value)
        }

        const getRecipe = async (id, index) => {
            if (!recipes.value[index].recipe) {
                const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${config.public.foodId}`
                recipes.value[index].recipe = await $fetch(url, { method: 'GET' })
            }
        }
        

        return {
            input,
            recipes,
            selectedRecipe,
            getRecipes,
            getRecipe,
            clear
        }
    }
}
</script>

<style lang="scss" scoped>

</style>