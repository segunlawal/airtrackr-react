import {
    unixToGMT,
    unixToDate,
    filterFlights,
    isSameDay
} from "../../utils/utils";

const FlightsInfo = props => {
    const { flights, displayInfo } = props;

    const time1 = unixToGMT(displayInfo[0]);
    const time2 = unixToGMT(displayInfo[1]);
    const date1 = unixToDate(displayInfo[0]);
    const date2 = unixToDate(displayInfo[1]);

    return (
        <div className="flex sm:gap-5">
            <p className="font-semibold">
                RESULT ({filterFlights(flights)?.length})
            </p>
            <div className="flex flex-col my-auto">
                {isSameDay(displayInfo) ? (
                    <small>
                        These are flights arriving between{" "}
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
                        These are flights arriving between{" "}
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
        </div>
    );
};

export default FlightsInfo;
