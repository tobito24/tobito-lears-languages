<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Button from 'primevue/button'
import Select from 'primevue/select';
import Divider from 'primevue/divider';
import Carousel from 'primevue/carousel';
import Tag from 'primevue/tag';
import Popover from 'primevue/popover';
import VocabCard from '@/components/VocabCard.vue'
import { useVocab, type VocabItem } from '@/composables/useVocab'
import { useI18n } from 'vue-i18n'

const { t } = useI18n();

const {
    allVocabs,
    activeVocabs,
    isLoading,
    error,
    filterActiveVocabs,
    shuffleActiveVocabs,
    toggleMarkedVocabItemId,
    isVocabItemIdMarked,
    resetMarkedVocabItemIds,
    markedVocabItemIdsLength,
} = useVocab();

type LangCode = 'en' | 'de' | 'es';

const languageOptions = [
    { label: t('indexCardLearning.languageOptions.en'), value: 'en' as LangCode },
    { label: t('indexCardLearning.languageOptions.de'), value: 'de' as LangCode },
    { label: t('indexCardLearning.languageOptions.es'), value: 'es' as LangCode },
];

const fromLanguage = ref<LangCode>('en');
const toLanguage = ref<LangCode>('es');
const isLanguageIconSwapped = ref(false);

const isFlipped = ref<{ [key: number]: boolean }>({});
const hasMultipleCards = computed(() => activeVocabs.value.length > 1);
const isSingleCard = computed(() => activeVocabs.value.length === 1);

const activePage = ref(0);
const currentItem = computed(() => activeVocabs.value[activePage.value] ?? null);

const popoverRef = ref();
const popoverTags = ref<string[]>([]);
const popoverLanguageLevel = ref<string>('');

function swapLanguages() {
    const from = fromLanguage.value;
    fromLanguage.value = toLanguage.value;
    toLanguage.value = from;

    isLanguageIconSwapped.value = !isLanguageIconSwapped.value;
    resetFlipCards();
}

function toggleFlipCard(id: number) {
    isFlipped.value[id] = !isFlipped.value[id]
}

function togglePopoverTags(event: Event, item: VocabItem) {
    popoverTags.value = item.tags
    popoverLanguageLevel.value = item.level
    popoverRef.value?.toggle(event)
}

function resetFlipCards() {
    isFlipped.value = activeVocabs.value.reduce((acc, item) => {
        acc[item.id] = false
        return acc
    }, {} as { [key: number]: boolean })
}

function onShuffle() {
    shuffleActiveVocabs();
    resetFlipCards();
}

function onFilter() {
    filterActiveVocabs();
    shuffleActiveVocabs();
    resetFlipCards();
}

watch(activeVocabs, (nextVocabs) => {
    if (activePage.value >= nextVocabs.length) {
        activePage.value = 0;
    }
});
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
            'w-full',
        ]">
            <div>
                <p :class="[
                    'text-md',
                    'text-surface-700'
                ]">{{ t('indexCardLearning.from') }}</p>
                <Select v-model="fromLanguage" :options="languageOptions" option-label="label" option-value="value"
                    class="sm:w-[200px] w-[125px]" />
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
                    class="sm:w-[200px] w-[125px]" />
            </div>
        </div>

        <Divider />

        <div v-if="hasMultipleCards" :class="['w-full']">
            <Carousel v-model:page="activePage" :value="activeVocabs" :numVisible="1" :numScroll="1" :circular="true"
                :showIndicators="activeVocabs.length < 20" :showNavigators="true">
                <template #item="slotProps">
                    <VocabCard :item="slotProps.data" :from-language="fromLanguage" :to-language="toLanguage"
                        :is-flipped="isFlipped[slotProps.data.id] ?? false"
                        :is-marked="isVocabItemIdMarked(currentItem?.id)" @toggle-flip="toggleFlipCard"
                        @toggle-tags="togglePopoverTags" />
                </template>
            </Carousel>
        </div>
        <div v-else-if="isSingleCard && currentItem" :class="['flex', 'justify-center']">
            <VocabCard :item="currentItem" :from-language="fromLanguage" :to-language="toLanguage"
                :is-flipped="isFlipped[currentItem.id] ?? false" :is-marked="isVocabItemIdMarked(currentItem.id)"
                @toggle-flip="toggleFlipCard" @toggle-tags="togglePopoverTags" />
        </div>
        <div v-else :class="[
            'flex',
            'flex-col',
            'items-center',
            'justify-center',
            'gap-4',
            'w-full',
            'p-4',
        ]">
            <p :class="[
                'text-lg',
                'text-surface-700',
                'text-center',
            ]" v-if="isLoading">{{ t('indexCardLearning.loadingCards') }}</p>
            <p :class="[
                'text-lg',
                'text-surface-700',
                'text-center',
            ]" v-else-if="error">{{ t('indexCardLearning.errorLoadingCards') }}: {{ error }}</p>
            <p :class="[
                'text-lg',
                'text-surface-700',
                'text-center',
            ]" v-else>{{ t('indexCardLearning.noActiveCards') }}</p>
        </div>
        <Popover ref="popoverRef">
            <div :class="['flex', 'flex-wrap', 'gap-2']">
                <Tag v-for="tag in popoverTags" :key="tag" :value="tag" rounded />
                <Tag :value="popoverLanguageLevel" severity="info" rounded />
            </div>
        </Popover>

        <Divider />

        <div :class="[
            'grid',
            'grid-cols-4',
            'items-center',
            'justify-center',
            'justify-items-center',
            'w-full',
            'gap-4',
        ]">
            <Button icon="pi pi-times" severity="danger" rounded @click="resetMarkedVocabItemIds()" />
            <Button icon="pi pi-filter" severity="secondary" rounded @click="onFilter" />
            <Button icon="pi pi-sync" severity="secondary" rounded @click="onShuffle" />
            <Button :icon="isVocabItemIdMarked(currentItem?.id) ? 'pi pi-star-fill' : 'pi pi-star'" rounded
                severity="secondary" @click="toggleMarkedVocabItemId(currentItem?.id)" />
            <p :class="[
                'text-md',
                'text-surface-950',
                'col-span-4',
                'text-center',
            ]">
                {{ t('indexCardLearning.markedCards', {
                    allCount: allVocabs.length, markedCount: markedVocabItemIdsLength
                }) }}
            </p>
        </div>
    </div>
</template>
