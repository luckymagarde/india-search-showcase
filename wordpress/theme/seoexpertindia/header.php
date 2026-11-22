<?php
/**
 * Site header (logo, primary menu with Services mega menu, Quick Consultation).
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

$sei_logo_url = SEI_THEME_URI . '/assets/images/logo-header.png';
$sei_logo_alt = get_bloginfo( 'name' );
if ( has_custom_logo() ) {
	$sei_logo_id  = (int) get_theme_mod( 'custom_logo' );
	$sei_logo_url = wp_get_attachment_image_url( $sei_logo_id, 'full' );
	$sei_logo_alt = get_post_meta( $sei_logo_id, '_wp_attachment_image_alt', true ) ? get_post_meta( $sei_logo_id, '_wp_attachment_image_alt', true ) : $sei_logo_alt;
}
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/png" href="<?php echo esc_url( SEI_THEME_URI . '/assets/images/favicon.png' ); ?>">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header"><div class="site-header-inner">
<a class="site-brand" aria-label="<?php echo esc_attr( get_bloginfo( 'name' ) . ' — ' . __( 'home', 'seoexpertindia' ) ); ?>" href="<?php echo esc_url( home_url( '/' ) ); ?>"><img src="<?php echo esc_url( $sei_logo_url ); ?>" alt="<?php echo esc_attr( $sei_logo_alt ); ?>" class="site-logo" width="211" height="72"><span class="site-brand-tag"><?php echo esc_html( get_theme_mod( 'sei_tagline', 'SEARCH. STRATEGY. GROWTH.' ) ); ?></span></a>
<button class="<?php echo esc_attr( sei_button_classes( 'ghost' ) . ' site-menu-toggle' ); ?>" aria-label="<?php esc_attr_e( 'Open menu', 'seoexpertindia' ); ?>" aria-expanded="false" aria-controls="site-navigation"><?php echo sei_icon( 'Menu' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></button>
<template data-icon="menu"><?php echo sei_icon( 'Menu' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></template><template data-icon="x"><?php echo sei_icon( 'X' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></template>
<?php sei_render_primary_nav(); ?>
<?php sei_consult_button( false ); ?>
</div></header>
