<?php
/**
 * Dashboard → SEO Expert India → Import Demo.
 *
 * @package SEOExpertIndiaDemoImporter
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'admin_menu',
	static function () {
		add_menu_page( __( 'SEO Expert India', 'seoexpertindia-demo-importer' ), __( 'SEO Expert India', 'seoexpertindia-demo-importer' ), 'manage_options', 'seoexpertindia', 'seidi_render_page', 'dashicons-chart-line', 59 );
		add_submenu_page( 'seoexpertindia', __( 'Import Demo', 'seoexpertindia-demo-importer' ), __( 'Import Demo', 'seoexpertindia-demo-importer' ), 'manage_options', 'seoexpertindia', 'seidi_render_page' );
	}
);

add_action(
	'admin_enqueue_scripts',
	static function ( $hook ) {
		if ( 'toplevel_page_seoexpertindia' !== $hook ) {
			return;
		}
		wp_enqueue_style( 'seidi-admin', SEIDI_URL . 'assets/admin.css', array(), SEIDI_VERSION );
		wp_enqueue_script( 'seidi-admin', SEIDI_URL . 'assets/admin.js', array(), SEIDI_VERSION, true );
		wp_localize_script(
			'seidi-admin',
			'SEIDI',
			array(
				'ajaxUrl' => admin_url( 'admin-ajax.php' ),
				'nonce'   => wp_create_nonce( 'seidi_import' ),
				'i18n'    => array(
					'confirm' => __( 'Start the import now? Pages with the same addresses will be replaced.', 'seoexpertindia-demo-importer' ),
					'failed'  => __( 'The import stopped:', 'seoexpertindia-demo-importer' ),
					'retry'   => __( 'You can safely run the import again; finished items are not duplicated.', 'seoexpertindia-demo-importer' ),
					'network' => __( 'The server did not respond. Check your connection and run the import again.', 'seoexpertindia-demo-importer' ),
				),
			)
		);
	}
);

/** One import batch per request keeps each request well under shared-hosting time limits. */
add_action(
	'wp_ajax_seidi_step',
	static function () {
		check_ajax_referer( 'seidi_import', 'nonce' );
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'You are not allowed to import content.', 'seoexpertindia-demo-importer' ) ), 403 );
		}
		$step     = isset( $_POST['step'] ) ? sanitize_key( wp_unslash( $_POST['step'] ) ) : 'start';
		$offset   = isset( $_POST['offset'] ) ? absint( $_POST['offset'] ) : 0;
		$importer = new SEIDI_Importer();
		if ( ! in_array( $step, SEIDI_Importer::STEPS, true ) ) {
			wp_send_json_error( array( 'message' => 'Unknown step.' ), 400 );
		}
		try {
			list( $next, $next_offset, $message ) = $importer->run( $step, $offset );
		} catch ( Throwable $e ) {
			$report             = get_option( SEIDI_Importer::REPORT_OPTION, array() );
			$report['status']   = 'failed';
			$report['errors'][] = $e->getMessage();
			update_option( SEIDI_Importer::REPORT_OPTION, $report, false );
			wp_send_json_error( array( 'message' => $e->getMessage() ), 500 );
		}
		wp_send_json_success(
			array(
				'step'     => $next,
				'offset'   => $next_offset,
				'message'  => $message,
				'progress' => $importer->progress( $next, $next_offset ),
				'report'   => 'done' === $next ? seidi_report_html() : '',
			)
		);
	}
);

function seidi_report_html() {
	$report = get_option( SEIDI_Importer::REPORT_OPTION );
	if ( ! $report ) {
		return '';
	}
	$labels = array(
		'media_imported'    => __( 'Images added to the Media Library', 'seoexpertindia-demo-importer' ),
		'media_existing'    => __( 'Images already present (reused)', 'seoexpertindia-demo-importer' ),
		'pages_created'     => __( 'Pages created', 'seoexpertindia-demo-importer' ),
		'pages_updated'     => __( 'Pages updated', 'seoexpertindia-demo-importer' ),
		'templates_created' => __( 'Elementor templates created', 'seoexpertindia-demo-importer' ),
		'templates_updated' => __( 'Elementor templates updated', 'seoexpertindia-demo-importer' ),
		'menus'             => __( 'Menus built', 'seoexpertindia-demo-importer' ),
	);
	$status = array(
		'success'               => __( 'Completed successfully', 'seoexpertindia-demo-importer' ),
		'completed_with_errors' => __( 'Completed with errors', 'seoexpertindia-demo-importer' ),
		'running'               => __( 'Not finished (interrupted)', 'seoexpertindia-demo-importer' ),
		'failed'                => __( 'Failed', 'seoexpertindia-demo-importer' ),
	);
	ob_start();
	echo '<h2>' . esc_html__( 'Last import report', 'seoexpertindia-demo-importer' ) . '</h2><table class="widefat striped seidi-table"><tbody>';
	printf( '<tr><th>%s</th><td><strong>%s</strong></td></tr>', esc_html__( 'Status', 'seoexpertindia-demo-importer' ), esc_html( $status[ $report['status'] ?? '' ] ?? '' ) );
	printf( '<tr><th>%s</th><td>%s</td></tr>', esc_html__( 'Started', 'seoexpertindia-demo-importer' ), esc_html( wp_date( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ), (int) ( $report['started'] ?? 0 ) ) ) );
	foreach ( $labels as $key => $label ) {
		if ( ! empty( $report['counts'][ $key ] ) ) {
			printf( '<tr><th>%s</th><td>%d</td></tr>', esc_html( $label ), (int) $report['counts'][ $key ] );
		}
	}
	echo '</tbody></table>';
	if ( ! empty( $report['errors'] ) ) {
		echo '<div class="notice notice-error inline"><p><strong>' . esc_html__( 'Errors', 'seoexpertindia-demo-importer' ) . '</strong></p><ul>';
		foreach ( $report['errors'] as $error ) {
			echo '<li>' . esc_html( $error ) . '</li>';
		}
		echo '</ul></div>';
	}
	if ( 'success' === ( $report['status'] ?? '' ) || 'completed_with_errors' === ( $report['status'] ?? '' ) ) {
		printf( '<p><a class="button button-primary" href="%s" target="_blank" rel="noopener">%s</a> <a class="button" href="%s">%s</a></p>', esc_url( home_url( '/' ) ), esc_html__( 'View website', 'seoexpertindia-demo-importer' ), esc_url( admin_url( 'edit.php?post_type=page' ) ), esc_html__( 'Edit pages with Elementor', 'seoexpertindia-demo-importer' ) );
	}
	return ob_get_clean();
}

