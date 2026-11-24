<?php
/**
 * Page titles, meta descriptions, social tags and structured data.
 * Steps aside automatically when Rank Math SEO or Yoast SEO is active (the importer also fills their fields).
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

function sei_seo_plugin_active() {
	return defined( 'RANK_MATH_VERSION' ) || defined( 'WPSEO_VERSION' ) || defined( 'AIOSEO_VERSION' ) || defined( 'SEOPRESS_VERSION' );
}

/**
 * True once an SEO plugin has printed its head tags on this request. If a plugin is installed
 * but not set up yet (and prints nothing), the theme keeps printing the page's own tags.
 */
function sei_seo_plugin_printed_head() {
	return did_action( 'rank_math/head' ) || did_action( 'wpseo_head' ) || did_action( 'aioseo_head' ) || did_action( 'seopress_head' );
}

add_filter(
	'pre_get_document_title',
	static function ( $title ) {
		if ( ! is_singular() || ( sei_seo_plugin_active() && $title ) ) {
			return $title;
		}
		$custom = get_post_meta( get_queried_object_id(), '_sei_seo_title', true );
		return $custom ? $custom : $title;
	},
	20
);

add_action(
	'wp_head',
	static function () {
		if ( sei_seo_plugin_printed_head() ) {
			return;
		}
		if ( is_home() && ! is_front_page() && get_option( 'page_for_posts' ) && ! is_paged() ) {
			printf( "<link rel=\"canonical\" href=\"%s\">\n", esc_url( get_permalink( (int) get_option( 'page_for_posts' ) ) ) );
		}
		$id          = is_singular() ? get_queried_object_id() : 0;
		$description = $id ? get_post_meta( $id, '_sei_seo_description', true ) : get_bloginfo( 'description' );
		if ( ! $description && $id && has_excerpt( $id ) ) {
			$description = get_the_excerpt( $id );
		}
		$title = wp_get_document_title();
		$url   = $id ? get_permalink( $id ) : home_url( add_query_arg( array() ) );
		if ( $description ) {
			printf( "<meta name=\"description\" content=\"%s\">\n", esc_attr( $description ) );
		}
		$robots = $id ? get_post_meta( $id, '_sei_seo_robots', true ) : '';
		if ( $robots && '0' !== get_option( 'blog_public' ) ) {
			printf( "<meta name=\"robots\" content=\"%s\">\n", esc_attr( $robots ) );
		}
		$og = array(
			'og:type'        => $id && is_front_page() ? 'website' : ( is_single() ? 'article' : 'website' ),
			'og:title'       => $id ? ( get_post_meta( $id, '_sei_og_title', true ) ? get_post_meta( $id, '_sei_og_title', true ) : $title ) : $title,
			'og:description' => $id ? ( get_post_meta( $id, '_sei_og_description', true ) ? get_post_meta( $id, '_sei_og_description', true ) : $description ) : $description,
			'og:url'         => $url,
			'og:site_name'   => get_bloginfo( 'name' ),
		);
		$image = $id && has_post_thumbnail( $id ) ? get_the_post_thumbnail_url( $id, 'large' ) : '';
		if ( $image ) {
			$og['og:image'] = $image;
		}
		foreach ( $og as $property => $content ) {
			if ( $content ) {
				printf( "<meta property=\"%s\" content=\"%s\">\n", esc_attr( $property ), esc_attr( $content ) );
			}
		}
		echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
		if ( $image ) {
			printf( "<meta name=\"twitter:image\" content=\"%s\">\n", esc_url( $image ) );
		}
		sei_print_jsonld( $id, false );
	},
	2
);

/**
 * Page structured data. With an SEO plugin active (e.g. Rank Math), the plugin outputs the
 * site-wide types, so only page-specific types (Service, FAQPage, …) are printed to avoid duplicates.
 */
function sei_print_jsonld( $id, $page_specific_only ) {
	$schema = $id ? get_post_meta( $id, '_sei_jsonld', true ) : '';
	if ( ! $schema ) {
		return;
	}
	$sitewide = array( 'Organization', 'WebSite', 'WebPage', 'BreadcrumbList', 'Person', 'LocalBusiness' );
	$keep     = static function ( $node ) use ( $sitewide, $page_specific_only ) {
		$types = (array) ( $node['@type'] ?? array() );
		return ! $page_specific_only || ! array_intersect( $types, $sitewide );
	};
	foreach ( (array) json_decode( $schema, true ) as $block ) {
		if ( ! is_array( $block ) ) {
			continue;
		}
		if ( isset( $block['@graph'] ) && is_array( $block['@graph'] ) ) {
			$block['@graph'] = array_values( array_filter( $block['@graph'], $keep ) );
			if ( ! $block['@graph'] ) {
				continue;
			}
		} elseif ( ! $keep( $block ) ) {
			continue;
		}
		echo '<script type="application/ld+json">' . wp_json_encode( $block, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG ) . "</script>\n";
	}
}

add_action(
	'wp_head',
	static function () {
		if ( sei_seo_plugin_printed_head() && is_singular() ) {
			sei_print_jsonld( get_queried_object_id(), true );
		}
	},
	30
);

/** Editable SEO fields on pages and posts. */
add_action(
	'add_meta_boxes',
	static function () {
		foreach ( array( 'page', 'post' ) as $type ) {
			add_meta_box( 'sei_seo', __( 'SEO Expert India – SEO', 'seoexpertindia' ), 'sei_seo_metabox', $type, 'normal', 'low' );
		}
	}
);

function sei_seo_metabox( $post ) {
	wp_nonce_field( 'sei_seo_save', 'sei_seo_nonce' );
	$title = get_post_meta( $post->ID, '_sei_seo_title', true );
	$desc  = get_post_meta( $post->ID, '_sei_seo_description', true );
	if ( sei_seo_plugin_active() ) {
		echo '<p>' . esc_html__( 'An SEO plugin is active, so edit the title and description in that plugin. These fields are kept as a backup.', 'seoexpertindia' ) . '</p>';
	}
	echo '<p><label for="sei_seo_title"><strong>' . esc_html__( 'Page title (browser tab and search results)', 'seoexpertindia' ) . '</strong></label><br>';
	echo '<input type="text" class="widefat" id="sei_seo_title" name="sei_seo_title" value="' . esc_attr( $title ) . '"></p>';
	echo '<p><label for="sei_seo_description"><strong>' . esc_html__( 'Meta description', 'seoexpertindia' ) . '</strong></label><br>';
	echo '<textarea class="widefat" rows="3" id="sei_seo_description" name="sei_seo_description">' . esc_textarea( $desc ) . '</textarea></p>';
}

add_action(
	'save_post',
	static function ( $post_id ) {
		if ( ! isset( $_POST['sei_seo_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['sei_seo_nonce'] ) ), 'sei_seo_save' ) ) {
			return;
		}
		if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
		update_post_meta( $post_id, '_sei_seo_title', sanitize_text_field( wp_unslash( $_POST['sei_seo_title'] ?? '' ) ) );
		update_post_meta( $post_id, '_sei_seo_description', sanitize_textarea_field( wp_unslash( $_POST['sei_seo_description'] ?? '' ) ) );
	}
);
