<?php
/**
 * Elementor integration: SEO Expert India widgets, extra container tags and attributes.
 *
 * Each converted section is a native Elementor container; text, headings, images and links are
 * "SEO Expert India" widgets that print the original markup, so the design CSS applies unchanged.
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

/** Containers may use list/figure tags so the original page structure is kept. */
add_filter(
	'elementor/allowed_html_wrapper_tags',
	static function ( $tags ) {
		return array_values( array_unique( array_merge( (array) $tags, array( 'ul', 'ol', 'li', 'figure', 'blockquote', 'dl' ) ) ) );
	}
);

add_action(
	'elementor/elements/categories_registered',
	static function ( $manager ) {
		$manager->add_category(
			'seoexpertindia',
			array(
				'title' => __( 'SEO Expert India', 'seoexpertindia' ),
				'icon'  => 'eicon-star',
			)
		);
	}
);

add_action(
	'elementor/widgets/register',
	static function ( $widgets_manager ) {
		require_once SEI_THEME_DIR . '/inc/widgets/class-sei-widget-base.php';
		require_once SEI_THEME_DIR . '/inc/widgets/class-sei-widgets.php';
		foreach ( array( 'SEI_Heading_Widget', 'SEI_Text_Widget', 'SEI_Image_Widget', 'SEI_Link_Widget', 'SEI_Html_Widget' ) as $class ) {
			$widgets_manager->register( new $class() );
		}
	}
);

/**
 * Adds an "Original design" container layout. Converted sections use it so the site's own CSS
 * controls their layout; switch a container to Flexbox or Grid to use Elementor's layout tools.
 */
add_action(
	'elementor/element/container/section_layout_container/before_section_end',
	static function ( $element ) {
		$control = \Elementor\Plugin::$instance->controls_manager->get_control_from_stack( $element->get_unique_name(), 'container_type' );
		if ( is_wp_error( $control ) || empty( $control['options'] ) ) {
			return;
		}
		$element->update_control(
			'container_type',
			array(
				'options' => array( 'block' => __( 'Original design', 'seoexpertindia' ) ) + $control['options'],
			)
		);
	}
);

/** "HTML attributes" field on containers (Advanced tab), e.g. role or aria-label from the original markup. */
add_action(
	'elementor/element/container/section_layout/after_section_end',
	static function ( $element ) {
		$element->start_controls_section(
			'sei_section_attributes',
			array(
				'label' => __( 'SEO Expert India – HTML attributes', 'seoexpertindia' ),
				'tab'   => \Elementor\Controls_Manager::TAB_ADVANCED,
			)
		);
		$element->add_control(
			'sei_attrs',
			array(
				'label'       => __( 'Extra HTML attributes', 'seoexpertindia' ),
				'type'        => \Elementor\Controls_Manager::TEXTAREA,
				'rows'        => 3,
				'description' => __( 'Written as name="value" pairs, e.g. role="region" aria-label="Pricing".', 'seoexpertindia' ),
			)
		);
		$element->end_controls_section();
	}
);

add_action(
	'elementor/frontend/container/before_render',
	static function ( $element ) {
		$attrs = sei_parse_attributes( (string) $element->get_settings( 'sei_attrs' ) );
		foreach ( $attrs as $name => $value ) {
			if ( 'class' === $name ) {
				$element->add_render_attribute( '_wrapper', 'class', $value );
			} else {
				$element->add_render_attribute( '_wrapper', $name, $value, true );
			}
		}
	}
);

/**
 * Parses name="value" attribute text. Event handler attributes are never allowed.
 *
 * @return array<string,string>
 */
function sei_parse_attributes( $text ) {
	$out = array();
	if ( '' === trim( $text ) ) {
		return $out;
	}
	preg_match_all( '/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*"([^"]*)")?/', $text, $matches, PREG_SET_ORDER );
	foreach ( $matches as $m ) {
		$name = strtolower( $m[1] );
		if ( 0 === strpos( $name, 'on' ) || 'style' === $name && preg_match( '/expression|javascript:/i', $m[2] ?? '' ) ) {
			continue;
		}
		$value = isset( $m[2] ) ? html_entity_decode( $m[2], ENT_QUOTES | ENT_HTML5, 'UTF-8' ) : '';
		if ( in_array( $name, array( 'href', 'src', 'action', 'formaction', 'poster', 'xlink:href' ), true ) && preg_match( '/^\s*javascript:/i', $value ) ) {
			continue;
		}
		$out[ $name ] = $value;
	}
	return $out;
}

/** Prints attributes from an array. */
function sei_attribute_string( array $attrs ) {
	$html = '';
	foreach ( $attrs as $name => $value ) {
		$html .= ' ' . esc_attr( $name ) . ( '' === $value && in_array( $name, array( 'hidden', 'inert', 'disabled', 'allowfullscreen', 'novalidate', 'required', 'open', 'data-sei-tabs' ), true ) ? '' : '="' . esc_attr( $value ) . '"' );
	}
	return $html;
}

/** Global colours from Elementor Site Settings drive the original design variables. */
add_action(
	'wp_head',
	static function () {
		echo "<style id=\"sei-global-colors\">body{--bg:var(--e-global-color-sei_page_bg,#07111f);--blue:var(--e-global-color-sei_page_accent,#c9a957);--cyan:var(--e-global-color-sei_page_accent_light,#e0c574);--ink:var(--e-global-color-sei_page_text,#f5f1e7)}.ss.ss{--ss-gold:var(--e-global-color-sei_gold,#D4A72C);--ss-gold2:var(--e-global-color-sei_gold_light,#F3C95F);--ss-ink:var(--e-global-color-sei_ink,#EEF2FB)}</style>\n";
	},
	99
);
