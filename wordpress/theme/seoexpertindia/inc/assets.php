<?php
/**
 * Styles and scripts. Page styles mirror the stylesheets each original page used.
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

/** Version string that changes when a file changes (cache busting). */
function sei_asset_version( $relative ) {
	$file = SEI_THEME_DIR . '/assets/' . $relative;
	return file_exists( $file ) ? SEI_THEME_VERSION . '.' . filemtime( $file ) : SEI_THEME_VERSION;
}

/** Stylesheet handles for the current request, in original load order. */
function sei_page_styles() {
	$handles = array();
	if ( is_singular() ) {
		$handles = get_post_meta( get_queried_object_id(), '_sei_styles', true );
	}
	if ( ! is_array( $handles ) || ! $handles ) {
		// Blog, archives and new pages: the shared base used by the company pages (includes footer styles).
		$handles = array( 'sei-header', 'sei-home', 'sei-site-pages' );
	}
	return array_values( array_filter( array_map( 'sanitize_key', $handles ) ) );
}

/**
 * Cascade layers: Elementor's base stylesheet sits in a low layer so the original design
 * classes keep priority, while settings changed in the Elementor panel still apply.
 */
add_action(
	'wp_head',
	static function () {
		echo "<style id=\"sei-layer-order\">@layer elementor-base, sei-reset;</style>\n";
	},
	0
);

add_filter(
	'style_loader_tag',
	static function ( $tag, $handle, $href ) {
		if ( is_admin() || ! $href ) {
			return $tag;
		}
		if ( 'elementor-frontend' === $handle || 0 === strpos( $handle, 'widget-' ) ) {
			return sprintf( "<style id='%s-layered'>@import url('%s') layer(elementor-base);</style>\n", esc_attr( $handle ), esc_url( $href ) );
		}
		return $tag;
	},
	10,
	3
);

add_action(
	'wp_enqueue_scripts',
	static function () {
		$uri = SEI_THEME_URI . '/assets/';
		wp_enqueue_style( 'sei-fonts', 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,600&family=Space+Grotesk:wght@500;600;700&display=swap', array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
		wp_enqueue_style( 'sei-app', $uri . 'css/sei-app.css', array(), sei_asset_version( 'css/sei-app.css' ) );
		wp_enqueue_style( 'sei-elementor-reset', $uri . 'css/elementor-reset.css', array( 'sei-app' ), sei_asset_version( 'css/elementor-reset.css' ) );

		$previous = 'sei-elementor-reset';
		foreach ( sei_page_styles() as $handle ) {
			$rel = 'css/' . $handle . '.css';
			if ( ! file_exists( SEI_THEME_DIR . '/assets/' . $rel ) ) {
				continue;
			}
			wp_enqueue_style( $handle, $uri . $rel, array( $previous ), sei_asset_version( $rel ) );
			$previous = $handle;
		}
		wp_enqueue_style( 'sei-theme', $uri . 'css/theme.css', array( $previous ), sei_asset_version( 'css/theme.css' ) );

		wp_enqueue_script( 'sei-site', $uri . 'js/site.js', array(), sei_asset_version( 'js/site.js' ), array( 'in_footer' => true ) );
		wp_localize_script(
			'sei-site',
			'SEI_SITE',
			array(
				'ajaxUrl' => admin_url( 'admin-ajax.php' ),
				'action'  => 'sei_enquiry',
			)
		);
		if ( 'home' === sei_page_layout() ) {
			wp_enqueue_script( 'sei-home', $uri . 'js/home.js', array( 'sei-site' ), sei_asset_version( 'js/home.js' ), array( 'in_footer' => true ) );
		}

		// Block-theme global styles would override the original design; posts keep block styles.
		wp_dequeue_style( 'global-styles' );
		wp_dequeue_style( 'classic-theme-styles' );
		if ( sei_is_elementor_page() ) {
			wp_dequeue_style( 'wp-block-library' );
		}
	},
	20
);

/** Elementor preview: keep the original markup layout while editing. */
add_action(
	'elementor/preview/enqueue_styles',
	static function () {
		wp_enqueue_style( 'sei-editor-preview', SEI_THEME_URI . '/assets/css/editor-preview.css', array(), sei_asset_version( 'css/editor-preview.css' ) );
	}
);

add_filter(
	'wp_resource_hints',
	static function ( $urls, $relation ) {
		if ( 'preconnect' === $relation ) {
			$urls[] = array(
				'href'        => 'https://fonts.gstatic.com',
				'crossorigin' => 'anonymous',
			);
		}
		return $urls;
	},
	10,
	2
);
