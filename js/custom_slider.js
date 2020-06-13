const defaultSettings = {
    slideWidth: 300,
    slideHeight: '',
    maxSlides: 1,
    navs:true,
    loop: true,
    autoplay: true,
    timeout: 2000,
    dots: false,
    margin: 10,
    onHover: true,
} 



let customSliderArray = document.querySelectorAll('.custom_slider');

customSliderArray.forEach(item => item.customSlider = function(sliderSettings = {}) {
    let moveNum = 0;
    const slidesOffset = sliderSettings.slideWidth || defaultSettings.slideWidth;
    const slideHeight = sliderSettings.slideHeight || defaultSettings.slideHeight;
    const maxSlides = sliderSettings.maxSlides || defaultSettings.maxSlides;
    const slides = item.querySelectorAll('div');
    const TotalLength = slides.length * slidesOffset;
    const navs = (sliderSettings.navs !== undefined) ? sliderSettings.navs : defaultSettings.navs;
    const loop = (sliderSettings.loop !== undefined) ? sliderSettings.loop : defaultSettings.loop;
    const autoplay = (sliderSettings.loop !== undefined) ? sliderSettings.autoplay : defaultSettings.autoplay;
    const timeout = sliderSettings.timeout || defaultSettings.timeout;
    const dots = (sliderSettings.dots !== undefined) ? sliderSettings.dots : defaultSettings.dots;
    const margin = sliderSettings.margin || defaultSettings.margin;
    const onHover = (sliderSettings.onHover !== undefined) ? sliderSettings.onHover : defaultSettings.onHover;

    buildSlider(item, slidesOffset, slideHeight, slides, navs,margin);

    if (dots) {
       Dots(); 
    }
    

    
    let outerContainer = item.querySelector('.outer_container');
    outerContainer.style.width = `${slidesOffset * maxSlides}px`;
    
    if (navs){
        let nextSlideBtn = item.querySelector('.next_slide');
        let prevSlideBtn = item.querySelector('.prev_slide');

        nextSlideBtn.addEventListener('click', nextSlideClick);
        prevSlideBtn.addEventListener('click', prevSlideClick);
    }
    

    function nextSlideClick(e) {
        e.preventDefault();
        let customSlider = this.closest('.custom_slider');
        let innerContainer = customSlider.querySelector('.inner_container');
        if ( (moveNum - slidesOffset) > -TotalLength ) {
            moveNum = moveNum - slidesOffset;
            innerContainer.style.transform = `translate(${moveNum}px, 0)`;
        } else if (loop) {
            moveNum = 0;
            innerContainer.style.transform = `translate(${moveNum}px, 0)`;
        }

      
    }
    
    function prevSlideClick(e) {
        e.preventDefault();
        let customSlider = this.closest('.custom_slider');
        let innerContainer = customSlider.querySelector('.inner_container');
        if (moveNum < 0) {
            moveNum = moveNum + slidesOffset;
            innerContainer.style.transform = `translate(${moveNum}px, 0)`;
        } else if (loop) {
            moveNum = - (TotalLength - slidesOffset);
            innerContainer.style.transform = `translate(${moveNum}px, 0)`;
        }
    }

    if (autoplay) {
        function moveSlide() {
            if ( (moveNum - slidesOffset) > -TotalLength ){ 
            moveNum = moveNum - slidesOffset;
            let innerContainer = item.querySelector('.inner_container');
            innerContainer.style.transform = `translate(${moveNum}px, 0)`;
            }
            else  {
                moveNum = 0;
                let innerContainer = item.querySelector('.inner_container');
                innerContainer.style.transform = `translate(${moveNum}px, 0)`;
            }
            
        }
        
        let timerId;
        let innerContainer = item.querySelector('.inner_container');
        let oneSlide =  innerContainer.querySelectorAll('.one_slide')
        
        function x () {
            timerId = setInterval(moveSlide, timeout);
        }

        x()

        if(onHover){
            oneSlide.forEach(item => {
            item.addEventListener('mouseenter', () => {
                setTimeout(() => { clearInterval(timerId)});
            })
            item.addEventListener('mouseleave', () => {
                x()
            })
        })}
        
    } 


    


    function Dots () {
        let customSlider = item;
        let innerContainer = item.querySelector('.inner_container');
        let generalDots = document.createElement('div');
        generalDots.classList.add('generaldots');
        customSlider.append(generalDots);
        let dots = item.querySelectorAll('.one_slide');
        let arrayDots = []
        for (i=0; i<dots.length; i++) {
            let dotsimg = document.createElement('div');
            dotsimg.classList.add('dot')
            generalDots.append(dotsimg);
            arrayDots.push(dotsimg);
            dotsimg.dataset.number = i;
        };

        let innerArray= Array.from(innerContainer.children); 
        j =0;
        innerArray.forEach(item => {
            item.dataset.number = j++;
        });
        
       
        item.addEventListener('click', (e) =>{
            event = e.target;
            innerArray.forEach(item => {
                if ((event.getAttribute('data-number')) == (item.getAttribute('data-number'))){
                    arrayDots.forEach(item => {
                        item.classList.remove('active')
                    })
                    event.classList.add('active');
                    innerContainer.style.transform = `translate(${-slidesOffset *item.getAttribute('data-number')}px, 0)`;
                }
                
            });
        });
    }
   
})

 
function buildSlider(slider, slideWidth, slideHeight, slides, navs, margin) {
    slides.forEach(item => {
        item.classList.add('one_slide');
        item.style.width = `${slideWidth-margin*2}px`;
        item.style.height = `${slideHeight }px`;
        item.style.margin = `${margin}px`;
    });

    slider.innerHTML = `        
        <div class="outer_container">
            <div class="inner_container">
                ${slider.innerHTML}
            </div>
        </div>`;
        if (navs) {
            slider.innerHTML = slider.innerHTML + `<div class="navs">
            <a href="#" class="prev_slide"><</a>
            <a href="#" class="next_slide">></a>
        </div>`
        }
}




