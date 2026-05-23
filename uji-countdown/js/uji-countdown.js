//=================== FREE =========================
(function ($) {
	'use strict';

	function UjiBindNumberAnimation(ujic_id, enabled) {
		var root = document.getElementById(ujic_id);
		var raf = window.requestAnimationFrame || function (callback) {
			return setTimeout(callback, 16);
		};

		if (!root) {
			return;
		}

		if (root._ujicNumberObserver) {
			root._ujicNumberObserver.disconnect();
			root._ujicNumberObserver = null;
		}

		root.classList.remove('ujic-animate-numbers');
		root._ujicNumberTexts = null;
		root._ujicNumberFrame = null;

		if (!enabled || !window.MutationObserver) {
			return;
		}

		function collect_texts() {
			var texts = [];
			var targets = root.querySelectorAll('.countdown_amount, .circles-text');

			Array.prototype.forEach.call(targets, function (target, index) {
				texts[index] = target.textContent;
			});

			return texts;
		}

		function animate_changes() {
			var previous = root._ujicNumberTexts || [];
			var next = [];
			var targets = root.querySelectorAll('.countdown_amount, .circles-text');

			root._ujicNumberFrame = null;

			Array.prototype.forEach.call(targets, function (target, index) {
				var text = target.textContent;
				var animationTarget =
					target.querySelector('.ujic-number-value') || target;
				next[index] = text;

				if (
					typeof previous[index] !== 'undefined' &&
					previous[index] !== text
				) {
					animationTarget.classList.remove('ujic-number-changing');
					void animationTarget.offsetWidth;
					animationTarget.classList.add('ujic-number-changing');
				}
			});

			root._ujicNumberTexts = next;
		}

		function schedule_animation_check() {
			if (root._ujicNumberFrame) {
				return;
			}

			root._ujicNumberFrame = raf(animate_changes);
		}

		root.classList.add('ujic-animate-numbers');
		root._ujicNumberTexts = collect_texts();
		root._ujicNumberObserver = new MutationObserver(schedule_animation_check);
		root._ujicNumberObserver.observe(root, {
			childList: true,
			characterData: true,
			subtree: true,
		});
	}

	var counter_id = window['ujiCount1'];
	var ujic_id = 'ujiCountdown1';

	var style = counter_id.uji_style;

	var uji_plugin = counter_id.uji_plugin;

	var ujic_id = counter_id.ujic_id;
	var expire = counter_id.expire;
	var timer = counter_id.timer;
	var exp_days = counter_id.exp_days;

	var Years = counter_id.Years;
	var Months = counter_id.Months;
	var Weeks = counter_id.Weeks;
	var Days = counter_id.Days;
	var Hours = counter_id.Hours;
	var Minutes = counter_id.Minutes;
	var Seconds = counter_id.Seconds;

	var Year = counter_id.Year;
	var Month = counter_id.Month;
	var Week = counter_id.Week;
	var Day = counter_id.Day;
	var Hour = counter_id.Hour;
	var Minute = counter_id.Minute;
	var Second = counter_id.Second;

	var ujic_txt_size = counter_id.ujic_txt_size;
	var ujic_col_dw = counter_id.ujic_col_dw;
	var ujic_col_up = counter_id.ujic_col_up;
	var ujic_col_txt = counter_id.ujic_col_txt;
	var ujic_col_sw = counter_id.ujic_col_sw;
	var ujic_col_lab = counter_id.ujic_col_lab;
	var ujic_lab_sz = counter_id.ujic_lab_sz;

	var ujic_y = counter_id.ujic_y;
	var ujic_o = counter_id.ujic_o;
	var ujic_w = counter_id.ujic_w;
	var ujic_d = counter_id.ujic_d;
	var ujic_h = counter_id.ujic_h;
	var ujic_m = counter_id.ujic_m;
	var ujic_s = counter_id.ujic_s;

	var ujic_thick = counter_id.ujic_thick;
	var ujic_txt = counter_id.ujic_txt == 'true' ? true : false;
	var ujic_ani = counter_id.ujic_ani == 'true' ? true : false;
	var ujic_no_box_color = counter_id.ujic_no_box_color == 'true' ? true : false;
	var ujic_no_text_shadow = counter_id.ujic_no_text_shadow == 'true' ? true : false;
	var ujic_url = counter_id.ujic_url
		? counter_id.ujic_url.substr(0, 7) !== 'http://' &&
		  counter_id.ujic_url.substr(0, 8) !== 'https://'
			? 'http://' + counter_id.ujic_url
			: counter_id.ujic_url
		: '';

	var ujic_expire = ujic_url != '' ? true : false;

	var ujic_goof = counter_id.ujic_goof;

	var uji_center = counter_id.uji_center;
	var uji_time = counter_id.uji_time;

	var ujic_hide = counter_id.uji_hide;
	var ujic_resp = counter_id.ujic_resp;
	var ujic_rtl = counter_id.ujic_rtl == 'true' ? true : false;

	var austDay = new Date('' + expire + '');
	var timeExp = UjicResetTime(timer);

	var cformat = '';
	cformat += ujic_y == 'true' ? 'Y' : '';
	cformat += ujic_o == 'true' ? 'O' : '';
	cformat += ujic_w == 'true' ? 'W' : '';
	cformat += ujic_d == 'true' ? 'D' : '';
	cformat += ujic_h == 'true' ? 'H' : '';
	cformat += ujic_m == 'true' ? 'M' : '';
	cformat += ujic_s == 'true' ? 'S' : '';

	$.countdown.regionalOptions['uji'] = {
		labels: [
			'' + Years + '',
			'' + Months + '',
			'' + Weeks + '',
			'' + Days + '',
			'' + Hours + '',
			'' + Minutes + '',
			'' + Seconds + '',
		],
		labels1: [
			'' + Year + '',
			'' + Month + '',
			'' + Week + '',
			'' + Day + '',
			'' + Hour + '',
			'' + Minute + '',
			'' + Second + '',
		],
		compactLabels: ['A', 'L', 'S', 'Z'],
		format: cformat,
		layout: ujiGetTemplate(cformat, style),
		whichLabels: null,
		timeSeparator: ':',
		isRTL: ujic_rtl,
	};
	$.countdown.setDefaults($.countdown.regionalOptions['uji']);

	if (ujic_goof && 'none' !== ujic_goof) {
		var the_font = ujic_goof.replace(/\s+/g, '+');
		//add reference to google font family
		$('head').append(
			'<link href="https://fonts.googleapis.com/css?family=' +
				the_font +
				'" rel="stylesheet" type="text/css">'
		);
	}

	if (typeof timeExp !== 'undefined' && timeExp) {
		var countTime = timeExp;
		serverTime = false;
	} else {
		var countTime = austDay;
	}

	//******************************************* CLASSIC

	if (style == 'classic') {
		$('#' + ujic_id).countdown({
			until: countTime,
			ujic_id: '' + ujic_id + '',
			serverSync: serverTime,
			responsive: ujic_resp,
			isRTL: ujic_rtl,
			alwaysExpire: ujic_expire,
			expiryUrl: ujic_url,
		});

		var ujiCss_row =
			'#' +
			ujic_id +
			' .countdown_row > span:last-child {\
                                                        margin: 0;\
                                              }';

		var ujiCss_box = ujic_no_box_color
			? 'background: transparent!important;\
                                                        filter: none!important;\
                                                        box-shadow: none!important;'
			: 'background : -moz-linear-gradient(top,  ' +
			  ujic_col_up +
			  ' 50%, ' +
			  ujic_col_dw +
			  ' 50%);\
                                                        background : linear-gradient(to bottom,  ' +
			  ujic_col_up +
			  ' 50%, ' +
			  ujic_col_dw +
			  ' 50%);\
                                                        background : -ms-linear-gradient(top,  ' +
			  ujic_col_up +
			  ' 50%, ' +
			  ujic_col_dw +
			  ' 50%);\
                                                        filter:      progid:DXImageTransform.Microsoft.gradient( startColorstr="' +
			  ujic_col_up +
			  '", endColorstr="' +
			  ujic_col_dw +
			  '",GradientType=0 );';

		var ujiCss_shadow = ujic_no_text_shadow
			? 'text-shadow: none;'
			: 'text-shadow: 1px 1px 1px ' + ujic_col_sw + ';';

		var ujiCss_text =
			'#' +
			ujic_id +
			' .countdown_amount {\
                                                        ' +
			ujiCss_box +
			'\
                                                        font:  ' +
			ujic_txt_size +
			'px/1.5 "' +
			ujic_goof +
			'",sans-serif;\
                                                        ' +
			ujiCss_shadow +
			'\
                                                        color: ' +
			ujic_col_txt +
			'; }';

		UjiInjectStyles(ujiCss_text);

		//Fix Width changing (bug google font width some fonts)

		var getW = $('#' + ujic_id + ' .countdown_amount').outerWidth();
		//console.log('1#' + ujic_id, getW);

		$('#' + ujic_id + ' .countdown_amount').each(function () {
			if ($(this).outerWidth() > getW) getW = $(this).outerWidth();
		});

		getW = Math.ceil(getW);

		//console.log('2#' + ujic_id, getW);

		ujiCss_text =
			'#' +
			ujic_id +
			' .countdown_amount {\
                                                    padding: 5px 0;\
                                                    width: ' +
			getW +
			'px;\
                                                   }';

		var ujiCss_label = ujic_txt
			? '#' +
			  ujic_id +
			  ' .countdown_txt {\
                                                        font: ' +
			  ujic_lab_sz +
			  'px "Open Sans", sans-serif;\
                                                        color: ' +
			  ujic_col_lab +
			  ';\
                                                }'
			: '#' +
			  ujic_id +
			  ' .countdown_txt {\
                                                        display: none;\
                                                }';

		UjiInjectStyles(ujiCss_text + ujiCss_label + ujiCss_row);
	} //End Classic

	if (style == 'modern') {
		console.log('MODERN');
		if (typeof ujiModern == 'function') {
			console.log('MODERN-FCT');
			var ujiCircle = ujiModern(
				countTime,
				counter_id,
				serverTime,
				cformat
			);
		}
	}

	UjiBindNumberAnimation(ujic_id, ujic_ani);

	// Get Server Time
	function serverTime() {
		var time = null;

		time = new Date(uji_time);
		var utcTime = new Date(
			time.getUTCFullYear(),
			time.getUTCMonth(),
			time.getUTCDate(),
			time.getUTCHours(),
			time.getUTCMinutes(),
			time.getUTCSeconds()
		);
		time = utcTime;

		return time;
	}
	//Add inline css
	function UjiInjectStyles(rule) {
		var div = $('<div />', {
			html: '<style>' + rule + '</style>',
		}).appendTo('body');
	}

	//Classic Template
	function ujiGetTemplate(format, style) {
		var formatType = format.split('');
		//Check Array
		if (!Object.prototype.toString.call(formatType) === '[object Array]')
			return false;
		//Load custom style
		if (style !== 'classic') {
			//ujiGetTemplate['Modern']();
			var customStyle = 'ujiGetTemplate' + style;
			if (typeof window[customStyle] == 'function') {
				return window[customStyle](formatType);
			} else {
				return false;
			}
		}

		var ujiTemplate =
			'<span class="ujiCountdown"><span class="countdown_row">';

		for (var i = 0; i < formatType.length; i++) {
			if (formatType[i]) {
				var _vt = formatType[i].toString().toLowerCase() + '10';
				var _vt_ = formatType[i].toString().toLowerCase() + '1';
				var _vl = formatType[i].toString().toLowerCase() + 'l';

				ujiTemplate +=
					'<span class="countdown_section">\
                                    <span class="countdown_amount"><span class="ujic-number-value">{' +
					_vt +
					'}</span></span>\
                                    <span class="countdown_amount"><span class="ujic-number-value">{' +
					_vt_ +
					'}</span></span>\
                                    <span class="countdown_txt">{' +
					_vl +
					'}</span>\
                                </span>';
			}
		}

		ujiTemplate += '</span></span>';
		return ujiTemplate;
	}
})(jQuery);

//Reset Timer
function UjicResetTime(time) {
	if (!time) {
		return false;
	}

	var currentdate = new Date();
	var timeArr = time.split(':');

	if (timeArr instanceof Array) {
		currentdate.setHours(currentdate.getHours() + parseInt(timeArr[0]));
		currentdate.setMinutes(currentdate.getMinutes() + parseInt(timeArr[1]));
		currentdate.setSeconds(currentdate.getSeconds() + parseInt(timeArr[2]));
	}

	return currentdate;
}
