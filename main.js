/*
http://turnjs.com/

http://designshack.net/articles/css/code-a-simple-folded-corner-effect-with-css/

*/

$(function(){

    $('#arrow_click').on('click', function(){
        animate_flip($(this), $('.flip'));

        // Modernizr.csstransitions = false;
    });
});

function animate_flip(arrow_click, flip){
    /*
    1. Lasche verlängern
    2. Band verkürzen/"herunterziehen"
    3. Schriftzug auf gleicher Position halten/animieren damit es nicht verschoben wird
    */

    if(Modernizr.csstransitions){
        flip.css('-webkit-transition', 'all 1s ease-in-out');
        arrow_click.css('-webkit-animation', 'none');
        arrow_click.css('border-top-width', $(window).height());
        flip.css('top', $(window).height());
        flip.addClass('animated_background_position');
    }
    else{
        arrow_click.animate({'border-top-width': $(window).height()}, 500);
        flip.animate({'background-position': '50% -77.5%'}, 750);
        flip.animate({'top': $(window).height()}, 250);
    }
    var timeout = window.setTimeout(animate_sides, 1000);
}

function animate_sides(){

    if(Modernizr.csstransitions){
        $('.side.left').addClass('animated_left');
        $('.side.right').addClass('animated_right');
    }
    else{
        $('.side.left').animate({'left': '-100%'});
        $('.side.right').animate({'right': '-100%'});
    }

}
