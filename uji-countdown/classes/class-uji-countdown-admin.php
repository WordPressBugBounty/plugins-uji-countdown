<?php
/**
 * Uji Countdown Admin
 *
 * Handles all admin
 *
 * @author   WPmanage
 * @category Admin
 * @package  Uji-Countdown/Classes
 * @version  2.0
 */

if ( ! defined( 'ABSPATH' ) ) {
		exit;
}

class Uji_Countdown_Admin {

		/**
		 * Styles
		 *
		 * @since   2.1
		 *
		 * @var     string
		 */
	public function ujic_styles() {
			return apply_filters( 'ujic_styles', array( 'classic' ) );
	}

		/**
		 * Init label vars
		 *
		 * @since     2.0
		 */
	public static function ujic_labels() {
			return array(
				'ujic_years'   => 'Years',
				'ujic_year'    => 'Year',
				'ujic_months'  => 'Months',
				'ujic_month'   => 'Month',
				'ujic_weeks'   => 'Weeks',
				'ujic_week'    => 'Week',
				'ujic_days'    => 'Days',
				'ujic_day'     => 'Day',
				'ujic_hours'   => 'Hours',
				'ujic_hour'    => 'Hour',
				'ujic_minutes' => 'Minutes',
				'ujic_minute'  => 'Minute',
				'ujic_seconds' => 'Seconds',
				'ujic_second'  => 'Second',
			);
	}

		/**
		 * Print template of table counters.
		 *
		 * @since    2.0
		 */
	public function admin_tablelist() {
			$this->cform_delete();

		if ( $this->saved_db_style() ) {

				$table_headers = '
            	<th class="manage-column" scope="col"><span>' . __( 'Created On', 'ujicountdown' ) . '</span></th>
            	<th class="manage-column" scope="col"><span>' . __( 'Name', 'ujicountdown' ) . '</span></th>
          		<th class="manage-column" scope="col"><span>' . __( 'Style', 'ujicountdown' ) . '</span></th>
				<th class="manage-column" scope="col"><span>' . __( 'Change', 'ujicountdown' ) . '</span></th>';

				echo '<div id="ujic_table" class="list">
				<a href="?page=ujicountdown&tab=tab_ujic_new" class="button button-primary" id="ujic_table_new">' . __( 'Create a New Timer Style', 'ujicountdown' ) . '</a>
                                <a href="?page=ujicountdown&tab=tab_ujic_shortcode" class="button button-secondary" id="ujic_table_new">' . __( 'Generate ShortCode', 'ujicountdown' ) . '</a>
	            <table cellspacing="0" class="widefat fixed">
                    <thead>
                        <tr>
							' . wp_kses_post( $table_headers ) . '
						</tr>
                    </thead>
                    <tfoot>
                        <tr>
                            ' . $table_headers . '
                        </tr>
                    </tfoot>

                    <tbody>
						' . $this->ujic_tabs_values() . '
					<tbody>
				</table>
				</div>';

			if ( ! $this->ujic_pro() ) {
				$this->pro_metaboxes();
			}
		} else {
				$introLayout  = '<div id="ujic_new"><h1>Uji Countdown ' . esc_attr( UJIC_VERS ) . '</h1><h4>The most customizable countdown plugin for WordPress</h4>';
				$introLayout .= '<a href="?page=ujicountdown&tab=tab_ujic_new" class="ujic_butnew" id="ujic_table_new">' . __( 'Add New Style', 'ujicountdown' ) . '</a>';
				$introLayout .= '<div class="ujic_new_cnt"><h2>WHAT\'S NEW</h2>';
				$introLayout .= '<ul>
                   <li>
                     <img alt="shortcode generator" src="' . esc_url( UJICOUNTDOWN_URL ) . 'assets/images/icon-sc.png">
                     <h3>Shortcode Generator</h3>
                     <p>Quickly generate shortcode and copy/paste in your page or post.</p>
                     <p>Compatibility with any theme</p>
                  </li>
                  <li>
                     <img alt="wordpress" src="' . esc_url( UJICOUNTDOWN_URL ) . 'assets/images/icon-wp.png">
                     <h3>WordPress Block Editor</h3>
                     <p>Fully supports WordPress Block Editor, while maintaining compatibility through Classic Editor</p>
                  </li>
                   <li>
                     <img alt="recurring time" src="' . esc_url( UJICOUNTDOWN_URL ) . 'assets/images/icon-rec.png">
                     <h3>Recurring Timer</h3>
                     <p>Introducing the recurring time option</p>
                     <p>Reschedule the countdown timer after the event has ended</p>
                  </li>
                  <li>
                     <img alt="email subscription" src="' . esc_url( UJICOUNTDOWN_URL ) . 'assets/images/icon-email.png">
                     <h3>Email Subscription Add-on</h3>
                     <p>Visitors have now the option to subscribe using the email subscription form</p>
                     <p>Create unlimited Campaigns</p>
                  </li>
                  <li>
                     <img alt="responsive" src="' . esc_url( UJICOUNTDOWN_URL ) . 'assets/images/icon-mob.png">
                     <h3>Responsive (Pro Version)</h3>
                     <p>Responsive to all formats. You can use it on your PC, Laptop, Mobile and Tablet</p>
                  </li>
                  <li>
                     <img alt="more customization" src="' . esc_url( UJICOUNTDOWN_URL ) . 'assets/images/icon-custom.png">
                     <h3>More Customization</h3>
                     <p>Option to enable/disable the units of the time</p>
		     <p>Option to change the label color and size</p>	 
                  </li>
                  <li>
                     <img alt="Multilanguage support" src="' . esc_url( UJICOUNTDOWN_URL ) . 'assets/images/icon-glob.png">
                     <h3>Multilanguage Support</h3>
                     <p>This plugins come with translation capability. That means can be translated (aka localized) to other languages </p>
                     <p>Quick translation for the units of time </p>
                  </li>
                  <li>
                     <img alt="google fonts" src="' . esc_url( UJICOUNTDOWN_URL ) . 'assets/images/icon-font.png">
                     <h3>Google Fonts</h3>
                     <p>Now support google fonts inclusion</p>
                  </li>
                  <li>
                     <img alt="rtl support" src="' . esc_url( UJICOUNTDOWN_URL ) . 'assets/images/icon-rtl.png">
                     <h3>Right-To-Left (RTL)</h3>
                     <p>Support "Left to Right" to Arabic "Right to Left" </p>
                  </li>
               </ul>';
				$introLayout .= '</div></div>';

				echo $introLayout;

			if ( ! $this->ujic_pro() ) {
					$this->pro_metaboxes();
			}
		}

			// Left Metaboxes
		if ( isset( $_GET['tab'] ) && $_GET['tab'] == 'tab_ujic_new' ) {
				$this->left_metaboxes();
		}
	}

