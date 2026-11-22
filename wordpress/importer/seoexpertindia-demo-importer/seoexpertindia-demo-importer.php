<?php
/**
 * Plugin Name:       SEO Expert India – Demo Importer
 * Plugin URI:        https://www.seoexpertindia.biz/
 * Description:       One-click import of the complete SEO Expert India website: pages, Elementor layouts, media, header menu with Services mega menu, global footer and design settings. Requires the SEO Expert India theme and Elementor.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Author:            SEO Expert India
 * License:           GPL-2.0-or-later
 * Text Domain:       seoexpertindia-demo-importer
 *
 * @package SEOExpertIndiaDemoImporter
 */

defined( 'ABSPATH' ) || exit;

define( 'SEIDI_VERSION', '1.0.0' );
define( 'SEIDI_FILE', __FILE__ );
define( 'SEIDI_DIR', plugin_dir_path( __FILE__ ) );
define( 'SEIDI_URL', plugin_dir_url( __FILE__ ) );

require SEIDI_DIR . 'includes/class-seidi-importer.php';
require SEIDI_DIR . 'includes/admin.php';
