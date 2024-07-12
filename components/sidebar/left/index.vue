<script setup>
import {computed, defineProps} from 'vue';
import useTailwindConfig from '~/composables/useTailwindConfig.js';
import {
  BellIcon,
  BookmarkIcon,
  DocumentTextIcon, DotsCircleHorizontalIcon,
  HashtagIcon,
  HomeIcon,
  InboxIcon,
  UserIcon
} from "@heroicons/vue/solid";


const {defaultTransition} = useTailwindConfig();
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const textClasses = computed(() => props.active ? '' : 'font-semibold');

const tabs = [
  {name: 'Home', icon: HomeIcon, active: true},
  {name: 'Explore', icon: HashtagIcon, active: false},
  {name: 'Notifications', icon: BellIcon, active: false},
  {name: 'Messages', icon: InboxIcon, active: false},
  {name: 'Bookmarks', icon: BookmarkIcon, active: false},
  {name: 'Lists', icon: DocumentTextIcon, active: false},
  {name: 'Profile', icon: UserIcon, active: false},
  {name: 'More', icon: DotsCircleHorizontalIcon, active: false}
];
</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="p-2 my-2 hover:bg-blue-50 rounded-full w-min dark:hover:bg-white/20" :class="defaultTransition">
      <NuxtLink to="/">
        <div class="w-8 h-8">
          <LogoTwitter/>
        </div>
      </NuxtLink>
    </div>
    <SidebarLeftTab
        v-for="(tab, index) in tabs"
        :key="index"
        :active="tab.active"
    >
      <template v-slot:icon>
        <component :is="tab.icon"/>
      </template>
      <template v-slot:name>
        {{ tab.name }}
      </template>
    </SidebarLeftTab>
  </div>
</template>

