/*!
 * Notyf v3.0.0 
 * 
 */
var Notyf=function(){"use strict";var e,o=function(){return(o=Object.assign||function(t){for(var i,e=1,n=arguments.length;e<n;e++)for(var o in i=arguments[e])Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o]);return t}).apply(this,arguments)},n=(t.prototype.on=function(t,i){var e=this.listeners[t]||[];this.listeners[t]=e.concat([i])},t.prototype.triggerEvent=function(t,i){var e=this;(this.listeners[t]||[]).forEach(function(t){return t({target:e,event:i})})},t);function t(t){this.options=t,this.listeners={}}(i=e=e||{})[i.Add=0]="Add",i[i.Remove=1]="Remove";var f,i,s=(a.prototype.push=function(t){this.notifications.push(t),this.updateFn(t,e.Add,this.notifications)},a.prototype.splice=function(t,i){i=this.notifications.splice(t,i)[0];return this.updateFn(i,e.Remove,this.notifications),i},a.prototype.indexOf=function(t){return this.notifications.indexOf(t)},a.prototype.onUpdate=function(t){this.updateFn=t},a);function a(){this.notifications=[]}(i=f=f||{}).Dismiss="dismiss";var r={types:[{type:"success",className:"notyf__toast--success",backgroundColor:"#3dc763",icon:{className:"notyf__icon--success",tagName:"i"}},{type:"error",className:"notyf__toast--error",backgroundColor:"#ed3d3d",icon:{className:"notyf__icon--error",tagName:"i"}}],duration:2e3,ripple:!0,position:{x:"right",y:"bottom"},dismissible:!(i.Click="click")},c=(p.prototype.on=function(t,i){var e;this.events=o(o({},this.events),((e={})[t]=i,e))},p.prototype.update=function(t,i){i===e.Add?this.addNotification(t):i===e.Remove&&this.removeNotification(t)},p.prototype.removeNotification=function(t){var i,e,n=this,t=this._popRenderedNotification(t);t&&((e=t.node).classList.add("notyf__toast--disappear"),e.addEventListener(this.animationEndEventName,i=function(t){t.target===e&&(e.removeEventListener(n.animationEndEventName,i),n.container.removeChild(e))}))},p.prototype.addNotification=function(t){var i=this._renderNotification(t);this.notifications.push({notification:t,node:i}),this._announce(t.options.message||"Notification")},p.prototype._renderNotification=function(t){var i=this._buildNotificationCard(t),e=t.options.className;return e&&(t=i.classList).add.apply(t,e.split(" ")),this.container.appendChild(i),i},p.prototype._popRenderedNotification=function(t){for(var i=-1,e=0;e<this.notifications.length&&i<0;e++)this.notifications[e].notification===t&&(i=e);if(-1!==i)return this.notifications.splice(i,1)[0]},p.prototype.getXPosition=function(t){return(null===(t=null==t?void 0:t.position)||void 0===t?void 0:t.x)||"right"},p.prototype.getYPosition=function(t){return(null===(t=null==t?void 0:t.position)||void 0===t?void 0:t.y)||"bottom"},p.prototype.adjustContainerAlignment=function(t){var i=this.X_POSITION_FLEX_MAP[this.getXPosition(t)],e=this.Y_POSITION_FLEX_MAP[this.getYPosition(t)],t=this.container.style;t.setProperty("justify-content",e),t.setProperty("align-items",i)},p.prototype._buildNotificationCard=function(n){var o=this,t=n.options,i=t.icon;this.adjustContainerAlignment(t);var e=this._createHTMLElement({tagName:"div",className:"notyf__toast"}),s=this._createHTMLElement({tagName:"div",className:"notyf__ripple"}),a=this._createHTMLElement({tagName:"div",className:"notyf__wrapper"}),r=this._createHTMLElement({tagName:"div",className:"notyf__message"});r.innerHTML=t.message||"";var c,p,d,l,u=t.background||t.backgroundColor;i&&(c=this._createHTMLElement({tagName:"div",className:"notyf__icon"}),("string"==typeof i||i instanceof String)&&(c.innerHTML=new String(i).valueOf()),"object"==typeof i&&(p=i.tagName,d=i.className,l=i.text,i=void 0===(i=i.color)?u:i,l=this._createHTMLElement({tagName:void 0===p?"i":p,className:d,text:l}),i&&(l.style.color=i),c.appendChild(l)),a.appendChild(c)),a.appendChild(r),e.appendChild(a),u&&(t.ripple?(s.style.background=u,e.appendChild(s)):e.style.background=u),t.dismissible&&(s=this._createHTMLElement({tagName:"div",className:"notyf__dismiss"}),u=this._createHTMLElement({tagName:"button",className:"notyf__dismiss-btn"}),s.appendChild(u),a.appendChild(s),e.classList.add("notyf__toast--dismissible"),u.addEventListener("click",function(t){var i,e;null!==(e=(i=o.events)[f.Dismiss])&&void 0!==e&&e.call(i,{target:n,event:t}),t.stopPropagation()})),e.addEventListener("click",function(t){var i,e;return null===(e=(i=o.events)[f.Click])||void 0===e?void 0:e.call(i,{target:n,event:t})});t="top"===this.getYPosition(t)?"upper":"lower";return e.classList.add("notyf__toast--"+t),e},p.prototype._createHTMLElement=function(t){var i=t.tagName,e=t.className,t=t.text,i=document.createElement(i);return e&&(i.className=e),i.textContent=t||null,i},p.prototype._createA11yContainer=function(){var t=this._createHTMLElement({tagName:"div",className:"notyf-announcer"});t.setAttribute("aria-atomic","true"),t.setAttribute("aria-live","polite"),t.style.border="0",t.style.clip="rect(0 0 0 0)",t.style.height="1px",t.style.margin="-1px",t.style.overflow="hidden",t.style.padding="0",t.style.position="absolute",t.style.width="1px",t.style.outline="0",document.body.appendChild(t),this.a11yContainer=t},p.prototype._announce=function(t){var i=this;this.a11yContainer.textContent="",setTimeout(function(){i.a11yContainer.textContent=t},100)},p.prototype._getAnimationEndEventName=function(){var t,i=document.createElement("_fake"),e={MozTransition:"animationend",OTransition:"oAnimationEnd",WebkitTransition:"webkitAnimationEnd",transition:"animationend"};for(t in e)if(void 0!==i.style[t])return e[t];return"animationend"},p);function p(){this.notifications=[],this.events={},this.X_POSITION_FLEX_MAP={left:"flex-start",center:"center",right:"flex-end"},this.Y_POSITION_FLEX_MAP={top:"flex-start",center:"center",bottom:"flex-end"};var t=document.createDocumentFragment(),i=this._createHTMLElement({tagName:"div",className:"notyf"});t.appendChild(i),document.body.appendChild(t),this.container=i,this.animationEndEventName=this._getAnimationEndEventName(),this._createA11yContainer()}function d(t){var e=this;this.dismiss=this._removeNotification,this.notifications=new s,this.view=new c;var i=this.registerTypes(t);this.options=o(o({},r),t),this.options.types=i,this.notifications.onUpdate(function(t,i){return e.view.update(t,i)}),this.view.on(f.Dismiss,function(t){var i=t.target,t=t.event;e._removeNotification(i),i.triggerEvent(f.Dismiss,t)}),this.view.on(f.Click,function(t){var i=t.target,t=t.event;return i.triggerEvent(f.Click,t)})}return d.prototype.error=function(t){t=this.normalizeOptions("error",t);return this.open(t)},d.prototype.success=function(t){t=this.normalizeOptions("success",t);return this.open(t)},d.prototype.open=function(i){var t=this.options.types.find(function(t){return t.type===i.type})||{},t=o(o({},t),i);this.assignProps(["ripple","position","dismissible"],t);t=new n(t);return this._pushNotification(t),t},d.prototype.dismissAll=function(){for(;this.notifications.splice(0,1););},d.prototype.assignProps=function(t,i){var e=this;t.forEach(function(t){i[t]=(null==i[t]?e.options:i)[t]})},d.prototype._pushNotification=function(t){var i=this;this.notifications.push(t);var e=(void 0!==t.options.duration?t:this).options.duration;e&&setTimeout(function(){return i._removeNotification(t)},e)},d.prototype._removeNotification=function(t){t=this.notifications.indexOf(t);-1!==t&&this.notifications.splice(t,1)},d.prototype.normalizeOptions=function(t,i){t={type:t};return"string"==typeof i?t.message=i:"object"==typeof i&&(t=o(o({},t),i)),t},d.prototype.registerTypes=function(t){var i=(t&&t.types||[]).slice();return r.types.map(function(e){var n=-1;i.forEach(function(t,i){t.type===e.type&&(n=i)});var t=-1!==n?i.splice(n,1)[0]:{};return o(o({},e),t)}).concat(i)},d}();

