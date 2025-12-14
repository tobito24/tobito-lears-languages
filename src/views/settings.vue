<script setup lang="ts">
import { ref } from 'vue';
import Button from "primevue/button";
import ColorPicker from 'primevue/colorpicker';
import { useI18n } from 'vue-i18n'
import { DefaultValues } from '@/enums/default-values'
import { useSettings } from '@/composables/useSettings';


const { t } = useI18n()

const { primaryColor, currentLanguage, setLanguage, setPrimaryColor } = useSettings();

const color = ref<string>(primaryColor.value || DefaultValues.PRIMARY_COLOR);

function languageSwitch() {
    const newLocale = currentLanguage.value === 'en' ? 'de' : 'en';
    setLanguage(newLocale);
}
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
        ]">
            {{ t('settings.title') }}
        </p>
        <Button :label="t('settings.test')" @click="languageSwitch" />
        <div :class="[
            'flex',
            'gap-4',
            'items-center',
        ]">
            <p :class="[
                'text-md',
                'text-surface-800'
            ]">{{ t('settings.colorPicker') }}</p>
            <ColorPicker v-model="color" inputId="cp-hex" format="hex" @change="setPrimaryColor(color)" />
            <i class="pi pi-angle-right" />
            <p :class="[
                'text-md',
                'text-surface-800'
            ]">{{ color }}</p>
        </div>
    </div>
</template>
