<?php
/**
 * Represents the view for the administration dashboard.
 *
 * This includes the header, options, and other information that should provide
 * The User Interface to the end user.
 */
?>
<div class="wrap">

    <?php if ( floatval( get_bloginfo( 'version' ) ) <= 3.9 ) screen_icon(); ?>
    <h2<?php if ( floatval( get_bloginfo( 'version' ) ) >= 3.9 ) {
        echo ' class="ujc-admin-tit"';
    } ?>><?php echo esc_html( get_admin_page_title() ); ?></h2>

    <?php
    $active_tab = isset( $_GET['tab'] ) ? ujic_clean( wp_unslash( $_GET['tab'] ) ) : 'tab_ujic_list';
    !empty($_GET['_wp_http_referer']) && false !== strpos($_GET['_wp_http_referer'], 'tab_ujic_news') ? $active_tab = 'tab_ujic_news' : null;

    $add_tab = __( 'Add New Style', 'uji-countdown' );

    if ( isset( $_GET['tab'] ) )
    {
        $active_tab = ujic_clean( wp_unslash( $_GET['tab'] ) );
        $add_tab = ( 'tab_ujic_new' == $_GET['tab'] && isset( $_GET['edit'] ) ) ? __( 'Edit style', 'uji-countdown' ) : $add_tab;
    }
    
    $tab_view = '<h2 class="nav-tab-wrapper">';
    $tab_view.= '<a href="?page=ujicountdown&amp;tab=tab_ujic_list" class="nav-tab '.($active_tab == 'tab_ujic_list' ? 'nav-tab-active' : '').'"><i class="dashicons dashicons-menu ujic-mico"></i>'. __( 'Timer Styles', 'uji-countdown' ).'</a>';
    $tab_view.= '<a href="?page=ujicountdown&amp;tab=tab_ujic_new" class="nav-tab '.($active_tab == 'tab_ujic_new' ? 'nav-tab-active' : '').'"><i class="dashicons dashicons-clock ujic-mico"></i>'. esc_html( $add_tab ).'</a>';
    
    echo $tab_view;
    
    do_action( 'admin_custom_tab' );
        
    ?>
        <a href="?page=ujicountdown&tab=tab_ujic_shortcode" class="nav-tab <?php echo ( isset($active_tab) && $active_tab == 'tab_ujic_shortcode' ? 'nav-tab-active' : '' ) ?>"><i class="dashicons dashicons-shortcode ujic-mico"></i><?php _e( 'Shortcode', 'uji-countdown' ); ?></a>
        <a href="?page=ujicountdown&tab=tab_ujic_set" class="nav-tab <?php echo ( isset($active_tab_set) && $active_tab_set == 'tab_ujic_set' ? 'nav-tab-active' : '' ) ?>"><i class="dashicons dashicons-admin-tools ujic-mico"></i><?php _e( 'Settings', 'uji-countdown' ); ?></a>
        <a href="http://www.wpmanage.com/uji-countdown" target="_blank" class="nav-tab nav-tab-pro"><i class="dashicons dashicons-plus ujic-mico"></i><?php _e( 'Add-ons', 'uji-countdown' ); ?></a>
    </h2>

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