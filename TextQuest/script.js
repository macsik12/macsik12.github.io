let text = document.getElementById('text');

let btn1 = document.getElementById('way1');
let btn2 = document.getElementById('way2');


let quest = {
    text: 'Начало',
    way1: {
        type: 'node',
        button: 'Путь 1',
        text: 'Вошёл в путь 1',
        way1: {
            type: 'end',
            button: 'Конец',
            text: 'Конец'
        },
        way2: {
            type: 'end',
            button: 'Конец 2',
            text: 'Второй конец'
        }
    },
    way2: {
        type: 'end',
        button: 'Конец',
        text: 'Конец'
    }
}

let current_place = quest;
text.innerHTML = current_place.text;
btn1.innerHTML = current_place.way1.button;
btn2.innerHTML = current_place.way2.button;

function update(way) {
    if(way == 'way1') {
        current_place = current_place.way1;
        if(current_place.type == 'node') {
            text.innerHTML = current_place.text;
            btn1.innerHTML = current_place.way1.button;
            btn2.innerHTML = current_place.way2.button;
        } else {
            text.innerHTML = current_place.text;
            btn1.style.display = 'none';
            btn2.style.display = 'none';
        }
        
    } else if(way == 'way2') {
        current_place = current_place.way2;
        if(current_place.type == 'node') {
            text.innerHTML = current_place.text;
            btn1.innerHTML = current_place.way1.button;
            btn2.innerHTML = current_place.way2.button;
        } else {
            text.innerHTML = current_place.text;
            btn1.style.display = 'none';
            btn2.style.display = 'none';
        }
    }
}

btn1.onclick = function() {
    update('way1')
}

btn2.onclick = function() {
    update('way2')
}