		/**
		 * Shortcode generator.
		 *
		 * @since    2.1.3
		 */
	public function admin_shortcode() {
			// ID
			$cur_id = ( $this->cform_is_edit() ) ? ujic_clean( wp_unslash( $_GET['edit'] ) ) : '';

			// Get vars
			$vars = $this->ujic_option( $cur_id );

			// Curent style
			$cur_style = ( $this->cform_is_edit() ) ? $vars['ujic_style'] : ( ( isset( $_GET['style'] ) && ! empty( $_GET['style'] ) ) ?  ujic_clean( wp_unslash( $_GET['style'] ) ) : 'classic' );

			$cnt = '<form id="uji-shortcode">';
			// Style
			$cnt .= $this->cform_select( __( 'Select Style:', 'ujicountdown' ), 'ujic_style', ujic_styles_get( 'Select saved style' ), '' );
			// Timer Type:
			$vars['ujic_type'] = array( 'onetime', 'repeat' );
			$cnt              .= $this->cform_radiobox( __( 'Timer Type:', 'ujicountdown' ), 'ujic_type', array( __( 'One Time Timer', 'ujicountdown' ), __( 'Repeating Timer', 'ujicountdown' ) ), $vars['ujic_type'], '' );
			// Expiration Date and Time:
			$cnt .= $this->cform_date( __( 'Expiration Date:', 'ujicountdown' ), 'ujic_exp_date' );
			// Expiration Date and Time select HH:MM
			$hh   = ujic_datetime_get( 23 );
			$mm   = ujic_datetime_get( 59 );
			$cnt .= $this->cform_select_time( __( 'Expiration Time:', 'ujicountdown' ), 'ujic_seltime', $hh, $mm );
			// Repeat Every:
			$cnt .= $this->cform_time( __( 'Repeat Every:', 'ujicountdown' ), 'ujic_time' );
			// After expire Hide
			$cnt .= $this->cform_checkbox( __( 'After expiration:', 'ujicountdown' ), array( 'ujic_exp_hide' ), array( 'Hide countdown' ), array( 'true' ) );
			// Or go to URL
			$cnt .= $this->cform_input( __( 'Or go to the Link:', 'ujicountdown' ), 'ujic_url', '' );
			// Recurring Time:
			$cnt .= $this->cform_reccur( __( 'Recurring Time:', 'ujicountdown' ), ujic_reclab_get(), __( 'leave it empty for unlimited', 'ujicountdown' ) );
			// Subscription
		if ( defined( 'UJICSU_VERS' ) ) {
				$cnt .= $this->cform_input( __( 'Campaign Name:', 'ujicountdown' ), 'ujic_camp', '' );
		}

			$cnt .= '<div>
                        <button class="button button-primary" id="uji-gen-shortcode">
                                Generate Shortcode
                         </button>
                 </div>';

			$cnt .= '</form>';

			echo $this->custom_metabox( __( 'Generate Shortcode', 'ujicountdown' ), $cnt, 'ujic-create' );

			// Left Metaboxes
			// $this->left_metaboxes();
			// Preview Metaboxes
			$this->sc_metaboxes( $cur_style, $vars );
	}

