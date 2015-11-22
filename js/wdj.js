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

        $(window).on('resize',function() { 

           var onResize = function () {
                location.reload();
            };

            var winNewWidth = $(window).width();
            var winNewHeight = $(window).height();

            if (winWidth !== winNewWidth || winHeight !== winNewHeight) {
                window.clearTimeout(resizeTimeout);
                resizeTimeout = window.setTimeout(onResize, 10);
            }

            winWidth = winNewWidth;
            winHeight = winNewHeight;
        });
    });
}(jQuery));
