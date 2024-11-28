
function headerMenu(optionsMenu = {
    burgerPosition: 'right',
    direction: 'vertical',
    method: 'opacity',                 // opacity, display
    methodHeaderSpeed: 500,                  // скорость метода 
    methodMobileSpeed: 500,
    slideFunction: 'ease',
    addButtonOpenAll: true,            // добавить кнопку открыть все
    addButtonOpenHtml: 'Открыть',
    addButtonCloseHtml: 'Закрыть',
    mobileAllOpened: false,
    closeChildren: true,              // закрывать за собой дочерние пункты меню или нет
    closeRootMobile: false,
    openHoverChildren: true,
    closeHoverChildren: true,         // закрывать дочерние после ховера или нет
    openHoverDelay: 100,                 // задержка до появления пункта меню при ховере
    closeHoverRootDelay: 500,          // основная задержка    
    closeHoverChildrenDelay: 2000,    // задержка после ховера дочерних пунктов
    addHeaderArrows: false,
    addMobileArrows: false,
    mobileArrowIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>',
    headerArrowIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>',
}) {
    
    if (document.getElementById('header-menu') &&
        document.getElementById('mobile-menu') &&
        document.getElementById('mobile-burger')) {
        const headerMenu = document.getElementById('header-menu')
        const mobileMenu = document.getElementById('mobile-menu')
        const mobileBtn = document.getElementById('mobile-burger')

        var burgerPosition = optionsMenu.burgerPosition
        var direction = optionsMenu.direction
        var method = optionsMenu.method
        var methodHeaderSpeed = optionsMenu.methodHeaderSpeed
        var methodMobileSpeed = optionsMenu.methodMobileSpeed
        var slideFunction = optionsMenu.slideFunction
        var addButtonOpenAll = optionsMenu.addButtonOpenAll
        var addButtonOpenHtml = optionsMenu.addButtonOpenHtml
        var addButtonCloseHtml = optionsMenu.addButtonCloseHtml
        var mobileAllOpened = optionsMenu.mobileAllOpened
        var closeChildren = optionsMenu.closeChildren
        var closeRootMobile = optionsMenu.closeRootMobile
        var openHoverChildren = optionsMenu.openHoverChildren
        var closeHoverChildren = optionsMenu.closeHoverChildren
        var openHoverDelay = optionsMenu.openHoverDelay
        var closeHoverRootDelay = optionsMenu.closeHoverRootDelay
        var closeHoverChildrenDelay = optionsMenu.closeHoverChildrenDelay
        var addHeaderArrows = optionsMenu.addHeaderArrows
        var addMobileArrows = optionsMenu.addMobileArrows
        var mobileArrowIcon = optionsMenu.mobileArrowIcon
        var headerArrowIcon = optionsMenu.headerArrowIcon


        var slideUpTimeout
        var slideDownTimeout
        if (direction === 'horizontal') headerMenu.classList.add('horizontal')
        if (direction === 'vertical') headerMenu.classList.add('vertical')
        if (method === 'display') headerMenu.classList.add('display')
        if (method === 'opacity') {
            headerMenu.classList.add('opacity')
            headerMenu.querySelectorAll('ul.menu>li').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })
            if (direction === 'horizontal' || direction === 'vertical') headerMenu.querySelectorAll('ul.menu>li ul.sub-menu').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })

        }       
        // ------------------------------ Создание обвертки для стилизации заглавных пунктов -----------------------
        class wrapCreate {
            constructor(navigation, containerTag, containerClass) {
                this.navigation = navigation;
                this.containerTag = containerTag;
                this.containerClass = containerClass;
            }
            createWraps() {
                let liAll = this.navigation.querySelectorAll('li')
                liAll.forEach(li => {
                    if (li.lastElementChild.tagName === 'UL') {
                        if (li.firstChild.tagName === 'A') {
                            var aNode = li.firstChild
                            aNode.classList.add('parent')
                            wrapContainer(aNode, this.containerTag, this.containerClass)
                        }
                        if (li.childNodes[1].tagName === 'A') {
                            var aNode = li.childNodes[1]
                            aNode.classList.add('parent')
                            var iNode = li.firstElementChild
                            wrapContainer(aNode, this.containerTag, this.containerClass, iNode)
                        }
                    }
                    if (li.lastElementChild.tagName === 'A' && li.firstElementChild.tagName === 'I') {
                        var aNode = li.lastElementChild
                        var iNode = li.firstElementChild
                        wrapContainer(aNode, this.containerTag, this.containerClass, iNode)
                    }
                })
            }
            init() {
                this.createWraps();
            }
        }

        class arrowsCreate {
            constructor(navigation, containerTag, containerClass, arrowBody, arrowClass) {
                this.navigation = navigation;
                this.containerTag = containerTag;
                this.containerClass = containerClass;
                this.arrowBody = arrowBody;
                this.arrowClass = arrowClass;
            }
            createArrows() {
                let liAll = this.navigation.querySelectorAll('li')
                liAll.forEach(li => {
                    if (li.lastElementChild.tagName === 'UL') {
                        if (li.firstChild.tagName === 'A') {
                            var aNode = li.firstChild
                            aNode.classList.add('parent')
                            wrapContainer(aNode, this.containerTag, this.containerClass)
                            aNode.insertAdjacentHTML('afterend', this.arrowBody)
                            let container = li.firstElementChild
                            let caret = container.lastElementChild
                            caret.setAttribute('class', this.arrowClass)
                        }
                        if (li.childNodes[1].tagName === 'A') {
                            var aNode = li.childNodes[1]
                            aNode.classList.add('parent')
                            var iNode = li.firstElementChild
                            wrapContainer(aNode, this.containerTag, this.containerClass, iNode)
                            aNode.insertAdjacentHTML('afterend', this.arrowBody)
                            let container = li.firstElementChild
                            let caret = container.lastElementChild
                            caret.setAttribute('class', this.arrowClass)
                        }
                    }
                    if (li.lastElementChild.tagName === 'A' && li.firstElementChild.tagName === 'I') {
                        var aNode = li.lastElementChild
                        var iNode = li.firstElementChild
                        wrapContainer(aNode, this.containerTag, this.containerClass, iNode)
                    }
                })
            }
            init() {
                this.createArrows();
            }
        }
        // -  СОЗДАНИЕ КЛОНА МЕНЮ ХЕДЕРА ДЛЯ МОБИЛЬНОГО МЕНЮ -----
        if (headerMenu && mobileMenu) {
            let headerUl = headerMenu.querySelector('ul.menu')
            var clone = headerUl.cloneNode(true)
            mobileMenu.appendChild(clone)
        } else {
            console.log('ПРЕДУПРЕЖДЕНИЕ ! Разберись в разметке !');
        }



        if (addHeaderArrows) {
            // ------------------------- СОЗДАЕМ КНОПКИ ДЛЯ КЛИКА ДЛЯ ОТСЛЕЖИВАНИЯ СОБЫТИЙ ПО ПУНКТАМ МЕНЮ ----------------------
            let newArrowsInHeaderMenu = new arrowsCreate(
                headerMenu,                // меню
                'span',                    // тег для обвертки 
                'inrow',            // класс для обвертки 
                headerArrowIcon,
                'arrow-menu'
            );
            newArrowsInHeaderMenu.init();
        } else {
            // ------------------------- СОЗДАЕМ ОБВЕРТКИ ДЛЯ СТИЛИЗАЦИИ ----------------------
            let newWrapsHeaderMenu = new wrapCreate(
                headerMenu,                // меню
                'span',                    // тег для обвертки 
                'inrow',            // класс для обвертки 
            );
            newWrapsHeaderMenu.init();
        }
        if (addMobileArrows) {
            // ------------------------- СОЗДАЕМ КНОПКИ ДЛЯ КЛИКА ДЛЯ ОТСЛЕЖИВАНИЯ СОБЫТИЙ ПО ПУНКТАМ МЕНЮ ----------------------
            let newArrowsInMobileMenu = new arrowsCreate(
                mobileMenu,                // меню
                'span',                    // тег для обвертки 
                'inrow',            // класс для обвертки 
                mobileArrowIcon,
                'arrow-menu'
            );
            newArrowsInMobileMenu.init();
        } else {
            // ------------------------- СОЗДАЕМ ОБВЕРТКИ ДЛЯ СТИЛИЗАЦИИ ----------------------
            let newWrapsMobileMenu = new wrapCreate(
                mobileMenu,                // меню
                'span',                    // тег для обвертки 
                'inrow',            // класс для обвертки 
            );
            newWrapsMobileMenu.init();
        }

        // ---- ДОБАВИТЬ КНОПКУ ОТКРЫТЬ ВСЕ ДЛЯ МОБИЛЬНОГО МЕНЮ ---
        if (addButtonOpenAll) {
            var mobileCloseAllBtn = mobileMenu.appendChild(document.createElement('button'))
            mobileCloseAllBtn.className = 'mobileAllBtn'
            if (mobileAllOpened) mobileCloseAllBtn.classList.add('opened')
            mobileCloseAllBtn.classList.contains('opened') ? mobileCloseAllBtn.innerHTML = addButtonCloseHtml : mobileCloseAllBtn.innerHTML = addButtonOpenHtml

            mobileCloseAllBtn.addEventListener('click', (e) => {
                e.stopPropagation()
                mobileCloseAllBtn.classList.toggle('opened')
                mobileCloseAllBtn.classList.contains('opened') ? mobileCloseAllBtn.innerHTML = addButtonCloseHtml : mobileCloseAllBtn.innerHTML = addButtonOpenHtml
                mobileCloseAllBtn.classList.contains('opened') ? allOpened(mobileMenu, 1) : closeAllMenu(mobileMenu)
            })
        }
        if (mobileAllOpened) allOpened(mobileMenu, 0)

        // ------- ПЕРЕСТАВИТЬ mobileAfterContent ВКОНЕЦ ОЧЕРЕДИ -------
        if (document.getElementById('mobileUlAfter')) {
            var afterBegin = document.getElementById('mobileUlAfter')
            var clone = afterBegin.cloneNode(true)
            afterBegin.remove()
            var afterEnd = mobileMenu.appendChild(clone)
        }

        // --- Создаем куклу если бургер справа !!! ----
        if(burgerPosition === 'right'){
            let dollNode = document.createElement('div')
            dollNode.classList.add('dool-for-mediaquaries-burger-right')
            headerMenu.parentNode.insertBefore(dollNode, mobileBtn)                   
        }

        // ----------- Отслеживаем нажатие Бургера ----------------
        mobileBtn.appendChild(document.createElement('span'))

        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('mobile-menu--open')
            mobileBtn.classList.toggle('mobile-burger--active')
            document.body.classList.toggle('no-scroll')

            if (!mobileMenu.classList.contains('mobile-menu--open')) { mobileCloseAllBtn.classList.remove('opened') }
            mobileCloseAllBtn.classList.contains('opened') ? mobileCloseAllBtn.innerHTML = addButtonCloseHtml : mobileCloseAllBtn.innerHTML = addButtonOpenHtml
            mobileCloseAllBtn.classList.contains('opened') ? allOpened(mobileMenu, 1) : closeAllMenu(mobileMenu)
        })

        function closeAllMenu(menu) {
            let allLi = menu.querySelectorAll('ul.menu li')
            allLi.forEach(currLi => {
                if (currLi.lastElementChild.tagName === 'UL') {
                    slideUp(currLi.lastElementChild, methodHeaderSpeed / 2)
                }
                currLi.classList.remove('active')
            })
        }
        // --------------- Закрываем если мимо --------
        window.addEventListener('click', (event) => {
            if (!mobileMenu.firstElementChild.contains(event.target)) !mobileAllOpened && closeAllMenu(mobileMenu)
            if (!headerMenu.contains(event.target)) closeAllMenu(headerMenu)
        })

        // -------------------------------------------- HEADER ROOT LI HOVER----------------------------------------------------------------------
        var optsRoot = {
            timeout: closeHoverRootDelay,
            interval: openHoverDelay
        };
        headerMenu.querySelectorAll('ul.menu>li').forEach(currLi => {
            currLi.addEventListener('mouseenter', (event) => {
                event.stopPropagation()
                let rootLi = currLi.closest('ul.menu>li')
                clearTimeout(slideDownTimeout)
                closeAllAnotherRootHover(rootLi, headerMenu)
            })
            let listener = hoverintent(currLi,
                function () {
                    if (currLi.lastElementChild.tagName === 'UL' && method === 'display') {
                        currLi.lastElementChild.style.display = 'block'
                    } else if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity') {                        
                        resetProperty(currLi.lastElementChild)
                        clearTimeout(slideUpTimeout)
                        headerMenu.querySelectorAll('ul.menu>li').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })
                        headerMenu.querySelectorAll('ul.menu>li>ul.sub-menu').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })

                    }
                    currLi.classList.add('active')

                }, function () {
                    if (currLi.lastElementChild.tagName === 'UL' && method === 'display') {
                        currLi.lastElementChild.style.display = 'none'
                    } else if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity') {
                        resetProperty(currLi.lastElementChild)
                        clearTimeout(slideDownTimeout)
                        headerMenu.querySelectorAll('ul.menu>li').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })
                        headerMenu.querySelectorAll('ul.menu>li>ul.sub-menu').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })

                    }
                    currLi.classList.remove('active')

                    if (closeChildren) closeAll(currLi);
                }).options(optsRoot);
        })


        // -------------------------------------------------- HEADER CHILDREN LI HOVER---------------------------------------------------------------
        if (openHoverChildren) {
            var optsSub = {
                timeout: closeHoverChildrenDelay,
                interval: openHoverDelay
            };
            headerMenu.querySelectorAll('ul.menu>li>ul.sub-menu li').forEach(currLi => {
                let listener2 = hoverintent(currLi, function () {
                    if (!currLi.classList.contains('active')) {
                        if (currLi.lastElementChild.tagName === 'UL' && method === 'display') {
                            currLi.lastElementChild.style.display = 'block'

                        } else if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity' && direction === 'horizontal') {
                            resetProperty(currLi.lastElementChild)
                            clearTimeout(slideUpTimeout)
                            headerMenu.querySelectorAll('ul.menu>li').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })
                            headerMenu.querySelectorAll('ul.menu>li ul.sub-menu').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })

                        } else if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity' && direction === 'vertical') {
                            clearTimeout(slideUpTimeout)
                            resetProperty(currLi.lastElementChild)
                            slideDown(currLi.lastElementChild, methodHeaderSpeed)
                        }
                        currLi.classList.add('active')
                    }

                }, function () {
                    if (closeHoverChildren) {
                        if (currLi.lastElementChild.tagName === 'UL' && method === 'display') {
                            currLi.lastElementChild.style.display = 'none'

                        } else if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity' && direction === 'horizontal') {
                            resetProperty(currLi.lastElementChild)
                            clearTimeout(slideDownTimeout)
                            headerMenu.querySelectorAll('ul.menu>li').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })
                            headerMenu.querySelectorAll('ul.menu>li ul.sub-menu').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })

                        } else if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity' && direction === 'vertical') {
                            clearTimeout(slideDownTimeout)
                            resetProperty(currLi.lastElementChild)
                            slideUp(currLi.lastElementChild, methodHeaderSpeed / 2)

                        }
                        currLi.classList.remove('active')
                    }
                }).options(optsSub);

            })
        }
        // ------------------------------------------------ HEADER ROOT LI CLICK --------------------------------------------------------------

        headerMenu.querySelectorAll('ul.menu>li').forEach(currLi => {
            currLi.addEventListener('click', (event) => {
                event.stopPropagation()

                if (!currLi.classList.contains('active') && event.target.parentNode.classList.contains('inrow') && (event.target.tagName == 'svg' || event.target.tagName == 'path')) {
                    if (currLi.lastElementChild.tagName === 'UL' && method === 'display') {
                        currLi.lastElementChild.style.display = 'block'
                    } else if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity') {
                        resetProperty(currLi.lastElementChild)
                        clearTimeout(slideUpTimeout)
                        headerMenu.querySelectorAll('ul.menu>li').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })
                        headerMenu.querySelectorAll('ul.menu>li>ul.sub-menu').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })

                    }
                    currLi.classList.add('active')


                } else if (currLi.classList.contains('active') && (event.target.tagName == 'svg' || event.target.tagName == 'path')) {
                    if (currLi.lastElementChild.tagName === 'UL' && method === 'display') {
                        currLi.lastElementChild.style.display = 'none'
                    } else if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity') {
                        resetProperty(currLi.lastElementChild)
                        clearTimeout(slideDownTimeout)
                        headerMenu.querySelectorAll('ul.menu>li').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })
                        headerMenu.querySelectorAll('ul.menu>li>ul.sub-menu').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })

                    }
                    currLi.classList.remove('active')
                    if (closeChildren) closeAll(currLi);

                }

            })
        })


        // ------------------------------------------------ HEADER CHILDREN LI CLICK --------------------------------------------------------------

        headerMenu.querySelectorAll('ul.sub-menu li').forEach(currLi => {
            currLi.addEventListener('click', (event) => {
                event.stopPropagation()

                if (currLi.classList.contains('active') && (event.target.tagName == 'svg' || event.target.tagName == 'path')) {

                    if (currLi.lastElementChild.tagName === 'UL' && method === 'display') {
                        currLi.lastElementChild.style.display = 'none'

                    } else if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity' && direction === 'horizontal') {
                        resetProperty(currLi.lastElementChild)
                        clearTimeout(slideDownTimeout)
                        headerMenu.querySelectorAll('ul.menu>li').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })
                        headerMenu.querySelectorAll('ul.menu>li ul.sub-menu').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })

                    } else if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity' && direction === 'vertical') {
                        clearTimeout(slideDownTimeout)
                        resetProperty(currLi.lastElementChild)
                        slideUp(currLi.lastElementChild, methodHeaderSpeed / 2)
                    }

                    if (closeChildren) closeChild(currLi, headerMenu);
                    currLi.classList.remove('active')


                } else if (!currLi.classList.contains('active') && (event.target.tagName == 'svg' || event.target.tagName == 'path')) {

                    if (currLi.lastElementChild.tagName === 'UL' && method === 'display') {
                        currLi.lastElementChild.style.display = 'block'

                    } else if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity' && direction === 'horizontal') {
                        resetProperty(currLi.lastElementChild)
                        clearTimeout(slideUpTimeout)
                        headerMenu.querySelectorAll('ul.menu>li').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })
                        headerMenu.querySelectorAll('ul.menu>li ul.sub-menu').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })

                    } else if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity' && direction === 'vertical') {
                        clearTimeout(slideUpTimeout)
                        resetProperty(currLi.lastElementChild)
                        slideDown(currLi.lastElementChild, methodHeaderSpeed)
                    }
                    currLi.classList.add('active')
                }

            })
        })

        // ------------------------------------------------ MOBILE LI CLICK --------------------------------------------------------------

        mobileMenu.querySelectorAll('ul.menu li').forEach(li => {
            li.addEventListener('click', (event) => {
                event.stopPropagation()

                if (li.classList.contains('active') && (event.target.tagName == 'svg' || event.target.tagName == 'path')) {

                    if (li.lastElementChild.tagName === 'UL' && method === 'opacity') {
                        clearTimeout(slideDownTimeout)
                        clearTimeout(slideUpTimeout)
                        stopItemTransition(li.lastElementChild)
                        resetTransitionAllAnother(li.lastElementChild)
                        slideUp(li.lastElementChild, methodMobileSpeed)

                    } else if (li.lastElementChild.tagName === 'UL' && method === 'display') {
                        li.lastElementChild.style.display = 'none'
                    }
                    li.classList.remove('active')
                   
                    if (closeChildren) closeChild(li, mobileMenu);



                } else if (!li.classList.contains('active') && (event.target.tagName == 'svg' || event.target.tagName == 'path')) {

                    if (li.lastElementChild.tagName === 'UL' && method === 'opacity') {

                        if (!li.lastElementChild.offsetHeight && !li.classList.contains('active')) {
                            clearTimeout(slideUpTimeout)
                            clearTimeout(slideDownTimeout)
                            stopItemTransition(li.lastElementChild)
                            resetItemProperty(li.lastElementChild)
                            resetTransitionAllAnother(li.lastElementChild)
                            slideDown(li.lastElementChild, methodMobileSpeed)
                            li.classList.add('active')
                        }
                    } else if (li.lastElementChild.tagName === 'UL' && method === 'display' && !li.classList.contains('active')) {
                        li.lastElementChild.style.display = 'block'
                        li.classList.add('active')
                    }

                    if (closeRootMobile) closeRootsMobile(li, mobileMenu)


                }
            })
        })

        // --------------------------------------------- HELPERS------------------------------------------------------------------------

        function allOpened(menu, slideBool) {
            let allUls = menu.querySelectorAll('ul.sub-menu')
            allUls.forEach(currUl => {
                if (slideBool) {
                    if (currUl.tagName === 'UL' && !currUl.parentNode.classList.contains('active')) { slideDown(currUl, 300) }
                } else {
                    currUl.style.display = 'block';
                }
                currUl.parentNode.classList.add('active')
            })
        }
        function closeAll(rootLi) {
            let all = rootLi.querySelectorAll('li')
            all.forEach(currLi => {
                currLi.classList.remove('active')

                if (currLi.lastElementChild.tagName === 'UL' && method === 'display') {
                    currLi.lastElementChild.style.display = 'none'

                } else if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity' && direction === 'horizontal') {
                    resetProperty(currLi.lastElementChild)
                    headerMenu.querySelectorAll('ul.menu>li').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })
                    headerMenu.querySelectorAll('ul.menu>li ul.sub-menu').forEach(el => { el.style.transitionDuration = methodHeaderSpeed + 'ms'; })
                  

                } else if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity' && direction === 'vertical') {
                    resetProperty(currLi.lastElementChild)
                    slideUp(currLi.lastElementChild, methodHeaderSpeed / 2)
                }
            })
        }
        function closeAllAnotherRootHover(rootLi, menu) {
            let rootLis = menu.querySelectorAll('ul.menu>li')
            rootLis.forEach(currLi => {

                // -- закрывать родитетельские пункты если в нем нет текушего пункта
                if (!rootLi.contains(currLi)) {

                    if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity') {
                        slideUp(currLi.lastElementChild, methodHeaderSpeed / 7)
                    } else if (currLi.lastElementChild.tagName === 'UL' && method === 'display') {
                        currLi.lastElementChild.style.display = 'none'
                    }
                    currLi.classList.remove('active')

                    // -- закрывать дочерние пункты при переходе на другой родительский
                    let childLi = currLi.querySelectorAll('li')
                    childLi.forEach(chLi => {
                        if (chLi.lastElementChild.tagName === 'UL' && method === 'opacity') {
                            slideUp(chLi.lastElementChild, methodHeaderSpeed / 7)
                        } else if (chLi.lastElementChild.tagName === 'UL' && method === 'display') {
                            chLi.lastElementChild.style.display = 'none'
                        }
                        currLi.classList.remove('active')
                    })
                }
            })
        }

        // -- закрывать все родительские пункты кроме текущего
        function closeRootsMobile(li, menu) {
            let allRoot = menu.querySelectorAll('ul.menu>li')
            let curRoot = li.closest('ul.menu>li')
            allRoot.forEach(currLi => {
                if (curRoot !== currLi) {
                    if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity') {
                        // clearTimeout(slideDownTimeout)              
                        menu === headerMenu ? slideUp(currLi.lastElementChild, methodHeaderSpeed / 2.5) : slideUp(currLi.lastElementChild, methodMobileSpeed / 2.5)
                    } else if (currLi.lastElementChild.tagName === 'UL' && method === 'display') {
                        currLi.lastElementChild.style.display = 'none'
                    }
                    currLi.classList.remove('active');
                }
            })
        }

        // -- закрывать все дочерние пункты текущего пункта
        function closeChild(li, menu) {
            let allChildren = li.querySelectorAll('ul.sub-menu>li')

            allChildren.forEach(currLi => {
                if (currLi.lastElementChild.tagName === 'UL' && method === 'opacity') {
                    menu === headerMenu ? slideUp(currLi.lastElementChild, methodHeaderSpeed) : slideUp(currLi.lastElementChild, methodMobileSpeed)
                } else if (currLi.lastElementChild.tagName === 'UL' && method === 'display') {
                    currLi.lastElementChild.style.display = 'none'
                }
                currLi.classList.remove('active')
            })
        }

        // -- функция обвертывания ссылки и стрелорчки
        function wrapContainer(aNode, containerTag, containerClass, iNode) {
            let wrapper = document.createElement(containerTag);
            wrapper.classList.add(containerClass)
            aNode.parentNode.insertBefore(wrapper, aNode);
            if (iNode) wrapper.appendChild(iNode);
            wrapper.appendChild(aNode);
        }

        // ------------------------------------- ФУНКЦИИ ПЛАВНОГО ОТКРЫТИЯ SLIDEUP, SLIDEDOWN, SLIDETOGGLE----------------------------------------------

        var stopItemTransition = (target) => {
            target.style.height = getComputedStyle(target).height;
            target.style.paddingTop = getComputedStyle(target).paddingTop;
            target.style.paddingBottom = getComputedStyle(target).paddingBottom;
            target.style.marginTop = getComputedStyle(target).marginTop;
            target.style.marginBottom = getComputedStyle(target).marginBottom;
            target.style.paddingTop = getComputedStyle(target).paddingTop;
            target.style.overflow = getComputedStyle(target).overflow;
        }
        var resetProperty = (target) => {
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.style.removeProperty('transition-delay');
        }
        var resetItemProperty = (target) => {
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
        }

        var resetTransitionAllAnother = (target) => {
            let parent = target.closest('ul.menu>li')
            let targetAll = parent.querySelectorAll('ul.sub-menu')

            targetAll.forEach(item => {
                if (target !== item) {
                    item.style.removeProperty('height');
                    item.style.removeProperty('padding-top');
                    item.style.removeProperty('padding-bottom');
                    item.style.removeProperty('margin-top');
                    item.style.removeProperty('margin-bottom');
                    item.style.removeProperty('overflow');
                    item.style.removeProperty('transition-duration');
                    item.style.removeProperty('transition-property');
                    clearTimeout(slideUpTimeout)
                    clearTimeout(slideDownTimeout)
                }
            })
        }
        var slideUp = (target, duration) => {
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.transitionTimingFunction = slideFunction;
            target.style.boxSizing = 'border-box';
            target.style.height = target.offsetHeight + 'px';
            target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            slideUpTimeout = window.setTimeout(() => {
                target.style.display = 'none';
                target.style.removeProperty('height');
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.style.removeProperty('transition-timing-function');
            }, duration);
        }

        var slideDown = (target, duration, currentHeight) => {
            target.style.removeProperty('display');
            let display = window.getComputedStyle(target).display;

            if (display === 'none')
                display = 'block';

            target.style.display = display;
            let height = target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.boxSizing = 'border-box';
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + 'ms';
            target.style.transitionTimingFunction = slideFunction;
            target.style.height = height + 'px';
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            slideDownTimeout = window.setTimeout(() => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.style.removeProperty('transition-timing-function');
            }, duration);

        }

        var slideToggle = (target, duration) => {
            if (window.getComputedStyle(target).display === 'none') {
                return slideDown(target, duration);
            } else {
                return slideUp(target, duration);
            }
        }
    } else {
        console.log('ПРЕДУПРЕЖДЕНИЕ ! У ВАС ОТСУТВУЮТ ВСЕ НЕОБХОДИМЫ ЕЛЕМНТЫ МЕНЮ В DOM !');

    }
}
export default headerMenu