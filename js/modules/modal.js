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
