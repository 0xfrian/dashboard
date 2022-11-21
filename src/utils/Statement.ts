// === Dependencies ===
import Transaction from "./Transaction";

export default class Statement {
  account: string;
  transactions_raw: string[][];
  transactions: Transaction[];

  constructor(_account: string = "", _transactions: string[][] = []) {
    this.account = _account;
    this.transactions_raw = _transactions;
    this.transactions = [];

    let positives: number = 0; 
    let negatives: number = 0; 
    for (let i = 0; i < this.transactions_raw.length; i++) {
      // Index row in Google Sheets
      const entry: string[] = this.transactions_raw[i];

      // Define transaction fields 
      let date: string = entry[0];
      let merchant: string = entry[1];
      let amount: number = Number(entry[2].replace("$", "").replace(",", ""));

      // Initialize Transaction object
      const transaction: Transaction = new Transaction(date, merchant, amount);
      this.transactions.push(transaction);  // append to transactions array

      // Tally up positive vs negative count
      amount >= 0 ? positives++ : negatives++;
    }

    // Sign Convention: Deposits are positive while Withdrawals are negative
    let sign_convention: number = positives >= negatives ? -1 : 1;

    // Apply sign convention
    this.transactions = this.transactions.map(transaction => 
      new Transaction(transaction.date, transaction.merchant, transaction.amount * sign_convention)
    );
  }

  // Console-logs statement to terminal
  print(): void {
    console.log(`    ==== ${this.account} ========================================================== `);
    for (let i = 0; i < this.transactions.length; i++) {
      const transaction: Transaction = this.transactions[i];

      const date: string = transaction.date; 
      const merchant: string = transaction.merchant.trim().substring(0, 40).padEnd(40, " ");
      let amount: string = transaction.amount.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});

      amount = transaction.amount >= 0 ? `\$${amount}` : `(\$${amount.slice(1)})`;
      console.log(`    ${date}  ${merchant}  ${amount}`);
    }
    console.log(`    ============================================================================ \n`);
  }
}
