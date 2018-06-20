"use strict"; // Start of use strict
/*=====================*/
/* LIGHT-BOX */
/*=====================*/

function bootstrapAnimatedLayer() {

    /* Demo Scripts for Bootstrap Carousel and Animate.css article
     * on SitePoint by Maria Antonietta Perna
     */

    //Function to animate slider captions 
    function doAnimations(elems) {
        //Cache the animationend event in a variable
        var animEndEv = 'webkitAnimationEnd animationend';

        elems.each(function() {
            var $this = $(this),
                $animationType = $this.data('animation');
            $this.addClass($animationType).one(animEndEv, function() {
                $this.removeClass($animationType);
            });
        });
    }

    //Variables on page load 
    var $myCarousel = $('#minimal-bootstrap-carousel'),
        $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");

    //Initialize carousel 
    $myCarousel.carousel({
        interval: 7000
    });

    //Animate captions in first slide on page load 
    doAnimations($firstAnimatingElems);

    //Pause carousel  
    $myCarousel.carousel('pause');


    //Other slides to be animated on carousel slide event 
    $myCarousel.on('slide.bs.carousel', function(e) {
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
        doAnimations($animatingElems);
    });
}
//====Main menu===
  
    if ($('#main-navigation-wrapper .navbar-nav li .dropdown-submenu').length) {
        $('#main-navigation-wrapper .navbar-nav li .dropdown-submenu').parent('li').children('a').append(function() {
            return '<button class="dopdown-nav-toggler"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>';
        });
        $('#main-navigation-wrapper .navbar-nav .dopdown-nav-toggler').on('click', function() {
            var Self = $(this);
            Self.parent().parent().children('.dropdown-submenu').slideToggle();
            return false;
        });

    };



$(window).scroll(function() {
    if ($(this).scrollTop() > 200){  
        $('.main-menu-one').addClass("sticky");
    }
    else{
        $('.main-menu-one').removeClass("sticky");
    }
});

$(window).scroll(function() {
    if ($(this).scrollTop() > 200){  
        $('.main-menu-two').addClass("sticky");
    }
    else{
        $('.main-menu-two').removeClass("sticky");
    }
});

$(window).scroll(function() {
    if ($(this).scrollTop() > 200){  
        $('.main-menu-four').addClass("sticky");
    }
    else{
        $('.main-menu-four').removeClass("sticky");
    }
});

     $('.toggle-heading').click(function(){
	  $(this).find(".fa-plus").toggle();
	});	
	
	
	$('.counter').counterUp({
                delay: 10,
                time: 4000
            });
	
	function clientCarousel() {
	
	$('#services').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:3
        }
    }
});

    };


function thmProjectFilter() {
    $('#about-us-our-partners').owlCarousel({
    items:3,
    
    loop:true,
    margin:10,
    
    merge:true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    
    responsive:{
    	0:{
        	items:1,
            
        },
        768:{
        	items:3,
            margin:30
        },
        1000:{
            items:4,
            margin:30
     }
    }
        });
    };

function thmBarChart() {
    $('#our-projects').owlCarousel({
    	loop: true,
		margin: 0,
		items:5,
		dots:false,
		nav: true,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		responsiveClass: true,
    
   	responsive: {
					0: {
						items: 1
				},
				481: {
						items: 2
				},
				700: {
						items: 3
				},
				992: {
						items: 5,
				}
    }
        });
    };


function doughnutChartBox() {
     $('#our-projects-three').owlCarousel({
    	loop: true,
		margin: 40,
		items:5,
		dots:false,
		nav: true,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		responsiveClass: true,
    
   	responsive: {
				0: {
						items: 1,
						
				},
				768: {
						items: 1,
				},      
				
				1200: {
						items: 5,
						nav:true,
				}
    }
        });
    };
    
    function doughnutChartBox() {
     $('#testimonials').owlCarousel({
    	
	loop:true,
    margin:70,
    dots:true,
    nav:true,
    responsiveClass:true,    
   	responsive: {
				0: {
						items: 1,
						
				},
				768: {
						items: 1,
				},      
				
				1200: {
						items: 2,
						
				}
    }
        });
    };
    
     
     $('#testimonials-three3').owlCarousel({
    	
	loop:true,
    margin:60,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    nav:true,
    responsiveClass:true,    
   	responsive: {
				0: {
						items: 1,
						
				},
				768: {
						items: 1,
				},      
				
				1200: {
						items: 1,
						
				}
    }
        });
        
        
         $('#testimonials-four').owlCarousel({
    	
	loop:true,
    
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    nav:true,
    responsiveClass:true,    
   	responsive: {
				0: {
						items: 1,
						
				},
				768: {
						items: 1,
				},      
				
				1200: {
						items: 1,
						
				}
    }
        });
  
    
     function doughnutChartBox() {
     $('#testimonials-three2').owlCarousel({
    	
	loop:true,
    margin:70,
    dots:true,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    nav:true,
    responsiveClass:true,    
   	responsive: {
				0: {
						items: 1,
						
				},
				768: {
						items: 2,
				},      
				
				1200: {
						items: 2,
						
				}
    }
        });
    };
    
    
    function maineNavToggle() {
    if ($('#main-navigation-wrapper .navbar-nav li .dropdown-submenu').length) {
        $('#main-navigation-wrapper .navbar-nav li .dropdown-submenu').parent('li').children('a').append(function() {
            return '<button class="dopdown-nav-toggler"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>';
        });
        $('#main-navigation-wrapper .navbar-nav .dopdown-nav-toggler').on('click', function() {
            var Self = $(this);
            Self.parent().parent().children('.dropdown-submenu').slideToggle();
            return false;
        });

    };
}

    
 // scroll to top button
 
 
  $(window).scroll(function(){
  	if($(this).scrollTop() > 500) {
  		$(".scroll-top").fadeIn(200);
  		
  	} else {
  		$(".scroll-top").fadeOut(200);
  	}
  });
   $(".scroll-top").click(function(event){
 	event.preventDefault();
 	$("html, body").animate({scrollTop: 0},600);
 });
 
 

