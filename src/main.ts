import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import { createWebHistory } from 'vue-router'
import { createRouter } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

import { apolloClient } from './graphql/apollo'
import 'virtual:uno.css'

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts([
    { path: '/', redirect: '/Home' },
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

createApp(RootComponent).use(router).use(pinia).mount('#app')
