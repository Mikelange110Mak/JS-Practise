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