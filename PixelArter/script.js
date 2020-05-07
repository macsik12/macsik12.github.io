let cells = document.querySelectorAll('.cell');
let canvas = document.getElementById('canvas');

let toolbar = document.getElementById('toolbar');

//Кнопки
let createBtn = document.getElementById('create_btn');
let brushBtn = document.getElementById('brush_btn');
let eraserBtn = document.getElementById('eraser_btn');
let fillBgBtn = document.getElementById('fillbg');
let pickerBtn = document.getElementById('picker_btn');

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


var rgbToHex = function (rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
};

var fullColorHex = function(r,g,b) {   
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red+green+blue;
};





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
                    if(tool == 'eraser') fillCell(e, 'rgba(255,255,255,0)');
                });
                cell.addEventListener('mousedown', function(e) {
                    if(tool == 'brush') fillCell(e, color);
                    if(tool == 'eraser') fillCell(e, 'rgba(255,255,255,0)');
                    if(tool == 'picker') {
                        let clr = e.target.style.backgroundColor;
                        console.log(clr)
                        if(clr != '') {
                            clr = clr.slice(4, -1);
                            clr = clr.split(',');
                            for(let i = 0; i < clr.length; i++) {
                                clr[i] = +clr[i];
                            }
                            colorInp.value = '#' + fullColorHex(clr[0], clr[1], clr[2]);
                        } else {
                            colorInp.value = '#ffffff'
                        }

                    };
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
    pickerBtn.style.border = '3px solid darkgrey'
})

//Назначение обработчика для кнопки Резинка
eraserBtn.addEventListener('click', function() {
    tool = 'eraser';
    brushBtn.style.border = '3px solid darkgrey';
    eraserBtn.style.border = '3px solid #eee';
    pickerBtn.style.border = '3px solid darkgrey'
})

//Назначение обработчика для кнопки Заполнить цвет фоном
fillBgBtn.addEventListener('click', function() {
    canvas.style.backgroundColor = color;
})


//Назначение обработчика для кнопки Пипетка
pickerBtn.addEventListener('click', function() {
    tool = 'picker';
    pickerBtn.style.border = '3px solid #eee'
    brushBtn.style.border = '3px solid darkgrey';
    eraserBtn.style.border = '3px solid darkgrey';
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
