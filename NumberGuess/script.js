"use strict"


let difficult;
do {
difficult = +prompt(`Напиши какую сложность ты хочешь? Не меньше 1`);
} while(difficult < 1);



let randomNumber = Math.floor(Math.random() * (difficult + 1));


let result_img = document.getElementById('answer_img');
let result_p = document.getElementById('answer_p');

let guess_input = document.getElementById('guess_input');
let guess_button = document.getElementById('guess_button');
let repeat_button = document.getElementById('repeat_button');

let guesses = 0;

result_p.innerHTML = 'Число загадано';
console.log(randomNumber);
guess_button.onclick = function() {
    if(guess_input.value.length != 0) {
        let guess = Number(guess_input.value);
        if(isFinite(guess) && guess.length != 0) {
            guesses++;
            if(guess > randomNumber) {
                result_p.innerHTML = 'Меньше';
                result_img.src = 'lower.png';
            } else if(guess < randomNumber) {
                result_p.innerHTML = 'Больше';
                result_img.src = 'upper.png';
            } else if(guess == randomNumber) {
                let word = '';
                let guesses_str = String(guesses);
                if(+guesses_str > 9 && +guesses_str < 21) {
                    word = 'попыток';
                } else if(+guesses_str[guesses_str.length - 1] == 1) {
                    word = 'попытку';
                } else if(+guesses_str[guesses_str.length - 1] > 1 && +guesses_str[guesses_str.length - 1] < 5) {
                    word = 'попытки';
                } else if(+guesses_str[guesses_str.length - 1] > 4 && +guesses_str[guesses_str.length - 1] < 10 || +guesses_str[guesses_str.length - 1] == 0) {
                    word = 'попыток';
                }
                
                result_p.innerHTML = `Да! Это ${guess}.Ты угадал за ${guesses} ${word}`;
                result_img.src = 'win.png';
                repeat_button.style.display = 'inline';
                guess_button.style.display = 'none';
            }
        } else {
            result_p.innerHTML = 'Где число???';
        }
    } else {
        result_p.innerHTML = 'Где число???';
    }
}

repeat_button.onclick = function() {
    location.href = location.href;
}