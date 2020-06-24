import Vue from 'vue'

class Auth {
    constructor(axios, storage) {
        this.axios = axios
        this.storage = storage

        this.user = Vue.observable({});
    }

    login(username, password) {
        'login'
    }

    logout() {
        'logout'
    }

    fetchUser() {
        'self'
    }

}

export default function (ctx, inject) {
    inject('auth', {
        
    })
}