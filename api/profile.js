import {BaseApi} from '~/plugins/api'
import { Flight } from '~/scripts/models/Flight'

export const profileApi = new class ProfileApi extends BaseApi {
    constructor() {
        super()
    }

    getOrder(orderId) {
        return this.axios.$get(`/order/${orderId}`)
    }

    getOrderStatus(orderId) {
        return this.axios.$get(`/order/${orderId}/status`)
    }

    getOrders() {
        return this.axios.$get('/order/')
            .then(result => {
                result.items.forEach(item => {
                    item.orderItems.forEach(order => {
                        order.flights = order.flights.map(flight =>  new Flight(flight))
                    })
                })
                return result
            })
    }

    getPayments() {
        return this.axios.$get('/payments', {
            params: {
                limit: 20,
                offset: 0
            }
        })
    }
}
