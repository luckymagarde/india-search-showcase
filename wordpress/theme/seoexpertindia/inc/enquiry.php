<?php
/**
 * Enquiry forms: validation, spam protection and HTML email delivery through wp_mail().
 * Recipients and sender are set in Settings → SEO Expert India. Nothing is stored.
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

/** Saved settings merged with defaults. */
function sei_enquiry_settings() {
	$defaults = array(
		'recipients' => 'info@seoexpertindia.biz, lucky.magarde@gmail.com, lokesh@seoexpertindia.biz',
		'from_email' => 'wordpress@seoexpertindia.biz',
		'from_name'  => 'SEO Expert India Website',
	);
	return wp_parse_args( (array) get_option( 'sei_enquiry_settings', array() ), $defaults );
}

/** Valid recipient addresses; falls back to the WordPress administrator email. */
function sei_enquiry_recipients() {
	$list = array_filter( array_map( 'trim', explode( ',', (string) sei_enquiry_settings()['recipients'] ) ), 'is_email' );
	return $list ? array_values( $list ) : array( get_option( 'admin_email' ) );
}

/** Same rules as the original site's website field (bare domains accepted). */
function sei_normalize_website( $value ) {
	$value = trim( $value );
	if ( '' === $value ) {
		return '';
	}
	if ( preg_match( '/[\s\\\\]/', $value ) ) {
		return null;
	}
	$candidate = preg_match( '#^https?://#i', $value ) ? $value : 'https://' . $value;
	$parts     = wp_parse_url( $candidate );
	if ( ! $parts || empty( $parts['host'] ) || ! in_array( strtolower( $parts['scheme'] ?? '' ), array( 'http', 'https' ), true ) || isset( $parts['user'] ) || isset( $parts['pass'] ) || isset( $parts['port'] ) ) {
		return null;
	}
	$labels = explode( '.', $parts['host'] );
	if ( count( $labels ) < 2 ) {
		return null;
	}
	foreach ( $labels as $label ) {
		if ( ! preg_match( '/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i', $label ) ) {
			return null;
		}
	}
	return preg_match( '/^[a-z]{2,63}$/i', end( $labels ) ) ? $candidate : null;
}

function sei_enquiry_field( $key, $max ) {
	// phpcs:ignore WordPress.Security.NonceVerification.Missing -- public form; protected by honeypot, timing and rate limits.
	$value = isset( $_POST[ $key ] ) ? (string) wp_unslash( $_POST[ $key ] ) : '';
	$value = str_replace( array( "\r", "\0" ), '', trim( $value ) );
	return mb_substr( $value, 0, $max );
}

/**
 * Validates an enquiry. Returns [ data, errors ] where errors maps field => message.
 */
function sei_validate_enquiry( array $in ) {
	$errors = array();
	$data   = array(
		'name'      => str_replace( "\n", ' ', sanitize_text_field( $in['name'] ?? '' ) ),
		'email'     => sanitize_email( $in['email'] ?? '' ),
		'phone'     => str_replace( "\n", ' ', sanitize_text_field( $in['phone'] ?? '' ) ),
		'budget'    => sanitize_text_field( $in['budget'] ?? '' ),
		'goals'     => sanitize_textarea_field( $in['goals'] ?? '' ),
		'page_path' => (string) ( $in['page_path'] ?? '/' ),
	);
	if ( '' === $data['name'] ) {
		$errors['name'] = __( 'Please enter your name.', 'seoexpertindia' );
	}
	if ( ! is_email( $data['email'] ) ) {
		$errors['email'] = __( 'Please enter a valid email.', 'seoexpertindia' );
	}
	if ( strlen( $data['phone'] ) < 7 ) {
		$errors['phone'] = __( 'Please enter your number.', 'seoexpertindia' );
	}
	$website = sei_normalize_website( (string) ( $in['website'] ?? '' ) );
	if ( null === $website ) {
		$errors['site'] = __( 'Please enter a valid website, such as example.com.', 'seoexpertindia' );
	}
	$data['website'] = (string) $website;
	if ( '' === $data['page_path'] || '/' !== $data['page_path'][0] || 0 === strpos( $data['page_path'], '//' ) ) {
		$data['page_path'] = '/';
	}
	return array( $data, $errors );
}

