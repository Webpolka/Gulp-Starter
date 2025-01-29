function headerNav(options) {
    const burger = document.querySelector('#headerBurger')
    const headerMenu = document.querySelector('#headerNavigation')
    const mobileMenu = document.querySelector('#mobileNavigation')
    const overlays = document.querySelectorAll('.service-overlay')

    let headerRow = document.querySelector('.header__row')

    // ---------------------------------  СОЗДАНИЕ КЛОНА МЕНЮ ХЕДЕРА ДЛЯ МОБИЛЬНОГО МЕНЮ -----------------------
    if (headerMenu && mobileMenu) {
        let headerMenuUl = headerMenu.querySelector('ul.menu')
        var clone = headerMenuUl.cloneNode(true)
        mobileMenu.appendChild(clone)
    } else {
        console.log('ПРЕДУПРЕЖДЕНИЕ ! Разберись в разметке !');
    }

    // -----------------------------------------------  Клик по бургеру -------------------------------------------
    burger.addEventListener('click', (event) => {
        event.stopPropagation()
        burger.classList.toggle('active')
        document.body.classList.toggle('no-scroll')

        if (burger.classList.contains('active')) {
            mobileMenu.classList.add('active')
            overlays.forEach(el => {
                el.style.left = 0;
                el.style.background = 'rgb(0,0,0,0.3';
            })
        }
        if (!burger.classList.contains('active')) {
            mobileMenu.classList.remove('active')
            overlays.forEach(el => {
                el.style.left = -100 + '%';
                el.style.background = 'rgb(0,0,0,0';
            })
            resetActiveList()
        }
    })



    // ------------------------------------------ Изменялка высоты менюшки --------------------------------------
    let maxH = options.maxH
    let minH = options.minH
    let head = document.querySelector('header.header')
    let menuLis = headerRow.querySelectorAll('.header__navigation>ul.menu>li')
    let menuLogo = headerRow.querySelector('.header__logo svg')

    menuLogo.style.height = options.logoMaxH + "px"
    headerRow.style.height = maxH + 'px'

    //------------------------------------------ Mobile carets create --------------------------------------------
    const mobileParentLi = document.querySelectorAll('#mobileNavigation ul.menu>li')

    createWraps()
    createCarets()

    function createWraps() {
        mobileParentLi.forEach(li => {

            if (li.lastElementChild.tagName == 'UL') {
                var aNode = li.firstElementChild
                wrapContainer(aNode, 'span', 'caret-wrap')
            }
        })
    }

    function createCarets() {
        mobileParentLi.forEach(li => {
            let mobileCaretWrap = li.querySelector('.caret-wrap')
            let caret = document.createElement('span')
            caret.className = 'caret'
            caret.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>'
            if (mobileCaretWrap) mobileCaretWrap.append(caret)
        })
    }

    function wrapContainer(aNode, containerTag, containerClass) {
        let wrapper = document.createElement(containerTag);
        wrapper.classList.add(containerClass)
        aNode.parentNode.insertBefore(wrapper, aNode);
        wrapper.appendChild(aNode);
    }

    /// ------------------------------------------- клики по каретке ---------------------------------------

    let mobileCarets = mobileMenu.querySelectorAll('span.caret')
    mobileCarets.forEach(caret => {
        caret.addEventListener('click', (e) => {
            e.stopPropagation()
            let li = caret.parentNode.parentNode
            resetActiveList(li)
            li.classList.toggle('active')
        })
    })

    function resetActiveList(currentActiveLi) {
        mobileCarets.forEach(caret => {
            let li = caret.parentNode.parentNode
            if (currentActiveLi !== li) li.classList.remove('active')
        })
    }

    // ------------------------------------- close by click --------------------------------------------
    mobileMenu.addEventListener('click', (e) => {

        if (e.target.tagName == 'A') {
            burger.classList.remove('active')
            document.body.classList.remove('no-scroll')
    
            if (!burger.classList.contains('active')) {
                mobileMenu.classList.remove('active')
                overlays.forEach(el => {
                    el.style.left = -100 + '%';
                    el.style.background = 'rgb(0,0,0,0';
                })
                resetActiveList()
            }
         
        }
    })

}
export default headerNav;