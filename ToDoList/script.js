let ul = document.getElementById('ul');
let h1 = document.getElementById('title');

let checkers = document.getElementsByClassName('checker');

let addButton = document.getElementById('addButton');

let list = [];

let tasks = document.getElementsByClassName('task')


function slowPrint(elem, text) {
    let result = '';
    let length = text.length;
    let i = 0;
    let time = 200;
    let isBorder = true;
    elem.style.display = 'inline-block';
    setTimeout(function print() {
        if(i < length) {
            result += text[i];
            elem.innerHTML = result;
            i++;
            time = Math.floor(Math.random() * 300);
            setTimeout(print, time)
        }
    }, time)
    setInterval(function() {
        if(isBorder) {
            elem.style.borderRight = '2px solid silver';
            isBorder = false;
        } else {
            elem.style.borderRight = '0';
            isBorder = true;
        }
    }, 500)
}

slowPrint(h1, 'ToDo List')

function refreshTasksEvents() {
    let i = 0;
    for(let task of tasks) {
        console.log(task.children[1])
        task.children[1].onblur = function(e) {
            if(e.target.value.length != 0) {
                e.target.parentNode.editing = false;
                let newp = document.createElement('p');
                newp.innerHTML = e.target.value;
                e.target.replaceWith(newp)
                refreshTasksEvents();
            }
        }
        task.children[1].onkeypress = function(e) {
            if(e.keyCode == 13) {
                if(e.target.value.length != 0) {
                    e.target.parentNode.editing = false;
                    let newp = document.createElement('p');
                    newp.innerHTML = e.target.value;
                    e.target.replaceWith(newp)
                    refreshTasksEvents();
                }
            }
        }
        task.children[1].onclick = function(e) {
            if(!e.target.parentNode.editing) {
                let parent = e.target.parentNode;
                e.target.parentNode.editing = true;
                let newinp = document.createElement('input');
                newinp.value = e.target.innerHTML;
                e.target.replaceWith(newinp)
                refreshTasksEvents();
                parent.children[1].focus()
            }
        }

        task.children[0].onclick = function(e) {
            if(task.editing == false) {
                list.splice(i, 1);
                task.children[1].className = 'strike';
                task.children[0].style.backgroundColor = 'rgb(88, 130, 81)';
                setTimeout(function() {
                    task.remove();
                }, 1000)
            }
            
        }

        task.children[2].onclick = function(e) {
            list.splice(i, 1);
            task.remove();
        }
        i++;
    }
}

addButton.addEventListener('click', function() {
    addTodo();
    list[list.length - 1].children[1].focus();
})



// function refreshTasksEvents() {
//     for(let task of tasks) {
//         task.children[1].onblur = function(e) {
//             e.target.parentNode.editing = false;
//             e.target.outerHTML = `<p>${e.target.value}</p>`
//             refreshTasksEvents();
//         }
//         task.children[1].onclick = function(e) {
//             if(!e.target.parentNode.editing) {
//                 e.target.parentNode.editing = true;
//                 e.target.outerHTML = `<input value="${e.target.innerHTML}">`;
//                 refreshTasksEvents();
//                 console.log(e.target)
//             }
//         }
//     }
// }



function addTodo() {
    let li = document.createElement('li');
    li.innerHTML = `<div class="checker"></div><input maxlength="86"><div class="delete"></div>`;
    li.className = 'task';
    li.editing = true;
    ul.append(li);
    list.push(li);
    refreshTasksEvents()
}

function removeTodo(index) {
    list[index].remove();
    list.splice(index, 1);
}

addTodo()
