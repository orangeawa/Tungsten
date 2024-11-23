import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import { apolloClient } from './graphql/apollo'
import 'virtual:uno.css'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const RootComponent = defineComponent({
  setup() {
    provide(DefaultApolloClient, apolloClient)
    return () => h(App)
  },
})

createApp(RootComponent).use(router).mount('#app')
