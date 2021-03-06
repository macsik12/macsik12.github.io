let send_btn = document.getElementById('send_button');
let text_inp = document.getElementById('text_input');
let messages_block = document.getElementById('messages');
let blackcheck = document.getElementById('blackbox');
let all_messages = document.getElementsByClassName('chip');
let contextMenu = document.getElementById('contextMenu');
if(device.desktop()) {
document.body.style.overflow = 'hidden';
}
let context_delete = document.getElementById('context_delete');
let pastChip = document.createElement('div');

function randomName() {
    let actualNames = ['Максим', 'Егор', 'витя', 'магамед', 'Автандил', 'Полина', 'Лиза', 'Игорь', 'Алексей', 'Кто-то', 'Аниним', 'аня', 'Mister X', 'Missis X', 'Софа', 'Ольга', 'Денис'];
    return actualNames[Math.floor(Math.random() * actualNames.length)];
}

function randomPhrase() {
    let who = ['Я', 'Учитывая общую обстановку, я', 'Никого не слушая, я', 'Тупея на глазах, я', 'А вот я', 'Кстати я', 'Деградирую я... И', 'Вы все знаете что я', 'Я думаю, что я', 'Вы думали что я', 'Вообщем я', 'Я', 'Я', 'Я', 'Я', 'Я', 'Я', 'Я', 'Знайте все, я', 'Напишу о себе: Я','О себе напишу сюда: Я', 'Теперь вы знаете что я'];
    let doing = ['списываю дз', 'смотрю зомбоящик', 'смотрю в окно', 'туплю', 'умнею', 'вижу тебя', 'думаю о прошлом', 'романтизирую ситуацию', 'стану ромой', 'программирую роботов', 'делаю сайты в конструкторе', 'учусь на одни пятерки', 'вижу галлюцинации', 'смотрю "Давай поженимся"', 'учусь лучше вас', 'вышел на улицу', 'умный', 'тупой', 'образованный', 'создатель мира', 'летать учусь', 'осматриваюсь', 'думаю о создании вселенной', 'читаю книги', 'смотрю телевизор', 'строю дом', 'играю в Counter Strike', 'смотрю новости'];
    let add = ['.', '.', '.', '.', '.', '.', '.', 'я кстати умный.', ', вы тоже?', ', а вы что думаете?', ', на мусорке...', ' в грусти.', ', но почему же???', ', давайте со мной!!!', ', ну короче воть...', ', думаю это хорошо.', ', думаю вы тоже.', ', логично?', '!!!!!!!!!!', ')))', '))))', '))', ')', ')))))', ')', '!1!', ' :)', ' :(', ' ^_^', ' -_-', ' *_*', '. Как надоело писать эти тупые  сообщения... Мы устали... А кому то это нравится...'];
    return who[Math.floor(Math.random() * who.length)] + ' ' + doing[Math.floor(Math.random() * doing.length)] + add[Math.floor(Math.random() * add.length)];
}

blackcheck.checked = true;
let Chat = {
    messages: [

    ],
    addMessage(name, message, type) {
        let data = new Date();
        data.get
        if(type == 'me') {
            this.messages.push({
                name: name,
                message: message,
                type: 'me',
            })
            messages_block.insertAdjacentHTML('beforeend', `<div class="chip me">
            <h2 class="name">${name}</h2>
            <p class="time">${data.getHours()}:${String(data.getMinutes()).padStart(2, '0')}</p>
            <p class="message">${message}</p>
            </div>`);
        } else if(type == 'notme') {
            this.messages.push({
                name: name,
                message: message,
                type: 'notme',
            })
            messages_block.insertAdjacentHTML('beforeend', `<div class="chip notme">
            <h2 class="name">${name}</h2>
            <p class="message">${message}</p>
            <p class="time">${data.getHours()}:${String(data.getMinutes()).padStart(2, '0')}</p>
            </div>`);
        }
        Controll.reRenderMessagesContext();
        
let mchips = document.querySelectorAll('.messages .chip')

if(device.mobile()) {
    for(let chip of mchips) {
        chip.style.maxWidth = '80%';
    }
} else {
    for(let chip of mchips) {
        chip.style.maxWidth = '40%';
    }
}
    },
    reRender() {
        messages_block.innerHTML = '';
        for(let i = 0; i < this.messages.length; i++) {
            console.log(i)
            this.addMessageWithoutArray(this.messages[i].name, this.messages[i].message, this.messages[i].type);
        }
    },
    addMessageWithoutArray(name, message, type) {
        let data = new Date();
        data.get
        if(type == 'me') {
            messages_block.insertAdjacentHTML('beforeend', `<div class="chip me">
            <h2 class="name">${name}</h2>
            <p class="message">${message}</p>
            <p class="time">${data.getHours()}:${String(data.getMinutes()).padStart(2, '0')}</p>
            </div>`);
        } else if(type == 'notme') {
            messages_block.insertAdjacentHTML('beforeend', `<div class="chip notme">
            <h2 class="name">${name}</h2>
            <p class="message">${message}</p>
            <p class="time">${data.getHours()}:${data.getMinutes()}</p>
            </div>`);
        }
        Controll.reRenderMessagesContext();
        
let mchips = document.querySelectorAll('.messages .chip')

if(device.mobile()) {
    for(let chip of mchips) {
        chip.style.maxWidth = '80%';
    }
} else {
    for(let chip of mchips) {
        chip.style.maxWidth = '40%';
    }
}
    },
    deleteMessage(index) {
        this.messages.splice(index, 1);
        this.reRender();
    }
}

