function rangeSlider() {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 500,
        values: [75, 300],
        slide: function (event, ui) {
            $("#minRange").val(ui.values[0] + " Руб");
            $("#maxRange").val(ui.values[1] + " Руб");
        }
    });
    $("#minRange").val($("#slider-range").slider("values", 0) + " Руб");
    $("#maxRange").val($("#slider-range").slider("values", 1) + " Руб");
}

export default rangeSlider;