// Код для подключения Класса
//
// import { HoverIntentAddClass } from './myJsClasses/hover-intent-class.js'
// let newHover = new HoverIntentAddClass(
//   '#breadcrumb',           //  родительский контейнер
//   'li',                    //  отслеживаемые елементы в родительском контейнере
//   100,                     //  интервал - задержка при наведении курсора
//   500,                     //  тайм-аут это задержка при покинутом елементе
//   doOver,                  //  callBack функция при наведении
//   {age:30, bool:true, name:'kuzya'},     //  аргумент к функции при наведении
//   doLeave,                 //  callBack функция при выходе
//   '2'                      //  аргумент к функции при выходе
// )
// newHover.init()

// // если нужно передать несколько аргументов к функции, передаем объектом или массивом
// function doOver(arg) {
//   console.log('Over 1 -', arg.age);
//   console.log('Over 2 -', arg.bool);
//   console.log('Over 3 -', arg.name);
// }
// function doLeave(arg) {
//   console.log('Leave -', arg);
// }
//
// --------------------- HTML -------------------------
// <ul class="breadcrumb" id="breadcrumb">
//   <li><a href="#">Главная</a></li>
//   <li><a href="#">Картины</a></li>
//   <li><a href="#">Лето 15</a></li>
//   <li><a href="#">Горячие головы</a></li>
//   <li><a href="#">Зимние каникулы</a></li>
// </ul>
// 
// -------------------- JS CLASS ------------------------
// 
// ---- ХоверИнтент от Weblegko вешает класс 'active', и сбрасывает таймер задержки меню , при переходе на другой пункт

export class HoverIntentAddClass {
	constructor(parentNode, childNode, pauseOver, pauseOut, callBackOver, callBackOverArg, callBackLeave, callBackLeaveArg) {
		this.timerOver;
		this.timerOut;
		this.elements = document.querySelector(parentNode).querySelectorAll(childNode);
		this.pauseOver = pauseOver;
		this.pauseOut = pauseOut;
		this.prevElement;
		this.callBackOverArg = callBackOverArg;
		this.callBackLeaveArg = callBackLeaveArg;
		this.callBackOver = callBackOver;
		this.callBackLeave = callBackLeave;
	}
	overLeave() {
		let pauseOver = this.pauseOver;
		let pauseOut = this.pauseOut;
		let prevElement = this.prevElement;
		let callBackOn = this.callBackOver; 
		let callBackOut = this.callBackLeave; 
		let overArg = this.callBackOverArg;
		let leaveArg = this.callBackLeaveArg;

		this.elements.forEach(function (element) {

			// --------------- Когда курсор над пунктом ----------
			element.addEventListener('mouseenter', function (event) {
				event.stopPropagation()			
				clearTimeout(this.timerOut)
				if (element && element !== prevElement && prevElement !== undefined) prevElement.classList.remove('active')
				this.timerOver = setTimeout(function () {
					if (!element.classList.contains('active')) element.classList.add('active');	
					if(callBackOn)callBackOn(overArg);			
				}, pauseOver);
			});

			// --------------- Когда курсор вне пункта ----------
			element.addEventListener('mouseleave', function (event) {
				event.stopPropagation()
				clearTimeout(this.timerOver)
				this.timerOut = setTimeout(function () {
					if (element.classList.contains('active')) element.classList.remove('active');	
					if(callBackOut)callBackOut(leaveArg);					
				}, pauseOut);
				if (element) prevElement = element
			});
		});
	}
	init() {
		this.overLeave();
	}
}
