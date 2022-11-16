require('dotenv').config()
const treeify = require("treeify");
const parser = require("../utils/parse.js");
const gsheets = require("../utils/gsheets.js");

const log = console.log;

async function main() {
    const SHEET_ID = process.env.SHEET_ID;
    const data = await gsheets.read(SHEET_ID);

    log();
    log("Output: ");
    for (const account of Object.keys(data)) {
        const txs = await parser.formatAmount(data[account]);
        const txs_sorted = await parser.sortTxs(txs, "monthly");
        log(txs_sorted);
        break;
    }
    log();
}

main()
    .then(() => process.exit(0));

