<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue';
import Tag from 'primevue/tag'
import type { VocabTranslation } from '@/composables/useVocab'

const { t } = useI18n()

const props = defineProps<{
  label: string
  translation: VocabTranslation
}>()

const text = computed(() => props.translation.text ?? '');
const phonetic = computed(() => props.translation.phonetic ?? '');
const synonyms = computed(() => props.translation.synonyms ?? []);
const examples = computed(() => props.translation.examples ?? []);
const hasSynonyms = computed(() => synonyms.value.length > 0 && synonyms.value.some(syn => syn.trim() !== ''));
const hasExamples = computed(() => examples.value.length > 0 && examples.value.some(ex => ex.trim() !== ''));
</script>

<template>
  <div
    :class="['grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-2', 'p-4', 'text-left', 'max-w-full', 'whitespace-normal', 'wrap-break-word']">
    <p :class="['text-sm', 'font-semibold', 'md:col-span-2', 'uppercase', 'text-surface-500']">
      {{ props.label }}
    </p>
    <p :class="['text-xl', 'md:text-4xl', 'font-bold', 'md:col-span-2', 'md:text-center', 'text-surface-950']">
      {{ text }}
    </p>
    <p v-if="phonetic" :class="['text-sm', 'md:text-xl', 'md:col-span-2', 'md:text-center', 'text-surface-500']">
      /{{ phonetic }}/
    </p>
    <div v-if="hasSynonyms" :class="['mt-2']">
      <p :class="['text-sm', 'font-semibold', 'text-surface-950']">
        {{ t('components.vocabCard.synonymsLabel') }}
      </p>
      <div :class="['flex', 'flex-wrap', 'gap-2']">
        <Tag v-for="syn in synonyms" :key="syn" :value="syn" rounded :style="syn.length == 0 ? 'display: none;' : ''" />
      </div>
    </div>
    <div v-if="hasExamples" :class="['mt-2']">
      <p :class="['text-sm', 'font-semibold', 'text-surface-950']">
        {{ t('components.vocabCard.examplesLabel') }}
      </p>
      <ul :class="['list-disc', 'list-inside', 'text-sm', 'text-surface-950']">
        <li v-for="ex in examples" :key="ex" :style="ex.length == 0 ? 'display: none;' : ''">
          {{ ex }}
        </li>
      </ul>
    </div>
  </div>
</template>
