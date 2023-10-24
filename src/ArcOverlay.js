import React, { Component } from "react";

class ArcOverlay extends Component {
    componentDidMount() {
        this.drawArc();
    }

    drawArc() {
        const canvas = this.refs.arcCanvas;
        const ctx = canvas.getContext("2d");

        const { degrees, colors, radius, width } = this.props;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        for (let i = 0; i < degrees.length - 1; i++) {
            const startAngle = degrees[i] * (Math.PI / 180);
            const endAngle = degrees[i + 1] * (Math.PI / 180);
            const color = colors[i];

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.lineWidth = width;
            ctx.strokeStyle = color;
            ctx.stroke();
        }
    }

    render() {
        return <canvas ref="arcCanvas" width={400} height={400} />;
    }
}

export default ArcOverlay;
