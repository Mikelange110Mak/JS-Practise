/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/dragndrop.js":
/*!*********************************!*\
  !*** ./js/modules/dragndrop.js ***!
  \*********************************/
/***/ ((module) => {

//Drag&Drop:
function dragndrop() {
   const grabItem = document.querySelector('.grab__item'),
      grabPlaces = document.querySelectorAll('.grab__place');

   grabItem.addEventListener('dragstart', dragStart)
   grabItem.addEventListener('dragend', dragEnd)

   grabPlaces.forEach(i => {
      i.addEventListener('dragover', dragOver);
      i.addEventListener('dragenter', dragEnter);
      i.addEventListener('dragleave', dragLeave);
      i.addEventListener('drop', dragDrop);
   });

   function dragStart(e) {
      setTimeout(() => { e.target.classList.add('hide') }, 0)
   }

   function dragEnd(e) {
      e.target.classList.remove('hide')
   }

   function dragOver(e) {
      e.preventDefault()
   }

   function dragEnter(e) {
      e.target.classList.add('hovered')
   }

   function dragLeave(e) {
      e.target.classList.remove('hovered')
   }

   function dragDrop(e) {
      e.target.append(grabItem)
      e.target.classList.remove('hovered')
   }
}

module.exports = dragndrop;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

//Modal window
function modal() {
   const modalTrigger = document.querySelector('.trigger__button'),
      modal = document.querySelector('.modal');

   modalTrigger.addEventListener('click', () => {
      modal.classList.toggle('show')
   })

   function closeModalWindow() {
      modal.classList.remove('show')
   }

   modal.addEventListener('click', (e) => {  //закрытие модального окна по пустому месту и крестику
      if (e.target === modal || e.target.getAttribute('data-close') == "") closeModalWindow();
   });


   document.addEventListener('keydown', (e) => {   //закрытие модального окна с помощью клавиши
      if (e.code === 'Escape' || e.code === 'KeyX' && modal.classList.contains('show')) closeModalWindow();
   })
}
module.exports = modal;


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

//Slider:
function slider() {
   const sliderBox = document.querySelector('.slider'),
      slides = document.querySelectorAll('.slide'),
      prev = document.querySelector('.slider__counter-prev'),
      next = document.querySelector('.slider__counter-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.slider__wrapper'),
      slidesField = document.querySelector('.slider__inner'),
      width = window.getComputedStyle(slidesWrapper).width;

   let slideIndex = 1;
   let offset = 0;


   //Для красивого отображения количества слайдов и текущего слайда (с ноликами)
   if (slides.length < 10) {
      total.textContent = `0${slides.length}`
      current.textContent = `0${slideIndex}`
   } else {
      total.textContent = slides.length
      current.textContent = slideIndex
   }

   //Установление ширины иннера слайдера, чтобы он прокручивался по горизонтали()
   slidesField.style.width = 100 * slides.length + '%'


   //Для каждого слайда ширина = ширина враппера
   slides.forEach(i => i.style.width = width)

   //Добавить навигацию для слайдера
   const indicators = document.createElement('ol'),
      dots = [];
   indicators.classList.add('carousel-indicators');
   sliderBox.append(indicators);

   for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1); //Установить дата-атрибут для каждой точки
      dot.classList.add('dot')

      if (i === 0) dot.style.opacity = '1';
      indicators.append(dot)
      dots.push(dot)
   }

   //Кнопка следующий слайд:
   next.addEventListener('click', () => {
      if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) offset = 0;
      else offset += +width.slice(0, width.length - 2);

      slidesField.style.transform = `translateX(-${offset}px)` //прокрутить слайд

      //Для изменения нумерации слайдов
      if (slideIndex == slides.length) slideIndex = 1;
      else slideIndex++;

      if (slides.length < 10) current.textContent = `0${slideIndex}`;
      else current.textContent = slideIndex;

      //вызов функции которая отображает на точках какой сейчас слайд
      dotsChange()
   })

   prev.addEventListener('click', () => {
      if (offset === 0) offset = +width.slice(0, width.length - 2) * (slides.length - 1);
      else offset -= +width.slice(0, width.length - 2);

      slidesField.style.transform = `translateX(-${offset}px)`

      if (slideIndex == 1) slideIndex = slides.length;
      else slideIndex--;

      if (slides.length < 10) current.textContent = `0${slideIndex}`;
      else current.textContent = slideIndex;

      dotsChange()
   })


   dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
         const slideTo = e.target.getAttribute('data-slide-to');
         slideIndex = slideTo;
         offset = +width.slice(0, width.length - 2) * (slideTo - 1)

         slidesField.style.transform = `translateX(-${offset}px)`;

         if (slides.length < 10) current.textContent = `0${slideIndex}`;

         dotsChange()
      })
   })

   //Функция для отображения какой сейчас слайд
   function dotsChange() {
      dots.forEach(dot => dot.style.opacity = '.5')
      dots[slideIndex - 1].style.opacity = '1'
   }
}

module.exports = slider;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

//Tabs
function tabs() {
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
            } else item.classList.remove('__active');
         })
      }
   })
   hideTabContent();
   showTabContent();
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

//Timer
function timer() {
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
      if (num >= 0 && num < 10) return `0${num}`;
      else return num
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

         if (t.total <= 0) clearInterval(timeInterval);
      }
   }
   setClock('.timer__body', deadline)
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
//Проект для отработки навыков после уроков



window.addEventListener('DOMContentLoaded', () => {
   const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
      dragndrop = __webpack_require__(/*! ./modules/dragndrop */ "./js/modules/dragndrop.js"),
      modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
      slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
      tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
      timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

   cards();
   dragndrop();
   modal();
   slider();
   tabs();
   timer();

})

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map