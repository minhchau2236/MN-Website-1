$( document ).ready(function() {
	/* Search
	-------------------------------------------------------*/
	$('.search-trigger').on('click',function(e){
		e.preventDefault();
		$('.search-wrap').animate({opacity: 'toggle'},500);
		$('.nav-search').addClass("open");
		$('.search-wrap .form-control').focus();
		$('.logo').addClass("hidden");//ẩn logo
	});

	$('.search-close').on('click',function(e){
		e.preventDefault();
		$('.search-wrap').animate({opacity: 'toggle'},500);
		$('.nav-search').removeClass("open");
		$('.logo').removeClass("hidden");//show logo
	});

	function closeSearch(){
		$('.search-wrap').fadeOut(200);
		$('.nav-search').removeClass("open");
	}
		
	$(document.body).on('click',function(e) {
		closeSearch();
	});

	$(".search-wrap, .search-trigger").on('click',function(e) {
		e.stopPropagation();
	});
	
	/* ------------------------------------------
	  * owlCarousel - main-slider (page index)
	--------------------------------------------- */	
	var owlMain = $(".main-slider.owl-carousel");
	owlMain.owlCarousel({
		animateOut: 'fadeOutLeft',
		animateIn: 'fadeInRight',
		autoplay:false,
		items :1,		
		loop:true					
	});	
	
	 var owlNavMain = $('.main-slider .owl-nav');
	// Go to the next item
	$('.banner .customBtn.next').click(function() {
		owlNavMain.trigger('next.owl.carousel');
	})
	// Go to the previous item
	$('.banner .customBtn.prev').click(function() {
		// With optional speed parameter
		// Parameters has to be in square bracket '[]'
		owlNavMain.trigger('prev.owl.carousel', [300]);
	})
			
	/* ------------------------------------------
	  * owlCarousel - News
	--------------------------------------------- */	
	var owl = $(".news-slider.owl-carousel");
	owl.owlCarousel({
		animateOut: 'fadeOutLeft',
		animateIn: 'fadeInRight',
		autoplay:false,
		items :1,
		nav: true,
		loop:true		
	});	
	/* nav control icon */
    var owlNav = $('.news-slider .owl-nav'),
        el;
    
    $.each(owlNav.children(), function (i,e) {
        el = $(e);
		el.text("");
        // append navs thump/icon with control pattern(owl-prev/owl-next)        
        el.append('<div class="'+ el.attr('class').match(/owl-\w{4}/) +'-icon">');
    });
	
	/* ------------------------------------------
	  * owlCarousel - products (page index)
	--------------------------------------------- */	
	var owlPr = $(".products-slider.owl-carousel");
	owlPr.owlCarousel({
		animateOut: 'fadeOutLeft',
		animateIn: 'fadeInRight',
		autoplay:false,
		items :1,
		margin:30,
		nav: true,
		loop:true,
		responsive:{
        0:{
            items:1,
            nav:false
		},
		400:{
            items:2,
            nav:false
        },
		768:{
            items:2,
            nav:false
        },
        900:{
            items:3,
            nav:false
        },
        1000:{
            items:4,
            nav:false,
            loop:true
        }
		
    }
	});	
	/* nav control icon */
    var owlNavPr = $('.products-slider .owl-nav'),
        elPr;
    
    $.each(owlNavPr.children(), function (i,e) {
        elPr = $(e);
		elPr.text("");
        // append navs thump/icon with control pattern(owl-prev/owl-next)        
        elPr.append('<div class="'+ elPr.attr('class').match(/owl-\w{4}/) +'-icon">');
    });
	
	// Go to the next item
	$('.featured .customBtn.next').click(function() {
		owlNavPr.trigger('next.owl.carousel');
	})
	// Go to the previous item
	$('.featured .customBtn.prev').click(function() {
		// With optional speed parameter
		// Parameters has to be in square bracket '[]'
		owlNavPr.trigger('prev.owl.carousel', [300]);
	})
	
});