
export class MasonryResponsive {
    constructor(options) {
        this.delay = options.delay ? options.delay : 100;
        this.elements = document.querySelectorAll(options.element)
        this.accentClass = options.accentClass      
        this.listener();
    }
    listener() {
        let timeout
        let cells = this.elements
        let pause = this.delay
        let clas = this.accentClass
        resize()
        window.addEventListener('resize', resize)

        function resize() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                var hs
                cells.forEach(el => {
                    if (el.classList.contains(clas)) { hs = el.offsetWidth;};
                })                          
                
                cells.forEach(one => {
                    let im = one.querySelector('img')                   
                    im.style.height = hs + "px"
                })
            }, pause)
        }
    }

}