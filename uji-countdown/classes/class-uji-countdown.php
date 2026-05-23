<?php
/**
 * Uji Countdown Main
 *
 * Handles main enqueue
 *
 * @author   WPmanage
 * @category Main
 * @package  Uji-Countdown/Classes
 * @version  2.0
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Uji_Countdown extends Uji_Countdown_Admin
{

    /**
     * Uji Countdown
     *
     * @since   2.0
     *
     * @var     string
     */
    protected $pname = UJIC_NAME;
    /**
     * Plugin version, used for cache-busting of style and script file references.
     *
     * @since   2.0
     *
     * @var     string
     */
    protected $version = UJIC_VERS;

    /**
     * Counter Options.
     *
     * @since    2.0
     *
     * @var      array
     */
    private $options = array();

    /**
     * Instance of this class.
     *
     * @since    2.0
     *
     * @var      object
     */
    protected static $instance = null;

    /**
     * Slug of the plugin screen.
     *
     * @since    2.0
     *
     * @var      string
     */
    protected $plugin_screen_hook_suffix = null;

    /**
     * Init.
     *
     * @since    2.0
     *
     * @var      string
     */
    public $uji;
    
    /**
     * Go Plus
     *
     * @since     2.1
     */
    public function ujic_pro() {
        return ujic_is_pro_active();
    }
    
    /**
     * Plus sfx
     *
     * @since     2.1
     */
    public function ujic_pro_sx() {
        return $this->ujic_pro() ? 'ujicountdownpro' : 'ujicountdown';
    }

    /**
     * Initialize the plugin by setting localization, filters, and administration functions.
     *
     * @since     2.0
     */
    public function __construct() {

       // Register hooks that are fired when the plugin is activated, deactivated, and uninstalled, respectively.
       register_activation_hook( UJICOUNTDOWN_FILE, array( $this, 'activate' ) );
       register_deactivation_hook( UJICOUNTDOWN_FILE, array( $this, 'deactivate' ) );

        //Show on front
        if ( !is_admin() ) {
            $ujic = new UjiCountdown();
        }
        // Load plugin text domain
        add_action( 'init', array( $this, 'load_plugin_textdomain' ) );

        // Load public-facing style sheet and JavaScript.
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
        
        // HOOKs Widget	
        global $wp_version;

        if ( version_compare( $wp_version, '5.7', '<=' ) ) {
                add_action( 'widgets_init', array( $this, 'ujic_register_widgets' ) );	
        }
        
        if ( is_admin() )
        {

           // Add the options page and menu item.
           add_action( 'admin_menu', array( $this, 'add_plugin_admin_menu' ) );

           // Load admin style sheet and JavaScript.
           add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_styles' ), 1 );
           add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ), 1 );

           // Load admin shortcode style sheet and JavaScript.
           add_action( 'admin_enqueue_scripts', array( &$this, 'ujic_shortcode_scripts' ) );
           
           // Add the Link from plugins
           add_filter('plugin_action_links', array($this, 'plugin_settings_link'),10,2);

           // Normalize legacy admin labels, including labels emitted by Pro extension hooks.
           add_filter( 'gettext', array( $this, 'ujic_admin_label_text' ), 10, 3 );
           
        }

    }
    
    /**
     * Version
     *
     * @since     2.0.3
     */
 
    public static function getPluginSavedVersion()
    {
        return get_option('uji-countdown-version', null);
    }

    protected static function savePluginVersion()
    {
        return update_option('uji-countdown-version', UJIC_ORIG);
    }
    
    protected static function upgradeVerFix ($ver){
            if ( version_compare( (string) $ver, '2.1.2' ) ) {
                     global $wpdb;
                     $table_name = $wpdb->prefix . "uji_counter";
                     $ujic_datas = $wpdb->get_results( "SELECT * FROM $table_name ORDER BY `time` DESC"  );
                        if ( !empty( $ujic_datas ) ) {
                                foreach ( $ujic_datas as $ujic ) {
                                      if( $ujic->link == '' && $ujic->title != '' ){
                                            $title = sanitize_title( $ujic->title );
                                            $wpdb->query( $wpdb->prepare( "UPDATE $table_name SET `link` = %s WHERE (`id` = %d)", $title, $ujic->id ) );
                                      }  
                                }
                        }
            }
    }

    /**
     * Counter Options.
     *
     * @since     2.0
     */
    public function ujic_option( $id = NULL, $name = NULL ) {
        //Default values
        $style = $this->ujic_request_text( 'style' );
        $sz = ( 'modern' === $style ) ? 50 : 32;
        $col = ( 'modern' === $style ) ? '#efefef' : '#c368c3';
        $txtc = ( 'modern' === $style ) ? '#000000' : '#ffffff';
        $new_options = array();
        $options = apply_filters( 'ujic_options', array(
            "ujic_name" => "", //Name
            "ujic_style" => "classic", //Style
            "ujic_size" => esc_attr( $sz ), //Timer Size
            "ujic_thick" => 10, //Thickness
            "ujic_goof" => 'none', //Google Font
            "ujic_col_dw" => '#a61ba6', //Select Box Color Down
            "ujic_col_up" => esc_attr( $col ), //Select Box Color Up
            "ujic_col_txt" => esc_attr( $txtc ), //Text Color Number
            "ujic_col_sw" => '#000000', //Text Color Shadow
            "ujic_col_lab" => '#000000', //LAbel Text Color
            "ujic_lab_sz" => 13, //Label size
            "ujic_pos" => 'none', //Alignment
            "ujic_d" => "true", //Main format: Days
            "ujic_h" => "true", //Main format: Hours
            "ujic_m" => "true", //Main format: Minutes
            "ujic_s" => "true", //Main format: Seconds
            "ujic_y" => 0, //Secondary format: Years
            "ujic_o" => 0, //Secondary format: Months
            "ujic_w" => 0, //Secondary format: Weeks
            "ujic_txt" => "true", //Show Label Text
            "ujic_ani" => 0, //Animation for seconds
            "ujic_no_box_color" => 0, //Disable classic box color
            "ujic_no_text_shadow" => 0, //Disable classic number shadow
        ));

        //Return default values	
        if ( (!isset( $name ) || empty( $name ) ) && (!isset( $id ) || empty( $id ) ) )
        {
            if ( $this->cform_is_create() )
            {
                $posts = $this->ujic_post_values();

                foreach ( $options as $nm => $val )
                {
                    $new_options[$nm] = ( isset( $posts[$nm] ) && ! empty( $posts[$nm] ) ) ? esc_attr( $posts[$nm] ) : '';
                }

                return $new_options;
            }
            else
            {
                return $options;
            }
        }

        //Return all saved values	
        if ( !isset( $name ) && isset( $id ) )
        {
            $get_option = $this->sel_ujic_db( $id );

            foreach ( $options as $nm => $val )
            {
                $val = $this->cform_is_edit() ? '' : $val;
                //$new_options[$nm] = ( isset( $get_option[$nm] ) && !empty( $get_option[$nm] ) ) ? $get_option[$nm] : $val;

                $new_options[$nm] = is_array( $get_option ) && ! empty( $get_option[$nm] ) ? $get_option[$nm] : $val;
            }
            return $new_options;
        }

        //Return one saved value
        if ( isset( $name ) && isset( $id ) && !empty( $name ) && !empty( $id ) )
        {
            $one_option = $this->sel_ujic_db( $id, $name );
            return ( ! empty( $one_option ) ) ? $one_option : ( $options[$name] ?? null );
        }
    }
    
    /**
     * Short Link
     *
     * @since     2.0
     */
    public function plugin_settings_link( $links, $file ) {
        if ( $file != UJICOUNTDOWN_BASE )
            return $links;

        array_unshift($links, '<a href="options-general.php?page=ujicountdown">' . __( 'Settings', 'ujicountdown' ) . '</a>');

        return $links;
    }

    /**
     * Table Name.
     *
     * @since     2.0
     */
    public static function ujic_tab_name() {
        global $wpdb;
        return $wpdb->prefix . "uji_counter";
    }

    /**
     * Get Database.
     *
     * @since     2.0
     */
    public function sel_ujic_db( $id, $name = NULL ) {
        global $wpdb;
        $options = $var = array();
        
        if( empty($id) ) {
            return false;
        }

        if ( is_numeric( $id ) ) {
            $ujic_data = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM " . self::ujic_tab_name() . " WHERE id = %d", $id ) );
        } else {
            $ujic_data = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM " . self::ujic_tab_name() . " WHERE link = %s", $id ) );
        }
        
        if ( empty($ujic_data) ) {
            return false;
        }
        
        $var['id'] = $ujic_data->id;
        $var['time'] = $ujic_data->time;
        $var['ujic_name'] = $ujic_data->title;
        $var['ujic_style'] = $ujic_data->style;

        if ( !empty( $ujic_data->options ) ) {
            $options = maybe_unserialize( $ujic_data->options );
            if ( is_array( $options ) ) {
                foreach ( $options as $option => $val ) {
                    $var[$option] = $val;
                }
            }
        }
        if ( $name )
            return isset( $var[$name] ) ? $var[$name] : null;
        else
            return $var;
    }

    /**
     * Insert Database.
     *
     * @since     2.0
     */
    public function ins_ujic_db( $posts ) {
        global $wpdb;
        
        //2.0.7 Fix Cross-Site Request Forgery attacks
        self::ujic_secure( 'ujic_secure', 'ujic_secure_form', $posts );

        $options = array();
        $default = $this->ujic_option();
        foreach ( $posts as $name => $val ) {
            $default_value = is_array( $default ) && array_key_exists( $name, $default ) ? $default[$name] : '';
            $options[$name] = ( '' !== $val ) ? esc_attr( $val ) : $default_value;
        }
        $title = $options['ujic_name'];
        $style = $options['ujic_style'];
        unset( $options['ujic_name'], $options['ujic_style'], $options['submit_ujic'] );
        //insert to DB
        $wpdb->query( $wpdb->prepare( "INSERT INTO " . self::ujic_tab_name() . "(time, title, link, style, options )
		    						 VALUES (utc_timestamp(), %s, %s, %s, %s)", esc_html($title), sanitize_title( $title ), trim( $style ), maybe_serialize( $options )
        ) );
    }

    /**
     * Update Database.
     *
     * @since     2.0
     */
    public function upd_ujic_db( $posts, $id ) {
        global $wpdb;
        
        //2.0.7 Fix Cross-Site Request Forgery attacks
        self::ujic_secure( 'ujic_secure', 'ujic_secure_form', $posts );
        
        $options = array();
        $default = $this->ujic_option();
        foreach ( $posts as $name => $val ) {
            $default_value = is_array( $default ) && array_key_exists( $name, $default ) ? $default[$name] : '';
            $options[$name] = ( '' !== $val ) ? esc_attr( $val ) : $default_value;
        }
        $title = $options['ujic_name'];
        $style = $options['ujic_style'];
        unset( $options['ujic_name'], $options['ujic_style'], $options['submit_ujic'], $options['cancel_ujic'] );
        //update DB
        $wpdb->query( $wpdb->prepare( "UPDATE " . self::ujic_tab_name() . " SET title=%s, link=%s, style=%s, options=%s  WHERE id=%d", esc_html($title), sanitize_title( $title ), trim( $style ), maybe_serialize( $options ), esc_attr( $id )
        ) );
    }

    /**
     * Delete Database.
     *
     * @since     2.0
     */
    public function del_ujic_db( $id ) {
        global $wpdb;
        
        if ( is_numeric( $id ) ) {
            $sql = $wpdb->prepare(
                "DELETE FROM " . self::ujic_tab_name() . " WHERE id = %d",
                $id
            );
            $wpdb->query( $sql );
        }
    }

    /**
     * Create Database.
     *
     * @since     2.0
     */
    private static function create_ujic_db() {
        global $wpdb;
        
        $wpdb->hide_errors();
        $collate = '';

         if ( $wpdb->has_cap( 'collation' ) ) {
            if ( ! empty($wpdb->charset ) ) {
               $collate .= "DEFAULT CHARACTER SET $wpdb->charset";
            }
            if ( ! empty($wpdb->collate ) ) {
               $collate .= " COLLATE $wpdb->collate";
            }
         }
        

        $sql = "CREATE TABLE " . self::ujic_tab_name() . " ( 
		  id int(9) unsigned NOT NULL AUTO_INCREMENT,
		  time datetime not null,
		  title varchar(128) not null,
                  link varchar(128) not null,
		  style varchar(32) not null,
		  options longtext,
		  PRIMARY KEY  (id),
        KEY id (id)
	) $collate";
        require_once( ABSPATH . '/wp-admin/includes/upgrade.php' );
        dbDelta( $sql );
    }
    
    /**
     * Create/Upgrade Database.
     *
     * @since     2.0
     */
    private function upgrade_db() {
        global $wpdb;
        
       if( $wpdb->get_var( "SHOW TABLES LIKE '" . self::ujic_tab_name()."'") === $wpdb->prefix . self::ujic_tab_name() ) {
          
         // Create DB
          self::create_ujic_db();
          
         $old_data = $wpdb->get_results( "SELECT * FROM " . self::ujic_tab_name() );

         foreach ( $old_data as $data ) {
            
            $posts["ujic_name"] = $data->title; //Timer Title
            $posts["ujic_style"] = $data->style; //Timer Style
            $posts["ujic_size"] = $data->size; //Timer Size
            if( $data->ujic_thick ) $posts["ujic_thick"] = $data->ujic_thick; //Thickness
            $posts["ujic_col_dw"] = $data->col_dw; //Select Box Color Down
            $posts["ujic_col_up"] = $data->col_up; //Select Box Color Up
            if( $data->col_txt ) $posts["ujic_col_txt"] = $data->col_txt; //Text Color Number
            if( $data->col_sw ) $posts["ujic_col_sw"] = $data->col_sw; //Text Color Shadow
            $posts["ujic_pos"] = $data->ujic_pos; //Alignment
            $posts["ujic_goof"] = 'none'; //Google Font
            $posts["ujic_txt"] = ($data->ujic_txt) ? "true" : 0; //Show Label Text
            $posts["ujic_col_lab"] = '#000000'; //LAbel Text Color
            $posts["ujic_lab_sz"] = 13; //Label size
            $posts["ujic_ani"] = ($data->ujic_ani) ? "true" : 0; //Animation for seconds
            $posts["ujic_d"] = "true"; //Main format: Days
            $posts["ujic_h"] = "true"; //Main format: Hours
            $posts["ujic_m"] = "true"; //Main format: Minutes
            $posts["ujic_s"] = "true"; //Main format: Seconds
            $posts["ujic_y"] = 0; //Secondary format: Years
            $posts["ujic_o"] = 0; //Secondary format: Months
            $posts["ujic_w"] = 0; //Secondary format: Weeks
            
            $this->upd_ujic_db( $posts, $data->id );
            
            $wpdb->query( "ALTER TABLE " . self::ujic_tab_name() );
            $wpdb->query( "ALTER TABLE " . self::ujic_tab_name() . " DROP `size`, DROP `col_dw`, DROP `col_up`, DROP `ujic_pos`, DROP `col_txt`, DROP `col_sw`, DROP `ujic_ani`, DROP `ujic_txt`, DROP `ujic_thick`;" );

         }
          
       }else{
            // Create DB
            self::create_ujic_db();
       }

    }

    /**
     * Return an instance of this class.
     *
     * @since     2.0
     *
     */
    public static function get_instance() {

        // If the single instance hasn't been set, set it now.
        if ( null == self::$instance ) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    /**
     * Fired when the plugin is activated.
     *
     * @since    2.0
     *
     * @param    boolean    $network_wide    True if WPMU superadmin uses "Network Activate" action, false if WPMU is disabled or plugin is activated on an individual blog.
     */
    public function activate( $network_wide ) {
        //Upgrade DB
        $this->upgrade_db();
        
        $ver = get_option('uji-countdown-version', null);
        
        self::upgradeVerFix($ver);
        
        self::savePluginVersion();
    }

    /**
     * Fired when the plugin is deactivated.
     *
     * @since    2.0
     *
     * @param    boolean    $network_wide    True if WPMU superadmin uses "Network Deactivate" action, false if WPMU is disabled or plugin is deactivated on an individual blog.
     */
    public static function deactivate( $network_wide ) {
        // TODO: Define deactivation functionality here
    }

    /**
     * Load the plugin text domain for translation.
     *
     * @since    2.0
     */
    public function load_plugin_textdomain() {
 
        $domain = 'ujicountdown';
        $locale = apply_filters( 'plugin_locale', get_locale(), $domain );

        load_textdomain( $domain, WP_LANG_DIR . '/' . $domain . '/' . $domain . '-' . $locale . '.mo' );
        load_plugin_textdomain( $domain, FALSE, dirname( plugin_basename( __FILE__ ) ) . '/lang/' ); 
    }

    /**
     * Return a cache-busting version for plugin assets.
     *
     * @since    2.0
     *
     * @param    string $relative_path Relative asset path inside the plugin.
     * @return   string
     */
    protected function ujic_asset_version( $relative_path ) {
        $path = UJICOUNTDOWN . $this->ujic_asset_path( $relative_path );

        if ( file_exists( $path ) ) {
            return (string) filemtime( $path );
        }

        return $this->version;
    }

    /**
     * Check whether WordPress should load unminified development assets.
     *
     * @since    2.0
     *
     * @return   bool
     */
    protected function ujic_is_script_debug() {
        return defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG;
    }

    /**
     * Return the production asset path when available.
     *
     * @since    2.0
     *
     * @param    string $relative_path Relative asset path inside the plugin.
     * @return   string
     */
    protected function ujic_asset_path( $relative_path ) {
        $relative_path = ltrim( $relative_path, '/' );

        if ( $this->ujic_is_script_debug() ) {
            $dev_path = preg_replace( '/\.js$/', '.dev.js', $relative_path );

            if ( $dev_path && $dev_path !== $relative_path && file_exists( UJICOUNTDOWN . $dev_path ) ) {
                return $dev_path;
            }

            return $relative_path;
        }

        $min_path = preg_replace( '/\.(js|css)$/', '.min.$1', $relative_path );

        if ( $min_path && $min_path !== $relative_path && file_exists( UJICOUNTDOWN . $min_path ) ) {
            return $min_path;
        }

        return $relative_path;
    }

    /**
     * Return a plugin asset URL using the production asset path when available.
     *
     * @since    2.0
     *
     * @param    string $relative_path Relative asset path inside the plugin.
     * @return   string
     */
    protected function ujic_asset_url( $relative_path ) {
        return esc_url( UJICOUNTDOWN_URL . $this->ujic_asset_path( $relative_path ) );
    }

    /**
     * Register and enqueue admin-specific style sheet.
     *
     * @since     2.0
     *
     * @return    null    Return early if no settings page is registered.
     */
    public function enqueue_admin_styles() {

        if ( !isset( $this->plugin_screen_hook_suffix ) ) {
            return;
        }

        $screen = get_current_screen();
        $tab = $this->ujic_request_text( 'tab' );
        if ( $screen->id == $this->plugin_screen_hook_suffix ) {
           if( ! empty( $tab ) && $tab != "tab_ujic_list"){
               wp_enqueue_style( 'wp-color-picker' );
               wp_enqueue_style( 'ujicountdown' . '-admin-jqueryui', $this->ujic_asset_url( 'assets/css/jquery-ui-custom.css' ), array(), $this->ujic_asset_version( 'assets/css/jquery-ui-custom.css' ) );
               wp_enqueue_style( 'ujicountdown' . '-admin-icheck',  $this->ujic_asset_url( 'assets/css/pink.css' ), array(), $this->ujic_asset_version( 'assets/css/pink.css' ) );
           }
            wp_enqueue_style( 'ujicountdown' . '-admin-styles',  $this->ujic_asset_url( 'assets/css/admin.css' ), array(), $this->ujic_asset_version( 'assets/css/admin.css' ) );
        }
    }
    
    /**
     * Anti Spam Notice
     *
     * @since     2.0.3
     *
     */
    public function showAntiSpamAdminNotice()
    {
        $screen = get_current_screen();
        $tab = $this->ujic_request_text( 'tab' );
        if($screen->id != $this->plugin_screen_hook_suffix)
            return;

        if(empty($tab) ||  $tab !== 'tab_ujic_news')
            return;
    }

    /**
     * Register and enqueue admin-specific JavaScript.
     *
     * @since     2.0
     *
     * @return    null    Return early if no settings page is registered.
     */
    public function enqueue_admin_scripts() {

        if ( !isset( $this->plugin_screen_hook_suffix ) ) {
            return;
        }
        $screen = get_current_screen();
        $tab = $this->ujic_request_text( 'tab' );
        if ( $screen->id != $this->plugin_screen_hook_suffix ) {
            return;
        }

        wp_enqueue_style( 'dashicons' );
        if ( $screen->id == $this->plugin_screen_hook_suffix && ( ! empty( $tab ) && $tab != "tab_ujic_list")) {
            wp_enqueue_script( 'dashboard' );
            wp_enqueue_script( 'jquery-ui-core' );
            wp_enqueue_script( 'jquery-ui-slider' );
            wp_enqueue_script( 'jquery-ui-draggable' );

            if( $tab != "tab_ujic_news")
            {
                wp_enqueue_script('ujicountdown-admin-icheck',  esc_url( UJICOUNTDOWN_URL ) . 'assets/js/jquery.icheck.min.js');
                wp_enqueue_script('ujicountdown-admin-script',  $this->ujic_asset_url( 'assets/js/admin-ujic.js' ), array('wp-color-picker'), $this->ujic_asset_version( 'assets/js/admin-ujic.js' ));
            }
            
            if( $tab == "tab_ujic_shortcode")
            {
                wp_enqueue_script('ujicountdown-admin-shortcode',  $this->ujic_asset_url( 'assets/js/admin-shortcode.js' ), array( 'jquery', 'ujicountdown-admin-icheck' ), $this->ujic_asset_version( 'assets/js/admin-shortcode.js' ) );
            }
        }
    }

    /**
     * Register and enqueues public-facing JavaScript files.
     *
     * @since    2.0
     */
    public function enqueue_scripts() {
        wp_register_style( 'ujicountdown-uji-countdown',  $this->ujic_asset_url( 'css/uji-countdown.css' ), array(), $this->ujic_asset_version( 'css/uji-countdown.css' ) );
        wp_register_script( 'ujicountdown-core',  $this->ujic_asset_url( 'js/jquery.countdown.js' ), array( 'jquery' ), $this->ujic_asset_version( 'js/jquery.countdown.js' ), false );

        $countdown_alias_script = '(function($){'
            . 'if(!$||!$.fn||!$.fn.countdown){return;}'
            . '$.fn.ujicCountdown=$.fn.countdown;'
            . 'if($.countdown){$.ujicCountdown=$.countdown;}'
            . '})(jQuery);';
        wp_add_inline_script( 'ujicountdown-core', $countdown_alias_script, 'after' );

        wp_register_script( 'ujicountdown-init',  $this->ujic_asset_url( 'js/uji-countdown.js' ), array( 'jquery', 'ujicountdown-core' ), $this->ujic_asset_version( 'js/uji-countdown.js' ), true );

        $countdown_compat_script = '(function($){'
            . 'if(!$||!$.fn||!$.fn.ujicCountdown){return;}'
            . 'var ujicFn=$.fn.ujicCountdown;'
            . 'var ujicManager=$.ujicCountdown||$.countdown;'
            . 'var otherFn=$.fn.countdown!==ujicFn?$.fn.countdown:null;'
            . 'if(ujicManager){$.countdown=ujicManager;}'
            . '$.fn.countdown=function(options){'
            . 'var isUjic=options&&typeof options==="object"&&("until" in options||"since" in options||"serverSync" in options||"ujic_id" in options);'
            . 'if(isUjic||!otherFn){if(ujicManager){$.countdown=ujicManager;}return ujicFn.apply(this,arguments);}'
            . 'return otherFn.apply(this,arguments);'
            . '};'
            . '})(jQuery);';
        wp_add_inline_script( 'ujicountdown-init', $countdown_compat_script, 'before' );

        wp_register_script( 'ujiCountRedirect',  $this->ujic_asset_url( 'js/uji-count-expired.js' ), array( 'jquery' ), $this->ujic_asset_version( 'js/uji-count-expired.js' ), true );
        //Extend enqueues css and js
         $extent_scripts  = apply_filters( 'ujic_scripts_extend', true);

        if( is_array( $extent_scripts ) ){
            if( !empty($extent_scripts['css']) ){
                foreach ($extent_scripts['css'] as $nm => $css){
                    wp_register_style( $nm, $css['url'], array(), $css['ver'] );
                }
            }
            if( !empty($extent_scripts['js']) ){
                foreach ($extent_scripts['js'] as $nm => $js){
                    wp_register_script( $nm, $js['url'], array( 'jquery' ), $js['ver'] );
                }
            }
        }
        

    }

    /**
     * Register the administration menu for this plugin into the WordPress Dashboard menu.
     *
     * @since    2.0
     */
    public function add_plugin_admin_menu() {
        $this->plugin_screen_hook_suffix = add_submenu_page(
                'options-general.php', ujic_plugin_name() . " " . ujic_plugin_version(), ujic_plugin_name(), 'manage_options', 'ujicountdown', array( $this, 'display_plugin_admin_page' )
        );
    }

    /**
     * Render the settings page for this plugin.
     *
     * @since    2.0
     */
    public function display_plugin_admin_page() {
        include_once( UJICOUNTDOWN . 'views/admin.php' );
    }

    /**
     * Shortcode Admin Init
     *
     * @since    2.0.4
     */
    public function ujic_shortcode_scripts() {
        $screen = get_current_screen();
        if ( $screen->base == 'post' ):
            // css
            wp_enqueue_style( 'ujic-count-ui',  esc_url( UJICOUNTDOWN_URL ) . 'assets/css/jquery-ui.min.css', false, '1.0', 'all' );
            wp_enqueue_style( 'ujic-count',  $this->ujic_asset_url( 'assets/css/ujic-style.css' ), false, $this->ujic_asset_version( 'assets/css/ujic-style.css' ), 'all' );

            // js
            wp_enqueue_script( 'jquery-ui-sortable' );
            wp_enqueue_script( 'jquery-ui-datepicker' );

            wp_localize_script( 'jquery', 'UjicShortcodes', array( 'plugin_folder' =>  esc_url( UJICOUNTDOWN_URL ) ) );

            if ( !current_user_can( 'edit_posts' ) && !current_user_can( 'edit_pages' ) )
                return;

            if ( get_user_option( 'rich_editing' ) == 'true' ) {
                 wp_localize_script('editor', 'ujic_short_vars', array(
                    'ujic_style' => $this->ujic_styles_get(),
                    'ujic_hou' => $this->ujic_datetime_get(23),
                    'ujic_min' => $this->ujic_datetime_get(59),
                    'ujic_reclab' => $this->ujic_reclab_get()
                ));
                
                add_filter( 'mce_external_plugins', array( &$this, 'ujic_add_tinymce_plugin' ) );
		add_filter( 'mce_buttons', array( &$this, 'ujic_register_my_tc_button' ) );
            }
        endif;
    }

   /**
    * get All Styles
    *
    * @since    2.0.4
    * @update   2.0.7
    */
    public function ujic_styles_get() {
        global $wpdb;
        $ujic_styles = $wpdb->get_results(  "SELECT style, title, link FROM " . $wpdb->prefix . "uji_counter ORDER BY `time` DESC" );
        $ujic_sel = array();
        if ( !empty($ujic_styles) ) {
            $i = 0;
            foreach ( $ujic_styles as $ujic ) {
                $ujic_sel[$i]['text'] =  esc_attr ( $ujic->title ) . ' - ' . esc_attr ( $ujic->style );
                $ujic_sel[$i]['value'] = esc_attr ( $ujic->link );
                $i++;
            }

         return $ujic_sel;
        }
    }
    
   /**
    * TinyMCE get Data/Time
    *
    * @since    2.0.4
    */
    public function ujic_datetime_get($nr) {
        $ujic_sel = array();
        for ( $i = 0; $i <= $nr; $i++ ) {
             $ujic_sel[$i]['text'] = $num[sprintf("%02s", $i)] = sprintf("%02s", $i);
             $ujic_sel[$i]['value'] = $num[sprintf("%02s", $i)] = sprintf("%02s", $i);
        }

        return $ujic_sel;
    }

   /**
    * TinyMCE get Unit Time labels
    *
    * @since    2.0.4
    */
    public function ujic_reclab_get() {
        $tlab = array('second'=>  __( 'Second(s)', 'ujicountdown' ),
                      'minute'=>  __( 'Minute(s)', 'ujicountdown' ),
                      'hour'=>  __('Hour(s)', 'ujicountdown' ),
                      'day'=>  __( 'Day(s)', 'ujicountdown' ),
                      'week'=>  __( 'Week(s)', 'ujicountdown' ),
                      'month'=>  __( 'Month(s)', 'ujicountdown' )
                );
        $i=0;
        foreach ( $tlab as $v => $n ) {
            $ujic_sel[$i]['text'] = $n;
            $ujic_sel[$i]['value'] = $v;
            $i++;
        }

        return $ujic_sel;
    }

   /**
    * TinyMCE Plugin JS
    *
    * @since    2.0.4
    */
    public function ujic_add_tinymce_plugin( $plugin_array ) {
        $plugin_array['ujic_tc_button'] = esc_url( UJICOUNTDOWN_URL ) . 'assets/js/ujic-popup-button.js';
        return $plugin_array;
    }
    
   /**
    * Add TyniMCE Button
    *
    * @since    2.0.4
    */
    public function ujic_register_my_tc_button( $buttons ) {
        array_push( $buttons, "ujic_tc_button" );
        return $buttons;
    }
    
   /**
    * Register widget
    *
    * @return	void
    */
    public function ujic_register_widgets() {
        // Include - no need to use autoload as WP loads them anyway
        include_once UJICOUNTDOWN . 'classes/class-uji-widget.php';

        // Register widgets
        register_widget( 'ujic_Widget' );
    }
    
   /**
    * Get options/option
    *
    * @since    2.0
    */
   public function ujic_get_option( $name, $opt = 'ujic_set' ) {
      $vars = is_array( $opt ) ? $opt : get_option( $opt, array() );
      if( is_array( $vars ) && is_string ( $name ) && isset($vars[$name]) && !empty($vars[$name]) )
         return $vars[$name];
      else
         return false;      
   }   

}
