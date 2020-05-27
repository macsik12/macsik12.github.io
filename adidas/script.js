"use strict"

// Переключение стран

let li_lang = document.getElementById('languages_li');
let list_lang = document.getElementById('languages_list')
let country = 'USA';
let country_span = document.getElementById('country');
let langIsOpen = false;
let currentCountryP = document.querySelector('.header .languages_li *.selected');

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
    if(!event.target.closest('#menu') && !event.target.closest('#menuBtn')) {
        panel.style.transform = 'scaleX(0)'
    }
})

list_lang.addEventListener('click', function(event) {
    if(event.target.dataset.t == 'lan') {
        currentCountryP.classList.remove('selected')
        country = event.target.textContent;
        country_span.innerHTML = event.target.textContent;
        event.target.classList.add('selected')
        currentCountryP = event.target;
        setTimeout(closeLangPanel, 0)
    }
})


// Боковая панель ===========================

let panel = document.getElementById('menu');

let openBtnMenu = document.getElementById('menuBtn');
let closeBtnMenu = document.getElementById('close');

openBtnMenu.onclick = function() {
    panel.style.transform = 'scaleX(1)'
}

closeBtnMenu.onclick = function() {
    panel.style.transform = 'scaleX(0)'
}

panel.onclick = function(event) {
    if(event.target.tagName == 'P') {
        alert(`The ${event.target.textContent} is clicked!`)
    }
}