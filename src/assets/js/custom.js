
//booking-engine

$(document).ready(function(){
	
	//Login Form
	$('#signin').click(function(){
		$('.loginTab li a').removeClass('active');
		$(this).addClass('active');
		$('.signinForm').show();
		$('.signupForm').hide();
	});
	$('#signup').click(function(){
		$('.loginTab li a').removeClass('active');
		$(this).addClass('active');
		$('.signupForm').show();
		$('.signinForm').hide();
	});
	
	//Mobile Toggle
	$('.m-modify').click(function(){
		$('.modify-box').slideToggle(500);
	});
	
	// hotel Add rooms 
	$('.addRoom').click(function(){
		$('.roomGuestBox').slideToggle(500);
	});
	$('.addApply').click(function(){
		$('.roomGuestBox').slideUp();
	});
	
	// Modify Search
	$('.navSticky li a').click(function(){
		$('.navSticky li a').removeClass('active');
		$(this).addClass('active');
	});
	
	$('#flight').click(function(){
		$('.booking-tab li a').removeClass('active');
		$(this).addClass('active');
		$('.flight-sec').show();
		$('.hotel-sec').hide();
		$('.bus-sec').hide();
	});
	$('#hotel').click(function(){
		$('.booking-tab li a').removeClass('active');
		$(this).addClass('active');
		$('.hotel-sec').show();
		$('.flight-sec').hide();
		$('.bus-sec').hide();
	});
	$('#bus').click(function(){
		$('.booking-tab li a').removeClass('active');
		$(this).addClass('active');
		$('.bus-sec').show();
		$('.flight-sec').hide();
		$('.hotel-sec').hide();
	});
	
	// Modify Search
	$('.date-icon').click(function(){
		$('.auto-hide').show();
	});
	$('.close-box').click(function(){
		$('.auto-hide').hide();
	});
	
	// Filter 
	$('.item-01').click(function(){
		$('.filter-box').hide();
		$('.filter-top').show();
		$('.more-opt').slideDown(500);
	});
	$('#cancelfilter').click(function(){
		$('.filter-box').show();
		$('.filter-top').hide();
		$('.more-opt').hide();
	});
	
	// Flight Details
	$('.fgt-link a').click(function(){
		$(this).parents('.flight-det').find('#flightdetails').slideToggle();
	});
	$('.flightdetails-close').click(function(){
		$(this).parents('.flight-det').find('#flightdetails').slideUp();
	});
	
	// Bus Seat Book
	$('.btnBox > .btn-select').click(function(){
		$('#bookSeats').show();
	});
	$('.seatClose').click(function(){
		$('#bookSeats').hide();
	});
	
	// Bus Seat Book
	$('#lowerDeck').click(function(){
		$(this).parents('.seatType').find('.active').removeClass('active');
		$(this).addClass('active');
		$('.upperDeckBox').hide();
		$('.lowerDeckBox').show();
	});
	$('#upperDeck').click(function(){
		$(this).parents('.seatType').find('.active').removeClass('active');
		$(this).addClass('active');
		$('.lowerDeckBox').hide();
		$('.upperDeckBox').show();
	});
	
 
	// Bus Bording/Dropping Points
	$('.dp').click(function(){
		$('#boardingPoint').show();
	});
	$('.seatClose').click(function(){
		$('#boardingPoint').hide();
	});
	
	
	// Bus Cancellation Policy
	$('.cancelP').click(function(){
		$('#cancellationPolicy').show();
	});
	$('.seatClose').click(function(){
		$('#cancellationPolicy').hide();
	}); 
	
	// Filter 
	$('.stop-circle').hover(
		function () {
			$(this).find(".content-wrap").addClass("tooltip_hover");
		},
		function () {
			$(this).find(".content-wrap").removeClass("tooltip_hover");
		}
	);
	$('.more-stops span').hover(
		function () {
			$(this).parents(".more-stops").find(".content-wrap").addClass("tooltip_hover");
		},
		function () {
			$(this).parents(".more-stops").find(".content-wrap").removeClass("tooltip_hover");
		}
	);
	$('.price-tipsy').hover(
		function () {
			$(this).parents(".pricing-det").find(".pricing-fare-summary").addClass("tooltip_hover");
		},
		function () {
			$(this).parents(".pricing-det").find(".pricing-fare-summary").removeClass("tooltip_hover");
		}
	);
	
	
	// Sign in 
	$('.sign-opt').click(function(){
		$('.login-box').slideToggle();
	});
	$('.close-sign-box').click(function(){
		$('.login-box').slideUp();
	});
	
	// GST 
	$('.add-gst').click(function(){
		$('.close-gst').show();
		$('.add-gst').hide();
		$('.gst-content').slideDown();
	});
	$('.close-gst').click(function(){
		$('.close-gst').hide();
		$('.add-gst').show();
		$('.gst-content').slideUp();
	});
	
	//Career Counseling Slider
	$('.flight-slider').slick({
       slidesToShow: 4,
       slidesToScroll: 1,
       autoplay: true,
       autoplaySpeed:5000,
       arrows: true,
       dots: false,
		asNavFor: '.flight-slider',
       pauseOnHover: false,
       responsive: [{
           breakpoint: 992,
           settings: {
               slidesToShow: 2
           }
       }, {
           breakpoint: 767,
           settings: {
               slidesToShow: 2
           }
	   }, {
           breakpoint: 500,
           settings: {
               slidesToShow: 1
           }
		   
       }]
   });

});

	//hotel navbar
