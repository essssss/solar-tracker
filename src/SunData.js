let SunCalc = require("suncalc3");

export default function SunData({ lat, lng, date }) {
    console.log(date);
    let sunData = SunCalc.getSunTimes(date, lat, lng);
    console.log(sunData);
    let sunriseStart = sunData.sunriseStart.value.toTimeString();
    let solarNoon = sunData.solarNoon.value.toTimeString();
    let sunsetEnd = sunData.sunsetEnd.value.toTimeString();

    //INTERLUDE
    // Currently all data is in America/New_York time
    let sunriseStr =
        sunData.sunriseStart.value.getHours() +
        ":" +
        sunData.sunriseStart.value.getMinutes();
    console.log(sunriseStr);

    let noonStr =
        sunData.solarNoon.value.getHours() +
        ":" +
        sunData.solarNoon.value.getMinutes();
    let sunsetStr =
        sunData.sunsetEnd.value.getHours() -
        12 +
        ":" +
        sunData.sunsetEnd.value.getMinutes();
    // Back to the real program
    return (
        <div>
            <ul>
                <li>
                    <b>Sunrise Start: </b> {sunriseStr} AM
                </li>
                <li>
                    <b>Noon: </b> {noonStr}
                </li>
                <li>
                    <b>Sunset End: </b> {sunsetStr} PM
                </li>
            </ul>
        </div>
    );
}
