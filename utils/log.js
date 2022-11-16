// This JS module provides functions to console-log 
//   with additional parameters to specify 
//   indentations and newlines

// Define size of indent (4 spaces)
const INDENT_SIZE = "    ";

// Regular console-log
function log(s="", _indents=0, _newlines=0) {
    let indents = INDENT_SIZE.repeat(_indents);
    let content = `${s}`;
    let newlines = "\n".repeat(_newlines);

    process.stdout.write(indents + content + newlines);
}

// Console-logs with a check symbol prepended
function done(s="", _indents=0, _newlines=0) {
    let indents = INDENT_SIZE.repeat(_indents);
    let content = `﫟 ${s}`;
    let newlines = "\n".repeat(_newlines);

    process.stdout.write(indents + content + newlines);
}

// Console-logs with an alert symbol preprended
function alert(s="", _indents=0, _newlines=0) {
    let indents = INDENT_SIZE.repeat(_indents);
    let content = `  ${s}`;
    let newlines = "\n".repeat(_newlines);

    process.stdout.write(indents + content + newlines);
}

// Console-logs with an error symbol preprended
function error(s="", _indents=0, _newlines=0) {
    let indents = INDENT_SIZE.repeat(_indents);
    let content = `  ${s}`;
    let newlines = "\n".repeat(_newlines);

    process.stdout.write(indents + content + newlines);
}

module.exports = {
    log,
    done,
    alert,
    error,
};

