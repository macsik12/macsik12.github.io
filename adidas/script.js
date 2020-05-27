"use strict"

// Переключение стран

let li_lang = document.getElementById('languages_li');
let list_lang = document.getElementById('languages_list')
let langIsOpen = false;

function showLangPanel() {
    list_lang.style.transform = 'scaleY(1)';
    langIsOpen = true;
}

function closeLangPanel() {
    list_lang.style.transform = 'scaleY(0)';
    langIsOpen = false;
}

li_lang.addEventListener('click', function(event) {
    if(langIsOpen) {
        if(event.target.closest('#rtt')) {
            closeLangPanel();
        }
    } else {
        showLangPanel();
    }
})

document.body.addEventListener('click', function(event) {
    if(!event.target.closest('#languages_li')) {
        closeLangPanel()
    }
})