		/**
		 * Print template new/edit countdown.
		 *
		 * @since    2.0
		 */
	public function admin_countdown() {
			// Save/Edit in database
			$this->cform_save_db();

			// ID
			$cur_id = ( $this->cform_is_edit() ) ? ujic_clean( wp_unslash( $_GET['edit'] ) ) : '';

			// Get vars
			$vars = $this->ujic_option( $cur_id );

			// Curent style
			$cur_style = ( $this->cform_is_edit() ) ? $vars['ujic_style'] : ( ( isset( $_GET['style'] ) && ! empty( $_GET['style'] ) ) ? ujic_clean( wp_unslash( $_GET['style'] ) ) : 'classic' );

			// Build Forms
			// $cnt = '<form method="post" action="page=ujicountdown&tab=tab_ujic_new&style=' . $cur_style . '&save=true">';
			$cnt  = $this->cform_ftype( $cur_style, $cur_id );
			$cnt .= $this->cform_style( $cur_style );
			$cnt .= '<input name="ujic_style" id="ujic-style" type="hidden" class="normal-text" value="' . esc_attr( $cur_style ) . '"/>';
			$cnt .= $this->cform_input( __( 'Timer Title:', 'ujicountdown' ), 'ujic_name', $vars['ujic_name'] );
			$cnt .= $this->cform_select( __( 'Google Font:', 'ujicountdown' ), 'ujic_goof', ujic_googlefonts(), $vars['ujic_goof'] );
			$cnt .= $this->cform_radiobox( __( 'Alignment:', 'ujicountdown' ), 'ujic_pos', array( __( 'None', 'ujicountdown' ), __( 'Left', 'ujicountdown' ), __( 'Center', 'ujicountdown' ), __( 'Right', 'ujicountdown' ) ), array( 'none', 'left', 'center', 'right' ), $vars['ujic_pos'] );
			$cnt .= $this->cform_checkbox( __( 'Main format:', 'ujicountdown' ), array( 'ujic_d', 'ujic_h', 'ujic_m', 'ujic_s' ), array( __( 'Days', 'ujicountdown' ), __( 'Hours', 'ujicountdown' ), __( 'Minutes', 'ujicountdown' ), __( 'Seconds', 'ujicountdown' ) ), array( $vars['ujic_d'], $vars['ujic_h'], $vars['ujic_m'], $vars['ujic_s'] ) );
			$cnt .= $this->cform_checkbox( __( 'Secondary format:', 'ujicountdown' ), array( 'ujic_y', 'ujic_o', 'ujic_w' ), array( __( 'Years', 'ujicountdown' ), __( 'Months', 'ujicountdown' ), __( 'Weeks', 'ujicountdown' ) ), array( $vars['ujic_y'], $vars['ujic_o'], $vars['ujic_w'] ) );

			// Filter for new options
		if ( has_filter( 'ujic_admin_add_circform' ) ) {
				$cnt .= apply_filters( 'ujic_admin_add_circform', $cnt, $vars, $cur_style );
		}

			$cnt .= $this->cform_checkbox( __( 'Display time label text:', 'ujicountdown' ), array( 'ujic_txt' ), array( '' ), array( $vars['ujic_txt'] ) );
		if ( $cur_style == 'classic' ) {
				$cnt .= $this->cform_sliderui( __( 'Timer Size:', 'ujicountdown' ), 'ujic_size', $vars['ujic_size'], 10, 80, 1 );
		}
		if ( $cur_style == 'classic' ) {
				$cnt .= $this->cform_color( __( 'Select Box Color:', 'ujicountdown' ), array( 'ujic_col_dw', 'ujic_col_up' ), array( __( 'Bottom', 'ujicountdown' ), __( 'Up', 'ujicountdown' ) ), array( $vars['ujic_col_dw'], $vars['ujic_col_up'] ) );
		}
		if ( $cur_style == 'classic' ) {
				$cnt .= $this->cform_color( __( 'Text Color:', 'ujicountdown' ), array( 'ujic_col_txt', 'ujic_col_sw' ), array( __( 'Number Color', 'ujicountdown' ), __( 'Shadow Color', 'ujicountdown' ) ), array( $vars['ujic_col_txt'], $vars['ujic_col_sw'] ) );
		}

			$cnt .= $this->cform_color( __( 'Label Color:', 'ujicountdown' ), array( 'ujic_col_lab' ), array( __( 'Label Text Color', 'ujicountdown' ) ), array( $vars['ujic_col_lab'] ) );
			$cnt .= $this->cform_sliderui( __( 'Label Size:', 'ujicountdown' ), 'ujic_lab_sz', $vars['ujic_lab_sz'], 8, 25, 1 );

			// Newsletter form
		if ( has_filter( 'ujic_admin_add_form' ) ) {
				$cnt .= apply_filters( 'ujic_admin_add_form', $cnt, $vars );
		}

			$cnt .= wp_nonce_field( 'ujic_secure', 'ujic_secure_form', true, false );

			$cnt .= $this->cform_buttons();

			$cnt .= '</form>';

			// Build Metabox

		if ( $cur_id ) {
				echo $this->custom_metabox( __( 'Edit Timer Style', 'ujicountdown' ), $cnt, 'ujic-create uji-fedit' );
		} else {
				echo $this->custom_metabox( __( 'Create New Timer Style', 'ujicountdown' ), $cnt, 'ujic-create' );
		}

			// Left Metaboxes

			$this->left_metaboxes();

			// Preview Metaboxes
			$this->prev_metaboxes( $cur_style, $vars );
	}

		/**
		 * Print checkbox field.
		 *
		 * @since    2.0
		 */
	public function cform_checkbox( $label, $names, $name_val, $val ) {
			$form  = '<div class="ujic-box">';
			$form .= '<div class="label">' . esc_html( $label ) . '</div>';
			$form .= '<div class="ujic-chkbtn">';
			$i     = 0;
		foreach ( $names as $name ) {
				$form .= '<input id="' . esc_attr( $name ) . '" type="checkbox" value="true"  class="icheckbox_flat-pink" name="' . esc_attr( $name ) . '" ' . checked( $val[ $i ], 'true', false ) . '>';
				$form .= '<label for="' . esc_attr( $name ) . '">' .  wp_kses_post ($name_val[ $i ])  . '</label>';
				$i++;
		}
			$form .= '</div>';
			$form .= '</div>';

			return $form;
	}

		/**
		 * Custom Metabox template.
		 *
		 * @since    2.0
		 */
	public function custom_metabox( $name, $cnt, $class = null, $toggle = false ) {
			$meta = '<div class="metabox-holder' . ( ( isset( $class ) && ! empty( $class ) ) ? ' ' . esc_attr( $class ) : '' ) . '">
                 <div class="postbox">';

			$hndl = '';
		if ( $toggle ) {
				$meta .= '<div class="handlediv" title="Click to toggle"></div>';
				$hndl  = ' class="hndle"';
		}

			$meta .= '<h3' . esc_html( $hndl ) . '><span>' . esc_html( $name ) . '</span></h3>
                    <div class="inside">';
			$meta .= $cnt;
			$meta .= '</div></div></div>';

			return $meta;
	}

