// === Node Packages === 
import { useState } from "react";

// === Components ===
import Data from "./Data.js";
import Table from "./Table.js";
import Graph from "./Graph.js";

// === App Component ===
function App() {
    // Define state variables
    const [statements, setStatements] = useState([]); 
    const [rows, setRows] = useState([]);

    return (
        <>
            {/* Logo */}
            <div className="logo-container pink shadow border no-select">
                <img className="logo-img" src="./alpaca.png" alt="alpaca-icon" draggable="false" />
                <h1 className="logo-text">
                    alpaca.fi
                </h1>
            </div>

            {/* Statements */}
            <Data setRows={setRows} statements={statements} setStatements={setStatements} />

            {/* Table */}
            <Table statements={statements} rows={rows} setRows={setRows} />

            {/* Graph */}
            <Graph />
        </>
    );
}

export default App;
