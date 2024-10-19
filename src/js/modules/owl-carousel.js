
// ------------------------------------------------------------ js --------------------------------------------------------
function owlCarousel (){
    $(".section__slider").owlCarousel({
        loop: true, 
        margin: 0,
        nav: true,

        // navContainer: '.myNav',  
        dotsContainer: '.myDots',
        responsive: {
            0: {
                items: 1
            }
            // 600:{
            //     items:3
            // },
            // 1000:{
            //     items:5
            // }
        },
        navText : ["",""]
    });
}

export default owlCarousel;