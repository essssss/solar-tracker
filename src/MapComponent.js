import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    marginLeft: "auto", // Use camelCase for margin-x
    marginRight: "auto", // Use camelCase for margin-x
    width: "95%",
    height: "600px",
};

function MapComponent({ center, markerPosition, handleMapClick }) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        map.setCenter(center);
        map.setZoom(10);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);
    useEffect(() => console.log(markerPosition), [markerPosition]);
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
        >
            {/* Child components, such as markers, info windows, etc. */}
            {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(MapComponent);
