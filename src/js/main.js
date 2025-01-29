// ----------------------------------------------------- Базовые скрипты --------------------------------------------------------
import { BaseHelpers } from './helpers/base-helpers';
BaseHelpers.addLoadedClass();
BaseHelpers.checkWebpSupport();
BaseHelpers.calcScrollbarWidth();
BaseHelpers.addTouchClass();
BaseHelpers.headerFixed();

// ----------------------------------------------------- Menu Header --------------------------------------------------------
import textPopup from './modules/text-popup.js';
textPopup()
// доступ через классы : 
// #popup #popupClose - для кликов, 
// .popup--show - для отображения
// .popup-title .popup-content - для вставки HTML


// ----------------------------------------------------- Menu Header --------------------------------------------------------
import headerNav from './modules/header-nav.js';
headerNav({
  maxH: 90,
  logoMaxH: 72,
})

import { HoverIntentToggleClass } from './myJsClasses/hover-intent-class.js'
if (document.querySelector('#headerNavigation') && (document.querySelectorAll('.menu>li').length > 1)) {
  new HoverIntentToggleClass(
    '#headerNavigation',           //  родительский контейнер
    '.menu>li',                    //  отслеживаемые елементы в родительском контейнере
    50,                     //  интервал - задержка при наведении курсора
    600,                     //  тайм-аут это задержка при покинутом елементе
  ).init()
}

// ---------------------------------------------- Датапикер ---------------------------------------------------------
import AirDatepicker from 'air-datepicker';
import checkProgram from './modules/check-program.js';
import forDatePicker from './modules/for-datepicker.js';

let decriptions = document.querySelectorAll('.inputs-description')
let localText = decriptions[0].innerHTML
let dateText = decriptions[1].innerHTML
let humansText = decriptions[2].innerHTML
forDatePicker();

const datapicker = document.querySelector('#datePicker')
if (datapicker) {
  new AirDatepicker('#datePicker', {
    autoClose: true,
    range: true,
    multipleDates: 2,
    multipleDatesSeparator: ' - ',
    buttons: ['today', 'clear'],
    onSelect({ date, formattedDate, datepicker }) {
      checkProgram(decriptions, localText, dateText, humansText);
    }
  });
}
// ------------------------------------------- ONE SELECT  ----------------------------------------------------------
import { OneSelect } from './modules/one-select.js'

document.querySelectorAll('[data-one-select]').forEach(select => new OneSelect(select, {
  placeholder: 'Выбирайте локацию для тура!',    // плейсхолдер селекта
  searchText: 'Найти локацию...',                         // плейсхолдер формы ПОИСКА
  search: true,                                   // показывать форму ПОИСКА
  closeListOnItemSelect: true,                   // закрывать ли после выбора
  edge: 0,                                        // сдвиг для стрелок вверх вниз
  name: '',                                       // добавить атрибут 
  width: '',                                      // онлайн стили ширина
  height: '',                                     // онлайн стили высота родителя
  dropdownWidth: '',                              // онлайн стили ширина выпадающего списка                                                 
})
);
// --------------------------------------- INPUT BLOCKS SCROLL UP AND VALIDATE AJAX--------------------------------------------
let allOnesSelects = document.querySelector('.inputs-block').querySelectorAll('.one-select-header')
let allInputs = document.querySelector('.inputs-block').querySelectorAll('.input-count')
allOnesSelects.forEach(el => {
  el.addEventListener('click', (e) => {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - 75,
      behavior: "smooth"
    })

    e.stopPropagation();
  })
})
allInputs.forEach(el => {
  el.addEventListener('click', (e) => {
    let allWindows = document.querySelectorAll('.one-select-header');
    allWindows.forEach(el => {
      let t = el.parentNode;
      let oo = t.querySelector('.one-select-options')
      oo.classList.remove('options-open');
      let ii = t.querySelector('.one-select-header')
      ii.classList.remove('one-select-header-active');
    });
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - 75,
      behavior: "smooth"
    });
    e.stopPropagation();
  })
})
// ------------------------------------------- WL-POPUP -----------------------------------------------------------------------
import { WLPopUp } from './myJsClasses/wl-popup.js'
new WLPopUp({
  id: 'parent',                 // -- обязательно указывать (нужно для создания модального окна и должен совпадать с аттрибутом родителя--)
  parent: false,                 // -- true чтобы сгруппировать галлерейки по родителю, если false то все popup-item="child" в одном списке  
  item: 'child',                // -- аттрибут для дочерних эллементов 
  overlay: '' // -- кнопка для открытия popup (появл. при наведении курсора)
}).init()

// --------------------------------------------- masonry RESPONSIVE ----------------------------------
import { MasonryResponsive } from './myJsClasses/masonry-responsive.js'
new MasonryResponsive({
  delay: 200,  // Resize delay
  element: '.masonry-cell', // для цикла чтоб перебрать все элементы и поменять высоту  
  accentClass: 'accent'   // Берем контейнер по высоте ибзоражения внутри которого будем ровняться 
})

// --------------------------------------------- Buttons Listener ----------------------------------
import buttonsListener from './modules/buttons-listener.js'
buttonsListener()

