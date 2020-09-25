import {BaseApi} from '~/plugins/api'
import { Flight } from '~/scripts/models/Flight'

export const profileApi = new class ProfileApi extends BaseApi {
    constructor() {
        super()
    }

    getOrder(orderId) {
        return this.axios.$get(`/order/${orderId}`)
    }

    getOrders() {
        return this.axios.$get('/order/')
            .then(result => {
                result.forEach(item => {
                    item.orderItems.forEach(order => {
                        order.flights = order.flights.map(flight =>  new Flight(flight))
                    })
                })
                return result
            })
    }

    getTransactions() {
        return this.axios.$get('/payments')
    }
}
