import React, { useEffect, useRef } from "react";

function ArcOverlay({ degrees, colors, markerPosition, center }) {
    const canvasRef = useRef(null);
    useEffect(() => {
        const drawArc = () => {
            console.log("Arc Overlay is rendering!");
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 300;

            const markerX =
                centerX +
                (markerPosition.lng - center.lng) * (canvas.width / 360);
            const markerY =
                centerY -
                (markerPosition.lat - center.lat) * (canvas.height / 180);

            for (let i = 0; i < degrees.length - 1; i++) {
                const startAngle = degrees[i] * (Math.PI / 180);
                const endAngle = degrees[i + 1] * (Math.PI / 180);
                const color = colors[i];

                ctx.beginPath();
                ctx.arc(markerX, markerY, radius, startAngle, endAngle);
                ctx.lineWidth = 7;
                ctx.strokeStyle = color;
                ctx.stroke();
            }
        };

        drawArc();
    }, [canvasRef, degrees, colors, markerPosition]);

    return <canvas ref={canvasRef} width={400} height={400} />;
}

export default ArcOverlay;