		/**
		 * Multi Custom Metabox template.
		 *
		 * @since    2.0
		 */
	private function multi_custom_metabox( $name, $cnt, $class = null, $hndle = false ) {
			$meta      = '<div class="metabox-holder' . ( ( isset( $class ) && ! empty( $class ) ) ? ' ' . esc_attr( $class ) : '' ) . '">';
			$i         = 0;
			$cls_hndle = '';
		foreach ( $cnt as $content ) {
				$meta .= '<div class="postbox">';
			if ( $hndle ) {
				$meta     .= '<div class="handlediv" title="Click to toggle"><br/></div>';
				$cls_hndle = ' class="hndle"';
			}
				$meta .= '<h3' . esc_html( $cls_hndle ) . '><span>' . esc_html( $name[ $i ] ) . '</span></h3>';
				$meta .= '<div class="inside">';
				$meta .= $content;
				$meta .= '</div>';
				$meta .= '</div>';
				$i++;
		}
			$meta .= '</div>';

			return $meta;
	}

		/**
		 * Preview metaboxes.
		 *
		 * @since    2.0
		 */
	private function sc_metaboxes( $style, $countDownOptions ) {
			$sc = '<div class="ujic-shortcode">
                        <div id="ujic-scode">[ujicountdown]</div>
                        <button class="ujibtn-sc-copy button button-secondary" data-clipboard-action="copy" data-clipboard-target="#ujic-scode">
                                Copy Shortcode
                         </button>
                     </div>';

		if ( isset( $sc ) && ! empty( $sc ) ) {
				echo $this->custom_metabox( __( 'Shortcode', 'ujicountdown' ), $sc, 'ujic-create ujic-sc', false );
		}
	}

		/**
		 * Preview metaboxes.
		 *
		 * @since    2.0
		 */
	private function prev_metaboxes( $style, $countDownOptions ) {
			$prw  = '<div class="ujic-' . $style . ' hasCountdown" id="ujiCountdown">';
			$prw .= '<span class="countdown_row ujicf">
                     <span class="countdown_section ujic_y">
                        <span class="countdown_amount">0</span>
                        <span class="countdown_amount">1</span>
                        <span class="countdown_txt">' . __( 'Years', 'ujicountdown' ) . '</span>
                     </span>
                     <span class="countdown_section ujic_o">
                        <span class="countdown_amount">1</span>
                        <span class="countdown_amount">1</span>
                        <span class="countdown_txt">' . __( 'Months', 'ujicountdown' ) . '</span>
                     </span>
                     <span class="countdown_section ujic_w">
                        <span class="countdown_amount">0</span>
                        <span class="countdown_amount">2</span>
                        <span class="countdown_txt">' . __( 'Weeks', 'ujicountdown' ) . '</span>
                     </span>
                     <span class="countdown_section ujic_d">
                        <span class="countdown_amount">2</span>
                        <span class="countdown_amount">9</span>
                        <span class="countdown_txt">' . __( 'Days', 'ujicountdown' ) . '</span>
                     </span>
                     <span class="countdown_section ujic_h">
                        <span class="countdown_amount">0</span>
                        <span class="countdown_amount">9</span>
                        <span class="countdown_txt">' . __( 'Hours', 'ujicountdown' ) . '</span>
                     </span>
                     <span class="countdown_section ujic_m">
                        <span class="countdown_amount">3</span>
                        <span class="countdown_amount">1</span>
                        <span class="countdown_txt">' . __( 'Minutes', 'ujicountdown' ) . '</span>
                     </span>
                     <span class="countdown_section ujic_s">
                        <span class="countdown_amount">5</span>
                        <span class="countdown_amount">3</span>
                        <span class="countdown_txt">' . __( 'Seconds', 'ujicountdown' ) . '</span>
                     </span>
                  </span>';

		if ( has_filter( 'ujic_admin_add_prw' ) ) {
				$prw .= apply_filters( 'ujic_admin_add_prw', $countDownOptions );
		}

			$prw .= '</div>';

		if ( has_filter( 'ujic_admin_add_preview' ) ) {
				$prw = apply_filters( 'ujic_admin_add_preview', $countDownOptions, $prw, $style );
		}
		if ( isset( $prw ) && ! empty( $prw ) ) {
				echo $this->custom_metabox( __( 'Preview Timer Style', 'ujicountdown' ), $prw, 'ujic-preview', true );
		}
	}

		/**
		 * Tutorial metaboxes.
		 *
		 * @since    2.0
		 */
	public function left_metaboxes() {
			$tut_sho = '<div>
                        <h4>From Block Editor (Gutenberg)</h4>
                        <img src="' . esc_url( UJICOUNTDOWN_URL ) . 'assets/images/ujic-ps0.png"></div>
                    <div>
                        <h4>From Classic Editor (Gutenberg)</h4>
                        <img src="' . esc_url( UJICOUNTDOWN_URL ) . 'assets/images/ujic-ps.jpg"></div>';
			$tut_wid = '<img src="' . esc_url( UJICOUNTDOWN_URL ) . 'assets/images/ujic-ps2.jpg">';
			echo $this->multi_custom_metabox( array( __( 'How To Add Countdown Shortcode', 'ujicountdown' ), __( 'Add New Countdown <br>from the Widget Areas', 'ujicountdown' ) ), array( $tut_sho, $tut_wid ), 'ujic-tut' );
	}

