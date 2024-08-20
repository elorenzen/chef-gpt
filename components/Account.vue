<script setup>
const supabase = useSupabaseClient()

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_path = ref('')

loading.value = true
const user = useSupabaseUser()

const { data } = await supabase
  .from('profiles')
  .select(`username, website, avatar_url`)
  .eq('id', user.value.id)
  .single()

if (data) {
  username.value = data.username
  website.value = data.website
  avatar_path.value = data.avatar_url
}

loading.value = false

async function updateProfile() {
  try {
    loading.value = true
    const user = useSupabaseUser()

    const updates = {
      id: user.value.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_path.value,
      updated_at: new Date(),
    }
    console.log('updates: ', updates)

    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <Avatar v-model:path="avatar_path" @upload="updateProfile" />
    <div class="m-2">
        <label class="button primary block" for="email">Email</label>
        <UInput id="email" class="inputField" type="email" placeholder="Email" :value="user.email" />
    </div>
    <div class="m-2">
        <label class="button primary block" for="username">Username</label>
        <UInput id="username" class="inputField" placeholder="Username" :value="user.username" />
    </div>

    <div class="flex justify-end px-2">
        <div class="m-2"><UButton @click="updateProfile">{{ loading ? 'Loading ...' : 'Update Profile' }}</UButton></div>
        <div class="m-2"><UButton color="indigo" @click="signOut">Sign Out</UButton></div>
    </div>
  </form>
</template>