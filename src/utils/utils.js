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
    return flights?.filter(flight => {
        if (
            flight.estArrivalAirport === null ||
            flight.estDepartureAirport === null
        ) {
            return false;
        }
        return true;
    });
}
