<script setup>
import LeftSidebar from "~/components/sidebar/left/index.vue";

const darkMode = ref(true);
</script>

<template>
  <div :class="{'dark': darkMode}">
    <div class="bg-white dark:bg-dim-900">
      <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
        <div class="hidden md:block xs-col-span-1 xl:col-span-2">
          <div class="sticky top-0">
            <LeftSidebar/>
          </div>
        </div>
        <main class="col-span-12 bg-red-500 md:col-span-8 xl:col-span-6">
          <h1>asd</h1>
        </main>
        <div class="col-span-12 md:block xs-col-span-4 md:col-span-3">
          <div class="sticky top-0">
            <SidebarRight />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
