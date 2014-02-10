$(document).ready(function () {
    $.vegas('slideshow', {
        delay:5000,
        backgrounds:[
          { src:'img/endmill_dof2.jpg', fade:1000 },
          { src:'img/gainclone_top2.jpg', fade:1000 },
          { src:'img/quad_flying2.jpg', fade:1000 },
          { src:'img/forrest_cornering2.jpg', fade:1000 }
        ]
    })('overlay', {
        src:'vegas/overlays/02.png'
    });

    $("a").click(function () {
        return $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 500), !1
    }), $("ul.nav-pills li a").click(function () {
        $("ul.nav-pills li.active").removeClass("active"), $(this).parent("li").addClass("active")
    });

    $(".chart").waypoint(function () {
        $(this).easyPieChart({
                easing: 'easeInOutExpo',
                animate: 2000,
                barColor: "#161C92",
                size: "150",
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
        });
        var chart = window.chart = $('.chart').data('easyPieChart');
    },{
        offset: '100%',
    });

    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash,
        $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 1200, 'easeInOutCubic', function () {
            window.location.hash = target;
        });
    });

    $(window).load(function () {
        var e = $(".grid-wrapper");
        e.isotope({
            filter: "*",
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), $(".grid-controls li a").click(function () {
            $(".grid-controls .current").removeClass("current"), $(this).addClass("current");
            var i = $(this).attr("data-filter");
            return e.isotope({
                filter: i,
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: !1
                }
            }), !1
        })
    });
});
    // $(".hire-me").click(function () {
    //     return $("html, body").animate({
    //         scrollTop: $($(this).attr("href")).offset().top
    //     }, 500), !1
    // }), $("ul.nav-pills li a").click(function () {
    //     $("ul.nav-pills li.active").removeClass("active"), $(this).parent("li").addClass("active")
    // })
     // $(window).load(function () {
        // var e = $(".grid-wrapper");
        // e.isotope({
        //     filter: "*",
        //     animationOptions: {
        //         duration: 750,
        //         easing: "linear",
        //         queue: !1
        //     }
        // }), $(".grid-controls li a").click(function () {
        //     $(".grid-controls .current").removeClass("current"), $(this).addClass("current");
        //     var i = $(this).attr("data-filter");
        //     return e.isotope({
        //         filter: i,
        //         animationOptions: {
        //             duration: 750,
        //             easing: "linear",
        //             queue: !1
        //         }
        //     }), !1
        // })
    // }), $(".navbar").sticky({
    //     topSpacing: 0
    // }), $("#main-menu").onePageNav({
    //     currentClass: "active",
    //     changeHash: !1,
    //     scrollThreshold: .5,
    //     scrollSpeed: 750,
    //     filter: "",
    //     easing: "swing"
    // }), $(".chart").waypoint(function () {
    //     $(this).easyPieChart({
    //         barColor: "#3498db",
    //         size: "150",
    //         easing: "easeOutBounce",
    //         onStep: function (e, i, a) {
    //             $(this.el).find(".percent").text(Math.round(a))
    //         }
    //     })
    //},
    // $.vegas('slideshow', {
    //     delay:5000,
    //     backgrounds:[
    //       { src:'img/endmill_dof2.jpg', fade:1000 },
    //       { src:'img/gainclone_top2.jpg', fade:1000 },
    //       { src:'img/forrest_cornering2.jpg', fade:1000 }
    //     ]
    //   })('overlay', {
    //     src:'vegas/overlays/02.png'
    //   });
    // });
// , $("#vegas-next").click(function () {
//         $.vegas("next")
//     }), $("#vegas-prev").click(function () {
//         $.vegas("previous")
//     })
    // , $("#contact-form").validate({
    //     rules: {
    //         name: {
    //             minlength: 2,
    //             required: !0
    //         },
    //         email: {
    //             required: !0,
    //             email: !0
    //         },
    //         message: {
    //             minlength: 2,
    //             required: !0
    //         }
    //     },
    //     highlight: function (e) {
    //         $(e).closest(".control-group").removeClass("success").addClass("error")
    //     },
    //     success: function (e) {
    //         e.text("OK!").addClass("valid").closest(".control-group").removeClass("error").addClass("success")
    //     }
//     // })
// });