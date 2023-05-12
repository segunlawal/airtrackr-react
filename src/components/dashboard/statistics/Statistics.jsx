import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { filterFlights, sortFlights, unixToGMT } from "../../../utils/utils";
import ReactPaginate from "react-paginate";
import StatisticsInfo from "./StatisticsInfo";
import LoadingSpinner from "../../spinner/LoadingSpinner";

const Statistics = () => {
    const [airportInfo, setairportInfo] = useState([]);
    const [airportSearch, setAirportSearch] = useState("");

    const currentDate = Date.now() / 1000;
    const begin = Math.floor(currentDate - 3600);
    const end = Math.floor(currentDate + 3600);
    const rangeInfo = [begin, end];

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

    const filteredFlights = airportInfo
        // search feature
        ?.filter(item => {
            return airportSearch.toLowerCase() === ""
                ? item
                : item.airport.toLowerCase().includes(airportSearch);
        })
        ?.slice(pagesVisited, pagesVisited + flightsPerPage) // paginate
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

    return (
        <div className="sm:pl-60 pl-5 py-3 flex flex-col text-left font-semibold text-custom-blue">
            <ToastContainer />
            <p className="text-2xl text-[#c99c33]">STATISTICS</p>
            <div className="md:flex md:justify-between">
                <StatisticsInfo rangeInfo={rangeInfo} />
                <div className="my-auto sm:p-0 pb-4">
                    <input
                        className="focus:border-2 border-[1px] p-2 rounded-lg bg-transparent border-[#2b2b39] focus:outline-none"
                        placeholder="Search for an airport"
                        value={airportSearch}
                        onChange={e =>
                            setAirportSearch(e.target.value.toLowerCase())
                        }
                    />
                </div>
            </div>

            <div className="bg-white sticky top-0  border-b-4 border-double p-5 grid grid-cols-4 gap-6 md:gap-16 lg:gap-36 xl:gap-56 rounded-lg">
                <div>
                    <p className="font-bold">AIRPORT</p>
                    <p className="">
                        (
                        {
                            airportInfo?.filter(item => {
                                return airportSearch.toLowerCase() === ""
                                    ? item
                                    : item.airport
                                          .toLowerCase()
                                          .includes(airportSearch);
                            })?.length
                        }
                        )
                    </p>
                </div>
                <p className="font-bold text-center">TIME</p>
                <p className="font-bold text-center">ARRIVING</p>
                <p className="font-bold text-center">DEPARTING</p>
            </div>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
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
            )}
        </div>
    );
};

export default Statistics;
