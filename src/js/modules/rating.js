function ratingInput(){
    const stars = document.querySelectorAll('.star-input');
       const ratingContainer = document.querySelector('.rating-input');
    
       stars.forEach((star) => {
         star.addEventListener('click', setRating);
       });
    
       function setRating(event) {
         const selectedStar = event.currentTarget;
         const rating = selectedStar.getAttribute('data-rating');
            // Установите выбранный рейтинг (например, отправьте на сервер или обновите локальное состояние)
         // Здесь вы можете добавить код для отправки рейтинга на сервер или сохранения его локально.
    
         // Отобразите выбранный рейтинг
         stars.forEach((star) => {
            if (star.getAttribute('data-rating') <= rating) {
              star.classList.add('selected');
            } else {
              star.classList.remove('selected');
            }
          });
          console.log(rating);
        $("#ratingInput").val(rating);
        }
     
    }
    export default ratingInput;