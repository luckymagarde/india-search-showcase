<?php
/**
 * Single blog post.
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

get_header();
while ( have_posts() ) :
	the_post();
	if ( sei_is_elementor_page() ) {
		the_content();
		continue;
	}
	?>
<div class="sp-page sei-blog">
<main id="sei-main">
<article <?php post_class( 'sei-single' ); ?>>
<section class="sp-intro sei-blog-intro"><div class="sp-wrap sei-narrow">
	<span class="sp-eyebrow"><?php echo esc_html( get_the_date() ); ?></span>
	<h1><?php the_title(); ?></h1>
</div></section>
<section><div class="sp-wrap sei-narrow">
	<?php if ( has_post_thumbnail() ) : ?>
		<figure class="sei-featured"><?php the_post_thumbnail( 'large' ); ?></figure>
	<?php endif; ?>
	<div class="sei-entry"><?php the_content(); ?></div>
	<?php wp_link_pages(); ?>
	<nav class="sei-post-nav"><?php the_post_navigation(); ?></nav>
	<?php
	if ( comments_open() || get_comments_number() ) {
		comments_template();
	}
	?>
</div></section>
</article>
</main>
</div>
	<?php
endwhile;
get_footer();
