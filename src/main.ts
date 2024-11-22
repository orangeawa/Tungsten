import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp } from 'vue'
import App from './App.vue'
import { apolloClient } from './graphql/apollo'
import 'virtual:uno.css'

const RootComponent = defineComponent({
  setup() {
    provide(DefaultApolloClient, apolloClient)
    return () => h(App)
  },
})

createApp(RootComponent).mount('#app')
