(function($){
    const towards = {
        left: 1,
        right: 2
    };

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
    };

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
        }
        return singleCard.join('');
    };

    /**
     *  一览下载组件
     */
    var createDownload = function(download) {
        var result = '<div class="download_desc">' + download.desc + '</div>' +
            '<div class="logo">' +
            '<img class="logo_image" src="images/logo3.png"/>' +
            '<div class="logo_desc">豌豆荚一览</div>' +
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
            '<a class="share external" href="javascript:;">分享</a>';
        return result;
    };

    /**
     * 合作伙伴组件
     */
    var createPartners = function(partners) {
        var images = [];
        partners.forEach(function(partner) {
            images.push(
                '<a class="external" href="' + partner.url + '">' +
                    '<img src="' + partner.logo +'"/>' +
                '</a>');
        });

        var result = '<div class="partners_desc">合作伙伴</div>' +
            '<div class="partners_logs">' +
            images.join('') +
            '</div>';
        return result;
    };

    /**
     * 长文章页logo组件
     */
    var createSymbol = function(symbol) {
        var result = (
            '<img src="' + symbol.logo + '" alt=""/>' +
            '<p>' + symbol.desc + '</p>'
        );
        return result;
    };

    /*
     * 长文章应用推荐组件
     */
    var createApps = function(apps) {
        var result = [];
        result.push(
            '<h2>' + apps.title + '</h2>' +
            '<div class="swiper-container">' +
            '<div class="swiper-wrapper">'
        );
        apps.apps.forEach(function(app, index) {
            result.push(
                '<div class="swiper-slide">' +
                '<div class="con" style="background-color:' + app.backgroundColor +';">' +
                '<img class="logo" src="' + app.logo + '" alt=""/>' +
                '<h3>' + app.name + '</h3>' +
                '<p>' + app.desc + '</p>' +
                '</div>' +
                '</div>'
            );
        });
        result.push(
            '</div>' +
            '</div>'
        );
        return result.join('');
    }

    /*
     * 长文章段落组件
     */
    var createParagraphs = function(paras) {
        var result = [];
        paras.forEach(function(para) {
            result.push(createSingleParagraph(para));
        });
        return result.join('');
    }

    var createSingleParagraph = function(para) {
        var content = para.content;
        var app = para.app;
        var result = [];

        result.push('<li>');
        content.forEach(function(cell, index) {
            if (cell.title) {
                result.push('<h3>' + cell.title + '</h3>');
            }
            if (cell.image) {
                result.push('<img class="img" src="' + cell.image + '" alt=""/>');
            }
            if (cell.text) {
                result.push('<div class="con"><p>' + cell.text + '</p></div>');
            }
        });
        result.push(
            '<div class="name">' +
            '<img class="logo" src="' + app.logo + '" alt=""/>' +
            '<span>' + app.name + '</span>' +
            '</div>' +
            '</li>'
        );

        return result.join('');
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
                '<span class="num">' + ++index  + '</span>' +
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
    };

    /*  二维码展示组件 */
    var createQRcode = function(link) {
        var result = (
            '<div class="overlay"></div>' +
            '<div class="qrcode">' +
                '<div class="qrcode-title">分享到微信</div>' +
                '<div class="qrcode-content">' +
                    '<div class="qrcode-center">' +
                        '<img src="http://www.wandoujia.com/qr?s=5&c=' + encodeURIComponent(link) + '" />' +
                    '</div>' +
                    '<p>用微信扫描二维码，就可以分享到好友或朋友圈了</p>' +
                '</div>' +
                '<div class="qrcode-button">关闭</div>' +
            '</div>'
    
        );
        $('.qrcode-button').live('click', function() {
            $('.overlay').remove();
            $('.qrcode').remove();
        });
        return result;
    }
    
    /* 微信分享提示组件 */
    var createWechatShareTip = function(tipImg) {
        var result = (
            '<div class="wechat-share-tip">' +
                '<img width="103" src="' + tipImg + '"/>' +
            '</div>'
        );
        $('.wechat-share-tip').live('click', function() {
            $('.wechat-share-tip').remove(); 
        });
        return result;
    }
    
    if(campaignTools.UA.inPC){
        location.href = 'http://www.qingzhui.net/demo/huoxing_pc';
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
            var paragraphs = data.data.paras;
            var download = data.data.download;
            var symbol = data.data.symbol;
            var apps = data.data.apps;
    
            $('.page1 .bar').append(createNavigator(navigation));
            $('.wdj-logo').append(createSymbol(symbol));
            $('.page1 .list1').append(createParagraphs(paragraphs));
            $('.page1 .download').append(createDownload(download));
            $('.page1 .slide').append(createApps(apps));
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


        $.get('http://mars.tomasran.me/api/share', function(data) {
                
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
    
            $(".swiper-container").swiper({
                slidesPerView: 'auto',
                spaceBetween: 15
            });
        });
    
        //变量
        var isAnimating = false;
    
        //向左
        $('.page-detail').on('swipeLeft', function(){
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
        $('.page-detail').on('swipeRight', function (){
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
    
        //排行榜 手风琴
        $('.list3 li').live('click', function(ev){
            var child = $(this).parent().find('.sublist');
            if(child.css('display') == 'none'){
                $(this).find('.shape').animate({'rotateZ': '90deg'},500);
                child.show();
                child.addClass('scaleUpCenter');
                setTimeout(function() {
                    child.removeClass('scaleUpCenter');
                }, 600);
            }else{
                $(this).find('.shape').animate({'rotateZ': '0'},500);
                child.hide();
            }
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
    
        // 分享部分 
        if (campaignTools.UA.inWechat) {
            var shareTimelineObject = {
                title: '这是分享到朋友圈的标题',
                desc: '这是分享到朋友圈的描述',
                link: location.href.split('#')[0],
                imgUrl: 'http://i5.tietuku.com/ba62662f544d0bb2.jpg', //配图
                successCallback: function() {}
            };
    
            var shareFriendObject = {
                title: '这是分享到好友标题',
                desc: '这是分享给好友的描述',
                link: location.href.split('#')[0],
                desc: '这是分享给好友的简介',
                imgUrl: 'http://i5.tietuku.com/ba62662f544d0bb2.jpg', //配图
                successCallback: function() {}
            };
    
            campaignTools.wechatWebviewShareSetup(shareTimelineObject, shareFriendObject);
        }
    
        var weibo = {
            element: '.share-weibo',
            desc: '微博分享',
            link: location.href.split('#')[0],
            shortLink: location.href.split('#')[0],
            imgUrl: 'http://i5.tietuku.com/ba62662f544d0bb2.jpg',
            successCallback: function() {}
        };
    
        var wechatFriend = {
            element: '.share-wechat-friend',
            title: '朋友',
            desc: '朋友分享',
            link: location.href.split('#')[0],
            imgUrl: 'http://i5.tietuku.com/ba62662f544d0bb2.jpg',
            tips: function () {
                var tipsImg = 'http://t.wdjcdn.com/upload/mkt-campaign/designaward/208/wechat-share-tips.png';
                $('body').append(createWechatShareTip(tipsImg));
            },
            qrcode: function () {
                $('body').append(createQRcode(wechatFriend.link));
            },
            successCallback: function() {}
        };
    
    
        var wechatTimeline = {
            element: '.share-wechat-timeline',
            title: '朋友圈',
            link: location.href.split('#')[0],
            imgUrl: 'http://i5.tietuku.com/ba62662f544d0bb2.jpg',
            tips: function () {
                var tipsImg = 'http://t.wdjcdn.com/upload/mkt-campaign/designaward/208/wechat-share-tips.png';
                $('body').append(createWechatShareTip(tipsImg));
            },
            qrcode: function () {
                $('body').append(createQRcode(wechatTimeline.link));
            },
            successCallback: function() {}
        };
    
        campaignTools.shareButtonSetup(weibo, wechatFriend, wechatTimeline); 
    
    
        $('.share').live('tap', function(){
            $('.share-menu').addClass('page-moveFromBottom');
            $('.share-overlay').addClass('pageFadeIn');
            $('.share-menu').show();
            $('.share-overlay').show();
            setTimeout(function(){
                $('.share-menu').removeClass('page-moveFromBottom');
                $('.share-overlay').removeClass('pageFadeIn');
            }, 600);
        });

    
        $('.btn-share').live('tap', function(){
            $('.share-menu').addClass('page-moveFromBottom');
            $('.share-overlay').addClass('pageFadeIn');
            $('.share-menu').show();
            $('.share-overlay').show();
            setTimeout(function(){
                $('.share-menu').removeClass('page-moveFromBottom');
                $('.share-overlay').removeClass('pageFadeIn');
            }, 600);
        });

        $('.share-menu').live('tap', function() {
            $('.share-menu').hide();
            $('.share-overlay').hide();
        });
        
        $.refreshScroller();
    
        $.init();
    });
}(Zepto));
