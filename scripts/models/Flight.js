export class Flight {
    constructor(flight) {
        Object.assign(this, flight)
    }

    get firstStop() {
        return this.stops[0]
    }

    get lastStop() {
        return this.stops[this.stops.length - 1]
    }

    get flightDuration() {
        return this.stops.reduce((carry, item) => carry + item.duration, 0)
    }

    get departureAirport() {
        return this.firstStop.departureAirport
    }

    get arrivalAirport() {
        return this.lastStop.arrivalAirport
    }

    get departureCity() {
        return this.firstStop.departureCityName
    }

    get arrivalCity() {
        return this.lastStop.arrivalCityName
    }
}
