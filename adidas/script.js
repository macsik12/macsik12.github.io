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

    closeSizes();
    closeCart();
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


/* Покупка обуви ============================== */


let shoes = [
    {
        name: 'superstar',
        cost: '120',
        sizes: [36, 37, 39, 40],
        preview: 'img/shoes/shoe1.png',
        color: 'img/colors/color1.png',
        colorType: 'exclusive',
    },
    {
        name: 'superneon',
        cost: 140,
        sizes: [36, 37, 40],
        preview: 'img/shoes/shoe2.png',
        color: 'img/colors/color2.png',
        colorType: 'exclusive',
    },
    {
        name: 'solidstart',
        cost: 90,
        sizes: [35, 36, 37, 39, 40],
        preview: 'img/shoes/shoe3.png',
        color: 'img/colors/color3.png',
        colorType: 'simple',
    },
]

let shoe_img = document.getElementById('shoe_img');
let shoe_color = document.getElementById('shoe_color');
let colorType = document.getElementById('colorType');
let price = document.getElementById('price_span');
let name = document.getElementById('name_h3');

let size = document.getElementById('open_size');
let sizesBlock = document.getElementById('sizes_block');

let sz = document.getElementById('sz');

let sizesIsOpen = false;

let currentSize;

let $dots = document.getElementById('dots_container');
$dots.innerHTML = '<div class="dot"></div>'.repeat(shoes.length);

let $all_dots = $dots.children;

let activeDot = $all_dots[0];
$all_dots[0].classList.add('active')

function openShoe(index) {
    let szs = shoes[index].sizes.map(size => {
        return `<p>${size}</p>`;
    }).join('')

    sizesBlock.innerHTML = szs;

    activeDot.classList.remove('active');
    activeDot = $all_dots[index];
    activeDot.classList.add('active');
    shoe_img.src = shoes[index].preview;
    shoe_color.src = shoes[index].color;
    colorType.textContent = shoes[index].colorType;
    price.textContent = shoes[index].cost;
    name.textContent = shoes[index].name;
    sz.textContent = sizesBlock.children[0].textContent;
} 

openShoe(0);


for(let i = 0; i < $all_dots.length; i++) {
    $all_dots[i].onclick = function() {
        openShoe(i);
    }
}

function openSizes() {
    sizesBlock.style.transform = 'scaleY(1)';
    sizesIsOpen = true;
}

function closeSizes() {
    sizesBlock.style.transform = 'scaleY(0)'
    sizesIsOpen = false;
}

size.onclick = function(event) {
    event.stopPropagation();
    if(sizesIsOpen) {
        closeSizes();
    } else {
        openSizes();
    }
}

sz.textContent = sizesBlock.children[0].textContent;

sizesBlock.onclick = function(event) {
    event.stopPropagation();
    if(event.target.tagName == 'P') {
        currentSize = event.target.textContent;
        sz.textContent = event.target.textContent;
        closeSizes()
    } 
}

let cart_li = document.querySelector('.cart_li');
let cart_div = document.getElementById('cart');
let cartIsOpen = false;
let products = document.getElementById('products');
let cart_count = document.getElementById('cart_count');
let cart_count2 = document.getElementById('number');
let total_price = document.getElementById('total_price');

function openCart() {
    cart_div.style.transform = 'scaleY(1)';
    cartIsOpen = true;
}

function closeCart() {
    cart_div.style.transform = 'scaleY(0)';
    cartIsOpen = false;
}


cart_li.onclick = function(event) {
    event.stopPropagation();
    if(cartIsOpen) {
        closeCart();
    } else {
        openCart();
    }
}

function addProduct(name, img, price, size) {
    products.innerHTML += `
    <div class="product" data-name="${name}" data-price="${price}">
                                <div class="image">
                                    <img src="${img}">
                                </div>
                                <div class="name">
                                    <p>${name} <span class="size_span">${size}</span></p>
                                </div>
                                <div class="price">${price}$</div>
                                <div class="delete"><i class="fas fa-trash" data-type="delete"></i></div>
                            </div>
    `
    renderCart();
}

cart_div.onclick = function(event) {
    event.stopPropagation();
    if(event.target.dataset.type == 'delete') {
        event.target.closest('.product').remove();
        renderCart()
    }
}

let info_block = document.getElementById('info-block');
let buyBtn = document.getElementById('buy');
let empty = document.getElementById('empty');

function renderCart() {
    if(products.children.length == 0) {
        info_block.style.display = 'none';
        buyBtn.style.display = 'none';
        empty.style.display = 'block';
    } else {
        info_block.style.display = 'flex';
        buyBtn.style.display = 'inline-block';
        empty.style.display = 'none';
    }
    cart_count.innerHTML = products.children.length.toString();
    cart_count2.innerHTML = products.children.length.toString();
    let general_cost = 0;
    for(let product of products.children) {
        general_cost += +product.dataset.price;
    }
    total_price.innerHTML = general_cost;
}

let addCartBtn = document.getElementById('addCartBtn');
addCartBtn.onclick = function() {
    addProduct(name.innerHTML, shoe_img.src, price.innerHTML, sz.innerHTML)
}

buyBtn.onclick = function() {
    products.innerHTML = '';
    renderCart()
}

renderCart()