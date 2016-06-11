function findOperator(stack) {
    var foundOps = {};

    var prec = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2
    };

    var pos, op, highestPrec = 0;

    for(var i=0; i<stack.length; i++) {
        var token = stack[i];
        if(prec[token] && prec[token] > highestPrec) {
            op = token;
            highestPrec = prec[token];
            pos = i;
        }
    }

    return pos;

}

function isNumber(num) {
    return !isNaN(num);
}

function isOp(ch) {
    return "+-/*".indexOf(ch) > -1;
}

function isParens(ch) {
    return "( )".indexOf(ch) > -1;
}

function convertToStack(str) {
    var stack = [];
    var current = "";
    for(var i=0; i<str.length; i++) {
        var ch = str[i];
        if(isNumber(ch) || current === "" && ch === '-') {
            current += ch;
        } else if(isOp(ch) || isParens(ch)) {
            if(current) stack.push(current);
            current = "";
            stack.push(ch);
        }
    }
    if(current) stack.push(current);
    return stack;
}

function simplifyStack(simpStack) {
    var opHash = {
        "+": "add",
        "-": "sub",
        "*": "multiply",
        "/": "divide"
    };
    var num1 = simpStack[0],
        num2 = simpStack[2],
        op = opHash[simpStack[1]];
    return calculate(num1, num2, op);
}

function replace(stack, index) {
    // arr.splice(index, 0, item); will insert item into arr at the specified index.
    var simp = stack.splice(index-1, 3);
    var answer = simplifyStack(simp) ;// testing for now
    stack.splice(index-1, 0, answer);
    return stack;
}

function recurse(stack) {
    var highestOp = findOperator(stack);
    if(highestOp === undefined) {
        return Number(stack[0]);
    }

    var firstParen = stack.indexOf("(");
    if(firstParen > -1) {
        var lastParen = stack.lastIndexOf(")");
        // read docs on splice
        var parens = stack.splice(firstParen, lastParen-firstParen+1);
        parens.pop(); parens.shift();
        stack.splice(firstParen, 0, recurse(parens));
        return recurse(stack);
    }

    var simplified = replace(stack, highestOp);

    return recurse(simplified);
}


function calculate(x, y, op) {
    return {
        "add": function(x,y) {return x+y; },
        "sub": function(x,y) {return x-y; },
        "multiply": function(x,y) {return x*y; },
        "divide": function(x,y) {return x/y; }
    }[op](Number(x), Number(y));
}


function calcExpression(str) {
    // Remove spaces
    str = str.replace(/(\s+)/g, '');
    var stack = convertToStack(str);

    return recurse(stack);
}