function sei_enquiry_email_html( array $d ) {
	$e        = static function ( $v ) {
		return esc_html( $v );
	};
	$page_url = esc_url( home_url( $d['page_path'] ) );
	$when     = wp_date( 'd M Y, h:i A T' );
	$link     = 'color:#b8891a;text-decoration:none;';
	$none     = '<span style="color:#94a3b8;">' . esc_html__( 'Not provided', 'seoexpertindia' ) . '</span>';
	$rows     = array(
		array( 'Name', $e( $d['name'] ) ),
		array( 'Email', '<a href="mailto:' . esc_attr( $d['email'] ) . '" style="' . $link . '">' . $e( $d['email'] ) . '</a>' ),
		array( 'Phone', '<a href="tel:' . esc_attr( preg_replace( '/[^0-9+]/', '', $d['phone'] ) ) . '" style="' . $link . '">' . $e( $d['phone'] ) . '</a>' ),
		array( 'Website', '' !== $d['website'] ? '<a href="' . esc_url( $d['website'] ) . '" style="' . $link . '">' . $e( $d['website'] ) . '</a>' : $none ),
		array( 'Budget', '' !== $d['budget'] ? $e( $d['budget'] ) : $none ),
	);
	$row_html = '';
	foreach ( $rows as $i => $row ) {
		$bg        = $i % 2 ? '#ffffff' : '#f8fafc';
		$row_html .= '<tr><td style="padding:12px 16px;background:' . $bg . ';width:130px;font-size:13px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid #e2e8f0;">' . $row[0] . '</td><td style="padding:12px 16px;background:' . $bg . ';font-size:15px;color:#0f172a;border-bottom:1px solid #e2e8f0;">' . $row[1] . '</td></tr>';
	}
	$message = '' !== $d['goals'] ? nl2br( $e( $d['goals'] ) ) : '<span style="color:#94a3b8;">' . esc_html__( 'No message provided', 'seoexpertindia' ) . '</span>';
	return '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New website enquiry</title></head>'
		. '<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">'
		. '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 12px;"><tr><td align="center">'
		. '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;">'
		. '<tr><td style="background:#020817;padding:26px 28px;border-bottom:4px solid #d4a72c;"><div style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:.02em;">SEO Expert <span style="color:#d4a72c;">India</span></div>'
		. '<div style="font-size:13px;color:#cbd5e1;margin-top:6px;">New enquiry from your website</div></td></tr>'
		. '<tr><td style="padding:26px 28px 8px;"><h1 style="margin:0 0 6px;font-size:22px;color:#0f172a;">' . $e( $d['name'] ) . ' sent an enquiry</h1><p style="margin:0;font-size:14px;color:#64748b;">Received ' . $e( $when ) . '</p></td></tr>'
		. '<tr><td style="padding:18px 28px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;border-collapse:separate;">' . $row_html . '</table></td></tr>'
		. '<tr><td style="padding:4px 28px 18px;"><div style="font-size:13px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px;">Message / Goals</div><div style="background:#fffbeb;border-left:4px solid #d4a72c;border-radius:8px;padding:14px 16px;font-size:15px;line-height:1.6;color:#1e293b;">' . $message . '</div></td></tr>'
		. '<tr><td style="padding:6px 28px 26px;"><a href="mailto:' . esc_attr( $d['email'] ) . '?subject=' . rawurlencode( 'Re: Your enquiry with SEO Expert India' ) . '" style="display:inline-block;background:#d4a72c;color:#020817;font-weight:700;font-size:15px;text-decoration:none;padding:12px 22px;border-radius:8px;">Reply to ' . $e( $d['name'] ) . '</a></td></tr>'
		. '<tr><td style="background:#f8fafc;padding:16px 28px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;">Submitted from <a href="' . $page_url . '" style="color:#b8891a;">' . $page_url . '</a></td></tr>'
		. '</table></td></tr></table></body></html>';
}

