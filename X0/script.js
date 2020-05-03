let table = document.getElementById('table');
let rows = table.children[0].children;
let message = document.getElementById('message')

let replay = document.getElementById('replay');

let table_array = [
['','',''],
['','',''],
['','','']
];

let step = 'x';

function setSign(sign, coord) {
    if(table_array[coord[0]][coord[1]] == '') {
        table_array[coord[0]][coord[1]] = sign;
        let cell = rows[coord[0]].children[coord[1]];
        cell.className = sign;
    }
}

function checkCell(coord) {
    if(table_array[coord[0]][coord[1]] == '') {
        return true;
    } else {
        return false;
    }
}

function checkTable() {
    //X-section
    if(table_array[0][0] == 'x' && table_array[0][1] == 'x' && table_array[0][2] == 'x') {
        return 'x';
    } else if(table_array[1][0] == 'x' && table_array[1][1] == 'x' && table_array[1][2] == 'x') {
        return 'x';
    } else if(table_array[2][0] == 'x' && table_array[2][1] == 'x' && table_array[2][2] == 'x') {
        return 'x';
    } else if(table_array[0][0] == 'x' && table_array[1][0] == 'x' && table_array[2][0] == 'x') {
        return 'x';
    } else if(table_array[0][1] == 'x' && table_array[1][1] == 'x' && table_array[2][1] == 'x') {
        return 'x';
    } else if(table_array[0][2] == 'x' && table_array[1][2] == 'x' && table_array[2][2] == 'x') {
        return 'x';
    } else if(table_array[0][0] == 'x' && table_array[1][1] == 'x' && table_array[2][2] == 'x') {
        return 'x';
    } else if(table_array[0][2] == 'x' && table_array[1][1] == 'x' && table_array[2][0] == 'x') {
        return 'x';
    }

    //O-section
    if(table_array[0][0] == 'o' && table_array[0][1] == 'o' && table_array[0][2] == 'o') {
        return 'o';
    } else if(table_array[1][0] == 'o' && table_array[1][1] == 'o' && table_array[1][2] == 'o') {
        return 'o';
    } else if(table_array[2][0] == 'o' && table_array[2][1] == 'o' && table_array[2][2] == 'o') {
        return 'o';
    } else if(table_array[0][0] == 'o' && table_array[1][0] == 'o' && table_array[2][0] == 'o') {
        return 'o';
    } else if(table_array[0][1] == 'o' && table_array[1][1] == 'o' && table_array[2][1] == 'o') {
        return 'o';
    } else if(table_array[0][2] == 'o' && table_array[1][2] == 'o' && table_array[2][2] == 'o') {
        return 'o';
    } else if(table_array[0][0] == 'o' && table_array[1][1] == 'o' && table_array[2][2] == 'o') {
        return 'o';
    } else if(table_array[0][2] == 'o' && table_array[1][1] == 'o' && table_array[2][0] == 'o') {
        return 'o';
    }
    let equal1 = table_array[0].some(function(x) {return x == ''});
    let equal2 = table_array[1].some(function(x) {return x == ''});
    let equal3 = table_array[2].some(function(x) {return x == ''});

    if(!equal1 && !equal2 && !equal3) {
        return 'xo';
    } else {
        return 0;
    }
}


replay.addEventListener('click', function(e) {
    location.href = location.href;
})

function stepF(e) {
    if(e.target.tagName == 'TD') {
        let coord = e.target.id.split('');
        if(checkCell(coord)) {
            setSign(step, coord);

            if(checkTable() == 'x' || checkTable() == 'o') {
                if(checkTable() == 'x') {
                    message.innerHTML = 'Победил крестик';
                    table.removeEventListener('click', stepF);
                    replay.style.display = 'block';
                } else {
                    message.innerHTML = 'Победил нолик';
                    table.removeEventListener('click', stepF);
                    replay.style.display = 'block';
                }
            } else if(checkTable() == 'xo') {
                message.innerHTML = 'Ничья';
                table.removeEventListener('click', stepF);
                replay.style.display = 'block';
            } else {
                step == 'x' ? step = 'o' : step = 'x';
                message.innerHTML = `Ход: ${step}`
            }

            
        }
    }
}

message.innerHTML = `Ход: ${step}`
table.addEventListener('click', stepF)