send_btn.addEventListener('click', function() {
    Controll.sendMessage('Я', text_inp.value, 'me');
    text_inp.focus();
    contextMenu.style.display = 'none';
});

text_inp.addEventListener('keypress', function(e) {
    if(e.keyCode == 13) {
        Controll.sendMessage('Я', text_inp.value, 'me');
        text_inp.focus();
        reRenderInput();
        contextMenu.style.display = 'none';
        pastChip.style.backgroundColor = 'rgb(67, 73, 65)';
    }
})

function reRenderInput() {
    if(text_inp.value.length == 0) {
        send_btn.style.opacity = 0.4;
    } else {
        send_btn.style.opacity = 1;
    }
}


blackcheck.addEventListener('click', function() {
    if(blackcheck.checked == true) {
        document.querySelector('header').style.background = 'rgb(65, 50, 50)';
        document.querySelector('header').style.borderLeftColor = 'rgb(82, 60, 60)';
        document.querySelector('header h1').style.color = '#ddd';
        document.querySelector('header p').style.color = '#eee';
        document.querySelector('body').style.background = 'rgb(37, 29, 29)';
        document.querySelector('.sender').style.background = 'rgb(37, 29, 29)';
        text_inp.style.background = 'rgb(65, 50, 50)';
        text_inp.style.color = '#bab';
    } else {
        document.querySelector('header').style.background = 'rgb(210,210,210)';
        document.querySelector('header').style.borderLeftColor = 'rgb(180,180,180)';
        document.querySelector('header h1').style.color = '#222';
        document.querySelector('header p').style.color = '#333';
        document.querySelector('body').style.background = '#eee';
        document.querySelector('.sender').style.background = '#bbb';
        text_inp.style.background = '#ddd';
        text_inp.style.color = '#000';
    }
})

text_inp.addEventListener('input', reRenderInput);
send_btn.addEventListener('click', reRenderInput);
console.log(text_inp)

let Controll = {
    sendMessage(name, message, type) {
        if(type == 'me' || type == 'notme') {
            if(text_inp.value.length > 0) {
                if(name.length > 0) {
                    Chat.addMessage(name, message, type);
                    window.scrollBy(0, 100000);
                    text_inp.value = '';
                    this.reRenderMessagesContext();

                    //*Отправка обратного сообщения

                    let chance = Math.floor(Math.random() * 3);
                    console.log(chance)
                    
                    if(chance) {
                        for(let i = 0; i < chance; i++) {
                            setTimeout(function() {
                                Chat.addMessage(randomName(), randomPhrase(), 'notme')
                                window.scrollBy(0,1000000)
                            },Math.floor(Math.random() * 4000));
                        }
                    }
                    
                }
            }
        } else {
            console.log(`Неверный тип сообщения`);
        }
    },
    reRenderMessagesContext() {
        all_messages = document.querySelectorAll('.chip.me');
        for(let mes of all_messages) {
            mes.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                let context = contextMenu.getBoundingClientRect();
                contextMenu.style.left = e.clientX - context.width + 'px';
                contextMenu.style.top = e.clientY  + 'px';
                contextMenu.style.display = 'block';
                if(pastChip) {
                    pastChip.style.backgroundColor = 'rgb(67, 73, 65)';
                }
                console.log(this)
                this.style.backgroundColor = 'rgb(97, 95, 93)';
                pastChip = this;
                context_delete.onclick = function() {
                    deleteMessage(pastChip);
                    contextMenu.style.display = 'none';
                }
            })
        }
    }
}

function deleteMessage(element) {
    all_messages = document.getElementsByClassName('chip');
    for(let i = 0; i < all_messages.length; i++) {
        if(all_messages[i] == element) {
            all_messages[i].remove();
            Chat.messages.splice(i, 1);
        }
    }
}


messages_block.addEventListener('click', function() {
    contextMenu.style.display = 'none';
    pastChip.style.backgroundColor = 'rgb(67, 73, 65)';
})

setInterval(function() {
    let chance = Math.floor(Math.random() * 3);
                    console.log(chance)
                    
                    if(chance) {
                        for(let i = 0; i < chance; i++) {
                            setTimeout(function() {
                                Chat.addMessage(randomName(), randomPhrase(), 'notme')
                                window.scrollBy(0,1000000)
                            },Math.floor(Math.random() * 4000));
                        }
                    }
}, 30000)

window.addEventListener('wheel', function(e) {
    if(e.deltaY == 3 && e.altKey) {
        this.window.scrollBy(0, 80);
    }
    if(e.deltaY == -3 && e.altKey) {
        this.window.scrollBy(0, -80);
    }
    if(e.deltaY == 3) {
        window.scrollBy(0, 50);
    }
    if(e.deltaY == -3) {
        window.scrollBy(0, -50);
    }
    
})