jQuery.noConflict();

var slider_uji = [];

/** Fire up jQuery - let's dance!
 */
jQuery(document).ready(function ($) {
	var fname = jQuery('#ujic-style').val() + 'Select';

	/* jQuery UI Slider */
	jQuery('.ujic_sliderui').each(function () {
		var obj = jQuery(this);
		var sId = '#' + obj.data('id');
		var val = parseInt(obj.data('val'));
		var min = parseInt(obj.data('min'));
		var max = parseInt(obj.data('max'));
		var step = parseInt(obj.data('step'));

		//slider init
		obj.slider({
			value: val,
			min: min,
			max: max,
			step: step,
			range: 'min',
			slide: function (event, ui) {
				jQuery(sId).val(ui.value);
				if ('#ujic_size' == sId) window[fname].the_size(ui.value);
				if ('#ujic_thick' == sId) window[fname].the_thick(ui.value);
				if ('#ujic_lab_sz' == sId) window[fname].the_lab_sz(ui.value);

				//Ad Slider extension
				if (
					typeof slider_uji !== 'undefined' &&
					slider_uji.length > 0
				) {
					//console.log(slider_uji.length);
					for (s = 0; s < slider_uji.length; s++) {
						if (slider_uji[s].id == sId)
							window[slider_uji[s].callback](ui.value, fname);
					}
				}
			},
		});
	});

	/* jQuery Color Picker */
	jQuery('.ujic_colorpick').wpColorPicker({
		change: function (event, ui) {
			window[fname].new_colors($(this).attr('id'), $(this).val());
		},
	});

	/* JQuery Checkbox/Radio */
	jQuery('input').iCheck({
		checkboxClass: 'icheckbox_flat-pink',
		radioClass: 'iradio_flat-pink',
	});

	jQuery('.ujic-preview').draggable();
	jQuery('.ujic-preview').find('.handlediv').hide();
	jQuery('.ujic-preview')
		.find('.postbox')
		.click(function () {
			$(this).removeClass('closed');
		});

	if (jQuery('#ujic_name').length  ) {
		/* Style Preview */
		window[fname].init();
	}
});

