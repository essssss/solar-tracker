import React, { useEffect, useRef } from "react";

function ArcOverlay({ degrees, colors }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const drawArc = () => {
            if (!canvasRef.current || !degrees || degrees.length === 0) {
                return;
            }

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 300;

            for (let i = 0; i < degrees.length - 1; i++) {
                const startAngle = degrees[i] * (Math.PI / 180);
                const endAngle = degrees[i + 1] * (Math.PI / 180);
                const color = colors[i];

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                ctx.lineWidth = 7;
                ctx.strokeStyle = color;
                ctx.stroke();
            }
        };

        drawArc();
    }, [canvasRef, degrees, colors]);

    return <canvas ref={canvasRef} width={800} height={800} />;
}

export default ArcOverlay;
