/*
http://turnjs.com/

http://designshack.net/articles/css/code-a-simple-folded-corner-effect-with-css/

*/

$('#arrow_click').on('click', function(){
    animate_flip($(this));
});

function animate_flip(el){
    /*
    1. Lasche verlängern
    2. Band verkürzen/"herunterziehen"
    3. Schriftzug auf gleicher Position halten/animieren damit es nicht verschoben wird
    */

    var $el = el;
    $el.css('-webkit-animation', 'none');
    $el.css('border-top-width', $(window).height());
    $('.flip').css('top', $(window).height());
    $('.flip').addClass('animated_background_position');
    var timeout = window.setTimeout(animate_sides, 1000);
}

function animate_sides(){

    $('.side.left').addClass('animated_left');
    $('.side.right').addClass('animated_right');
    //$('.flip').css('backgroundPosition', "50% -100%");

}
