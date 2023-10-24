export default function SunData({ keyTimesArr, sunDataObj }) {
    // Add a conditional check for sunDataObj

    if (!sunDataObj) {
        return null; // Render nothing if sunDataObj is not available
    }

    return (
        <div className="rounded-lg container bg-slate-100 p-4 my-4 mx-auto">
            <ul>
                {keyTimesArr.map((time) => {
                    return (
                        <li key={time}>
                            <b>{time}</b>: {sunDataObj[time]?.time}{" "}
                            {/* Use the optional chaining operator */}
                            <br />
                            <b>Position: </b> {sunDataObj[time]?.position}°
                            <br />
                            <b>Height: </b> {sunDataObj[time]?.height}°
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
