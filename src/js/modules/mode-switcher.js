    // подключи font awesome в шапке сайта если используешь его вместо SVG!!!
    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">

    function modeSwitcher(modeOptions = {
        btnClass: 'inline',
        lightClass: 'light-mode',
        lightTextClass: 'light-color--text',
        darkClass: 'dark-mode',
        darkTextClass: 'dark-color--text',
        darkIcon : '<i class="fa-regular fa-moon"></i>' ,
        darkText : '<span>Тёмная</span>',
        lightIcon : '<i class="fa-regular fa-sun"></i>', 
        lightText : '<span>Светлая</span>',
    }){
        var btnClass = modeOptions.btnClass
        var lightClass = modeOptions.lightClass
        var lightTextClass = modeOptions.lightTextClass
        var darkClass = modeOptions.darkClass
        var darkTextClass = modeOptions.darkTextClass
        var darkModeIcon = modeOptions.darkIcon
        var darkModeSpan = modeOptions.darkText
        var lightModeIcon = modeOptions.lightIcon
        var lightModeSpan = modeOptions.lightText

        const bodyMode = document.body
        if (document.querySelector('#mode-switcher')) {
            const btnSwitch = document.querySelector('#mode-switcher')
            const btnContainer = btnSwitch.appendChild(document.createElement('div'))
            btnContainer.classList.add(btnClass)   
            window.onload = () => {
                (window.localStorage.getItem('themeClass')) ? bodyMode.className = window.localStorage.getItem('themeClass') : bodyMode.className = lightClass
                if(bodyMode&&bodyMode.classList.contains(lightClass)) { 
                    btnContainer.innerHTML = darkModeIcon + darkModeSpan
                    btnContainer.firstElementChild.classList.add(darkTextClass)
                    btnContainer.lastElementChild.classList.add(darkTextClass)
                   
                     } else {
                    btnContainer.innerHTML = lightModeIcon + lightModeSpan   
                    btnContainer.firstElementChild.classList.add(lightTextClass)
                    btnContainer.lastElementChild.classList.add(lightTextClass)             
                     }             
            }
            
            btnSwitch.addEventListener('click', (event) => {
                if(bodyMode&&bodyMode.classList.contains(lightClass)) {   
                window.localStorage.setItem('themeClass', darkClass)  
                let theme = window.localStorage.getItem('themeClass')          
                bodyMode.classList.replace(lightClass , theme)
                btnContainer.innerHTML = lightModeIcon + lightModeSpan 
                btnContainer.firstElementChild.classList.add(lightTextClass)
                btnContainer.lastElementChild.classList.add(lightTextClass)   
                // console.log(theme);
                       
                } else { 
                window.localStorage.setItem('themeClass', lightClass); 
                let theme = window.localStorage.getItem('themeClass')  
                bodyMode.classList.replace(darkClass , theme)
                btnContainer.innerHTML = darkModeIcon + darkModeSpan  
                btnContainer.firstElementChild.classList.add(darkTextClass)
                btnContainer.lastElementChild.classList.add(darkTextClass)   
                // console.log(theme);
                                    
                }  
                event.stopPropagation();  
            })
            } else {
                console.log('Кнопка <button id="mode-switcher"></button> для переключения темы в DOM не обнаружена !')       
            }
            
        }
         export default modeSwitcher;