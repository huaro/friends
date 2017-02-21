/**
 * Created by Administrator on 2016/10/23.
 */
$(document).ready(function () {
    var tab = document.getElementsByClassName("tab");
    var spider = document.getElementsByClassName("spider");
    var bImg = document.getElementsByClassName("bImg");
    bImg[0].style.opacity = 1;
    $(".tab").first().css("opacity", 1).siblings().css("opacity", 0.5);
    reloadAbleJSFn("js/shine.js");
    $(spider).first().siblings().hide()
    var timer = null;
    var headline = document.getElementById("headline");
    for (var i = 0; i < tab.length; i++) {
        tab[i].index = i;
        tab[i].onclick = function () {
            if (bImg[this.index].style.opacity == 1) {
                return;
            }
            if (this.index == 3) {
                clearInterval(timer);
                timer = setInterval(bubble, 500);
            } else {
                clearInterval(timer);
                timer = setInterval(bubble, 200);
            }
            $(this).css("opacity", 1).siblings().css("opacity", 0.6);
            $(this).find("img").stop().animate({height: 0}, 200)
            $(this).find("img").animate({height: 150}, 200)
            $(".spider").stop().hide(500);
            for (var i = 0; i < spider.length; i++) {
                animate(bImg[i], {opacity: 0});
            }
            $(spider[this.index]).show(500);
            animate(bImg[this.index], {opacity: 1});
            headline.innerHTML = tab[this.index].children[0].getAttribute("alt");
            //重新加载标题渲染JS
            reloadAbleJSFn("js/shine.js");
            var colorArr = ["#fed73c", "#9311e2", "#7fbf5b", "#ea525e"]
            headline.style.color = colorArr[this.index];
        }
    }
// 重新加载JS函数开始
    function reloadAbleJSFn(newJS) {
        var oldjs = null;
        var t = null;
        var oldjs = document.getElementById("script");
        if (oldjs) {
            oldjs.parentNode.removeChild(oldjs);
        }
        var scriptObj = document.createElement("script");
        scriptObj.src = newJS;
        scriptObj.type = "text/javascript";
        scriptObj.id = "script";
        document.getElementsByTagName("div")[0].appendChild(scriptObj);
    }

// 重新加载JS函数结束
//动画2
    var i = 0,
        settings = [
            {duration: 1200, easing: 'easeOutBounce'},
            {duration: 1600, easing: 'easeOutElastic'},
            {duration: 600, easing: 'easeOutQuad'},
            {duration: 1000, easing: 'easeOutBack'}
        ];

    $('ul.column1, ul.column3').roundabout({
        clickToFocus: false,
        minOpacity: 0,
        minScale: 0,
        minZ: 0,
        duration: 1500,
        shape: 'rollerCoaster'
    });

    $('ul.column2, ul.column4').roundabout({
        clickToFocus: false,
        minOpacity: 0,
        minScale: 0,
        minZ: 0,
        reflect: true,
        duration: 1500,
        shape: 'rollerCoaster'
    });

    $('#advance').click(function () {
        if ($('.column1').data("roundabout").animating || $('.column4').data("roundabout").animating) {
            return false;
        }

        i++;
        i = i++ % settings.length;

        // fade out link
        $(this).fadeTo(400, 0.5);

        $('.column1').roundabout('animateToNextChild', settings[i].duration, settings[i].easing);
        setTimeout(function () {
            $('.column2').roundabout('animateToNextChild', settings[i].duration + 100, settings[i].easing);
        }, 100);
        setTimeout(function () {
            $('.column3').roundabout('animateToNextChild', settings[i].duration + 200, settings[i].easing);
        }, 200);
        setTimeout(function () {
            $('.column4').roundabout('animateToNextChild', settings[i].duration + 250, settings[i].easing, function () {
                $('#advance').fadeTo(400, 1);
            });
        }, 300);

        return false;
    });
//动画1
    var Page = (function () {
        var $navArrows = $('#nav-arrows').hide(),
            $shadow = $('#shadow').hide(),
            slicebox = $('#sb-slider').slicebox({
                onReady: function () {
                    $navArrows.show();
                    $shadow.show();
                },
                orientation: 'r',
                cuboidsRandom: true
            }),
            init = function () {
                initEvents();
            },
            initEvents = function () {
                $navArrows.children(':first').on('click', function () {
                    slicebox.next();
                    return false;
                });
                $navArrows.children(':last').on('click', function () {
                    slicebox.previous();
                    return false;
                });
            };
        return {init: init};
    })();
    Page.init();
//动画3
    var datas = [
        {
            "width": 340,
            "top": 220,
            "left": 250,
            "opacity": 0.7,
            "zIndex": 20,
        },//0
        {
            "width": 340,
            "top": 0,
            "left": 250,
            "opacity": 0.7,
            "zIndex": 20,
        },//1
        {
            "width": 500,
            "top": 65,
            "left": 350,
            "opacity": 1,
            "zIndex": 21,
        },//2
        {
            "width": 340,
            "top": 0,
            "left": 610,
            "opacity": 0.7,
            "zIndex": 20,
        },//3
        {
            "width": 340,
            "top": 220,
            "left": 610,
            "opacity": 0.7,
            "zIndex": 20,
        }//4
    ];
    var wrap = document.getElementById("xwrap");
    var slide = wrap.children[0];
    var ul = slide.children[0];
    var lis = ul.children;
    var flag = true;

    function assign() {
        for (var i = 0; i < lis.length; i++) {
            animate(lis[i], datas[i], function () {
                flag = true;
            })
        }
    }

    assign();

    $("#xul").children("li").click(function () {
        if ($(this).css("top") == "220px") {
            if ($(this).css("left") == "250px") {
                indx = 0;
            } else {
                indx = 4;
            }
        } else if ($(this).css("top") == "0px") {
            if ($(this).css("left") == "250px") {
                indx = 1;
            } else {
                indx = 3;
            }
        } else {
            indx = 2;
        }
        if (indx == 2) {
            return;
        }
        if (indx > 2) {
            if (flag) {
                for (var i = 0; i < indx - 2; i++) {
                    datas.unshift(datas.pop());
                }
                assign();
            }
        } else {
            if (flag) {
                for (var i = 0; i < 2 - indx; i++) {
                    datas.push(datas.shift());
                }
                assign();
            }
        }

    })
//动画4
    var box = document.getElementById("box4");
    var xul = box.children[0];
    var xlis = xul.children;
    for (var i = 0; i < xlis.length; i++) {
        xlis[i].style.backgroundImage = "url(img4/" + (i + 1) + ".jpg)";
        xlis[i].index = i;
        xlis[i].style.left = i * 240 + "px";
        xlis[i].onmouseenter = function () {
            var idx = this.index;
            for (var i = 0; i < xlis.length; i++) {
                if (i <= idx) {
                    $(xlis[i]).stop().animate({"left": i * 80})
                } else {
                    $(xlis[i]).stop().animate({"left": 1200 - (xlis.length - i) * 80})
                }
            }
        }
        xlis[i].onmouseleave = function () {
            for (var i = 0; i < xlis.length; i++) {
                $(xlis[i]).stop().animate({"left": i * 240})
            }

        }
    }
    //鼠标跟随气泡
    //var colorArr=["red","orange","yellow","green","cyan","blue","purple"]
    //document.onmousemove= function (event) {
    //    event = event || window.event;
    //    var x = getPage(event).x;
    //    var y = getPage(event).y;
    //    var color=colorArr[parseInt(Math.random()*7)]
    //    var bubble=document.createElement("div");
    //    bubble.className="bubble"
    //    document.body.appendChild(bubble);
    //    bubble.style.backgroundColor=color;
    //    bubble.style.left = x+3 + "px";
    //    bubble.style.top = y+3 + "px";
    //    $(bubble).hide(300, function () {
    //        $(bubble).remove();
    //    })
    //}
    //自动底部生成气泡
    var colorArr = ["rgba(242, 4, 184, 0.8)", "rgba(242, 162, 4, 0.8)", "rgba(242, 239, 4, 0.8)", "rgba(91, 242, 4, 0.8)", "rgba(9, 53, 233, 0.8)", "rgba(4, 238, 242, 0.8)", "rgba(133, 4, 242, 0.8)"]
    var bubble = function () {
        //event = event || window.event;
        //var x = getPage(event).x;
        //var y = getPage(event).y;
        var color = colorArr[parseInt(Math.random() * 7)]
        var bubble = document.createElement("div");
        bubble.className = "bubble"
        document.body.appendChild(bubble);
        var u = parseInt(document.body.offsetWidth);
        var v = parseInt(document.body.offsetHeight);
        var x = parseInt(Math.random() * u);
        var y = v;
        bubble.style.left = x + "px";
        bubble.style.top = 0 ;
        //bubble.style.background = "radial-gradient(circle at 17px 16px, rgba(255, 255, 255, 0), " + color + ", rgba(255, 255, 255, 0.66))"
        $(bubble).animate({top: 600, opacity: 0}, 4000, function () {
            $(bubble).remove();
        })
    }
    timer = setInterval(bubble, 200);
    //鼠标移动产生气泡
    //var colorArr1=["red","orange","yellow","green","cyan","blue","purple"]
    //$("body").mousemove(function (event) {
    //    event = event || window.event;
    //    var x = getPage(event).x;
    //    var y = getPage(event).y;
    //    var color=colorArr1[parseInt(Math.random()*7)]
    //    var bubbleM=document.createElement("div");
    //    bubbleM.className="bubbleM"
    //    document.body.appendChild(bubbleM);
    //    bubbleM.style.backgroundColor=color;
    //    bubbleM.style.left = x+ "px";
    //    bubbleM.style.top = y+3+ "px";
    //    $(bubbleM).hide(800, function () {
    //        $(bubbleM).remove();
    //    })
    //})
})
