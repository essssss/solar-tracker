import "./App.css";
import DateLocForm from "./DateLocForm";
import DatePickerExample from "./DatePickerExample";
import ExperimentDateTime from "./ExperimentDateTime";

import SunData from "./SunData";
import { useState } from "react";

function App() {
    return (
        <div className="App">
            <h1 className="text-3xl font-bold underline">Sun Tracker</h1>
            <DateLocForm />
            <SunData />
        </div>
    );
}

export default App;
