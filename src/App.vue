<script setup lang="ts">
import { onMounted } from 'vue'
import { useVocab } from '@/composables/useVocab'

const { vocab, isLoading, error, loadVocab } = useVocab()

onMounted(() => loadVocab())
</script>

<template>
  <div class="p-4 space-y-4 max-w-md mx-auto">

    <p v-if="isLoading" class="text-slate-500 text-sm">Loading vocab…</p>

    <p v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </p>

    <ul v-if="vocab.length" class="space-y-3">
      <li v-for="item in vocab" :key="item.word" class="p-4 rounded-xl bg-white shadow-sm border border-slate-200
               flex items-center justify-between hover:shadow-md transition-shadow">
        <div>
          <p class="text-lg font-semibold text-slate-800">
            {{ item.word }}
          </p>
          <p class="text-slate-500 text-sm">
            {{ item.translation }}
          </p>
        </div>

        <span class="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600 font-medium">
          {{ item.language }}
        </span>
      </li>
    </ul>

  </div>
</template>

<style scoped></style>
