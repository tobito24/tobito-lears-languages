<script setup lang="ts">
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import VocabCardSide from '@/components/VocabCardSide.vue'
import type { VocabItem } from '@/composables/useVocab'

type LangCode = 'en' | 'de' | 'es';

const props = defineProps<{
    item: VocabItem;
    fromLanguage: LangCode;
    toLanguage: LangCode;
    isFlipped: boolean;
    isMarked: boolean;
}>();

const emit = defineEmits<{
    (e: 'toggle-flip', id: number): void;
    (e: 'toggle-tags', event: Event, item: VocabItem): void;
}>();

function onToggleFlip() {
    emit('toggle-flip', props.item.id);
}

function onToggleTags(event: Event) {
    emit('toggle-tags', event, props.item);
}
</script>

<template>
    <Transition name="flip-card" mode="out-in">
        <div :key="isFlipped ? 'card-back' : 'card-front'" :class="[
            'border-2',
            isFlipped ? 'border-surface-300' : 'border-primary-300',
            isFlipped ? 'bg-surface-100' : 'bg-surface-50',
            isMarked ? 'ring-4 ring-primary-300' : '',
            'rounded-2xl',
            'p-4',
            'm-2',
            'w-60',
            'sm:w-full',
            'mx-auto',
        ]" @click="onToggleFlip">
            <div :class="['flex', 'items-center', 'justify-between', 'mb-3']">
                <Badge :value="item.id" />
                <div :class="['hidden', 'sm:flex', 'gap-2', 'items-center']">
                    <Tag v-for="tag in item.tags" :key="tag" :value="tag" rounded />
                    <Tag :value="item.level" severity="info" rounded />
                </div>
                <div :class="['flex', 'sm:hidden', 'items-center']">
                    <Button icon="pi pi-tags" text rounded @click.stop="onToggleTags" />
                </div>
            </div>

            <!-- fromLanguage -->
            <VocabCardSide v-if="!isFlipped" :label="fromLanguage" :translation="item.translations[fromLanguage]" />

            <!-- toLanguage -->
            <VocabCardSide v-else :label="toLanguage" :translation="item.translations[toLanguage]" />
        </div>
    </Transition>
</template>

<style scoped>
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
