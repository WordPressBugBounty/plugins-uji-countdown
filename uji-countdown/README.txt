=== Uji Countdown ===
Contributors: ujimoto
Donate link: https://www.wpmanage.com/uji-countdown
Tags: countdown, counter, js countdown, animated countdown, timer, recurring timer
Requires at least: 4.6
Tested up to: 6.8
Stable tag: 2.3.3
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A fully-customizable HTML5 countdown timer with Block Editor support.

== Description ==

**Uji Countdown** lets you display eye-catching countdowns anywhere on your site. Drop the block or shortcode into a post, page, widget, or template and fine-tune every detail—colours, labels, animation, server vs. visitor time and more.

### Key features

* **Block Editor support** – create and preview timers visually.  
* **Recurring & repeat timers** – perfect for evergreen offers.  
* Unlimited styles with colour & size controls.  
* Switch between **server time** or **visitor time**.  
* Translate date labels and numeric separators.  
* Optional redirect or hide when the timer expires.  
* Widget area & shortcode support.  
* Multi-language date formats.  
* **Pro only:** responsive layouts, multiple timers per page, circular timer add-on.

[Demo site](https://wpmanage.com/project/ujicountdown/)

== Installation ==

1. Upload the `uji-countdown` folder to `/wp-content/plugins/`.
2. Activate the plugin via **Plugins ▸ Installed Plugins**.
3. Go to **Settings ▸ Countdown** and create a timer style.
4. Insert your timer via the **Uji Countdown** block or `[ujicountdown id="123"]` shortcode.

== Frequently Asked Questions ==

= Can I show more than one timer on a page? =  
Yes, the Pro version supports multiple timers per post, page, or widget.

= Does the timer keep accurate time if a visitor changes their computer clock? =  
Enable **Server Time** to ensure the countdown is based on your server’s clock.

== Screenshots ==

1. Block Editor – live preview of your timer.  
2. Settings – colour, font, and behaviour options.  
3. Front-end example (classic style).

== Changelog ==

= 2.3.3 =
* Fixed incompatibility with the latest WordPress and PHP versions.
* Updated bundled scripts to resolve deprecation warnings.
* Fixed an issue where deleting a timer style did not remove previously created styles.

= 2.3.2 =
* Add selected-style information in Block Editor.
* Added deprecation API to Block Editor.

= 2.3.1 =
* Data sanitisation & escaping.
* Added support for `wp_set_script_translations()` in block themes.

= 2.3 =
* **Security:** fixed XSS vulnerability.
* Fixed minor Block Editor styles.

= 2.2 =
* **New:** shortcode generator compatible with all themes.
* Miscellaneous bug fixes.

= 2.1.3 =
* Compatibility fixes.
* Added redirect-URL information in blocks.

= 2.1.2 =
* Fixed redirect-URL encoding.
* Fixed redirect link when page expired.

= 2.1.1 =
* Restored missing styles when upgrading from 2.0.x.
* Fixed block issue when switching timer type.
* Subscription add-on fix.
* Recurring-time issue fix.

= 2.1 =
* Block Editor (Gutenberg) support.
* Extension support.
* Repeat Timer – refresh on page reload.
* Fixed special-character titles.
* Removed legacy subscriptions.
* Fixed Google Font links.
* Performance improvements.

= 2.0.6 =
* Fixed date-picker arrows (month switch).
* Fixed HTTPS URL redirection.

= 2.0.5 =
* Minor bug fixes.
* Fixed multisite uninstall routine.

= 2.0.4 =
* **New:** recurring time.
* Updated TinyMCE 4.x shortcode generator.
* Fixed URL redirection after expiry.

= 2.0.3 =
* **New:** email subscription.
* Unlimited campaigns for visitor sign-ups.

= 2.0.2 =
* Fixed activation conflict.
* Added option to choose server vs. visitor time (server default).

= 2.0.1 =
* Fixed style-selection issue.

= 2.0 =
* Complete code rebuild.
* **New Admin Panel** with Google Fonts integration.
* More timer customisation (colours, sizes, RTL, quick translation).

= 1.3 =
* Fixed WordPress 3.9 colour-picker conflict (jQuery 1.10+).

= 1.2 =
* Fixed WordPress 3.5 links bug and date-picker.

= 1.1 =
* Timer now uses server time for consistency across time zones.
* Fixed `p`/`br` tag injection in some themes.
* Moved scripts to separate files for cleaner code.

= 1.0 =
* Initial stable release.

== Upgrade Notice ==

= 2.3.2 =  
Minor improvements to the Block Editor and deprecation handling. Update recommended.

== Support ==

Need help? Email **info@wpmanage.com** or open a topic on the support forum.