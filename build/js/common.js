$(document).ready(function() {

	$(window).scroll(function() {
		var o = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
		$(".bar-long").css("width", o + "%")
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
});
