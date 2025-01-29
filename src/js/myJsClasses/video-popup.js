export class VideoPopup {
    constructor() {
        this.createPopup()
        this.popClose()

        let videoClicks = document.querySelectorAll('[data-video-src]')
        videoClicks.forEach(videoClick => {
            videoClick.addEventListener('click', (e) => {
                let overlays = document.querySelectorAll('.service-overlay')
                let url = videoClick.getAttribute('data-video-src')                
                let videoPopup = document.querySelector('#videoPopup')
                let videoTag = videoPopup.querySelector('iframe')
                videoTag.setAttribute('src', url)
                videoPopup.classList.add('videoPopup--show')
                overlays.forEach(el => {
                    el.style.left = 0;
                    el.style.background = 'rgb(0,0,0,0.3)';
                }) 
                
                console.log(url+ '?title');
                
            })
        })
    }

    popClose() {
        let overlays = document.querySelectorAll('.service-overlay')
        let popWindow = document.querySelector('#videoPopup')
        let popClose = popWindow.querySelector('#VideoPopupClose')
        popClose.addEventListener('click', (e) => {
            popWindow.classList.remove('videoPopup--show')
            let videoTag = popWindow.querySelector('iframe')
            videoTag.removeAttribute('src')
            overlays.forEach(el => {
                el.style.left = -100 + '%';
                el.style.background = 'rgb(0,0,0,0)';
            })
            e.stopPropagation()
            e.preventDefault()
        })
    }

    createPopup() {
        let html = `<div id="videoPopup" class="videoPopup">
        <div class="videoPopup-topline">
        <p><span>Web</span>Legko</p>
        <button class="videoPopup__close" id="VideoPopupClose">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"></path></svg>
        </button>        
        </div>
        <div class="iframe-container">
        <iframe src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        </div>`
        let body = document.querySelector('body')
        body.insertAdjacentHTML('beforeend', html)
    }
}
