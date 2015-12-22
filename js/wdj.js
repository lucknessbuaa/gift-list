(function($){
    $(function() {
        var slideIndex = 0,
            viewWidth = $(window).width() + 23,
            viewHeight = $(window).height() + 23;

        $('.body').css({
            'width': viewWidth,
            'height': viewHeight
        });

        function slide() {
            slideIndex++;
            $('.anli').eq(slideIndex % 3).fadeIn('slow').siblings().fadeOut('slow');
        }

        slideTimer = setInterval(slide, 3000);

        /*var resizeTimeout = null;
        $(window).on('resize',function() { 

           var onResize = function () {
                location.reload();
            };

            var winNewWidth = $(window).width();
            var winNewHeight = $(window).height();

            if (viewWidth != winNewWidth || viewHeight != winNewHeight) {
                if (resizeTimeout) {
                    window.clearTimeout(resizeTimeout);
                }
                resizeTimeout = window.setTimeout(onResize, 100);
            }

            winWidth = winNewWidth;
            winHeight = winNewHeight;
        });*/
    });
}(Zepto));
