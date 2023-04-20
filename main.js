const green = [
    { reg: /let /g, out: "let " },
    { reg: / this/g, out: " this" },
    { reg: /elif /g, out: "elif " },
    { reg: /if /g, out: "if " },
    { reg: /else/g, out: "else" },
    { reg: /switch /g, out: "switch " },
    { reg: /while /g, out: "while " },
    { reg: /loop/g, out: "loop" },
    { reg: /foreach/g, out: "foreach" },
    { reg: /for/g, out: "for" },
    { reg: /select /g, out: "select " },
    { reg: / do /g, out: " do " },
    { reg: / dobr /g, out: " dobr " },
    { reg: / dore /g, out: " dore " },
    { reg: / doco /g, out: " doco " },
    { reg: / doremi /g, out: " doremi " },
    { reg: / from /g, out: " from " },
    { reg: / in /g, out: " from " },
    { reg: / until /g, out: " from " },
];
function green_format(value) {
    return `<span class="key2">${value}</span>`;
}
const red = [
    { reg: /fn /g, out: "fn " },
    { reg: /class /g, out: "class " },
    { reg: /struct /g, out: "struct " },
    { reg: /[^_]enum /g, out: "enum " },
    { reg: /return/g, out: "return" },
    { reg: /case /g, out: "case " },
    { reg: /get /g, out: "get " },
    { reg: /inc /g, out: "inc " },
    { reg: /use /g, out: "use " },
    { reg: /(\w*)\(/g, out: "$1", ext: "(" },
    { reg: /(\-)(\d)/g, out: "$1", ext: "$2" },
];
function red_format(value) {
    return `<span class="key1">${value}</span>`;
}
const blue = [
    { reg: /([A-Z][A-z]*)/g, out: "$1" },
    { reg: / int/g, out: " int" },
    { reg: / string/g, out: " string" },
    { reg: / vector/g, out: " vector" },
    { reg: / double/g, out: " double" },
    { reg: / float/g, out: " float" },
    { reg: / char/g, out: " char" },
    { reg: / short/g, out: " short" },
    { reg: / bool/g, out: " bool" },
    { reg: / auto/g, out: " auto" },
];
function blue_format(value) {
    return `<span class="key3">${value}</span>`;
}
const yellow = [
    { reg: /break/g, out: "break" },
    { reg: /default/g, out: "default" },
    { reg: /pub[\s]/g, out: "pub " },
    { reg: / true/g, out: " true" },
    { reg: / false/g, out: " false" },
    { reg: /\+/g, out: "+"},
];
function yellow_format(value) {
    return `<span class="key4">${value}</span>`;
}

code_format();
function code_format() {
    var code_blocks = document.getElementsByClassName("code");
    for (var i = 0; i < code_blocks.length; i++) {
        render(code_blocks[i]);
    }
}

function render(block) {
    var code = block.innerHTML;
    code = code.replace(/\"([^\"]*)\"/g, '"<span class="key2">$1</span>"');
    code = code.replace(/\'([^\"]*)\'/g, "<span class='key3'>'$1'</span>");
    green.forEach((statement) => {
        var formatted = green_format(statement.out);
        formatted += statement.ext ? statement.ext : "";
        code = code.replace(statement.reg, formatted);
    });
    red.forEach((statement) => {
        var formatted = red_format(statement.out);
        formatted += statement.ext ? statement.ext : "";
        code = code.replace(statement.reg, formatted);
    });
    blue.forEach((statement) => {
        var formatted = blue_format(statement.out);
        formatted += statement.ext ? statement.ext : "";
        code = code.replace(statement.reg, formatted);
    });
    yellow.forEach((statement) => {
        var formatted = yellow_format(statement.out);
        formatted += statement.ext ? statement.ext : "";
        code = code.replace(statement.reg, formatted);
    });
    code = code.replace(/(\/\/.*)/g, '<span class="key0">$1</span>');
    block.innerHTML = code;
    var green_stuff = document.getElementsByClassName("key2");
    for (var i = 0; i < green_stuff.length; i++) {
        var eles = green_stuff[i].getElementsByClassName("key1");
        for (var j = 0; j < eles.length; j++) {
            eles[j].className = "key2";
        }
        eles = green_stuff[i].getElementsByClassName("key3");
        for (var j = 0; j < eles.length; j++) {
            eles[j].className = "key2";
        }
        eles = green_stuff[i].getElementsByClassName("key0");
        for (var j = 0; j < eles.length; j++) {
            eles[j].className = "key2";
        }
        eles = green_stuff[i].getElementsByClassName("key4");
        for (var j = 0; j < eles.length; j++) {
            eles[j].className = "key2";
        }
    }
    var comment_stuff = document.getElementsByClassName("key0");
    for (var i = 0; i < comment_stuff.length; i++) {
        var eles = comment_stuff[i].getElementsByClassName("key1");
        for (var j = 0; j < eles.length; j++) {
            eles[j].className = "key0";
        }
        eles = comment_stuff[i].getElementsByClassName("key2");
        for (var j = 0; j < eles.length; j++) {
            eles[j].className = "key0";
        }
        eles = comment_stuff[i].getElementsByClassName("key3");
        for (var j = 0; j < eles.length; j++) {
            eles[j].className = "key0";
        }
        eles = comment_stuff[i].getElementsByClassName("key4");
        for (var j = 0; j < eles.length; j++) {
            eles[j].className = "key0";
        }
    }
}