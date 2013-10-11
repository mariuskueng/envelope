	/*! Copyright (c) 2013 Oliver Wehn (http://www.oliverwehn.com)
 * Licensed under MIT, GPL
 *
 * Version: 0.2.0
 * 
 * Requires jQuery framework
 */
 ;(function ( $, window, document, undefined ) {

	var pluginName = 'responsiveImages',
		defaults = {
			respondToResize: false,
			respondToUpscaleOnly: true,
			useParentWidth: true,
			resolutionInterval: 50 
		};

	$.responsiveImages = function( elements, options, callback ) {
		this.elements = elements;
		this.options = $.extend( {}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this._callback = callback;
		this.loading = 0;

		this.init(options);

	}

	$.responsiveImages.prototype.init = function () {
		this.updatePaths();
		if(this.options.respondToResize) {
			var to = null;
			var instance = this;
			$(window).on('resize orientationchange', function() {
				if(to != null) {
					window.clearTimeout(to);
				}
				to = window.setTimeout(function() {
					instance.updatePaths();
				}, 100);
			});
		}
	};

	// Updates paths of all matched image elements
	$.responsiveImages.prototype.updatePaths = function() {
		var instance = this;
		var options = instance.options;
		var pxratio = window.devicePixelRatio || 1;
		if(typeof window.orientation != undefined) {
        	swidth = Math.ceil(((window.orientation==90 || window.orientation==-90) ? screen.height : screen.width) / options.resolutionInterval) * options.resolutionInterval;
        } else {
			swidth = Math.ceil(screen.width / options.resolutionInterval) * options.resolutionInterval;
		}
		
		$(instance.elements).filter('img').each(function(i, img) {
			var $img = $(img);
			var $parent = $img.parent();
			var pwidth = 0;
			while((typeof $parent.css != undefined) && ($parent.css('display') != 'block')) {
				$parent = $parent.parent();
			}
			if(typeof $parent.width != undefined) {
				pwidth = Math.ceil($parent.width() / options.resolutionInterval) * options.resolutionInterval;
			}
			if(pwidth < $img.width()) {
				pwidth = Math.ceil($img.width() / options.resolutionInterval) * options.resolutionInterval;
			}
			var src = '';
			if(!(src = $img.data('src'))) {
				src = $img.attr('src');
				$img.data('src', src);
			}
			var cwidth = $img.data('width') || null;
			if(
				cwidth == null ||
				(
					cwidth != null &&
					(
						(pwidth > 0 && options.useParentWidth && pwidth > cwidth) ||
						((pwidth == 0 || !options.useParentWidth) && swidth > cwidth)
					)
				)
			) { 
				var resp_src = instance.getURL(src, {
					swidth: swidth,
					pwidth: pwidth,
					pxratio: pxratio
				});
				var pre_img = new Image();
				$(pre_img)
				.load(function() {
					var width = 0;
					if(typeof this.naturalWidth != undefined) {
						width = this.naturalWidth;
					} else {
						width = this.width;
					}
					width = width / pxratio;
					$img
					.attr('src', $(this).attr('src'))
					.data('width', width);
					instance.loading--;
					if(instance.loading == 0 && typeof instance._callback == 'function' ) {
						instance._callback.call(instance.elements);
					}
				})
				.attr('src', resp_src);
				instance.loading++;
			}
		});
	};

	// Generates new URL name from original
	$.responsiveImages.prototype.getURL = function(original_url, params, debug) {
		var swidth = params.swidth || 0,
			pwidth = params.pwidth || 0,
			pxratio = params.pxratio || 1;
		var url = original_url.replace(/(\.[a-z]+)$/, '.s' + swidth + '.p' + pwidth + '.r' + pxratio + '$1');
		return url;
	}

	// Generates hash string for url to make it unique for CDNs not caring about GET parameters
	// based on http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
	$.responsiveImages.prototype.getHash = function(str) {
	    var hash = 0, i, char;
	    if (str.length == 0) return hash;
	    for (i = 0; i < str.length; i++) {
	        char = str.charCodeAt(i);
	        hash = ((hash<<5)-hash)+char;
	        hash = hash & hash;
	    }
	    if(hash < 0) hash = hash * -1;
	    return hash.toString(16);
	};

	$.fn[pluginName] = function(options, callback) {
		if(typeof options != 'string') {
			var instance = $.data(this, 'plugin_' + pluginName);
			if(!instance) {
				$.data(this, 'plugin_' + pluginName, new $.responsiveImages(this, options, callback));		
			}
			return this;
		} else {
			if(typeof $.responsiveImages.prototype[options] === 'function') {
				var args = Array.prototype.slice.call( arguments, 1 );
				return $.responsiveImages.prototype[options].apply(null, args);
			} else {
				return null;
			}
		}
	};


})( jQuery, window, document );