import React from "react";
import GoogleMapReact from "google-map-react";

const Marker = ({ text }) => <div>{text}</div>;

export default function LocationPicker({ lat, lng, onLocationChange }) {
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: "400px", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                }}
                center={{ lat, lng }}
                zoom={12}
                onClick={({ lat, lng }) => onLocationChange(lat, lng)}
            >
                <Marker lat={lat} lng={lng} text="<<<-My Marker" />
            </GoogleMapReact>
        </div>
    );
}
