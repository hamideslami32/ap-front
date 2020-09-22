import {BaseApi} from '~/plugins/api'

export const profileApi = new class ProfileApi extends BaseApi {
    constructor() {
        super()
    }

    getOrder(orderId) {
        return this.axios.$get(`/order/${orderId}`)
    }

    getOrders() {
        return this.axios.$get('/order/')
    }

    getTransactions() {
        return this.axios.$get('/payments')
    }
}
