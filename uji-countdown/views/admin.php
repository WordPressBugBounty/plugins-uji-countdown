<?php
/**
 * Represents the view for the administration dashboard.
 *
 * This includes the header, options, and other information that should provide
 * The User Interface to the end user.
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>
<div class="wrap ujic-modern-admin">

    <?php if ( floatval( get_bloginfo( 'version' ) ) <= 3.9 ) screen_icon(); ?>
    <div class="ujic-admin-topbar">
        <span class="ujic-admin-logo">07</span>
        <div>
            <h1 class="ujic-admin-title"><?php echo esc_html( get_admin_page_title() ); ?></h1>
            <span class="ujic-admin-version"><?php echo esc_html( 'v' . ujic_plugin_version() ); ?> &middot; <?php echo esc_html( __( 'Style Builder', 'ujicountdown' ) ); ?></span>
        </div>
    </div>

    <?php
    $active_tab = isset( $_GET['tab'] ) ? sanitize_key( wp_unslash( $_GET['tab'] ) ) : 'tab_ujic_list';
    $referer    = isset( $_GET['_wp_http_referer'] ) ? sanitize_text_field( wp_unslash( $_GET['_wp_http_referer'] ) ) : '';
    ! empty( $referer ) && false !== strpos( $referer, 'tab_ujic_news' ) ? $active_tab = 'tab_ujic_news' : null;

    $add_tab = __( 'Add New Style', 'uji-countdown' );

    if ( isset( $_GET['tab'] ) )
    {
        $active_tab = sanitize_key( wp_unslash( $_GET['tab'] ) );
        $add_tab = ( 'tab_ujic_new' == $active_tab && isset( $_GET['edit'] ) ) ? __( 'Edit style', 'uji-countdown' ) : $add_tab;
    }
    
    $tab_view = '<h2 class="nav-tab-wrapper ujic-modern-tabs">';
    $tab_view.= '<a href="?page=ujicountdown&amp;tab=tab_ujic_list" class="nav-tab '.($active_tab == 'tab_ujic_list' ? 'nav-tab-active' : '').'"><i class="dashicons dashicons-menu ujic-mico"></i>'. __( 'Timer Styles', 'uji-countdown' ).'</a>';
    $tab_view.= '<a href="?page=ujicountdown&amp;tab=tab_ujic_new" class="nav-tab '.($active_tab == 'tab_ujic_new' ? 'nav-tab-active' : '').'"><i class="dashicons dashicons-clock ujic-mico"></i>'. esc_html( $add_tab ).'</a>';
    
    echo $tab_view;
    
    do_action( 'admin_custom_tab' );
        
    ?>
        <a href="?page=ujicountdown&tab=tab_ujic_shortcode" class="nav-tab <?php echo ( isset($active_tab) && $active_tab == 'tab_ujic_shortcode' ? 'nav-tab-active' : '' ) ?>"><i class="dashicons dashicons-shortcode ujic-mico"></i><?php _e( 'Shortcode', 'uji-countdown' ); ?></a>
        <a href="?page=ujicountdown&tab=tab_ujic_set" class="nav-tab <?php echo ( isset($active_tab_set) && $active_tab_set == 'tab_ujic_set' ? 'nav-tab-active' : '' ) ?>"><i class="dashicons dashicons-admin-tools ujic-mico"></i><?php _e( 'Settings', 'uji-countdown' ); ?></a>
    </h2>

    <a class="ujic-pro-banner" href="https://wpmanage.com/plugins/ujicountdown/" target="_blank" rel="noopener noreferrer">
        <img src="<?php echo esc_url( UJICOUNTDOWN_URL . 'assets/ujic-banner.png' ); ?>" alt="<?php esc_attr_e( 'Upgrade to Uji Countdown Pro', 'ujicountdown' ); ?>">
    </a>

    <?php


    $ujicount = new Uji_Countdown();
   

    if ( $active_tab == 'tab_ujic_list' ) {
        $ujicount->admin_tablelist();
    }

    if ( $active_tab == 'tab_ujic_new' ) {
        $ujicount->admin_countdown();
    }
    
    if ( $active_tab == 'tab_ujic_shortcode' ) {
        $ujicount->admin_shortcode();
    }
    
    
    //Add custom tab
    do_action( 'admin_custom_tab_funct' );
    
    
    if ( $active_tab == 'tab_ujic_set' ) {
        $ujicount->admin_timerset();
    }
    ?>

</div>
