// Initialize your app

var myApp = new Framework7({
    swipePanel: 'left'
});


// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
$$('.open-preloader-title').on('click', function () {
    myApp.showPreloader('Cargando...')
    setTimeout(function () {
        myApp.hidePreloader();
    }, 2000);
});    
// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});



var mySwiper = myApp.swiper('.swiper-container', {
  pagination: '.swiper-pagination',
  paginationHide: false,
  paginationClickable: true,
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
});
$$('img.lazy').trigger('lazy');

$$('div.lazy').trigger('lazy');

// Generate dynamic page
 

function ocultar(){
document.getElementById('ver').style.display = 'none';}

 lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true
    });
    
