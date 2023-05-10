import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { sortFlights, unixToGMT } from "../../utils/utils";

const Statistics = () => {
    const [airportInfo, setairportInfo] = useState([]);
    // const [loading, setLoading] = useState(true);
    const currentDate = Date.now() / 1000;
    const begin = Math.floor(currentDate - 3600);
    const end = Math.floor(currentDate + 3600);

    const getFlightsForAirports = async () => {
        const res = await fetch(
            `https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`
        );
        return res.json();
    };
    const { data, isLoading, error } = useQuery(
        "flightsForAirports",
        getFlightsForAirports
    );

    useEffect(() => {
        if (data) {
            const sortedData = sortFlights(data);
            setairportInfo(sortedData);
        }
    }, [data, setairportInfo]);
    console.log(airportInfo);

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    const filteredArray = airportInfo?.filter(obj => obj.airport !== null);
    const filteredFlights = filteredArray?.map((airport, index) => {
        return (
            <div
                key={`${airport.airport}-${index}`}
                className="bg-white border-b-4 border-double p-5 grid grid-cols-4 gap-6 md:gap-16 lg:gap-36 xl:gap-56 rounded-lg"
            >
                <p>{airport.airport}</p>
                <p className="text-center">{unixToGMT(airport.lastSeen)}</p>
                <p className="text-center">{airport.arriving}</p>
                <p className="text-center">{airport.departing}</p>
            </div>
        );
    });

    if (isLoading)
        return <p className="sm:pl-60 pl-5 text-custom-black">Loading...</p>;

    return (
        <div className="sm:pl-60 pl-5 py-3 flex flex-col text-left font-semibold text-custom-blue">
            <ToastContainer />
            <p className="text-2xl">STATISTICS</p>
            <p className="text-4xl">{filteredFlights?.length}</p>

            <div className="bg-white border-b-4 border-double p-5 grid grid-cols-4 gap-6 md:gap-16 lg:gap-36 xl:gap-56 rounded-lg">
                <p className="font-bold">AIRPORT</p>
                <div>
                    <p className="font-bold text-center">TIME</p>
                    <small className="text-xs">(last flight seen)</small>
                </div>
                <p className="font-bold text-center">ARRIVING</p>
                <p className="font-bold text-center">DEPARTING</p>
            </div>
            {filteredFlights}
        </div>
    );
};

export default Statistics;
