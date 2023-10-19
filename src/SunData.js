let SunCalc = require("suncalc3");

export default function SunData({ lat, lng, date }) {
    console.log(date);
    let sunData = SunCalc.getSunTimes(date, lat, lng);
    console.log(sunData);

    // TODO Currently all data is in America/New_York time. If a Minutes value starts with 0, it needs to be added to the string

    function convertTime(timeType) {
        const timeStr =
            sunData[timeType].value.getHours() +
            ":" +
            sunData[timeType].value.getMinutes();
        return timeStr;
    }
    // Back to the real program

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
    const timeObj = keyTimesArr.reduce((result, time) => {
        result[time] = convertTime(time);
        return result;
    }, {});
    console.log(timeObj);

    return (
        <div>
            <ul>
                {keyTimesArr.map((time) => {
                    return (
                        <li>
                            <b>{time}</b>: {timeObj[time]}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
