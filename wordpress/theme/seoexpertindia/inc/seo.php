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

add_filter(
	'pre_get_document_title',
	static function ( $title ) {
		if ( sei_seo_plugin_active() || ! is_singular() ) {
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
		if ( sei_seo_plugin_active() ) {
			return;
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
		$schema = $id ? get_post_meta( $id, '_sei_jsonld', true ) : '';
		if ( $schema ) {
			foreach ( (array) json_decode( $schema, true ) as $block ) {
				if ( is_array( $block ) ) {
					echo '<script type="application/ld+json">' . wp_json_encode( $block, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG ) . "</script>\n";
				}
			}
		}
	},
	2
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
