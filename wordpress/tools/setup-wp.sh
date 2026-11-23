#!/bin/sh
# Builds a throwaway WordPress + Elementor test site in /tmp/wp (SQLite, PHP built-in server on :8099).
set -e
if [ ! -s /tmp/php-path.txt ]; then nix build nixpkgs#php83 --no-link --print-out-paths > /tmp/php-path.txt; fi
PHP=$(cat /tmp/php-path.txt)/bin/php
mkdir -p /tmp/wp && cd /tmp/wp
[ -d wordpress ] || { curl -sSL https://wordpress.org/latest.tar.gz | tar xz; }
cd wordpress/wp-content/plugins
[ -d sqlite-database-integration ] || { curl -sSL https://downloads.wordpress.org/plugin/sqlite-database-integration.latest-stable.zip -o /tmp/wp/s.zip && unzip -q /tmp/wp/s.zip; }
[ -d elementor ] || { curl -sSL https://downloads.wordpress.org/plugin/elementor.latest-stable.zip -o /tmp/wp/e.zip && unzip -q /tmp/wp/e.zip; }
cd /tmp/wp/wordpress
[ -f /tmp/wp/wp-cli.phar ] || curl -sSL https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar -o /tmp/wp/wp-cli.phar
printf '#!/bin/sh\nexec %s -d memory_limit=1024M /tmp/wp/wp-cli.phar --path=/tmp/wp/wordpress --allow-root "$@"\n' "$PHP" > /tmp/wp/wp; chmod +x /tmp/wp/wp
if [ ! -f wp-config.php ]; then
  cp wp-content/plugins/sqlite-database-integration/db.copy wp-content/db.php
  sed -i "s#{SQLITE_IMPLEMENTATION_FOLDER_PATH}#$PWD/wp-content/plugins/sqlite-database-integration#; s#{SQLITE_PLUGIN}#sqlite-database-integration/load.php#" wp-content/db.php
  cp wp-config-sample.php wp-config.php; sed -i "s/put your unique phrase here/k$$RANDOM/g" wp-config.php
  /tmp/wp/wp core install --url=http://localhost:8099 --title="SEO Expert India" --admin_user=admin --admin_password=admin12345 --admin_email=admin@example.com --skip-email
  /tmp/wp/wp option update siteurl http://localhost:8099; /tmp/wp/wp option update home http://localhost:8099; /tmp/wp/wp plugin activate elementor; /tmp/wp/wp rewrite structure '/%postname%/'
fi
cat > router.php <<'R'
<?php
$p = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
if ($p !== '/' && file_exists(__DIR__ . $p)) return false;
$_SERVER['SCRIPT_NAME'] = '/index.php';
require __DIR__ . '/index.php';
R
PHP_CLI_SERVER_WORKERS=6 nohup $PHP -d memory_limit=1024M -d max_execution_time=300 -d upload_max_filesize=64M -d post_max_size=64M -S 0.0.0.0:8099 router.php > /tmp/wp/server.log 2>&1 &
sleep 2; echo ready