// 	window.onscroll = function() {myFunction()};

// 	var div = document.getElementById("navSticky");
// 	var sticky = div.offsetTop;

// 	function myFunction() {
// 	  if (window.pageYOffset > sticky) {
// 		div.classList.add("sticky");
// 	  } else {
// 		div.classList.remove("sticky");
// 	  }
// }

// ============hotel & bus=============

//booking-engine

$(document).ready(function(){
	
	//Login Form
	$('#signin').click(function(){
		$('.loginTab li a').removeClass('active');
		$(this).addClass('active');
		$('.signinForm').show();
		$('.signupForm').hide();
	});
	$('#signup').click(function(){
		$('.loginTab li a').removeClass('active');
		$(this).addClass('active');
		$('.signupForm').show();
		$('.signinForm').hide();
	});
	
	//Mobile Toggle
	$('.m-modify').click(function(){
		$('.modify-box').slideToggle(500);
	});
	
	// hotel Add rooms 
	$('.addRoom').click(function(){
		$('.roomGuestBox').slideToggle(500);
	});
	$('.addApply').click(function(){
		$('.roomGuestBox').slideUp();
	});
	
	// Modify Search
	$('.navSticky li a').click(function(){
		$('.navSticky li a').removeClass('active');
		$(this).addClass('active');
	});
	
	$('#flight').click(function(){
		$('.booking-tab li a').removeClass('active');
		$(this).addClass('active');
		$('.flight-sec').show();
		$('.hotel-sec').hide();
		$('.bus-sec').hide();
	});
	$('#hotel').click(function(){
		$('.booking-tab li a').removeClass('active');
		$(this).addClass('active');
		$('.hotel-sec').show();
		$('.flight-sec').hide();
		$('.bus-sec').hide();
	});
	$('#bus').click(function(){
		$('.booking-tab li a').removeClass('active');
		$(this).addClass('active');
		$('.bus-sec').show();
		$('.flight-sec').hide();
		$('.hotel-sec').hide();
	});
	
	// Modify Search
	$('.date-icon').click(function(){
		$('.auto-hide').show();
	});
	$('.close-box').click(function(){
		$('.auto-hide').hide();
	});
	
	// Hotel mobile Filter
	$('.mob-filter').click(function(){
		$('#mobileFilter').show();
	});
	$('.filterClose').click(function(){
		$('#mobileFilter').hide();
	}); 
	
	// Filter 
	$('.item-01').click(function(){
		$('.filter-box').hide();
		$('.filter-top').show();
		$('.more-opt').slideDown(500);
	});
	$('#cancelfilter').click(function(){
		$('.filter-box').show();
		$('.filter-top').hide();
		$('.more-opt').hide();
	});
	
	// Flight Details
	// $('.fgt-link a').click(function(){
	// 	$(this).parents('.flight-det').find('#flightdetails').slideToggle();
	// });
	// $('.flightdetails-close').click(function(){
	// 	$(this).parents('.flight-det').find('#flightdetails').slideUp();
	// });
	
	// Bus Seat Book
	$('.btnBox > .btn-select').click(function(){
		$('#bookSeats').show();
	});
	$('.seatClose').click(function(){
		$('#bookSeats').hide();
	});
	
	// Bus Seat Book
	$('#lowerDeck').click(function(){
		$(this).parents('.seatType').find('.active').removeClass('active');
		$(this).addClass('active');
		$('.upperDeckBox').hide();
		$('.lowerDeckBox').show();
	});
	$('#upperDeck').click(function(){
		$(this).parents('.seatType').find('.active').removeClass('active');
		$(this).addClass('active');
		$('.lowerDeckBox').hide();
		$('.upperDeckBox').show();
	});
	
 
	// Bus Bording/Dropping Points
	$('.dp').click(function(){
		$('#boardingPoint').show();
	});
	$('.seatClose').click(function(){
		$('#boardingPoint').hide();
	});
	
	
	// Bus Cancellation Policy
	$('.cancelP').click(function(){
		$('#cancellationPolicy').show();
	});
	$('.seatClose').click(function(){
		$('#cancellationPolicy').hide();
	}); 
	
	// Filter 
	$('.stop-circle').hover(
		function () {
			$(this).find(".content-wrap").addClass("tooltip_hover");
		},
		function () {
			$(this).find(".content-wrap").removeClass("tooltip_hover");
		}
	);
	$('.more-stops span').hover(
		function () {
			$(this).parents(".more-stops").find(".content-wrap").addClass("tooltip_hover");
		},
		function () {
			$(this).parents(".more-stops").find(".content-wrap").removeClass("tooltip_hover");
		}
	);
	$('.price-tipsy').hover(
		function () {
			$(this).parents(".pricing-det").find(".pricing-fare-summary").addClass("tooltip_hover");
		},
		function () {
			$(this).parents(".pricing-det").find(".pricing-fare-summary").removeClass("tooltip_hover");
		}
	);
	
	
	// Sign in 
	$('.sign-opt').click(function(){
		$('.login-box').slideToggle();
	});
	$('.close-sign-box').click(function(){
		$('.login-box').slideUp();
	});
	
	// GST 
	$('.add-gst').click(function(){
		$('.close-gst').show();
		$('.add-gst').hide();
		$('.gst-content').slideDown();
	});
	$('.close-gst').click(function(){
		$('.close-gst').hide();
		$('.add-gst').show();
		$('.gst-content').slideUp();
	});
	
	//Career Counseling Slider
	$('.flight-slider').slick({
       slidesToShow: 4,
       slidesToScroll: 1,
       autoplay: true,
       autoplaySpeed:5000,
       arrows: true,
       dots: false,
		asNavFor: '.flight-slider',
       pauseOnHover: false,
       responsive: [{
           breakpoint: 992,
           settings: {
               slidesToShow: 2
           }
       }, {
           breakpoint: 767,
           settings: {
               slidesToShow: 2
           }
	   }, {
           breakpoint: 500,
           settings: {
               slidesToShow: 1
           }
		   
       }]
   });
   

});

	//hotel navbar
// 	window.onscroll = function() {myFunction()};

// 	var div = document.getElementById("navSticky");
// 	var sticky = div.offsetTop;

// 	function myFunction() {
// 	  if (window.pageYOffset > sticky) {
// 		div.classList.add("sticky");
// 	  } else {
// 		div.classList.remove("sticky");
// 	  }
// }

 
 