import { useState, useEffect } from "react";
import { unixToDate, unixToGMT, filterFlights } from "../../../utils/utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-query";
import SearchTimeRange from "../flights/SearchTimeRange/SearchTimeRange";
import ReactPaginate from "react-paginate";
import Header from "../flights/Header";
import FlightsInfo from "../flights/FlightsInfo";
import LoadingSpinner from "../../spinner/LoadingSpinner";

const Flights = () => {
    const [flights, setFlights] = useState();
    const currentDate = Date.now() / 1000;
    const begin = Math.floor(currentDate - 7200);
    const end = Math.floor(currentDate);
    const [displayInfo, setDisplayInfo] = useState([begin, end]);
    const [search, setSearch] = useState("");

    const getFlights = async () => {
        const res = await fetch(
            `https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`
        );
        setDisplayInfo([begin, end]);
        return res.json();
    };
    const { data, isLoading, error } = useQuery("flights", getFlights);

    useEffect(() => {
        if (data) {
            setFlights(data);
        }
    }, [data, setFlights]);

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    // Pagination
    const [pageNumber, setPageNumber] = useState(0);
    const flightsPerPage = 10;
    const pagesVisited = pageNumber * flightsPerPage;
    const pageCount = flights
        ? Math.ceil(filterFlights(flights)?.length / flightsPerPage)
        : 0;
    const handlePageChange = ({ selected }) => setPageNumber(selected);

    const displayFlights = filterFlights(flights)
        ?.filter(item => {
            return search.toLowerCase() === ""
                ? item
                : item.callsign.toLowerCase().includes(search);
        })
        ?.slice(pagesVisited, pagesVisited + flightsPerPage)
        ?.map((flight, index) => {
            return (
                <div
                    key={`${flight.icao24}-${index}`}
                    className="bg-white border-b-4 border-double p-5 grid grid-cols-4 gap-6 md:gap-16 lg:gap-36 xl:gap-56 rounded-lg"
                >
                    <p className="my-auto text-custom-blue">
                        {flight.callsign}
                    </p>
                    <div className="flex flex-col items-center">
                        <p className="sm:text-2xl text-xl text-custom-blue">
                            {flight.estDepartureAirport}
                        </p>
                        <p className="sm:text-md text-xs">
                            {unixToGMT(flight.firstSeen)}
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p className="sm:text-2xl text-xl text-custom-blue">
                            {flight.estArrivalAirport}
                        </p>
                        <p className="sm:text-md text-xs">
                            {unixToGMT(flight.lastSeen)}
                        </p>
                    </div>
                    <p className="m-auto text-sm ">
                        {unixToDate(flight.firstSeen)}
                    </p>
                </div>
            );
        });

    return (
        <div className="sm:pl-60 pl-2 py-5 pb-24 text-[#1e1e1e]">
            <ToastContainer />
            <Header />
            <SearchTimeRange
                setFlights={setFlights}
                setDisplayInfo={setDisplayInfo}
                search={search}
                setSearch={setSearch}
            />
            {!isLoading && (
                <FlightsInfo
                    flights={flights}
                    displayInfo={displayInfo}
                    search={search}
                />
            )}

            <div className="bg-white sticky top-0 text-sm text-custom-blue font-bold px-5 py-2 border-b-4 grid grid-cols-4 gap-6 md:gap-16 lg:gap-36 xl:gap-56">
                <p className="">FLIGHT</p>
                <p className="text-center">DEPARTURE</p>
                <p className="text-center">ARRIVAL</p>
                <p className="">DEPARTURE DATE</p>
            </div>
            {error && (
                <p>
                    Failed to load. Please try refreshing the page or check your
                    internet connection.
                </p>
            )}

            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="">
                    {displayFlights}
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
                    {flights?.length === 0 && (
                        <p className="text-center">No flights available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Flights;
