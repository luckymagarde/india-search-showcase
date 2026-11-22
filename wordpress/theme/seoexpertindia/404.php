<?php
/**
 * Not found.
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<div class="sp-page sei-blog">
<main id="sei-main"><section class="sp-intro sei-blog-intro"><div class="sp-wrap sei-narrow">
<span class="sp-eyebrow">404</span>
<h1><?php esc_html_e( 'Page not found', 'seoexpertindia' ); ?></h1>
<p><?php esc_html_e( 'The page you are looking for does not exist or has been moved.', 'seoexpertindia' ); ?></p>
<p><a class="sei-button" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Go to the homepage', 'seoexpertindia' ); ?></a></p>
</div></section></main>
</div>
<?php
get_footer();
