import "./App.css";
import DateLocForm from "./DateLocForm";
import SunData from "./SunData";
import { DateTime } from "luxon";
import React, { useState } from "react";

function App() {
    // Lifted state for lat, lng, and date
    const [lat, setLat] = useState(38.8409);
    const [lng, setLng] = useState(-105.0423);

    // Initialize the date state to the current date in "yyyy-MM-dd" format
    const currentDate = DateTime.local();
    const initialDate = currentDate.toFormat("yyyy-MM-dd");

    const [date, setDate] = useState({
        startDate: initialDate,
        endDate: initialDate,
    });

    return (
        <div className="App">
            <h1 className="text-3xl font-bold underline">Sun Tracker</h1>
            <DateLocForm
                lat={lat}
                lng={lng}
                date={date}
                onLocationChange={(newLat, newLng) => {
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
