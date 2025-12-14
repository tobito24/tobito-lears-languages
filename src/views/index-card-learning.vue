<script setup lang="ts">
import Button from "primevue/button";
import { useVocab } from '@/composables/useVocab'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { vocab, isLoading, error } = useVocab()

const fromLanguage = 'en'
const toLanguage = 'de'
</script>

<template>
    <div :class="[
        'flex',
        'flex-col',
        'gap-4',
    ]">
        <br>
        {{ fromLanguage }} {{ t('ui.arrow') }} {{ toLanguage }}
        <br>
        <div>{{ t('ui.vocabCount', { count: vocab.length }) }}</div>
        <br>
        <div v-if="isLoading">{{ t('ui.loading') }}</div>
        <div v-else-if="error">{{ t('ui.error', { msg: error }) }}</div>
        <ul v-else>
            <li v-for="item in vocab" :key="item.id">
                {{ item.translations[fromLanguage].text }} — {{ item.translations[toLanguage].text }}
            </li>
        </ul>
    </div>
</template>