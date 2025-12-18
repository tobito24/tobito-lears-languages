<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import Button from 'primevue/button'
import Select from 'primevue/select';
import Divider from 'primevue/divider';
import Carousel from 'primevue/carousel';
import Badge from 'primevue/badge';
import Tag from 'primevue/tag';
import Popover from 'primevue/popover';
import VocabCardSide from '@/components/VocabCardSide.vue'
import { useSettings } from '@/composables/useSettings';
import { useVocab, type VocabItem } from '@/composables/useVocab'
import { useI18n } from 'vue-i18n'

const { t } = useI18n();

const { vocab, isLoading, error } = useVocab();
const { toggleMarkedVocabItemId, isVocabItemIdMarked, resetMarkedVocabItemIds, markedVocabItemIds } = useSettings();

type LangCode = 'en' | 'de' | 'es';

const languageOptions = [
    { label: t('indexCardLearning.languageOptions.en'), value: 'en' as LangCode },
    { label: t('indexCardLearning.languageOptions.de'), value: 'de' as LangCode },
    { label: t('indexCardLearning.languageOptions.es'), value: 'es' as LangCode },
];

const fromLanguage = ref<LangCode>('en');
const toLanguage = ref<LangCode>('es');
const isLanguageIconSwapped = ref(false);

const activeVocabs = ref<VocabItem[]>([]);
const isFlipped = ref<{ [key: number]: boolean }>({});
const hasCards = computed(() => !isLoading.value && !error.value && activeVocabs.value.length > 0);

const activePage = ref(0);
const currentItem = computed(() => activeVocabs.value[activePage.value] ?? null);

const popoverRef = ref();
const popoverTags = ref<string[]>([]);
const popoverLanguageLevel = ref<string>('');

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

function toggleFlipCard(id: number) {
    if (!hasCards.value) return
    isFlipped.value[id] = !isFlipped.value[id]
}

function togglePopoverTags(event: Event, item: VocabItem) {
    popoverTags.value = item.tags
    popoverLanguageLevel.value = item.level
    popoverRef.value?.toggle(event)
}

function onShuffle() {
    activeVocabs.value = shuffle(vocab.value)
    isFlipped.value = activeVocabs.value.reduce((acc, item) => {
        acc[item.id] = false
        return acc
    }, {} as { [key: number]: boolean })
}

// TODO: Filter for tags, levels and marked status
function onFilter() {
    const filtered = vocab.value.filter(item => isVocabItemIdMarked(item.id))
    console.log(filtered.length);

    activeVocabs.value = shuffle(filtered)
    isFlipped.value = activeVocabs.value.reduce((acc, item) => {
        acc[item.id] = false
        return acc
    }, {} as { [key: number]: boolean })
    activePage.value = 0
}

watch(vocab, () => {
    onShuffle()
}, { immediate: true })
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
        <div v-if="hasCards" :class="['w-full']">
            <Carousel v-model:page="activePage" :value="activeVocabs" :numVisible="1" :numScroll="1" :circular="true"
                :showIndicators="activeVocabs.length < 20" :showNavigators="true">
                <template #item="slotProps">
                    <Transition name="flip-card" mode="out-in">
                        <div :key="isFlipped[slotProps.data.id] ? 'card-back' : 'card-front'" :class="[
                            'border-2',
                            isFlipped[slotProps.data.id] ? 'border-surface-300' : 'border-primary-300',
                            isFlipped[slotProps.data.id] ? 'bg-surface-100' : 'bg-surface-50',
                            isVocabItemIdMarked(currentItem?.id) ? 'ring-4 ring-primary-300' : '',
                            'rounded-2xl',
                            'p-4',
                            'm-2',
                            'w-60',
                            'sm:w-full',
                            'mx-auto',
                        ]" @click="toggleFlipCard(slotProps.data.id)">
                            <div :class="['flex', 'items-center', 'justify-between', 'mb-3']">
                                <Badge :value="slotProps.data.id" />
                                <div :class="['hidden', 'sm:flex', 'gap-2', 'items-center']">
                                    <Tag v-for="tag in slotProps.data.tags" :key="tag" :value="tag" rounded />
                                    <Tag :value="slotProps.data.level" severity="info" rounded />
                                </div>
                                <div :class="['flex', 'sm:hidden', 'items-center']">
                                    <Button icon="pi pi-tags" text rounded
                                        @click.stop="togglePopoverTags($event, slotProps.data)" />
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
            <Popover ref="popoverRef">
                <div :class="['flex', 'flex-wrap', 'gap-2']">
                    <Tag v-for="tag in popoverTags" :key="tag" :value="tag" rounded />
                    <Tag :value="popoverLanguageLevel" severity="info" rounded />
                </div>
            </Popover>
        </div>
        <Divider />
        <div v-if="hasCards" :class="[
            'grid',
            'grid-cols-2',
            'items-center',
            'justify-center',
            'w-full',
            'gap-4',
        ]">
            <Button :label="t('indexCardLearning.shuffleCards')" icon="pi pi-refresh" severity="secondary" rounded
                @click="onShuffle" />
            <Button
                :label="isVocabItemIdMarked(currentItem?.id) ? t('indexCardLearning.unmarkCard') : t('indexCardLearning.markCard')"
                :icon="isVocabItemIdMarked(currentItem?.id) ? 'pi pi-star-fill' : 'pi pi-star'" rounded
                severity="secondary" @click="toggleMarkedVocabItemId(currentItem?.id)" />

            <p :class="[
                'text-md',
                'text-surface-950',
                'col-span-2',
                'text-center',
            ]">
                {{
                    t('indexCardLearning.markedCards', { allCount: vocab.length, markedCount: markedVocabItemIds.length })
                }}
            </p>
            <div>

            </div>
            <Button :label="t('indexCardLearning.filterCards')" icon="pi pi-filter" severity="secondary" rounded
                @click="onFilter" />
            <Button :label="t('indexCardLearning.resetMarked')" icon="pi pi-times" severity="danger" rounded
                @click="resetMarkedVocabItemIds()" class="col-span-2" />
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
