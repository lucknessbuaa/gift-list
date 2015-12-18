var urlConstant = '/campaign/gift-list/img/';

(function($){
    const towards = {
        left: 1,
        right: 2
    };

    //download
    var fakeClick = function (url) {
        var $a = $('<a>');
        $a.attr({
            href: url
        });
        $('body').append($a);
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', false, false);
        $a[0].dispatchEvent(evt);
    };

    function installBtn() {
        // 如果是 iOS
        if (campaignTools.UA.inIos) {
            if (campaignTools.UA.inWechat) {
                fakeClick('http://a.app.qq.com/o/simple.jsp?pkgname=com.wandoujia');
            } else {
                //weibo
                if (!!(navigator.userAgent.toLowerCase()).match(/(weibo)/)) {
                    // 这里需要自己写一个弹窗效果，提示用户点击右上角用浏览器打开当前页面
                    //  $('.overlay').show().click(function () {
                    //      $(this).hide();
                    //  });
                } else {
                    fakeClick('https://itunes.apple.com/cn/app/wan-dou-jia-yi-lan-ni-gan/id1003672393?l=en&mt=8&ct=www-yilan-preview');
                }
            }
            // 如果是 android
        } else if (campaignTools.UA.inAndroid) {
            // 豌豆荚客户端里直接安装
            if (campaignTools.UA.inWdj) {
                campaignPlugin.installApp({
                    'packageName': 'com.wandoujia',
                    'downloadUrl': 'http://apps.wandoujia.com/redirect?signature=03ef108&url=http%3A%2F%2Fapk.wandoujia.com%2Ff%2F85%2F09743cbc413172774006ad2a9816885f.apk&pn=com.wandoujia&md5=09743cbc413172774006ad2a9816885f&apkid=16677219&vc=55&size=16365452&pos=t%2Fcampaign',
                    'appName': '豌豆荚一览',
                    'iconUrl': 'http://img.wdjimg.com/mms/icon/v1/2/1b/64332936e0eeb5380d47514a7fecf1b2_256_256.png',
                    'size': ''
                });
            
            // 豌豆荚客户端之外
            } else {
                if (campaignTools.UA.inWechat) {
                    fakeClick('http://fusion.qq.com/cgi-bin/qzapps/unified_jump' +
                        '?appid=12103413&from=wx&isTimeline=false&actionFlag=0' +
                        '&params=pname%3Dcom.wandoujia%26versioncode%3D33%26actionflag' +
                        '%3D0%26channelid%3D');
                } else {
                    setTimeout(function () {
                        fakeClick('http://apps.wandoujia.com/redirect?signature=03ef108&url=http%3A%2F%2Fapk.wandoujia.com%2Ff%2F85%2F09743cbc413172774006ad2a9816885f.apk&pn=com.wandoujia&md5=09743cbc413172774006ad2a9816885f&apkid=16677219&vc=55&size=16365452&pos=t%2Fcampaign');
                    }, 300);
                    fakeClick('wandoujia://detail/app/com.wandoujia#Intent;scheme=wdj;package=com.wandoujia.phoenix2;end');
                }
            }
        }
    }

    function getRequest() {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
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
     *下载悬浮组件
     */
    var createBottomView = function() {
        return '<div class="bottomView">' +
            '<img id="appIcon" src="' + urlConstant + 'app-icon.png" />' +
            '<div id="appInfo">' +
                '<div id="appTitle">豌豆荚一览</div>' +
                '<div id="appIntro">一个页面浏览&nbsp;500+&nbsp;应用的最新内容</div>' +
            '</div>' +
            '<button id="install">安装</button>' +
        '</div>'
    }

    /**
     * 封面组件
     */
    var createCover = function(cover) {
        var largeCover = cover.article;
        var smallCover = cover.overview;

        var topHalf = '<div class="row row1 index1"><div class="coverWrap">' +
            '<img id="icon" src=' + largeCover.icon + ' />' + 
            '<div><div class="titleOne">' + largeCover.titleOne + '</div></div>' +
            '<div><div class="titleTwo">' + largeCover.titleTwo + '</div></div>' +
            '<p>' + largeCover.content + '</p>' +
            '<div class="overlay"></div>' +
            '<img class="bg" src="' + largeCover.background + '" alt="" />' +
            '</div></div>';
        var bottomHalf = [];
        smallCover.forEach(function(item, index) {
            var left = index % 2;
            var number = index + 1;
            if (left === 0) {
                bottomHalf.push('<div class="row row2">');
            }
            
            bottomHalf.push(
                '<div class="tab">' +
                '<div class="tab' + index + '">' +
                '<a class="link link' + number +' external" data-type="' + number + '" href="javascript:;"></a>' +
                '<div class="innerWrap"><div class="name">' + 
                    '<img class="star" src="' + urlConstant + 'star.png"/>' + '&nbsp;&nbsp;' + 
                    item.title + '&nbsp;&nbsp;' +
                    '<img class="star" src="' + urlConstant + 'star.png" />' +
                '</div></div>' +
                '</div></div>'
            );
            if (left) {
                bottomHalf.push('</div>');
            }
        });
        bottomHalf.push(createBottomView()); 
        return topHalf + bottomHalf.join('');
    };

    /**
     * 1. 详情页综述组件 createReview
     * 2. 详情页列表组件 createCards
     */
    /*var createReview = function(review) {
        var result = '';
        result = '<h2>' + review.title + '</h2>' +
            '<p>' + review.content + '</p>'
        return result;
    };*/
    var createReview = function(review) {
        var result = '';
        result = '<img class="reviewCover" src=' + review.icon + ' />' +
            '<div class="reviewInfo">' +
                '<div class="reviewTitleOne">' + review.titleOne + '</div>' +
                '<div class="reviewTitleTwo">' + review.titleTwo + '</div>' +
                '<p>' + review.content + '</p>' + 
            '</div>' + 
            '<button class="buy" data-password="' + review.password + '">购买</button>';
        return result;
    }

    var createSummary = function(summary) {
        var result = '';
        result = summary.text1 + 
            '<span class="summaryNumber">' + summary.number + '</span>' +
            summary.text2;
        return result;
    }

    var createCards = function(cards) {
        var singleCard = [];
        for (var i = 0; i < cards.length; i++) {
            var cardTemp = cards[i];
            singleCard.push(
                '<li style="background-image: url(' + cardTemp.image + '); background-size: 100% 100%">' +
                    '<a class="detailLink" data-link="' + cardTemp.url + '" data-cardindex="' + (i+1) + '"></a>' +
                    '<div class="detailLiTitleOne">' + cardTemp.titleOne + '</div>' +
                    '<div class="detailLiTitleTwo">' + cardTemp.titleTwo + '</div>' +
                '</li>'
            );
        }
        return singleCard.join('');
    };

    /*var createCards = function(cards) {
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
    };*/

    /**
     *  一览下载组件
     */
    var createDownload = function(download) {
        var result = '<div class="download_desc">' + download.desc + '</div>' +
            '<div class="logo">' +
            '<img class="logo_image" src="' + urlConstant + 'logo3.png"/>' +
            '<div class="logo_desc">豌豆荚一览</div>' +
            '</div>' +
            '<a class="external" href="' + download.url +'">' +
            '<div class="download_button">下载</div>' +
            '</a>' +
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

    /* PC页面背景 */
    var createPCBanners = function(banners) { 
        var result = [];
        banners.forEach(function(banner, index) {
            var label = index + 1;
            result.push(
                '<li class="anli anli' + label +'">' +
                    '<img src="' +  banner + '"/>'  +
                '</li>' 
            );
        });
        return result.join('');
    }

    /* PC段落 */
    var createPCParagraphs = function(content) {
        var result = (
            '<div class="wrapdiv2">' +
                '<p class="clearfix p1">' +
                    '<img class="left" src="'+ content.logo.image +'" height="38" width="37" />' +
                    '<span>' + content.logo.desc + '</span>' +
                '</p>' +
                '<p class="clearfix p2">' + content.title + '</p>' +
                '<p class="clearfix p3"></p>' +
                '<p class="clearfix p4">' + content.enTitle + '</p>' +
                '<p class="clearfix p5">' + content.part1 + '</p>' +
                '<p class="clearfix p6">' + content.part2 + '</p>' +
                '<p class="clearfix p7">' + content.part3 + '</p>' +
                '<p class="clearfix p8">' + content.part4 + '</p>' +
                '<p class="clearfix p9">' + content.part5 + '</p>' +
                '<p class="clearfix p10">' + content.part6 + '</p>' +
                '<p class="clearfix p11">' + content.part7 + '</p>' +
                '<p class="clearfix p12">' + content.part8 + '</p>' +
                '<p class="pimg">' +
                    '<img src="http://www.wandoujia.com/qr?s=5&c=' +  encodeURIComponent(location.href) + '" height="150" width="150" />' +
                    '<span>用手机扫二维码浏览</span>' +
                '</p>'
        );
        return result;
    }
    
    var initPage = function(id){
        $.get('http://huoxing-test.limijiaoyin.com/api/data', {
            id: id 
        }, function(data) {
            var config = data.data; 
            var cover = config.cover;
            var article = config.article;
            var rank = config.rank;
            var share = config.share;
            var overview = config.overview;
            var partners = config.partners;
            var pcConfig = config.pcConfig;

            //分享组件分享文本
            $('.share-menu .share-title')[0].innerHTML = config.shareText;

            // PC端
            $('.body .wrapul').append(createPCBanners(pcConfig.banners));
            $('.body .wrapdiv').append(createPCParagraphs(pcConfig.content));

            // 封面
            $('.index .content').append(createCover(cover));

            //摘要页
            var details = overview.details;
            details.forEach(function(detail, index) {
                var number = index + 1;
                $('.page' + number + ' .head').append(createReview(detail.review));
                $('.page' + number + ' .summary').append(createSummary(detail.summary));
                $('.page' + number + ' .list2').append(createCards(detail.cards));
                $('.page' + number + ' .bar').append(createNavigator(detail.navigation));
                $('.page' + number).append(createBottomView());
            });

            //合作伙伴
            //$('.partners').append(createPartners(partners.content));

            //分享
            var wbConfig = share.weibo;         
            var wechatTimelineConfig = share.wechatTimelineConfig;
            var wechatFriendConfig = share.wechatFriendConfig;

            var weibo = {
                element: '.share-weibo',
                desc: wbConfig.desc,
                link: wbConfig.link,
                shortLink: wbConfig.shortLink,
                imgUrl: wbConfig.imgUrl,
                tips: function() {
                    var tipsImg = 'http://t.wdjcdn.com/upload/mkt-campaign/designaward/208/wechat-share-tips.png';
                    $('body').append(createWechatShareTip(tipsImg));
                },
                successCallback: function() {}
            };

            var wechatFriend = {
                element: '.share-wechat-friend',
                title: wechatFriendConfig.title, 
                desc: wechatFriendConfig.desc,
                link: wechatFriendConfig.link,
                imgUrl: wechatFriendConfig.imgUrl,
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
                title: wechatTimelineConfig.title,
                desc: wechatTimelineConfig.desc,
                link: wechatTimelineConfig.link,
                imgUrl: wechatTimelineConfig.imgUrl,
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

            if (campaignTools.UA.inWechat) {
                var shareTimelineObject = {
                    title: wechatTimelineConfig.title,
                    desc: wechatTimelineConfig.desc, 
                    link: wechatTimelineConfig.link,
                    imgUrl: wechatTimelineConfig.imgUrl,
                    successCallback: function() {}
                };
    
                var shareFriendObject = {
                    title: wechatFriendConfig.title,
                    desc: wechatFriendConfig.desc,
                    link: wechatFriendConfig.link,
                    imgUrl: wechatFriendConfig.imgUrl,
                    successCallback: function() {}
                };
    
                campaignTools.wechatWebviewShareSetup(shareTimelineObject, shareFriendObject);
            }

            $.init();
        });
    }

    $(function() {
        var param = getRequest();
        // 数据获取配置
        $.get('http://huoxing-test.limijiaoyin.com/api/config', function(data){
            if (param.id) {
                data[param.id] ? initPage(data[param.id]) : null;
            } else {
                initPage(data['huoxing']);
            }
        });

        //查看详情
        $(document).on('click', '.link', function (e){
            var index = $(this).attr('data-type');
            $('.page' + index).addClass('page-moveFromBottom');
            $('.page' + index).show();
            setTimeout(function(){
                $('.page' + index).removeClass('page-moveFromBottom');
            },600);
            $('.page-detail .content').scrollTop(0);
    
            $(".swiper-container").swiper({
                slidesPerView: 'auto',
                spaceBetween: 15,
                onSlideChangeEnd: function() {campaignTools.pushGaEvent('gift-list', 'slidecard');}
            });

            campaignTools.pushGaEvent('gift-list', 'click', 'tab' + index);
        });

        //变量
        var isAnimating = false;
    
        //向左
        $('.page-detail').on('swipeLeft', function(){
            campaignTools.pushGaEvent('gift-list', 'slidepage');

            if (isAnimating) return;
            var now = $(this).index();
            var last = now;
    
            if (last !== 7) {
                now = last + 1;
                pageMove(towards.left, now, last);
            } else {
                $.alert('已经到最后一页了');
            }

            $.refreshScroller();
        });
    
        //向右
        $('.page-detail').on('swipeRight', function (){
            campaignTools.pushGaEvent('gift-list', 'slidepage');

            if (isAnimating) return;
            var now = $(this).index();
            var last = now;
            if(last !== 1){
                now = last - 1;
                pageMove(towards.right, now, last);
            } else {
                $.alert('已经到第一页了');
            }

            $.refreshScroller();
        });
    
        //关闭详情
        $(document).on('click', '.btn-back', function(){
            campaignTools.pushGaEvent('gift-list', 'back');

            var parent = $(this).parents('.page');
            parent.addClass('page-moveToBottom');
    
            setTimeout(function(){
                parent.removeClass('page-moveToBottom');
                parent.hide();
            }, 600);
            $('.page-detail .content').scrollTop(0);
        });

        $(document).on('click', '.detailLink', function() {
            var cardIndex = $(this).attr('data-cardindex');
            var tabIndex = $(this).parent().parent().parent().parent().parent().attr('data-index');
            campaignTools.pushGaEvent('gift-list', 'click', 'tab' + tabIndex, 'card' + cardIndex);

            window.location.href = $(this).attr('data-link');
        });
    
        //点击购买按钮，出现淘宝口令
        $(document).on('click', '.buy', function() {
            campaignTools.pushGaEvent('gift-list', 'buy');

            var password = $(this).attr('data-password');
            $('.buy-overlay .password')[0].innerHTML = password;
            $('.buy-overlay').addClass('pageFadeIn');
            $('.buy-overlay').show();
            setTimeout(function() {
                $('.buy-overlay').removeClass('pageFadeIn');
            }, 600);
        });
        //淘宝口令关闭按钮
        $('.close-icon-link').live('tap', function() {
            $('.buy-overlay').hide(); 
        });

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

        /*$('.btn-share').live('tap', function(){
            $('.share-menu').addClass('page-moveFromBottom');
            $('.share-overlay').addClass('pageFadeIn');
            $('.share-menu').show();
            $('.share-overlay').show();
            setTimeout(function(){
                $('.share-menu').removeClass('page-moveFromBottom');
                $('.share-overlay').removeClass('pageFadeIn');
            }, 600);
        });*/

        $('.bottomView #install').live('tap', function(){
            campaignTools.pushGaEvent('gift-list', 'download');
            installBtn();
        });

        $('.share-menu').live('tap', function() {
            $('.share-menu').hide();
            $('.share-overlay').hide();
        });

        // 分享GA
        var shareGA = ['.share', '.btn-share', '.share-wechat-friend', '.share-wechat-timeline', '.share-weibo'];
        $(shareGA.join(',')).live('click', function() {
            if ($(this).is('.share-wechat-friend')) {
                campaignTools.pushGaEvent('gift-list', 'share', 'friend'); 
            } else if ($(this).is('.share-wechat-timeline')) {
                campaignTools.pushGaEvent('gift-list', 'share', 'moment');
            } else if ($(this).is('.share-weibo')){
                campaignTools.pushGaEvent('gift-list', 'share', 'weibo');
            } else if ($(this).is('.share')) {
                campaignTools.pushGaEvent('gift-list', 'openshare');
            } else if ($(this).is('.btn-share')) {
                campaignTools.pushGaEvent('gift-list', 'openshare');
            }
        });

        //合作伙伴GA
        /*$('.partners_logs a').live('click', function() {
           campaignTools.pushGaEvent('gift-list', 'clickpartner');
        });*/

        //下载按钮GA
        /*$('.download_button').live('click', function() {
           campaignTools.pushGaEvent('gift-list', 'download');
        });*/

        $.refreshScroller();
    
        $.init();
    });
}(Zepto));
