(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

window.addEventListener('DOMContentLoaded', function() {
	
	let calc = require('../parts/calc.js');
	let complex = require('../parts/complex.js');
	let form = require('../parts/form.js');
	let scroll = require('../parts/scroll.js');
	let slider = require('../parts/slider.js');
	let tabs = require('../parts/tabs.js');
	let timer = require('../parts/timer.js');

	calc();
	complex();
	form();
	scroll();
	slider();
	tabs();
	timer();


});




},{"../parts/calc.js":24,"../parts/complex.js":25,"../parts/form.js":26,"../parts/scroll.js":27,"../parts/slider.js":28,"../parts/tabs.js":29,"../parts/timer.js":30}],2:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":13}],3:[function(require,module,exports){
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],4:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],5:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":7}],6:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":9,"./_is-object":13}],7:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],8:[function(require,module,exports){
'use strict';
var hide = require('./_hide');
var redefine = require('./_redefine');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./_defined":4,"./_fails":7,"./_hide":11,"./_redefine":17,"./_wks":21}],9:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],10:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],11:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":5,"./_object-dp":15,"./_property-desc":16}],12:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":5,"./_dom-create":6,"./_fails":7}],13:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],14:[function(require,module,exports){
module.exports = false;

},{}],15:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":2,"./_descriptors":5,"./_ie8-dom-define":12,"./_to-primitive":19}],16:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],17:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_core":3,"./_global":9,"./_has":10,"./_hide":11,"./_uid":20}],18:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":3,"./_global":9,"./_library":14}],19:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":13}],20:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],21:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":9,"./_shared":18,"./_uid":20}],22:[function(require,module,exports){
// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

},{"./_fix-re-wks":8}],23:[function(require,module,exports){
// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

},{"./_fix-re-wks":8}],24:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.regexp.replace");

function calc() {
  var persons = document.getElementsByClassName('counter-block-input')[0],
      //Инпут ввода количества людей
  restDays = document.getElementsByClassName('counter-block-input')[1],
      //Инпут ввода количества дней
  place = document.getElementById('select'),
      //Выбор туристического направления 
  totalValue = document.getElementById('total'),
      //Ячейка вывода общей суммы
  personsSum = 0,
      //Переменная количества людей
  daysSum = 0,
      //Переменная количества дней
  total = 0,
      //Переменная общей суммы
  result = 0; //Переменная общей суммы с учетом коэффициента туристического направления

  totalValue.innerHTML = 0; //Изначальная установка нуля в ячейке общей суммы


  persons.addEventListener('keyup', function() {
//Проверка инпута на запрет ввода ё, точки, запятой, букв и спецсимволов
    this.value = this.value.replace(/[^\d]*/g)
                             .replace(/^[^\d]*(\d+([.,]\d{0,5})?).*$/g, '$1');
// this.value = this.value.replace(/[+\.\,ёЁ]/,'');
    personsSum = +this.value;//Присвоение переменной значения инпута
//Обнуление итогового числа, если одно из полей пустое
    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
      total = 0;
//Обнуление итогового числа, если в одно из полей введен 0
    } else if (restDays.value == 0 || persons.value == 0) {
      totalValue.innerHTML = 0;
      total = 0;
    } else {
      total = (daysSum + personsSum) * 4000;//Вычисление итоговой суммы
//Вычисление итоговой суммы с учетом коэффициента выбранного направления путеществия
      result = total * place.options[place.selectedIndex].value;
      animateValue('total', 0, result, 2000);//Запуск функции анимации числа
    }
  });

  restDays.addEventListener('keyup', function() {
//Проверка инпута на запрет ввода ё, точки, запятой, букв и спецсимволов
    this.value = this.value.replace(/[^\d]*/g)
                             .replace(/^[^\d]*(\d+([.,]\d{0,5})?).*$/g, '$1');
        // this.value = this.value.replace(/[+\.\,ёЁ]/,'');
    daysSum = +this.value;//Присвоение переменной значения инпута
//Обнуление итогового числа, если одно из полей пустое    
    if (persons.value == '' || restDays.value == '') {
      totalValue.innerHTML = 0;
      total = 0;
//Обнуление итогового числа, если в одно из полей введен 0
    } else if (restDays.value == 0 || persons.value == 0) {
      totalValue.innerHTML = 0;
      total = 0;
    } else {
      total = (daysSum + personsSum) * 4000;//Вычисление итоговой суммы
//Вычисление итоговой суммы с учетом коэффициента выбранного направления путеществия  
      result = total * place.options[place.selectedIndex].value;
      animateValue('total', 0, result, 2000);//Запуск функции анимации числа
    }
  });