function sei_handle_enquiry() {
	// Honeypot: real visitors never fill it. Pretend success so bots learn nothing.
	if ( '' !== sei_enquiry_field( 'company_fax', 200 ) ) {
		wp_send_json( array( 'ok' => true ) );
	}
	// Submissions faster than 2 seconds after page load are automated.
	$started = (int) sei_enquiry_field( 'sei_started', 20 );
	if ( $started && ( time() * 1000 - $started ) < 2000 ) {
		wp_send_json( array( 'ok' => false, 'error' => __( 'Please take a moment and try again.', 'seoexpertindia' ) ), 422 );
	}
	list( $data, $errors ) = sei_validate_enquiry(
		array(
			'name'      => sei_enquiry_field( 'name', 100 ),
			'email'     => sei_enquiry_field( 'email', 255 ),
			'phone'     => sei_enquiry_field( 'phone', 40 ),
			'website'   => sei_enquiry_field( 'website', 500 ),
			'budget'    => sei_enquiry_field( 'budget', 100 ),
			'goals'     => sei_enquiry_field( 'goals', 5000 ),
			'page_path' => sei_enquiry_field( 'page_path', 300 ),
		)
	);
	if ( $errors ) {
		wp_send_json( array( 'ok' => false, 'error' => reset( $errors ), 'fields' => array_keys( $errors ) ), 422 );
	}
	// Flood protection: one enquiry per visitor every 30 seconds, 10 per hour.
	$ip    = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : 'unknown';
	$key   = 'sei_enq_' . md5( $ip );
	$state = get_transient( $key );
	$state = is_array( $state ) ? $state : array( 'last' => 0, 'count' => 0 );
	if ( time() - $state['last'] < 30 || $state['count'] >= 10 ) {
		wp_send_json( array( 'ok' => false, 'error' => __( 'Please wait a moment before sending again.', 'seoexpertindia' ) ), 429 );
	}
	$settings  = sei_enquiry_settings();
	$from      = is_email( $settings['from_email'] ) ? $settings['from_email'] : get_option( 'admin_email' );
	$from_name = str_replace( array( "\r", "\n", '<', '>', '"' ), '', $settings['from_name'] );
	$headers   = array(
		'Content-Type: text/html; charset=UTF-8',
		'From: ' . $from_name . ' <' . $from . '>',
		'Reply-To: ' . str_replace( array( "\r", "\n", '<', '>', '"', ',' ), '', $data['name'] ) . ' <' . $data['email'] . '>',
	);
	/* translators: %s: visitor name. */
	$subject = sprintf( __( 'New Enquiry: %s – SEO Expert India', 'seoexpertindia' ), $data['name'] );
	$sent    = wp_mail( sei_enquiry_recipients(), $subject, sei_enquiry_email_html( $data ), $headers );
	if ( ! $sent ) {
		wp_send_json( array( 'ok' => false, 'error' => __( 'Email could not be sent. Please call or email us directly.', 'seoexpertindia' ) ), 500 );
	}
	set_transient( $key, array( 'last' => time(), 'count' => $state['count'] + 1 ), HOUR_IN_SECONDS );
	wp_send_json( array( 'ok' => true ) );
}
add_action( 'wp_ajax_sei_enquiry', 'sei_handle_enquiry' );
add_action( 'wp_ajax_nopriv_sei_enquiry', 'sei_handle_enquiry' );

/** Settings → SEO Expert India. */
add_action(
	'admin_menu',
	static function () {
		add_options_page( __( 'SEO Expert India', 'seoexpertindia' ), __( 'SEO Expert India', 'seoexpertindia' ), 'manage_options', 'sei-settings', 'sei_settings_page' );
	}
);

add_action(
	'admin_init',
	static function () {
		register_setting(
			'sei_settings',
			'sei_enquiry_settings',
			array(
				'type'              => 'array',
				'sanitize_callback' => static function ( $value ) {
					$value      = (array) $value;
					$recipients = array_filter( array_map( 'sanitize_email', array_map( 'trim', explode( ',', (string) ( $value['recipients'] ?? '' ) ) ) ), 'is_email' );
					return array(
						'recipients' => implode( ', ', $recipients ),
						'from_email' => sanitize_email( $value['from_email'] ?? '' ),
						'from_name'  => sanitize_text_field( $value['from_name'] ?? '' ),
					);
				},
			)
		);
	}
);

function sei_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$s = sei_enquiry_settings();
	echo '<div class="wrap"><h1>' . esc_html__( 'SEO Expert India – enquiry emails', 'seoexpertindia' ) . '</h1>';
	echo '<p>' . esc_html__( 'Every enquiry form on the website sends an HTML email to these addresses. Enquiries are not stored in WordPress.', 'seoexpertindia' ) . '</p>';
	echo '<form method="post" action="options.php">';
	settings_fields( 'sei_settings' );
	echo '<table class="form-table" role="presentation">';
	printf( '<tr><th scope="row"><label for="sei-rec">%s</label></th><td><input id="sei-rec" class="large-text" name="sei_enquiry_settings[recipients]" value="%s"><p class="description">%s</p></td></tr>', esc_html__( 'Send enquiries to', 'seoexpertindia' ), esc_attr( $s['recipients'] ), esc_html__( 'Separate several addresses with commas. If empty, the WordPress administrator email is used.', 'seoexpertindia' ) );
	printf( '<tr><th scope="row"><label for="sei-from">%s</label></th><td><input id="sei-from" class="regular-text" name="sei_enquiry_settings[from_email]" value="%s"><p class="description">%s</p></td></tr>', esc_html__( 'Sender email', 'seoexpertindia' ), esc_attr( $s['from_email'] ), esc_html__( 'Use an address on your own domain so emails are not marked as spam (check SPF/DKIM in your hosting panel).', 'seoexpertindia' ) );
	printf( '<tr><th scope="row"><label for="sei-name">%s</label></th><td><input id="sei-name" class="regular-text" name="sei_enquiry_settings[from_name]" value="%s"></td></tr>', esc_html__( 'Sender name', 'seoexpertindia' ), esc_attr( $s['from_name'] ) );
	echo '</table>';
	submit_button();
	echo '</form></div>';
}