		/**
		 * Premium metaboxes.
		 *
		 * @since    2.0
		 */
	public function pro_metaboxes() {
			$pro_sho = '<a href="http://www.wpmanage.com/uji-countdown" target="_blank"><img src="' . esc_url(esc_url( UJICOUNTDOWN_URL )) . 'assets/images/ujic-ps3.png"></a>';
			echo $this->multi_custom_metabox( array( __( 'Uji Countdown Addons', 'ujicountdown' ) ), array( $pro_sho ), 'ujic-tut' );
	}

		/**
		 * Print form style.
		 *
		 * @since    2.0
		 */
	public function cform_style( $val ) {
			$styles = $this->ujic_styles();
			$form   = '<div class="ujic-box">';
		if ( $this->cform_is_edit() ) {
				$form .= '<div class="label">' . __( 'Style Type:', 'ujicountdown' ) . '</div>';
				$form .= '<span id="ujic-style-' . esc_attr( $val ) . '" class="ujic-types ujic-types-sel">' . esc_attr( $val ) . '</span>';
		} else {
				$form .= '<div class="label">' . __( 'Select Style:', 'ujicountdown' ) . '</div>';
			foreach ( $styles as $style ) {
					$sel   = ( $style == ( isset( $_GET['style'] ) && ! empty( $_GET['style'] ) ? ujic_clean( wp_unslash( $_GET['style'] ) ) : 'classic' ) ) ? ' ujic-types-sel' : '';
					$form .= '<a href="#" onclick="sel_style(\'' . esc_attr( $style ) . '\')" id="ujic-style-' . esc_attr( $style ) . '" class="ujic-types' . esc_attr( $sel ) . '">' . esc_attr( $style ) . '</a>';
			}
		}
			$form .= '<input name="ujic_style" id="ujic-style" type="hidden" class="normal-text" value="' . esc_attr( $val ) . '"/>';
			$form .= '</div>';
			return $form;
	}

		/**
		 * Print title.
		 *
		 * @since    2.0
		 */
	public function cform_title( $title ) {
			$form  = '<div class="ujic-box">';
			$form .= '<h3 style="padding-left: 0">' .  esc_html( $title ) . '</h3>';
			$form .= '</div>';
			return $form;
	}

		/**
		 * Print input field.
		 *
		 * @since    2.0
		 */
	public function cform_input( $label, $name, $val, $cls = null ) {
			$form  = '<div class="ujic-box">';
			$form .= '<div class="label">' . esc_html( $label ) . '</div>';

			$form .= '<input type="text" value="' . esc_attr( $val ) . '" name="' . esc_attr( $name ) . '" id="' . esc_attr( $name ) . '" class="' . ( $cls ? esc_attr( $cls ) : 'regular-text' ) . '">';
			$form .= '</div>';
			return $form;
	}

		/**
		 * Print radio field.
		 *
		 * @since    2.0
		 */
	public function cform_radiobox( $label, $name, $name_val, $types, $val ) {
			$form  = '<div class="ujic-box">';
			$form .= '<div class="label">' . esc_html( $label ) . '</div>';
			$form .= '<div class="ujic-radbtn">';
			$i     = 0;
		foreach ( $types as $type ) {
				$form .= '<input id="ujic-' . esc_attr( $type ) . '" type="radio" value="' . esc_attr( $type ) . '" class="iradio_flat-pink" name="' . esc_attr( $name ) . '" ' . checked( $val, $type, false ) . '>';
				$form .= '<label for="ujic-' . esc_attr( $type ) . '" id="img-' . esc_attr( $type ) . '">' . esc_html( $name_val[ $i ] ) . '</label>';
				$i++;
		}
			$form .= '</div>';
			$form .= '</div>';
			return $form;
	}

		/**
		 * Print select field.
		 *
		 * @since    2.0
		 */
	public function cform_select( $label, $name, $types, $val ) {
			$form  = '<div class="ujic-box">';
			$form .= '<div class="label">' . esc_html( $label ) . '</div>';
			$form .= '<div class="ujic-select">';
			$form .= '<select class="select of-input" name="' . esc_attr( $name ) . '" id="' . esc_attr( $name ) . '">';
		foreach ( $types as $type => $option ) {
				$form .= '<option id="' . esc_attr( $type ) . '" value="' . esc_attr( $type ) . '" ' . selected( $type, $val, false ) . ' />' . esc_html( $option ) . '</option>';
		}
			$form .= '</select></div>';
			$form .= '</div>';
			return $form;
	}

		/**
		 * MM and SS.
		 *
		 * @since    2.1.3
		 */
	public function cform_select_time( $label, $cls, $hh, $mm ) {
			$form  = '<div class="ujic-box ' . esc_attr( $cls ) . '">';
			$form .= '<div class="label">' . esc_html( $label ) . '</div>';
			$form .= '<div class="ujic-select">';
			$form .= '<select class="select of-input" name="ujic_hh" id="ujic_hh">';
		foreach ( $hh as $time ) {
				$form .= '<option value="' . esc_attr( $time['value'] ) . '" />' . esc_attr( $time['text'] ) . '</option>';
		}
			$form .= '</select> : ';

			$form .= '<select class="select of-input" name="ujic_mm" id="ujic_mm">';
		foreach ( $mm as $time ) {
				$form .= '<option value="' . esc_attr( $time['value'] ) . '" />' . esc_html( $time['text'] ) . '</option>';
		}
			$form .= '</select>';

			$form .= '</div></div>';
			return $form;
	}

