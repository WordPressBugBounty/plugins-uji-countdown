/**
 * WordPress dependencies
 */

import icons from './icons';
import InspectorControls from './inspector';

import { __ } from '@wordpress/i18n';

// import { DateTimePicker } from '@wordpress/components';
// import { __experimentalGetSettings } from '@wordpress/date';
// import { withState } from '@wordpress/compose';

import { Component, Fragment } from '@wordpress/element';

class UjiCountEdit extends Component {
	render() {
		const { attributes } = this.props;

		const { countStyles, datetime, timerType, thour, tmin, tsec, url, hide, blank } =
			attributes;

		const isStyles = typeof ujic_short_vars !== 'undefined' ? true : null;

		const convertDigit = (num) => {
			return num.length == 1 ? '0' + num : num;
		};

		if (isStyles) {
			return (
				<Fragment>
					<InspectorControls {...this.props} />
					{timerType === 'onetime' && (
						<div className="wp-block-urc-block">
                                                        <span class="dashicon dashicons dashicons-clock"></span>
							{__('Expire on:', 'ujicountdown')}{' '}
							<strong>
								{' '}
								<time>{datetime}</time>{' '}
							</strong>
                                                        { countStyles && (
								<div className="wp-ujiblock-ml wp-block-span">
									{__('Style:', 'ujicountdown')}{' '}
									<strong> {countStyles} </strong>
								</div>
							)}
                                                        { !countStyles && (
								<div className="wp-ujiblock-ml wp-block-span">
									<span class="wp-ujiblock-red"> Please select a style for your timer </span>
								</div>
							)}
							{!hide && (
								<div className="wp-ujiblock-ml wp-block-span">
									{__('Redirect to:', 'ujicountdown')}{' '}
									<strong> {url} </strong>
								</div>
							)}
						</div>
					)}
					{timerType === 'repeat' && (
						<div className="wp-block-urc-block">
                                                        <span class="dashicon dashicons dashicons-clock"></span>
							{__('Countdown time:', 'ujicountdown')}{' '}
							<strong>
								{' '}
								<time>
									{convertDigit(thour)} : {convertDigit(tmin)}{' '}
									: {convertDigit(tsec)}{' '}
								</time>{' '}
							</strong>
                                                        { countStyles && (
								<div className="wp-ujiblock-ml wp-block-span">
									{__('Style:', 'ujicountdown')}{' '}
									<strong> {countStyles} </strong>
								</div>
							)}
                                                        { !countStyles && (
								<div className="wp-ujiblock-ml wp-block-span">
									<span class="wp-ujiblock-red"> Please select a style for your timer </span>
								</div>
							)}
							{!hide && (
								<div className="wp-ujiblock-ml wp-block-span">
									{__('Redirect to:', 'ujicountdown')}{' '}
									<strong> {url} </strong>
								</div>
							)}
						</div>
					)}
				</Fragment>
			);
		}
		return (
			<Fragment>
				<InspectorControls {...this.props} />
				<div className="wp-block-urc-block">
					<h5 style={{ color: 'red', textAlign: 'center' }}>
						{__(
							'Please create a countdown style first.',
							'ujicountdown'
						)}
					</h5>
				</div>
			</Fragment>
		);
	}
}

export default UjiCountEdit;