function checkProgram(decriptions, localText, dateText, humansText) {
    // ------------ проверка для кнопки и описаний для полей ----------
    const checkButton = document.querySelector('#submitProgram')
    let inputLoc = document.querySelector('input[name="tourLocation"]')
    let valuePick = document.querySelector('#datePicker').value
    let inputHum = document.querySelector('input[name="tourHumans"]')

    if (inputLoc) {
        decriptions[0].classList.add('green-accent')
        decriptions[0].innerHTML = 'Отлично !'
    } else {
        decriptions[0].classList.remove('green-accent')
        decriptions[0].innerHTML = localText
    }
    if (valuePick) {
        decriptions[1].classList.add('green-accent')
        decriptions[1].innerHTML = 'Отлично !'
    } else {
        decriptions[1].classList.remove('green-accent')
        decriptions[1].innerHTML = dateText
    }
    if (inputHum) {
        decriptions[2].classList.add('green-accent')
        decriptions[2].innerHTML = 'Отлично !'
    } else {
        decriptions[2].classList.remove('green-accent')
        decriptions[2].innerHTML = humansText
    }
    if (valuePick && inputLoc && inputHum) {

        checkButton.classList.add('access');
        checkButton.innerHTML = '<span>Отправить !</span>';
    } else {
        if (checkButton.classList.contains('access')) { checkButton.classList.remove('access'); }
        checkButton.innerHTML = ' <span>Найти программу</span>';
    }
}
export default checkProgram