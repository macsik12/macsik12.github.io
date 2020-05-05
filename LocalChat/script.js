let send_btn = document.getElementById('send_button');
let text_inp = document.getElementById('text_input');
let messages_block = document.getElementById('messages');


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
            <p class="message">${message}</p>
            <p class="time">${data.getHours()}:${String(data.getMinutes()).padStart(2, '0')}</p>
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
            <p class="time">${data.getHours()}:${data.getMinutes()}</p>
            </div>`);
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
    },
    deleteMessage(index) {
        this.messages.splice(index, 1);
        this.reRender();
    }
}

send_btn.addEventListener('click', function() {
    Controll.sendMessage('Я', text_inp.value, 'me');
    text_inp.focus();
});

text_inp.addEventListener('keypress', function(e) {
    if(e.keyCode == 13) {
        Controll.sendMessage('Я', text_inp.value, 'me');
        text_inp.focus();
        reRenderInput();
    }
})

function reRenderInput() {
    if(text_inp.value.length == 0) {
        send_btn.style.opacity = 0.4;
    } else {
        send_btn.style.opacity = 1;
    }
}

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
                }
            }
        } else {
            console.log(`Неверный тип сообщения`);
        }
    }
}
