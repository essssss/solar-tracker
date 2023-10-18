import React, { useState } from "react";
import { DateTime } from "luxon";
import axios from "axios";

export default function ExperimentDateTime() {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const [sampleLat, setSampleLat] = useState(39.9042);
    const [sampleLong, setSampleLong] = useState(-116.4074); // Updated to negative for western longitude
    const [selectedDate, setSelectedDate] = useState(null);
    const [utcDate, setUtcDate] = useState(null);

    async function getTzObj() {
        if (sampleLat && sampleLong && selectedDate) {
            try {
                // Format the selected date to "yyyy-MM-dd"
                const formattedDate =
                    DateTime.fromJSDate(selectedDate).toFormat("yyyy-MM-dd");

                // Make an async axios request to obtain time zone information
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/timezone/json?location=${sampleLat},${sampleLong}&timestamp=${formattedDate}&key=${apiKey}`
                );

                // Extract the time zone ID from the response data
                const timeZoneId = response.data.timeZoneId;

                // Create a DateTime object using the selected date and the specified time zone
                const dt = DateTime.fromJSDate(selectedDate, {
                    zone: timeZoneId,
                });

                // Convert the date to UTC seconds from the epoch
                const utcSeconds = dt.toSeconds();

                // Set the UTC date in seconds state
                setUtcDate(utcSeconds);
            } catch (error) {
                console.error("Error fetching time zone information:", error);
            }
        }
    }

    return (
        <div>
            <form>
                <label>
                    Latitude:
                    <input
                        type="number"
                        value={sampleLat}
                        onChange={(e) => setSampleLat(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Longitude:
                    <input
                        type="number"
                        value={sampleLong}
                        onChange={(e) => setSampleLong(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Select a Date:
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) =>
                            setSelectedDate(new Date(e.target.value))
                        }
                    />
                </label>
            </form>

            <button onClick={getTzObj}>Get UTC Date</button>

            {utcDate && (
                <div>
                    <p>UTC Date in Seconds from Epoch: {utcDate}</p>
                </div>
            )}
        </div>
    );
}
