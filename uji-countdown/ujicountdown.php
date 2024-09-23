<?php
/*
Plugin Name: Uji Countdown
Plugin URI: http://www.wpmanage.com/uji-countdown
Description: HTML5 Customizable Countdown.
Version: 2.3.2
Text Domain: ujicountdown
Domain Path: /lang
Author: Wpmanage.com
Author URI: http://wpmanage.com
License: GPLv2
Copyright 2023  WPmanage  (email : info@wpmanage.com)
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// If this file is called directly, abort.
defined( 'WPINC' ) || exit;

define( 'UJIC_NAME', defined('UJIC_NAMEPRO') ? UJIC_NAMEPRO : 'Uji Countdown' );
define( 'UJIC_ORIG', '2.3.2' );
define( 'UJIC_VERS', defined('UJIC_VERSPRO') ? UJIC_VERSPRO : UJIC_ORIG  );
define( 'UJIC_FOLD', 'uji-countdown' );
define( 'UJICOUNTDOWN', trailingslashit( dirname(__FILE__) ) );
define( 'UJICOUNTDOWN_URL', plugin_dir_url( __FILE__ ) );
define( 'UJICOUNTDOWN_BASE', plugin_basename(__FILE__) );
define( 'UJICOUNTDOWN_FILE', __FILE__ );

//Google Fonts
require_once( plugin_dir_path( __FILE__ ) . 'assets/googlefonts.php' );
// Functions
require_once( plugin_dir_path( __FILE__ ) . 'classes/uji-functions.php' );

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/blocks.php';

// Classes
require_once( plugin_dir_path( __FILE__ ) . 'classes/class-uji-countdown-admin.php' );
require_once( plugin_dir_path( __FILE__ ) . 'classes/class-uji-countdown.php' );
require_once( plugin_dir_path( __FILE__ ) . 'classes/class-uji-countdown-front.php' );

// INIT
Uji_Countdown::get_instance();
