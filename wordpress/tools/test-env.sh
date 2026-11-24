#!/bin/sh
# Recreates the throwaway WordPress test site, installs the theme + importer from this repo and runs the import.
set -e
sh /dev-server/wordpress/tools/setup-wp.sh
W=/tmp/wp/wp; WC=/tmp/wp/wordpress/wp-content
$W option update siteurl http://localhost:8099 >/dev/null; $W option update home http://localhost:8099 >/dev/null
mkdir -p $WC/themes/seoexpertindia $WC/plugins/seoexpertindia-demo-importer $WC/mu-plugins
rsync -a --delete /dev-server/wordpress/theme/seoexpertindia/ $WC/themes/seoexpertindia/
rsync -a --delete /dev-server/wordpress/importer/seoexpertindia-demo-importer/ $WC/plugins/seoexpertindia-demo-importer/
[ -d $WC/plugins/seoexpertindia-demo-importer/data ] || cp -r /mnt/documents/.lovable/wpbuild/out/data $WC/plugins/seoexpertindia-demo-importer/data
cat > $WC/mu-plugins/mail-log.php <<'M'
<?php
// TEST ONLY: capture outgoing mail instead of sending it.
add_filter( 'pre_wp_mail', function ( $null, $atts ) { file_put_contents( '/tmp/wp/mail.log', json_encode( $atts ) . "\n", FILE_APPEND ); return true; }, 10, 2 );
M
$W theme activate seoexpertindia; $W plugin activate seoexpertindia-demo-importer
$W eval-file /dev-server/wordpress/tools/run-import.php | tail -2
echo testenv-ready
