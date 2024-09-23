/*global ujicountdownData*/

import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	DateTimePicker,
	TextControl,
	RadioControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

const optionsStyles = (styles) => {
	const stypeOpt = [{ value: '', label: 'Select Timer Style' }];

	if (styles !== null) {
		styles.map((val) => {
			stypeOpt.push({ value: val.value, label: val.text });
		});
		return stypeOpt;
	} else {
		return null;
	}
};

const Inspector = (props) => {
	const { attributes, setAttributes } = props;

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

	const onUpdateDate = (dateTime) => {
		let newDateTime = moment(dateTime).format('YYYY-MM-DD HH:mm');
		setAttributes({ datetime: newDateTime });
	};

	const optionsTime = [
		{ value: 'second', label: __('Second(s)', 'ujicountdown') },
		{ value: 'minute', label: __('Minute(s)', 'ujicountdown') },
		{ value: 'hour', label: __('Hour(s)', 'ujicountdown') },
		{ value: 'day', label: __('Day(s)', 'ujicountdown') },
		{ value: 'week', label: __('Week(s)', 'ujicountdown') },
		{ value: 'month', label: __('Month(s)', 'ujicountdown') },
	];

	const optionStyles =
		typeof ujic_short_vars !== 'undefined'
			? optionsStyles(ujic_short_vars.ujic_style)
			: null;
	const isNews = typeof ujic_extend !== 'undefined' ? true : false;

	if (!optionStyles) {
		return (
			<InspectorControls>
				<PanelBody
					title={__('Countdown Settings', 'ujicountdown')}
					initialOpen={true}
					className={'urc-settings-insp'}
				>
					<div className="urc-border">
						<div className="urc-component">
							<div>
								<strong style={{ color: 'red' }}>
									Please create a countdown style first.
								</strong>
								<p>
									{' '}
									Go to:{' '}
									<strong>Settings/Uji Countdown</strong> and
									create a style first!{' '}
								</p>
							</div>
						</div>
					</div>
				</PanelBody>
			</InspectorControls>
		);
	} else {
		return (
			<InspectorControls>
				<PanelBody
					title={__('Countdown Settings', 'ujicountdown')}
					initialOpen={true}
					className={'urc-settings-insp'}
				>
					<div className="urc-border">
						<h4>Select Style: </h4>
						<div className="urc-component">
							<SelectControl
								value={countStyles}
								options={optionStyles}
								onChange={(value) =>
									setAttributes({ countStyles: value })
								}
								className="components-style-field-select"
							/>
						</div>
					</div>

					<div className="urc-border">
						<h4>Timer Type: </h4>
						<div className="urc-component">
							<RadioControl
								selected={timerType}
								options={[
									{
										label: __(
											'One Time Timer',
											'ujicountdown'
										),
										value: 'onetime',
									},
									{
										label: __(
											'Repeating Timer',
											'ujicountdown'
										),
										value: 'repeat',
									},
								]}
								onChange={(value) =>
									setAttributes({ timerType: value })
								}
							/>
						</div>
					</div>
					{timerType === 'onetime' && (
						<div className="urc-border">
							<h4>Expiration Date and Time: </h4>
							<div className="urc-component">
								<Fragment>
									<PanelRow>
										<DateTimePicker
											currentDate={datetime}
											onChange={(val) =>
												onUpdateDate(val)
											}
											is12Hour={false}
										/>
									</PanelRow>
								</Fragment>
							</div>
						</div>
					)}
					{timerType === 'repeat' && (
						<Fragment>
							<div className="urc-component-time">
								<h4>Select Time:</h4>
								<div className="urc-component">
									<TextControl
										type="number"
										label="Hours"
										className="components-time-field-hours-input"
										value={thour}
										onChange={(value) =>
											setAttributes({
												thour: escape(value),
											})
										}
									/>
									<span className="urc-time-separator">
										:
									</span>
									<TextControl
										type="number"
										label="Minutes"
										className="components-time-field-hours-input"
										value={tmin}
										onChange={(value) =>
											setAttributes({
												tmin: escape(value),
											})
										}
									/>
									<span className="urc-time-separator">
										:
									</span>
									<TextControl
										type="number"
										label="Seconds"
										className="components-time-field-hours-input"
										value={tsec}
										onChange={(value) =>
											setAttributes({
												tsec: escape(value),
											})
										}
									/>
								</div>
								<i>This countdown will restart on page load</i>
							</div>
						</Fragment>
					)}
					<Fragment>
						<div className="urc-border">
							<h4>After expiration: </h4>
							<div className="urc-component">
								<ToggleControl
									label={__('Hide Timer', 'ujicountdown')}
									checked={hide}
									help={
										hide
											? __(
													'Hide countdown timer.',
													'ujicountdown'
											  )
											: __('Go to URL.', 'ujicountdown')
									}
									onChange={() =>
										setAttributes({ hide: !hide })
									}
								/>
								{!hide && (
									<TextControl
										type="text"
										label="Enter web address:"
										placeholder="https://"
										value={url}
										onChange={(value) =>
											setAttributes({ url: value })
										}
									/>
								)}
							</div>
						</div>
					</Fragment>
					<Fragment>
						<div className="urc-border">
							<h4>Recurring Time: </h4>
							<div className="urc-component urc-flex">
								<span className="spaceInp">Every </span>
								<TextControl
									type="number"
									className="components-time-field-hours-input"
									value={unitNum}
									onChange={(value) =>
										setAttributes({
											unitNum: escape(value),
										})
									}
								/>
								<SelectControl
									value={unitTime}
									options={optionsTime}
									onChange={(value) =>
										setAttributes({ unitTime: value })
									}
									className="components-time-field-hours-select"
								/>
							</div>
							<div className="urc-component">
								<span className="spaceInp">Repeats </span>
								<TextControl
									type="number"
									className="components-repeat-field-input"
									value={repeats}
									onChange={(value) =>
										setAttributes({
											repeats: escape(value),
										})
									}
								/>
								<i>leave it empty for unlimited</i>
							</div>
						</div>
					</Fragment>
					{isNews && (
						<Fragment>
							<div className="urc-border">
								<h4>Newsletter Form: </h4>
								<div className="urc-component">
									<TextControl
										type="text"
										value={news}
										placeholder="Enter your campaign name"
										onChange={(value) =>
											setAttributes({
												news: escape(value),
											})
										}
									/>
								</div>
							</div>
						</Fragment>
					)}
				</PanelBody>
			</InspectorControls>
		);
	}
};

export default Inspector;
