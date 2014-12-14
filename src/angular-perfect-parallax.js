angular.module('perfectParallax', []).directive('perfectParallax', [
  '$window', function ($window) {

    return {
      restrict: 'A',
      scope: {
        parallaxCss: '@',
        parallaxInitVal: '@',
        parallaxRatio: '@'
      },
      link: function(iScope, iElem, iAttr) {
        var cssKey,
          cssValue,
          isSpecialVal,
          parallaxCssVal,
          parallaxOffset,
          parallaxRatio,
          parallaxInitVal,
          cssValArray;

        parallaxCssVal = iScope.parallaxCss ? iScope.parallaxCss : 'top';
        cssValArray = parallaxCssVal.split(':');
        cssKey = cssValArray[0];
        cssValue = cssValArray[1];

        isSpecialVal = cssValue ? true : false;
        if (!cssValue) cssValue = cssKey;

        parallaxRatio = iScope.parallaxRatio ? +iScope.parallaxRatio : 1.1;
        parallaxInitVal = iScope.parallaxInitVal ? +iScope.parallaxInitVal : 0;

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
