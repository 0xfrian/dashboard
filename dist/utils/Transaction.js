"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transaction {
    constructor(_date = "", _merchant = "", _amount = 0) {
        this.date = _date;
        this.merchant = _merchant;
        this.amount = _amount;
    }
}
exports.default = Transaction;
