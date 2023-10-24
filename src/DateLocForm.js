import Datepicker from "react-tailwindcss-datepicker";

import LocationPicker from "./LocationPicker";

export default function DateLocForm({
    lat,
    lng,
    date,
    onLocationChange,
    onDateChange,
    sunDataObj,
    keyTimesArr,
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

                <div className="container mx-aut p-6">
                    {/* Include the Map component for the map */}

                    <LocationPicker
                        lat={lat}
                        lng={lng}
                        onLocationChange={onLocationChange}
                        sunDataObj={sunDataObj}
                        keyTimesArr={keyTimesArr}
                    />
                </div>
            </form>
        </div>
    );
}
