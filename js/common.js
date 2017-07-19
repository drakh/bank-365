(function () {$(document).ready(function() {

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

	var slider = $("#related-posts").slick({
		slidesToShow: 1.1,
		slidesToScroll: 1,
		infinity: false,
		centerMode: false,
		dots: true,
		arrows: true,
		prevArrow: $(".arrows-prev"),
		nextArrow: $(".arrows-next"),
		responsive: [
		{
			breakpoint: 769,
			settings: {
				slidesToShow: 1
			}
		}
		]
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

$('#zostan-na-linke input').on('focus', function(event) {
	$(this).addClass('filled');
});

$('#zostan-na-linke input').on('focusout', function(event) {
	$(this).removeClass('filled');
});

	var cutWord = function cutWord() {
		var oldText = [];
		$('.blog-section .articles .content p').each(function(index, element) {
			$(element).find('.read-more').remove();
			oldText.push($(element).text());
		});
					if ($(window).width() < 768) {
				$('.blog-section .articles .content p').each(function(index, element) {
					$(element).find('.read-more').remove();
					var text = $(element).text();
					var newText = text.split(' ');
					newText = newText.slice(0, 7);
					$(element).text(newText.join(' '));
					$(element).append('<span class="read-more">....</span>')
				});
			} else {
				$('.blog-section .articles .content p').each(function(index, element) {
					$(element).text(oldText[index]);
					$(element).append('<span class="read-more">....</span>')
				});
			}
		$(window).resize(function() {
			if ($(window).width() < 768) {
				$('.blog-section .articles .content p').each(function(index, element) {
					$(element).find('.read-more').remove();
					var text = $(element).text();
					var newText = text.split(' ');
					newText = newText.slice(0, 7);
					$(element).text(newText.join(' '));
					$(element).append('<span class="read-more">....</span>')
				});
			} else {
				$('.blog-section .articles .content p').each(function(index, element) {
					$(element).text(oldText[index]);
					$(element).append('<span class="read-more">....</span>')
				});
			}
		});
	}

	cutWord();

});
}());
