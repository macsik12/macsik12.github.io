let cells = document.querySelectorAll('.cell');
let canvas = document.getElementById('canvas');

let toolbar = document.getElementById('toolbar');

//Кнопки
let createBtn = document.getElementById('create_btn');
let brushBtn = document.getElementById('brush_btn');
let eraserBtn = document.getElementById('eraser_btn');
let fillBgBtn = document.getElementById('fillbg')

//Инпуты
let colorInp = document.getElementById('color_inp');


//Текущий инструмент
let tool = 'brush';


//Текущий цвет
let color = '#000';








//Обработчик события для закраски клетки
function fillCell(e, color) {
    e.preventDefault();
    if(e.buttons == 1) {
        e.target.style.backgroundColor = color;
    }
}






//Функция создания нового полотна (ширина, высота)
function createCanvas(width = 10, height = 10) {
        width = 10;
        height = 10;
        let result = '';
        for(let i = 0; i < height; i++) {
            result += '<div class="row">';
            for(let i = 0; i < width; i++) {
                result += '<div class="cell"></div>';
            }
            result += '</div>';
        }
        canvas.innerHTML = result;
        cells = document.querySelectorAll('.cell');


        if(tool == 'brush') {
            for(let cell of cells) {
                cell.addEventListener('mousemove', function(e) {
                    if(tool == 'brush') fillCell(e, color);
                    if(tool == 'eraser') fillCell(e, 'rgba(0,0,0,0)')
                });
                cell.addEventListener('mousedown', function(e) {
                    if(tool == 'brush') fillCell(e, color);
                    if(tool == 'eraser') fillCell(e, 'rgba(0,0,0,0)')
                });
            }
        }
}


//Кнопка Новый холст назначение обработчика собитыия
createBtn.addEventListener('click', createCanvas);


//Назначения обработчика для инпута цвета
colorInp.addEventListener('change', function(e) {
    color = colorInp.value;
    toolbar.style.backgroundColor = colorInp.value + '44';
})

//Назначение обработчика события для кнопки Кисть
brushBtn.addEventListener('click', function() {
    tool = 'brush';
    brushBtn.style.border = '3px solid #eee';
    eraserBtn.style.border = '3px solid darkgrey';
})

//Назначение обработчика для кнопки Резинка
eraserBtn.addEventListener('click', function() {
    tool = 'eraser';
    brushBtn.style.border = '3px solid darkgrey';
    eraserBtn.style.border = '3px solid #eee';
})

//Назначение обработчика для кнопки Заполнить цвет фоном
fillBgBtn.addEventListener('click', function() {
    canvas.style.backgroundColor = color;
})



//Действия при открытии
createCanvas()
color = colorInp.value;
toolbar.style.backgroundColor = colorInp.value;
toolbar.style.backgroundColor = colorInp.value + '44';
if(tool == 'eraser') {
    brushBtn.style.border = '3px solid darkgrey';
    eraserBtn.style.border = '3px solid #eee';
} else if(tool == 'brush') {
    brushBtn.style.border = '3px solid #eee';
    eraserBtn.style.border = '3px solid darkgrey';
}