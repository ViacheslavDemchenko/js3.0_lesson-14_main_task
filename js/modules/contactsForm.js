"use strict";

function contactsForm() {
  //Оправка данных с формы в разделе "Контакты"
  var contactForm = document.getElementById('form'),
      contactFormInput = contactForm.getElementsByTagName('input');
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    contactForm.appendChild(statusMessage); // AJAX

    var request = new XMLHttpRequest();
    request.open("POST", 'server.php');
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var contactFormData = new FormData(contactForm);
    request.send(contactForm);

    request.onreadystatechange = function () {
      if (request.readyState < 4) {
        //Добавляем класс с картинкой при ожидании отправки формы
        statusMessage.classList.add('form-awaiting__contact-form');
      } else if (request.readyState === 4) {
        //Убираем класс с картинкой ожидания после достижения следующего статуса соединения с сервером
        statusMessage.classList.remove('form-awaiting__contact-form');

        if (request.status == 200 && request.status < 300) {
          //Добавляем класс с картинкой при успешной отправке формы
          statusMessage.classList.add('form-success__contact-form');
        } else {
          //Добавляем класс с картинкой при неудачной попытке отправки формы
          statusMessage.classList.add('form-failure__contact-form');
        }
      }
    }; //Очистка инпутов


    for (var i = 0; i < contactFormInput.length; i++) {
      contactFormInput[i].value = '';
    }
  });
}

module.exports = contactsForm;