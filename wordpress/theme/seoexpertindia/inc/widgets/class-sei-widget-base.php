<?php
/**
 * Base for SEO Expert India widgets: prints the original element (tag, classes, attributes)
 * as the widget wrapper so the original design styles and layouts apply exactly.
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

abstract class SEI_Widget_Base extends \Elementor\Widget_Base {

	/** Tags that never have a closing tag. */
	const VOID_TAGS = array( 'img', 'br', 'hr', 'input', 'source', 'wbr' );

	/** Tags a widget may print. */
	const TAGS = array( 'div', 'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'li', 'ul', 'ol', 'button', 'label', 'small', 'strong', 'em', 'b', 'i', 'blockquote', 'figure', 'figcaption', 'section', 'article', 'aside', 'header', 'footer', 'nav', 'main', 'dt', 'dd', 'dl', 'time', 'cite', 'q', 'sup', 'sub', 'mark', 'code', 'abbr', 'svg', 'form', 'table', 'select', 'textarea', 'iframe', 'video', 'picture', 'details', 'summary', 'img', 'hr', 'br', 'input', 'address', 'caption', 'noscript' );

	public function get_categories() {
		return array( 'seoexpertindia' );
	}

	public function get_keywords() {
		return array( 'seo expert india', 'sei' );
	}

	public function has_widget_inner_wrapper(): bool {
		return false;
	}

	protected function should_print_empty() {
		return true;
	}

	/** Default tag shown in the Tag control. */
	protected function default_tag() {
		return 'div';
	}

	/** Allowed tag options for this widget. */
	protected function tag_options() {
		return array_combine( self::TAGS, self::TAGS );
	}

	/** Shared Tag / CSS classes / ID / attributes controls (Advanced section of Content tab). */
	protected function register_markup_controls() {
		$this->start_controls_section(
			'sei_markup',
			array(
				'label' => __( 'HTML element', 'seoexpertindia' ),
			)
		);
		$this->add_control(
			'sei_tag',
			array(
				'label'   => __( 'HTML tag', 'seoexpertindia' ),
				'type'    => \Elementor\Controls_Manager::SELECT,
				'default' => $this->default_tag(),
				'options' => $this->tag_options(),
			)
		);
		$this->add_control(
			'sei_classes',
			array(
				'label'       => __( 'Design classes', 'seoexpertindia' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'description' => __( 'CSS classes from the SEO Expert India design (controls the look).', 'seoexpertindia' ),
			)
		);
		$this->add_control(
			'sei_id',
			array(
				'label' => __( 'Element ID', 'seoexpertindia' ),
				'type'  => \Elementor\Controls_Manager::TEXT,
			)
		);
		$this->add_control(
			'sei_attrs',
			array(
				'label'       => __( 'Extra HTML attributes', 'seoexpertindia' ),
				'type'        => \Elementor\Controls_Manager::TEXTAREA,
				'rows'        => 2,
				'description' => __( 'name="value" pairs, e.g. aria-label="Close".', 'seoexpertindia' ),
			)
		);
		$this->end_controls_section();
	}

	protected function sei_tag() {
		$tag = strtolower( (string) $this->get_settings( 'sei_tag' ) );
		return in_array( $tag, self::TAGS, true ) ? $tag : $this->default_tag();
	}

	/** Attributes from settings plus widget-specific ones. */
	protected function element_attributes() {
		$attrs = sei_parse_attributes( (string) $this->get_settings( 'sei_attrs' ) );
		return array_merge( $attrs, $this->extra_attributes() );
	}

	/** Widget-specific attributes (href, src…). */
	protected function extra_attributes() {
		return array();
	}

	/** Inner HTML of the element. */
	abstract protected function inner_html();

	protected function is_editor() {
		$plugin = \Elementor\Plugin::$instance;
		return ( $plugin->editor && $plugin->editor->is_edit_mode() ) || ( $plugin->preview && $plugin->preview->is_preview_mode() );
	}

	/** Opening tag of the original element merged with Elementor's wrapper attributes. */
	public function before_render() {
		if ( $this->is_editor() ) {
			parent::before_render();
			return;
		}
		$classes = trim( (string) $this->get_settings( 'sei_classes' ) );
		if ( $classes ) {
			$this->add_render_attribute( '_wrapper', 'class', $classes );
		}
		$id = trim( (string) $this->get_settings( 'sei_id' ) );
		if ( $id ) {
			$this->add_render_attribute( '_wrapper', 'id', $id, true );
		}
		$attrs = $this->element_attributes();
		if ( isset( $attrs['class'] ) ) {
			$this->add_render_attribute( '_wrapper', 'class', $attrs['class'] );
			unset( $attrs['class'] );
		}
		echo '<' . $this->sei_tag() . ' ' . $this->get_render_attribute_string( '_wrapper' ) . sei_attribute_string( $attrs ) . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}

	public function after_render() {
		if ( $this->is_editor() ) {
			parent::after_render();
			return;
		}
		if ( ! in_array( $this->sei_tag(), self::VOID_TAGS, true ) ) {
			echo '</' . $this->sei_tag() . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
	}

	protected function render() {
		if ( ! $this->is_editor() ) {
			echo $this->inner_html(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- editor-authored markup, like Elementor's HTML widget.
			return;
		}
		// In the editor the whole element is printed inside Elementor's wrapper.
		$attrs = $this->element_attributes();
		$class = trim( (string) $this->get_settings( 'sei_classes' ) . ' ' . ( $attrs['class'] ?? '' ) );
		unset( $attrs['class'] );
		if ( $class ) {
			$attrs = array( 'class' => $class ) + $attrs;
		}
		$id = trim( (string) $this->get_settings( 'sei_id' ) );
		if ( $id ) {
			$attrs['id'] = $id;
		}
		$tag = $this->sei_tag();
		echo '<' . $tag . sei_attribute_string( $attrs ) . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		if ( ! in_array( $tag, self::VOID_TAGS, true ) ) {
			echo $this->inner_html() . '</' . $tag . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
	}

	/** Live preview template; $content_js is the JS expression for the inner HTML. */
	protected function print_template( $content_js, $extra_attrs_js = "''" ) {
		?>
		<#
		var seiTag = settings.sei_tag || '<?php echo esc_js( $this->default_tag() ); ?>';
		var seiVoid = <?php echo wp_json_encode( self::VOID_TAGS ); ?>.indexOf( seiTag ) > -1;
		var seiAttrs = ( settings.sei_attrs || '' ).replace( /\son[a-z]+\s*=\s*"[^"]*"/gi, '' ).replace( /^on[a-z]+\s*=\s*"[^"]*"/i, '' );
		var seiOpen = '<' + seiTag + ( settings.sei_classes ? ' class="' + _.escape( settings.sei_classes ) + '"' : '' ) + ( settings.sei_id ? ' id="' + _.escape( settings.sei_id ) + '"' : '' ) + ' ' + seiAttrs + ' ' + ( <?php echo $extra_attrs_js; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> ) + '>';
		print( seiOpen + ( seiVoid ? '' : ( <?php echo $content_js; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> ) + '</' + seiTag + '>' ) );
		#>
		<?php
	}
}
