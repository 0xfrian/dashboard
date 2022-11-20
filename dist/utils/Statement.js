"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(require("./Transaction"));
class Statement {
    constructor(_name = "", _transactions = []) {
        this.name = _name;
        this.transactions_raw = _transactions;
        this.transactions = [];
        let positives = 0;
        let negatives = 0;
        for (let i = 0; i < this.transactions_raw.length; i++) {
            // Assign row (entry) in Google Sheets
            const entry = this.transactions_raw[i];
            // Define transaction fields 
            let date = entry[0];
            let merchant = entry[1];
            let amount = Number(entry[2].replace("$", "").replace(",", ""));
            // Initialize Transaction object
            const transaction = new Transaction_1.default(date, merchant, amount);
            this.transactions.push(transaction); // append to transactions array
            // Tally up positive vs negative count
            amount >= 0 ? positives++ : negatives++;
        }
        // Sign Convention: Deposits are positive while Withdrawals are negative
        let sign_convention;
        positives >= negatives ? sign_convention = -1 : sign_convention = 1;
        // Apply sign convention
        for (let i = 0; i < this.transactions.length; i++) {
            const transaction = this.transactions[i];
            transaction.amount = transaction.amount * sign_convention;
        }
    }
    // Console-logs statement to terminal
    print() {
        console.log(`    ==== ${this.name} ========================================================== `);
        for (let i = 0; i < this.transactions.length; i++) {
            // Transaction
            const transaction = this.transactions[i];
            // Date
            const date = transaction.date;
            // Merchant
            const merchant = transaction.merchant.trim().substring(0, 40).padEnd(40, " ");
            // Amount
            let amount = transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            if (transaction.amount >= 0)
                amount = "+$" + amount;
            else
                amount = "-$" + amount.slice(1);
            // Console-log to terminal
            const output = `    ${date}  ${merchant}  ${amount}`;
            console.log(output);
        }
        console.log(`    ============================================================================ \n`);
    }
}
exports.default = Statement;