		/**
		 * Recurring time
		 *
		 * @since    2.1.3
		 */
	public function cform_reccur( $label, $timelabel, $info ) {
			$form  = '<div class="ujic-box">
                 <div class="label">' . esc_html( $label ) . '</div>';
			$form .= '<div class="ujic-select"><input type="text" value="" name="ujic_rec_every" id="ujic_rec_every" class="small-text">';
			$form .= ' <select class="select of-input" name="ujic_rec_time" id="ujic_rec_time">';
		foreach ( $timelabel as $time ) {
				$form .= '<option value="' . esc_attr( $time['value'] ) . '" />' . esc_html( $time['text'] ) . '</option>';
		}
			$form .= '</select></div>';
			$form .= '<div class="ujic-block-box"> <input type="text" value="" name="ujic_rec_repeat" id="ujic_rec_repeat" class="small-text"> ' . esc_html( $info ) . '</div>';
			$form .= '</div>';
			return $form;
	}

		/**
		 * Print slider-ui field.
		 *
		 * @since    2.0
		 */
	public function cform_sliderui( $label, $name, $val, $min, $max, $step ) {
			$form  = '<div class="ujic-box ujic_slider">';
			$form .= '<div class="label">' . esc_html( $label ) . '</div>';
			// values
			$val = ( $val == '' ) ? 32 : esc_attr( $val );
			// html output
			$form .= '<input type="text" name="' . $name . '" id="' . $name . '" value="' . $val . '" class="mini" readonly="readonly" />';
			$form .= '<div id="' . esc_attr( $name ) . '-slider" class="ujic_sliderui" style="margin-left: 7px;" data-id="' . esc_attr( $name ) . '" data-val="' . esc_attr( $val ) . '" data-min="' . esc_attr( $min ) . '" data-max="' . esc_attr( $max ) . '" data-step="' . esc_attr( $step ) . '"></div>';
			$form .= '</div>';
			return $form;
	}

		/**
		 * Color picker field.
		 *
		 * @since    2.0
		 */
	public function cform_color( $label, $names, $clabels, $vals ) {
			$form  = '<div class="ujic-box ujic-color">';
			$form .= '<div class="label">' . esc_html( $label ) . '</div>';
			$form .= '<div class="ujic-color-box">';
			$i     = 0;
		foreach ( $names as $name ) {
				// values
				$default_color = ' data-default-color="' . esc_attr( $vals[ $i ] ) . '" ';

				$form .= '<div class="ujic-color-hold">';
				$form .= '<span> ' . esc_html( $clabels[ $i ] ) . ' :</span>';
				$form .= '<input name="' . esc_attr( $name ) . '" id="' . esc_attr( $name ) . '" class="ujic_colorpick"  type="text" value="' . esc_attr( $vals[ $i ] ) . '"' . esc_html( $default_color ) . ' />';
				$form .= '</div>';
				$i++;
		}
			$form .= '</div>';
			$form .= '</div>';
			return $form;
	}

		/**
		 * Add buttons.
		 *
		 * @since    2.0
		 */
	private function cform_buttons() {
			$type = ( isset( $_GET['edit'] ) && ! empty( $_GET['edit'] ) ) ? ujic_clean( wp_unslash( $_GET['edit'] ) ) : '';
			$form = '<div class="ujic-submit-hold">';
		if ( ! empty( $type ) && is_numeric( $type ) ) {
				$form .= get_submit_button( __( 'Update Style', 'ujicountdown' ), 'primary', 'submit_ujic', true );
				$form .= '<a href="?page=ujicountdown&tab=tab_ujic_new" class="button button-secondary" id="ujic_table_new">' . __( 'Add New Style', 'ujicountdown' ) . '</a>';
		} else {
				$form .= get_submit_button( __( 'Save Style', 'ujicountdown' ), 'primary', 'submit_ujic', true );
		}
			$form .= '</div>';

			return $form;
	}

		/**
		 * Form Date.
		 *
		 * @since    2.0
		 */
	private function cform_date( $label, $id ) {
			wp_enqueue_script( 'jquery-ui-datepicker' );
			wp_enqueue_style( 'jquery-ui', esc_url ( UJICOUNTDOWN_URL ) . 'assets/css/jquery-ui.min.css' );

			$form  = '<div class="ujic-box ujic-date">';
			$form .= '<div class="label">' . esc_html( $label ) . '</div>';

			$form .= '<input type="text" class="ujic_date_admin" name="' . esc_attr( $id ) . '" id="' . esc_attr( $id ) . '" />';

			$form .= '</div>';

			return $form;
	}

		/**
		 * Form Date.
		 *
		 * @since    2.0
		 */
	private function cform_time( $label ) {
			wp_enqueue_script( 'jquery-ui-datepicker' );
			wp_enqueue_style( 'jquery-ui',  esc_url ( UJICOUNTDOWN_URL ) . 'assets/css/jquery-ui.min.css' );

			$form  = '<div class="ujic-box ujic-time">';
			$form .= '<div class="label">' . esc_html( $label ) . '</div>';

			$form .= '<input type="text" class="ujic_thou" name="ujic_thou" value="" placeholder="Hour(s)" class="small-text" style="max-width: 80px;"/> : ';
			$form .= '<input type="text" class="ujic_tmin" name="ujic_tmin" value="" placeholder="Minute(s)" class="small-text" style="max-width: 80px;"/> : ';
			$form .= '<input type="text" class="ujic_tsec" name="ujic_tsec" value="" placeholder="Second(s)" class="small-text" style="max-width: 80px;"/>';

			$form .= '</div>';

			return $form;
	}

