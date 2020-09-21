export class Flight {
    constructor(flight) {
        Object.assign(this, flight)
    }

    get flightDuration() {
        return this.stops.reduce((carry, item) => carry + item.duration, 0)
    }

    get departureAirport() {
        return this.stops[0].departureAirport
    }

    get arrivalAirport() {
        return this.stops[this.stops.length - 1].arrivalAirport
    }
}