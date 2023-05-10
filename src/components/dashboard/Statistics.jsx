import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import {
    filterFlights,
    isSameDay,
    sortFlights,
    unixToDate,
    unixToGMT
} from "../../utils/utils";
import ReactPaginate from "react-paginate";

const Statistics = () => {
    const [airportInfo, setairportInfo] = useState([]);

    const currentDate = Date.now() / 1000;
    const begin = Math.floor(currentDate - 3600);
    const end = Math.floor(currentDate + 3600);
    const [rangeInfo, setRangeInfo] = useState([begin, end]);

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

    // Pagination
    const [pageNumber, setPageNumber] = useState(0);
    const flightsPerPage = 10;
    const pagesVisited = pageNumber * flightsPerPage;
    const pageCount = airportInfo
        ? Math.ceil(filterFlights(airportInfo)?.length / flightsPerPage)
        : 0;
    const handlePageChange = ({ selected }) => setPageNumber(selected);

    const time1 = unixToGMT(rangeInfo[0]);
    const time2 = unixToGMT(rangeInfo[1]);
    const date1 = unixToDate(rangeInfo[0]);
    const date2 = unixToDate(rangeInfo[1]);

    const filteredFlights = airportInfo
        ?.slice(pagesVisited, pagesVisited + flightsPerPage)
        .map((airport, index) => {
            return (
                <div
                    key={`${airport.airport}-${index}`}
                    className="bg-white font-normal border-b-4 border-double p-5 grid grid-cols-4 gap-6 md:gap-16 lg:gap-36 xl:gap-56 rounded-lg"
                >
                    <p className="font-semibold">{airport.airport}</p>
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
            <div className="py-2">
                {isSameDay(rangeInfo) ? (
                    <small>
                        This is airport information about flights between{" "}
                        <span className="text-custom-blue font-semibold">
                            {time1}{" "}
                        </span>{" "}
                        and{" "}
                        <span className="text-custom-blue font-semibold">
                            {time2}{" "}
                        </span>
                        on{" "}
                        <span className="text-custom-blue font-semibold">
                            {date1}
                        </span>
                    </small>
                ) : (
                    <small>
                        This is airport information about flights between{" "}
                        <span className="text-custom-blue font-semibold">
                            {time1} {date1}
                        </span>{" "}
                        and{" "}
                        <span className="text-custom-blue font-semibold">
                            {time2} {date2}
                        </span>
                    </small>
                )}
            </div>

            <div className="bg-white sticky top-0  border-b-4 border-double p-5 grid grid-cols-4 gap-6 md:gap-16 lg:gap-36 xl:gap-56 rounded-lg">
                <div>
                    <p className="font-bold">AIRPORT</p>
                    <p className="">({airportInfo?.length})</p>
                </div>
                <div>
                    <p className="font-bold text-center">TIME</p>
                    <small className="text-xs">(last flight seen)</small>
                </div>
                <p className="font-bold text-center">ARRIVING</p>
                <p className="font-bold text-center">DEPARTING</p>
            </div>
            <div className="">
                {filteredFlights}
                <ReactPaginate
                    previousLabel="<"
                    nextLabel=">"
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    containerClassName="mt-10 flex gap-x-2 items-center"
                    previousLinkClassName="rounded-md border-custom-blue border-[1px] text-2xl px-2"
                    nextLinkClassName="rounded-md border-custom-blue border-[1px] text-2xl px-2"
                    pageLinkClassName="text-lg px-2"
                    disabledClassName=""
                    activeClassName="border-[3px]"
                    pageClassName=" rounded-sm border-[1px] border-custom-blue"
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                />
                {airportInfo?.length === 0 && (
                    <p className="text-center">No flights available</p>
                )}
            </div>
        </div>
    );
};

export default Statistics;
