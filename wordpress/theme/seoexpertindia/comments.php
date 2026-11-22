<?php
/**
 * Comments.
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

if ( post_password_required() ) {
	return;
}
?>
<div id="comments" class="sei-comments">
<?php if ( have_comments() ) : ?>
	<h2><?php echo esc_html( get_comments_number_text() ); ?></h2>
	<ol class="sei-comment-list"><?php wp_list_comments( array( 'style' => 'ol', 'short_ping' => true ) ); ?></ol>
	<?php the_comments_navigation(); ?>
<?php endif; ?>
<?php comment_form(); ?>
</div>
