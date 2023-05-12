import { useNavigate } from "react-router-dom";
import { BsFillAirplaneEnginesFill } from "react-icons/bs";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="lg_background text-custom-black">
            <div className="flex pt-10 justify-center gap-1 text-[#c99c33]">
                <BsFillAirplaneEnginesFill className="text-3xl " />
                <p className="font-semibold text-3xl">AirTrackr</p>
            </div>
            <div className="flex flex-col items-center pt-20 min-h-screen w-[99vw]">
                <p>Page not found</p>
                <p
                    onClick={() => navigate("/")}
                    className="cursor-pointer text-custom-blue text-lg underline"
                >
                    Return To HomePage
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;
