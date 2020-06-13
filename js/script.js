let clickBlock = document.querySelector('.btnFormBlock');

clickBlock.addEventListener('click', function(e) {
  e.preventDefault()
    alert("Ваше сообщение отправлено")
})

let custom_slider = document.querySelector('.custom_slider');
custom_slider.customSlider({
  maxSlides: 1,
  slideWidth: 700,
  slideHeight: 300,
  navs: false,
  loop: false,
  autoplay: false,
  timeout: 2000,
  dots: true,
});

let widthWindow=document.documentElement.clientWidth
let  widthElement = document.querySelector('.widthElement')
if (widthWindow < widthElement.offsetWidth){
    custom_slider.style.display = "none"
}

