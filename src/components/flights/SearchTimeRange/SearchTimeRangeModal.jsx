import { Formik, Field, Form } from "formik";
import moment from "moment";

const SearchTimeRangeModal = props => {
    const {
        startTime,
        endTime,
        setStartTime,
        setEndTime,
        buttonDisabled,
        handleflightSearch
    } = props;
    return (
        <Formik
            initialValues={{
                lowerlimit: startTime,
                upperlimit: endTime
            }}
            onSubmit={handleflightSearch}
        >
            {formik => (
                <Form className="flex flex-col items-center">
                    <p className="font-bold text-custom-blue text-center text-lg">
                        Search through a time range of arriving flights
                    </p>
                    <small className="py-2">
                        You can only search through a time range of two (2)
                        hours.
                    </small>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col items-start">
                            <label htmlFor="lowerlimit">From (DD/MM/YYY)</label>
                            <Field
                                name="lowerlimit"
                                type="datetime-local"
                                className="border-[1px] border-[#2b2b39] bg-white p-2 rounded-sm"
                                value={startTime}
                                onChange={event =>
                                    setStartTime(event.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <label htmlFor="lowerlimit">To (DD/MM/YYY)</label>
                            <Field
                                name="upperlimit"
                                type="datetime-local"
                                className="border-[1px] border-[#2b2b39] bg-white p-2 rounded-sm"
                                value={endTime}
                                onChange={event =>
                                    setEndTime(event.target.value)
                                }
                            />
                        </div>
                    </div>
                    {endTime < startTime && (
                        <p className="text-red-700">
                            End time cannot be before start time
                        </p>
                    )}
                    {(moment(endTime, "YYYY-MM-DD HH:mm") -
                        moment(startTime, "YYYY-MM-DD HH:mm")) /
                        3600000 >
                        2 && (
                        <p className="text-red-700">
                            Time difference must be at most two (2) hours
                        </p>
                    )}
                    <button
                        type="submit"
                        className="py-3 mt-5 bg-custom-blue text-white disabled:opacity-[0.5]"
                        disabled={
                            endTime < startTime ||
                            (moment(endTime, "YYYY-MM-DD HH:mm") -
                                moment(startTime, "YYYY-MM-DD HH:mm")) /
                                3600000 >
                                2 ||
                            buttonDisabled
                        }
                    >
                        Search flights
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default SearchTimeRangeModal;
