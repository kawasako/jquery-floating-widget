/*!
 * jQuery Floating Widget plugin v0.9.2
 * http://terkel.jp/archives/2011/05/jquery-floating-widget-plugin/
 *
 * Copyright (c) 2011 Takeru Suzuki, http://terkel.jp/
 * Licensed under the MIT license: http://www.opensource.org/licenses/MIT
 */
(function($) {

  $.fn.floatingWidget = function(options){
    var opts = $.extend({
      paddingTop: 0
    }, options);
    return this.each(function(){
      var $this = $(this),
        $anchorLink = $this.find("[href^=#]"),
        anchorHeight = parseInt($anchorLink.height()),
        $parent = $this.offsetParent(),
        $window = $(window),
        top = $this.offset().top - parseFloat($this.css('marginTop').replace(/auto/, 0)),
        floatingClass = 'floating';

      var linkListCheck = function(){
        var anchorLinkList = {},
          offsetList = [];
        // check offset
        $anchorLink.each(function(){
          var $anchor = $(this),
          targetId = $anchor.attr("href"),
          $target = $(targetId),
          targetTop = parseInt($target.offset().top);
          offsetList.push(targetTop);
          anchorLinkList[targetTop] = $anchor;
        });
        // sort
        offsetList.sort(function(a, b){
          return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
        return { offsetList: offsetList, anchorLinkList: anchorLinkList };
      };

      var data = linkListCheck();
      var status = 0;

      if ($parent.height() > $this.outerHeight(true)){
        $window.on('scroll.floating-widget', function(){

          var y = $window.scrollTop() + opts.paddingTop;
          if(y > top){
            $this.addClass(floatingClass);
          }else{
            $this.removeClass(floatingClass);
            $anchorLink.removeClass("current");
          }

          var count = 0;
          for(var i=0; data.offsetList.length>i; i++) {
            if(data.offsetList[i] < y+anchorHeight) { count++; }
          }

          if(status !== count) {
            status = count;
            if(count > 0) {
              $anchorLink.removeClass("current");
              data.anchorLinkList[data.offsetList[count-1]].addClass("current");
            }
          }

        });
      }
    });
  };

  // Destroy
  $.fn.floatingWidgetDestroy = function(){
    var $window = $(window);
    $window.off('scroll.floating-widget');
    $(this).removeClass('floating');
  };

})(jQuery);
