var $window = null,
	$page = null,
	$header = null,
	$logo = null,
	$nav = null,
	$content = null,
	$teaser = null;

var resizeTimer = null,
	api_url = 'http://' + document.location.hostname + '/studiomoto.ch/api/';


$(function() {
	// get most important dom elements
	$window = $(window);
	$page = $('.page');
	$header = $page.find('.page-header');
	$logo = $header.find('.page-logo');
	$nav = $header.find('.page-nav');
	$content = $page.find('.page-body');

	// set content fixed for intro effect
	$content.addClass('fixed');

	// load teaser
	/*
	$.ajax({
		url: api_url,
		dataType: 'json',
		data: {
			request: [
				'pages:get:/teaser/',
				'result:get:teaser_image:url()'
			]
		},
		success: function(data) {
			$teaser = $('<section class="teaser"></div>').height($window.height() - ($header.offset().top + $header.height() + parseInt($('body').css('border-top')))).prependTo($('body'));
			alert(data.content);
			$teaser.backstretch($teaser.responsiveImages('getURL', data.content, {
				swidth: screen.width,
				pwidth: $teaser.width(),
				pxratio: window.devicePixelRatio || 1,
			}));
		}
	});*/

	// responsive images
	$page.find('img').responsiveImages({respondToResize: true });

	// setting up smooth scrolling
	$page.on('click', 'a', function(ev) {
		var $link = $(ev.currentTarget);
		var href = $link.attr('href');
		if(href.match(/(#[a-z0-9\-_]+)$/)) {
			var hash = RegExp.$1;
			var $target = $(hash);
			if(!$target.length) {
				if(hash == '#top') {
					$target = $('body');
				}
				offset = 0;
			} else {
				offset = -(parseInt($target.css('margin-top')));
			}
			if($target.length) {
				ev.preventDefault();
				$.scrollTo(
					$target,
					{
						duration: 400,
						offset: { top: offset }
					}
				);
				return false;
			}
		}
		return true;
	});


	// debug
	$('body').on('dblclick', function(ev) {
		if($page.hasClass('debug-grid')) {
			$page.toggleClass('debug-grid').toggleClass('debug-baseline');
		} else if($page.hasClass('debug-baseline')) {
			$page.toggleClass('debug-baseline');
		} else {
			$page.toggleClass('debug-grid');
		}
	});


	// setup waypoints
	
	$header.waypoint(function(direction) {
		$content.toggleClass('fixed');
	}, {	
		offset: -($header.outerHeight() - parseInt($content.css('top')))
	});
	

	// on resize
	$window.on('resize orientationchange', function(ev) {
		if(resizeTimer != null) {
			window.clearTimeout(resizeTimer);
		}
		resizeTimer = window.setTimeout(function() {
			// restore image ratio
			var basewidth = $header.width();
			
			$page.find('*[class*="ratio-"]').each(function(i, li) {
				var $li = $(li); 
				if($li.attr('class').match(/(^| )ratio\-([0-9]+)\-([0-9]+)( |$)/)) {
					var x = RegExp.$2,
						y = RegExp.$3,
						fontsize = parseInt($li.css('font-size')),
						baseline = parseInt($li.css('line-height')),
						width = $li.width() - ((Math.round($li.width() / basewidth) - 1) * parseInt($li.css('margin-right')));
					$li.css('height', (Math.floor(width / (x / y) / baseline) * baseline / fontsize) + 'em');
					// center thumbnail
					var $img = $li.find('img');
					if($img.length) {
						$img.css('top', -0.5 * ($img.height() - $li.height()));
					}
				}
			});
			resizeTimer = null;
		}, 250);
	});

	// trigger resize to set everything in place
	$window.trigger('resize');
});