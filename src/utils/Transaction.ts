export default class Transaction {
  date: string;
  merchant: string; 
  amount: number;

  constructor(_date: string = "", _merchant: string = "", _amount: number = 0) {
    this.date = _date;
    this.merchant = _merchant; 
    this.amount = _amount;
  }
}
