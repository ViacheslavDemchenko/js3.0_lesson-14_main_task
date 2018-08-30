function calc() {
	let persons = document.getElementsByClassName('counter-block-input')[0],//Инпут ввода количества людей
	restDays = document.getElementsByClassName('counter-block-input')[1],//Инпут ввода количества дней
	place = document.getElementById('select'),//Выбор туристического направления 
	totalValue = document.getElementById('total'),//Ячейка вывода общей суммы
	personsSum = 0,//Переменная количества людей
	daysSum = 0,//Переменная количества дней
	total = 0,//Переменная общей суммы
	result = 0;//Переменная общей суммы с учетом коэффициента туристического направления

	totalValue.innerHTML = 0;//Изначальная установка нуля в ячейке общей суммы

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
    let range = end - start,//Период перебора цифр
        current = start,//Текущее число (изменяется в процессе перебора цифр)
        increment = 1000,//Шаг с которым будет увеличиваться итоговая сумма
        //Расчет скорости перебора, которая зависит от длительности и конечного числа
        stepTime = Math.abs(Math.floor(duration / range)),
        element = document.getElementById(id);//Элемент (ячейка) вывода числа на экран

//Функция таймера
    let timer = setInterval(function() {
        current += increment;//Увеличение текущего значения на заданный шаг
        element.innerHTML = current;//Вывод текущего числа в элемент на экран
        if (current >= end) {//Обнуление таймера при достижении конечного числа
            clearInterval(timer);
        }
    }, stepTime);
}
}

module.exports = calc;