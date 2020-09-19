import Vue from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

// setInteractionMode('eager')

Vue.component('v-provider', ValidationProvider)
Vue.component('v-observer', ValidationObserver)