//Обнуление итогового числа, если одно из полей пустое
  place.addEventListener('change', function() {
    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
      total = 0;
    } else if (restDays.value == 0 || persons.value == 0) {
      totalValue.innerHTML = 0;
      total = 0;
    } else {
//Вычисление итоговой суммы с учетом коэффициента выбранного направления путеществия
      result = total * place.options[place.selectedIndex].value;
      animateValue('total', 0, result, 2000);//Запуск функции анимации числа  
    }
  });
  /* ПЕРЕБОР ЦИФР */

  /* Функция принимает id элемента вывода результата, начало и конец перебора цифр
  и длительность анимации */

  function animateValue(id, start, end, duration) {
    var range = end - start,
        //Период перебора цифр
    current = start,
        //Текущее число (изменяется в процессе перебора цифр)
    increment = 1000,
        //Шаг с которым будет увеличиваться итоговая сумма
    //Расчет скорости перебора, которая зависит от длительности и конечного числа
    stepTime = Math.abs(Math.floor(duration / range)),
        element = document.getElementById(id); //Элемент (ячейка) вывода числа на экран
    //Функция таймера

    var timer = setInterval(function () {
      current += increment; //Увеличение текущего значения на заданный шаг

      element.innerHTML = current; //Вывод текущего числа в элемент на экран

      if (current >= end) {
        //Обнуление таймера при достижении конечного числа
        clearInterval(timer);
      }
    }, stepTime);
  }
}

module.exports = calc;
},{"core-js/modules/es6.regexp.replace":23}],25:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.regexp.match");

function complex() {
  //Получение версии IE или Edge
  var version = detectIE(),
      //Задаем функцию определения IE или EDGE в переменную
  browser; //Присваиваем переменной true или false в зависимости от определения браузера

  if (version === false) {
    browser = true;
  } else if (version >= 12) {
    browser = false;
  } else {
    browser = false;
  } //Функция определения браузера возвращает версию IE или афдыу если браузер другой


  function detectIE() {
    //Определяем, является ли текущий браузер IE
    var ua = window.navigator.userAgent,
        msie = ua.indexOf('MSIE ');

    if (msie > 0) {
      //Если IE 10 или младшей версии функция возвращает номер версии
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');

    if (trident > 0) {
      //Если IE 11 версии функция возвращает номер версии
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');

    if (edge > 0) {
      //Усли Edge (или IE 12 версии и выше) функция возвращает номер версии
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    } //Функция возвращает false,если текущий браузер не IE и не EDGE


    return false;
  }

  ; //Функция проверки на мобильный браузер

  var mobileBrowser;

  function mobileBrowserCheck() {
    //Проверка на конкретный мобильный браузер
    var isMobile = {
      Android: function Android() {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function BlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function iOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function Opera() {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function Windows() {
        return navigator.userAgent.match(/IEMobile/i);
      },
      //Проверка на любой мобильный браузер
      any: function any() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
      }
    }; //Возврат функцией true, если браузер мобильный

    if (isMobile.any()) {
      mobileBrowser = true;
    }
  }

  ;
  mobileBrowserCheck();
  /* МОДАЛЬНОЕ ОКНО */
  //Задаем переменные кнопки открытия модального окна, оверлея и закрытия

  var more = document.querySelector('.more'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close'); //Открытие модального окна

  more.addEventListener('click', function () {
    if (mobileBrowser !== true) {
      more.classList.add('more-splash');
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    } else {
      return false;
    }
  }); //Закрытие модального окна

  close.addEventListener('click', function () {
    if (mobileBrowser !== true) {
      overlay.style.display = 'none';
      more.classList.remove('more-splash');
      document.body.style.overflow = '';
    } else {
      return false;
    }
  }); //Закрытие модального окна нажатем Esc

  document.onkeydown = function (e) {
    if (e.keyCode === 27) {
      overlay.style.display = 'none';
      more.classList.remove('more-splash');
      document.body.style.overflow = '';
    }
  };
  /* ПРИВЯЗКА МОДАЛЬНОГО ОКНА К КНОПКАМ В ТАБАХ */
  //Функция реализации обработчика события


  function descBtnFunc() {
    //Получение псевдомассива кнопок
    var descBtns = document.querySelectorAll('.description-btn');

    if (mobileBrowser !== true) {
      var _loop = function _loop(i) {
        //Привязка к кнопкам обработчика события
        descBtns[i].addEventListener('click', function () {
          descBtns[i].classList.add('more-splash');
          overlay.style.display = 'block';
          document.body.style.overflow = 'hidden';
        });
      };

      //Перебор циклом всех кнопок в псевдомассиве
      for (var i = 0; i < descBtns.length; i++) {
        _loop(i);
      }
    } else {
      return false;
    }
  }

  ;
  descBtnFunc();
}

module.exports = complex;
},{"core-js/modules/es6.regexp.match":22}],26:[function(require,module,exports){
"use strict";

function form() {
  //Форма
  var message = new Object();
  var form = document.getElementsByClassName('main-form')[0],
      input = form.getElementsByTagName('input'),
      statusMessage = document.createElement('div');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.appendChild(statusMessage); // AJAX

    var request = new XMLHttpRequest();
    request.open("POST", 'server.php');
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var formData = new FormData(form);
    request.send(formData);

    request.onreadystatechange = function () {
      if (request.readyState < 4) {
        //Добавляем класс с картинкой при ожидании отправки формы
        statusMessage.classList.add('form-awaiting');
      } else if (request.readyState === 4) {
        //Убираем класс с картинкой ожидания после достижения следующего статуса соединения с сервером
        statusMessage.classList.remove('form-awaiting');

        if (request.status == 200) {
          //Добавляем класс с картинкой при успешной отправке формы
          statusMessage.classList.add('form-success');
        } else {
          //Добавляем класс с картинкой при неудачной попытке отправки формы
          statusMessage.classList.add('form-failure');
        }
      }
    }; //Очистка инпутов


    for (var i = 0; i < input.length; i++) {
      input[i].value = '';
    }
  });

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

module.exports = form;
},{}],27:[function(require,module,exports){
"use strict";

function scroll() {
  function animate(draw, duration) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
      var timePassed = time - start;

      if (timePassed > duration) {
        timePassed = duration;
      }

      draw(timePassed);

      if (timePassed < duration) {
        requestAnimationFrame(animate);
      }
    });
  }

  ;
  var navigation = document.getElementsByTagName('nav')[0];
  navigation.addEventListener('click', function (event) {
    event.preventDefault();
    animate(function (timePassed) {
      var target = event.target,
          section = document.getElementById(target.getAttribute('href').slice(1));
      window.scrollBy(0, section.getBoundingClientRect().top / 20 - 4);
    }, 1200);
  });
}

