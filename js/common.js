$(document).ready(function() {

	$(window).scroll(function() {
		var o = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
		$(".bar-long").css("width", o + "%")

		var winTop = $(window).scrollTop();
		var menu = $('.main-menu').height();
		if(winTop > menu){
			$('.main-menu').addClass('menu-sticky');
		}else{
			$('.main-menu').removeClass('menu-sticky');
		}
	});

	$("#related-posts").slick({
		slidesToShow: 1.1,
		slidesToScroll: 1,
		infinity: false,
		centerMode: false,
		dots: true,
		arrows: true,
		prevArrow: $(".arrows-prev"),
		nextArrow: $(".arrows-next")
	});

	$("input").on("input", function(o) {
		"LABEL" == o.target.parentNode.tagName && $(this).val().length > 0 ? $(this).parent().addClass("focused") : $(this).parent().removeClass("focused")
	})

	$('#search').on('click', function(event) {
		var modal = '[data-modal=' + $(this).attr('data-target') +  ']';
		var element = $('body').find(modal);
		element.toggleClass('open');
		if (element.hasClass('open')) {
			$('body').removeClass('roll');
		} else {
			$('body').addClass('roll');
		}
	});

	$(window).on('keydown', function(event) {
		var modal = '[data-modal=' + $(this).attr('data-target') +  ']';
		var element = $('body').find(modal);
		if (event.keyCode == 27) {
			if ($('.modal').hasClass('open')) {
				$('.modal').toggleClass('open');
			}
			if (element.hasClass('open')) {
				$('body').removeClass('roll');
			} else {
				$('body').addClass('roll');
			}
		}
	});

	$('.modal').on('click', function(event) {
		if (event.target.className == 'modal-fade' && $(this).hasClass('open')) {
			$(this).removeClass('open');
			$('body').toggleClass('roll');
		};
	});

	var cutWord = function cutWord() {
		$('.blog-section .articles .content p').each(function(index, element) {
			$(element).find('.read-more').remove();
			var text = $(element).text();
			var newText = text.split(' ');
			newText = newText.slice(0, 7);
			$(element).text(newText.join(' '));
			$(element).append('<span class="read-more">....</span>')
		});
	}

	cutWord();

	$(window).resize(function() {
		cutWord();
	});

});
