//Проект для отработки навыков после уроков


"use strict";
window.addEventListener('DOMContentLoaded', () => {
   const tabBtn = document.querySelectorAll('.tabs__buttons-item'),
      tabBlock = document.querySelectorAll('.tabs__block'),
      tabParent = document.querySelector('.tabs__buttons');


   function hideTabContent() {
      tabBlock.forEach(item => {
         item.classList.add('__hide');
      })
   }
   function showTabContent(i = 1) {
      tabBlock[i].classList.remove('__hide');
   }


   tabParent.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.classList.contains('tabs__buttons-item')) {
         tabBtn.forEach((item, i) => {
            if (target == item) {
               target.classList.add('__active');

               hideTabContent();
               showTabContent(i);
            } else {
               item.classList.remove('__active');
            }

         })
      }
   })
   hideTabContent();
   showTabContent();

   //Timer
   const deadline = '2023-01-01',
      dayStr = document.querySelector('.days'),
      hoursStr = document.querySelector('.hours'),
      minutesStr = document.querySelector('.minutes'),
      secondsStr = document.querySelector('.seconds');

   function getTimeRemaining(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()),
         days = Math.floor(t / (1000 * 60 * 60 * 24)),
         hours = Math.floor((t / (1000 * 60 * 60) % 24)),
         minutes = Math.floor((t / 1000 / 60) % 60),
         seconds = Math.floor((t / 1000) % 60);

      return { total: t, days, hours, minutes, seconds }

   }

   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num
      }
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         timeInterval = setInterval(updateClock, 1000);

      function updateClock() {
         const t = getTimeRemaining(endtime)

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }
   setClock('.timer__body', deadline)

   //Modal window

   const modalTrigger = document.querySelector('.trigger__button'),
      modal = document.querySelector('.modal');

   modalTrigger.addEventListener('click', () => {
      modal.classList.toggle('show')
   })

   function closeModalWindow() {
      modal.classList.remove('show')
   }

   modal.addEventListener('click', (e) => {  //закрытие модального окна по пустому месту и крестику
      if (e.target === modal || e.target.getAttribute('data-close') == "") {
         closeModalWindow();
      }
   });


   document.addEventListener('keydown', (e) => {   //закрытие модального окна с помощью клавиши
      if (e.code === 'Escape' || e.code === 'KeyX' && modal.classList.contains('show')) {
         closeModalWindow()
      }
   })

   //Использование класса на карточках:


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
         } else {
            this.classes.forEach(className => element.classList.add(className));
         }
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

      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status:${res.status}`)
      }

      return await res.json()
   }

   getResource('http://localhost:3000/menu')
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

   fetch('http://localhost:3000/menu')
      .then(data => data.json())
      .then(res => console.log(res))

})
