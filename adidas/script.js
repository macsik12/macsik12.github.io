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