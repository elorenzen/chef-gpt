<template>
    <div>
        <div class="flex justify-center p-2">
            <v-row dense>
                <!-- <v-col cols="2">
                    <v-select
                        color="secondary"
                        clearable
                        outlined
                        label="Meal Type"
                        v-model="selectedMealType"
                        :items="mealTypes"
                        prepend-inner-icon="mdi-filter-variant"
                    >
                    </v-select>
                </v-col>
                <v-col cols="3">
                    <v-select
                        color="secondary"
                        clearable
                        outlined
                        label="Max. Cook Time"
                        v-model="selectedMaxCookTime"
                        :items="maxCookTimes"
                        :item-title="e => e.text"
                        :item-value="e => e.val"
                        prepend-inner-icon="mdi-filter-variant"
                    >
                    </v-select>
                </v-col> -->
                <v-col cols="7">
                    <v-text-field
                        clearable
                        v-model="input"
                        outlined
                        placeholder="Enter your ingredients separated by commas..."
                        clear-icon="mdi-close-circle"
                        @click:clear="clear"
                    >
                    <template v-slot:append
                        ><v-btn
                        style="margin-top: -3px"
                        :disabled="!input || input.length < 1"
                        @click="getRecipes"
                        small
                        color="accent"
                        >Get Recipes</v-btn
                    ></template
                    >
                    </v-text-field>
                </v-col>
            </v-row>
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
            <v-card v-if="recipe.recipe" variant="outlined" color="grey-darken-4 border-lg" class="ma-2">
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

        const mealTypes = ref([
            'main course',
            'side dish',
            'dessert',
            'appetizer',
            'salad',
            'bread',
            'breakfast',
            'soup',
            'beverage',
            'sauce',
            'marinade',
            'fingerfood',
            'snack',
            'drink'
        ])
        const selectedMealType = ref('')
        const maxCookTimes = ref([
            { text: '20 minutes', val: 20 },
            { text: '30 minutes', val: 30 },
            { text: '1 hour', val: 60 },
            { text: '2 hours', val: 120 },
            { text: '3 hours', val: 180 }
        ])
        const selectedMaxCookTime = ref(null)

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
            mealTypes,
            selectedMealType,
            maxCookTimes,
            selectedMaxCookTime,
            getRecipes,
            getRecipe,
            clear
        }
    }
}
</script>

<style lang="scss" scoped>

</style>