import { DateTime } from "luxon";
import axios from "axios";

export default function ExperimentDateTime() {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const SAMPLE_TIMESTAMP = 1588067154;

    const SAMPLELAT = 38.8447791;
    const SAMPLELONG = -105.0410067;

    async function getTzObj() {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/timezone/json?location=${SAMPLELAT},${SAMPLELONG}&timestamp=${SAMPLE_TIMESTAMP}&key=${apiKey}`
        );

        const timeZoneId = response.data.timeZoneId;

        const dt = DateTime.fromMillis(SAMPLE_TIMESTAMP * 1000, {
            zone: timeZoneId,
        });

        console.log(
            "Formatted Date and Time:",
            dt.toLocaleString(DateTime.DATETIME_MED)
        );
    }
    getTzObj();
}
