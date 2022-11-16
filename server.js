// === Node Packages ===
const cors = require("cors");
const express = require("express");

// === Local JS modules ===
const parser = require("./utils/parse.js");
const gsheets = require("./utils/gsheets.js");                 // Google Sheets API
const { log, done, alert, error } = require("./utils/log.js");  // For pretty logging

// === Express Server ===
const app = express();  // Initialize Express application

// Mount middleware functions
app.use(express.json());    // Parses incoming requests with JSON payloads
app.use(cors());            // Enable all CORS requests

// Route for fetching Google Sheets API
app.get("/fetch-data", async (req, res) => {
    // Log request
    log(`${req.method} request received at: ${req.path}`, indents=0, newlines=1);

    // Read Google Sheets
    const SHEET_ID = "1_wymLYZUnk5I0U84WMFVIFk44A3FqWZpO47pnClrOX8";
    const data = await gsheets.read(SHEET_ID);

    // Sort Google Sheets
    let data_sorted = {};
    for (const account of Object.keys(data)) {
        const txs = await parser.formatAmount(data[account]);
        const txs_sorted = await parser.sortTxs(txs, "monthly");
        data_sorted[account] = txs_sorted;
    }

    // Return data
    res.json(data_sorted);
});

// Start Express server
const port = 3000; 
log("Starting Express server . . . ", indents=0, newlines=0);
app.listen(port, () => {
    done("Done", indents=0, newlines=1);
    log(`==> Listening on port ${port}`, indents=0, newlines=2);
});

