$(document).ready(function () {
  // $('.popup-youtube, .popup-vimeo').magnificPopup({
  //   disableOn: 700,
  //   type: 'iframe',
  //   mainClass: 'mfp-wrap',
  //   removalDelay: 160,
  //   preloader: false,
  //   fixedContentPos: false,
  // });

  let $menu = $('#menu');
  let $logo = $('#logo');
  let $logo2 = $('#logo2');
  let $headerLink = $('.header__link');
  let $headerSignUp = $('.header__signup');

  $(window).scroll(function () {
    if ($(this).scrollTop() > 600 && $menu.hasClass('header')) {
      $menu.fadeOut('fast', function () {
        $menu.removeClass('header').addClass('header__fixed').fadeIn('fast');
        $logo.addClass('header__logo-img-none');
        $logo2.removeClass('header__logo-img-none');
      });
    } else if ($(this).scrollTop() <= 700 && $menu.hasClass('header__fixed')) {
      $menu.fadeOut('fast', function () {
        $menu.removeClass('header__fixed').addClass('header').fadeIn('fast');
        $logo.removeClass('header__logo-img-none');
        $logo2.addClass('header__logo-img-none');
      });
    } else if ($menu.hasClass('header__fixed')) {
      $headerLink.css('color', 'black');
      $headerSignUp.css('color', 'black');
    } else if ($menu.hasClass('header')) {
      $headerLink.css('color', '#d7d5d5');
      $headerSignUp.css('color', '#d7d5d5');
    }
  });
});

let humburger = document.querySelector('.header__humburger');
let menu = document.querySelector('.header__nav');

humburger.addEventListener('click', function () {
  humburger.classList.toggle('header__humburger_active');
  menu.classList.toggle('header__nav_active');
});
