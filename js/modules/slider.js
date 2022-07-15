function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field}) {
    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(field);

  
        slider.style.position = 'relative';
        slidesWrapper.style.cssText = 'overflow: hidden;';
        slidesField.style.cssText = `display: flex; transition: 0.5s all; width: ${100 * slides.length}% `;

        slides.forEach(slide => slide.style.width = width);

  
        if (slides.length < 10) {
          total.innerHTML = `0${slides.length}`;
          current.textContent = `0${slideIndex}`;
        } else {
          total.innerHTML = `${slides.length}`;
          current.textContent = `${slideIndex}`;
        }
  
  
        const indicators = document.createElement('ol'),
          dots = [];
        indicators.classList.add('carousel-indicators');
        indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
        slider.append(indicators);

        for (let i = 0; i < slides.length; i++) {
          const dot = document.createElement('li');
          dot.setAttribute('data-slide-to', i + 1);
          dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
          if (i == 0) {
            dot.style.opacity = 1;
          }
          indicators.append(dot);
          dots.push(dot);
  }
  
  function deletePX(str) {
    return +str.replace(/\D/g, '');
  }
  function opacityDots(dots, index) {
    dots.forEach(dot => dot.style.opacity = ".5");
    dots[index].style.opacity = 1;
  }

  
        next.addEventListener('click', () => {
          if (offset == (deletePX(width) * (slides.length - 1))) {
            offset = 0;
          } else {
            offset += deletePX(width);
          }
    
          slidesField.style.transform = `translateX(-${offset}px)`;
    
          if (slideIndex == slides.length) {
            slideIndex = 1;
          } else {
            slideIndex++;
          }

          if (slideIndex < 10) {
            current.innerHTML = `0${slideIndex}`;
          } else {
            current.innerHTML = `${slideIndex}`;
          }
          opacityDots(dots, slideIndex - 1);
        });


        prev.addEventListener('click', () => {
          if (offset == 0) {
            offset = deletePX(width) * (slides.length - 1);
          } else {
            offset -= deletePX(width);
          }
          slidesField.style.transform = `translateX(-${offset}px)`;

          if (slideIndex == 1) {
            slideIndex = slides.length;
          } else {
            slideIndex--;
          }

          if (slideIndex < 10) {
            current.innerHTML = `0${slideIndex}`;
          } else {
            current.innerHTML = `${slideIndex}`;
          }
          opacityDots(dots, slideIndex - 1);
        });
  

        dots.forEach(dot => {
          dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deletePX(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            if (slides.length < 10) {
              current.textContent = `0${slideIndex}`;
            } else {
              current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex - 1].style.opacity = 1;
          });
        });


}

export default slider;