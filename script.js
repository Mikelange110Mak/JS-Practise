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
   new Card(
      'Bounty Hunter',
      'img/Trading_Card_Icon_-_Bounty_Hunter.webp',
      'bh',
      `Bounty Hunter — активный герой поддержки, предпочитающий сложную линию.
   Ориентирован на убийство одиноких целей. Благодаря Jinada Jinada, Bounty Hunter наносит много урона с
   атаки и ворует золото у вражеских героев. В начале игры это позволяет эффективно размениваться
   ресурсами с противником и мешать ему фармить. Shadow Walk Shadow Walk дарует Bounty Hunter невидимость
   и замедление со следующей атаки. Под действием Shadow Walk Shadow Walk Bounty Hunter может разведывать
   территорию для поиска легкой цели. Не лишним будет взять с собой Sentry Ward Sentry Ward и Observer
   Ward Observer Ward, чтобы проверить наличие вражеских вардов и расставить свои. Shuriken Toss Shuriken
   Toss наносит урон, накладывает микро-оглушение и отскакивает к помеченным Track Track противникам. Это
   позволяет добить уходящего врага или прервать прочтение заклинания. Aghanim's Scepter Aghanim's
   Scepter увеличивает дальность применения Shuriken Toss Shuriken Toss и добавляет ей эффект Jinada
   Jinada. Track Track раскрывает невидимость и показывает цель в тумане войны. Позволяет Bounty Hunter
   передвигаться быстрее и наносить по ней критический урон. За убийство противника под Track Track
   Bounty Hunter и его команда получают бонусное золото, что помогает быстро набрать преимущество над
   противником при активной игре. Track Track также показывает количество золота у вражеского героя. В
   начале игры Bounty Hunter легко перемещается по линиям и помогает команде совершать убийства. В
   дальнейшем — выполняет роль разведчика, показывая местоположение противника. Основная цель Bounty
   Hunter в драке — вражеские саппорты, так как ему проще до них добираться под Shadow Walk Shadow Walk.`,
      579,
      '.cards__body'
   ).render();

   new Card(
      'Tusk',
      'img/tusk.webp',
      'tusk',
      'Снежным комом врывается во врагов, оглушая их Tusk никогда не против затеять драку. Он отрезает врагам путь к отступлению стеной ледяных осколков, собирает союзников в гигантский снежный ком и влетает в нём в противников, завершая комбинацию фирменным сногсшибательным ударом.',
      900,
      '.cards__body'
   ).render();

   new Card(
      'Vengeful Spirit',
      'img/Dota_2_Card_8.webp',
      'venge',
      `Vengeful Spirit — это герой с дальним типом атаки, основным атрибутом которого
   является Agility attribute symbol.png ловкость. Ее первая способность, Magic Missile, выпускает во
   врага магический снаряд, который оглушает и наносит урон. Второй способностью, Wave of Terror,
   Vengeful Spirit издает дьявольский клич, который ослабляет броню врагов и раскрывает туман войны.
   Пассивная способность, Vengeance Aura, увеличивает урон ближайших союзников. Так же при смерти героя
   на ее месте появится иллюзия Vengerful Spirit наносящая 100% урона героя и 150% получаемого,после
   возврождения героя — дух исчезнет. Ультимативная способность Nether Swap, позволяет меняеться местами
   с союзным или вражеским героем, так же способность сбивает анимации способностей вражеский персонажей.
   Улучшение с Aghanim's Scepter icon.png Aghanim's Scepter применяет страх на врагов вокруг места
   появления Vengerful Spirit после обмена местами с выбранным существоооом.`,
      819,
      '.cards__body'
   ).render();

   new Card(
      'Riki',
      'img/Dota_2_Card_4.webp',
      'riki',
      'Riki - это герой с ближним типом атаки, основным атрибутом которого является Agility attribute symbol.png ловкость. Его первая способность, Smoke Screen, бросает дымовую бомбу, замедляя скорость передвижения вражеских существ в зоне охвата, не позволяя им колдовать и заставляя их промахиваться в большинстве случаев. Вторая способность, Blink Strike, Телепортируется за спину выбранного юнита и наносит дополнительный урон, если это вражеский юнит. Третья способность, Tricks of the Trade, Riki пропадает из нашего мира, атакуя со спины случайных противников в радиусе вокруг себя. Ультимативная пассивная способность, Cloak and Dagger, Riki скрывается в тени, становясь невидимым. Если Riki атакует со спины, то он наносит дополнительный урон, зависящий от его текущей ловкости.',
      717,
      '.cards__body'
   ).render();


   ///////////Отправка данных на сервер///////

   const forms = document.querySelectorAll('form');

   const message = {
      loading: 'img/form/spinner.svg',
      success: 'Отправка данных завершена ✅',
      failure: 'Что-то пошло не так ❌'
   }

   forms.forEach(item => {
      postData(item);
   })

   function postData(form) {
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

         const object = {};
         formData.forEach(function (value, key) {
            object[key] = value;
         });

         fetch('server.php', {
            method: 'POST',
            headers: {
               'Content-type': 'application/json'
            },
            body: JSON.stringify(object)
         }).then(data => data.text())
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
