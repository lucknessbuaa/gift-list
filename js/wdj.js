(function($){
    $(function() {
        var slideIndex = 0,
            viewWidth = $(window).width() + 23,
            viewHeight = $(window).height() + 23;

        $('.body').css({
            'width': viewWidth,
            'height': viewHeight
        });

        $('.wrapdiv').css('top', (viewHeight - $('.wrapdiv').outerHeight()) / 2);

        function slide() {
            slideIndex++;
            $('.anli').eq(slideIndex % 3).fadeIn('slow').siblings().fadeOut('slow');
        }
        slideTimer = setInterval(slide, 3000);

        $(window).on('resize',function(){
            window.location.reload();
        });
    });
}(jQuery));