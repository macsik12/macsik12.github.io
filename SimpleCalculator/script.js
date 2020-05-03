let answer = document.getElementById('answer_label');
let buttons = document.querySelectorAll('input[type="button"]');

let input1 = document.getElementById('num1_Inp');
let input2 = document.getElementById('num2_Inp');

for(let button of buttons) {
    if(button.getAttribute('value') == '+') {
        button.onclick = function(){
            answer.innerHTML = +input1.value + +input2.value;
        }
    } else if(button.getAttribute('value') == '-') {
        button.onclick = function(){
            answer.innerHTML = +input1.value - +input2.value;
        }
    } else if(button.getAttribute('value') == '*') {
        button.onclick = function(){
            answer.innerHTML = +input1.value * +input2.value;
        }
    } else if(button.getAttribute('value') == '/') {
        button.onclick = function(){
            answer.innerHTML = +input1.value / +input2.value;
        }
    } else if(button.getAttribute('value') == '%') {
        button.onclick = function(){
            answer.innerHTML = +input1.value % +input2.value;
        }
    } else if(button.getAttribute('value') == '**') {
        button.onclick = function(){
            answer.innerHTML = Math.pow(+input1.value, +input2.value);
        }
    } else if(button.getAttribute('value') == '/%') {
        button.onclick = function(){
            answer.innerHTML = `${Math.floor(input1.value / input2.value)} (Остаток: ${input1.value % input2.value})`;
        }
    }
}