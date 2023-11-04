$(document).ready(function () {
    $('.star').click(function () {
        $(this).addClass('active');
        $(this).prevAll().addClass('active');
        $(this).nextAll().removeClass('active');
        updateRating();
    });

    function updateRating() {
        var rating = $('.star.active').length;
        $('.rating-value').text(rating);
    }
});