		/**
		 * Form Type.
		 *
		 * @since    2.0
		 */
	private function cform_ftype( $cur_style, $id = null ) {
			$type = ( isset( $_GET['edit'] ) && ! empty( $_GET['edit'] ) ) ? ujic_clean( wp_unslash( $_GET['edit'] ) ) : '';

		if ( ! empty( $type ) && is_numeric( $type ) && ! empty( $id ) ) {
				$form = '<form method="post" action="options-general.php?page=ujicountdown&tab=tab_ujic_new&edit=' . esc_attr( $id ) . '">';
		} else {
				$form = '<form method="post" action="options-general.php?page=ujicountdown&tab=tab_ujic_new&style=' . esc_attr( $cur_style ) . '&save=true">';
		}

			return $form;
	}

		/**
		 * Insert/Edit database values.
		 *
		 * @since    2.0
		 */
	private function cform_save_db() {
		if ( $this->cform_is_create() ) {
			if ( $this->cform_errors() ) {
				$this->ins_ujic_db( ujic_clean( wp_unslash($_POST ) ) );
				$this->ujic_message( __( 'Your Timer Style Has Been Created', 'ujicountdown' ) );
				echo esc_js( '<script type="text/javascript"> ujic_admin_home(); </script>' );
			}
		}

		if ( isset( $_POST ) && ! empty( $_POST ) && $this->cform_is_edit() ) {
			if ( $this->cform_errors() ) {
					$this->upd_ujic_db( ujic_clean( wp_unslash($_POST) ), ujic_clean( wp_unslash( $_GET['edit'] ) ) );
					$this->ujic_message( __( 'Your Timer Style Has Been Updated', 'ujicountdown' ) );
			}
		}
	}

		/**
		 * Errors check.
		 *
		 * @since    2.0
		 */
	private function cform_errors() {
			global $wpdb;
			$ujic_form_err = '';

			// name not empty
		if ( empty( $_POST['ujic_name'] ) ) {
				$ujic_form_err .= __( 'Please enter timer title', 'ujicountdown' ) . '<br/>';
		}

			// check format
		if ( ! isset( $_POST['ujic_d'] ) && ! isset( $_POST['ujic_h'] ) && ! isset( $_POST['ujic_m'] ) && ! isset( $_POST['ujic_s'] ) && ! isset( $_POST['ujic_y'] ) && ! isset( $_POST['ujic_o'] ) && ! isset( $_POST['ujic_w'] ) ) {
				$ujic_form_err .= __( 'Please select the timer format', 'ujicountdown' ) . '<br/>';
		}

			// check name exist
		if ( ! empty( $_POST['ujic_name'] ) && ! $this->cform_is_edit() ) {
				$cname = $wpdb->get_var( 'SELECT title FROM ' . $this->ujic_tab_name() . " WHERE title = '" . esc_sql( ujic_clean( wp_unslash( $_POST['ujic_name'] ) ) ) . "'" );
			if ( ! empty( $cname ) ) {
					$ujic_form_err .= __( 'This name already exist. Please change the timer name.  <br/>', 'ujicountdown' );
			}
		}

		if ( empty( $ujic_form_err ) ) {
				return true;
		} elseif ( ! empty( $ujic_form_err ) ) {
				$this->ujic_message( $ujic_form_err, true );
				return false;
		}
	}

		/**
		 * Check if have saved style.
		 *
		 * @since    2.0
		 */
	private function saved_db_style() {
			global $wpdb;
			$cname = $wpdb->get_var( 'SELECT title FROM ' . $this->ujic_tab_name() . ' LIMIT 1' );
		if ( ! empty( $cname ) ) {
				return true;
		} else {
				return false;
		}
	}

		/**
		 * Return If Create Form.
		 *
		 * @since    2.0
		 */
	public function cform_is_create() {
		if ( isset( $_POST ) && ! empty( $_POST ) && isset( $_GET['save'] ) && ! empty( $_GET['save'] ) && $_GET['save'] == 'true' ) {
				// 2.0.7 Fix Cross-Site Request Forgery attacks
				$this->ujic_secure( 'ujic_secure', 'ujic_secure_form', ujic_clean( wp_unslash( $_POST ) ) );
				return true;
		} else {
				return false;
		}
	}

		/**
		 * Return Edit Form.
		 *
		 * @since    2.0
		 */
	public function cform_is_edit() {
		if ( isset( $_GET['edit'] ) && ( ! empty( $_GET['edit'] ) && is_numeric( $_GET['edit'] ) ) ) {
				return true;
		} else {
				return false;
		}
	}

		/**
		 * Return Delete Form.
		 *
		 * @since    2.0
		 */
	private function cform_delete() {
		if ( isset( $_GET['del'] ) && ( ! empty( $_GET['del'] ) && is_numeric( $_GET['del'] ) ) ) {
				$this->del_ujic_db( trim( ujic_clean( wp_unslash($_GET['del'] ) ) ) );
				$this->ujic_message( __( 'Your countdown style was deleted', 'ujicountdown' ) );
		}
	}

