/*!
 * jQuery Floating Widget plugin v0.9.2
 * http://terkel.jp/archives/2011/05/jquery-floating-widget-plugin/
 *
 * Copyright (c) 2011 Takeru Suzuki, http://terkel.jp/
 * Licensed under the MIT license: http://www.opensource.org/licenses/MIT
 */
(function($) {
    $.fn.floatingWidget = function(options) {
        var opts = $.extend({
            paddingTop: 0
        }, options);
        return this.each(function() {
            var $this = $(this),
                $parent = $this.offsetParent(),
                $window = $(window),
                top = $this.offset().top - parseFloat($this.css('marginTop').replace(/auto/, 0)),
                floatingClass = 'floating';
            if ($parent.height() > $this.outerHeight(true)) {
                $window.on('scroll.floating-widget', function() {
                    var y = $window.scrollTop() + opts.paddingTop,
                        bottom = $parent.offset().top + $parent.height() - $this.outerHeight(true);
                    if (y > top) {
                        $this.addClass(floatingClass);
                    } else {
                        $this.removeClass(floatingClass);
                    }
                });
            }
        });
    };
    $.fn.floatingWidgetDestroy = function() {
        var $window = $(window);
        $window.off('scroll.floating-widget');
        $(this).removeClass('floating');
    };
})(jQuery);
