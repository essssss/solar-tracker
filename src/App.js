import "./App.css";
import DateLocForm from "./DateLocForm";
import SunData from "./SunData";
import { DateTime } from "luxon";
import axios from "axios";
import React, { useState, useEffect } from "react";
let SunCalc = require("suncalc3");

function App() {
    const [lat, setLat] = useState(38.8409);
    const [lng, setLng] = useState(-105.0423);
    const [tzId, setTzId] = useState();
    const [date, setDate] = useState({
        startDate: DateTime.local().toFormat("yyyy-MM-dd"),
        endDate: DateTime.local().toFormat("yyyy-MM-dd"),
    });
    const [sunDataObj, setSunDataObj] = useState({});
    let keyTimesArr = [
        "blueHourDawnStart",
        "blueHourDawnEnd",
        "goldenHourDawnStart",
        "goldenHourDawnEnd",
        "solarNoon",
        "goldenHourDuskStart",
        "goldenHourDuskEnd",
        "blueHourDuskStart",
        "blueHourDuskEnd",
    ];
    // State for sunDataObj

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        // Fetch timezone when lat, lng, or date changes
        async function getTimeZone() {
            const selectedStartDate = DateTime.fromFormat(
                date.startDate,
                "yyyy-MM-dd"
            );
            const unixTimestamp = selectedStartDate.toMillis();
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
        }
        getTimeZone();
    }, [lat, lng, date.startDate]);

    useEffect(() => {
        let sunData = SunCalc.getSunTimes(date, lat, lng);
        function convertTimeToStr(timeType) {
            let unAdjustedTime = sunData[timeType].value;

            let dateTimeObjUnadjusted = DateTime.fromJSDate(unAdjustedTime);

            let dateTimeObjAdjusted = dateTimeObjUnadjusted.setZone(tzId);
            return dateTimeObjAdjusted.toLocaleString(DateTime.TIME_SIMPLE);
        }
        const newSunDataObj = keyTimesArr.reduce((result, time) => {
            const timestamp = sunData[time].ts;
            const sunPositionRadians = SunCalc.getPosition(
                timestamp,
                lat,
                lng
            ).azimuth;

            const sunPositionDegrees =
                Math.floor(sunPositionRadians * (180 / Math.PI) * 10) / 10;

            const sunHeight =
                Math.floor(
                    SunCalc.getPosition(timestamp, lat, lng).altitudeDegrees *
                        10
                ) / 10;

            result[time] = {
                time: convertTimeToStr(time),
                position: sunPositionDegrees,
                height: sunHeight,
            };

            setSunDataObj(newSunDataObj);
        }, {});
    }, [lat, lng, date]);

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
            <SunData
                lat={lat}
                lng={lng}
                date={date.startDate}
                tzId={tzId}
                keyTimesArr={keyTimesArr}
            />
        </div>
    );
}

export default App;
