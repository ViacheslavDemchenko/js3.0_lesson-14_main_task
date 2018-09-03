"use strict";

function timer() {
  var deadline = '09-25-2018 23:59:59'; //Задаем конечную дату
  //Функция расчета оставшегося времени

  function getTimeRemaining(endtime) {
    //Установка текущей даты и даты окончания акции	
    var t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor(t / 1000 % 60),
        minutes = Math.floor(t / 1000 / 60 % 60),
        hours = Math.floor(t / (1000 * 60 * 60)); //Возврат объекта данных времени

    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  ; //Функция запуска таймера 

  function initializeClock(id, endtime) {
    //Задание элементов для вывода данных
    var clock = document.getElementById(id),
        hours = clock.querySelector('.hours'),
        minutes = clock.querySelector('.minutes'),
        seconds = clock.querySelector('.seconds'),
        //Установка интервала работы таймера в 1 секунду
    timeInterval = setInterval(updateClock, 1000); //Функция таймера обратного отсчета		

    function updateClock() {
      var t = getTimeRemaining(endtime); //Задаем функцию для добавления 0 к числам до 9 (01, 02 и т.д.)

      function addZero(num) {
        if (num <= 9) {
          return "0".concat(num);
        } else return num;
      }

      ; //Вывод оставшегося времени 

      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds); //Действия, выполняющиеся после завершения отсчета таймера

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }

    ;
    updateClock();
  }

  ;
  initializeClock('timer', deadline); //Запуск таймера по id
}

module.exports = timer;