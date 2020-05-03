let nod_text = document.getElementById('result_nod');
let nok_text = document.getElementById('result_nok');

let calc_btn = document.getElementById('calc_btn');
let delete_last_btn = document.getElementById('delete_last');
let delete_all_btn = document.getElementById('delete_all')

let number_inp = document.getElementById('number_inp');
let add_btn = document.getElementById('add_btn');

let number_list = document.getElementById('number-list');

let message_text = document.getElementById('message');

let numbers = [];


function setNod(num) {
    nod_text.innerHTML = num;
}

function setNok(num) {
    nok_text.innerHTML = num;
}

// function NOD(array) {
//     for(let i = Math.min(...array); i > 0; i--) {
//         if(array.every(elem => elem % i == 0)) {
//             return i;
//         }
//     }
// }

// function NOK(array) {
//     return array.reduce((prev, curr) => prev * curr) / NOD(array);
// }

//!ФУНКЦИИ КОТОРЫЕ Я НАШЁЛ В ИНТЕРНЕТЕ ДЛЯ НОД И НОК
function NOK(A)
{   
    var  n = A.length, a = Math.abs(A[0]);
    for (var i = 1; i < n; i++)
     { var b = Math.abs(A[ i ]), c = a;
       while (a && b){ a > b ? a %= b : b %= a; } 
       a = Math.abs(c*A[ i ])/(a+b);
     }
    return a;
}
function NOD(A)
{   
    var n = A.length, x = Math.abs(A[0]);
    for (var i = 1; i < n; i++)
     { var y = Math.abs(A[ i ]);
       while (x && y){ x > y ? x %= y : y %= x; }
       x += y;
     }
    return x;
}






function setMessage(text, type = 'info') {
    message_text.innerHTML = text;
    if(type == 'info') {
        message_text.style.backgroundColor = 'rgb(15, 151, 214)';
        message_text.style.color = '#ddd';
    } else if(type == 'warn') {
        message_text.style.backgroundColor = 'rgb(212, 199, 5)';
        message_text.style.color = '#a33';
    } else if(type == 'error') {
        message_text.style.backgroundColor = 'rgb(202, 29, 29)';
        message_text.style.color = '#ddd';
    } else if(type == 'success') {
        message_text.style.backgroundColor = 'rgb(41, 153, 41)';
        message_text.style.color = '#ddd';
    }
}

add_btn.onclick = function() {
    let num = +number_inp.value;
    if(isFinite(num)) {
        if(numbers.length < 34) {
            number_list.insertAdjacentHTML('afterbegin', `<li>${num}</li>`);
            numbers.push(num);
            setMessage(`Добавлено: ${num}`, 'success');
        } else if(numbers.length >= 34) {
            setMessage(`Недостаточно места!`, 'warn');
        }
        
    } else {
        setMessage('Неверный ввод', 'error');
        console.log(num)
    }
}


calc_btn.onclick = function() {
    if(numbers.length != 0) {
        setNod(NOD(numbers));
        setNok(NOK(numbers));
        setMessage('Выполнено!', 'success');
    } else if(numbers.length == 0) {
        setMessage('Нет данных', 'warn');
        setNod(0);
        setNok(0);
    }
}

delete_all_btn.onclick = function() {
    numbers.length = 0;
    number_list.innerHTML = '';
    setNod('');
    setNok('');
    setMessage('Очищено', 'info');
}

delete_last_btn.onclick = function() {
    numbers.pop();
    number_list.firstElementChild.remove();
    setMessage('Удалено', 'info')
}