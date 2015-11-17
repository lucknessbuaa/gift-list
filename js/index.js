/**
 * Created by Administrator on 2015/11/11.
 */

/**
 * 1. 详情页综述组件 createReview
 * 2. 详情页列表组件 createCards
 */
var createReview = function(review) {
    var result = '';
    result = '<h2>' + review.title + '</h2>' +
             '<p>' + review.content + '</p>' 
    return result;
};

var createCards = function(cards) {
    var singleCard = [];
    for (var i = 0; i < cards.length; i++) {
        singleCard.push(
            '<li>' +
                '<div class="hd">' +
                    '<img class="logo" src="' + cards[i].icon + '" alt=""/>' +
                    '<h3 class="name">' + cards[i].app + '</h3>' +
                '</div>' +
                '<div class="bd">' + 
                    '<img class="img" src="' + cards[i].image + '" alt=""/>' +
                    '<h3 class="h3">' + cards[i].title + '</h3>' +
                    '<p class="p">' + cards[i].desc + '</p>' +
                '</div>' +
            '</li>'
        ); 
    };
    return singleCard.join('');
};

/**
 *  一览下载组件 
 */
var createDownload = function(download) {
    var result = '<div class="download_desc">' + download.desc + '</div>' +
                 '<div class="logo">' +
                    '<img class="logo_image" src="images/logo3.png"/>' +
                    '<div class="logo_desc">豌豆荚一览下载</div>' +
                 '</div>' +
                 '<div class="download_button">下载</div>' +
                 '<div class="app_image">' +
                    '<img src="'+ download.image + '"/>' +
                 '</div>'; 
    return result;
};

/**
 * 顶部导航栏组件
 */
var createNavigator = function(nav) {
    var result = '<a class="btn-back external" href="javascript:;"></a>' +
                 '<p>' + nav.desc + '</p>' +
                 '<h1>' + nav.theme + '</h1>' +
                 '<a class="share" href="javascript:;">分享</a>';
    return result;
}

/**
 * 合作伙伴组件
 */
var createPartners = function(partners) {
    var images = [];
    partners.forEach(function(partner) {
        images.push('<img src="' + partner.logo +'"/>'); 
    });

    var result = '<div class="partners_desc">合作伙伴</div>' +
                 '<div class="partners_logs">' +
                    images.join('') +
                 '</div>';
    return result;
}

$(function() {
    // 摘要页数据配置
    $.get('/api/overview', function(data) {
        var details = data.data.details;

        details.forEach(function(detail, index) {
            var navigation = detail.navigation;
            var review = detail.review;
            var cards = detail.cards; 
            var download = detail.download;

            var number = index + 2;
            $('.page' + number + ' .head').append(createReview(review));
            $('.page' + number + ' .list2').append(createCards(cards));
            $('.page' + number + ' .bar').append(createNavigator(navigation));
            $('.page' + number + ' .download').append(createDownload(download));
        });
    });

    //合作伙伴配置
    $.get('/api/partners', function(data) {
        var partners = data.data.partners; 

        $('.partners').append(createPartners(partners));
    });

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
