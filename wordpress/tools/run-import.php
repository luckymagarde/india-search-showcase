<?php
// Runs the demo import step by step exactly as the dashboard does (wp eval-file, as admin).
wp_set_current_user( 1 );
$imp = new SEIDI_Importer();
$step = 'start'; $offset = 0; $n = 0; $t = microtime( true );
while ( 'done' !== $step && $n++ < 200 ) {
	$s = microtime( true );
	list( $step, $offset, $msg ) = $imp->run( $step, $offset );
	printf( "%-9s %4d %5.1fs %s\n", $step, $offset, microtime( true ) - $s, $msg );
}
printf( "total %.1fs\n", microtime( true ) - $t );
echo wp_json_encode( get_option( 'seidi_report' ) ), "\n";
