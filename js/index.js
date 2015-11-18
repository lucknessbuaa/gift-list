const towards = {
    left: 1,
    right: 2
}

function pageMove(tw, now, last) {
    var lastPage = '.page' + last;
    var nowPage = ".page" + now;
    switch(tw) {
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

    setTimeout(function() {
        $(lastPage).removeClass(outClass);
        $(lastPage).hide();

        $(nowPage).removeClass(inClass);
    }, 600);

    setTimeout(function() {
        isAnimating = false;
    }, 2000);
}

/**
 * 封面组件
 */
var createCover = function(cover) {
    cover.overview.push(cover.rank);

    var largeCover = cover.article;
    var smallCover = cover.overview; 

    var topHalf = '<div class="row row1 index1">' +
                        '<a class="link link1 external" data-type="1" href="javascript:;"></a>' +
                        '<h2>' + largeCover.titleOne + '</h2>' +
                        '<p>' + largeCover.titleTwo + '</p>' +
                        '<div class="overlay"></div>' +
                        '<img class="bg" src="' + largeCover.background + '" alt="" />' +
                   '</div>';
    var bottomHalf = [];
    smallCover.forEach(function(item, index) {
        var left = index % 2;
        var number = index + 2;
        if (left === 0) {
            bottomHalf.push('<div class="row row2">');
        }
        bottomHalf.push(
            '<div>' +
                '<a class="link link' + number +' external" data-type="' + number + '" href="javascript:;"></a>' +
                '<h2>' + item.title + '</h2>' +
                '<div class="overlay"></div>' +
                '<img class="bg" src="' + item.background + '" alt="" />' +
            '</div>'
        );
        if (left) {
            bottomHalf.push('</div>');
        }
    });
    return topHalf + bottomHalf.join('');
}

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

/**
 * 长文章页logo组件 
 */
var createSymbol = function(symbol) {
    var result = (
        '<img src="' + symbol.logo + '" alt=""/>' +
        '<p>' + symbol.desc + '</p>'  
    ); 
    return result;
}

/**
 * 排行榜组件
 */
var createRanks = function(ranks) {
    var ranking = [];

    ranks.forEach(function(rank, index) {
        var cards = rank.details.cards;
        var tip = rank.details.tip;
        var detail = [];

        cards.forEach(function(card) {
            detail.push(
                '<li class="li2">' +
                    '<img class="logo" src="' + card.logo + '" alt="" />' +
                    '<span>' + card.desc + '</span>' +
                '</li>'
            ); 
        });

        ranking.push(
            '<div class="div">' +
                '<li class="li" style="background-image: url(' + rank.background + ')">' +
                    '<p class="num">' + ++index  + '</p>' +
                    '<h3 class="name">' + rank.keyword +
                        '<div class="shape"></div>' +
                    '</h3>' +
                    '<p class="p1">' + rank.statistics + '</p>' +
                '</li>' +
                '<div class="sublist">' +
                    '<ul class="list">' +
                        detail.join('') +
                    '</ul>' +
                    '<p class="con">' + tip + '</p>' +
                '</div>' +
            '</div>'
        ); 

        detail = [];
    });
    
    var result = ranking.join('');
    return result;
}


$(function() {
    // 封面数据配置
    $.get('http://mars.tomasran.me/api/cover', function(data) {
        var cover = data.data;

        $('.index .content').append(createCover(cover));
    });

    // 长文章数据配置
    $.get('http://mars.tomasran.me/api/article', function(data) {
        var navigation = data.data.navigation;
        var download = data.data.download;
        var symbol = data.data.symbol;

        $('.page1 .bar').append(createNavigator(navigation));
        $('.wdj-logo').append(createSymbol(symbol));
        $('.page1 .download').append(createDownload(download));
    });

    // 排行榜数据配置
    $.get('http://mars.tomasran.me/api/rank', function(data) {
        var navigation = data.data.navigation;
        var ranks = data.data.ranks;
        var download = data.data.download;
    
        $('.page7 .bar').append(createNavigator(navigation));
        $('.page7 .list3').append(createRanks(ranks))
        $('.page7 .download').append(createDownload(download));
    });

    // 摘要页数据配置
    $.get('http://mars.tomasran.me/api/overview', function(data) {
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
    $.get('http://mars.tomasran.me/api/partners', function(data) {
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
    var isAnimating = false;

    //向左
    $('.page-detail').on('swipeLeft', function() {
        if (isAnimating) return;
        var now = $(this).index();
        var last = now;

        if (last !== 7) {
            now = last + 1;
            pageMove(towards.left, now, last);
        } else {
            $.alert('已经到最后一页了');
        }
    });

    //向右
    $('.page-detail').on('swipeRight', function () {
        if (isAnimating) return;
        var now = $(this).index();
        var last = now;
        if(last !== 1){
            now = last - 1;
            pageMove(towards.right, now, last);
        } else {
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
        }, 600);
        $('.page-detail .content').scrollTop(0);
    });

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
