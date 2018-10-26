$('#test').click(function() {
    $('html, body').animate({
        scrollTop: $("#formation").offset().top
    }, 1000);
});