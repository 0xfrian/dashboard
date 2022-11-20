"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSheet = void 0;
// Node packages
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const googleapis_1 = require("googleapis");
const local_auth_1 = require("@google-cloud/local-auth");
// Set scope (read-only)
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
// GDrive credentials
const TOKEN_PATH = path_1.default.join(__dirname, "../../auth/token-0xfrian.json");
const CREDENTIALS_PATH = path_1.default.join(__dirname, "../../auth/credentials-0xfrian.json");
// Read credentials from token.json
function loadToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const content = fs_1.default.readFileSync(TOKEN_PATH, { encoding: "utf-8" });
            const credentials = JSON.parse(content);
            return googleapis_1.google.auth.fromJSON(credentials);
        }
        catch (err) {
            return null;
        }
    });
}
// Save credentials to token.json
function saveCredentials(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = fs_1.default.readFileSync(CREDENTIALS_PATH, { encoding: "utf-8" });
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: "authorized_user",
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        fs_1.default.writeFileSync(TOKEN_PATH, payload);
    });
}
// Read Google Sheet data
function readSheet(sheet_id) {
    return __awaiter(this, void 0, void 0, function* () {
        // Authenticate Google credentials
        let client = yield loadToken();
        // If credential's don't exist (client is null)
        if (!client) {
            client = yield (0, local_auth_1.authenticate)({
                scopes: SCOPES,
                keyfilePath: CREDENTIALS_PATH,
            });
            if (client.credentials) {
                yield saveCredentials(client);
            }
        }
        // If credentials do exist
        if (client) {
            try {
                // Initialize Google Sheets object
                const gsheets = googleapis_1.google.sheets({ version: "v4", auth: client });
                // Fetch Google Sheets names
                const params_get = { spreadsheetId: sheet_id };
                const data = (yield gsheets.spreadsheets.get(params_get)).data;
                let sheet_names = [];
                if (data.sheets)
                    sheet_names = data.sheets.map((sheet) => sheet.properties.title);
                let google_sheets = [];
                for (let i = 0; i < sheet_names.length; i++) {
                    const sheet_name = sheet_names[i];
                    // Read Google Sheets values
                    const params_values = { spreadsheetId: sheet_id, ranges: [sheet_name] };
                    const values = (yield gsheets.spreadsheets.values.batchGet(params_values)).data.valueRanges;
                    let google_sheet = {
                        name: sheet_name,
                        transactions: [],
                    };
                    if (values != undefined && values.length > 0 && values[0].values)
                        google_sheet.transactions = values[0].values,
                            google_sheets.push(google_sheet);
                }
                return google_sheets;
            }
            catch (err) {
                console.log(err);
                return [];
            }
        }
    });
}
exports.readSheet = readSheet;
