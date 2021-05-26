/*!
    * Start Bootstrap - Creative v6.0.4 (https://startbootstrap.com/theme/creative)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
    */
    (function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    var nav = $("#mainNav");
    if (nav.offset().top > 100) {
      nav.addClass("navbar-scrolled");
    } else {
     nav.removeClass("navbar-scrolled");
    }
  };

  // navbar animation
  var $hamburger = $(".hamburger");
  $hamburger.on("click", function() {
    $hamburger.toggleClass("is-active");
  });

  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict

// show/hide RSVP options based on attending/not attending
$(document).ready(function() {
  $("input[name$='attending']").click(function() {
    var attending = $(this).val();
    if (attending === "yes") {
      $("#meal").show();
    }
    else {
      $("#meal").hide();
    }
  });
});

// code to modify form
var guestCount = 0; // todo switch to jquery
var guestHTML = document.getElementById('invitee').innerHTML;
function addGuest(){
  guestCount++;
  var form = document.getElementById('rsvp-form');

  var guest = document.createElement("div");
  guest.setAttribute('id', 'guest' + guestCount.toString());
  guest.innerHTML = guestHTML;

  form.insertBefore(guest, document.getElementById('add'));

  // enable the remove button if additional guests
  if (guestCount === 1) {
    document.getElementById('remove').disabled = false;
  }

}

function removeGuest() {
  // remove most recent guest addition from form
  $('#guest' + guestCount.toString()).remove()
  guestCount--;

  // if additional guests are zero, disable the remove button
  if (guestCount === 0){
    document.getElementById('remove').disabled = true;
  }

}

// submit
const scriptURL = 'https://script.google.com/macros/s/AKfycbyVkpWFuz3lqzPR-46pl8Z-phrhY_SZUbUDM-bppYx-Hwz6DkY7/exec'
var form = document.getElementById('rsvp-form');

$('#rsvp-form').on('submit', function(e) { // todo error handling
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  $('#rsvp-content').html(
      '<h3> Thank you! </h3>'
  ).removeClass(['border', 'border-secondary'])
})

