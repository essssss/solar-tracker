export default function SunData({ keyTimesArr, sunDataObj }) {
    // Add a conditional check for sunDataObj

    if (!sunDataObj) {
        return null; // Render nothing if sunDataObj is not available
    }

    return (
        <>
            <div className="rounded-lg container bg-slate-100 p-4 my-4 mx-auto">
                <div className="grid grid-cols-2">
                    {keyTimesArr.map((time) => {
                        return (
                            <div
                                className="rounded-lg bg-slate-400 p-4 m-4 text-center text-slate-700"
                                key={time}
                            >
                                <p className="bg-slate-300 rounded m-1">
                                    <b>{time}</b>: {sunDataObj[time]?.time}{" "}
                                    {/* Use the optional chaining operator */}
                                </p>
                                <p className="bg-slate-200 rounded m-1">
                                    <b>Sun Position: </b>{" "}
                                    {sunDataObj[time]?.position}°
                                </p>
                                <p className="bg-slate-300 rounded m-1">
                                    <b>Sun Height: </b>{" "}
                                    {sunDataObj[time]?.height}°
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
