//Использование класса на карточках и взаимодействие с сервером:

function cards() {

   class Card {
      constructor(title, src, alt, descr, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.classes = classes;
         this.parent = document.querySelector(parentSelector)

      }

      render() {
         const element = document.createElement('div')
         if (this.classes.length === 0) {
            this.element = 'card';
            element.classList.add(this.element)
         } else this.classes.forEach(className => element.classList.add(className));

         element.innerHTML = `
     
            <div class="card__title">${this.title}</div>
            <div class="card__pic">
               <img src=${this.src} alt=${this.alt}>
            </div>
            <div class="card__descr">${this.descr}
            </div>
            <div class="card__price">Price
               <span>${this.price}</span>
            </div>
         
      `
         this.parent.append(element);
      }
   }

   const getResource = async (url) => {
      const res = await fetch(url)

      if (!res.ok) throw new Error(`Could not fetch ${url}, status:${res.status}`)

      return await res.json()
   }

   getResource('http://localhost:3000/cards')
      .then(data => {
         data.forEach(({ title, img, altimg, descr, price }) => {
            new Card(title, img, altimg, descr, price, '.cards__body').render();
         })
      });

   ///////////Отправка данных на сервер///////
   const forms = document.querySelectorAll('form');

   const message = {
      loading: 'img/form/spinner.svg',
      success: 'Отправка данных завершена ✅',
      failure: 'Что-то пошло не так ❌'
   }

   forms.forEach(item => {
      bindPostData(item);
   })

   const postData = async (url, data) => {
      const res = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-type': 'application/json'
         },
         body: data
      });
      return await res.json()
   }

   function bindPostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         let statusMessage = document.createElement('img');
         statusMessage.src = message.loading
         statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
      `;
         form.insertAdjacentElement('afterend', statusMessage);

         const formData = new FormData(form);
         const json = JSON.stringify(Object.fromEntries(formData.entries()))

         postData('http://localhost:3000/requests', json)
            .then(data => {
               console.log(data);
               showThanksModal(message.success);
               statusMessage.remove();
            }).catch(() => {
               showThanksModal(message.failure);
            })

      })
   }

   function showThanksModal(message) {
      const req = new Promise((resolve, reject) => {
         resolve(message)
      })
      req.then(() => {
         modal.innerHTML = `
   <div class="modal__body">
         <button data-close class="modal__close">X</button>
         <div class="modal__top">Модальное окно</div>
   <div class="modal__status">${message}</div>
      </div>
`;
      })
   }

   fetch('http://localhost:3000/cards')
      .then(data => data.json())
      .then(res => console.log(res))
}

module.exports = cards;