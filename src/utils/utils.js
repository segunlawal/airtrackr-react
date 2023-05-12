export function unixToGMT(unixTime) {
    const date = new Date(unixTime * 1000);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const gmtTimeStr = `${hours}:${minutes} GMT`;
    return gmtTimeStr;
}

export function unixToDate(unixTime) {
    const date = new Date(unixTime * 1000);
    const dateStr = date.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
    return dateStr;
}

export function filterFlights(flights) {
    // Remove null instances
    return flights?.filter(flight => {
        if (
            flight.estArrivalAirport === null ||
            flight.estDepartureAirport === null ||
            flight.callsign === null
        ) {
            return false;
        }
        return true;
    });
}

export function sortFlights(flights) {
    // Get new array from flights array
    const uniqueAirports = [
        ...new Set(
            flights
                .map(obj => obj.estArrivalAirport)
                .concat(flights.map(obj => obj.estDepartureAirport))
        )
    ];

    // Create a new array with airport information
    const airportArray = uniqueAirports.reduce((arr, airport) => {
        const arrivingFlights = flights.filter(
            obj => obj.estArrivalAirport === airport
        );
        const departingFlights = flights.filter(
            obj => obj.estDepartureAirport === airport
        );

        const lastSeenArriving = Math.max(
            ...arrivingFlights.map(obj => obj.lastSeen),
            0
        );
        const lastSeenDeparting = Math.max(
            ...departingFlights.map(obj => obj.lastSeen),
            0
        );
        const lastSeen = Math.max(lastSeenArriving, lastSeenDeparting);

        const arriving = arrivingFlights.length;
        const departing = departingFlights.length;

        if (airport !== null) {
            arr.push({
                airport,
                arriving,
                departing,
                lastSeen
            });
        }

        return arr;
    }, []);

    return airportArray;
}

export function isSameDay(displayInfo) {
    // Check if two unix times are on the same day
    const date1 = new Date(displayInfo[0] * 1000);
    const date2 = new Date(displayInfo[1] * 1000);
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}
