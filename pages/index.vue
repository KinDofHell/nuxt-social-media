<script setup>
import MainSection from "~/components/MainSection.vue";

const loading = ref(false);
</script>

<template>
  <div>
    <MainSection title="Home" :loading="loading">
      Content
    </MainSection>
  </div>
</template>