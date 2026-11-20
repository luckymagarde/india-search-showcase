<?php
/**
 * SEO Expert India theme bootstrap.
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

define( 'SEI_THEME_VERSION', '1.0.0' );
define( 'SEI_THEME_DIR', get_template_directory() );
define( 'SEI_THEME_URI', get_template_directory_uri() );

require SEI_THEME_DIR . '/inc/setup.php';
require SEI_THEME_DIR . '/inc/icons.php';
require SEI_THEME_DIR . '/inc/assets.php';
require SEI_THEME_DIR . '/inc/navigation.php';
require SEI_THEME_DIR . '/inc/footer.php';
require SEI_THEME_DIR . '/inc/seo.php';
require SEI_THEME_DIR . '/inc/enquiry.php';
require SEI_THEME_DIR . '/inc/elementor.php';
