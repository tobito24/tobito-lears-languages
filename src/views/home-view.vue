<script setup lang="ts">
import Divider from 'primevue/divider';
import { useVocab } from '@/composables/useVocab'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { vocab, isLoading, error } = useVocab()
</script>

<template>
    <div :class="[
        'flex',
        'flex-col',
        'gap-4',
    ]">
        <p :class="[
            'text-2xl',
            'font-bold',
            'text-surface-950',
            'text-center'
        ]">
            {{ t('home.welcomeMessage') }}
        </p>
        <p :class="[
            'text-lg',
            'text-surface-950',
            'text-center'
        ]">
            {{ t('home.getStartedMessage') }}
        </p>
        <Divider />
        <p v-if="!isLoading" :class="[
            'text-md',
            'text-surface-950'
        ]">
            {{ t('home.currentVocabCount', { count: vocab.length }) }}
        </p>
        <div v-else-if="isLoading && !error" :class="[
            'text-md',
            'text-surface-950'
        ]">
            {{ t('home.loadingVocab') }}
        </div>
        <div v-else-if="error" :class="[
            'text-md',
            'text-surface-950'
        ]">
            {{ t('home.errorLoadingVocab', { msg: error }) }}
        </div>
        <div v-if="!isLoading">
            <div :class="[
                'grid',
                'grid-cols-3',
                'gap-2',
            ]">
                <div v-for="item in vocab" :key="item.id" :class="[
                    'border',
                    'border-surface-300',
                    'rounded-xl',
                    'p-2',
                    'bg-surface-100',
                    'hover:bg-surface-200',
                    'hover:shadow-md',
                    'hover:border-primary-400',
                ]">
                    <div :class="[
                        'font-semibold',
                        'text-surface-900',
                    ]">
                        {{ item.translations['en'].text }}
                    </div>
                    <div :class="[
                        'text-surface-700',
                    ]">
                        {{ item.translations['de'].text }}
                    </div>
                    <div :class="[
                        'text-surface-700',
                        'italic',
                    ]">
                        {{ item.translations['es'].text }}
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
