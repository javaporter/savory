$(function() {
  $(document).foundation();

  // smooth scrolling
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 300);
        return false;
      }
    }
  });


  // random hero for home page
  var random = Math.floor(Math.random() * $('.hero-slide').length);
  $('.hero-slide').hide().eq(random).show();


  // nav helper
  // when you click an anchor from the nav, the off-canvas bar should close
  $(".close-off-canvas").on("click.toggleCanvas", function(){
    $(".exit-off-canvas").click();
  });


  // calling in mapbox
  if( document.getElementById('map') != null ) {
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2F2b3J5aW5zdGl0dXRlIiwiYSI6ImFJbDI3Qm8ifQ.usgK1Wk7eQAbG6Jjp7knGQ';
    var map = L.mapbox.map('map', 'savoryinstitute.jjdf51a0', {
      tileLayer: {
        continuousWorld: false,
        noWrap: true
      }
    });

    map.touchZoom.disable();
    map.scrollWheelZoom.disable();
  }



  // show and hide other boxes in donate section

  var other_amount_holder = "#other-amount-holder";
  var other_amount_mo_holder = "#other-amount-mo-holder";

  $(other_amount_holder).hide('fast');

  $('input[type=radio][name=amount]').click(function() {
     if($(this).attr('id') == 'other') {
      $(other_amount_holder).show('fast');
     }

     else {
      $(other_amount_holder).hide('fast');
     }
   });

   $(other_amount_mo_holder).hide('fast');

   $('input[type=radio][name=ongoing]').click(function() {
      if($(this).attr('id') == 'other-mo') {
       $(other_amount_mo_holder).show('fast');
      }

      else {
       $(other_amount_mo_holder).hide('fast');
      }
    });



    // off canvas accordion
    // $(".off-canvas-submenu").hide();
    // $(".off-canvas-submenu-call").click(function() {
    //   var icon = $(this).parent().next(".off-canvas-submenu").is(':visible') ? '+' : '-';
    //   $(this).parent().next(".off-canvas-submenu").slideToggle('fast');
    //   $(this).find("span").text(icon);
    // });

});


// user voice stuff
// https://www.uservoice.com/o/javascript-sdk
UserVoice=window.UserVoice||[];(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/Rs5HAgInY34TobrNnCxSDQ.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})();

// Set colors
UserVoice.push(['set', {
  accent_color: '#808283',
  trigger_color: 'white',
  trigger_background_color: 'rgba(46, 49, 51, 0.6)'
}]);

// Add default trigger to the bottom-right corner of the window:
UserVoice.push(['addTrigger', { mode: 'contact', trigger_position: 'bottom-right' }]);

// Autoprompt for Satisfaction and SmartVote (only displayed under certain conditions)
UserVoice.push(['autoprompt', {}]);
