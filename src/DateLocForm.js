import { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";
import { DateTime } from "luxon";
import ArcOverlay from "./ArcOverlay";

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
                    <ArcOverlay
                        degrees={[65, 75, 90, 150, 165, 295]}
                        colors={[
                            "darkblue",
                            "darkblue",
                            "orange",
                            "orange",
                            "lightblue",
                        ]}
                        radius={100}
                        width={4}
                    />
                </div>
            </form>
        </div>
    );
}
