import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './translation/main'
import { router } from './router'
import '@/assets/main.css'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { updatePrimaryPalette, palette } from '@primeuix/themes'
import type { PaletteDesignToken } from '@primeuix/themes/types'
import { useSettings } from '@/composables/useSettings'

const { primaryColor, currentLanguage } = useSettings();

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

updatePrimaryPalette(palette(primaryColor.value) as PaletteDesignToken );

app.mount('#app')
