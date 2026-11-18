<?php
/**
 * SEO Expert India – enquiry mailer.
 * Upload with the website to a PHP host. Every site form posts here; nothing is stored.
 */
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const RECIPIENTS = ['info@seoexpertindia.biz', 'lucky.magarde@gmail.com', 'lokesh@seoexpertindia.biz'];
const SENDER = 'wordpress@seoexpertindia.biz';
const SENDER_NAME = 'SEO Expert India Website';

function reply(int $code, array $body): void { http_response_code($code); echo json_encode($body); exit; }
function field(array $src, string $key, int $max): string {
  $v = trim((string)($src[$key] ?? ''));
  $v = str_replace(["\r", "\0"], '', $v);
  return function_exists('mb_substr') ? mb_substr($v, 0, $max) : substr($v, 0, $max);
}
function esc(string $v): string { return htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') reply(405, ['ok' => false, 'error' => 'Method not allowed']);

$raw = file_get_contents('php://input') ?: '';
$in = stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false ? (json_decode($raw, true) ?: []) : $_POST;

// Hidden bot trap: real visitors never fill it.
if (field($in, 'company_fax', 200) !== '') reply(200, ['ok' => true]);

$name = str_replace("\n", ' ', field($in, 'name', 100));
$email = str_replace("\n", '', field($in, 'email', 255));
$phone = str_replace("\n", ' ', field($in, 'phone', 40));
$website = str_replace("\n", '', field($in, 'website', 500));
$budget = str_replace("\n", ' ', field($in, 'budget', 100));
$goals = field($in, 'goals', 5000);
$page = str_replace("\n", '', field($in, 'page_path', 300));

if ($name === '' || strlen($phone) < 7 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  reply(422, ['ok' => false, 'error' => 'Please fill in your name, a valid email and phone number.']);
}
if ($website !== '' && !preg_match('#^https?://[^\s<>"]+$#i', $website)) $website = '';
if ($page === '' || $page[0] !== '/' || str_starts_with($page, '//')) $page = '/';

// Basic flood protection: one enquiry per visitor every 30 seconds.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$lock = sys_get_temp_dir() . '/sei_enquiry_' . md5($ip);
if (is_file($lock) && time() - (int)@filemtime($lock) < 30) reply(429, ['ok' => false, 'error' => 'Please wait a moment before sending again.']);
@touch($lock);

$host = $_SERVER['HTTP_HOST'] ?? 'www.seoexpertindia.biz';
$pageUrl = 'https://' . preg_replace('/[^a-z0-9.\-:]/i', '', $host) . $page;
$when = (new DateTime('now', new DateTimeZone('Asia/Kolkata')))->format('d M Y, h:i A') . ' IST';

$rows = [
  ['Name', esc($name)],
  ['Email', '<a href="mailto:' . esc($email) . '" style="color:#b8891a;text-decoration:none;">' . esc($email) . '</a>'],
  ['Phone', '<a href="tel:' . esc(preg_replace('/[^0-9+]/', '', $phone)) . '" style="color:#b8891a;text-decoration:none;">' . esc($phone) . '</a>'],
  ['Website', $website !== '' ? '<a href="' . esc($website) . '" style="color:#b8891a;text-decoration:none;">' . esc($website) . '</a>' : '<span style="color:#94a3b8;">Not provided</span>'],
  ['Budget', $budget !== '' ? esc($budget) : '<span style="color:#94a3b8;">Not provided</span>'],
];
$rowHtml = '';
foreach ($rows as $i => [$label, $value]) {
  $bg = $i % 2 ? '#ffffff' : '#f8fafc';
  $rowHtml .= '<tr><td style="padding:12px 16px;background:' . $bg . ';width:130px;font-size:13px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid #e2e8f0;">' . $label . '</td><td style="padding:12px 16px;background:' . $bg . ';font-size:15px;color:#0f172a;border-bottom:1px solid #e2e8f0;">' . $value . '</td></tr>';
}
$message = $goals !== '' ? nl2br(esc($goals)) : '<span style="color:#94a3b8;">No message provided</span>';

$html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New website enquiry</title></head>'
. '<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">'
. '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 12px;"><tr><td align="center">'
. '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;">'
. '<tr><td style="background:#020817;padding:26px 28px;border-bottom:4px solid #d4a72c;">'
. '<div style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:.02em;">SEO Expert <span style="color:#d4a72c;">India</span></div>'
. '<div style="font-size:13px;color:#cbd5e1;margin-top:6px;">New enquiry from your website</div></td></tr>'
. '<tr><td style="padding:26px 28px 8px;"><h1 style="margin:0 0 6px;font-size:22px;color:#0f172a;">' . esc($name) . ' sent an enquiry</h1>'
. '<p style="margin:0;font-size:14px;color:#64748b;">Received ' . esc($when) . '</p></td></tr>'
. '<tr><td style="padding:18px 28px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;border-collapse:separate;">' . $rowHtml . '</table></td></tr>'
. '<tr><td style="padding:4px 28px 18px;"><div style="font-size:13px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px;">Message / Goals</div>'
. '<div style="background:#fffbeb;border-left:4px solid #d4a72c;border-radius:8px;padding:14px 16px;font-size:15px;line-height:1.6;color:#1e293b;">' . $message . '</div></td></tr>'
. '<tr><td style="padding:6px 28px 26px;"><a href="mailto:' . esc($email) . '?subject=' . rawurlencode('Re: Your enquiry with SEO Expert India') . '" style="display:inline-block;background:#d4a72c;color:#020817;font-weight:700;font-size:15px;text-decoration:none;padding:12px 22px;border-radius:8px;">Reply to ' . esc($name) . '</a></td></tr>'
. '<tr><td style="background:#f8fafc;padding:16px 28px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;">Submitted from <a href="' . esc($pageUrl) . '" style="color:#b8891a;">' . esc($pageUrl) . '</a></td></tr>'
. '</table></td></tr></table></body></html>';

$text = "New website enquiry\n\nName: $name\nEmail: $email\nPhone: $phone\nWebsite: " . ($website ?: '-') . "\nBudget: " . ($budget ?: '-') . "\n\nMessage:\n" . ($goals ?: '-') . "\n\nPage: $pageUrl\nReceived: $when\n";

$boundary = 'sei_' . bin2hex(random_bytes(12));
$subject = '=?UTF-8?B?' . base64_encode('New Enquiry: ' . $name . ' – SEO Expert India') . '?=';
$headers = implode("\r\n", [
  'From: ' . SENDER_NAME . ' <' . SENDER . '>',
  'Reply-To: ' . '=?UTF-8?B?' . base64_encode($name) . '?= <' . $email . '>',
  'MIME-Version: 1.0',
  'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
  'X-Mailer: SEO-Expert-India-Website',
]);
$body = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($text))
  . "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($html))
  . "--$boundary--\r\n";

$sent = @mail(implode(', ', RECIPIENTS), $subject, $body, $headers, '-f' . SENDER);
if (!$sent) { @unlink($lock); reply(500, ['ok' => false, 'error' => 'Email could not be sent. Please call or email us directly.']); }
reply(200, ['ok' => true]);
