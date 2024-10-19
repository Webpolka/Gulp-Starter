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

import { BaseHelpers } from './helpers/base-helpers';
// import { PopupManager } from './modules/popup-manager';
// import { Tabs } from './modules/tabs';
// import { Accordion } from './modules/accordion';
// import mobileNav from './modules/mobile-nav.js';
// import rangeSlider from './modules/range-slider.js';
import owlCarousel from './modules/owl-carousel.js';
import ratingInput from './modules/rating.js';



// import { productTabs } from './modules/product-gallery.js';
// import productGallery from './modules/product-gallery.js';

BaseHelpers.checkWebpSupport();

BaseHelpers.calcScrollbarWidth();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();

BaseHelpers.headerFixed();

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

// new Accordion('.accordion', {
// 	shouldOpenAll: false, // true
// 	defaultOpen: [], // [0,1]
// 	collapsedClass: 'open',
// });

// Мобильная навигация
//---------------Навигация и работа  под меню в мобильном меню ------------------

// mobileNav();	

// function mobileSubNav() {	
    		
//     $('ul.mobile-nav__list>li').click(function () {
//         var _thisis = $(this);	
//         if (_thisis.hasClass('opened')) {
//             $('.mobile-nav ul.nav__sublist').slideUp();
//             _thisis.children('ul').slideUp();
//             _thisis.removeClass('opened');

//         } else {
//             $('.mobile-nav ul.nav__sublist').slideUp();
//             $('ul.mobile-nav__list>li').removeClass('opened')
//             _thisis.children('ul').slideDown();
//             _thisis.addClass('opened');
//         }
//     })
// }
// mobileSubNav();


// ----------------------------Header Menu Hover intent------------------------
// var timer;
// var delay = 1000;

// function hoverIntent() {   
//     $('ul.header-nav__list>li').hover(function () {
//         var _this = $(this);
//         $('ul.header-nav__list>li').removeClass('hover');			
//         _this.addClass('hover');
//         clearTimeout(timer);
//     }, function () {
//         var _this = $(this);
//         timer = setTimeout(function () {
//             _this.removeClass('hover');
//         }, delay);
//     });
// }
// hoverIntent();

//-------------------------------Range slider------------------------------------

// rangeSlider();

//--------------------------инициализация ProductGallery ------------------------
// ---- здесь в связке работает Owl-carousel 2, magnific-popup и табы ! ---------
// productGallery();
// new productTabs('product-tabs', {
// 	onChange: (data) => {
// 		console.log(data);
// 	},
// });
//-------------------------------------------------------------------------------

owlCarousel();

ratingInput();
