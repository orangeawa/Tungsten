import type { PluginOptions } from 'vue-toastification'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import { createWebHistory } from 'vue-router'
import { createRouter } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import Toast, { POSITION } from 'vue-toastification'
import App from './App.vue'
import { apolloClient } from './graphql/apollo'
import 'vue-toastification/dist/index.css'
import 'nprogress/nprogress.css'
import 'virtual:uno.css'
import '@/css'

NProgress.start()

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts([
    { path: '/', redirect: '/home' },
    ...routes,
  ]),
})

const pinia = createPinia()

const RootComponent = defineComponent({
  setup() {
    provide(DefaultApolloClient, apolloClient)
    return () => h(App)
  },
})

const ToastOptions: PluginOptions = {
  // position: POSITION.TOP_CENTER,
  timeout: 2000,
  transition: 'Vue-Toastification__fade',
}

createApp(RootComponent)
  .use(router)
  .use(pinia)
  .use(Toast, ToastOptions)
  .mount('#app')

NProgress.done()
