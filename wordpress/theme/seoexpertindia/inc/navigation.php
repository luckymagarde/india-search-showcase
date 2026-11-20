<?php
/**
 * Header navigation with the three-column Services mega menu, driven by Appearance → Menus.
 *
 * Menu structure: top-level items; an item whose children have their own children becomes the
 * mega menu (children = column headings, grandchildren = links). Add "sei-icon-{IconName}" in an
 * item's CSS Classes field to choose its icon (see inc/icons.php for names).
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

/** Shared button classes copied from the original header buttons. */
function sei_button_classes( $variant ) {
	$base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';
	if ( 'ghost' === $variant ) {
		return $base . ' hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2';
	}
	return $base . ' bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2';
}

/** Where "Quick Consultation" points: the form on this page when present, otherwise the Contact form. */
function sei_consultation_url() {
	$custom = get_theme_mod( 'sei_consult_url', '' );
	if ( $custom ) {
		return $custom;
	}
	$layout = sei_page_layout();
	if ( in_array( $layout, array( 'home', 'service-seo', 'service-dev' ), true ) || is_page( 'contact' ) ) {
		return '#lead-form';
	}
	$contact = get_page_by_path( 'contact' );
	return ( $contact ? get_permalink( $contact ) : home_url( '/contact/' ) ) . '#lead-form';
}

