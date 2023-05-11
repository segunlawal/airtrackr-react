import React from "react";
import { isSameDay, unixToDate, unixToGMT } from "../../../utils/utils";

const StatisticsInfo = props => {
    const { rangeInfo } = props;
    const time1 = unixToGMT(rangeInfo[0]);
    const time2 = unixToGMT(rangeInfo[1]);
    const date1 = unixToDate(rangeInfo[0]);
    const date2 = unixToDate(rangeInfo[1]);
    return (
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
            <p className="text-sm">
                The time is the most recent arrival or departure at the airport
            </p>
        </div>
    );
};

export default StatisticsInfo;
