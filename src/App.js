import "./App.css";
import DateLocForm from "./DateLocForm";
import SunData from "./SunData";
import { DateTime } from "luxon";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ArcOverlay from "./ArcOverlay";
import { createPortal } from "react-dom";
import CanvasArc from "./CanvasArc";
let SunCalc = require("suncalc3");

function App() {
    const [center, setCenter] = useState({
        lat: 38.8409,
        lng: -105.0423,
    });
    const [markerPosition, setMarkerPosition] = useState(center);
    const handleMapClick = (e) => {
        setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    };
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
            const unixTimestamp = selectedStartDate.toSeconds();

            try {
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/timezone/json?location=${markerPosition.lat},${markerPosition.lng}&timestamp=${unixTimestamp}&key=${apiKey}`
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
    }, [markerPosition, date.startDate]);
    useEffect(() => console.log(tzId), [tzId]);

    useEffect(() => {
        let sunData = SunCalc.getSunTimes(
            date.startDate,
            markerPosition.lat,
            markerPosition.lng
        );

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
                markerPosition.lat,
                markerPosition.lng
            ).azimuth;

            const sunPositionDegrees =
                Math.floor(sunPositionRadians * (180 / Math.PI) * 10) / 10;

            const sunHeight =
                Math.floor(
                    SunCalc.getPosition(
                        timestamp,
                        markerPosition.lat,
                        markerPosition.lng
                    ).altitudeDegrees * 10
                ) / 10;

            result[time] = {
                time: convertTimeToStr(time),
                position: sunPositionDegrees,
                height: sunHeight,
            };

            return result;
        }, {});

        setSunDataObj(newSunDataObj);
    }, [markerPosition, date.startDate]);

    return (
        <div className="rounded-lg  container bg-slate-200 mx-auto w-3/4 my-4 p-4">
            <h1 className="text-3xl font-bold underline">Sun Tracker</h1>
            <DateLocForm
                markerPosition={markerPosition}
                handleMapClick={handleMapClick}
                center={center}
                date={date}
                onDateChange={(newDate) => {
                    setDate(newDate);
                }}
                sunDataObj={sunDataObj}
                keyTimesArr={keyTimesArr}
            />
            <CanvasArc />
            <SunData
                keyTimesArr={keyTimesArr}
                sunDataObj={sunDataObj}
                tzId={tzId}
            />
        </div>
    );
}

export default App;
