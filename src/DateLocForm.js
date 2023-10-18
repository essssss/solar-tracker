import { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";
import SunCalc from "suncalc3";
import { DateTime } from "luxon";

import LocationPicker from "./LocationPicker";

export default function DateLocForm({
    lat,
    lng,
    date,
    onLocationChange,
    onDateChange,
}) {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    // const [lat, setLat] = useState(38.8409);
    // const [lng, setlng] = useState(-105.0423);
    const [tzId, setTzId] = useState();

    const [timestamp, setTimestamp] = useState();

    // This function converts the date from the datepicker into a timestamp that we can use for our API call and our sunCalc math:
    useEffect(() => {
        const selectedStartDate = DateTime.fromFormat(
            date.startDate,
            "yyyy-MM-dd"
        );
        const unixTimestamp = selectedStartDate.toUnixInteger();
        setTimestamp(unixTimestamp);
    }, [date.startDate]);

    //log our Time zone id when it changes. This can be removed
    useEffect(() => {
        console.log(tzId);
    }, [tzId]);

    const getTimeZone = async () => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${apiKey}`
            );

            if (response.data.status === "ZERO_RESULTS") {
                throw new Error("Please choose a different location.");
            }
            setTzId(response.data.timeZoneId);
        } catch (error) {
            console.error("Error fetching time zone information:", error);
        }
    };

    // This is our form handler:
    const handleDateChange = (newDate) => {
        onDateChange(newDate); // Update the date in the parent component
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // getTimeStamp();
        const submittedDate = date.startDate;
        await getTimeZone();
        console.log(submittedDate, timestamp, tzId);
    };
    return (
        <div className="rounded-lg  container bg-slate-200 mx-auto w-1/2 my-4 p-4">
            <form>
                <div className="container mx-aut p-6">
                    <div className="sm:col-span-4 mx-auto">
                        <Datepicker
                            primaryColor={"slate"}
                            useRange={false}
                            asSingle={true}
                            value={date}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>

                <div className="container mx-aut p-6">
                    {/* Include the Map component for the map */}

                    <LocationPicker
                        lat={lat}
                        lng={lng}
                        onLocationChange={onLocationChange}
                    />
                </div>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleSubmit}
                >
                    See results
                </button>
            </form>
        </div>
    );
}