// instance of fuction while Document ready event   
jQuery(document).on('ready', function() {
    (function($) {
        bootstrapAnimatedLayer();
        clientCarousel();
        thmProjectFilter();
        thmBarChart();
        doughnutChartBox();
        testiCarousel();
        maineNavToggle();
        contactFormValidation();
        thmCounter();
        scrollMenu();
    })(jQuery);
});

// instance of fuction while Window Load event
jQuery(window).on('load', function() {
    (function($) {

    })(jQuery);
});

// instance of fuction while Window Scroll event
jQuery(window).on('scroll', function() {
    (function($) {

    })(jQuery);
});


  
 
 
 function contactFormValidation() {

    if ($('.contact-form').length) {
        $('.contact-form').validate({ // initialize the plugin
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true
                },
                subject: {
                    required: true
                }
            },
            submitHandler: function(form) {
                // sending value with ajax request
                $.post($(form).attr('action'), $(form).serialize(), function(response) {
                    $(form).parent('div').append(response);
                    $(form).find('input[type="text"]').val('');
                    $(form).find('input[type="email"]').val('');
                    $(form).find('textarea').val('');
                });
                return false;
            }
        });
    }
}


/* hero slider */

jQuery(document).ready(function($){  
	var slidesWrapper = $('.cd-hero-slider');

	//check if a .cd-hero-slider exists in the DOM 
	if ( slidesWrapper.length > 0 ) {
		var primaryNav = $('.cd-primary-nav'),
			sliderNav = $('.cd-slider-nav'),
			navigationMarker = $('.cd-marker'),
			slidesNumber = slidesWrapper.children('li').length,
			visibleSlidePosition = 0,
			autoPlayId,
			autoPlayDelay = 5000;

		//upload videos (if not on mobile devices)
		uploadVideo(slidesWrapper);

		//autoplay slider
		setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);

		//on mobile - open/close primary navigation clicking/tapping the menu icon
		primaryNav.on('click', function(event){
			if($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
		});
		
		//change visible slide
		sliderNav.on('click', 'li', function(event){
			event.preventDefault();
			var selectedItem = $(this);
			if(!selectedItem.hasClass('selected')) {
				// if it's not already selected
				var selectedPosition = selectedItem.index(),
					activePosition = slidesWrapper.find('li.selected').index();
				
				if( activePosition < selectedPosition) {
					nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
				} else {
					prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
				}

				//this is used for the autoplay
				visibleSlidePosition = selectedPosition;

				updateSliderNavigation(sliderNav, selectedPosition);
				updateNavigationMarker(navigationMarker, selectedPosition+1);
				//reset autoplay
				setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
			}
		});
	}

	function nextSlide(visibleSlide, container, pagination, n){
		visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			visibleSlide.removeClass('is-moving');
		});

		container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
		checkVideo(visibleSlide, container, n);
	}

	function prevSlide(visibleSlide, container, pagination, n){
		visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			visibleSlide.removeClass('is-moving');
		});

		container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
		checkVideo(visibleSlide, container, n);
	}

	function updateSliderNavigation(pagination, n) {
		var navigationDot = pagination.find('.selected');
		navigationDot.removeClass('selected');
		pagination.find('li').eq(n).addClass('selected');
	}

	function setAutoplay(wrapper, length, delay) {
		if(wrapper.hasClass('autoplay')) {
			clearInterval(autoPlayId);
			autoPlayId = window.setInterval(function(){autoplaySlider(length)}, delay);
		}
	}

	function autoplaySlider(length) {
		if( visibleSlidePosition < length - 1) {
			nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);
			visibleSlidePosition +=1;
		} else {
			prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);
			visibleSlidePosition = 0;
		}
		updateNavigationMarker(navigationMarker, visibleSlidePosition+1);
		updateSliderNavigation(sliderNav, visibleSlidePosition);
	}

	function uploadVideo(container) {
		container.find('.cd-bg-video-wrapper').each(function(){
			var videoWrapper = $(this);
			if( videoWrapper.is(':visible') ) {
				// if visible - we are not on a mobile device 
				var	videoUrl = videoWrapper.data('video'),
					video = $('<video loop><source src="'+videoUrl+'.mp4" type="video/mp4" /><source src="'+videoUrl+'.webm" type="video/webm" /></video>');
				video.appendTo(videoWrapper);
				// play video if first slide
				if(videoWrapper.parent('.cd-bg-video.selected').length > 0) video.get(0).play();
			}
		});
	}

	function checkVideo(hiddenSlide, container, n) {
		//check if a video outside the viewport is playing - if yes, pause it
		var hiddenVideo = hiddenSlide.find('video');
		if( hiddenVideo.length > 0 ) hiddenVideo.get(0).pause();

		//check if the select slide contains a video element - if yes, play the video
		var visibleVideo = container.children('li').eq(n).find('video');
		if( visibleVideo.length > 0 ) visibleVideo.get(0).play();
	}

	function updateNavigationMarker(marker, n) {
		marker.removeClassPrefix('item').addClass('item-'+n);
	}

	$.fn.removeClassPrefix = function(prefix) {
		//remove all classes starting with 'prefix'
	    this.each(function(i, el) {
	        var classes = el.className.split(" ").filter(function(c) {
	            return c.lastIndexOf(prefix, 0) !== 0;
	        });
	        el.className = $.trim(classes.join(" "));
	    });
	    return this;
	};
});