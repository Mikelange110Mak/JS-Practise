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