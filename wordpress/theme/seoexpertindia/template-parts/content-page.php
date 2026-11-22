<?php
/**
 * Standard page content (pages not built with Elementor).
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="sp-page sei-blog">
<main id="sei-main">
<section class="sp-intro sei-blog-intro"><div class="sp-wrap sei-narrow"><h1><?php the_title(); ?></h1></div></section>
<section><div class="sp-wrap sei-narrow"><div class="sei-entry"><?php the_content(); ?></div><?php wp_link_pages(); ?></div></section>
</main>
</div>
