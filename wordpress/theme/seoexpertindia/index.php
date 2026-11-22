<?php
/**
 * Blog index, archives and fallback template.
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<div class="sp-page sei-blog">
<main id="sei-main">
<section class="sp-intro sei-blog-intro"><div class="sp-wrap">
<?php if ( is_home() ) : ?>
	<span class="sp-eyebrow"><?php esc_html_e( 'Insights', 'seoexpertindia' ); ?></span>
	<h1><?php echo esc_html( get_the_title( (int) get_option( 'page_for_posts' ) ) ? get_the_title( (int) get_option( 'page_for_posts' ) ) : __( 'Blog', 'seoexpertindia' ) ); ?></h1>
<?php elseif ( is_search() ) : ?>
	<h1><?php /* translators: %s: search terms. */ printf( esc_html__( 'Search results for “%s”', 'seoexpertindia' ), esc_html( get_search_query() ) ); ?></h1>
<?php elseif ( is_archive() ) : ?>
	<h1><?php the_archive_title(); ?></h1>
	<?php the_archive_description( '<div class="sei-archive-description">', '</div>' ); ?>
<?php else : ?>
	<h1><?php bloginfo( 'name' ); ?></h1>
<?php endif; ?>
</div></section>
<section><div class="sp-wrap">
<?php if ( have_posts() ) : ?>
	<div class="sei-post-grid">
	<?php
	while ( have_posts() ) :
		the_post();
		get_template_part( 'template-parts/content', 'card' );
	endwhile;
	?>
	</div>
	<div class="sei-pagination"><?php the_posts_pagination( array( 'mid_size' => 1 ) ); ?></div>
<?php else : ?>
	<p class="sei-empty"><?php esc_html_e( 'No articles have been published yet.', 'seoexpertindia' ); ?></p>
<?php endif; ?>
</div></section>
</main>
</div>
<?php
get_footer();
