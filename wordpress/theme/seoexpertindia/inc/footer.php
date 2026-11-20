<?php
/**
 * Global footer: Elementor Pro theme-builder footer when assigned, otherwise the imported
 * "SEO Expert India Footer" Elementor template, otherwise a built-in copy of the original footer.
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

function sei_render_footer() {
	if ( function_exists( 'elementor_theme_do_location' ) && elementor_theme_do_location( 'footer' ) ) {
		return;
	}
	$layout  = sei_page_layout();
	$company = ! in_array( $layout, array( 'home', 'service-seo', 'service-dev' ), true );
	echo '<div class="sei-footer' . ( $company ? ' sei-footer--company' : '' ) . '">';
	$template = (int) get_option( 'sei_footer_template_id' );
	if ( $template && did_action( 'elementor/loaded' ) && 'publish' === get_post_status( $template ) ) {
		echo \Elementor\Plugin::$instance->frontend->get_builder_content_for_display( $template, true ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	} else {
		get_template_part( 'template-parts/footer-fallback' );
	}
	echo '</div>';
}
