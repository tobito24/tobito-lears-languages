<script setup lang="ts">
import Button from "primevue/button";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>

<template>
    <nav aria-label="Top Navigation" :class="[
        'flex',
        'flex-row',
        'justify-between',
        'items-center',
        'gap-4',
        'p-4',
        'bg-surface-200',
        'shadow-2xl',
    ]">
        <router-link to="/">
            <img src="@/img/logo.png" alt="Tobito Learns Languages Logo" :class="[
                'h-10',
                'w-10',
                'rounded-full',
                'shadow-xs',
            ]" />
        </router-link>

        <p :class="[
            'text-primary',
            'font-bold',
            'text-lg',
        ]">
            {{ t('ui.appTitle') }}
        </p>

        <Button icon="pi pi-bars" rounded aria-label="Menu" />
    </nav>
</template>