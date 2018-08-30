function slider() {
	let slideIndex = 1,//Устанавливаем текущий слайд
	//Получаем псевдомассив слайдов
	slides = document.getElementsByClassName('slider-item'),
	slider = document.querySelector('.wrap'),//Получаем контейнер слайдера
	prev = document.querySelector('.prev'),//Стрелка влево
	next = document.querySelector('.next'),//Стрелка вправо
	dotsWrap = document.querySelector('.slider-dots'),//Блок точек
	dots = document.getElementsByClassName('dot'),//Псевдомассив точек
	timer;//Переменная для установки таймера

function showSlides(n) {
	if (n > slides.length) {
//Возврат к первому слайду после перебора всего псевдомассива слайдов
		slideIndex = 1;
	};
	if (n < 1) {
//Возврат в конец псевдомассива после перебора всего псевдомассива слайдов в оратном направлении
		slideIndex = slides.length;
	};
//Скрытие через цикл всех слайдов
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
	};
//Удаление через цикл класса dot-active у точек слайдера
	for (let i = 0; i < dots.length; i++) {
		dots[i].classList.remove('dot-active');
	};
//Установка видимости текущего слайда и точки
	slides[slideIndex - 1].style.display = 'block';
	dots[slideIndex - 1].classList.add('dot-active');
};
/* Функция увеличения индекса активного слайда.
Получает данные (n) из обработчика событий prev и next */
	function plusSlides(n) {
		showSlides(slideIndex += n);
	};

	function currentSlide(n) {
		showSlides(slideIndex = n);
	};
//Возврат на один слайд назад по клику
	prev.addEventListener('click', function() {
		plusSlides(-1);
	});
//Переключение на один слайд вперед по клику
	next.addEventListener('click', function() {
		plusSlides(1);
	});
//Переключение активной точки в соответствии с текущим слайдом
	dotsWrap.addEventListener('click', function(e) {
		for (let i = 0; i < dots.length + 1; i++) {
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
    });
//Переключение слайдов вперед/назад стрелками курсора
    window.addEventListener('keyup', function (e) {
        if (e.key === 'ArrowLeft') {
            prev.click();
        }
        if (e.key === 'ArrowRight') {
            next.click();
        }
    });
//установка таймера автоматического переключения слайдов с интервалом в 5 секунд
	timer = setInterval(function () {
        next.click();
    }, 3000);

showSlides(slideIndex);
}

module.exports = slider;