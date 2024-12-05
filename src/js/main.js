/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import { MousePRLX } from './libs/parallaxMouse'
// import AOS from 'aos'
// import Swiper, { Navigation, Pagination } from 'swiper';


// import { PopupManager } from './modules/popup-manager';
// import { Tabs } from './modules/tabs';


// import rangeSlider from './modules/range-slider.js';

// ----------------------------------------------------- Базовые скрипты --------------------------------------------------------
import { BaseHelpers } from './helpers/base-helpers';
BaseHelpers.addLoadedClass();

BaseHelpers.checkWebpSupport();
BaseHelpers.calcScrollbarWidth();
BaseHelpers.addTouchClass();
BaseHelpers.headerFixed();

// ----------------------------------------------------- Ленивая загрузка --------------------------------------------------------
import loadingPage from './modules/loading-page.js';
loadingPage()

// ----------------------------------------------------- Рейтинг звезды  ---------------------------------------------------------
import ratingStars from './modules/rating-stars.js'
ratingStars(1, 'Ваша оценка', '<i class="fa-solid fa-star"></i>')

// ----------------------------------------------------- Слайдер -----------------------------------------------------------------
// import carouselSplideInit from './modules/carousel-splide.js';
// carouselSplideInit()

// let slider = '.splide'
// let splideIs = document.querySelector(slider)
// if (splideIs) {
//   new Splide(slider, {
//     type: 'loop',       // (slide, loop, fade) - соответственно (незацикленное, зацикленное, замена путем fade эффекта)
//     direction: 'ltr',   // направление карусели (ltr, rtl, ttb) соответсвенно (слева на право, справа на лево, сверху вниз)
//     drag: true,          // разрешать перетаскивать слайдер
//     autoplay: true,      // включить авто перелистывание
//     interval: 2000,      // интервал автоматического перелистывания слайдов в м\сек
//     pauseOnHover: true,  // остановить автоматическое перелистывание при наведении курсора мыши

//     perMove: 1,          // количество перемещаемых слайдов за раз
//     perPage: 1,          // Количество слайдов 
//     gap: '1rem', // зазор между слайдами

//     height: '100%',     // высота карусели
//     padding: {           // (left, right) - для горизонтальной карусели (top, bottom - для вертикальной карусели)
//       left: 0,
//       right: 0
//     },

//     arrows: true,        // отображать стрелки
//     heightRatio: 0.2,   // кэф высоты стрелок

//     pagination: true,   // отображать пагинацию

//     speed: 5000,         // скорость перелистывания в м\сек
//     rewindSpeed: 5000,   // скорость перемотки слайдов

//     rewind: true,   // позволяет вообще перемотку слайдов
//     rewindByDrag: true,  // позволяет делать перемотку слайдов перетаскиванием мыши
//   }).mount();
// }

// ----------------------------------------------------- Аккордион -----------------------------------------------------------------
import { Accordion } from './modules/accordion.js';
new Accordion('.accordion', {
  shouldOpenAll: false, // true
  defaultOpen: [], // [0,1]
  collapsedClass: 'open',
});

// ---------------------------------------- Переключатель темы СВЕТ.\ТЕМН. ---------------------------------------------------------
import modeSwitcher from './modules/mode-switcher.js';
const modeOptions = {
  btnClass: 'inline',
  lightClass: 'light-mode',
  lightTextClass: 'light-color--text',
  darkClass: 'dark-mode',
  darkTextClass: 'dark-color--text',
  darkIcon: '<i class="fa-regular fa-moon"></i>',
  darkText: '<span>Тёмная</span>',
  lightIcon: '<i class="fa-regular fa-sun"></i>',
  lightText: '<span>Светлая</span>',
}
modeSwitcher(modeOptions);

// ---------------------------------------- Подключаем MULTI SELECT -----------------------------------------
import { MultiSelect } from './modules/multi-select.js'

// --- Подключаем все имеющиеся на странице множественные селекты с аттрибутом [data-multi-select] -----------
// document.querySelectorAll('[data-multi-select]').forEach(select => new MultiSelect(select));



