import Vue from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

// setInteractionMode('eager')

Vue.component('v-provider', {
    extends: ValidationProvider,
    provide() {
        return {
            errors: this.errors
        }
    }
})

Vue.component('v-observer', ValidationObserver)


