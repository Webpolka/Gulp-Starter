function forDatePicker() {
    const checkButton = document.querySelector('#submitProgram')
    const popup = document.querySelector('#popup')
    const overlays = document.querySelectorAll('.service-overlay');
    const popupTitle = popup.querySelector('.popup-title')
    const popupContent = popup.querySelector('.popup-content')

    checkButton.addEventListener('click', (e) => {
        if (checkButton.classList.contains('access')) {
            clickButton(true);
            e.stopPropagation();
        } else {
            clickButton(false);
            e.stopPropagation();
        }
    })

    function clickButton(bool) {
        if (bool) {
            let locationValue = document.querySelector('input[name="tourLocation"]').value
            let dateValue = document.querySelector('#datePicker').value
            let humansValue = document.querySelector('input[name="tourHumans"]').value
            let arra = []
            arra.push('local:' + locationValue)
            arra.push('date:' + dateValue);
            arra.push('humans:' + humansValue);
            popupTitle.innerHTML = '<h2>Данные для поиска программы !</h2>';
            popupContent.innerHTML = '<p>' + arra[0] + '<br>' + arra[1] + '<br>' + arra[2] + '</p><br/><p class="green">Успех !</p>';
            popup.classList.add('popup--show');
            overlays.forEach(el => {
                el.style.left = 0;
                el.style.background = 'rgb(0,0,0,0.3)';
            })
        } else {
            popupTitle.innerHTML = '<h2>Данные для поиска программы !</h2>';
            popupContent.innerHTML = '<p>Заполните валидно поля формы !</p>' + '<br/><p class="red">Ошибка !</p>';
            popup.classList.add('popup--show');
            overlays.forEach(el => {
                el.style.left = 0;
                el.style.background = 'rgb(0,0,0,0.3)';
            })
        }
    }
}
export default forDatePicker;