function buttonsListener() {
  // #popup #popupClose - для кликов, 
  // .popup--show - для отображения
  // .popup-title .popup-content - для вставки HTML

  let popButtons = document.querySelectorAll('[data-popupBtn]')

  let buttonsContent = {
    btnConsult: '<p>Поместите код формы для заказа консультации !</p><br/><p class="grey">Неизвестно</p>',
    btnView: '<p>Контекст для "Программа тура" либо переадресовка.</p><br/><p class="grey">Неизвестно</p>',
    btnRating: '<p>Контекст для "Рейтинг направлений" либо переадресовка.</p><br/><p class="grey">Неизвестно</p>',
    btnAnother: '<p>Контекст для "Другие материалы" либо переадресовка.</p><br/><p class="grey">Неизвестно</p>',
    btnPinterest: '<p>Контекст для "Наш pinterest" либо переадресовка.</p><br/><p class="grey">Неизвестно</p>',
  }

  let overlays = document.querySelectorAll('.service-overlay')
  let popWindow = document.querySelector('#popup')
  let popTitle = popWindow.querySelector('.popup-title')
  let popContent = popWindow.querySelector('.popup-content')

  popButtons.forEach(btn => {
    let id = btn.getAttribute('id')
    let idContent = buttonsContent[id]    
    btn.addEventListener('click', (event) => popupFunc(idContent))
  })

  popClose()
  function popClose() {
    let popClose = popWindow.querySelector('#popupClose')
    popClose.addEventListener('click', (e) => {
      popWindow.classList.remove('popup--show')
      popTitle.innerHTML = '';
      popContent.innerHTML = '';
      overlays.forEach(el => {
        el.style.left = -100 + '%';
        el.style.background = 'rgb(0,0,0,0)';
      })
      e.stopPropagation()
      e.preventDefault()
    })
  }

  function popupFunc(contentHtml) {
    if (popWindow) {
      popTitle.innerHTML = '<h2>' + event.currentTarget.innerHTML + '</h2>'
      popContent.innerHTML = contentHtml
      popWindow.classList.add('popup--show')
      overlays.forEach(el => {
        el.style.left = 0;
        el.style.background = 'rgb(0,0,0,0.3)';
      })
    } else {
      console.log('Ошибка, модального окна не существует ! ');
      return;
    }
  }
}
export default buttonsListener