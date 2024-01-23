import "./App.css";
import DateLocForm from "./DateLocForm";
import SunData from "./SunData";
import { DateTime } from "luxon";
import axios from "axios";
import React, { useState, useEffect } from "react";
import KeyTimes from "./KeyTimes";
import Gradient from "./Gradient";

import SunCalc from "suncalc3";

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
        ["blueHourDawnStart", "Blue Hour Dawn, Start"],
        ["blueHourDawnEnd", "Blue Hour Dawn, End"],
        ["goldenHourDawnStart", "Golden Hour Dawn, Start"],
        ["goldenHourDawnEnd", "Golden Hour Dawn, End"],
        ["solarNoon", "Solar Noon"],
        ["goldenHourDuskStart", "Golden Hour Dusk, Start"],
        ["goldenHourDuskEnd", "Golden Hour Dusk, End"],
        ["blueHourDuskStart", "Blue Hour Dusk, Start"],
        ["blueHourDuskEnd", "Blue Hour Dusk, End"],
    ];
    // State for sunDataObj

    const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

    const getSunDataObj = () => {
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
        const newSunDataObj = keyTimesArr.reduce((result, timePair) => {
            const time = timePair[0];
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
    };

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
                getSunDataObj();
            } catch (error) {
                console.error("Error fetching time zone information:", error);
            }
        }
        getTimeZone();
    }, [markerPosition, date.startDate]);

    useEffect(() => {
        if (tzId) {
            getSunDataObj();
        }
    }, [tzId, markerPosition, date.startDate]);

    return (
        <div className="rounded-lg  container bg-slate-200 mx-auto lg:w-3/4 my-4 md:p-4">
            <h1 className="text-center text-3xl font-bold underline">
                Sun Tracker
            </h1>
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
            <div
                className="bg-slate-100
            my-4 p-4 rounded-lg"
            >
                <KeyTimes sunDataObj={sunDataObj} />
                <Gradient />
            </div>
            <SunData
                keyTimesArr={keyTimesArr}
                sunDataObj={sunDataObj}
                tzId={tzId}
            />
        </div>
    );
}

export default App;
