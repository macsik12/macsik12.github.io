function copy1() {
  navigator.clipboard.writeText('info@tesla-telecom.ru')
}

function copy2() {
  navigator.clipboard.writeText('teslatelecomrostov')
}

function copy3() {
  navigator.clipboard.writeText('78632684833')
}

var dialog = $('.dialog');
var cite = $('.wrapper');
var wall = $('.wall');
var open = false;
function forma() {
    dialog.slideDown(300);
    cite.addClass('blur');
    wall.removeClass('displaynone');
}

function closeForm() {
        dialog.fadeOut(100);
        cite.removeClass('blur');
        wall.addClass('displaynone');
}



var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 9000); // Change image every 2 seconds
} 

if(document.body.clientWidth < 800) {
  $('.connect').attr('onclick', 'forma()');
  $('.connect').css('cursor', 'pointer')
}