function seidi_render_page() {
	$importer  = new SEIDI_Importer();
	$ready     = $importer->requirements_met();
	$conflicts = $ready ? $importer->conflicts() : array();
	$previous  = get_option( 'seidi_imported_version' );
	?>
	<div class="wrap seidi">
		<h1><?php esc_html_e( 'SEO Expert India – Import Demo', 'seoexpertindia-demo-importer' ); ?></h1>
		<div class="seidi-grid">
			<div class="seidi-card seidi-preview">
				<img src="<?php echo esc_url( SEIDI_URL . 'assets/preview.jpg' ); ?>" alt="<?php esc_attr_e( 'SEO Expert India website homepage preview', 'seoexpertindia-demo-importer' ); ?>" width="1200" height="900">
				<p><?php esc_html_e( 'Imports the complete website: homepage, About, Services, Recent Work, Testimonials, Contact, FAQ, all 29 service pages, images, header menu with Services mega menu, global footer, Elementor colours and fonts, and homepage and blog settings.', 'seoexpertindia-demo-importer' ); ?></p>
			</div>
			<div class="seidi-card">
				<h2><?php esc_html_e( 'System requirements and plugins', 'seoexpertindia-demo-importer' ); ?></h2>
				<table class="widefat striped seidi-table"><tbody>
				<?php foreach ( $importer->requirements() as $row ) : ?>
					<tr class="<?php echo esc_attr( $row['ok'] ? 'is-ok' : ( $row['required'] ? 'is-error' : 'is-warn' ) ); ?>">
						<td class="seidi-dot"><span class="dashicons <?php echo esc_attr( $row['ok'] ? 'dashicons-yes-alt' : ( $row['required'] ? 'dashicons-dismiss' : 'dashicons-warning' ) ); ?>"></span></td>
						<th><?php echo esc_html( $row['label'] ); ?><?php echo $row['required'] ? '' : ' <em>(' . esc_html__( 'optional', 'seoexpertindia-demo-importer' ) . ')</em>'; ?></th>
						<td><?php echo esc_html( $row['value'] ); ?></td>
					</tr>
				<?php endforeach; ?>
				</tbody></table>
			</div>
		</div>

		<div class="seidi-card">
			<h2><?php esc_html_e( 'Import Complete Website', 'seoexpertindia-demo-importer' ); ?></h2>
			<?php if ( ! $ready ) : ?>
				<div class="notice notice-error inline"><p><?php esc_html_e( 'Please fix the required items marked in red above, then reload this page.', 'seoexpertindia-demo-importer' ); ?></p></div>
			<?php else : ?>
				<div class="notice notice-warning inline">
					<p><strong><?php esc_html_e( 'Before you import:', 'seoexpertindia-demo-importer' ); ?></strong> <?php esc_html_e( 'take a backup. The import sets the homepage and blog page, assigns the header menu and replaces pages that use the same addresses. It never changes user accounts, passwords, comments, hosting or database settings. Running it again updates the same items — nothing is duplicated.', 'seoexpertindia-demo-importer' ); ?></p>
					<?php if ( $conflicts ) : ?>
						<p><?php esc_html_e( 'These existing pages will be replaced:', 'seoexpertindia-demo-importer' ); ?></p>
						<ul class="seidi-list">
							<?php foreach ( $conflicts as $c ) : ?>
								<li><?php echo esc_html( $c ); ?></li>
							<?php endforeach; ?>
						</ul>
					<?php endif; ?>
					<?php if ( $previous ) : ?>
						<?php /* translators: %s: version. */ ?>
						<p><?php printf( esc_html__( 'Demo version %s was imported before; importing again refreshes those pages with the demo content.', 'seoexpertindia-demo-importer' ), esc_html( $previous ) ); ?></p>
					<?php endif; ?>
				</div>
				<p><label><input type="checkbox" id="seidi-confirm"> <?php esc_html_e( 'I have a backup and understand that matching pages will be replaced.', 'seoexpertindia-demo-importer' ); ?></label></p>
				<p><button type="button" class="button button-primary button-hero" id="seidi-start" disabled><?php esc_html_e( 'Import Complete Website', 'seoexpertindia-demo-importer' ); ?></button></p>
			<?php endif; ?>
			<div class="seidi-progress" hidden>
				<div class="seidi-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="<?php esc_attr_e( 'Import progress', 'seoexpertindia-demo-importer' ); ?>"><span style="width:0"></span></div>
				<p class="seidi-status" role="status" aria-live="polite"></p>
				<ol class="seidi-log"></ol>
			</div>
			<div class="seidi-report"><?php echo seidi_report_html(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
		</div>
	</div>
	<?php
}
