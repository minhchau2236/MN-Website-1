$( document ).ready(function() {
$('.news-media-slider .owl-carousel').owlCarousel({
    stagePadding: 200,
    loop:true,
    margin:10,
    nav:false,
    items:1,
    lazyLoad: true,    
  responsive:{
        0:{
            items:1,
            stagePadding: 60
        },
        600:{
            items:1,
            stagePadding: 100
        },
        1000:{
            items:1,
            stagePadding: 200
        },
        1200:{
            items:1,
            stagePadding: 250
        },
        1400:{
            items:1,
            stagePadding: 300
        },
        1600:{
            items:1,
            stagePadding: 350
        },
        1800:{
            items:1,
            stagePadding: 400
        }
    }
})
var owlNav= $('.news-media-slider .owl-nav');
// Go to the next item
$('.news-media-slider .customBtn.next').click(function() {
	owlNav.trigger('next.owl.carousel');
})
// Go to the previous item
$('.news-media-slider .customBtn.prev').click(function() {	
	owlNav.trigger('prev.owl.carousel', [300]);
})

});