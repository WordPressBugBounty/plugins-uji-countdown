<?php
/**
 * Uji Countdown Widget
 *
 * Handles front-end/shorcodes Widgets
 *
 * @author   WPmanage
 * @category Widget
 * @package  Uji-Countdown/Classes
 * @version  2.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class ujic_Widget extends WP_Widget {
   /**
     * Uji Countdown Init
     *
     * @since   2.0
     *
     * @var     string
     */
   public function __construct() {
      $widget_ops = array(
          'classname' => 'uji_Widget',
          'description' => 'Uji Countdown widget.'
      );
      //WP 4.3.0
      parent::__construct( 'uji_Widget', 'Uji Countdown', $widget_ops );

      //actions
      add_action( 'plugins_loaded', array( &$this, 'load_textdomain' ) );
      add_action( 'admin_enqueue_scripts', array( &$this, 'admin_widgets_scripts_styles' ) );
   }

   /**
     * Uji Countdown Admin Scripts
     *
     * @since   2.0
     *
     * @var     string
     */
   public function admin_widgets_scripts_styles( $page ) {
      if ( $page !== 'widgets.php' )
         return;

      wp_enqueue_script( 'jquery-ui-datepicker' );
      wp_enqueue_style( 'jquery-ui', UJICOUNTDOWN_URL . 'assets/css/jquery-ui.min.css' );
      wp_enqueue_script( 'jquery-widget', UJICOUNTDOWN_URL . 'assets/js/widget.js' );
   }
   
   /**
     * Uji Countdown Form
     *
     * @since   2.0
     *
     * @var     string
     */
   public function ujic_forms( $sel = NULL ) {
      global $wpdb;
      $table_name = $wpdb->prefix . "uji_counter";
      $ujic_datas = $wpdb->get_results( "SELECT * FROM $table_name ORDER BY `time` DESC" );
      if ( !empty( $ujic_datas ) ) {
         $ujictab = false;
         foreach ( $ujic_datas as $ujic ) {
            $type = !empty( $ujic->style ) ? $ujic->style : "classic";
            $select = (isset( $sel ) && !empty( $sel ) && $sel == $ujic->title ) ? ' selected="selected"' : '';
            $ujictab .='<option value="' . $ujic->title . '" data-type=' . $type . ' ' . $select . '> ' . $ujic->title . ' - ' . $type . ' </option>';
         }
         return $ujictab;
      } else {
         return false;
      }
   }
   
   /**
     * Uji Countdown Time select
     *
     * @since   2.0.4
     *
     * @var     string
     */
   public function ujic_times( $sel = NULL ) {
        $times = array('second'=> 'Second(s)', 'minute'=> 'Minute(s)', 'hour'=> 'Hour(s)', 'day'=> 'Day(s)', 'week'=> 'Week(s)', 'month'=> 'Month(s)');
        
        foreach ( $times as $value => $option ) {
            $select = (isset( $sel ) && !empty( $sel ) && $sel == $value ) ? ' selected="selected"' : '';
            $output .= '<option value="' . $value . '" ' . $select . '>' . $option . '</option>' . "\n";
        }
        
        return $output;
    }
   /**
     * Uji Countdown Get Time/Date
     *
     * @since   2.0
     *
     * @var     string
     */
   public function ujic_sel_datetime( $nr, $sel = null ) {
      for ( $i = 0; $i <= $nr; $i++ ) {
         $num[sprintf( "%02s", $i )] = sprintf( "%02s", $i );
      }
      $numbers = false;
      foreach ( $num as $n ) {
         $select = (isset( $sel ) && !empty( $sel ) && $sel == $n) ? ' selected="selected"' : '';
         $numbers .='<option value="' . $n . '"' . $select . '> ' . $n . ' </option>';
      }

      return $numbers;
   }
   
   /**
     * Uji Countdown Widget
     *
     * @since   2.0
     *
     * @var     string
     */
   public function widget( $args, $instance ) {
      extract( $args, EXTR_SKIP );

      /* Our variables from the widget settings. */
      $title = apply_filters( 'widget_UJI_title', $instance['UJI_title'], $instance, $this->id_base );
      $name = isset( $instance['UJI_style'] ) ? $instance['UJI_style'] : false;
      $date = isset( $instance['UJI_date'] ) ? $instance['UJI_date'] : false;
      $hour = isset( $instance['UJI_hours'] ) ? $instance['UJI_hours'] : false;
      $minut = isset( $instance['UJI_minutes'] ) ? $instance['UJI_minutes'] : false;
      $hide = isset( $instance['UJI_hide'] ) ? $instance['UJI_hide'] : false;
      $url = isset( $instance['UJI_url'] ) ? $instance['UJI_url'] : false;
      $subscr = isset( $instance['UJI_subscr'] ) ? $instance['UJI_subscr'] : false;
      $recurr = isset( $instance['UJI_recurring'] ) ? $instance['UJI_recurring'] : false;
      $rectyp = isset( $instance['UJI_rectype'] ) ? $instance['UJI_rectype'] : false;
      $repeat = isset( $instance['UJI_repeats'] ) ? $instance['UJI_repeats'] : false;
      $type = isset( $instance['UJI_type'] ) ? $instance['UJI_type'] : false;
      $timer_hr = isset( $instance['UJI_thou'] ) ? $instance['UJI_thou'] : false;
      $timer_mn = isset( $instance['UJI_tmin'] ) ? $instance['UJI_tmin'] : false;
      $timer_sc = isset( $instance['UJI_tsec'] ) ? $instance['UJI_tsec'] : false;

      $shtval = '';
      $shtval .= (!empty( $name ) ) ? ' id="' . $name . '"' : '';
      if( $type == 'ujic_type_one' ){
        $shtval .= (!empty( $date ) ) ? ' expire="' . $date . ' ' . $hour . ':' . $minut . '"' : '';
      }
      if( $type == 'ujic_type_rep' ){
        $shtval .= (!empty( $date ) ) ? ' timer="' . $timer_hr . ':' . $timer_mn . ':' . $timer_sc : '';
      }
      $shtval .= (!empty( $hide ) ) ? ' hide = "true"' : '';
      $shtval .= (!empty( $url ) ) ? ' url = "' . $url . '"' : '';
      $shtval .= (!empty( $subscr ) ) ? ' subscr = "' . trim($subscr) . '"' : '';
      $shtval .= (!empty( $recurr ) ) ? ' recurring = "' . trim($recurr) . '"' : '';
      $shtval .= (!empty( $rectyp ) ) ? ' rectype = "' . trim($rectyp) . '"' : '';
      $shtval .= (!empty( $repeat ) ) ? ' repeats = "' . trim($repeat) . '"' : '';
      
    
      $shortcode = (!empty( $shtval ) ) ? '[ujicountdown' . $shtval . ']' : '';


      if ( !empty( $shortcode ) ) {
         echo $before_widget;
         if ( $title )
            echo $before_title . $title . $after_title;
         echo do_shortcode( $shortcode );
         echo $after_widget;
      }
   }
   
   /**
     * Uji Countdown Update
     *
     * @since   2.0
     *
     * @var     string
     */
   public function update( $new_instance, $old_instance ) {
      $instance = $old_instance;
      $instance['UJI_title'] = strip_tags( $new_instance['UJI_title'] );
      $instance['UJI_style'] = strip_tags( $new_instance['UJI_style'] );
      $instance['UJI_date'] = strip_tags( $new_instance['UJI_date'] );
      $instance['UJI_hours'] = strip_tags( $new_instance['UJI_hours'] );
      $instance['UJI_minutes'] = strip_tags( $new_instance['UJI_minutes'] );
      $instance['UJI_hide'] = strip_tags( $new_instance['UJI_hide'] );
      $instance['UJI_url'] = strip_tags( $new_instance['UJI_url'] );
      $instance['UJI_subscr'] = strip_tags( $new_instance['UJI_subscr'] );
      $instance['UJI_recurring'] = strip_tags( $new_instance['UJI_recurring'] );
      $instance['UJI_rectype'] = strip_tags( $new_instance['UJI_rectype'] );
      $instance['UJI_repeats'] = strip_tags( $new_instance['UJI_repeats'] );
      
      $instance['UJI_type'] = strip_tags( $new_instance['UJI_type'] );
      $instance['UJI_thou'] = strip_tags( $new_instance['UJI_thou'] );
      $instance['UJI_tmin'] = strip_tags( $new_instance['UJI_tmin'] );
      $instance['UJI_tsec'] = strip_tags( $new_instance['UJI_tsec'] );
      

      return $instance;
   }
   
   /**
     * Uji Countdown Form
     *
     * @since   2.0
     *
     * @var     string
     */
   public function form( $instance ) {

      $defaults = array(
          'UJI_title' => '',
          'UJI_style' => false,
          'UJI_date' => '',
          'UJI_hours' => 23,
          'UJI_minutes' => 59,
          'UJI_hide' => '',
          'UJI_url' => '',
          'UJI_subscr' => '',
          'UJI_recurring' => '',
          'UJI_rectype' => '',
          'UJI_repeats' => '',
          'UJI_type' => '',
          'UJI_thou' => '',
          'UJI_tmin' => '',
          'UJI_tsec' => ''    
      );

      $instance = wp_parse_args( (array) $instance, $defaults );
      
      if ( 'Uji Countdown Pro' !== UJIC_NAME ):          
      ?>

      <div style="font-size:11px">
         <strong>Only one timer on page is allowed. </strong><br>Check the <a href="http://www.wpmanage.com/uji-countdown" target="_blank">Pro version</a> for multiple countdown timers on the same page. 
      </p>
          
      <?php endif; ?>    

      <!-- Widget Title: Text Input -->
      <div>
         <label for="<?php echo $this->get_field_id( 'UJI_title' ); ?>"><?php _e( 'Title (optional):', 'ujicountdown' ); ?></label>
         <input type="text" name="<?php echo $this->get_field_name( 'UJI_title' ); ?>"  value="<?php echo $instance['UJI_title']; ?>" class="widefat" id="<?php echo $this->get_field_id( 'UJI_title' ); ?>" />
      </div>

      <!-- Widget Select Style: Select Input -->
      <div>

      <?php if ( $this->ujic_forms() ): ?>

            <label for="<?php echo $this->get_field_id( 'UJI_style' ); ?>"><?php _e( 'Select a Style:', 'ujicountdown' ); ?></label>
            <select name="<?php echo $this->get_field_name( 'UJI_style' ); ?>" class="widefat" id="<?php echo $this->get_field_id( 'UJI_style' ); ?>">
         <?php
         echo $this->ujic_forms( $instance['UJI_style'] );
         ?>
            </select>

            <?php else: ?>        

         <h4 style="color: firebrick"><?php _e( 'Please create new timer style first.', 'ujicountdown' ); ?></h4>

      <?php endif; ?>      

      </div>
      <!-- Widget Type: Radio -->
      <div>
          <h4><?php _e( 'Timer Type:', 'ujicountdown' ); ?> </h4>
           <label style="padding-right:5px"> <input type="radio"  name="<?php echo $this->get_field_name( 'UJI_type' ); ?>" class="ujic_type_radio" <?php checked( $instance['UJI_type'], 'ujic_type_one' ) ?> value="ujic_type_one" checked="checked"> One Time Timer</label>
           <label> <input type="radio" name="<?php echo $this->get_field_name( 'UJI_type' ); ?>"  class="ujic_type_radio" <?php checked( $instance['UJI_type'], 'ujic_type_rep' ) ?> value="ujic_type_rep">Repeat Timer </label>
          
           <small style="display:block; margin:10px 0"><?php _e( '<strong>One Time Timer:</strong> Timer will countinue until expiration time <br> <strong>Repeat Timer:</strong> Timer will restart on page refresh', 'ujicountdown' ); ?></small>
      </div>
      
       <!-- Widget Date: Text Input -->
      <div class="ujict_rep" <?php if ($instance['UJI_type'] == 'ujic_type_one') echo ' style="display:none"'; ?>>
          <label style="display:block"><?php _e( 'Select Time:', 'ujicountdown' ); ?></label>
          <input type="text" name="<?php echo $this->get_field_name( 'UJI_thou' ); ?>"  value="<?php echo $instance['UJI_thou']; ?>" placeholder="Hours" class="small-text" style="min-width: 80px;" id="<?php echo $this->get_field_id( 'UJI_thou' ); ?>" />
         <input type="text" name="<?php echo $this->get_field_name( 'UJI_tmin' ); ?>"  value="<?php echo $instance['UJI_tmin']; ?>"  placeholder="Minutes" class="small-text" style="min-width: 80px;" id="<?php echo $this->get_field_id( 'UJI_tmin' ); ?>" />
         <input type="text" name="<?php echo $this->get_field_name( 'UJI_tsec' ); ?>"  value="<?php echo $instance['UJI_tsec']; ?>"  placeholder="Seconds" class="small-text" style="min-width: 80px;" id="<?php echo $this->get_field_id( 'UJI_tsec' ); ?>" />
      </div>

      <!-- Widget Date: Text Input -->
      <div class="ujict_one" <?php if ($instance['UJI_type'] == 'ujic_type_rep') echo ' style="display:none"'; ?>>
         <label for="<?php echo $this->get_field_id( 'UJI_date' ); ?>"><?php _e( 'Expire Date:', 'ujicountdown' ); ?></label>
         <input type="text" name="<?php echo $this->get_field_name( 'UJI_date' ); ?>"  value="<?php echo $instance['UJI_date']; ?>"  style="background: url('<?php echo UJICOUNTDOWN_URL ?>/assets/images/data-picker.png') no-repeat scroll right top; display:block; width: 100%;" class="widefat ujic_date" id="<?php echo $this->get_field_id( 'UJI_date' ); ?>" />
      </div>

      <!-- Widget Select Time: Select Input -->
      <div class="ujict_one" <?php if ($instance['UJI_type'] == 'ujic_type_rep') echo ' style="display:none"'; ?>>
         <label style="display:block; margin:10px 0"><?php _e( 'Select the Time:', 'ujicountdown' ); ?></label>
      <div style="display: block;">
         <div style="display: inline-block;"> 
            <h4 style="margin:0"><?php _e( 'Hour:', 'ujicountdown' ); ?> </h4>
            <select name="<?php echo $this->get_field_name( 'UJI_hours' ); ?>" style="width:50px;" id="<?php echo $this->get_field_id( 'UJI_hours' ); ?>">
      <?php
      echo $this->ujic_sel_datetime( 23, $instance['UJI_hours'] );
      ?>
            </select>
         </div>
         :
         <div style="display: inline-block;"> 
            <h4 style="margin:0"><?php _e( 'Minute:', 'ujicountdown' ); ?> </h4>
            <select name="<?php echo $this->get_field_name( 'UJI_minutes' ); ?>" style="width:50px;" id="<?php echo $this->get_field_id( 'UJI_minutes' ); ?>">
      <?php
      echo $this->ujic_sel_datetime( 59, $instance['UJI_minutes'] );
      ?>
            </select>
         </div> 
      </div> 
      </div>
      <h4><?php _e( 'After Expiry:', 'ujicountdown' ); ?> </h4>
      <!-- Widget Hide: Checkbox Input -->
      <div style="margin:15px 0">
         <label for="<?php echo $this->get_field_id( 'UJI_hide' ); ?>"><?php _e( 'Hide Countdown:', 'ujicountdown' ); ?></label>  
         <input class="ujic_exp" id="<?php echo $this->get_field_id( 'UJI_hide' ); ?>" name="<?php echo $this->get_field_name( 'UJI_hide' ); ?>" type="checkbox" value="hide" <?php checked( $instance['UJI_hide'], 'hide' ) ?> />
      </div>

      <!-- Widget Go to Link: Select Input -->
      <div>
         <label for="<?php echo $this->get_field_id( 'UJI_url' ); ?>"><?php _e( 'Or go to this link:', 'ujicountdown' ); ?></label><br />
         <small><?php _e( 'Select URL to send after expire', 'ujicountdown' ); ?></small>
         <input class="widefat ujic_link" id="<?php echo $this->get_field_id( 'UJI_url' ); ?>" name="<?php echo $this->get_field_name( 'UJI_url' ); ?>" type="text" value="<?php echo $instance['UJI_url']; ?>" />
      </div>
      
      <!-- Widget Select Reccuring Time -->
      <h4><?php _e( 'Reccuring Time:', 'ujicountdown' ); ?> </h4>
      
      <div style="display:block; float: none;">
        <span style="float:left; display: block; line-height: 28px; min-width: 55px; margin-right: 4px;"><?php _e( 'Every:', 'ujicountdown' ); ?> </span><input class="small-text" style="float:left; padding: 3px 5px;" id="<?php echo $this->get_field_id( 'UJI_recurring' ); ?>" name="<?php echo $this->get_field_name( 'UJI_recurring' ); ?>" type="text" value="<?php echo $instance['UJI_recurring']; ?>" />
        <select name="<?php echo $this->get_field_name( 'UJI_rectype' ); ?>" id="<?php echo $this->get_field_id( 'UJI_rectype' ); ?>">
        <?php
             echo $this->ujic_times($instance['UJI_rectype']);
        ?>
        </select>
        <div style="display:block; float: none;">
            <span style="float:left; display: block; line-height: 28px; min-width: 55px; margin-right: 4px;"><?php _e( 'Repeats:', 'ujicountdown' ); ?> </span><input class="small-text" style="float:left; padding: 3px 5px;" id="<?php echo $this->get_field_id( 'UJI_repeats' ); ?>" name="<?php echo $this->get_field_name( 'UJI_repeats' ); ?>" type="text" value="<?php echo $instance['UJI_repeats']; ?>" />
            <span style="display: inline-block; line-height: 28px; margin-left: 4px;"> <?php _e( 'leave it empty for unlimited', 'ujicountdown' ); ?> </span>
        </div>
      </div>
      
      <!-- Widget Campaign name -->
      
      <?php if ( defined( 'UJICSU_VERS' ) ): ?>
      
       <h4><?php _e( 'Subscription:', 'ujicountdown' ); ?> </h4>
      <div>
         <label for="<?php echo $this->get_field_id( 'UJI_subscr' ); ?>"><?php _e( 'Campaign Name:', 'ujicountdown' ); ?></label><br />
         <input class="widefat ujic_subscr" id="<?php echo $this->get_field_id( 'UJI_subscr' ); ?>" name="<?php echo $this->get_field_name( 'UJI_subscr' ); ?>" type="text" value="<?php echo $instance['UJI_subscr']; ?>" />
      </div>
      
      <?php endif; ?>

      <?php
   }

}
?>