/* SEO Expert India – site behaviour (no dependencies). */
(function () {
  'use strict';
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Header: mobile menu + Services mega menu ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var toggle = header.querySelector('.site-menu-toggle');
    var nav = header.querySelector('#site-navigation');
    var setOpen = function (open) {
      if (!toggle || !nav) return;
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      var tpl = header.querySelector(open ? 'template[data-icon="x"]' : 'template[data-icon="menu"]');
      if (tpl) toggle.innerHTML = tpl.innerHTML;
    };
    if (toggle) toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    $$('.site-services', header).forEach(function (box) {
      var btn = box.querySelector('.site-dropdown-toggle');
      var panel = box.querySelector('.site-submenu');
      var timer;
      var hoverable = function () { return window.matchMedia('(min-width:1151px) and (hover:hover)').matches; };
      var show = function (open) {
        clearTimeout(timer);
        box.classList.toggle('expanded', open);
        if (panel) panel.hidden = !open;
        if (btn) {
          btn.setAttribute('aria-expanded', String(open));
          var first = box.querySelector('a');
          btn.setAttribute('aria-label', (open ? 'Collapse ' : 'Expand ') + (first ? first.textContent : 'Services') + ' menu');
        }
      };
      box.addEventListener('mouseenter', function () { if (hoverable()) show(true); });
      box.addEventListener('mouseleave', function () { if (hoverable()) { clearTimeout(timer); timer = setTimeout(function () { show(false); }, 250); } });
      box.addEventListener('focusin', function () { if (hoverable()) show(true); });
      if (btn) btn.addEventListener('click', function () { show(!box.classList.contains('expanded')); });
      box.addEventListener('keydown', function (e) { if (e.key === 'Escape') { show(false); if (btn) btn.focus(); } });
      document.addEventListener('pointerdown', function (e) { if (!box.contains(e.target)) show(false); });
      $$('.site-category-toggle', box).forEach(function (b) {
        b.addEventListener('click', function () {
          var cat = b.closest('.site-mega-category');
          var open = !cat.classList.contains('category-open');
          cat.classList.toggle('category-open', open);
          b.setAttribute('aria-expanded', String(open));
        });
      });
    });
    $$('a', header).forEach(function (a) {
      a.addEventListener('click', function () { var h = a.getAttribute('href') || ''; if (h.charAt(0) === '#') setOpen(false); });
    });
  }

  /* ---------- Tabs (platforms, services) ---------- */
  $$('[data-sei-tabs]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    var select = function (i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tabs[i].focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length, next = i;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i + n - 1) % n;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = n - 1;
        else return;
        e.preventDefault(); select(next, true);
      });
    });
  });

  /* ---------- FAQ accordions (one answer open at a time) ---------- */
  var PLUS = '<path d="M5 12h14"></path><path d="M12 5v14"></path>';
  var MINUS = '<path d="M5 12h14"></path>';
  $$('.ss-faq-q, .sp-faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var ss = btn.classList.contains('ss-faq-q');
      var scope = btn.closest(ss ? '.ss-faq' : '.sp-faq-layout') || document;
      var open = btn.getAttribute('aria-expanded') !== 'true';
      $$(ss ? '.ss-faq-q' : '.sp-faq-question', scope).forEach(function (b) {
        var on = open && b === btn;
        b.setAttribute('aria-expanded', String(on));
        var answer = document.getElementById(b.getAttribute('aria-controls'));
        if (ss) {
          var item = b.closest('.ss-faq-item');
          if (item) item.classList.toggle('open', on);
          if (answer) { answer.setAttribute('aria-hidden', String(!on)); if (on) answer.removeAttribute('inert'); else answer.setAttribute('inert', ''); }
        } else {
          if (answer) answer.hidden = !on;
          var svg = b.querySelector('svg');
          if (svg) svg.innerHTML = on ? MINUS : PLUS;
        }
      });
    });
  });

  /* ---------- Strategy videos: load YouTube only when played ---------- */
  $$('[data-sei-video]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var box = btn.closest('.ss-video');
      var src = btn.getAttribute('data-sei-video') || '';
      if (!box || !/^https:\/\/www\.youtube-nocookie\.com\/embed\//.test(src)) return;
      var card = btn.closest('.ss-video-card');
      var frame = document.createElement('iframe');
      frame.src = src + (src.indexOf('?') > -1 ? '&' : '?') + 'autoplay=1';
      frame.title = card && card.querySelector('h3') ? card.querySelector('h3').textContent : 'YouTube video';
      frame.allow = 'encrypted-media; picture-in-picture; autoplay';
      frame.allowFullscreen = true;
      box.innerHTML = '';
      box.appendChild(frame);
    });
  });

  /* ---------- Reveal animations + back to top ---------- */
  var reveal = $$('.ss-reveal, .ss-tl-item');
  if (reveal.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    reveal.forEach(function (el) { io.observe(el); });
  } else reveal.forEach(function (el) { el.classList.add('in'); });
  if (!document.body.classList.contains('sei-layout-home')) {
    $$('#backToTop').forEach(function (b) { b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); }); });
  }

  /* ---------- Tool logos: hide the letter fallback once a logo loads ---------- */
  $$('img.tool-brand-icon').forEach(function (img) {
    var done = function () { if (img.previousElementSibling) img.previousElementSibling.style.display = 'none'; };
    if (img.complete && img.naturalWidth) done(); else img.addEventListener('load', done);
    img.addEventListener('error', function () { img.style.display = 'none'; });
  });

  /* ---------- Enquiry forms ---------- */
  var cfg = window.SEI_SITE || {};
  var started = Date.now();
  var normalizeWebsite = function (value) {
    var input = value.trim();
    if (!input) return '';
    if (/\s/.test(input) || /\\/.test(input)) return null;
    var candidate = /^https?:\/\//i.test(input) ? input : 'https://' + input;
    try {
      var url = new URL(candidate);
      if (['http:', 'https:'].indexOf(url.protocol) < 0 || url.username || url.password || url.port) return null;
      var labels = url.hostname.split('.');
      if (labels.length < 2 || labels.some(function (l) { return !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(l); })) return null;
      if (!/^[a-z]{2,63}$/i.test(labels[labels.length - 1])) return null;
      return candidate;
    } catch (e) { return null; }
  };
  var addTrap = function (form) {
    if (form.querySelector('[name="company_fax"]')) return;
    var trap = document.createElement('input');
    trap.name = 'company_fax'; trap.type = 'text'; trap.hidden = true; trap.tabIndex = -1; trap.autocomplete = 'off';
    trap.setAttribute('aria-hidden', 'true');
    form.appendChild(trap);
  };
  $$('form#leadForm').forEach(addTrap);
  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!(form instanceof HTMLFormElement) || form.id !== 'leadForm') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (form.dataset.pending) return;
    addTrap(form);
    var read = function (n) { var el = form.elements.namedItem(n); return el && 'value' in el ? String(el.value) : ''; };
    var errors = {};
    if (!read('name').trim()) errors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(read('email').trim())) errors.email = 'Please enter a valid email.';
    if (read('phone').trim().length < 7) errors.phone = 'Please enter your number.';
    var website = normalizeWebsite(read('site'));
    if (website === null) errors.site = 'Please enter a valid website, such as example.com.';
    ['name', 'email', 'phone', 'site'].forEach(function (n) {
      var wrap = form.querySelector('#f-' + n); if (wrap) wrap.classList.toggle('error', !!errors[n]);
      var input = form.querySelector('#' + n); if (input) input.setAttribute('aria-invalid', String(!!errors[n]));
    });
    var feedback = form.querySelector('[data-contact-feedback]');
    if (!feedback) { feedback = document.createElement('p'); feedback.setAttribute('data-contact-feedback', 'true'); feedback.setAttribute('role', 'alert'); form.appendChild(feedback); }
    feedback.textContent = '';
    var first = Object.keys(errors)[0];
    if (first) { feedback.textContent = errors[first]; var bad = form.querySelector('[aria-invalid="true"]'); if (bad) bad.focus(); return; }
    var button = form.querySelector('.submit');
    var label = button ? button.textContent : 'Send enquiry';
    form.dataset.pending = '1';
    if (button) { button.disabled = true; button.textContent = 'Sending…'; }
    var body = new FormData();
    body.append('action', cfg.action || 'sei_enquiry');
    body.append('name', read('name')); body.append('email', read('email')); body.append('phone', read('phone'));
    body.append('website', website || ''); body.append('budget', read('budget')); body.append('goals', read('goals'));
    body.append('page_path', window.location.pathname); body.append('company_fax', read('company_fax'));
    body.append('sei_started', String(started));
    fetch(cfg.ajaxUrl || '/wp-admin/admin-ajax.php', { method: 'POST', body: body, credentials: 'same-origin' })
      .then(function (r) { return r.json().catch(function () { return null; }).then(function (j) { return { ok: r.ok, json: j }; }); })
      .then(function (res) {
        if (!res.ok || !res.json || !res.json.ok) throw new Error((res.json && res.json.error) || '');
        form.style.display = 'none';
        var shell = form.closest('.form-shell');
        var success = shell ? shell.querySelector('#fSuccess') : null;
        if (success) { success.classList.add('show'); success.setAttribute('role', 'status'); }
      })
      .catch(function (err) { feedback.textContent = (err && err.message) || 'Your enquiry could not be sent. Please try again.'; })
      .then(function () { delete form.dataset.pending; if (button) { button.disabled = false; button.textContent = label; } });
  }, true);
})();
