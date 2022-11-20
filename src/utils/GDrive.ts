// Node packages
import fs from "fs";
import path from "path";
import { google, sheets_v4 } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { authenticate } from "@google-cloud/local-auth";
import { JSONClient } from "google-auth-library/build/src/auth/googleauth";

// Set scope (read-only)
const SCOPES: string[] = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

// GDrive credentials
const TOKEN_PATH: string = path.join(__dirname, "../../auth/token-0xfrian.json");
const CREDENTIALS_PATH: string = path.join(__dirname, "../../auth/credentials-0xfrian.json");

// Read credentials from token.json
async function loadToken(): Promise<JSONClient> {
  try {
    const content: string = fs.readFileSync(TOKEN_PATH, { encoding: "utf-8" });
    const credentials: object = JSON.parse(content);
    const client: JSONClient = google.auth.fromJSON(credentials); 
    return client;
  } catch (err) {
    return null;
  }
}

// Save credentials to token.json
async function saveCredentials(client: OAuth2Client): Promise<void> {
  const content: string = fs.readFileSync(CREDENTIALS_PATH, { encoding: "utf-8" });
  const keys: {
    installed: object,
    web: object,
  } = JSON.parse(content);
  const key: {
    client_id?: string, 
    client_secret?: string, 
  } = keys.installed || keys.web;

  const payload: string = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  fs.writeFileSync(TOKEN_PATH, payload);
}

// Read Google Sheet data
export async function readSheet(sheet_id: string): Promise<GoogleSheet[]> {
  // Authenticate Google credentials
  let client: JSONClient = await loadToken();

  // If credential's don't exist (client is null)
  if (!client) {
    const auth_client: OAuth2Client = await authenticate({ scopes: SCOPES, keyfilePath: CREDENTIALS_PATH });
    if (auth_client.credentials) await saveCredentials(auth_client);
  }

  // If credentials do exist
  if (client) {
    try {
      // Initialize Google Sheets object
      const gsheets: sheets_v4.Sheets = google.sheets({ version: "v4", auth: client });
      
      // Fetch Google Sheets names
      const params_getSheet: object = { spreadsheetId: sheet_id };
      const data: sheets_v4.Schema$Sheet[] = (await gsheets.spreadsheets.get(params_getSheet)).data.sheets;

      let sheet_names: string[] = data.map((sheet: any) => sheet.properties.title);

      let google_sheets: GoogleSheet[] = [];
      for (let i = 0; i < sheet_names.length; i++) {
        const sheet_name: string = sheet_names[i];
        // Read Google Sheets values
        const params_getValues: object = { spreadsheetId: sheet_id, ranges: [sheet_name] };
        const values: sheets_v4.Schema$ValueRange[] = (await gsheets.spreadsheets.values.batchGet(params_getValues)).data.valueRanges;

        let google_sheet: GoogleSheet = {
          account: sheet_name, 
          transactions: [],
        };

        google_sheet.transactions = values[0].values;
        google_sheets.push(google_sheet);
      }

      return google_sheets;
    }
    catch (err) {
      console.log("Some error occurred while using Google Sheets API");
      console.log(err);
      return [];
    }
  }
}

export interface GoogleSheet {
  account: string; 
  transactions: string[][];
};

