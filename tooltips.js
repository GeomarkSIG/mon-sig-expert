/* ══════════════════════════════════════════════════════════════════
   INFOBULLES — repère les termes du lexique dans un texte et affiche
   définition + sources au survol, au focus clavier ou au toucher.
══════════════════════════════════════════════════════════════════ */
var GL_BY_ID = {}, GL_RE = null, GL_MAP = {};
(function () {
  var forms = [];
  GLOSS.forEach(function (g) {
    GL_BY_ID[g.id] = g;
    [g.t].concat(g.al).forEach(function (f) { if (f && f.length > 1) { GL_MAP[f.toLowerCase()] = g.id; forms.push(f); } });
  });
  forms.sort(function (a, b) { return b.length - a.length; });
  var esc = function (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
  GL_RE = new RegExp('(?<![\\wÀ-ÿ\\-])(' + forms.map(esc).join('|') + ')(?![\\wÀ-ÿ\\-])', 'gi');
})();

function escHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]; }); }

/* gl(texte) : texte échappé, première occurrence de chaque terme enveloppée */
function gl(text, seen) {
  seen = seen || {};
  return escHtml(text).replace(GL_RE, function (m) {
    var id = GL_MAP[m.toLowerCase()];
    if (!id || seen[id]) return m;
    seen[id] = 1;
    return '<span class="tt" tabindex="0" data-g="' + id + '">' + m + '</span>';
  });
}

/* glHtml(html) : même chose sur du HTML de confiance (balises conservées), emojis retirés */
function glHtml(html, seen) {
  seen = seen || {};
  var box = document.createElement('div');
  box.innerHTML = html.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}️]/gu, '').replace(/^\s+/, '');
  var w = document.createTreeWalker(box, NodeFilter.SHOW_TEXT), nodes = [];
  while (w.nextNode()) nodes.push(w.currentNode);
  nodes.forEach(function (n) {
    var h = gl(n.nodeValue, seen);
    if (h !== escHtml(n.nodeValue)) { var s = document.createElement('span'); s.innerHTML = h; n.parentNode.replaceChild(s, n); }
  });
  return box.innerHTML;
}

(function () {
  var tip, hideT = null, cur = null;
  function build() {
    tip = document.createElement('div'); tip.id = 'tip'; tip.setAttribute('role', 'tooltip');
    document.body.appendChild(tip);
    tip.addEventListener('mouseenter', function () { clearTimeout(hideT); });
    tip.addEventListener('mouseleave', hide);
  }
  function show(el) {
    var g = GL_BY_ID[el.getAttribute('data-g')]; if (!g) return;
    clearTimeout(hideT); cur = el;
    var src = g.u.slice(0, 2).map(function (u) { return '<a href="' + u[1] + '" target="_blank" rel="noopener">' + escHtml(u[0]) + ' ↗</a>'; }).join(' · ');
    tip.innerHTML = '<div class="tc">' + escHtml(g.c) + '</div><div class="tn">' + escHtml(g.t) + '</div>' + escHtml(g.d) +
      '<div class="tl">' + (src ? 'Sources : ' + src + '<br>' : '') + '<a href="lexique.html#' + g.id + '">Voir dans le lexique →</a></div>';
    tip.style.display = 'block';
    var r = el.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight;
    var x = Math.min(Math.max(8, r.left), window.innerWidth - w - 8);
    var y = r.bottom + 8; if (y + h > window.innerHeight - 8) y = Math.max(8, r.top - h - 8);
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  }
  function hide() { hideT = setTimeout(function () { if (tip) tip.style.display = 'none'; cur = null; }, 140); }
  document.addEventListener('DOMContentLoaded', build);
  document.addEventListener('mouseover', function (e) { var t = e.target.closest && e.target.closest('.tt'); if (t) show(t); });
  document.addEventListener('mouseout', function (e) { if (e.target.closest && e.target.closest('.tt')) hide(); });
  document.addEventListener('focusin', function (e) { var t = e.target.closest && e.target.closest('.tt'); if (t) show(t); });
  document.addEventListener('focusout', function (e) { if (e.target.closest && e.target.closest('.tt')) hide(); });
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('.tt');
    if (t) { if (cur === t && tip.style.display === 'block') { tip.style.display = 'none'; cur = null; } else show(t); }
    else if (tip && !e.target.closest('#tip')) tip.style.display = 'none';
  });
  window.addEventListener('scroll', function () { if (tip) tip.style.display = 'none'; }, {passive: true});
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && tip) tip.style.display = 'none'; });
})();
