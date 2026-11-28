"""Validate the generated delivery archives without a WordPress installation."""
import io
import json
import os
from pathlib import Path
import unittest
import zipfile


DIST = Path(os.environ.get('SEI_DIST', '/tmp/seoexpertindia-packages'))


class PackageTests(unittest.TestCase):
    def test_archives_are_safe_and_integral(self):
        paths = sorted(DIST.glob('*.zip'))
        self.assertEqual(len(paths), 4)
        for path in paths:
            with self.subTest(package=path.name), zipfile.ZipFile(path) as archive:
                self.assertIsNone(archive.testzip())
                for name in archive.namelist():
                    parts = Path(name).parts
                    self.assertFalse(name.startswith('/'))
                    self.assertNotIn('..', parts)
                    self.assertFalse(set(parts) & {'.git', 'node_modules', '.env', '__pycache__'})

    def test_import_contains_all_source_pages_and_media(self):
        with zipfile.ZipFile(DIST / 'seoexpertindia-demo-importer.zip') as archive:
            root = 'seoexpertindia-demo-importer/data/'
            manifest = json.loads(archive.read(root + 'manifest.json'))
            self.assertEqual(len(manifest['pages']), 36)
            self.assertEqual(len({page['path'] for page in manifest['pages']}), 36)
            self.assertEqual(len(manifest['media']), 129)
            for page in manifest['pages']:
                self.assertIsInstance(json.loads(archive.read(root + 'pages/' + page['key'] + '.json')), list)
            for media in manifest['media']:
                self.assertGreater(len(archive.read(root + 'media/' + media['file'])), 0)

    def test_service_menu_keeps_29_local_destinations(self):
        with zipfile.ZipFile(DIST / 'seoexpertindia-demo-importer.zip') as archive:
            manifest = json.loads(archive.read('seoexpertindia-demo-importer/data/manifest.json'))
            destinations = [item['path'] for column in manifest['menu']['mega'] for item in column['items']]
            self.assertEqual(len(destinations), 29)
            self.assertEqual(len(set(destinations)), 29)
            page_paths = {page['path'] for page in manifest['pages']}
            for destination in destinations:
                self.assertTrue(destination.startswith('/service/'))
                self.assertIn(destination, page_paths)

    def test_bundle_contains_installable_archives_and_limits_report(self):
        with zipfile.ZipFile(DIST / 'seoexpertindia-complete-bundle.zip') as archive:
            root = 'seoexpertindia-complete-bundle/'
            for name in ('seoexpertindia-theme.zip', 'seoexpertindia-demo-importer.zip', 'seoexpertindia-elementor-templates.zip'):
                content = archive.read(root + name)
                self.assertEqual(content, (DIST / name).read_bytes())
                with zipfile.ZipFile(io.BytesIO(content)) as nested:
                    self.assertIsNone(nested.testzip())
            self.assertGreater(len(archive.read(root + 'README.md')), 0)
            self.assertGreater(len(archive.read(root + 'TESTING-REPORT.md')), 0)


if __name__ == '__main__':
    unittest.main()