/* eslint-disable no-undef */
$(document).ready(function () {
  $('#returnOnTop').click(function () {
    $('html,body').animate({
      scrollTop: 0
    }, 'slow');
  });

  $(".burger").click(function () {
    // eslint-disable-next-line no-undef
    console.log("fonction appelé click burger");
    $(".menu-header").slideToggle("slow", function () {
      // Animation complete.
    });
  });

  $(".close-menu").click(function () {
    $(".menu-header").slideToggle("slow", function () {
      // Animation complete.
    });
  });

  $('.btn-filtre a').click(function () {
    $('.bloc-filtre').toggleClass('bloc-filtre-show');
    return false;
  });

  $('.bloc-init a.back').click(function () {
    $('.bloc-filtre').toggleClass('bloc-filtre-show');
    return false;
  });


  $('#largmin').on('keyup paste', function (e) {
    this.value = ~~this.value;
  });
  $('#largmax').on('keyup paste', function (e2) {
    this.value = ~~this.value;
  });

});
