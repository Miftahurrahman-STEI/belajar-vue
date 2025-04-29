import './assets/main.css'
import { createApp } from 'vue'

import CompositionComponent from './components/CompositionComponent.vue'
import OptionsComponent from './components/OptionsComponent.vue'
import FoodItem from './components/PropsComponent.vue'

import App from './App.vue'

const app = createApp(App)

app.component('CompositionComponent', CompositionComponent)
app.component('OptionsComponent', OptionsComponent)
app.component('food-item', FoodItem)

app.mount('#app')