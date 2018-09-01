"use strict";

function tabs() {
  var tab = document.getElementsByClassName('info-header-tab'),
      tabContent = document.getElementsByClassName('info-tabcontent'),
      info = document.getElementsByClassName('info-header')[0];

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  ;
  hideTabContent(1);

  function showTabcontent(b) {
    if (tabContent[b].classList.contains('hide')) {
      hideTabContent(0);
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  ;
  info.addEventListener('click', function (e) {
    var target = e.target;

    if (target.className === 'info-header-tab') {
      for (var _i = 0; _i < tab.length; _i++) {
        if (target === tab[_i]) {
          showTabcontent(_i);
          break;
        }
      }
    }
  });
}

module.exports = tabs;