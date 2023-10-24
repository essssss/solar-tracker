import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

export default function LocationPicker({
    lat,
    lng,
    onLocationChange,
    sunDataObj,
    keyTimesArr,
}) {
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: "800px", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                }}
                center={{ lat, lng }}
                zoom={12}
                onClick={({ lat, lng }) => onLocationChange(lat, lng)}
            >
                <Marker sunDataObj={sunDataObj} keyTimesArr={keyTimesArr} />
            </GoogleMapReact>
        </div>
    );
}
