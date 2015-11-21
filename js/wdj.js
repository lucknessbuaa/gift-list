(function($){
    $(function() {
        var slideIndex = 0,
            viewWidth = $(window).width(),
            viewHeight = $(window).height();

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

        /*function isMobileUserAgent(){
         return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
         };

         var isPc = isMobileUserAgent();

         if(isPc){
         location.href = 'http://www.qingzhui.net/demo/huoxing'
         }*/
    });
}(jQuery));