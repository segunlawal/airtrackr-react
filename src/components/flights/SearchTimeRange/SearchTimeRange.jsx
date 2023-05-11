import { useState, useEffect } from "react";
import Modal from "react-modal";
import moment from "moment";
import SearchTimeRangeModal from "./SearchTimeRangeModal";
import { toast } from "react-toastify";

const SearchTimeRange = props => {
    const { setFlights, setDisplayInfo, search, setSearch } = props;

    // Get today's date at midnight
    const currentDate = moment()
        .set({ hour: 0, minute: 0 })
        .format("YYYY-MM-DD HH:mm");

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    useEffect(() => {
        setStartTime(currentDate);
        setEndTime(currentDate);
    }, [currentDate]);

    // Get flights for a time range
    const handleflightSearch = async () => {
        setButtonDisabled(true);
        const begin = moment(startTime, "YYYY-MM-DD HH:mm").unix();
        const end = moment(endTime, "YYYY-MM-DD HH:mm").unix();
        const data = await (
            await fetch(
                `https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`
            )
        ).json();
        setFlights(data);
        setDisplayInfo([begin, end]);
        setModalIsOpen(false);
        toast.success("Flights search successful");
        setButtonDisabled(false);
    };

    return (
        <div className="md:flex md:justify-between">
            <div>
                <p className="py-5">
                    Want to search through a time range?{" "}
                    <span
                        className="bg-light text-custom-blue font-semibold cursor-pointer"
                        onClick={() => setModalIsOpen(true)}
                    >
                        Click here
                    </span>
                </p>
                <Modal
                    style={{
                        overlay: {
                            position: "fixed",
                            background: "rgba(24, 49, 64, 0.63)",
                            backdropFilter: 'blur("91px")',
                            zIndex: 1
                        }
                    }}
                    isOpen={modalIsOpen}
                    className="bg-white outline-none text-custom-black mt-[10%] py-10 sm:w-[50%] w-[90%] mx-auto rounded-sm"
                    appElement={document.getElementById("root") || undefined}
                    onRequestClose={() => {
                        setModalIsOpen(false);
                    }}
                >
                    <SearchTimeRangeModal
                        startTime={startTime}
                        endTime={endTime}
                        setStartTime={setStartTime}
                        setEndTime={setEndTime}
                        buttonDisabled={buttonDisabled}
                        handleflightSearch={handleflightSearch}
                    />
                </Modal>
            </div>
            <div className="my-auto">
                <input
                    className="focus:border-2 border-[1px] p-2 rounded-lg bg-transparent border-[#2b2b39] focus:outline-none"
                    placeholder="Search for a flight"
                    value={search}
                    onChange={e => setSearch(e.target.value.toLowerCase())}
                />
            </div>
        </div>
    );
};

export default SearchTimeRange;
