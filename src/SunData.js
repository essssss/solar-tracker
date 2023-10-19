let SunCalc = require("suncalc3");

export default function SunData({ lat, lng, date }) {
    // IMPORTANT TIMES. ADD TO THIS TO ADD A TIME
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

    // console.log(date);

    let sunData = SunCalc.getSunTimes(date, lat, lng);
    // console.log(sunData);

    // TODO Currently all data is in America/New_York time. If a Minutes value starts with 0, it needs to be added to the string

    function convertTimeToStr(timeType) {
        let hours = sunData[timeType].value.getHours();
        let minutes = sunData[timeType].value.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (hours >= 12) {
            hours = hours - 12;
            return hours + ":" + minutes + " PM";
        }
        return hours + ":" + minutes + " AM";
    }

    const sunDataObj = keyTimesArr.reduce((result, time) => {
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
                SunCalc.getPosition(timestamp, lat, lng).altitudeDegrees * 10
            ) / 10;

        result[time] = {
            time: convertTimeToStr(time),
            position: sunPositionDegrees,
            height: sunHeight,
        };

        return result;
    }, {});
    console.log(sunDataObj);

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
