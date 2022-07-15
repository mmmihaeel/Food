function calc() {
        const result = document.querySelector('.calculating__result');
        
        let sex, height, weight, age, ratio;

        if (localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female';
            localStorage.setItem('sex', 'female');
        }

        if (localStorage.getItem('ratio')) {
          ratio = localStorage.getItem('ratio');
        } else {
          ratio = 1.375;
          localStorage.setItem('ratio', 1.375);
        }
    


        function calcResult(defaultMessage) {
          if (sex && height && weight && age && ratio) {
            if (sex === 'female') {
              result.innerHTML = `<span>${Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)}</span>ккал`;
            } else if (sex === 'male') {
              result.innerHTML = `<span>${Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)}</span>ккал`;
            }
          } else {
            result.innerHTML = `${defaultMessage}`;
            }
        }

        calcResult('Заполните все поля!');

        function getStaticInformation(parentSelector, activeClass) {
          const elements = document.querySelectorAll(`${parentSelector} div`);

          elements.forEach((element) => {
              element.classList.remove(activeClass);
              if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {              
                element.classList.add(activeClass);
              }else if (element.getAttribute('id') === localStorage.getItem('sex')) {
                element.classList.add(activeClass);
              }
            
            element.addEventListener('click', (e) => {
              if (e.target.hasAttribute(`data-ratio`)) {
                ratio = e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', e.target.getAttribute('data-ratio'));
              }else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));
                }
              elements.forEach((elem) => {
                 elem.classList.remove(activeClass);
                 
              });
              e.target.classList.add(activeClass);
              calcResult('Заполните все поля!');
              
             });
          });
        }
        
        getStaticInformation('#gender', 'calculating__choose-item_active');
        getStaticInformation('div.calculating__choose_big', 'calculating__choose-item_active');
        
        
        function getChangingInformation(selector) {
          document.querySelector(selector).addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains("calculating__choose-item")) {
              document.querySelectorAll(`${selector} input`).forEach((input) => {
                input.addEventListener('input', () => {
                  if (input.value.match(/\D/g)) {
                    input.style.cssText = `border: 1px solid #e3242b`;
                  } else {
                    input.style.cssText = `border: 1px solid 00ff00`;
                     }

                    switch(input.getAttribute('id')) {
                      case "height":
                        height = +input.value;
                        // localStorage.setItem('height', +input.value);
                      break;
                      case "weight":                     
                        weight = +input.value;
                        // localStorage.setItem('weight', +input.value);
                      break;
                      case "age":                                
                        age = +input.value;
                        // localStorage.setItem('age',+input.value);
                      break;
                    }
                  calcResult('Заполните все поля!');
              });
            });
          }
        });
      }   
        
      getChangingInformation('div.calculating__choose_medium'); 
}

export default calc;


