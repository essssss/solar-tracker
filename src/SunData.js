import { DateTime } from "luxon";
let SunCalc = require("suncalc3");

export default function SunData({
    lat,
    lng,
    date,
    tzId,
    keyTimesArr,
    sunDataObj,
}) {
    // IMPORTANT TIMES. ADD TO THIS TO ADD A TIME

    // console.log(date);

    // let sunData = SunCalc.getSunTimes(date, lat, lng);
    // console.log(sunData);

    // let dateTimeObj = DateTime.fromObject(sunData["blueHourDawnStart"].value);
    // console.log(dateTimeObj);

    // function convertTimeToStr(timeType) {
    //     let unAdjustedTime = sunData[timeType].value;

    //     let dateTimeObjUnadjusted = DateTime.fromJSDate(unAdjustedTime);

    //     let dateTimeObjAdjusted = dateTimeObjUnadjusted.setZone(tzId);
    //     return dateTimeObjAdjusted.toLocaleString(DateTime.TIME_SIMPLE);
    // }

    // const sunDataObj = keyTimesArr.reduce((result, time) => {
    //     const timestamp = sunData[time].ts;
    //     const sunPositionRadians = SunCalc.getPosition(
    //         timestamp,
    //         lat,
    //         lng
    //     ).azimuth;

    //     const sunPositionDegrees =
    //         Math.floor(sunPositionRadians * (180 / Math.PI) * 10) / 10;

    //     const sunHeight =
    //         Math.floor(
    //             SunCalc.getPosition(timestamp, lat, lng).altitudeDegrees * 10
    //         ) / 10;

    //     result[time] = {
    //         time: convertTimeToStr(time),
    //         position: sunPositionDegrees,
    //         height: sunHeight,
    //     };

    //     return result;
    // }, {});
    // console.log(sunDataObj);

    return (
        <div className="rounded-lg  container bg-slate-100 p-4 my-4 mx-auto">
            <ul>
                {keyTimesArr.map((time) => {
                    return (
                        <li key={time}>
                            <b>{time}</b>: {sunDataObj[time].time}
                            <br />
                            <b>Position: </b> {sunDataObj[time].position}°
                            <br />
                            <b>Height: </b> {sunDataObj[time].height}°
                            <br />
                            ---
                            <br />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