		/**
		 * Creating The Tabs.
		 *
		 * @since    2.0
		 */
	private function ujic_tabs_values() {
			global $wpdb;
			$ujictab    = '';
			$table_name = $wpdb->prefix . 'uji_counter';
			$ujic_datas = $wpdb->get_results( "SELECT * FROM $table_name ORDER BY `time` DESC" );
		if ( ! empty( $ujic_datas ) ) {
			foreach ( $ujic_datas as $ujic ) {
				$ujic_style = ! empty( $ujic->style ) ? $ujic->style : 'classic';
				$ujictab   .= '<tr>
                                <td>' . esc_html( $ujic->time ) . '</td>
                                <td>' . esc_html( $ujic->title ) . '</td>
                                <td><span id="ujic-style-' . esc_attr( $ujic_style ) . '" class="ujic-types">' . esc_attr( $ujic_style ) . '</span></td>
                                <td><a href="?page=ujicountdown&tab=tab_ujic_new&edit=' . esc_attr( $ujic->id ) . '"><i class="dashicons dashicons-welcome-write-blog"></i>Edit</a> | <a href="options-general.php?page=ujicountdown&del=' . esc_attr( $ujic->id ) . '"><i class="dashicons dashicons-trash"></i> Delete</a></td>
                            </tr>';
			}
		}

			return $ujictab;
	}

		/**
		 * Message Notification.
		 *
		 * @since    2.0
		 */
	private function ujic_message( $message, $errormsg = false ) {
		if ( $errormsg ) {
				echo '<div id="message" class="error">';
		} else {
				echo '<div id="message" class="updated fade">';
		}

			echo '<p><strong>' . wp_kses_post( $message ) . '</strong></p></div>';
	}

		/**
		 * Timer settings
		 *
		 * @since    2.0
		 */
	public function admin_timerset() {
			// Save data
			$this->save_timerset();
			// Get data
			$vars = $this->get_timerset();
			apply_filters( 'ujic_get_vars_set', $vars );

			// Build Forms
			$cnt  = '<form method="post" action="options-general.php?page=ujicountdown&tab=tab_ujic_set&saveset=true">';
			$cnt .= apply_filters( 'ujic_admin_newset', $cnt );
			$cnt .= $this->cform_checkbox( __( 'Enable user time:', 'ujicountdown' ), array( 'ujic_utime' ), array( __( "Timer based on the users system time not the server time.<br> Don't enable it if you need the same time for any timezone!<br><strong>Default is the server time!</strong>", 'ujicountdown' ) ), array( ( isset( $vars['ujic_utime'] ) ? $vars['ujic_utime'] : false ) ) );
			$cnt .= $this->cform_checkbox( __( 'Right-To-Left (RTL):', 'ujicountdown' ), array( 'ujic_rtl' ), array( __( 'Writing starts from the right of the page and continues to the left.', 'ujicountdown' ) ), array( ( isset( $vars['ujic_rtl'] ) ? $vars['ujic_rtl'] : false ) ) );
			$cnt .= $this->cform_checkbox( __( 'Remove Settings', 'ujicountdown' ), array( 'ujic_remove' ), array( __( 'This option will remove all settings and styles when <strong>Delete plugin</strong>', 'ujicountdown' ) ), array( ( isset( $vars['ujic_remove'] ) ? $vars['ujic_remove'] : false ) ) );
			$cnt .= $this->cform_title( __( 'Quick Translation', 'ujicountdown' ) );

			$labels = self::ujic_labels();

		foreach ( $labels as $v => $n ) {
				$val  = ( isset( $vars[ $v ] ) ) ? $vars[ $v ] : '';
				$cnt .= $this->cform_input( __( $n . ':', 'ujicountdown' ), $v, $val, 'default-text' );
		}
			$cnt .= get_submit_button( __( 'Save Changes', 'ujicountdown' ), 'primary', 'submit_ujic', true );

			$cnt .= wp_nonce_field( 'ujic_secureset', 'ujic_secureset_form', true, false );

			$cnt .= '</form>';

			echo $this->custom_metabox( __( 'Timer Settings', 'ujicountdown' ), $cnt, 'ujic-create ujic-settings' );
	}

		/**
		 * Save timer settings
		 *
		 * @since    2.0
		 */
	public function save_timerset() {
		if ( isset( $_POST ) && ! empty( $_POST ) && isset( $_GET['saveset'] ) && ! empty( $_GET['saveset'] ) && $_GET['saveset'] == 'true' ) {
				// 2.0.7 Fix Cross-Site Request Forgery attacks
				$this->ujic_secure( 'ujic_secureset', 'ujic_secureset_form', ujic_clean( wp_unslash( $_POST ) ) );

				$settings = $this->sanitize_array( ujic_clean( wp_unslash( $_POST ) ) );

				unset( $settings['submit_ujic'] );
				update_option( 'ujic_set', $settings );
				$this->ujic_message( __( 'Settings saved.', 'ujicountdown' ) );
		} elseif ( isset( $_POST ) && ! empty( $_POST ) ) {
				$this->ujic_message( __( 'Some error occured. Please try again.', 'ujicountdown' ) );
		}
	}

		/**
		 * Get timer settings
		 *
		 * @since    2.0
		 */
	public function get_timerset( $name = null ) {
			$vars = get_option( 'ujic_set' );
		if ( $name ) {
				return $vars[ $name ];
		} else {
				return $vars;
		}
	}

		/**
		 * Secure against Cross-Site Request Forgery
		 *
		 * @since    2.0.7
		 */
	public function ujic_secure( $secure, $secure_filed, $posts ) {
		if ( ! isset( $posts[ $secure_filed ] ) || ! wp_verify_nonce( $posts[ $secure_filed ], $secure )
			) {
				wp_die( __( 'Cheatin&#8217; huh?', 'ujicountdown' ) );
		}
	}

	   /**
		* Sanitize values in array
		*
		* @since    2.3
		*/
	public function sanitize_array( $input ) {
			// Initialize the new array that will hold the sanitize values
			$new_input = array();

			// Loop through the input and sanitize each of the values
		foreach ( $input as $key => $val ) {
				$new_input[ $key ] = sanitize_text_field( esc_attr( $val ) );
		}

			return $new_input;
	}

}
