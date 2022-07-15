import {getData} from '../services/services';
function cards() {

        class menuItem {
          constructor(src, alt, subtitle, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.description = description;
            this.price = price;
            this.transfer = 28;
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
          }

          transferToUAN() {
            this.price = this.price * this.transfer;
            return this.price;
          }

          createElement() {
            const element = document.createElement("div");

            if (this.classes.length === 0) {
              this.element = "menu__item";
              element.classList.add(this.element);
            } else {
              this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.transferToUAN()}</span> грн/день
            `;
            this.parentSelector.append(element);
          }

        }

        getData('http://localhost:3000/menu')
          .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
              new menuItem(img, altimg, title, descr, price, "div.menu__field>div.container", 'menu__item').createElement();
            });
          });


        // axios.get('http://localhost:3000/menu')
        // .then(function (response) {
        //   const data = response.data;
        //   data.forEach(({img, altimg, title, descr, price}) => {
        //         new menuItem(img, altimg, title, descr, price, "div.menu__field>div.container", 'menu__item').createElement();
        //     });
        // }).catch(function (error) {
        //   console.log(error);
        // })
        // .then(function () {
        // });
}

export default cards;