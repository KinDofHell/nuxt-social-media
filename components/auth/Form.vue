<script setup>
import Input from "~/components/ui/Input.vue";
import Button from "~/components/ui/Button.vue";

const data = reactive({
  username: '',
  password: '',
  loading: false
})

async function handleLogin() {
  const { login } = useAuth()

  data.loading = true
  try {
    await login({
      username: data.username,
      password: data.password
    })
  } catch (error) {
    console.log(error)
  } finally {
    data.loading = false
  }

}

const isButtonDisabled = computed(() => {
  return (!data.username || !data.password) || data.loading
})

</script>

<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>

    <div class="pt-5 space-y-6">

      <Input v-model="data.username" label="Username" placeholder="@username" />

      <Input label="Password" placeholder="********" type="password" v-model="data.password" />


      <Button @click="handleLogin" liquid :disabled="isButtonDisabled">
        Login
      </Button>

    </div>
  </div>
</template>