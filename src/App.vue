<script setup lang="ts">
import TopBar from '@/navigation/top-bar.vue'
import BotBar from '@/navigation/bot-bar.vue'
import { useVocab } from '@/composables/useVocab'

const { loadVocab } = useVocab()

loadVocab();
</script>

<template>
  <div class="bg-primary-100 min-h-screen">
    <header>
      <TopBar />
    </header>

    <main class="p-4" role="main">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <footer>
      <BotBar />
    </footer>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
