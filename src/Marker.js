import React, { useEffect } from "react";
import ArcOverlay from "./ArcOverlay";
const Marker = ({ sunDataObj, keyTimesArr }) => {
    const [degrees, setDegrees] = React.useState([]);

    useEffect(() => {
        const newDegrees = keyTimesArr.map((time) => {
            return sunDataObj[time]?.position || 0;
        });
        setDegrees(newDegrees);
    }, [sunDataObj]);

    console.log(degrees);

    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            {degrees ? (
                <ArcOverlay
                    degrees={degrees}
                    colors={[
                        "darkblue",
                        "orange",
                        "lightblue",
                        "orange",
                        "darkblue",
                    ]}
                />
            ) : null}
        </div>
    );
};

export default Marker;
