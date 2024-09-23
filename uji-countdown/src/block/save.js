/**
 * WordPress dependencies
 */

import { RawHTML } from '@wordpress/element';

const save = ({ attributes }) => {
	const {
		countStyles,
		timerType,
		datetime,
		thour,
		tmin,
		tsec,
		hide,
		url,
		unitNum,
		unitTime,
		repeats,
		news,
	} = attributes;

	const isHide = hide ? 'true' : 'false';

	const tim = timerType === 'repeat' && thour && tmin && tsec ? true : false;
	const exp = datetime ? datetime.replace(/\//g, '-') : '';
	const expTime =
		timerType === 'onetime' && exp && !tim ? 'expire="' + exp + '"' : '';
	const timerTime = tim
		? 'timer="' + thour + ':' + tmin + ':' + tsec + '"'
		: '';
	const isNews = news ? ' subscr="' + news : ' subscr="undefined"';

	const rectype = unitNum && repeats ? unitTime : '';

	// [ujicountdown id="test" expire="2020/04/30 06:04" hide="true" url="" subscr="undefined" recurring="" rectype="second" repeats=""]
	const myShortcode =
		'[ujicountdown id="' +
		countStyles +
		'" ' +
		expTime +
		' ' +
		timerTime +
		' hide="' +
		isHide +
		'" url="' +
		url +
		'"' +
		isNews +
		'" recurring="' +
		repeats +
		'" rectype="' +
		rectype +
		'" repeats="' +
		repeats +
		'"]';

	return <RawHTML>{myShortcode}</RawHTML>;
};

export default save;