module.exports = scroll;
},{}],28:[function(require,module,exports){
"use strict";

function slider() {
  var slideIndex = 1,
      //Устанавливаем текущий слайд
  //Получаем псевдомассив слайдов
  slides = document.getElementsByClassName('slider-item'),
      slider = document.querySelector('.wrap'),
      //Получаем контейнер слайдера
  prev = document.querySelector('.prev'),
      //Стрелка влево
  next = document.querySelector('.next'),
      //Стрелка вправо
  dotsWrap = document.querySelector('.slider-dots'),
      //Блок точек
  dots = document.getElementsByClassName('dot'),
      //Псевдомассив точек
  timer; //Переменная для установки таймера

  function showSlides(n) {
    if (n > slides.length) {
      //Возврат к первому слайду после перебора всего псевдомассива слайдов
      slideIndex = 1;
    }

    ;

    if (n < 1) {
      //Возврат в конец псевдомассива после перебора всего псевдомассива слайдов в оратном направлении
      slideIndex = slides.length;
    }

    ; //Скрытие через цикл всех слайдов

    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    ; //Удаление через цикл класса dot-active у точек слайдера

    for (var _i = 0; _i < dots.length; _i++) {
      dots[_i].classList.remove('dot-active');
    }

    ; //Установка видимости текущего слайда и точки

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }

  ;
  /* Функция увеличения индекса активного слайда.
  Получает данные (n) из обработчика событий prev и next */

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  ;

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  ; //Возврат на один слайд назад по клику

  prev.addEventListener('click', function () {
    plusSlides(-1);
  }); //Переключение на один слайд вперед по клику

  next.addEventListener('click', function () {
    plusSlides(1);
  }); //Переключение активной точки в соответствии с текущим слайдом

  dotsWrap.addEventListener('click', function (e) {
    for (var i = 0; i < dots.length + 1; i++) {
      if (e.target.classList.contains('dot') && e.target == dots[i - 1]) {
        currentSlide(i);
      }
    }
  });
  /* Приостановка автоматического переключения слайдов 
  при наведении курсора на контейнер (wrap) */

  slider.addEventListener('mouseenter', function (e) {
    clearInterval(timer);
  });
  /* Возобновление автоматического переключения слайдов 
  при выводе курсора за пределы контейнера (wrap) */

  slider.addEventListener('mouseleave', function (e) {
    timer = setInterval(function () {
      next.click();
    }, 3000);
    showSlides(slideIndex);
  }); //Переключение слайдов вперед/назад стрелками курсора

  window.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowLeft') {
      prev.click();
    }

    if (e.key === 'ArrowRight') {
      next.click();
    }
  }); //установка таймера автоматического переключения слайдов с интервалом в 5 секунд

  timer = setInterval(function () {
    next.click();
  }, 3000);
  showSlides(slideIndex);
}

module.exports = slider;
},{}],29:[function(require,module,exports){
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
},{}],30:[function(require,module,exports){
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
},{}]},{},[1]);
