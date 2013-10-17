/*
http://turnjs.com/

http://designshack.net/articles/css/code-a-simple-folded-corner-effect-with-css/

*/

$(function(){

    $('#arrow_click').on('click', function(){
        animate_flip($(this), $('.flip'));

        // Modernizr.csstransitions = false;
    });

    var $satin = $(".moto_link").toggleClass("satin");
    var radius = '85%'; // VERLAUFSRADIUS

    var radius_px = screen.width / 100 * parseInt(radius);
    var originalBGplaypen = $satin.css("background-color"),
        x, y, xy, bgWebKit, bgMoz,
        lightColor = "rgba(150,150,150,0.75)", // FARBE DEFINIEREN
        gradientSize = radius_px;

        $('body').mousemove(function(e) {
            offset = $satin.offset();
            x  = e.pageX - offset.left;
            y  = e.pageY - offset.top;
            xy = x + " " + y;
            bgWebKit = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", " + gradientSize + ", from(" + lightColor + "), to(rgba(255,255,255,0.0))), " + originalBGplaypen;
            bgMoz    = "-moz-radial-gradient(" + x + "px " + y + "px 45deg, circle, " + lightColor + " 0%, " + originalBGplaypen + " " + gradientSize + "px)";
            bg    = "radial-gradient(" + x + "px " + y + "px 45deg, circle, " + lightColor + " 0%, " + originalBGplaypen + " " + gradientSize + "px)";

            $satin
                .css({ background: bgWebKit })
                .css({ background: bgMoz })
                .css({ background: bg });

        }).mouseleave(function() {
            //$satin.css({ background: originalBGplaypen }); // JE NACHDEM
        });
});

function animate_flip(arrow_click, flip){
    /*
    1. Lasche verlängern
    2. Band verkürzen/"herunterziehen"
    3. Schriftzug auf gleicher Position halten/animieren damit es nicht verschoben wird
    4. Die Seiten auf die Seite abdrehen und nach unten fallen lassen
    */

    if(Modernizr.csstransitions){

        arrow_click.css({
            'border-top-width': $(window).height()
        });
        flip
            .addClass('animated_background_position')
            .css('top', $(window).height())
        ;
    }
    else{
        arrow_click.animate({'border-top-width': $(window).height()}, 500);
        if(!$('html').hasClass('ie')){
            flip.animate({'background-position': '50% -77.5%'}, 750);
        }
        flip.animate({'top': $(window).height()}, 250);
    }
    var timeout = window.setTimeout(animate_sides, 1000);
}

function animate_sides(){

    if(Modernizr.csstransitions){
        $('.side.left').addClass('hinge_left');
        $('.side.right').addClass('hinge_right');
    }
    else{
        $('.side.left').animate({'left': '-100%'});
        $('.side.right').animate({'right': '-100%'}, function(){
            $('.side').remove();
        });
    }
    window.setTimeout(function(){$('.side').remove();}, 2000);
}