let multiSelect = document.querySelector('[data-multi-select]')
new MultiSelect(multiSelect, {
  placeholder: 'Выбирайте что нибудь',         // плейсхолдер селекта
  selectAllText: 'Выбрать все !',              // текст для пункта ВЫБРАТЬ ВСЕ
  howMuchText: "выбрано !",                    // текст для варианта listAll = false показ количества выбранных елементов числом
  searchText: 'Поиск...',                      // плейсхолдер формы ПОИСКА
  showCounter: false,                           // показывать ли счетчик выбранных пунктов 
  max: 5,                                      // количество выбираемых пунктов
  search: true,                                // показывать форму ПОИСКА
  selectAll: true,                             // показывать пункт ВЫБРАТЬ ВСЕ   
  listAll: true,                               // true - перечислять все элементы, false - количество числом
  closeListOnItemSelect: false,                 // закрывать ли после выбора
  edge: 0,                                     // сдвиг для стрелочек вверх вних
  numberCells: 7,                              // количество выпадающих пунктов
  selectInDOM: false,                              // если true то остаеться select, если false то только inputs в div
  name: 'name1',                                    // добавить атрибут 
  width: '',                                   // онлайн стили ширина
  height: '',                                  // онлайн стили высота родителя
  dropdownWidth: '',                           // онлайн стили ширина выпадающего списка
  dropdownHeight: '',                          // высота выпадающего выставляеться в файле стилей, здесь не работает
})


// ---------------------------------------- Подключаем ONCE SELECT -----------------------------------------

import { OneSelect } from './modules/one-select.js'

let oneSelect = document.querySelector('[data-one-select]')
new OneSelect(oneSelect, {
  placeholder: 'Выбирайте один любой фрукт !',    // плейсхолдер селекта
  searchText: 'Поиск...',                         // плейсхолдер формы ПОИСКА
  search: true,                                   // показывать форму ПОИСКА
  closeListOnItemSelect: true,                    // закрывать ли после выбора
  edge: 0,                                        // сдвиг для стрелок вверх вниз
  numberCells: 5,                                 // количество выпадающих пунктов
  selectInDOM: true,                              // если true то остаеться select, если false то только inputs в div
  name: 'name2',                                  // добавить атрибут 
  width: '',                                      // онлайн стили ширина
  height: '',                                     // онлайн стили высота родителя
  dropdownWidth: '',                              // онлайн стили ширина выпадающего списка                                                 
})



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



// --------------- Меню Верхнего колинтула сайта и мобильное меню ------------------

import headerMenu from './modules/header-menu.js';
const optionsMenu = {
  burgerPosition: 'left',           // кнопка бургер справа
  direction: 'horizontal',           // напрвление меню
  method: 'opacity',                 // opacity, display
  methodHeaderSpeed: 300,            // скорость метода для главного меню
  methodMobileSpeed: 800,            // скорость метода для мобильного меню
  slideFunction: 'linear',           // функция метода для slidedown
  addButtonOpenAll: true,            // добавить кнопку открыть все class = 'mobileAllBtn'
  addButtonOpenHtml: '<i class="fa-solid fa-chevron-down"></i> Открыть все !',       // html для вставки в кнопку Открыть
  addButtonCloseHtml: '<i class="fa-solid fa-chevron-up"></i> Закрыть все !',   // html для вставки в кнопку Закрыть
  mobileAllOpened: false,            // сразу открытые все пункты мобильного меню и реагируют только родительские
  openHoverChildren: true,          // открывать ли потомков при ховере или нет
  closeChildren: true,               // закрывать всех потомков ниже или нет
  closeRootMobile: true,             // закрывать за собой дочерние пункты меню или нет
  closeHoverChildren: true,          // закрывать дочерние главного меню после ховера или нет
  openHoverDelay: 100,               // задержка до появления пункта меню при ховере
  closeHoverRootDelay: 500,          // основная задержка для главного меню
  closeHoverChildrenDelay: 1000,      // задержка после ховера только дочерних пунктов
  addHeaderArrows: true,             // добавлять ли стрелочки или нет для главного меню
  addMobileArrows: true,             // добавлять ли стрелочки или нет для мобильного меню
  mobileArrowIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>',
  headerArrowIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>',
}
headerMenu(optionsMenu);

/**
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * На кнопку, которая вызывает окно повешай атрибут data-type="<название окна>"

 * На обертку(.popup) окна добавь атрибут '[data-close-overlay]'
 * На кнопку для закрытия окна добавь класс '.button-close'
 * */
// new PopupManager();

/**
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */
// AOS.init();

/**
 * Параллакс мышей
 * */
// new MousePRLX();

// new Tabs('tabs-example', {
// 	onChange: (data) => {
// 		console.log(data);
// 	},
// });

//-------------------------------Range slider------------------------------------
// rangeSlider();

//--------------------------инициализация ProductGallery ------------------------
// import { productTabs } from './modules/product-gallery.js';
// import productGallery from './modules/product-gallery.js';
// // ---- здесь в связке работает Owl-carousel 2, magnific-popup и табы ! ---------

// productGallery();
// new productTabs('product-tabs', {
// 	onChange: (data) => {
// 		console.log(data);
// 	},
// });
//-------------------------------------------------------------------------------






