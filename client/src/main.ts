import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { authentication } from './plugins/authentication'
import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

app.use(createPinia())

authentication.install().then(()=>{
    app.use(router)
    app.mount('#app') 
  })