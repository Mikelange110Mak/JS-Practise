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