import carouselSplideInit from './modules/carousel-splide.js';
carouselSplideInit()
new Splide('#popular', {
  type: 'slide',       // (slide, loop, fade) - соответственно (незацикленное, зацикленное, замена путем fade эффекта)
  direction: 'ltr',   // направление карусели (ltr, rtl, ttb) соответсвенно (слева на право, справа на лево, сверху вниз)
  drag: false,          // разрешать перетаскивать слайдер
  autoplay: true,      // включить авто перелистывание
  interval: 10000,      // интервал автоматического перелистывания слайдов в м\сек
  pauseOnHover: true,  // остановить автоматическое перелистывание при наведении курсора мыши

  perMove: 1,          // количество перемещаемых слайдов за раз
  perPage: 3,          // Количество слайдов 
  gap: '2rem', // зазор между слайдами

  height: '100%',     // высота карусели
  padding: {
    left: 0,
    right: 0
  }, 
  heightRatio: 0.2,   // кэф высоты стрелок

  pagination: false,   // отображать пагинацию

  speed: 8000,         // скорость перелистывания в м\сек
  rewindSpeed: 5000,   // скорость перемотки слайдов

  rewind: true,   // позволяет вообще перемотку слайдов
  rewindByDrag: true,  // позволяет делать перемотку слайдов перетаскиванием мыши

  breakpoints: {       // адаптивные опции  
    768: {
      perPage: 1,     
    },
    
    992: {
      perPage: 2,
    },
    1200: {
      perPage: 3,        
    }
  }
}).mount();

// ----------------------------------------------------- ChangeAble Carousel --------------------------------------------------
let carousel
let removeSliderClasses = {
  rowClass: 'row',
  additionalRowClasses: ['g-4','reveal-row'],
  colClass: 'col-xl-6',
  additionalColClasses: ['reveal-item'],
}
let createSliderClasses = {
  rowClass: 'splide__list',
  additionalRowClasses: [''],
  colClass: 'splide__slide',
  additionalColClasses: ['reveal-opacity'],
}

var x = window.matchMedia("(max-width: 1200px)")
function myFunction(x) {
  if (x.matches) {
    createSplide('#commentSlider', removeSliderClasses, createSliderClasses)
  } else {
    removeSplide('#commentSlider', removeSliderClasses, createSliderClasses)
  }
}
myFunction(x);
x.addEventListener("change", function () {
  myFunction(x);
});

function removeSplide(slider, remove, create) {
  let thisSlider = document.querySelector(slider)
  thisSlider.classList.remove('splide')

  let ul = thisSlider.querySelector('ul')
  if (ul) { ul.classList.replace(create.rowClass, remove.rowClass) }
 
  remove.additionalRowClasses.forEach(rowC=>{
    ul.classList.add(rowC)
  })  

  let lis = ul.querySelectorAll('li')
  lis.forEach(li => {
    li.className = ""
    li.classList.add(remove.colClass)
  
    remove.additionalColClasses.forEach(colC=>{
      li.classList.add(colC)
    })  
  }) 
  if(carousel)carousel.destroy();
}

function createSplide(slider, remove, create) {
  let thisSlider = document.querySelector(slider)
  thisSlider.classList.add('splide')

  let ul = thisSlider.querySelector('ul')
  if (ul) { ul.classList.replace(remove.rowClass, create.rowClass) }

  let lis = ul.querySelectorAll('li')
  if (lis) {
    lis.forEach(li => {
      li.className = ""
      li.classList.add(create.colClass)
      create.additionalColClasses.forEach(colC=>{
        li.classList.add(colC)
      })  
    })
  }
  carousel = new Splide('#commentSlider', {
    type: 'loop',       // (slide, loop, fade) - соответственно (незацикленное, зацикленное, замена путем fade эффекта)
    direction: 'ltr',   // направление карусели (ltr, rtl, ttb) соответсвенно (слева на право, справа на лево, сверху вниз)
    drag: false,          // разрешать перетаскивать слайдер
    autoplay: true,      // включить авто перелистывание
    interval: 8000,      // интервал автоматического перелистывания слайдов в м\сек
    pauseOnHover: true,  // остановить автоматическое перелистывание при наведении курсора мыши

    perMove: 1,          // количество перемещаемых слайдов за раз
    perPage: 1,          // Количество слайдов 
    gap: '2rem', // зазор между слайдами

    height: '100%',     // высота карусели
    // padding: {
    //   left: 0,
    //   right: '75px'
    // },

    arrows: true,        // отображать стрелки
    heightRatio: 0.2,   // кэф высоты стрелок

    pagination: false,   // отображать пагинацию

    speed: 5000,         // скорость перелистывания в м\сек
    rewindSpeed: 5000,   // скорость перемотки слайдов

    rewind: true,   // позволяет вообще перемотку слайдов
    rewindByDrag: true,  // позволяет делать перемотку слайдов перетаскиванием мыши      
  })
  carousel.mount();
}
// ------------------------------------------ VIDEO POPUP -------------------------------------------------
import {VideoPopup} from './myJsClasses/video-popup.js'
new VideoPopup();

// ------------------------------------------------- АНИМАЦИЯ ПРИ СКРОЛЛЕ ОТ ВЕБЛЕГКО --------------------------------------------------
import { WLScrollAnimation } from './myJsClasses/wl-scroll-animation.js'
// ---------- анимация при скролле одного родительского элемента(вколонке) и всех дочерних с нарастающей задержкой(вряду)------------------
new WLScrollAnimation({
  point: 0,                 // координаты по Y снизу на экране, когда начнет срабатывать скрипт(при скроле)
  delay: 150,                  // нарастающая задержка для элементов вряду
  parent: '.reveal-row',      // родительский элемент для организации цикла вряду
  child: '.reveal-item',         // элементы к которым будет применена анимация
  activeClass: 'active'       // активный класс для стилизации анимации
}).init()
new WLScrollAnimation({
  point: 50,
  child: '.reveal-col',
  activeClass: 'active'
}).init()
new WLScrollAnimation({
  point: 50,
  child: '.reveal-left',
  activeClass: 'active'
}).init()
new WLScrollAnimation({
  point: 50,
  child: '.reveal-right',
  activeClass: 'active'
}).init()
new WLScrollAnimation({
  point: 150,
  child: '.reveal-opacity',
  activeClass: 'active'
}).init()


