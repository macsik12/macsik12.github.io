"use strict"

let expression_element = document.getElementById('expression');
let result_element = document.getElementById('result');

let buttons = document.querySelectorAll('.buttons td');

let dotAvailable = true;

function addSymbolToExpression(symbol) {
    expression_element.innerHTML = expression_element.innerHTML + symbol;
}

function resetDot() {
    for(let char of expression_element.innerHTML) {
        if(char == '.') {
            dotAvailable = false;
        } else if (isOperator(char)) {
            dotAvailable = true;
        }
    }
    if(expression_element.innerHTML.length == 0) {
        dotAvailable = true;
    }

}

function getExpression() {
    return expression_element.innerHTML;
}

function isOperator(symbol) {
    return symbol == '-' || symbol == '+' || symbol == '×' || symbol == '÷';
}

function isExpOperator(symbol) {
    return symbol == '-' || symbol == '+' || symbol == '*' || symbol == '/';
}

function parseExpression(expression) {
    let result = '';
    for(let sym of expression) {
        if(sym == '×') result += '*';
        else if(sym == '÷') result += '/';
        else result += sym;
    }
    if(result[result.length - 1] == '*' || result[result.length - 1] == '/' || result[result.length - 1] == '-' || result[result.length - 1] == '+') {
        return result.slice(0, -1);
    }
    return result;
}

function execExpression(expression) {
    let exp = parseExpression(expression);
    return eval(exp);
}



for(let button of buttons) {
    if(button.getAttribute('type') == 'number') {
        button.onclick = function() {
            let lastSymbol;
            if(expression_element.innerHTML.length > 1) {
                lastSymbol = expression_element.innerHTML.charAt(expression_element.innerHTML.length - 1);
            } else {
                lastSymbol = expression_element.innerHTML;
            }
            if(!(button.innerHTML == '0' && (expression_element.innerHTML.length == 0 || lastSymbol == '÷' || lastSymbol == '×' || lastSymbol == '+' || lastSymbol == '-'))) {
                addSymbolToExpression(button.innerHTML);
                result_element.innerHTML = execExpression(expression_element.innerHTML);
            }
            resetDot();
        }
    } else if(button.getAttribute('type') == 'operator') {
        button.onclick = function() {
            if(isOperator(expression_element.innerHTML[expression_element.innerHTML.length - 1])) {
                expression_element.innerHTML = expression_element.innerHTML.slice(0, -1);
                addSymbolToExpression(button.innerHTML);
            } else {
                addSymbolToExpression(button.innerHTML);
            }
            resetDot();
        }
    } else if(button.getAttribute('type') == 'backspace') {
        button.onclick = function() {
            let lastSymbol;
            let preLastSymbol;
            if(expression_element.innerHTML.length > 1) {
                lastSymbol = expression_element.innerHTML.charAt(expression_element.innerHTML.length - 1);
                preLastSymbol = expression_element.innerHTML.charAt(expression_element.innerHTML.length - 2);
            } else {
                lastSymbol = expression_element.innerHTML;
            }
            if(lastSymbol == '.' && preLastSymbol == '0') {
                expression_element.innerHTML = expression_element.innerHTML.slice(0, -2);
            } else {
                expression_element.innerHTML = expression_element.innerHTML.slice(0, -1);
            }
            result_element.innerHTML = execExpression(expression_element.innerHTML);
            resetDot();
        }
    } else if(button.getAttribute('type') == 'equal') {
        button.onclick = function() {
            if(isFinite(execExpression(expression_element.innerHTML))) {
             expression_element.innerHTML = execExpression(expression_element.innerHTML);
             result_element.innerHTML = '';
            } else {
             expression_element.innerHTML = '';
             result_element.innerHTML = '';
            }
        }
    } else if(button.getAttribute('type') == 'ac') {
        button.onclick = function() {
            result_element.innerHTML = '';
            expression_element.innerHTML = '';
        }
    } else if(button.getAttribute('type') == 'ce') {
        button.onclick = function() {
            result_element.innerHTML = '';
        }
    } else if(button.getAttribute('type') == 'dot') {
        button.onclick = function() {
            console.log(dotAvailable);
            console.log(expression_element.innerHTML)
            if(dotAvailable) {
                let lastSymbol;
                if(expression_element.innerHTML.length > 1) {
                    lastSymbol = expression_element.innerHTML.charAt(expression_element.innerHTML.length - 1);
                } else {
                    lastSymbol = expression_element.innerHTML;
                }
                if(expression_element.innerHTML.length == 0) {
                    addSymbolToExpression('0.');
                } else if(isOperator(lastSymbol)) {
                    addSymbolToExpression('0.');
                } else if(lastSymbol == '.') {
                    
                } else {
                    addSymbolToExpression('.')
                }
            }
            resetDot();
        }
    }
}

