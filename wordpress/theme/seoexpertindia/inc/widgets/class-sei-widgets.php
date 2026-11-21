<?php
/**
 * SEO Expert India Elementor widgets.
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

/** Heading (h1–h6) with inline formatting such as gold highlights. */
class SEI_Heading_Widget extends SEI_Widget_Base {
	public function get_name() {
		return 'sei-heading';
	}
	public function get_title() {
		return __( 'SEI Heading', 'seoexpertindia' );
	}
	public function get_icon() {
		return 'eicon-t-letter';
	}
	protected function default_tag() {
		return 'h2';
	}
	protected function tag_options() {
		$tags = array( 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span' );
		return array_combine( $tags, $tags );
	}
	protected function register_controls() {
		$this->start_controls_section( 'sei_content', array( 'label' => __( 'Heading', 'seoexpertindia' ) ) );
		$this->add_control(
			'title',
			array(
				'label'       => __( 'Text', 'seoexpertindia' ),
				'type'        => \Elementor\Controls_Manager::TEXTAREA,
				'rows'        => 3,
				'default'     => __( 'Heading', 'seoexpertindia' ),
				'description' => __( 'Inline HTML is allowed, e.g. &lt;span class="accent"&gt;highlight&lt;/span&gt;.', 'seoexpertindia' ),
				'dynamic'     => array( 'active' => true ),
			)
		);
		$this->end_controls_section();
		$this->register_markup_controls();
	}
	protected function inner_html() {
		return (string) $this->get_settings_for_display( 'title' );
	}
	protected function content_template() {
		$this->print_template( "settings.title || ''" );
	}
}

/** Paragraphs, list items, labels and other text elements. */
class SEI_Text_Widget extends SEI_Widget_Base {
	public function get_name() {
		return 'sei-text';
	}
	public function get_title() {
		return __( 'SEI Text', 'seoexpertindia' );
	}
	public function get_icon() {
		return 'eicon-text';
	}
	protected function default_tag() {
		return 'p';
	}
	protected function register_controls() {
		$this->start_controls_section( 'sei_content', array( 'label' => __( 'Text', 'seoexpertindia' ) ) );
		$this->add_control(
			'content',
			array(
				'label'       => __( 'Content', 'seoexpertindia' ),
				'type'        => \Elementor\Controls_Manager::TEXTAREA,
				'rows'        => 6,
				'default'     => '',
				'description' => __( 'Text with optional inline HTML (links, bold, icons).', 'seoexpertindia' ),
				'dynamic'     => array( 'active' => true ),
			)
		);
		$this->end_controls_section();
		$this->register_markup_controls();
	}
	protected function inner_html() {
		return (string) $this->get_settings_for_display( 'content' );
	}
	protected function content_template() {
		$this->print_template( "settings.content || ''" );
	}
}

/** Image from the Media Library with responsive srcset. */
class SEI_Image_Widget extends SEI_Widget_Base {
	public function get_name() {
		return 'sei-image';
	}
	public function get_title() {
		return __( 'SEI Image', 'seoexpertindia' );
	}
	public function get_icon() {
		return 'eicon-image';
	}
	protected function default_tag() {
		return 'img';
	}
	protected function tag_options() {
		return array( 'img' => 'img' );
	}
	protected function register_controls() {
		$this->start_controls_section( 'sei_content', array( 'label' => __( 'Image', 'seoexpertindia' ) ) );
		$this->add_control(
			'image',
			array(
				'label'   => __( 'Image', 'seoexpertindia' ),
				'type'    => \Elementor\Controls_Manager::MEDIA,
				'default' => array( 'url' => \Elementor\Utils::get_placeholder_image_src() ),
				'dynamic' => array( 'active' => true ),
			)
		);
		$this->add_control(
			'alt',
			array(
				'label' => __( 'Alt text', 'seoexpertindia' ),
				'type'  => \Elementor\Controls_Manager::TEXT,
			)
		);
		$this->end_controls_section();
		$this->register_markup_controls();
	}
	protected function extra_attributes() {
		$image = (array) $this->get_settings_for_display( 'image' );
		$attrs = array(
			'src' => (string) ( $image['url'] ?? '' ),
			'alt' => (string) $this->get_settings_for_display( 'alt' ),
		);
		$id = (int) ( $image['id'] ?? 0 );
		if ( $id && 'image/svg+xml' !== get_post_mime_type( $id ) ) {
			$meta = wp_get_attachment_metadata( $id );
			if ( ! empty( $meta['width'] ) && $attrs['src'] === wp_get_attachment_url( $id ) ) {
				$srcset = wp_get_attachment_image_srcset( $id, 'full' );
				if ( $srcset ) {
					$attrs['srcset'] = $srcset;
					$attrs['sizes']  = wp_get_attachment_image_sizes( $id, 'full' );
				}
			}
		}
		return $attrs;
	}
	protected function inner_html() {
		return '';
	}
	protected function content_template() {
		$this->print_template( "''", "'src=\"' + _.escape( settings.image && settings.image.url ? settings.image.url : '' ) + '\" alt=\"' + _.escape( settings.alt || '' ) + '\"'" );
	}
}

/** Links and buttons. */
class SEI_Link_Widget extends SEI_Widget_Base {
	public function get_name() {
		return 'sei-link';
	}
	public function get_title() {
		return __( 'SEI Link / Button', 'seoexpertindia' );
	}
	public function get_icon() {
		return 'eicon-button';
	}
	protected function default_tag() {
		return 'a';
	}
	protected function tag_options() {
		return array( 'a' => 'a' );
	}
	protected function register_controls() {
		$this->start_controls_section( 'sei_content', array( 'label' => __( 'Link', 'seoexpertindia' ) ) );
		$this->add_control(
			'text',
			array(
				'label'       => __( 'Text', 'seoexpertindia' ),
				'type'        => \Elementor\Controls_Manager::TEXTAREA,
				'rows'        => 2,
				'default'     => __( 'Learn more', 'seoexpertindia' ),
				'description' => __( 'Inline HTML (such as an icon) is allowed.', 'seoexpertindia' ),
				'dynamic'     => array( 'active' => true ),
			)
		);
		$this->add_control(
			'link',
			array(
				'label'   => __( 'Link', 'seoexpertindia' ),
				'type'    => \Elementor\Controls_Manager::URL,
				'dynamic' => array( 'active' => true ),
			)
		);
		$this->end_controls_section();
		$this->register_markup_controls();
	}
	protected function extra_attributes() {
		$link  = (array) $this->get_settings_for_display( 'link' );
		$attrs = array();
		if ( ! empty( $link['url'] ) ) {
			$attrs['href'] = esc_url_raw( $link['url'], array( 'http', 'https', 'mailto', 'tel', 'sms', 'whatsapp' ) ) ? $link['url'] : '';
			if ( 0 === strpos( $link['url'], '#' ) ) {
				$attrs['href'] = $link['url'];
			}
		}
		if ( ! empty( $link['is_external'] ) ) {
			$attrs['target'] = '_blank';
		}
		return $attrs;
	}
	protected function inner_html() {
		return (string) $this->get_settings_for_display( 'text' );
	}
	protected function content_template() {
		$this->print_template( "settings.text || ''", "( settings.link && settings.link.url ? 'href=\"' + _.escape( settings.link.url ) + '\"' : '' ) + ( settings.link && settings.link.is_external ? ' target=\"_blank\"' : '' )" );
	}
}

/** Complex markup kept as HTML: forms, SVG illustrations, tables, embeds. */
class SEI_Html_Widget extends SEI_Widget_Base {
	public function get_name() {
		return 'sei-html';
	}
	public function get_title() {
		return __( 'SEI HTML Block', 'seoexpertindia' );
	}
	public function get_icon() {
		return 'eicon-code';
	}
	protected function register_controls() {
		$this->start_controls_section( 'sei_content', array( 'label' => __( 'HTML', 'seoexpertindia' ) ) );
		$this->add_control(
			'html',
			array(
				'label'       => __( 'Inner HTML', 'seoexpertindia' ),
				'type'        => \Elementor\Controls_Manager::CODE,
				'language'    => 'html',
				'rows'        => 16,
				'description' => __( 'Used for forms, illustrations and tables. Keep field names unchanged on enquiry forms.', 'seoexpertindia' ),
			)
		);
		$this->end_controls_section();
		$this->register_markup_controls();
	}
	protected function inner_html() {
		return (string) $this->get_settings( 'html' );
	}
	protected function content_template() {
		$this->print_template( "settings.html || ''" );
	}
}
