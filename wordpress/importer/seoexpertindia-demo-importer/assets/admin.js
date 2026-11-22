(function () {
  'use strict';
  var start = document.getElementById('seidi-start');
  var confirmBox = document.getElementById('seidi-confirm');
  if (!start || !confirmBox) return;
  var box = document.querySelector('.seidi-progress');
  var bar = box.querySelector('.seidi-bar');
  var fill = bar.querySelector('span');
  var status = box.querySelector('.seidi-status');
  var log = box.querySelector('.seidi-log');
  var report = document.querySelector('.seidi-report');
  confirmBox.addEventListener('change', function () { start.disabled = !confirmBox.checked; });

  var line = function (text, cls) {
    var li = document.createElement('li');
    li.textContent = text;
    if (cls) li.className = cls;
    log.appendChild(li);
  };
  var setProgress = function (p) { fill.style.width = p + '%'; bar.setAttribute('aria-valuenow', String(p)); };
  var fail = function (message) {
    status.textContent = SEIDI.i18n.failed + ' ' + message;
    line(SEIDI.i18n.failed + ' ' + message, 'is-error');
    line(SEIDI.i18n.retry);
    start.disabled = false; confirmBox.disabled = false;
    window.onbeforeunload = null;
  };
  var step = function (name, offset, attempt) {
    var body = new FormData();
    body.append('action', 'seidi_step');
    body.append('nonce', SEIDI.nonce);
    body.append('step', name);
    body.append('offset', String(offset));
    fetch(SEIDI.ajaxUrl, { method: 'POST', body: body, credentials: 'same-origin' })
      .then(function (r) { return r.json().catch(function () { throw new Error('HTTP ' + r.status); }); })
      .then(function (res) {
        if (!res || !res.success) throw new Error((res && res.data && res.data.message) || 'Unknown error');
        var d = res.data;
        setProgress(d.progress);
        status.textContent = d.message;
        line(d.message);
        if (d.step === 'done') {
          window.onbeforeunload = null;
          report.innerHTML = d.report;
          start.textContent = start.getAttribute('data-again') || start.textContent;
          start.disabled = false; confirmBox.disabled = false;
          return;
        }
        step(d.step, d.offset, 0);
      })
      .catch(function (err) {
        // Network hiccups on shared hosting: retry the same batch twice before stopping.
        if (attempt < 2 && /HTTP 5|Failed to fetch|NetworkError/.test(String(err.message))) {
          setTimeout(function () { step(name, offset, attempt + 1); }, 2000);
          return;
        }
        fail(err.message || SEIDI.i18n.network);
      });
  };
  start.addEventListener('click', function () {
    if (!confirmBox.checked || !window.confirm(SEIDI.i18n.confirm)) return;
    start.disabled = true; confirmBox.disabled = true;
    box.hidden = false; log.innerHTML = ''; report.innerHTML = '';
    setProgress(0);
    window.onbeforeunload = function () { return true; };
    step('start', 0, 0);
  });
})();
