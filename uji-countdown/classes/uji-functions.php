<?php
/**
 * Get all saved styles
 *
 * @since    2.1.3
 * 
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Clean variables using sanitize_text_field. Arrays are cleaned recursively.
 */
function ujic_clean( $var ) {
	if ( is_array( $var ) ) {
		return array_map( 'ujic_clean', $var );
	} else {
		return is_scalar( $var ) ? sanitize_text_field( $var ) : $var;
	}
}

/**
 * Escape JSON for use on HTML or attribute text nodes.
 */
function ujic_esc_json( $json, $html = false ) {
	return _wp_specialchars(
		$json,
		$html ? ENT_NOQUOTES : ENT_QUOTES, // Escape quotes in attribute nodes only.
		'UTF-8',                           // json_encode() outputs UTF-8 (really just ASCII), not the blog's charset.
		true                               // Double escape entities: `&amp;` -> `&amp;amp;`.
	);
}

function ujic_styles_get( $first = '') {
        global $wpdb;
        $ujic_styles = $wpdb->get_results( "SELECT style, title, link FROM " . $wpdb->prefix . "uji_counter ORDER BY `time` DESC" );
        $ujic_sel = array();
        
        if ( !empty($ujic_styles) ) {
            foreach ( $ujic_styles as $ujic ) {
                $ujic_sel[$ujic->link] =  $ujic->title;
            }

         if($first){
                 $selop = array( '' => $first );
                 $ujic_sel = array_merge($selop, $ujic_sel);
         }   
         return $ujic_sel;
        }
}
        
        
function ujic_datetime_get($nr) {
        $ujic_sel = array();
        for ( $i = 0; $i <= $nr; $i++ ) {
             $ujic_sel[$i]['text'] = $num[sprintf("%02s", $i)] = sprintf("%02s", $i);
             $ujic_sel[$i]['value'] = $i;
        }

        return $ujic_sel;
}

function ujic_reclab_get() {
        $tlab = array('second'=>  __( 'Second(s)', 'ujicountdown' ),
                      'minute'=>  __( 'Minute(s)', 'ujicountdown' ),
                      'hour'=>  __('Hour(s)', 'ujicountdown' ),
                      'day'=>  __( 'Day(s)', 'ujicountdown' ),
                      'week'=>  __( 'Week(s)', 'ujicountdown' ),
                      'month'=>  __( 'Month(s)', 'ujicountdown' ));
        $i=0;
        foreach ( $tlab as $v => $n ) {
            $ujic_sel[$i]['text'] = $n;
            $ujic_sel[$i]['value'] = $v;
            $i++;
        }

        return $ujic_sel;
    }

?>