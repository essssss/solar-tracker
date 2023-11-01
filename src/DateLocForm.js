import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";

import MapComponent from "./MapComponent";

export default function DateLocForm({
    center,
    date,
    markerPosition,
    handleMapClick,
    onDateChange,
    sunDataObj,
}) {
    // This is our form handler:
    const handleDateChange = (newDate) => {
        if (newDate.startDate) onDateChange(newDate); // Update the date in the parent component
    };

    console.log(sunDataObj);
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

                <div className="container mx-aut p-6 bg-slate-100 rounded-lg">
                    <MapComponent
                        center={center}
                        markerPosition={markerPosition}
                        handleMapClick={handleMapClick}
                    />
                </div>
            </form>
        </div>
    );
}
