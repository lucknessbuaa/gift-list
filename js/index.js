/**
 * Created by Administrator on 2015/11/11.
 */
$(function(){
    //查看详情
    $(document).on('click', '.link', function (e){
        var index = $(this).attr('data-type');
        console.log(index);
        $('.page' + index).addClass('page-moveFromBottom');
        $('.page' + index).show();
        setTimeout(function(){
            $('.page' + index).removeClass('page-moveFromBottom');
        },600);
        $('.page-detail .content').scrollTop(0);
    });

    //变量
    var now = 1, last = 0;
    const towards = { left:1, right:2 };
    var isAnimating = false;

    //向左
    $('.page-detail').on('swipeLeft', function () {
        if (isAnimating) return;
        now = $(this).index();
        last = now;
        console.log('now1:' + now);
        console.log('last1:' + last);

        if(last != 7){
            now = last+1; pageMove(towards.left);
            console.log('now:' + now);
        }else{
            $.alert('已经到最后一页了');
        }
    });

    //向右
    $('.page-detail').on('swipeRight', function () {
        if (isAnimating) return;
        last = now;
        if(last != 1){
            now = last-1; pageMove(towards.right);
        }else{
            $.alert('已经到第一页了');
        }
    });

    //关闭详情
    $(document).on('click', '.btn-back', function(){
        var parent = $(this).parents('.page');
        parent.addClass('page-moveToBottom');

        setTimeout(function(){
            parent.removeClass('page-moveToBottom');
            parent.hide();
        },600);
        $('.page-detail .content').scrollTop(0);
    });

    function pageMove(tw){
        var lastPage = ".page"+last, nowPage = ".page"+now;

        switch(tw){
            case towards.left:
                outClass = 'page-moveToLeft';
                inClass = 'page-moveFromRight';
                break;

            case towards.right:
                outClass = 'page-moveToRight';
                inClass = 'page-moveFromLeft';
                break;
        }

        isAnimating = true;

        $(nowPage).show();

        $(lastPage).addClass(outClass);
        $(nowPage).addClass(inClass);

        setTimeout(function(){
            $(lastPage).removeClass(outClass);
            $(lastPage).hide();

            $(nowPage).removeClass(inClass);
        },600);

        setTimeout(function(){
            isAnimating = false;
        },2000);
    }

    //监听滚动
    /*$('.content').on('scroll',function(){
        var num = $(this).scrollTop();
        if(num >= 145){
            $('.bar-nav').css({'position':'fixed'});
        }else{
            $('.bar-nav').css({'position':'relative'});
        }
    });*/

    $.init();
});


