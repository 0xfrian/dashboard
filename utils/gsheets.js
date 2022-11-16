// Node packages
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");

// Google Drive credentials
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const TOKEN_PATH = path.join(__dirname, "../auth/token-0xfrian.json");
const CREDENTIALS_PATH = path.join(__dirname, "../auth/credentials-0xfrian.json");

// Read credentials from token.json
async function loadToken() {
    try {
        const content = fs.readFileSync(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

// Save credentials to token.json
async function saveCredentials(client) {
        const content = fs.readFileSync(CREDENTIALS_PATH);
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: "authorized_user",
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        fs.writeFileSync(TOKEN_PATH, payload);
}

// Read Google Sheet data
async function read(sheet_id) {
    // Authenticate Google credentials
    let client = await loadToken();

    // If credential's don't exist (client is null)
    if (!client) {
        client = await authenticate({
            scopes: SCOPES,
            keyfilePath: CREDENTIALS_PATH,
        });
        if (client.credentials) {
            await saveCredentials(client);
        }
    }

    // If credentials do exist
    if (client) {
        // Initialize sheets object
        const gsheets = google.sheets({ version: "v4", auth: client });

        try {
            // Fetch Google Sheets names
            const params_get = { spreadsheetId: sheet_id };
            const sheet_names = (await gsheets.spreadsheets.get(params_get)).data.sheets.map(sheet => sheet.properties.title);

            let sheets = {};
            for (const sheet_name of sheet_names) {
                // Read Google Sheets values
                const params_values = { spreadsheetId: sheet_id, ranges: [sheet_name] };
                const values = (await gsheets.spreadsheets.values.batchGet(params_values)).data.valueRanges[0].values;

                let txs = []; // Array to store transactions
                for (let i = 0; i < values.length; i++) {
                    txs.push({
                        "date":     values[i][0],
                        "merchant": values[i][1],
                        "amount":   values[i][2],
                    });
                }
                sheets[sheet_name] = txs;
            }

            return sheets;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = {
    read,
};

