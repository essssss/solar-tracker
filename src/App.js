import "./App.css";
import DateLocForm from "./DateLocForm";
import SunData from "./SunData";
import { DateTime } from "luxon";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
    // Lifted state for lat, lng, and date
    const [lat, setLat] = useState(38.8409);
    const [lng, setLng] = useState(-105.0423);

    // Initialize the date state to the current date in "yyyy-MM-dd" format
    const currentDate = DateTime.local();
    const initialDate = currentDate.toFormat("yyyy-MM-dd");

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const [tzId, setTzId] = useState();

    //log our Time zone id when it changes. This can be removed
    useEffect(() => {
        console.log(tzId);
    }, [tzId]);

    const getTimeZone = async () => {
        const selectedStartDate = DateTime.fromFormat(
            date.startDate,
            "yyyy-MM-dd"
        );
        const unixTimestamp = selectedStartDate.toUnixInteger();
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${unixTimestamp}&key=${apiKey}`
            );

            if (response.data.status === "ZERO_RESULTS") {
                throw new Error("Please choose a different location.");
            }
            setTzId(response.data.timeZoneId);
        } catch (error) {
            console.error("Error fetching time zone information:", error);
        }
    };
    useEffect(() => {
        getTimeZone();
    }, [lat, lng]);

    const [date, setDate] = useState({
        startDate: initialDate,
        endDate: initialDate,
    });

    return (
        <div className="rounded-lg  container bg-slate-200 mx-auto w-3/4 my-4 p-4">
            <h1 className="text-3xl font-bold underline">Sun Tracker</h1>
            <DateLocForm
                lat={lat}
                lng={lng}
                date={date}
                onLocationChange={async (newLat, newLng) => {
                    setLat(newLat);
                    setLng(newLng);
                }}
                onDateChange={(newDate) => {
                    setDate(newDate);
                }}
            />
            <SunData lat={lat} lng={lng} date={date.startDate} />
        </div>
    );
}

export default App;
