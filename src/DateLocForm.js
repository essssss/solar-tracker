import { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";
import SunCalc from "suncalc3";
import { DateTime } from "luxon";

export default function DateLocForm() {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const [sampleLat, setSampleLat] = useState(38.8409);
    const [sampleLong, setSampleLong] = useState(-105.0423);
    const [tzId, setTzId] = useState();
    // Initialize the date state to the current date in "yyyy-MM-dd" format
    const currentDate = DateTime.local();
    const initialDate = currentDate.toFormat("yyyy-MM-dd");

    const [date, setDate] = useState({
        startDate: initialDate,
        endDate: initialDate,
    });
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
                `https://maps.googleapis.com/maps/api/timezone/json?location=${sampleLat},${sampleLong}&timestamp=${timestamp}&key=${apiKey}`
            );

            if (response.data.status === "ZERO_RESULTS") {
                throw new Error("Please choose a different location.");
            }
            setTzId(response.data.timeZoneId);
        } catch (error) {
            console.error("Error fetching time zone information:", error);
        }
    };

    // This is our suncalc function to get important times:
    const timeObj = () => {
        let times = SunCalc.getSunTimes(timestamp);
    };

    // This is our form handler:
    const handleDateChange = (newDate) => {
        console.log("newDate:", newDate);
        setDate(newDate);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // getTimeStamp();
        const submittedDate = date.startDate;
        await getTimeZone();
        console.log(submittedDate, timestamp, tzId);
    };
    return (
        <form className="rounded-lg  container bg-slate-200 mx-auto w-1/2">
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
            {/* TODO: this will be our map picker: */}
            <div className="container mx-aut p-6">
                <label htmlFor="lat">Latitude: </label>
                <input
                    id="lat"
                    type="text"
                    value={sampleLat}
                    onChange={(e) => setSampleLat(e.target.value)}
                ></input>
                <label htmlFor="long"> Longitude: </label>
                <input
                    id="long"
                    type="text"
                    value={sampleLong}
                    onChange={(e) => setSampleLong(e.target.value)}
                ></input>
            </div>
            <button onClick={handleSubmit}>See results</button>
        </form>
    );
}
