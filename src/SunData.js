let SunCalc = require("suncalc3");

export default function SunData() {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const SAMPLEDATE = "2021-04-28";
    const SAMPLELAT = 39.9042;
    const SAMPLELONG = 116.4074;
    let sunData = SunCalc.getSunTimes(SAMPLEDATE, SAMPLELAT, SAMPLELONG);
    let sunriseStart = sunData.sunriseStart.value.toISOString();
    let solarNoon = sunData.solarNoon.value.toISOString();
    let sunsetEnd = sunData.sunsetEnd.value.toISOString();
    console.log(apiKey);

    return (
        <div>
            <ul>
                <li>
                    <em>Sunrise Start: </em> {sunriseStart}
                </li>
                <li>
                    <em>Noon: </em> {solarNoon}
                </li>
                <li>
                    <em>Sunset End: </em> {sunsetEnd}
                </li>
            </ul>
        </div>
    );
}
