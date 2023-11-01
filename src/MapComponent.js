import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import ArcOverlay from "./ArcOverlay";
import CanvasArc from "./CanvasArc";

const containerStyle = {
    width: "100%",
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
            // center={center}
            // defaultZoom={5}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
        >
            {/* Child components, such as markers, info windows, etc. */}
            {markerPosition && <Marker position={markerPosition} />}
            {markerPosition && <CanvasArc position={markerPosition} />}
            {/* {markerPosition && (
                <ArcOverlay
                    zIndex={1}
                    degrees={[-39, -35, -32, -26, 90, 205, 211, 214, 219]}
                    colors={[
                        "darkblue",
                        "darkblue",
                        "orange",
                        "lightblue",
                        "lightblue",
                        "orange",
                        "darkblue",
                        "darkblue",
                    ]}
                    center={center}
                    markerPosition={markerPosition}
                />
            )} */}
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(MapComponent);
