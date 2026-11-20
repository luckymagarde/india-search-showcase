<?php
/**
 * Theme supports, menus and small front-end behaviours.
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'after_setup_theme',
	static function () {
		load_theme_textdomain( 'seoexpertindia', SEI_THEME_DIR . '/languages' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' ) );
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 72,
				'width'       => 211,
				'flex-height' => true,
				'flex-width'  => true,
			)
		);
		// Elementor Pro theme builder locations (header/footer) are supported.
		add_theme_support( 'elementor' );
		register_nav_menus(
			array(
				'primary' => __( 'Primary menu (header with Services mega menu)', 'seoexpertindia' ),
			)
		);
		$GLOBALS['content_width'] = 1240;
	}
);

/** Elementor Pro: let the theme builder override the footer location. */
add_action(
	'elementor/theme/register_locations',
	static function ( $manager ) {
		$manager->register_location( 'footer' );
	}
);

/**
 * /service/ is only the parent of the service pages; send visitors to the Services overview.
 */
add_action(
	'template_redirect',
	static function () {
		if ( is_page() && 'service' === get_post_field( 'post_name', get_queried_object_id() ) && ! get_post_field( 'post_parent', get_queried_object_id() ) ) {
			$services = get_page_by_path( 'services' );
			if ( $services ) {
				wp_safe_redirect( get_permalink( $services ), 301 );
				exit;
			}
		}
	}
);

/** Body classes used by the original page styles. */
add_filter(
	'body_class',
	static function ( $classes ) {
		$layout = sei_page_layout();
		$classes[] = 'sei-site';
		if ( $layout ) {
			$classes[] = 'sei-layout-' . sanitize_html_class( $layout );
		}
		return $classes;
	}
);

/**
 * Layout recorded by the demo importer for the current page (home, company, service-seo, service-dev).
 */
function sei_page_layout() {
	if ( ! is_singular() ) {
		return '';
	}
	return (string) get_post_meta( get_queried_object_id(), '_sei_layout', true );
}

/** Whether the current singular page is rendered by Elementor. */
function sei_is_elementor_page( $post_id = 0 ) {
	$post_id = $post_id ? $post_id : get_queried_object_id();
	if ( ! $post_id || ! did_action( 'elementor/loaded' ) ) {
		return false;
	}
	$document = \Elementor\Plugin::$instance->documents->get( $post_id );
	return $document && $document->is_built_with_elementor();
}
