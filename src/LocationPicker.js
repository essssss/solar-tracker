import React from "react";
import GoogleMapReact from "google-map-react";
import ArcOverlay from "./ArcOverlay";

const Marker = ({ lat, lng, text }) => (
    <div
        style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        }}
    >
        {text}
        <ArcOverlay
            degrees={[65, 75, 90, 150, 165, 295]}
            colors={[
                "darkblue",
                "darkblue",
                "orange",
                "lightblue",
                "orange",
                "darkblue",
            ]}
            radius={100}
            width={4}
        />
    </div>
);

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
