import treeify, { TreeObject } from "treeify";

export default class Logger {
  indent: string;

  constructor(spaces: number = 2) {
    this.indent = " ".repeat(spaces);
  }

  // Regular console-logging
  log(s: string = "", _indents: number = 0, _newlines: number = 0): void {
    let indents: string = this.indent.repeat(_indents);
    let content: string = `${s}`;
    let newlines: string = "\n".repeat(_newlines);

    process.stdout.write(indents + content + newlines);
    return;
  }

  // Console-logs with a check symbol prepended
  done(s: string = "", _indents: number = 0, _newlines: number = 0): void {
    let indents: string = this.indent.repeat(_indents);
    let content: string = `﫟 ${s}`;
    let newlines: string = "\n".repeat(_newlines);

    process.stdout.write(indents + content + newlines);
    return;
  }

  // Console-logs with an alert symbol preprended
  alert(s: string = "", _indents: number = 0, _newlines: number = 0): void {
    let indents: string = this.indent.repeat(_indents);
    let content: string = `  ${s}`;
    let newlines: string = "\n".repeat(_newlines);

    process.stdout.write(indents + content + newlines);
    return;
  }

  // Console-logs with an error symbol preprended
  error(s: string = "", _indents: number = 0, _newlines: number = 0): void {
    let indents: string = this.indent.repeat(_indents);
    let content: string = `  ${s}`;
    let newlines: string = "\n".repeat(_newlines);

    process.stdout.write(indents + content + newlines);
    return;
  }

  // Console-logs tree structure of given JSON object
  tree(obj: TreeObject = {}): void {
    let tree: string = treeify.asTree(obj, true, false);
    console.log(tree);
  }
}
