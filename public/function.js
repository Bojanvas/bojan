$(document).ready(function() {


    $(".mummy").addClass('appers');

    $(window).scroll(function() {
        var top = $(document).scrollTop();
        console.log(top);

        if (top > 570) {
            $('header').addClass("scroolh");
        } else {
            $("header").removeClass("scroolh");
        }

        if (top > 0 && top < 1025) {
            $('#h').addClass("active");
            $('#a,#w,#c').removeClass('active');
        } else if (top > 1025 && top < 1450) {
            $('#a').addClass("active");
            $('#h,#w,#c').removeClass('active');
        } else if (top > 1450 && top < 2100) {
            $('#w').addClass("active");
            $('#h,#a,#c').removeClass('active');
        } else if (top > 2100) {
            $('#c').addClass("active");
            $('#h,#w,#a').removeClass('active');
        }

        if (top > 850) {
            $('#guard,#guard2').addClass('shakeme');

        }
    })
    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
});