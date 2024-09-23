jQuery(document).ready(function ($) {
	jQuery('#widgets-right').on('mouseover', '.ujic_date', function () {
		jQuery('#widgets-right').find('.ujic_date').datepicker({
			dateFormat: 'yy/mm/dd',
		});
	});

	jQuery('.ujic_link').each(function () {
		jQuery(this).keyup(function () {
			var value = jQuery(this).val();
			var cname = jQuery(this)
				.parent()
				.parent()
				.find('.ujic_exp')
				.attr('name');
			jQuery(this)
				.parent()
				.parent()
				.find('.ujic_exp')
				.css('border', 'red');
			//alert(cname);

			if (value) {
				jQuery('input[name="' + cname + '"]').attr('checked', false);
			} else {
				jQuery('input[name="' + cname + '"]').attr('checked', true);
			}
		});
	});
	//Timer Type

	jQuery('#widgets-right').on('click', '.ujic_type_radio', function () {
		var chkVal = jQuery(this).val();
		if (chkVal == 'ujic_type_one') {
			jQuery('.ujict_one').show();
			jQuery('.ujict_rep').hide();
		}
		if (chkVal == 'ujic_type_rep') {
			jQuery('.ujict_one').hide();
			jQuery('.ujict_rep').show();
		}
	});
	// var selValue = $('input[name=rbnNumber]:checked').val();
});
