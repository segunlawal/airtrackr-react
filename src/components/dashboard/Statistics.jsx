import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

const Statistics = () => {
    const [hourFlights, setHourFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentDate = Date.now() / 1000;
    const begin = Math.floor(currentDate - 3600);
    const end = Math.floor(currentDate + 3600);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`
            );
            const data = await response.json();
            setHourFlights(data);
            setLoading(false);
        };

        fetchData();
    }, [begin, end]);

    if (loading)
        return <p className="sm:pl-60 pl-5 text-custom-black">Loading...</p>;

    return (
        <div className="sm:pl-60 pl-5 py-3 flex flex-col text-left font-semibold text-custom-blue">
            <p className="text-2xl">STATISTICS</p>
            <p>
                This page displays number of flights arriving one hour before
                and after now
            </p>
            <p className="text-4xl">{hourFlights?.length}</p>
        </div>
    );
};

export default Statistics;
