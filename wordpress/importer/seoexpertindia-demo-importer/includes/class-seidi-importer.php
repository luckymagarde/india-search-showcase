<?php
/**
 * Import engine. Every imported item is tagged with a stable key, so running the import again
 * updates the same pages, media, menu and template instead of creating duplicates.
 *
 * @package SEOExpertIndiaDemoImporter
 */

defined( 'ABSPATH' ) || exit;

class SEIDI_Importer {

	const META_KEY      = '_seidi_key';
	const MEDIA_BATCH   = 8;
	const PAGE_BATCH    = 3;
	const MENU_NAME     = 'SEO Expert India – Primary';
	const REPORT_OPTION = 'seidi_report';
	const MAP_OPTION    = 'seidi_media_map';

	/** Ordered import steps. */
	const STEPS = array( 'start', 'media', 'pages', 'footer', 'menu', 'settings', 'finish' );

	private $manifest;

	public function manifest() {
		if ( null === $this->manifest ) {
			$file           = SEIDI_DIR . 'data/manifest.json';
			$this->manifest = file_exists( $file ) ? json_decode( (string) file_get_contents( $file ), true ) : null; // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		}
		return is_array( $this->manifest ) ? $this->manifest : array();
	}

	/* ------------------------------------------------------------------ checks */

	/** System requirements and plugin status for the dashboard. */
	public function requirements() {
		$memory = wp_convert_hr_to_bytes( (string) ini_get( 'memory_limit' ) );
		$upload = wp_upload_dir();
		$theme  = wp_get_theme();
		$el_ok  = defined( 'ELEMENTOR_VERSION' );
		return array(
			array( 'label' => __( 'SEO Expert India theme active', 'seoexpertindia-demo-importer' ), 'ok' => 'seoexpertindia' === $theme->get_template(), 'required' => true, 'value' => $theme->get( 'Name' ) ),
			array( 'label' => __( 'Elementor plugin active (version 3.16 or newer)', 'seoexpertindia-demo-importer' ), 'ok' => $el_ok && version_compare( ELEMENTOR_VERSION, '3.16', '>=' ), 'required' => true, 'value' => $el_ok ? ELEMENTOR_VERSION : __( 'Not active', 'seoexpertindia-demo-importer' ) ),
			array( 'label' => __( 'Elementor Pro (recommended, for theme-builder footer and Pro widgets)', 'seoexpertindia-demo-importer' ), 'ok' => defined( 'ELEMENTOR_PRO_VERSION' ), 'required' => false, 'value' => defined( 'ELEMENTOR_PRO_VERSION' ) ? ELEMENTOR_PRO_VERSION : __( 'Not active', 'seoexpertindia-demo-importer' ) ),
			array( 'label' => __( 'Rank Math SEO', 'seoexpertindia-demo-importer' ), 'ok' => defined( 'RANK_MATH_VERSION' ), 'required' => false, 'value' => defined( 'RANK_MATH_VERSION' ) ? RANK_MATH_VERSION : __( 'Not active – the theme outputs titles, descriptions and schema itself', 'seoexpertindia-demo-importer' ) ),
			array( 'label' => __( 'PHP 8.0 or newer', 'seoexpertindia-demo-importer' ), 'ok' => version_compare( PHP_VERSION, '8.0', '>=' ), 'required' => true, 'value' => PHP_VERSION ),
			array( 'label' => __( 'WordPress 6.4 or newer', 'seoexpertindia-demo-importer' ), 'ok' => version_compare( get_bloginfo( 'version' ), '6.4', '>=' ), 'required' => true, 'value' => get_bloginfo( 'version' ) ),
			array( 'label' => __( 'PHP memory limit 128 MB or more', 'seoexpertindia-demo-importer' ), 'ok' => $memory <= 0 || $memory >= 128 * MB_IN_BYTES, 'required' => false, 'value' => (string) ini_get( 'memory_limit' ) ),
			array( 'label' => __( 'Uploads folder writable', 'seoexpertindia-demo-importer' ), 'ok' => empty( $upload['error'] ) && wp_is_writable( $upload['basedir'] ), 'required' => true, 'value' => empty( $upload['error'] ) ? $upload['basedir'] : $upload['error'] ),
			array( 'label' => __( 'Demo content files present', 'seoexpertindia-demo-importer' ), 'ok' => (bool) $this->manifest(), 'required' => true, 'value' => $this->manifest() ? sprintf( '%d pages, %d images', count( $this->manifest()['pages'] ), count( $this->manifest()['media'] ) ) : __( 'Missing data/manifest.json', 'seoexpertindia-demo-importer' ) ),
		);
	}

	public function requirements_met() {
		foreach ( $this->requirements() as $row ) {
			if ( $row['required'] && ! $row['ok'] ) {
				return false;
			}
		}
		return true;
	}

	/** Existing pages (not created by this importer) whose address the import will take over. */
	public function conflicts() {
		$out = array();
		foreach ( $this->manifest()['pages'] ?? array() as $page ) {
			if ( '' === $page['slug'] ) {
				continue;
			}
			$existing = get_page_by_path( trim( $page['path'], '/' ) );
			if ( $existing && ! get_post_meta( $existing->ID, self::META_KEY, true ) ) {
				$out[] = $existing->post_title . ' (' . $page['path'] . ')';
			}
		}
		return $out;
	}

	/* ------------------------------------------------------------------ steps */

	/**
	 * Runs one batch of a step. Returns [ next_step, next_offset, message ].
	 */
	public function run( $step, $offset ) {
		if ( function_exists( 'set_time_limit' ) ) {
			@set_time_limit( 120 ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
		}
		wp_raise_memory_limit( 'admin' );
		switch ( $step ) {
			case 'start':
				return $this->step_start();
			case 'media':
				return $this->step_media( $offset );
			case 'pages':
				return $this->step_pages( $offset );
			case 'footer':
				return $this->step_footer();
			case 'menu':
				return $this->step_menu();
			case 'settings':
				return $this->step_settings();
			case 'finish':
				return $this->step_finish();
		}
		throw new RuntimeException( 'Unknown step' );
	}

	/** Progress (0–100) for a step/offset pair. */
	public function progress( $step, $offset ) {
		$m      = $this->manifest();
		$media  = max( 1, count( $m['media'] ?? array() ) );
		$pages  = max( 1, count( $m['pages'] ?? array() ) );
		$ranges = array(
			'start'    => array( 0, 2 ),
			'media'    => array( 2, 45 ),
			'pages'    => array( 45, 90 ),
			'footer'   => array( 90, 93 ),
			'menu'     => array( 93, 96 ),
			'settings' => array( 96, 99 ),
			'finish'   => array( 99, 100 ),
			'done'     => array( 100, 100 ),
		);
		list( $a, $b ) = $ranges[ $step ] ?? array( 0, 0 );
		$fraction      = 'media' === $step ? $offset / $media : ( 'pages' === $step ? $offset / $pages : 0 );
		return (int) round( $a + ( $b - $a ) * min( 1, $fraction ) );
	}

	private function report( $key, $increment = 1 ) {
		$report                       = get_option( self::REPORT_OPTION, array() );
		$report['counts'][ $key ]     = ( $report['counts'][ $key ] ?? 0 ) + $increment;
		update_option( self::REPORT_OPTION, $report, false );
	}

	private function report_error( $message ) {
		$report             = get_option( self::REPORT_OPTION, array() );
		$report['errors'][] = $message;
		update_option( self::REPORT_OPTION, $report, false );
	}

	private function step_start() {
		if ( ! $this->requirements_met() ) {
			throw new RuntimeException( __( 'Requirements are not met. Please fix the items marked in red.', 'seoexpertindia-demo-importer' ) );
		}
		update_option(
			self::REPORT_OPTION,
			array(
				'started' => time(),
				'status'  => 'running',
				'version' => SEIDI_VERSION,
				'counts'  => array(),
				'errors'  => array(),
			),
			false
		);
		if ( ! get_option( self::MAP_OPTION ) ) {
			update_option( self::MAP_OPTION, array(), false );
		}
		return array( 'media', 0, __( 'Checks passed. Importing images…', 'seoexpertindia-demo-importer' ) );
	}

	private function find_by_key( $key, $post_type ) {
		$ids = get_posts(
			array(
				'post_type'      => $post_type,
				'post_status'    => 'any',
				'meta_key'       => self::META_KEY, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
				'meta_value'     => $key, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
				'fields'         => 'ids',
				'posts_per_page' => 1,
				'no_found_rows'  => true,
			)
		);
		return $ids ? (int) $ids[0] : 0;
	}

	private function step_media( $offset ) {
		require_once ABSPATH . 'wp-admin/includes/image.php';
		$items  = $this->manifest()['media'];
		$map    = (array) get_option( self::MAP_OPTION, array() );
		$upload = wp_upload_dir();
		$dir    = trailingslashit( $upload['basedir'] ) . 'seoexpertindia-demo';
		wp_mkdir_p( $dir );
		$batch = array_slice( $items, $offset, self::MEDIA_BATCH );
		foreach ( $batch as $item ) {
			$key  = 'media:' . $item['key'];
			$id   = $this->find_by_key( $key, 'attachment' );
			$dest = $dir . '/' . $item['file'];
			$src  = SEIDI_DIR . 'data/media/' . $item['file'];
			if ( $id && file_exists( (string) get_attached_file( $id ) ) ) {
				$map[ $item['key'] ] = array( 'id' => $id, 'url' => wp_get_attachment_url( $id ) );
				$this->report( 'media_existing' );
				continue;
			}
			if ( ! file_exists( $src ) || ! copy( $src, $dest ) ) {
				$this->report_error( sprintf( 'Image %s could not be copied.', $item['file'] ) );
				continue;
			}
			$type = wp_check_filetype( $item['file'], array_merge( wp_get_mime_types(), array( 'svg' => 'image/svg+xml', 'webp' => 'image/webp' ) ) );
			$args = array(
				'post_title'     => sanitize_text_field( $item['alt'] ? $item['alt'] : pathinfo( $item['file'], PATHINFO_FILENAME ) ),
				'post_mime_type' => $type['type'] ? $type['type'] : 'image/png',
				'post_status'    => 'inherit',
				'guid'           => trailingslashit( $upload['baseurl'] ) . 'seoexpertindia-demo/' . $item['file'],
			);
			if ( $id ) {
				$args['ID'] = $id;
			}
			$id = wp_insert_attachment( $args, $dest, 0, true );
			if ( is_wp_error( $id ) ) {
				$this->report_error( $item['file'] . ': ' . $id->get_error_message() );
				continue;
			}
			update_post_meta( $id, self::META_KEY, $key );
			update_post_meta( $id, '_wp_attachment_image_alt', sanitize_text_field( $item['alt'] ) );
			if ( 'image/svg+xml' !== $args['post_mime_type'] ) {
				wp_update_attachment_metadata( $id, wp_generate_attachment_metadata( $id, $dest ) );
			}
			$map[ $item['key'] ] = array( 'id' => $id, 'url' => wp_get_attachment_url( $id ) );
			$this->report( 'media_imported' );
		}
		update_option( self::MAP_OPTION, $map, false );
		$next = $offset + count( $batch );
		if ( $next < count( $items ) ) {
			/* translators: 1: done, 2: total. */
			return array( 'media', $next, sprintf( __( 'Images %1$d of %2$d imported…', 'seoexpertindia-demo-importer' ), $next, count( $items ) ) );
		}
		return array( 'pages', 0, __( 'Images ready. Creating pages…', 'seoexpertindia-demo-importer' ) );
	}

	/** Replaces site and media placeholders in imported data. */
	public function resolve( $value ) {
		static $map = null;
		if ( null === $map ) {
			$map = (array) get_option( self::MAP_OPTION, array() );
		}
		if ( is_array( $value ) ) {
			foreach ( $value as $k => $v ) {
				$value[ $k ] = $this->resolve( $v );
			}
			return $value;
		}
		if ( ! is_string( $value ) || false === strpos( $value, '{{SEI_' ) ) {
			return $value;
		}
		if ( preg_match( '/^\{\{SEI_MEDIA_ID:([^}]+)\}\}$/', $value, $m ) ) {
			return (int) ( $map[ $m[1] ]['id'] ?? 0 );
		}
		$value = str_replace( '{{SEI_HOME}}', untrailingslashit( home_url() ), $value );
		return preg_replace_callback(
			'/\{\{SEI_MEDIA:([^}]+)\}\}/',
			static function ( $m ) use ( $map ) {
				return $map[ $m[1] ]['url'] ?? '';
			},
			$value
		);
	}

	/** Saves Elementor data on a post. */
	private function save_elementor( $post_id, array $data, $template_type ) {
		update_post_meta( $post_id, '_elementor_edit_mode', 'builder' );
		update_post_meta( $post_id, '_elementor_template_type', $template_type );
		update_post_meta( $post_id, '_elementor_version', defined( 'ELEMENTOR_VERSION' ) ? ELEMENTOR_VERSION : '3.16.0' );
		update_post_meta( $post_id, '_elementor_data', wp_slash( wp_json_encode( $data ) ) );
		delete_post_meta( $post_id, '_elementor_css' );
		delete_post_meta( $post_id, '_elementor_element_cache' );
		delete_post_meta( $post_id, '_elementor_page_assets' );
	}

	private function upsert_page( $key, $title, $slug, $parent, $status = 'publish' ) {
		$id = $this->find_by_key( 'page:' . $key, 'page' );
		if ( ! $id ) {
			$path     = $parent ? get_post_field( 'post_name', $parent ) . '/' . $slug : $slug;
			$existing = '' !== $slug ? get_page_by_path( $path ) : null;
			$id       = $existing ? (int) $existing->ID : 0;
		}
		$args = array(
			'post_type'      => 'page',
			'post_title'     => $title,
			'post_name'      => $slug,
			'post_parent'    => $parent,
			'post_status'    => $status,
			'comment_status' => 'closed',
			'ping_status'    => 'closed',
		);
		if ( $id ) {
			$args['ID'] = $id;
			$result     = wp_update_post( wp_slash( $args ), true );
			$this->report( 'pages_updated' );
		} else {
			$args['post_content'] = '';
			$result               = wp_insert_post( wp_slash( $args ), true );
			$this->report( 'pages_created' );
		}
		if ( is_wp_error( $result ) ) {
			throw new RuntimeException( $title . ': ' . $result->get_error_message() );
		}
		update_post_meta( (int) $result, self::META_KEY, 'page:' . $key );
		return (int) $result;
	}

	private function step_pages( $offset ) {
		$pages = $this->manifest()['pages'];
		if ( 0 === $offset ) {
			// Parent for /service/… addresses; visitors to /service/ are redirected to /services/.
			$parent = $this->upsert_page( 'service', 'Service', 'service', 0 );
			update_option( 'seidi_service_parent', $parent, false );
		}
		$parent_id = (int) get_option( 'seidi_service_parent' );
		$batch     = array_slice( $pages, $offset, self::PAGE_BATCH );
		foreach ( $batch as $page ) {
			$file = SEIDI_DIR . 'data/pages/' . $page['key'] . '.json';
			$data = json_decode( (string) file_get_contents( $file ), true ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
			if ( ! is_array( $data ) ) {
				$this->report_error( sprintf( 'Layout for %s could not be read.', $page['path'] ) );
				continue;
			}
			$slug = '' === $page['slug'] ? 'home' : $page['slug'];
			$id   = $this->upsert_page( $page['key'], $page['title'], $slug, 'service' === $page['parent'] ? $parent_id : 0 );
			$this->save_elementor( $id, $this->resolve( $data ), 'wp-page' );
			update_post_meta( $id, '_wp_page_template', 'default' );
			update_post_meta( $id, '_sei_layout', $page['layout'] );
			update_post_meta( $id, '_sei_styles', $page['styles'] );
			$seo = $this->resolve( $page['seo'] );
			update_post_meta( $id, '_sei_seo_title', $seo['title'] );
			update_post_meta( $id, '_sei_seo_description', $seo['description'] );
			update_post_meta( $id, '_sei_seo_robots', $seo['robots'] );
			update_post_meta( $id, '_sei_og_title', $seo['og_title'] );
			update_post_meta( $id, '_sei_og_description', $seo['og_description'] );
			$blocks = array();
			foreach ( (array) $seo['jsonld'] as $json ) {
				$decoded = json_decode( $json, true );
				if ( is_array( $decoded ) ) {
					$blocks[] = $decoded;
				}
			}
			update_post_meta( $id, '_sei_jsonld', wp_slash( wp_json_encode( $blocks, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) ) );
			// Rank Math / Yoast fields, so titles and descriptions carry over if either plugin is used.
			update_post_meta( $id, 'rank_math_title', $seo['title'] );
			update_post_meta( $id, 'rank_math_description', $seo['description'] );
			update_post_meta( $id, '_yoast_wpseo_title', $seo['title'] );
			update_post_meta( $id, '_yoast_wpseo_metadesc', $seo['description'] );
			if ( ! empty( $seo['og_image'] ) ) {
				$thumb = attachment_url_to_postid( $seo['og_image'] );
				if ( $thumb ) {
					set_post_thumbnail( $id, $thumb );
				}
			}
			if ( '' === $page['slug'] ) {
				update_option( 'seidi_home_page', $id, false );
			}
		}
		$next = $offset + count( $batch );
		if ( $next < count( $pages ) ) {
			/* translators: 1: done, 2: total. */
			return array( 'pages', $next, sprintf( __( 'Pages %1$d of %2$d created…', 'seoexpertindia-demo-importer' ), $next, count( $pages ) ) );
		}
		return array( 'footer', 0, __( 'Pages ready. Importing the footer…', 'seoexpertindia-demo-importer' ) );
	}

	private function step_footer() {
		$data = json_decode( (string) file_get_contents( SEIDI_DIR . 'data/footer.json' ), true ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		$pro  = defined( 'ELEMENTOR_PRO_VERSION' );
		$type = $pro ? 'footer' : 'section';
		$id   = $this->find_by_key( 'template:footer', 'elementor_library' );
		$args = array(
			'post_type'   => 'elementor_library',
			'post_title'  => 'SEO Expert India Footer',
			'post_status' => 'publish',
		);
		if ( $id ) {
			$args['ID'] = $id;
			$id         = wp_update_post( $args, true );
			$this->report( 'templates_updated' );
		} else {
			$id = wp_insert_post( $args, true );
			$this->report( 'templates_created' );
		}
		if ( is_wp_error( $id ) ) {
			throw new RuntimeException( $id->get_error_message() );
		}
		update_post_meta( $id, self::META_KEY, 'template:footer' );
		$this->save_elementor( $id, $this->resolve( (array) $data ), $type );
		wp_set_object_terms( $id, $type, 'elementor_library_type' );
		if ( $pro ) {
			update_post_meta( $id, '_elementor_conditions', array( 'include/general' ) );
			$conditions = (array) get_option( 'elementor_pro_theme_builder_conditions', array() );
			$conditions['footer'][ $id ] = array( 'include/general' );
			update_option( 'elementor_pro_theme_builder_conditions', $conditions );
		}
		update_option( 'sei_footer_template_id', $id );
		return array( 'menu', 0, __( 'Footer ready. Building the menu…', 'seoexpertindia-demo-importer' ) );
	}

	private function page_id_for_path( $path ) {
		if ( '/' === $path ) {
			return (int) get_option( 'seidi_home_page' );
		}
		if ( '/blog/' === $path ) {
			return (int) get_option( 'page_for_posts' );
		}
		$page = get_page_by_path( trim( $path, '/' ) );
		return $page ? (int) $page->ID : 0;
	}

	private function add_menu_item( $menu_id, $title, $path, $parent = 0, $icon = '' ) {
		$page_id = $path ? $this->page_id_for_path( $path ) : 0;
		$args    = array(
			'menu-item-title'     => $title,
			'menu-item-status'    => 'publish',
			'menu-item-parent-id' => $parent,
			'menu-item-classes'   => $icon ? 'sei-icon-' . $icon : '',
		);
		if ( $page_id ) {
			$args += array(
				'menu-item-object-id' => $page_id,
				'menu-item-object'    => 'page',
				'menu-item-type'      => 'post_type',
			);
		} else {
			$args += array(
				'menu-item-type' => 'custom',
				'menu-item-url'  => $path ? home_url( $path ) : '#',
			);
		}
		$id = wp_update_nav_menu_item( $menu_id, 0, $args );
		if ( is_wp_error( $id ) ) {
			throw new RuntimeException( $id->get_error_message() );
		}
		return (int) $id;
	}

	private function ensure_blog_page() {
		$id = $this->upsert_page( 'blog', 'Blog', 'blog', 0 );
		update_option( 'page_for_posts', $id );
		delete_post_meta( $id, '_elementor_edit_mode' );
		return $id;
	}

	private function step_menu() {
		$this->ensure_blog_page();
		$menu = wp_get_nav_menu_object( self::MENU_NAME );
		$menu_id = $menu ? (int) $menu->term_id : (int) wp_create_nav_menu( self::MENU_NAME );
		if ( is_wp_error( $menu_id ) || ! $menu_id ) {
			throw new RuntimeException( __( 'The menu could not be created.', 'seoexpertindia-demo-importer' ) );
		}
		// Rebuild the importer's own menu so repeated imports never duplicate items.
		foreach ( (array) wp_get_nav_menu_items( $menu_id, array( 'post_status' => 'any' ) ) as $item ) {
			wp_delete_post( $item->ID, true );
		}
		$structure = $this->manifest()['menu'];
		foreach ( $structure['top'] as $entry ) {
			list( $title, $path ) = $entry;
			$item = $this->add_menu_item( $menu_id, $title, $path );
			if ( '/services/' === $path ) {
				foreach ( $structure['mega'] as $category ) {
					$cat = $this->add_menu_item( $menu_id, $category['title'], '', $item, $category['icon'] );
					foreach ( $category['items'] as $link ) {
						$this->add_menu_item( $menu_id, $link['title'], $link['path'], $cat, $link['icon'] );
					}
				}
			}
		}
		$locations            = (array) get_theme_mod( 'nav_menu_locations', array() );
		$locations['primary'] = $menu_id;
		set_theme_mod( 'nav_menu_locations', $locations );
		$this->report( 'menus', 1 );
		return array( 'settings', 0, __( 'Menu ready. Applying site settings…', 'seoexpertindia-demo-importer' ) );
	}

	private function step_settings() {
		$home = (int) get_option( 'seidi_home_page' );
		if ( $home ) {
			update_option( 'show_on_front', 'page' );
			update_option( 'page_on_front', $home );
		}
		if ( '' === (string) get_option( 'permalink_structure' ) ) {
			update_option( 'permalink_structure', '/%postname%/' );
		}
		// Elementor: keep the design's own colours and fonts, enable containers on pages and posts.
		update_option( 'elementor_disable_color_schemes', 'yes' );
		update_option( 'elementor_disable_typography_schemes', 'yes' );
		update_option( 'elementor_experiment-container', 'active' );
		$cpt = (array) get_option( 'elementor_cpt_support', array( 'page', 'post' ) );
		update_option( 'elementor_cpt_support', array_values( array_unique( array_merge( $cpt, array( 'page', 'post' ) ) ) ) );
		$this->apply_kit();
		foreach ( array( 'sei_tagline' => 'SEARCH. STRATEGY. GROWTH.', 'sei_consult_label' => 'Quick Consultation' ) as $mod => $default ) {
			if ( ! get_theme_mod( $mod ) ) {
				set_theme_mod( $mod, $default );
			}
		}
		return array( 'finish', 0, __( 'Settings applied. Finishing…', 'seoexpertindia-demo-importer' ) );
	}

	/** Elementor Site Settings: global colours, fonts and container width. */
	private function apply_kit() {
		$kit_id = (int) get_option( 'elementor_active_kit' );
		if ( ! $kit_id && class_exists( '\Elementor\Plugin' ) ) {
			$kit = \Elementor\Plugin::$instance->kits_manager->get_active_kit();
			$kit_id = $kit ? (int) $kit->get_id() : 0;
		}
		if ( ! $kit_id ) {
			$this->report_error( 'Elementor Site Settings (kit) not found; global colours were not applied.' );
			return;
		}
		$settings = (array) get_post_meta( $kit_id, '_elementor_page_settings', true );
		$colors   = array( array( 'primary', 'Primary (gold)', '#D4A72C' ), array( 'secondary', 'Secondary (navy)', '#020817' ), array( 'text', 'Text', '#EEF2FB' ), array( 'accent', 'Accent (light gold)', '#F3C95F' ) );
		$settings['system_colors'] = array_map(
			static function ( $c ) {
				return array( '_id' => $c[0], 'title' => $c[1], 'color' => $c[2] );
			},
			$colors
		);
		$custom = array( array( 'sei_page_bg', 'SEI Page background', '#07111F' ), array( 'sei_page_accent', 'SEI Page accent (gold)', '#C9A957' ), array( 'sei_page_accent_light', 'SEI Page accent light', '#E0C574' ), array( 'sei_page_text', 'SEI Page text', '#F5F1E7' ), array( 'sei_navy', 'SEI Navy (header & service pages)', '#020817' ), array( 'sei_gold', 'SEI Gold', '#D4A72C' ), array( 'sei_gold_light', 'SEI Light Gold', '#F3C95F' ), array( 'sei_ink', 'SEI Text', '#EEF2FB' ), array( 'sei_dim', 'SEI Muted Text', '#94A3C4' ), array( 'sei_card', 'SEI Card', '#0A1730' ), array( 'sei_violet', 'SEI Violet', '#8B7CF6' ) );
		$existing = array();
		foreach ( (array) ( $settings['custom_colors'] ?? array() ) as $c ) {
			if ( isset( $c['_id'] ) && 0 !== strpos( $c['_id'], 'sei_' ) ) {
				$existing[] = $c;
			}
		}
		$settings['custom_colors'] = array_merge(
			array_map(
				static function ( $c ) {
					return array( '_id' => $c[0], 'title' => $c[1], 'color' => $c[2] );
				},
				$custom
			),
			$existing
		);
		$fonts = array( array( 'primary', 'Primary (headings)', 'Plus Jakarta Sans', '700' ), array( 'secondary', 'Secondary (display)', 'Playfair Display', '600' ), array( 'text', 'Text', 'DM Sans', '400' ), array( 'accent', 'Accent (labels)', 'Space Grotesk', '600' ) );
		$settings['system_typography'] = array_map(
			static function ( $f ) {
				return array( '_id' => $f[0], 'title' => $f[1], 'typography_typography' => 'custom', 'typography_font_family' => $f[2], 'typography_font_weight' => $f[3] );
			},
			$fonts
		);
		$settings['container_width'] = array( 'unit' => 'px', 'size' => 1240, 'sizes' => array() );
		update_post_meta( $kit_id, '_elementor_page_settings', $settings );
		delete_post_meta( $kit_id, '_elementor_css' );
	}

	private function step_finish() {
		if ( class_exists( '\Elementor\Plugin' ) ) {
			\Elementor\Plugin::$instance->files_manager->clear_cache();
		}
		flush_rewrite_rules( false );
		$report             = get_option( self::REPORT_OPTION, array() );
		$report['status']   = empty( $report['errors'] ) ? 'success' : 'completed_with_errors';
		$report['finished'] = time();
		update_option( self::REPORT_OPTION, $report, false );
		update_option( 'seidi_imported_version', SEIDI_VERSION );
		return array( 'done', 0, __( 'Import complete.', 'seoexpertindia-demo-importer' ) );
	}
}
