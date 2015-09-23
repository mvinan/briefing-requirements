/**
 * fullscreenForm.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */

(function() {
  'use strict'
  var formWrap = document.getElementById( 'fs-form-wrap' );
  var formArray = [];

  formArray.slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
    new SelectFx( el, {
      stickyPlaceholder: false,
      onChange: function(val){
        document.querySelector('span.cs-placeholder').style.backgroundColor = val;
      }
    });
  });

  new FForm( formWrap, {
    onReview : function() {
      classie.add( document.body, 'overview' );
    }
  });
})();
