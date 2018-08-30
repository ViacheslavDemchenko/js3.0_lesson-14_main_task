function complex() {
	//Получение версии IE или Edge
let version = detectIE(),//Задаем функцию определения IE или EDGE в переменную
	browser;
//Присваиваем переменной true или false в зависимости от определения браузера
if (version === false) {
  browser = true;
} else if (version >= 12) {
  browser = false;
} else {
  browser = false;
}

//Функция определения браузера возвращает версию IE или афдыу если браузер другой
function detectIE() {
//Определяем, является ли текущий браузер IE
  let ua = window.navigator.userAgent,
		msie = ua.indexOf('MSIE ');

  if (msie > 0) {
//Если IE 10 или младшей версии функция возвращает номер версии
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  let trident = ua.indexOf('Trident/');
  if (trident > 0) {
//Если IE 11 версии функция возвращает номер версии
    let rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  let edge = ua.indexOf('Edge/');
  if (edge > 0) {
//Усли Edge (или IE 12 версии и выше) функция возвращает номер версии
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

//Функция возвращает false,если текущий браузер не IE и не EDGE
  return false;
};

//Функция проверки на мобильный браузер
let mobileBrowser;

function mobileBrowserCheck() {
//Проверка на конкретный мобильный браузер
		let isMobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    //Проверка на любой мобильный браузер
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
	};
//Возврат функцией true, если браузер мобильный
		if(isMobile.any()){
			mobileBrowser = true;
		}
};
mobileBrowserCheck();

/* МОДАЛЬНОЕ ОКНО */

//Задаем переменные кнопки открытия модального окна, оверлея и закрытия
let more = document.querySelector('.more'),
	overlay = document.querySelector('.overlay'),
	close = document.querySelector('.popup-close');

//Открытие модального окна
more.addEventListener('click', () => {
	if (mobileBrowser !== true) {
		more.classList.add('more-splash');
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden';
	} else {
		return false;
	}
});

//Закрытие модального окна
close.addEventListener('click', () => {
	if (mobileBrowser !== true) {
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';
	} else {
		return false;
	}
});

//Закрытие модального окна нажатем Esc
document.onkeydown = (e) => {
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
let descBtns = document.querySelectorAll('.description-btn');
	if (mobileBrowser !== true) {
//Перебор циклом всех кнопок в псевдомассиве
		for (let i = 0; i < descBtns.length; i++) {
//Привязка к кнопкам обработчика события
			descBtns[i].addEventListener('click', () => {
				descBtns[i].classList.add('more-splash');
				overlay.style.display = 'block';
				document.body.style.overflow = 'hidden';
			});
		}
	} else {
		return false;
	}
};
descBtnFunc();
}

module.exports = complex;