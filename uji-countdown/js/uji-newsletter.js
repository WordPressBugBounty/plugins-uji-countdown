jQuery(document).ready(function ($) {
	'use strict';

	$('.ujic-hold form input[type=text]').focus(function () {
		$('.ujic-hold form .uji-msg-ok').css('display', 'none');
		$('.ujic-hold form .uji-msg-err').css('display', 'none');
	});
	$('.ujic-hold form').submit(function (event) {
		event.preventDefault();

		$.ajax({
			type: 'POST',
			url: ujiCount.ajaxUrl,
			data:
				$(this).serialize() + '&' + $.param({ action: 'ujiSubscribe' }),
			dataType: 'json',
			success: function (response) {
				response.success
					? $('.ujic-hold form .uji-msg-ok').css('display', 'block')
					: $('.ujic-hold form .uji-msg-err').css('display', 'block');
			},
		});
	});

	$('.ujic-hold form input[type=submit]').each(function () {
		var submitElm = $(this);
		var hexColor = submitElm.attr('color-attr');
		if (typeof hexColor === 'undefined') return;
		submitElm.css(
			'background',
			'-moz-linear-gradient(top,  ' +
				hexColor +
				' 0%, ' +
				shadeColor(hexColor, 20) +
				' 100%)'
		); /* FF3.6+ */
		submitElm.css(
			'background',
			'-webkit-gradient(linear, left top, left bottom, color-stop(0%,' +
				hexColor +
				'), color-stop(100%,' +
				shadeColor(hexColor, 20) +
				'))'
		); /* Chrome,Safari4+ */
		submitElm.css(
			'background',
			'-webkit-linear-gradient(top,  ' +
				hexColor +
				' 50%,' +
				shadeColor(hexColor, 20) +
				' 100%)'
		); /* Chrome10+,Safari5.1+ */
		submitElm.css(
			'background',
			'-o-linear-gradient(top,  ' +
				hexColor +
				' 0%,' +
				shadeColor(hexColor, 20) +
				' 100%)'
		); /* Opera 11.10+ */
		submitElm.css(
			'background',
			'-ms-linear-gradient(top,  ' +
				hexColor +
				' 0%,' +
				shadeColor(hexColor, 20) +
				' 100%)'
		); /* IE10+ */
		submitElm.css(
			'background',
			'linear-gradient(to bottom,  ' +
				hexColor +
				' 0%,' +
				shadeColor(hexColor, 20) +
				' 100%)'
		); /* W3C */
		submitElm.css(
			'filter',
			"progid:DXImageTransform.Microsoft.gradient( startColorstr='" +
				hexColor +
				"', endColorstr='" +
				shadeColor(hexColor, 20) +
				"',GradientType=0 )"
		); /* IE6-9 */
	});

	function shadeColor(color, percent) {
		var num = parseInt(color.slice(1), 16),
			amt = Math.round(2.55 * percent),
			R = (num >> 16) + amt,
			G = ((num >> 8) & 0x00ff) + amt,
			B = (num & 0x0000ff) + amt;
		return (
			'#' +
			(
				0x1000000 +
				(R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
				(G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
				(B < 255 ? (B < 1 ? 0 : B) : 255)
			)
				.toString(16)
				.slice(1)
		);
	}
});
