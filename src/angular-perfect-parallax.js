angular.module('perfectParallax', []).directive('perfectParallax', [
  '$window', function ($window) {

    return {
      restrict: 'A',
      link: function(iScope, iElem, iAttr) {
        var cssKey,
          cssValue,
          isSpecialVal,
          parallaxCssVal,
          parallaxOffset,
          parallaxRatio,
          parallaxInitVal,
          cssValArray;

        parallaxCssVal = iAttr.parallaxCss ? iAttr.parallaxCss : 'top';
        cssValArray = parallaxCssVal.split(':');
        cssKey = cssValArray[0];
        cssValue = cssValArray[1];

        isSpecialVal = cssValue ? true : false;
        if (!cssValue) cssValue = cssKey;

        parallaxRatio = iAttr.parallaxRatio ? + iAttr.parallaxRatio : 1.1;
        parallaxInitVal = iAttr.parallaxInitVal ? + iAttr.parallaxInitVal : 0;

        iElem.css(cssKey, parallaxInitVal + 'px');

        function _onScroll() {
          var resultVal;
          var calcVal = $window.pageYOffset * parallaxRatio + parallaxInitVal;

          if (isSpecialVal) {
            resultVal = '' + cssValue + '(' + calcVal + 'px)';
          } else {
            resultVal = calcVal + 'px';
          }
          iElem.css(cssKey, resultVal);
        };

        $window.addEventListener('scroll', _onScroll);

      }
    };
  }
]);
