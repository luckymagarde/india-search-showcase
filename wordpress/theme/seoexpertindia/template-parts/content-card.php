<?php
/**
 * Blog post card.
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;
?>
<article <?php post_class( 'sp-card sei-post-card' ); ?>>
	<?php if ( has_post_thumbnail() ) : ?>
		<a class="sei-post-thumb" href="<?php the_permalink(); ?>" tabindex="-1" aria-hidden="true"><?php the_post_thumbnail( 'medium_large', array( 'loading' => 'lazy' ) ); ?></a>
	<?php endif; ?>
	<span class="sei-post-date"><?php echo esc_html( get_the_date() ); ?></span>
	<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
	<p><?php echo esc_html( wp_trim_words( get_the_excerpt(), 26 ) ); ?></p>
	<a class="sei-read-more" href="<?php the_permalink(); ?>"><?php esc_html_e( 'Read article', 'seoexpertindia' ); ?> <span aria-hidden="true">→</span></a>
</article>
