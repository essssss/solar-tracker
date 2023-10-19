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
        const timeStr =
            sunData[timeType].value.getHours() +
            ":" +
            sunData[timeType].value.getMinutes();
        return timeStr;
    }
    // Back to the real program

    const timeObj = keyTimesArr.reduce((result, time) => {
        result[time] = convertTimeToStr(time);
        // console.log(sunData[time].ts);
        return result;
    }, {});
    // console.log(timeObj);

    return (
        <div className="rounded-lg  container bg-slate-100 p-4 my-4 mx-auto">
            <ul>
                {keyTimesArr.map((time) => {
                    return (
                        <li key={time}>
                            <b>{time}</b>: {timeObj[time]}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
