// === Dependencies ===
require('dotenv').config();
import Logger from "./utils/Logger";
import Statement from "./utils/Statement";
import { readSheet, GoogleSheet } from "./utils/GDrive";

async function main() {
  const logger: Logger = new Logger(2);

  const sheet_id: string = process.env.SHEET_ID || "";

  logger.log("Fetching Google Sheets . . . ", 0, 1);
  const sheets: GoogleSheet[] = await readSheet(sheet_id);
  logger.done("Google Sheets loaded successfully!", 0, 2);

  for (let i = 0; i < sheets.length; i++) {
    const sheet: GoogleSheet = sheets[i];
    const statement: Statement = new Statement(sheet.account, sheet.transactions);
    statement.print();
  }
}

main();

