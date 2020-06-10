$(document).ready(function() {

	/* wow js animations activation */
	new WOW().init();

	/* Navigation burger onclick side navigation show */
	$('.burger-container').on('click', function() {
		$('.main-navigation').toggle('slow');

		if($('#myBtn').hasClass('change')) {
			$('body').addClass('stop-scroll');
		} else {
			$('body').removeClass('stop-scroll');
		}
	});


	/* About me slider */
	$('.about-me-slider').slick({
		slidesToShow: 1,
		prevArrow: '<span class="span-arrow slick-prev"><</span>',
		nextArrow: '<span class="span-arrow slick-next">></span>'
	});

	/* Blog slider */
	$('.blog-slider').slick({
		slidesToShow: 2,
		prevArrow: '<span class="span-arrow slick-prev"><</span>',
		nextArrow: '<span class="span-arrow slick-next">></span>',
		responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1
			}
		}
		]
	});


	/* Contact form validation */
	var contactForm = function() {
		if ($('#contactForm').length > 0 ) {
			$( "#contactForm" ).validate( {
				rules: {
					name: "required",
					email: {
						required: true,
						email: true
					},
					message: {
						required: true,
						minlength: 5
					}
				},
				messages: {
					name: "Please enter your name",
					email: "Please enter a valid email address",
					message: "Please enter a message"
				},
				/* submit via ajax */
				submitHandler: function(form) {   
					var $submit = $('.submitting'),
					waitText = 'Submitting...';

					$.ajax({    
						type: "POST",
						url: "php/sendEmail.php",
						data: $(form).serialize(),

						beforeSend: function() { 
							$submit.css('display', 'block').text(waitText);
						},
						success: function(msg) {
							if (msg == 'OK') {
								$('#form-message-warning').hide();
								setTimeout(function(){
									$('#contactForm').fadeOut();
								}, 1000);
								setTimeout(function(){
									$('#form-message-success').fadeIn();   
								}, 1400);

							} else {
								$('#form-message-warning').html(msg);
								$('#form-message-warning').fadeIn();
								$submit.css('display', 'none');
							}
						},
						error: function() {
							$('#form-message-warning').html("Something went wrong. Please try again.");
							$('#form-message-warning').fadeIn();
							$submit.css('display', 'none');
						}
					});       
				}

			} );
		}
	};


	$(function(){
		contactForm();
	});


});



var counta = 0;

$(window).scroll(function(e){


	/* Onscroll number counter */
	var statisticNumbers = $('.single-count');
	if(statisticNumbers.length) {
		var oTop = statisticNumbers.offset().top - window.innerHeight;
		if (counta == 0 && $(window).scrollTop() > oTop) {
			$('.count').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				},

				{
					duration: 2000,
					easing: 'swing',
					step: function() {
						$this.text(Math.floor(this.countNum));
					},
					complete: function() {
						$this.text(this.countNum);
					}
				});
			});
			counta = 1;
		}
	}

});


      var fade = setInterval( function() {fading()} ,  100)
      setInterval(function() {show()} , 4000)
var i = 0;
function show() {
  var item = document.querySelector('#slides').getElementsByTagName('img');
  ++i;
  if(i== item.length){
      i=0;
  }

  if(i==0){
      item[item.length-1].style.display="none";
  } else{
      item[i-1].style.display="none";
  } item[i].style.display="inline";

  item[i].style.opacity=1;
  clearInterval(fade)
  fade = setInterval( function() {fading()} ,  100)
}  

function fading(){
var item = document.getElementById('slides').getElementsByTagName('img');
var opacity = item[i].style.opacity >= 0 ? item[i].style.opacity : 1;
item[i].style.opacity = opacity - 0.025
}
    