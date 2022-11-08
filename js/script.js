//Проект для отработки навыков после уроков


"use strict";
window.addEventListener('DOMContentLoaded', () => {
   const cards = require('./modules/cards'),
      dragndrop = require('./modules/dragndrop'),
      modal = require('./modules/modal'),
      slider = require('./modules/slider'),
      tabs = require('./modules/tabs'),
      timer = require('./modules/timer');

   cards();
   dragndrop();
   modal();
   slider();
   tabs();
   timer();

})
