import React from "react";
import ArcOverlay from "./ArcOverlay";
import LocationPicker from "./LocationPicker";

function MapWithArcOverlay() {
    const degrees = [65, 75, 90, 150, 165, 295];
    const colors = ["darkblue", "darkblue", "orange", "orange", "lightblue"];
    const radius = 100;
    const width = 4;

    return (
        <div>
            <LocationPicker />
            <ArcOverlay
                degrees={degrees}
                colors={colors}
                radius={radius}
                width={width}
            />
        </div>
    );
}

export default MapWithArcOverlay;
