<script setup>
import LeftSidebar from "~/components/sidebar/left/index.vue";

const darkMode = ref(true);
const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth()
const user = useAuthUser()

const isAuthLoading = useAuthLoading()

onBeforeMount(() => {
  initAuth()
})
</script>

<template>
  <div :class="{'dark': darkMode}">
    <div class="bg-white dark:bg-dim-900">
      <LoadingPage v-if="isAuthLoading" />
      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <LeftSidebar/>
            </div>
          </div>
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <RouterView />
          </main>
          <div class="col-span-12 md:block xs-col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>
      <AuthPage v-else />
    </div>
  </div>
</template>
