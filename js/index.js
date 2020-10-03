$(document).ready(function () {
  // $('.popup-youtube, .popup-vimeo').magnificPopup({
  //   disableOn: 700,
  //   type: 'iframe',
  //   mainClass: 'mfp-wrap',
  //   removalDelay: 160,
  //   preloader: false,
  //   fixedContentPos: false,
  // });
});

let humburger = document.querySelector('.header__humburger');
let menu = document.querySelector('.header__nav');

humburger.addEventListener('click', function () {
  humburger.classList.toggle('header__humburger_active');
  menu.classList.toggle('header__nav_active');
});
