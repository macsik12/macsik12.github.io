"use strict"

let message = document.getElementById('messageArea');
let fireButton = document.getElementById('fireButton');
let guessInput = document.getElementById('guessInput');

let view = {
    displayMessage: function(msg) {
        message.innerHTML = msg;
    },
    displayHit: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
    },
    displayMiss: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
    }
}


let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [
        {locations: ['0', '0', '0'], hits: ['', '', '']},
        {locations: ['0', '0', '0'], hits: ['', '', '']},
        {locations: ['0', '0', '0'], hits: ['', '', '']}
    ],

    fire(guess) {
        
        for(let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let locations = ship.locations;
            let index = locations.indexOf(guess);
            if(index >= 0) {
                if(ship.hits[index] != 'hit') {
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayMessage('Попадание!');
                if(this.isSunk(ship)) {
                    this.shipsSunk++;
                    view.displayMessage(`Корабль потоплен. ${this.shipsSunk}/3 кораблей потоплено`);
                }
                
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage('Промах');
        return false;
    },

    isSunk(ship) {
        for(let i = 0; i < this.shipLength; i++) {
            if(ship.hits[i] !== 'hit') return false;
        }
        return true;
    },

    generateShipLocations() {
        let locations;
        for(let i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while(this.collision(locations));
            this.ships[i].locations = locations;
        }
    },
    generateShip() {
        let direction = Math.floor(Math.random() * 2);
        let row, col;

        if(direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - 3));
        } else {
            col = Math.floor(Math.random() * this.boardSize);
            row = Math.floor(Math.random() * (this.boardSize - 3));
        }

        let newShipLocations = [];
        for(let i = 0; i < this.shipLength; i++) {
            if(direction === 1) {
                newShipLocations.push(row + '' + (col + i));
            } else {
                newShipLocations.push((row + i) + '' + col);
            }
        }
        return newShipLocations;
    },
    collision(locations) {
        for(let i = 0; i < this.numShips; i++) {
            let ship = model.ships[i];
            for(let j = 0; j < location.length; j++) {
                if(ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
}

function parseGuess(guess) {
    let alphabet = ['A','B','C','D','E','F','G'];

    if(guess === null || guess.length !== 2) {
        view.displayMessage('Неправильный ввод');
    } else {
        let firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);

        if(isNaN(row) || isNaN(column)) {
            view.displayMessage('Неправильный ввод');
        } else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            view.displayMessage('Неверный ввод');
        } else {
            return row + column;
        }
    }
    return null;
}


let controller = {
    guesses: 0,

    processGuess: function(guess) {
        let location = parseGuess(guess);
        if(location) {
            this.guesses++;
            let hit = model.fire(location);
            if(hit && model.shipsSunk === model.numShips) {
                view.displayMessage(`Все корабли потоплены за ${this.guesses} попыток.`)
            }
        }
    }
}

function handleFireButton() {
    let guess = guessInput.value;
    controller.processGuess(guess);

    guessInput.value = '';
}

fireButton.onclick = handleFireButton;
guessInput.onkeypress = function(e) {
    if(e.keyCode == 13) {
        fireButton.click();
        return false;
    }
}


let cells = document.querySelectorAll('td');
for(let cell of cells) {
    cell.onclick = function() {
        let guess = cell.id;
        model.fire(guess);
    }
}

model.generateShipLocations();
