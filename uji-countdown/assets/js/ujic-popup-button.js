(function () {
	var ujic_styles = ujic_short_vars.ujic_style;
	var ujic_min = ujic_short_vars.ujic_min;
	var ujic_hou = ujic_short_vars.ujic_hou;
	var ujic_reclab = ujic_short_vars.ujic_reclab;
	//Extend plugins
	var ujic_extends = typeof ujic_extend !== 'undefined' ? ujic_extend : '';
	//Version multi check
	var ujic_multi_msg = {
		type: 'container',
		html: '<div><p style="font-size:11px; padding-bottom: 15px;">Only one timer on page is allowed.<br>Check the <a href="http://www.wpmanage.com/uji-countdown" style="font-size:11px; color: #00A0D2" target="_blank">Pro version</a> for multiple countdown timers on the same page. <p></div><div class="uji_spacer"></div>',
	};
	var ujic_vers =
		typeof ujic_pro !== 'undefined'
			? ujic_pro.type !== 'pro'
				? ujic_multi_msg
				: ''
			: ujic_multi_msg;

	var cntType = typeof ujic_pro !== 'undefined' ? 'pro' : 'free';

	tinymce.PluginManager.add('ujic_tc_button', function (editor, url) {
		editor.addButton('ujic_tc_button', {
			title: 'Uji Countdown',
			type: 'button',
			icon: 'mce-ico mce-i-icon dashicons-clock',
			text: '',
			onclick: function () {
				if (typeof ujic_styles != 'undefined' && !ujic_styles) {
					editor.windowManager.open({
						id: 'uji-contdown-pop',
						title: 'Add Countdown Shortcode',
						body: [
							ujic_vers,
							{
								type: 'container',
								html: '<div style="font-size: 16px;">Plese create your countdown Style first. <br> \n\
                                           <span style="color: red;font-size: 16px;">Go to:</span> Settings/Uji Countdown </div>',
							},
						],
					});
				} else {
					var win = editor.windowManager.open({
						id: 'uji-contdown-pop',
						title: 'Add Countdown Shortcode',
						body: [
							ujic_vers,
							{
								type: 'listbox',
								name: 'ujic_style',
								label: 'Select Style:',
								tooltip: 'Select saved style',
								values: ujic_styles,
							},
							{
								type: 'container',
								html: '<div class="uji_spacer"></div>',
							},
							{
								type: 'container',
								label: 'Timer Type:',
								items: [
									{
										type: 'radio',
										name: 'ujic_type_one',
										id: 'ujic_type_one',
										label: 'One Time Timer',
										text: 'One Time Timer',
										style: 'display:inline-block; margin-right: 15px;',
										tooltip:
											'Timer will countinue until expiration time',
										checked: true,
									},
									{
										type: 'radio',
										name: 'ujic_type_rep',
										id: 'ujic_type_rep',
										label: 'Repeat Timer',
										text: 'Repeat Timer',
										style: 'display:inline-block;',
										tooltip:
											'Timer will restart on page refresh',
										checked: false,
									},
								],
							},
							{
								type: 'textbox',
								name: 'ujic_date',
								label: 'Expire Date:',
								tooltip: 'Select the date to expire',
								id: 'ujic-datapick',
							},
							{
								type: 'container',
								id: 'ujic_sel_time',
								label: 'Select Time:',
								items: [
									{
										type: 'listbox',
										name: 'ujic_hou',
										tooltip: 'Select hour',
										id: 'ujic_hou',
										values: ujic_hou,
									},
									{
										type: 'label',
										id: 'ujic_time_space',
										text: ' : ',
									},
									{
										type: 'listbox',
										name: 'ujic_min',
										tooltip: 'Select minute',
										id: 'ujic_min',
										values: ujic_min,
									},
								],
							},
							{
								type: 'container',
								id: 'ujic_inp_time',
								label: 'Repeat Every:',
								items: [
									{
										type: 'textbox',
										name: 'ujic_thou',
										tooltip: 'Select hours',
										id: 'ujic_thou',
										classes: 'ujic_time_inp',
									},
									{
										type: 'label',
										id: 'ujic_time_space',
										text: ' : ',
									},
									{
										type: 'textbox',
										name: 'ujic_tmin',
										tooltip: 'Select minutes',
										id: 'ujic_tmin',
										classes: 'ujic_time_inp',
									},
									{
										type: 'label',
										id: 'ujic_time_space',
										text: ' : ',
									},
									{
										type: 'textbox',
										name: 'ujic_tsec',
										tooltip: 'Select seconds',
										id: 'ujic_tsec',
										classes: 'ujic_time_inp',
									},
								],
							},
							{
								type: 'container',
								html: '<div class="uji_spacer"></div>',
								id: 'ujic_space_mv',
							},
							{
								type: 'container',
								label: 'After expiration:',
								items: [
									{
										type: 'checkbox',
										name: 'ujic_hide',
										checked: true,
										id: 'ujic_hide',
									},
									{
										type: 'label',
										id: 'ujic_hide_txt',
										text: ' Hide countdown',
									},
								],
							},
							{
								type: 'textbox',
								name: 'ujic_url',
								id: 'ujic_url',
								label: 'Or go to URL',
								text: 'http://',
								tooltip: 'Redirect page to above link',
							},
							{
								type: 'container',
								html: '<div class="uji_spacer"></div>',
							},
							{
								type: 'container',
								label: 'Recurring Time:',
								items: [
									{
										type: 'label',
										id: 'ujic_rev_txt',
										text: 'Every:',
									},
									{
										type: 'textbox',
										name: 'ujic_rev',
										id: 'ujic_rev',
										tooltip: 'Number of Unit',
									},
									{
										type: 'listbox',
										name: 'ujic_revlab',
										tooltip: 'Select unit of time',
										id: 'ujic_revlab',
										values: ujic_reclab,
									},
								],
							},
							{
								type: 'container',
								label: ' ',
								items: [
									{
										type: 'label',
										id: 'ujic_rep_txt',
										text: 'Repeats:',
									},
									{
										type: 'textbox',
										name: 'ujic_rep',
										id: 'ujic_rep',
										tooltip:
											'Unit of time and number of repeats',
									},
									{
										type: 'label',
										id: 'ujic_rep_des',
										text: 'leave it empty for unlimited',
									},
								],
							},
							{
								type: 'container',
								html: '<div class="uji_spacer"></div>',
							},

							ujic_extends,
						],
						onsubmit: function (e) {
							//One Time Timer
							if (e.data.ujic_type_one === true) {
								var window_id = this._id;
								if (e.data.ujic_date === '') {
									var inputs = jQuery(
										'#' + window_id + '-body'
									).find('.mce-formitem input');
									editor.windowManager.alert(
										'Please fill Expire Date field.'
									);
									jQuery(inputs.get(0)).css(
										'border-color',
										'red'
									);
									return false;
								}

								var theTimer =
									'" expire="' +
									e.data.ujic_date +
									' ' +
									e.data.ujic_hou +
									':' +
									e.data.ujic_min;
							}
							//Repeat Timer
							if (e.data.ujic_type_rep === true) {
								var window_id = this._id;

								if (
									e.data.ujic_thou === '' ||
									!jQuery.isNumeric(e.data.ujic_thou)
								) {
									var inputs = jQuery(
										'#' + window_id + '-body'
									).find('#ujic_thou');
									editor.windowManager.alert(
										'Please fill Hours field.'
									);
									jQuery(inputs.get(0)).css(
										'border-color',
										'red'
									);
									return false;
								}
								if (
									e.data.ujic_tmin === '' ||
									!jQuery.isNumeric(e.data.ujic_tmin)
								) {
									var inputs = jQuery(
										'#' + window_id + '-body'
									).find('#ujic_tmin');
									editor.windowManager.alert(
										'Please fill Minutes field.'
									);
									jQuery(inputs.get(0)).css(
										'border-color',
										'red'
									);
									return false;
								}
								if (
									e.data.ujic_tsec === '' ||
									!jQuery.isNumeric(e.data.ujic_tsec)
								) {
									var inputs = jQuery(
										'#' + window_id + '-body'
									).find('#ujic_tsec');
									editor.windowManager.alert(
										'Please fill Seconds field.'
									);
									jQuery(inputs.get(0)).css(
										'border-color',
										'red'
									);
									return false;
								}

								var theTimer =
									'" timer="' +
									e.data.ujic_thou +
									':' +
									e.data.ujic_tmin +
									':' +
									e.data.ujic_tsec;
							}
							//console.log(e);
							editor.insertContent(
								'[ujicountdown id="' +
									e.data.ujic_style +
									theTimer +
									'" hide="' +
									e.data.ujic_hide +
									'" url="' +
									e.data.ujic_url +
									'" subscr="' +
									e.data.ujic_camp +
									'" recurring="' +
									e.data.ujic_rev +
									'" rectype="' +
									e.data.ujic_revlab +
									'" repeats="' +
									e.data.ujic_rep +
									'"]'
							);
						},
					});
				}
				//Button name change
				if (typeof ujic_styles != 'undefined' && !ujic_styles) {
					jQuery('#uji-contdown-pop .mce-foot')
						.find('button')
						.first()
						.parent()
						.hide();
					jQuery('#uji-contdown-pop .mce-foot')
						.find('button')
						.last()
						.html('Got It!');
				} else {
					jQuery('#uji-contdown-pop .mce-foot')
						.find('button')
						.first()
						.html('Insert');
				}

				//Datapicker Unfocus
				jQuery('#uji-contdown-pop').on('click', function () {
					jQuery('#ujic-datapick').blur();
				});
				//Datapicker Initiate
				jQuery('#ujic-datapick').datepicker({
					dateFormat: 'yy/mm/dd',
				});
				//URL http:// placeholder
				jQuery('#uji-contdown-pop #ujic_url').attr(
					'placeholder',
					'http://'
				);

				//Check based on URL. Hide if empty
				jQuery('#ujic_url').focusin(function () {
					jQuery('#ujic_hide').attr('aria-checked', false);
					jQuery('#ujic_hide').removeClass('mce-checked');
				});
				jQuery('#ujic_url').focusout(function () {
					if (jQuery(this).val() === '') {
						//console.log(jQuery(this).val());
						jQuery('#ujic_hide').attr('aria-checked', true);
						jQuery('#ujic_hide').addClass('mce-checked');
					}
				});
				//Type
				var input_type_timer = jQuery('#ujic_inp_time')
					.parent()
					.parent('.mce-container');

				var size_sp_mv = cntType !== 'pro' ? '280' : '210';
				var size_timer = cntType !== 'pro' ? '190' : '120';

				jQuery('#ujic_space_mv').css('top', size_sp_mv + 'px');
				input_type_timer.css('top', size_timer + 'px');
				input_type_timer.hide();

				jQuery('#uji-contdown-pop #ujic_thou').attr(
					'placeholder',
					'Hours'
				);
				jQuery('#uji-contdown-pop #ujic_tmin').attr(
					'placeholder',
					'Minutes'
				);
				jQuery('#uji-contdown-pop #ujic_tsec').attr(
					'placeholder',
					'Seconds'
				);

				jQuery('#ujic_type_rep').attr('aria-checked', false);

				var input_type_one = jQuery('#ujic-datapick-l')
					.parent()
					.parent('.mce-container');
				var input_type_time = jQuery('#ujic_sel_time-l')
					.parent()
					.parent('.mce-container');

				jQuery('#ujic_type_rep').on('click', function () {
					//console.log(jQuery(this).attr('aria-checked'));
					if (jQuery(this).attr('aria-checked') === 'false') {
						input_type_one.hide();
						input_type_time.hide();
						input_type_timer.show();
						win.find('#ujic_type_one').checked(false);
					}
				});
				jQuery('#ujic_type_one').on('click', function () {
					if (jQuery(this).attr('aria-checked') === 'false') {
						input_type_one.show();
						input_type_time.show();
						input_type_timer.hide();
						win.find('#ujic_type_rep').checked(false);
					}
				});
			},
		});
	});
})();
