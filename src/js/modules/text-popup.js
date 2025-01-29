function textPopup(){
    const popupHtml = `<div id="popup" class="popup">
    <div class="popup-topflex">
      <div class="popup-topline">
        <div class="popup-title"></div>
        <button class="popup__close" id="popupClose">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
        </button>        
      </div>
       <div class="popup-content"></div>     
    </div>
    <div class="popup-bottomflex">      
      <div class="popup-footer"><p>Сайт сделан на <span>Web</span>Legko.ru</p></div>
    </div>
    </div>`;
    const body = document.querySelector('body');
    body.insertAdjacentHTML('beforeend', popupHtml)
}
export default textPopup;