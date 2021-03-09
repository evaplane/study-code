import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'

// use(store)所以可以敲出$store
createApp(App).use(router).use(store).mount('#app')