//select styles
function sel_style(s) {
	var lnk;
	if (s == 'classic')
		lnk =
			'options-general.php?page=ujicountdown&tab=tab_ujic_new&style=classic';
	if (s == 'modern')
		lnk =
			'options-general.php?page=ujicountdown&tab=tab_ujic_new&style=modern';
	if (s == 'custom')
		lnk =
			'options-general.php?page=ujicountdown&tab=tab_ujic_new&style=custom';
	window.location.href = '' + lnk + '';
}

//redirect to home admin
function ujic_admin_home() {
	window.location.href = 'options-general.php?page=ujicountdown';
}

/**
 *
 * Preview Clasic Panel Admin
 *
 *
 */

(function ($) {
	classicSelect = {
		/// Init
		init: function () {
			var style = $('#ujic-style');
			if (style.length) {
				this.the_size();
				this.the_lab_sz();
                                this.the_format();
				this.the_colors();
				this.the_labels();
				this.the_fonts();
			}
		},
		/// Size
		the_size: function (val) {
			var size = $('#ujic_size');
			if (size.length) {
				var newsize =
					val && val != 'undefined' && val.length ? val : size.val();
			}
			$('#ujiCountdown')
				.find('.countdown_amount')
				.css('font-size', newsize + 'px');
		},
		/// Label Size
		the_lab_sz: function (val) {
			var size = $('#ujic_lab_sz');
			if (size.length) {
				$('.countdown_txt').css(
					'font-size',
					(val && val != 'undefined' && val.length
						? val
						: size.val()) + 'px'
				);
			}
		},
		/// Format
		the_format: function () {
			var format = new Array(
				'ujic_d',
				'ujic_h',
				'ujic_m',
				'ujic_s',
				'ujic_y',
				'ujic_o',
				'ujic_w'
			);
			for (var i = 0; i < format.length; i++) {
                                // Init
                                if ( $('#' + format[i]).is(':checked') ){
                                    var id = format[i];
                                        $('#ujiCountdown')
						.find('.' + id)
						.show();
                                } 
                                if ( $('#' + format[i]).is(':not(:checked)') ){
                                     var id = format[i];
					$('#ujiCountdown')
						.find('.' + id)
						.hide();
                                } 
                                
                                // Live    
                                $('#' + format[i]).on('ifChecked', function(){
                                    var id = $(this).attr('id');
                                        $('#ujiCountdown')
						.find('.' + id)
						.show();
                                });
				$('#' + format[i]).on('ifUnchecked', function(){ 
                                    var id = $(this).attr('id');
					$('#ujiCountdown')
						.find('.' + id)
						.hide();
				});
			}
		},
		//color light
		shadeColor: function (color, percent) {
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
		},
		/// Colors
		the_colors: function (id, hex) {
			var col_txt = $('#ujic_col_txt').val();
			var col_sw = $('#ujic_col_sw').val();
			var col_up = $('#ujic_col_up').val();
			var col_dw = $('#ujic_col_dw').val();
			var col_lab = $('#ujic_col_lab').val();
			var col_sub = $('#ujic_subscrFrmSubmitColor').length
				? $('#ujic_subscrFrmSubmitColor').val()
				: '#000000';

			$('.countdown_amount').css('color', col_txt);
			$('.countdown_amount').css('text-shadow', '1px 1px 1px ' + col_sw);

			$('.ujic-classic')
				.find('.countdown_amount')
				.css(
					'background',
					'-moz-linear-gradient(top,  ' +
						col_up +
						' 50%, ' +
						col_dw +
						' 50%)'
				); /* FF3.6+ */
			$('.ujic-classic')
				.find('.countdown_amount')
				.css(
					'background',
					'-webkit-gradient(linear, left top, left bottom, color-stop(50%,' +
						col_up +
						'), color-stop(50%,' +
						col_dw +
						'))'
				); /* Chrome,Safari4+ */
			$('.ujic-classic')
				.find('.countdown_amount')
				.css(
					'background',
					'-webkit-linear-gradient(top,  ' +
						col_up +
						' 50%,' +
						col_dw +
						' 50%)'
				); /* Chrome10+,Safari5.1+ */
			$('.ujic-classic')
				.find('.countdown_amount')
				.css(
					'background',
					'-o-linear-gradient(top,  ' +
						col_up +
						' 50%,' +
						col_dw +
						' 50%)'
				); /* Opera 11.10+ */
			$('.ujic-classic')
				.find('.countdown_amount')
				.css(
					'background',
					'-ms-linear-gradient(top,  ' +
						col_up +
						' 50%,' +
						col_dw +
						' 50%)'
				); /* IE10+ */
			$('.ujic-classic')
				.find('.countdown_amount')
				.css(
					'background',
					'linear-gradient(to bottom,  ' +
						col_up +
						' 50%,' +
						col_dw +
						' 50%)'
				); /* W3C */
			$('.ujic-classic')
				.find('.countdown_amount')
				.css(
					'filter',
					"progid:DXImageTransform.Microsoft.gradient( startColorstr='" +
						col_up +
						"', endColorstr='" +
						col_dw +
						"',GradientType=0 )"
				); /* IE6-9 */

			$('.countdown_txt').css('color', col_lab);

			$('#ujiCountdown')
				.find('input[type=submit]')
				.css(
					'background',
					'-moz-linear-gradient(top,  ' +
						col_sub +
						' 0%, ' +
						this.shadeColor(col_sub, 20) +
						' 100%)'
				); /* FF3.6+ */
			$('#ujiCountdown')
				.find('input[type=submit]')
				.css(
					'background',
					'-webkit-gradient(linear, left top, left bottom, color-stop(0%,' +
						col_sub +
						'), color-stop(100%,' +
						this.shadeColor(col_sub, 20) +
						'))'
				); /* Chrome,Safari4+ */
			$('#ujiCountdown')
				.find('input[type=submit]')
				.css(
					'background',
					'-webkit-linear-gradient(top,  ' +
						col_sub +
						' 50%,' +
						this.shadeColor(col_sub, 20) +
						' 100%)'
				); /* Chrome10+,Safari5.1+ */
			$('#ujiCountdown')
				.find('input[type=submit]')
				.css(
					'background',
					'-o-linear-gradient(top,  ' +
						col_sub +
						' 0%,' +
						this.shadeColor(col_sub, 20) +
						' 100%)'
				); /* Opera 11.10+ */
			$('#ujiCountdown')
				.find('input[type=submit]')
				.css(
					'background',
					'-ms-linear-gradient(top,  ' +
						col_sub +
						' 0%,' +
						this.shadeColor(col_sub, 20) +
						' 100%)'
				); /* IE10+ */
			$('#ujiCountdown')
				.find('input[type=submit]')
				.css(
					'background',
					'linear-gradient(to bottom,  ' +
						col_sub +
						' 0%,' +
						this.shadeColor(col_sub, 20) +
						' 100%)'
				); /* W3C */
			$('#ujiCountdown')
				.find('input[type=submit]')
				.css(
					'filter',
					"progid:DXImageTransform.Microsoft.gradient( startColorstr='" +
						col_sub +
						"', endColorstr='" +
						this.shadeColor(col_sub, 20) +
						"',GradientType=0 )"
				); /* IE6-9 */
		},
		/// Colors
		new_colors: function (id, hex) {
			var col_up = $('#ujic_col_up').val();
			var col_dw = $('#ujic_col_dw').val();

			switch (id) {
				case 'ujic_col_txt':
					$('.countdown_amount').css('color', hex);
					break;
				case 'ujic_col_sw':
					$('.countdown_amount').css(
						'text-shadow',
						'1px 1px 1px ' + hex
					);
					break;
				case 'ujic_col_up':
					$('.ujic-classic')
						.find('.countdown_amount')
						.css(
							'background',
							'-moz-linear-gradient(top,  ' +
								hex +
								' 50%, ' +
								col_dw +
								' 50%)'
						); /* FF3.6+ */
					$('.ujic-classic')
						.find('.countdown_amount')
						.css(
							'background',
							'-webkit-gradient(linear, left top, left bottom, color-stop(50%,' +
								hex +
								'), color-stop(50%,' +
								col_dw +
								'))'
						); /* Chrome,Safari4+ */
					$('.ujic-classic')
						.find('.countdown_amount')
						.css(
							'background',
							'-webkit-linear-gradient(top,  ' +
								hex +
								' 50%,' +
								col_dw +
								' 50%)'
						); /* Chrome10+,Safari5.1+ */
					$('.ujic-classic')
						.find('.countdown_amount')
						.css(
							'background',
							'-o-linear-gradient(top,  ' +
								hex +
								' 50%,' +
								col_dw +
								' 50%)'
						); /* Opera 11.10+ */
					$('.ujic-classic')
						.find('.countdown_amount')
						.css(
							'background',
							'-ms-linear-gradient(top,  ' +
								hex +
								' 50%,' +
								col_dw +
								' 50%)'
						); /* IE10+ */
					$('.ujic-classic')
						.find('.countdown_amount')
						.css(
							'background',
							'linear-gradient(to bottom,  ' +
								hex +
								' 50%,' +
								col_dw +
								' 50%)'
						); /* W3C */
					$('.ujic-classic')
						.find('.countdown_amount')
						.css(
							'filter',
							"progid:DXImageTransform.Microsoft.gradient( startColorstr='" +
								hex +
								"', endColorstr='" +
								col_dw +
								"',GradientType=0 )"
						); /* IE6-9 */
					break;
				case 'ujic_col_dw':
					$('.ujic-classic')
						.find('.countdown_amount')
						.css(
							'background',
							'-moz-linear-gradient(top,  ' +
								col_up +
								' 50%, ' +
								hex +
								' 50%)'
						); /* FF3.6+ */
					$('.ujic-classic')
						.find('.countdown_amount')
						.css(
							'background',
							'-webkit-gradient(linear, left top, left bottom, color-stop(50%,' +
								col_up +
								'), color-stop(50%,' +
								hex +
								'))'
						); /* Chrome,Safari4+ */
					$('.ujic-classic')
						.find('.countdown_amount')
						.css(
							'background',
							'-webkit-linear-gradient(top,  ' +
								col_up +
								' 50%,' +
								hex +
								' 50%)'
						); /* Chrome10+,Safari5.1+ */
					$('.ujic-classic')
						.find('.countdown_amount')
						.css(
							'background',
							'-o-linear-gradient(top,  ' +
								col_up +
								' 50%,' +
								hex +
								' 50%)'
						); /* Opera 11.10+ */
					$('.ujic-classic')
						.find('.countdown_amount')
						.css(
							'background',
							'-ms-linear-gradient(top,  ' +
								col_up +
								' 50%,' +
								hex +
								' 50%)'
						); /* IE10+ */
					$('.ujic-classic')
						.find('.countdown_amount')
						.css(
							'background',
							'linear-gradient(to bottom,  ' +
								col_up +
								' 50%,' +
								hex +
								' 50%)'
						); /* W3C */
					$('.ujic-classic')
						.find('.countdown_amount')
						.css(
							'filter',
							"progid:DXImageTransform.Microsoft.gradient( startColorstr='" +
								col_up +
								"', endColorstr='" +
								hex +
								"',GradientType=0 )"
						); /* IE6-9 */
					break;
				case 'ujic_col_lab':
					$('.countdown_txt').css('color', hex);
					break;
				case 'ujic_subscrFrmSubmitColor':
					//console.log(this.shadeColor(hex, 70));
					$('#ujiCountdown')
						.find('input[type=submit]')
						.css(
							'background',
							'-moz-linear-gradient(top,  ' +
								hex +
								' 0%, ' +
								this.shadeColor(hex, 20) +
								' 100%)'
						); /* FF3.6+ */
					$('#ujiCountdown')
						.find('input[type=submit]')
						.css(
							'background',
							'-webkit-gradient(linear, left top, left bottom, color-stop(0%,' +
								hex +
								'), color-stop(100%,' +
								this.shadeColor(hex, 20) +
								'))'
						); /* Chrome,Safari4+ */
					$('#ujiCountdown')
						.find('input[type=submit]')
						.css(
							'background',
							'-webkit-linear-gradient(top,  ' +
								hex +
								' 50%,' +
								this.shadeColor(hex, 20) +
								' 100%)'
						); /* Chrome10+,Safari5.1+ */
					$('#ujiCountdown')
						.find('input[type=submit]')
						.css(
							'background',
							'-o-linear-gradient(top,  ' +
								hex +
								' 0%,' +
								this.shadeColor(hex, 20) +
								' 100%)'
						); /* Opera 11.10+ */
					$('#ujiCountdown')
						.find('input[type=submit]')
						.css(
							'background',
							'-ms-linear-gradient(top,  ' +
								hex +
								' 0%,' +
								this.shadeColor(hex, 20) +
								' 100%)'
						); /* IE10+ */
					$('#ujiCountdown')
						.find('input[type=submit]')
						.css(
							'background',
							'linear-gradient(to bottom,  ' +
								hex +
								' 0%,' +
								this.shadeColor(hex, 20) +
								' 100%)'
						); /* W3C */
					$('#ujiCountdown')
						.find('input[type=submit]')
						.css(
							'filter',
							"progid:DXImageTransform.Microsoft.gradient( startColorstr='" +
								hex +
								"', endColorstr='" +
								this.shadeColor(hex, 20) +
								"',GradientType=0 )"
						); /* IE6-9 */
					break;
			}
		},
		/// Text Labels
		the_labels: function () {
			if ($('#ujic_txt').is(':checked')) {
				$('.countdown_txt').show();
			} else {
				$('.countdown_txt').hide();
			}

			//live change
			$('.iCheck-helper').click(function () {
				var id = $(this).parent().find(':checkbox').attr('id');
				if (id == 'ujic_txt' && $(this).parent().hasClass('checked')) {
					$('.countdown_txt').show();
				} else if (id == 'ujic_txt') {
					$('.countdown_txt').hide();
				}
			});
		},
		/// Google Font
		the_fonts: function () {
			var val = $('#ujic_goof').val();
			if (val && val != 'none') {
				var the_font = val.replace(/\s+/g, '+');
				//add reference to google font family
				$('head').append(
					'<link href="https://fonts.googleapis.com/css?family=' +
						the_font +
						'" rel="stylesheet" type="text/css">'
				);
				$('.countdown_amount').css('font-family', val + ', sans-serif');
			}
			//live change
			$('#ujic_goof').bind('change keyup', function () {
				var val = $(this).val();
				var the_font = val.replace(/\s+/g, '+');
				//add reference to google font family
				$('head').append(
					'<link href="https://fonts.googleapis.com/css?family=' +
						the_font +
						'" rel="stylesheet" type="text/css">'
				);
				$('.countdown_amount').css('font-family', val + ', sans-serif');
			});
		},
	};
})(jQuery);
