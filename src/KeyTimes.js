import React from "react";

export default function KeyTimes({ sunDataObj }) {
    return (
        <div className="container mx-auto columns-7 justify-items-stretch">
            <div className="text-center">
                {sunDataObj["blueHourDawnStart"]?.time}
            </div>
            <div className="text-center">
                {sunDataObj["goldenHourDawnStart"]?.time}
            </div>
            <div className="text-center">
                {sunDataObj["goldenHourDawnEnd"]?.time}
            </div>
            <div className="text-center">{sunDataObj["solarNoon"]?.time}</div>
            <div className="text-center">
                {sunDataObj["goldenHourDuskStart"]?.time}
            </div>
            <div className="text-center">
                {sunDataObj["blueHourDuskStart"]?.time}
            </div>
            <div className="text-center">
                {sunDataObj["blueHourDuskEnd"]?.time}
            </div>
        </div>
    );
}
