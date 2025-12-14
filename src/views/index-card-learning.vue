<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import Button from 'primevue/button'
import Select from 'primevue/select';
import Divider from 'primevue/divider';
import Carousel from 'primevue/carousel';
import Badge from 'primevue/badge';
import Tag from 'primevue/tag';
import VocabCardSide from '@/components/VocabCardSide.vue'
import { useVocab, type VocabItem } from '@/composables/useVocab'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { vocab, isLoading, error } = useVocab()

type LangCode = 'en' | 'de' | 'es';

const languageOptions = [
    { label: t('indexCardLearning.languageOptions.en'), value: 'en' as LangCode },
    { label: t('indexCardLearning.languageOptions.de'), value: 'de' as LangCode },
    { label: t('indexCardLearning.languageOptions.es'), value: 'es' as LangCode },
];

const fromLanguage = ref<LangCode>('en');
const toLanguage = ref<LangCode>('es');
const isLanguageIconSwapped = ref(false)


const shuffledVocab = ref<VocabItem[]>([])
const isFlipped = ref<boolean[]>([])

const hasCards = computed(() => !isLoading.value && !error.value && shuffledVocab.value.length > 0)

watch(vocab, (newVocab) => {
    shuffledVocab.value = shuffle(newVocab)
    isFlipped.value = Array(newVocab.length).fill(false)
}, { immediate: true })

function shuffle(list: VocabItem[]): VocabItem[] {
    const arr = [...list]
    for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[arr[i]!, arr[j]!] = [arr[j]!, arr[i]!]
    }
    return arr
}

function swapLanguages() {
    const from = fromLanguage.value
    fromLanguage.value = toLanguage.value
    toLanguage.value = from
    isFlipped.value = Array(vocab.value.length).fill(false)
    isLanguageIconSwapped.value = !isLanguageIconSwapped.value
}

function toggleFlip(id: number) {
    if (!hasCards.value) return
    isFlipped.value[id] = !isFlipped.value[id]
}
</script>

<template>
    <div :class="[
        'flex',
        'flex-col',
        'gap-4',
        'items-center',
    ]">
        <div :class="[
            'flex',
            'items-center',
            'justify-center',
            'gap-4',
            'w-full'
        ]">
            <div>
                <p :class="[
                    'text-md',
                    'text-surface-700'
                ]">{{ t('indexCardLearning.from') }}</p>
                <Select v-model="fromLanguage" :options="languageOptions" option-label="label" option-value="value"
                    class="w-[200px]" />
            </div>
            <div :class="[
                'transition-transform', 'duration-300', isLanguageIconSwapped ? 'rotate-180' : 'rotate-0', 'self-end'
            ]">
                <Button icon="pi pi-arrow-right-arrow-left" severity="secondary" rounded @click="swapLanguages" />
            </div>
            <div>
                <p :class="[
                    'text-md',
                    'text-surface-700'
                ]">{{ t('indexCardLearning.to') }}</p>
                <Select v-model="toLanguage" :options="languageOptions" option-label="label" option-value="value"
                    class="w-[200px]" />
            </div>
        </div>
        <Divider />
        <div v-if="hasCards" :class="['w-full']">
            <Carousel :value="shuffledVocab" :numVisible="1" :numScroll="1" :circular="true" :showIndicators="true"
                :showNavigators="true">
                <template #item="slotProps">
                    <Transition name="flip-card" mode="out-in">
                        <div :key="isFlipped[slotProps.data.id] ? 'card-back' : 'card-front'" :class="[
                            'border-2',
                            isFlipped[slotProps.data.id] ? 'border-surface-300' : 'border-primary-300',
                            isFlipped[slotProps.data.id] ? 'bg-surface-100' : 'bg-surface-50',
                            'rounded-2xl',
                            'p-4',
                            'm-2',
                        ]" @click="toggleFlip(slotProps.data.id)">
                            <div :class="['flex', 'items-center', 'justify-between', 'mb-3']">
                                <Badge :value="slotProps.data.id" />
                                <div :class="['flex', 'gap-2', 'items-center']">
                                    <Tag v-for="tag in slotProps.data.tags" :key="tag" :value="tag" rounded />
                                    <Tag :value="slotProps.data.level" severity="info" rounded />
                                </div>
                            </div>

                            <!-- fromLanguage -->
                            <VocabCardSide v-if="!isFlipped[slotProps.data.id]" :label="fromLanguage"
                                :translation="slotProps.data.translations[fromLanguage]" />

                            <!-- toLanguage -->
                            <VocabCardSide v-else :label="toLanguage"
                                :translation="slotProps.data.translations[toLanguage]" />
                        </div>
                    </Transition>
                </template>
            </Carousel>
        </div>
        <Divider />
        <div :class="[
            'flex',
            'items-center',
            'justify-center',
            'w-full',
            'gap-4',
        ]">
            <p v-if="!isLoading" :class="[
                'text-md',
                'text-surface-950'
            ]">
                {{ t('indexCardLearning.activeCards', { count: vocab.length }) }}
            </p>
            <div v-else-if="isLoading && !error" :class="[
                'text-md',
                'text-surface-950'
            ]">
                {{ t('home.loadingVocab') }}
            </div>
            <div v-else-if="error" :class="[
                'text-md',
                'text-danger-600',
            ]">
                {{ t('home.errorLoadingVocab', { msg: error }) }}
            </div>
            <Button v-if="hasCards" :label="t('indexCardLearning.shuffleCards')" icon="pi pi-refresh" severity="info"
                rounded @click="shuffledVocab = shuffle(vocab)" />
        </div>
    </div>
</template>

<style>
.flip-card-enter-active,
.flip-card-leave-active {
    transition: transform 300ms ease, opacity 300ms ease;
    transform-style: preserve-3d;
}

.flip-card-enter-from {
    opacity: 0.1;
    transform: rotateY(90deg);
}

.flip-card-leave-to {
    opacity: 0.1;
    transform: rotateY(-90deg);
}
</style>
