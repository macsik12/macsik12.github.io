let canvas = document.getElementById('canvas');

let widthInp = document.getElementById('widthInp');
let heightInp = document.getElementById('heightInp');
let createBtn = document.getElementById('createNewCanvas');
let colorInp = document.getElementById('colorInp');

let toolButtons = document.querySelectorAll('.tools button');

let currentTool = 'brush';
let currentColor = colorInp.value;

let colorHistory = document.getElementById('colorHistory');

let pastColor;

function addColorInHistory(color) {
    let newColor = document.createElement('div')
    if(pastColor != color) {
        newColor.className = 'clr';
        newColor.dataset.color = color;
        newColor.style.backgroundColor = color;
        if (colorHistory.children.length == 8) {
            colorHistory.children[7].remove();
        }
        newColor.onclick = function () {
            currentColor = color;
            colorInp.value = color;
        }
        colorHistory.prepend(newColor);
        pastColor = color;
    }
}


let xText = document.getElementById('x');
let yText = document.getElementById('y');

function hexPlus(hexChar) {
    let hexChars = ['0' ,'1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'f'];
    return hexChars[hexChars.indexOf(hexChar) + 1];
}

function hexRandom() {
    let hexChars = ['0' ,'1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'f'];
    return hexChars[Math.floor(Math.random() * hexChars.length)];
}

function hexColorRandom() {
    return `#${hexRandom()}${hexRandom()}${hexRandom()}${hexRandom()}${hexRandom()}${hexRandom()}`
}

function hexColorPlus(hexColor) {
    return `#${hexPlus(hexColor[1])}${hexPlus(hexColor[2])}${hexPlus(hexColor[3])}${hexPlus(hexColor[4])}${hexPlus(hexColor[5])}${hexPlus(hexColor[6])}`
}

function hexMinus(hexChar) {
    let hexChars = ['0' ,'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    return hexChars[hexChars.lastIndexOf(hexChar) - 1];
}

function hexColorMinus(hexColor) {
    return `#${hexMinus(hexColor[1])}${hexMinus(hexColor[2])}${hexMinus(hexColor[3])}${hexMinus(hexColor[4])}${hexMinus(hexColor[5])}${hexMinus(hexColor[6])}`
}




//Создание canvas
function createCanvas(width, height) {
    let result = '';
    for(let i = 0; i < height; i++) {
        result += '<div class="row">';
        for(let ix = 0; ix < width; ix++) {
            result += `<div class="pixel" data-y="${i}" data-x="${ix}"></div>`;
        }
        result += '</div>';
    }
    canvas.innerHTML = result;
    let pixels = document.getElementsByClassName('pixel');
    for(let pixel of pixels) {
        let w = 100 / width;
        pixel.style.width = w + '%';
        let styles = getComputedStyle(pixel);
        console.log(styles.width)
        pixel.style.height = styles.width;
    }
    for(let pixel of pixels) {
        pixel.addEventListener('mouseover', function(e) {
            e.preventDefault();
            xText.innerHTML = pixel.dataset.x;
            yText.innerHTML = pixel.dataset.y;
            if(e.buttons == 1) {
                if (currentTool == 'brush') {
                    pixel.style.backgroundColor = currentColor;
                    pixel.dataset.color = currentColor;
                } else if(currentTool == 'clearer') {
                    pixel.style.backgroundColor = '#fff';
                    pixel.dataset.color = '#ffffff';
                } else if(currentTool == 'lighting') {
                    if(pixel.dataset.color != undefined) {
                        pixel.dataset.color = hexColorPlus(pixel.dataset.color);
                        pixel.style.backgroundColor = pixel.dataset.color;
                    }
                } else if(currentTool == 'darking') {
                    if(pixel.dataset.color != undefined) {
                        pixel.dataset.color = hexColorMinus(pixel.dataset.color);
                        pixel.style.backgroundColor = pixel.dataset.color;
                    } else {
                        pixel.dataset.color = hexColorMinus('#ffffff');
                        pixel.style.backgroundColor = pixel.dataset.color;
                    }
                } else if(currentTool == 'randomizer') {
                    let rcolor = hexColorRandom();
                    pixel.style.backgroundColor = rcolor;
                    pixel.dataset.color = rcolor;
                }
            }
        });
        pixel.addEventListener('mousedown', function(e) {
            e.preventDefault();
            if(e.buttons == 1) {
                if (currentTool == 'brush') {
                    pixel.style.backgroundColor = currentColor;
                    pixel.dataset.color = currentColor;
                } else if(currentTool == 'clearer') {
                    pixel.style.backgroundColor = '#fff';
                    pixel.dataset.color = '#ffffff';
                } else if(currentTool == 'lighting') {
                    if(pixel.dataset.color != undefined) {
                        pixel.dataset.color = hexColorPlus(pixel.dataset.color);
                        pixel.style.backgroundColor = pixel.dataset.color;
                    }
                } else if(currentTool == 'darking') {
                    if(pixel.dataset.color != undefined) {
                        pixel.dataset.color = hexColorMinus(pixel.dataset.color);
                        pixel.style.backgroundColor = pixel.dataset.color;

                    } else {
                        pixel.dataset.color = hexColorMinus('#ffffff');
                        pixel.style.backgroundColor = pixel.dataset.color;
                    }
                } else if(currentTool == 'colorpicker') {
                    if(pixel.dataset.color) {
                        colorInp.value = pixel.dataset.color;
                        currentColor = pixel.dataset.color;
                        addColorInHistory(pixel.dataset.color);
                    } else {
                        colorInp.value = '#ffffff';
                        currentColor = '#ffffff';
                        addColorInHistory('#ffffff')
                    }
                } else if(currentTool == 'randomizer') {
                    let rcolor = hexColorRandom();
                    pixel.style.backgroundColor = rcolor;
                    pixel.dataset.color = rcolor;
                }
            }
        })
    }
}

function changeColor(color) {
    currentColor = color;
    addColorInHistory(color)
}

createBtn.addEventListener('click', function() {
    if(widthInp.value <= 70) {
        createCanvas(widthInp.value, widthInp.value)
    }
})

colorInp.addEventListener('change', function () {
    changeColor(colorInp.value)
})
let pastTool = toolButtons[0];
function changeTool(button) {
    console.log(button)
    if(pastTool) {
        pastTool.className = '';
    }
    currentTool = button.dataset.tool;
    button.className = 'selected';
    pastTool = button;
}

for(let button of toolButtons) {
    button.onclick = function() {
        changeTool(button);
    };
}