function sei_consult_button( $mobile ) {
	$label   = get_theme_mod( 'sei_consult_label', __( 'Quick Consultation', 'seoexpertindia' ) );
	$classes = sei_button_classes( 'primary' ) . ' site-consult ' . ( $mobile ? 'site-mobile-consult' : 'site-desktop-consult' );
	printf( '<a class="%s" href="%s">%s%s</a>', esc_attr( $classes ), esc_url( sei_consultation_url() ), sei_icon( 'MessageCircle' ), esc_html( $label ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

/** Icon name from an item's "sei-icon-*" CSS class. */
function sei_item_icon( $item, $fallback = '' ) {
	foreach ( (array) $item->classes as $class ) {
		if ( 0 === strpos( $class, 'sei-icon-' ) ) {
			return substr( $class, 9 );
		}
	}
	return $fallback;
}

/** Menu tree from the assigned primary menu, or the default site structure when none is assigned. */
function sei_menu_tree() {
	$locations = get_nav_menu_locations();
	if ( ! empty( $locations['primary'] ) ) {
		$items = wp_get_nav_menu_items( $locations['primary'], array( 'update_post_term_cache' => false ) );
		if ( $items ) {
			_wp_menu_item_classes_by_context( $items );
			$by_parent = array();
			foreach ( $items as $item ) {
				$by_parent[ (int) $item->menu_item_parent ][] = $item;
			}
			$build = static function ( $parent ) use ( &$build, $by_parent ) {
				$out = array();
				foreach ( $by_parent[ $parent ] ?? array() as $item ) {
					$out[] = array(
						'title'    => $item->title,
						'url'      => $item->url,
						'icon'     => sei_item_icon( $item ),
						'current'  => in_array( 'current-menu-item', (array) $item->classes, true ),
						'target'   => $item->target,
						'children' => $build( (int) $item->ID ),
					);
				}
				return $out;
			};
			return $build( 0 );
		}
	}
	$tree = array();
	foreach ( sei_default_menu() as $entry ) {
		$tree[] = array(
			'title'    => $entry['title'],
			'url'      => home_url( $entry['path'] ),
			'icon'     => $entry['icon'] ?? '',
			'current'  => false,
			'target'   => '',
			'children' => array_map(
				static function ( $cat ) {
					return array(
						'title'    => $cat['title'],
						'url'      => '#',
						'icon'     => $cat['icon'],
						'current'  => false,
						'target'   => '',
						'children' => array_map(
							static function ( $link ) {
								return array(
									'title'    => $link['title'],
									'url'      => home_url( $link['path'] ),
									'icon'     => $link['icon'],
									'current'  => false,
									'target'   => '',
									'children' => array(),
								);
							},
							$cat['items']
						),
					);
				},
				$entry['mega'] ?? array()
			),
		);
	}
	return $tree;
}

/** Default structure (same as the imported menu) used before a menu is assigned. */
function sei_default_menu() {
	static $menu = null;
	if ( null === $menu ) {
		$menu = include SEI_THEME_DIR . '/inc/default-menu.php';
	}
	return $menu;
}

function sei_render_primary_nav() {
	$tree = sei_menu_tree();
	echo '<nav id="site-navigation" class="site-nav" aria-label="' . esc_attr__( 'Main navigation', 'seoexpertindia' ) . '">';
	foreach ( $tree as $index => $item ) {
		$target = $item['target'] ? ' target="' . esc_attr( $item['target'] ) . '" rel="noopener"' : '';
		$active = $item['current'] ? ' class="active" aria-current="page"' : '';
		if ( ! $item['children'] ) {
			printf( '<a href="%s"%s%s>%s</a>', esc_url( $item['url'] ), $active, $target, esc_html( $item['title'] ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			continue;
		}
		$menu_id = 0 === $index || 'services' === sanitize_title( $item['title'] ) ? 'services-submenu' : 'submenu-' . $index;
		$columns = $item['children'];
		// Children without their own children form a single column.
		if ( ! array_filter( wp_list_pluck( $columns, 'children' ) ) ) {
			$columns = array(
				array(
					'title'    => $item['title'],
					'icon'     => $item['icon'],
					'children' => $columns,
				),
			);
		}
		echo '<div class="site-services">';
		printf( '<a href="%s"%s>%s</a>', esc_url( $item['url'] ), $active, esc_html( $item['title'] ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		/* translators: %s: menu item title. */
		printf( '<button class="%s" aria-label="%s" aria-expanded="false" aria-controls="%s">%s</button>', esc_attr( sei_button_classes( 'ghost' ) . ' site-dropdown-toggle' ), esc_attr( sprintf( __( 'Expand %s menu', 'seoexpertindia' ), $item['title'] ) ), esc_attr( $menu_id ), sei_icon( 'ChevronDown' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		printf( '<div id="%s" class="site-submenu site-mega" hidden>', esc_attr( $menu_id ) );
		foreach ( $columns as $col_index => $column ) {
			$col_id = 'service-category-' . sanitize_title( $column['title'] );
			$open   = 0 === $col_index;
			printf( '<div class="site-mega-category%s">', $open ? ' category-open' : '' );
			printf( '<h2>%s%s</h2>', sei_icon( $column['icon'] ), esc_html( $column['title'] ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			printf( '<button class="%s" aria-expanded="%s" aria-controls="%s">%s<span>%s</span>%s</button>', esc_attr( sei_button_classes( 'ghost' ) . ' site-category-toggle' ), $open ? 'true' : 'false', esc_attr( $col_id ), sei_icon( $column['icon'] ), esc_html( $column['title'] ), sei_icon( 'ChevronDown' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			printf( '<ul id="%s">', esc_attr( $col_id ) );
			foreach ( $column['children'] as $link ) {
				$link_target = $link['target'] ? ' target="' . esc_attr( $link['target'] ) . '" rel="noopener"' : '';
				printf( '<li><a href="%s"%s%s>%s<span>%s</span>%s</a></li>', esc_url( $link['url'] ), $link['current'] ? ' aria-current="page"' : '', $link_target, sei_icon( $link['icon'] ), esc_html( $link['title'] ), sei_icon( 'ArrowUpRight' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '</ul></div>';
		}
		echo '</div></div>';
	}
	sei_consult_button( true );
	echo '</nav>';
}

/** Customizer: header tagline and consultation button. */
add_action(
	'customize_register',
	static function ( $wp_customize ) {
		$wp_customize->add_section(
			'sei_header',
			array(
				'title'    => __( 'SEO Expert India header', 'seoexpertindia' ),
				'priority' => 30,
			)
		);
		$fields = array(
			'sei_tagline'       => array( __( 'Logo tagline', 'seoexpertindia' ), 'SEARCH. STRATEGY. GROWTH.', 'sanitize_text_field' ),
			'sei_consult_label' => array( __( 'Consultation button text', 'seoexpertindia' ), 'Quick Consultation', 'sanitize_text_field' ),
			'sei_consult_url'   => array( __( 'Consultation button link (leave empty to open the page enquiry form)', 'seoexpertindia' ), '', 'esc_url_raw' ),
		);
		foreach ( $fields as $id => $field ) {
			$wp_customize->add_setting(
				$id,
				array(
					'default'           => $field[1],
					'sanitize_callback' => $field[2],
				)
			);
			$wp_customize->add_control(
				$id,
				array(
					'label'   => $field[0],
					'section' => 'sei_header',
					'type'    => 'text',
				)
			);
		}
	}
);
