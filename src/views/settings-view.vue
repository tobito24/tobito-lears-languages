<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import ColorPicker from 'primevue/colorpicker';
import Select from 'primevue/select';
import Divider from 'primevue/divider';
import { useI18n } from 'vue-i18n';
import { DefaultValues } from '@/enums/default-values';
import { useSettings } from '@/composables/useSettings';
import { supportedLocales, fallbackLocale, type AppLocale } from '@/translation/locales';

const { t } = useI18n();

const { primaryColor, currentLanguage, setLanguage, setPrimaryColor } = useSettings();

const color = ref<string>(primaryColor.value || DefaultValues.PRIMARY_COLOR);

const languageOptions = computed(() =>
  supportedLocales.map((lang) => ({
    label: t(`settings.languageOptions.${lang}`),
    value: lang as AppLocale,
  }))
);

const selectedLanguage = ref<AppLocale>((currentLanguage.value ?? fallbackLocale) as AppLocale);

watch(selectedLanguage, (newLocale) => {
  setLanguage(newLocale);
});
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
        <Divider />
        <div :class="[
            'grid',
            'grid-cols-2',
            'w-fit',
            'gap-4',
            'items-center',
        ]">
            <div :class="[
                'flex',
                'items-center',
                'gap-4',
                'p-2',
                'text-md',
                'text-surface-800'
            ]">
                <i class="pi pi-globe" />
                <p>{{ t('settings.languageLabel') }}</p>
            </div>
            <Select v-model="selectedLanguage" :options="languageOptions" option-label="label" option-value="value"
                class="sm:w-[200px] w-[150px]" />


            <div :class="[
                'flex',
                'items-center',
                'gap-4',
                'p-2',
                'text-md',
                'text-surface-800'
            ]">
                <i class="pi pi-palette" />
                <p>{{ t('settings.colorPicker') }}</p>
            </div>
            <div :class="[
                'flex',
                'items-center',
                'gap-4',
            ]">
                <ColorPicker v-model="color" inputId="cp-hex" format="hex" @change="setPrimaryColor(color)" />
                <i class="pi pi-angle-right" />
                <p :class="[
                    'text-md',
                    'text-surface-800'
                ]">{{ color }}</p>
            </div>

        </div>
    </div>
</template>
