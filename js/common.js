(function ()
{
	jQuery(document).ready(function ()
	{
		
		jQuery(window).scroll(function ()
		{
			var o = 100 * jQuery(window).scrollTop() / (jQuery(document).height() - jQuery(window).height());
			jQuery(".bar-long").css("width", o + "%")
			
			var winTop = jQuery(window).scrollTop();
			var menu = jQuery('.main-menu').height();
			if (winTop > menu)
			{
				jQuery('.main-menu').addClass('menu-sticky');
			}
			else
			{
				jQuery('.main-menu').removeClass('menu-sticky');
			}
		});
		
		var slider = jQuery("#related-posts").slick({
			slidesToShow: 1.1,
			slidesToScroll: 1,
			infinity: false,
			centerMode: false,
			dots: true,
			arrows: true,
			prevArrow: jQuery(".arrows-prev"),
			nextArrow: jQuery(".arrows-next"),
			responsive: [
				{
					breakpoint: 769,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});
		
		jQuery("input").on("input", function (o)
		{
			"LABEL" == o.target.parentNode.tagName && jQuery(this).val().length > 0 ? jQuery(this).parent().addClass("focused") : jQuery(this).parent().removeClass("focused")
		})
		
		jQuery('#search').on('click', function (event)
		{
			var modal = '[data-modal=' + jQuery(this).attr('data-target') + ']';
			var element = jQuery('body').find(modal);
			element.toggleClass('open');
			if (element.hasClass('open'))
			{
				jQuery('body').removeClass('roll');
			}
			else
			{
				jQuery('body').addClass('roll');
			}
		});
		
		jQuery(window).on('keydown', function (event)
		{
			var modal = '[data-modal=' + jQuery(this).attr('data-target') + ']';
			var element = jQuery('body').find(modal);
			if (event.keyCode == 27)
			{
				if (jQuery('.modal').hasClass('open'))
				{
					jQuery('.modal').toggleClass('open');
				}
				if (element.hasClass('open'))
				{
					jQuery('body').removeClass('roll');
				}
				else
				{
					jQuery('body').addClass('roll');
				}
			}
		});
		
		jQuery('.modal').on('click', function (event)
		{
			if (event.target.className == 'modal-fade' && jQuery(this).hasClass('open'))
			{
				jQuery(this).removeClass('open');
				jQuery('body').toggleClass('roll');
			}
			;
		});
		
		jQuery('#zostan-na-linke input').on('focus', function (event)
		{
			jQuery(this).addClass('filled');
		});
		
		jQuery('#zostan-na-linke input').on('focusout', function (event)
		{
			jQuery(this).removeClass('filled');
		});
		
		var cutWord = function cutWord()
		{
			var oldText = [];
			jQuery('.blog-section .articles .content p').each(function (index, element)
			{
				jQuery(element).find('.read-more').remove();
				oldText.push(jQuery(element).text());
			});
			if (jQuery(window).width() < 768)
			{
				jQuery('.blog-section .articles .content p').each(function (index, element)
				{
					jQuery(element).find('.read-more').remove();
					var text = jQuery(element).text();
					var newText = text.split(' ');
					newText = newText.slice(0, 7);
					jQuery(element).text(newText.join(' '));
					jQuery(element).append('<span class="read-more">....</span>')
				});
			}
			else
			{
				jQuery('.blog-section .articles .content p').each(function (index, element)
				{
					jQuery(element).text(oldText[index]);
					jQuery(element).append('<span class="read-more">....</span>')
				});
			}
			jQuery(window).resize(function ()
			{
				if (jQuery(window).width() < 768)
				{
					jQuery('.blog-section .articles .content p').each(function (index, element)
					{
						jQuery(element).find('.read-more').remove();
						var text = jQuery(element).text();
						var newText = text.split(' ');
						newText = newText.slice(0, 7);
						jQuery(element).text(newText.join(' '));
						jQuery(element).append('<span class="read-more">....</span>')
					});
				}
				else
				{
					jQuery('.blog-section .articles .content p').each(function (index, element)
					{
						jQuery(element).text(oldText[index]);
						jQuery(element).append('<span class="read-more">....</span>')
					});
				}
			});
		}
		
		cutWord();
		
	});
}());
