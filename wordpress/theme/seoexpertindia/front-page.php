<?php
/**
 * Front page. Elementor pages print their sections directly (as on the original site);
 * other pages use the site's standard content layout.
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

get_header();
while ( have_posts() ) {
	the_post();
	if ( sei_is_elementor_page() ) {
		the_content();
	} else {
		get_template_part( 'template-parts/content', 'page' );
	}
}
get_footer();
