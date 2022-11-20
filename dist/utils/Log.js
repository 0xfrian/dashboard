"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const treeify_1 = __importDefault(require("treeify"));
class Logger {
    constructor(spaces = 2) {
        this.indent = " ".repeat(spaces);
    }
    // Regular console-logging
    log(s = "", _indents = 0, _newlines = 0) {
        let indents = this.indent.repeat(_indents);
        let content = `${s}`;
        let newlines = "\n".repeat(_newlines);
        process.stdout.write(indents + content + newlines);
        return;
    }
    // Console-logs with a check symbol prepended
    done(s = "", _indents = 0, _newlines = 0) {
        let indents = this.indent.repeat(_indents);
        let content = `﫟 ${s}`;
        let newlines = "\n".repeat(_newlines);
        process.stdout.write(indents + content + newlines);
        return;
    }
    // Console-logs with an alert symbol preprended
    alert(s = "", _indents = 0, _newlines = 0) {
        let indents = this.indent.repeat(_indents);
        let content = `  ${s}`;
        let newlines = "\n".repeat(_newlines);
        process.stdout.write(indents + content + newlines);
        return;
    }
    // Console-logs with an error symbol preprended
    error(s = "", _indents = 0, _newlines = 0) {
        let indents = this.indent.repeat(_indents);
        let content = `  ${s}`;
        let newlines = "\n".repeat(_newlines);
        process.stdout.write(indents + content + newlines);
        return;
    }
    // Console-logs tree structure of given JSON object
    tree(obj = {}) {
        let tree = treeify_1.default.asTree(obj, true, false);
        console.log(tree);
    }
}
exports.default = Logger;
