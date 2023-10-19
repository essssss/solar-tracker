import { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";
import { DateTime } from "luxon";

import LocationPicker from "./LocationPicker";

export default function DateLocForm({
    lat,
    lng,
    date,
    onLocationChange,
    onDateChange,
}) {
    // This is our form handler:
    const handleDateChange = (newDate) => {
        if (newDate.startDate) onDateChange(newDate); // Update the date in the parent component
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     await getTimeZone();
    //     // console.log(submittedDate, timestamp, tzId);
    // };
    return (
        <div className="mx-aut">
            <form className="mx-aut">
                <div className="container mx-aut p-6">
                    <div className="sm:col-span-4 mx-aut">
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
                {/* 
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={console.log("hi :)")}
                >
                    See results
                </button> */}
            </form>
        </div>
    );
}
