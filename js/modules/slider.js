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
