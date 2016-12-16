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


  // random hero for case studies
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
    $(".off-canvas-submenu").hide();
    $(".off-canvas-submenu-call").click(function() {
      var icon = $(this).parent().next(".off-canvas-submenu").is(':visible') ? '+' : '-';
      $(this).parent().next(".off-canvas-submenu").slideToggle('fast');
      $(this).find("span").text(icon);
    });

    // Content toggles
    $('[data-content-toggle]').on('click', function(event) {
      event.preventDefault();
      var $this = $(this);
      var id = $this.attr('href');
      var $target = $(id);  // $('#alan-bio-content')
      $target.toggle();
      $this.hide();
    });

  $('.accordion-tabs-minimal').each(function(index) {
    $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
  });

  $('.accordion-tabs-minimal').on('click', 'li > a.tab-link', function(event) {
        if (!$(this).hasClass('is-active')) {
          event.preventDefault();
          var accordionTabs = $(this).closest('.accordion-tabs-minimal');
          accordionTabs.find('.is-open').removeClass('is-open').hide();

          $(this).next().toggleClass('is-open').toggle();
          accordionTabs.find('.is-active').removeClass('is-active');
          $(this).addClass('is-active');
        } else {
          event.preventDefault();
        }
    });

    $('.video .controls a').on('click', function(evt) {
        var control = $(evt.target);
        if (control.hasClass('active')) {
            return false;
        }

        $('.video .controls a').removeClass('active');
        control.addClass('active');

        $('.videos').html($('.videos').html());
        $('.videos iframe').hide();
        $($('.videos iframe').get(control.index())).show();
        return false;
    });

    $('.video .navigator.back, .video .navigator.forward').on('click', function(evt) {
        var increment = 1;
        var element = $(evt.target);
        if (element.parent().hasClass('back')) {
            increment = -1;
        }

        var index = $('.video .controls a.active').index();
        var videoCount = $('.video .controls a').length;

        index += increment;
        if (index + 1 > videoCount) {
            index = 0;
        } else if (index < 0) {
            index = videoCount - 1;
        }

        $('.video .controls a').get(index).click();
        return false;
    });

  /* Change the styling of MailChimp subscriber sign-up popup */

  // wait for 2 seconds before starting the timer

  // check the presence of the iframe every 0.5s
  // once detected iframe, change the css of some of the
  // elements inside iframe, then kill the process

  // if iframe has not show up in 30 seconds, kill the process

  setTimeout(function(){
    var fn = setInterval(function(){
      var a = $('iframe').contents();
      if(a.length) {
        a.find('#mc-EMAIL').css('margin-bottom', '5px');
        a.find('#mc-FNAME').css('margin-bottom', '5px');
        a.find('#mc-LNAME').css('margin-bottom', '5px');
        a.find('#mc-CITY').css('margin-bottom', '5px');
        a.find('#mc-COUNTRY').css('margin-bottom', '5px');

        a.find('.modalContent__image').css('height', '500px');
        a.find('.content__titleDescription span').css('white-space', 'normal');

        // var c = document.querySelector('style').textContent +=
        // "@media only screen and (max-width:800px) {.modalContent__image { height: 400px }}";
        //   console.log(c)
        clearInterval(fn);
      }

      setTimeout(function(){
        clearInterval(fn);
      }, 30000);

    }, 500);
  }, 2000);

});

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
