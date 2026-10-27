/* ══════════════════════════════════════════════════════════════════
   RENDU DE LA PAGE RÉSULTATS
══════════════════════════════════════════════════════════════════ */
var P = {};
new URLSearchParams(window.location.search).forEach(function (v, k) { P[k] = v; });
var R = run(P), C = R.C, SC = R.scenarios, S = SECT[C.sector];
var $ = function (id) { return document.getElementById(id); };

var OS_LBL = {Srv: 'Serveur Linux / Docker', WML: 'Windows · macOS · Linux', W: 'Windows uniquement', WL: 'Windows · Linux', WM: 'Windows · macOS', Web: 'Navigateur web', Mobile: 'Android · iOS'};
var SV_LBL = ['Cloud hors UE possible', 'Cloud UE / France compatible', 'Compatible souveraineté critique'];
var VOL_LBL = {leger: 'Léger (< 10 000 objets)', moyen: 'Moyen (10 000 – 500 000)', lourd: 'Lourd (> 1 million)'};
var SOUV_LBL = ['Standard', 'Sensible (UE / France)', 'Critique (interne)'];
var SI_LBL = {aucun: 'Aucun', azure: 'Microsoft Azure', m365: 'Microsoft 365', aws: 'AWS', google: 'Google Cloud', google_workspace: 'Google Workspace', apple_icloud: 'Apple / iCloud', on_premise: 'Serveurs internes', autocad_si: 'AutoCAD déjà licencié', arcgis_si: 'Esri déjà licencié', supermap_si: 'SuperMap déjà licencié', mapinfo_si: 'MapInfo déjà licencié', cloud_tier: 'Cloud souverain', bureautique_cloud: 'Bureautique cloud', nsp_si: 'Non précisé'};
var NEED_LBL = {dwg: 'Échange DWG / DXF (CAO)', bim: 'BIM / IFC', erp: 'ERP / CRM', bi: 'BI et tableaux de bord', iot: 'Capteurs et temps réel', opendata: 'Open data / INSPIRE', api: 'API REST', sso: 'SSO / annuaire', mobile: 'Collecte terrain mobile', forms: 'Formulaires métier', portal: 'Portail web métier', 'public': 'Diffusion au public', scal: 'Montée en charge', big: 'Gros volumes de données', etl: 'ETL / conversion de données', raster: 'Imagerie spécialisée'};

var ICON = {
  logiciels: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  plateforme: '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="M3 13l9 5 9-5"/>',
  bases: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  hebergement: '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/>',
  publication: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  imagerie: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 8"/>',
  terrain: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  etl: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
  bi: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
  iot: '<path d="M5 12a10 10 0 0 1 14 0M8 15a6 6 0 0 1 8 0M12 19h.01"/>',
  securite: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/>',
  support: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/>'
};
function icon(cat) { return '<span class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">' + (ICON[cat] || '') + '</svg></span>'; }
function nm(k) { return D[k].n.split(' (')[0]; }
function eur(n) { return n === 0 ? 'Gratuit' : fmt(n) + ' €'; }
var current = -1;

/* ── Jauge des paliers ── */
function gaugePos(sc) {
  var b = sc.band, f = b.max > b.min ? Math.min(1, Math.max(0, (sc.total - b.min) / (b.max - b.min))) : 0.5;
  return ((b.id + f) / 6) * 100;
}
function buildGauge() {
  var segs = BANDS.map(function (b) { return '<i' + (C.budgetKnown && b.id === C.recLevel ? ' class="mine"' : '') + '></i>'; }).join('');
  var marks = SC.map(function (sc) { return '<b style="left:' + gaugePos(sc).toFixed(1) + '%"><span>' + fmt(sc.total) + ' €</span></b>'; }).join('');
  var lbl = BANDS.map(function (b) { return '<span>' + b.short + '</span>'; }).join('');
  $('gauge').innerHTML = '<div class="gauge-bar">' + segs + marks + '</div><div class="gauge-lbl">' + lbl + '</div>' +
    '<p class="gauge-cap">' + (C.budgetKnown ? 'Votre fourchette est surlignée ; les traits marquent les trois scénarios.' : 'Budget non précisé : les traits marquent les trois scénarios autour du palier habituel du métier.') + '</p>';
}

/* ── Sélecteur de scénarios ── */
function fitInfo(sc) {
  var rel = bandRelation(sc, C);
  if (rel === 'dans') return ['in', 'Dans votre fourchette'];
  if (rel === 'sous') return ['low', 'Sous votre fourchette'];
  if (rel === 'dessus') return ['high', 'Au-dessus de votre fourchette'];
  return ['na', 'Palier ' + sc.palier];
}
function buildTabs() {
  $('scen').innerHTML = SC.map(function (sc, i) {
    var f = fitInfo(sc);
    return '<button type="button" aria-pressed="' + (i === current) + '" onclick="show(' + i + ')"><span class="r">' + sc.roleLbl + '</span>' +
      '<span class="t">' + fmt(sc.total) + ' <span class="u">€ / an</span></span><span class="p">Palier ' + sc.palier + '</span>' +
      '<span class="b">Fourchette ' + sc.band.short + '</span><span class="f ' + f[0] + '">' + f[1] + '</span></button>';
  }).join('');
}

/* ── En-tête ── */
function usersTxt() { return C.users + ' utilisateur' + (C.users > 1 ? 's' : ''); }
function buildFacts() {
  var rows = [['Métier', S.l], ['Équipe', usersTxt()], ['Budget', C.budgetKnown ? BANDS[C.recLevel].short + ' / an' : 'Non précisé'],
    ['Volume', VOL_LBL[P.volume] || 'Non précisé'], ['Souveraineté', SOUV_LBL[C.sovLvl]], ['SI existant', SI_LBL[P.si_existant] || 'Aucun']];
  $('facts').innerHTML = rows.map(function (r) { return '<div><dt>' + gl(r[0]) + '</dt><dd>' + escHtml(r[1]) + '</dd></div>'; }).join('');
}
function leadText(sc) {
  var main = [];
  ['logiciels', 'plateforme', 'bases', 'publication'].forEach(function (c) {
    var f = sc.keys.filter(function (k) { return D[k].cat === c; });
    if (f.length) main.push(nm(f[0]));
  });
  var t = 'Pour ' + S.l.toLowerCase() + ' (' + usersTxt() + '), ce scénario repose sur ' + main.join(', ') + '.';
  t += ' Coût estimé : ' + fmt(sc.total) + ' € par an, soit ' + (sc.total === 0 ? 'aucune licence' : 'un palier ' + sc.palier.toLowerCase()) + '.';
  return t;
}

/* ── Fiche brique (identique pour l'architecture et les alternatives) ── */
function card(k, sc, o) {
  var b = D[k], cat = CATS[b.cat], spec = lk(b.sp, sc.C.sector), seats = (b.p && b.p.u) ? seatsFor(b, sc.C) : 0;
  var seen = {};
  var rows = [];
  if (OS_LBL[b.os]) rows.push(['Plateforme', OS_LBL[b.os]]);
  rows.push(['Souveraineté', SV_LBL[b.sv]]);
  rows.push(['Support FR', b.fr === 1 ? 'Oui' : b.fr === 0 ? 'Limité' : 'Non précisé']);
  if (b.host) rows.push(['Exploitation', 'Auto-hébergé : serveur à administrer']);
  else if (b.cloud) rows.push(['Exploitation', 'Service géré par l’éditeur']);
  if (seats > 1) rows.push(['Licences', seats + ' × tarif unitaire']);
  if (b.req.length) rows.push(['Requiert', b.req.map(function (g) { return g.map(nm).join(' ou '); }).join(' + ')]);
  if (b.inc.length) rows.push(['Inclut', b.inc.map(nm).join(', ')]);
  var price = o.price, pxCls = price === 0 && !o.included ? ' free' : '';
  var pxTxt = o.included ? 'Inclus' : (price === 0 ? 'Gratuit' : fmt(price) + ' € / an') + (o.dep ? ' (dont ' + fmt(o.dep) + ' € de dépendances)' : '');
  var links = [];
  if (b.link) links.push('<a href="' + b.link + '" target="_blank" rel="noopener">Site</a>');
  if (b.mail) links.push('<a href="mailto:' + b.mail + '">Contact</a>');
  return '<article class="card' + (o.principal ? ' principal' : '') + (o.hide ? ' hidden alt-more' : '') + '">' +
    '<div class="card-h">' + icon(b.cat) + '<div><div class="tag">' + escHtml(cat.lbl) + (o.principal ? ' · brique principale' : '') + '</div><h4>' + escHtml(b.n) + '</h4><div class="sub">' + escHtml(b.sub) + '</div></div></div>' +
    '<div class="card-b">' + gl(b.d, seen) + '</div>' +
    (spec ? '<div class="pour"><b>' + gl('Spécificités métier') .replace('Spécificités métier', 'Spécificités') + ' · ' + escHtml(S.l) + '</b>' + gl(spec, seen) + '</div>' : '') +
    '<dl class="spec">' + rows.map(function (r) { return '<div><dt>' + gl(r[0]) + '</dt><dd>' + gl(r[1], seen) + '</dd></div>'; }).join('') + '</dl>' +
    '<div class="card-f"><span class="px' + pxCls + '">' + pxTxt + '</span>' +
    (o.tag ? '<span class="vs ' + o.tag[0] + '">' + o.tag[1] + '</span>' : '<span class="lnk">' + links.join('') + '</span>') + '</div></article>';
}

/* ── Bandeau de chiffres ── */
function renderStats(sc) {
  var rows = needRows(sc), ok = rows.filter(function (r) { return r[1] === 'ok'; }).length;
  var st = [[fmt(sc.total), ' € / an', 'Coût annuel estimé'], [String(sc.items.length), '', 'Briques dans l’architecture'], [rows.length ? ok + ' / ' + rows.length : '—', '', 'Exigences couvertes'], [String(C.users), '', 'Utilisateur' + (C.users > 1 ? 's' : '') + ' SIG']];
  $('stats').innerHTML = st.map(function (s) { return '<div class="stat"><div class="n">' + s[0] + (s[1] ? '<span class="u">' + s[1] + '</span>' : '') + '</div><div class="l">' + s[2] + '</div></div>'; }).join('');
}

/* ── Schéma : trajet de la donnée ── */
var FLOW = [
  ['Acquisition', 'imagerie', ['imagerie', 'terrain']],
  ['Données', 'bases', ['bases', 'etl']],
  ['Traitement', 'logiciels', ['logiciels', 'plateforme', 'bi', 'iot']],
  ['Hébergement et sécurité', 'hebergement', ['hebergement', 'securite', 'support']],
  ['Diffusion', 'publication', ['publication']]
];
function renderFlow(sc) {
  var firstSig = null;
  sc.items.forEach(function (it) { if (!firstSig && D[it.key].cat === 'logiciels') firstSig = it.key; });
  $('flow').innerHTML = FLOW.map(function (col) {
    var its = sc.items.filter(function (it) { return col[2].indexOf(it.cat) >= 0; });
    return '<div class="flow-col"><div class="flow-h">' + icon(col[1]) + '<b>' + col[0] + '</b></div>' +
      (its.length ? its.map(function (it) { return '<div class="flow-item' + (it.key === firstSig ? ' main' : '') + '">' + escHtml(nm(it.key)) + '<small>' + (it.included ? 'inclus' : it.price === 0 ? 'gratuit' : fmt(it.price) + ' €/an') + '</small></div>'; }).join('') : '<div class="flow-empty">Non requis à ce palier</div>') + '</div>';
  }).join('');
}

/* ── Sections ── */
function renderCards(sc) {
  $('nb').textContent = sc.items.length + ' briques';
  var firstSig = true;
  $('cards').innerHTML = sc.items.map(function (it) {
    var principal = D[it.key].cat === 'logiciels' && firstSig; if (principal) firstSig = false;
    return card(it.key, sc, {price: it.price, included: it.included, principal: principal});
  }).join('');
}

function renderBudget(sc) {
  var seatsNote = function (k) { var b = D[k]; return (b.p && b.p.u && seatsFor(b, sc.C) > 1) ? ' × ' + seatsFor(b, sc.C) : ''; };
  var rows = sc.items.map(function (it) {
    return '<tr><td>' + escHtml(CATS[it.cat].lbl) + '</td><td>' + gl(nm(it.key)) + (seatsNote(it.key) ? '<span class="s">licences' + seatsNote(it.key) + '</span>' : '') + '</td><td class="num">' + (it.included ? 'inclus' : eur(it.price)) + '</td></tr>';
  }).join('');
  rows += '<tr class="total"><td colspan="2">Total annuel estimé</td><td class="num">' + fmt(sc.total) + ' €</td></tr>';
  if (sc.perUser) rows += '<tr><td colspan="2">Par utilisateur (' + C.users + ')</td><td class="num">' + fmt(sc.perUser) + ' €</td></tr>';
  $('budgetT').innerHTML = '<table class="t"><thead><tr><th>Couche</th><th>Brique</th><th class="num">€ / an</th></tr></thead><tbody>' + rows + '</tbody></table>';
  var rel = bandRelation(sc, C), rb = BANDS[C.recLevel], f = fitInfo(sc), why;
  if (C.budgetKnown) {
    why = 'Votre fourchette : <strong>' + rb.short + '</strong>. Ce scénario coûte <strong>' + fmt(sc.total) + ' €</strong> : ' +
      (rel === 'dans' ? 'il s’inscrit dans votre fourchette.' : rel === 'sous' ? 'il est sous votre fourchette (au moins ' + fmt(rb.min - sc.total) + ' € d’économie).' : 'il dépasse le plafond de votre fourchette' + (sc.total > rb.max ? ' de ' + fmt(sc.total - rb.max) + ' €.' : '.'));
  } else {
    why = 'Budget non précisé : le palier habituel du métier est <strong>' + rb.short + '</strong>. Fourchette de ce scénario : <strong>' + sc.band.short + '</strong>.';
  }
  if (sc.status !== 'in') why += ' Ce palier ne peut pas être rempli ou plafonné exactement avec vos contraintes (' + (sc.status === 'low' ? 'peu de briques pertinentes à ce niveau' : 'nombre d’utilisateurs élevé') + ').';
  $('fitline').className = 'fitline ' + f[0];
  $('fitline').innerHTML = why;
}

function renderCompare() {
  var cats = CAT_ORDER.filter(function (c) { return SC.some(function (sc) { return sc.keys.some(function (k) { return D[k].cat === c; }); }); });
  var h = '<table class="t" id="cmp"><thead><tr><th>Couche</th>' + SC.map(function (sc, i) { return '<th data-c="' + i + '">' + sc.roleLbl + '<br>' + sc.band.short + '</th>'; }).join('') + '</tr></thead><tbody>';
  cats.forEach(function (c) {
    h += '<tr><td>' + escHtml(CATS[c].lbl) + '</td>' + SC.map(function (sc, i) {
      var its = sc.items.filter(function (it) { return it.cat === c; });
      return '<td data-c="' + i + '">' + (its.length ? its.map(function (it) { return escHtml(nm(it.key)) + '<span class="s">' + (it.included ? 'inclus' : eur(it.price)) + '</span>'; }).join('') : '<span class="s">—</span>') + '</td>';
    }).join('') + '</tr>';
  });
  h += '<tr class="total"><td>Total / an</td>' + SC.map(function (sc, i) { return '<td data-c="' + i + '" class="num">' + fmt(sc.total) + ' €</td>'; }).join('') + '</tr></tbody></table>';
  $('compareT').innerHTML = h;
}
function markCompare(i) {
  document.querySelectorAll('#cmp [data-c]').forEach(function (e) { e.classList.toggle('cur', +e.getAttribute('data-c') === i); });
}

function needRows(sc) {
  var rows = [];
  C.needs.forEach(function (n) {
    var by = sc.keys.filter(function (k) { return D[k].tg.indexOf(n) >= 0; });
    var st = by.length ? 'ok' : 'ko', txt = by.slice(0, 4).map(nm).join(', ');
    if (!by.length && n === 'dwg' && sc.keys.indexOf('qgis') >= 0) { st = 'part'; txt = 'Lecture seule via GDAL dans QGIS ; édition DWG native à ajouter (BricsCAD, AutoCAD)'; }
    if (!by.length && st === 'ko') txt = 'Aucune brique de ce scénario ne le couvre';
    if (NEED_LBL[n]) rows.push([NEED_LBL[n], st, txt]);
  });
  var rel = bandRelation(sc, C);
  if (C.budgetKnown) rows.push(['Budget ' + BANDS[C.recLevel].short, rel === 'dans' ? 'ok' : 'part', rel === 'dans' ? 'Dans la fourchette' : rel === 'sous' ? 'Sous la fourchette' : 'Au-dessus de la fourchette']);
  if (C.sovLvl > 0) {
    var bad = sc.keys.filter(function (k) { return D[k].sv < C.sovLvl && !(D[k].crit === 'ent' && sc.keys.indexOf('arcgis_ent') >= 0); });
    rows.push(['Souveraineté ' + SOUV_LBL[C.sovLvl].toLowerCase(), bad.length ? 'ko' : 'ok', bad.length ? bad.map(nm).join(', ') : 'Toutes les briques respectent ce niveau']);
  }
  if (C.mac) { var win = sc.keys.filter(function (k) { return D[k].win; }); rows.push(['Poste macOS', win.length ? 'ko' : 'ok', win.length ? win.map(nm).join(', ') : 'Aucune brique réservée à Windows']); }
  if (C.frSupport) { var fr = sc.keys.filter(function (k) { return D[k].fr === 1; }).length; rows.push(['Support en français', 'ok', fr + ' brique' + (fr > 1 ? 's' : '') + ' avec support francophone']); }
  return rows;
}
function renderNeeds(sc) {
  var rows = needRows(sc), ok = rows.filter(function (r) { return r[1] === 'ok'; }).length;
  $('needsT').innerHTML = rows.length ? '<table class="t"><thead><tr><th>Exigence</th><th>État</th><th>Couverte par</th></tr></thead><tbody>' +
    rows.map(function (r) { return '<tr><td>' + gl(r[0]) + '</td><td><span class="lv ' + r[1] + '">' + ({ok: 'Couverte', ko: 'Non couverte', part: 'Partielle'}[r[1]]) + '</span></td><td>' + escHtml(r[2]) + '</td></tr>'; }).join('') + '</tbody></table>' : '<p class="small">Aucune exigence particulière exprimée : le scénario repose sur le profil type du métier.</p>';
  $('needsN').textContent = rows.length ? ok + ' sur ' + rows.length + ' couvertes' : '';
}

function renderCompat(sc) {
  var order = {natif: 0, via: 1, limite: 2, non: 3}, h = '';
  var pairs = sc.compat.slice().sort(function (a, b) { return order[a.niv] - order[b.niv]; });
  if (pairs.length) {
    h += '<div class="sub-h">Interopérabilité entre briques du scénario</div><div class="tw"><table class="t"><thead><tr><th>Niveau</th><th>Briques</th><th>Détail</th></tr></thead><tbody>' +
      pairs.map(function (p) { return '<tr><td><span class="lv ' + p.niv + '">' + gl(NIVEAU_LBL[p.niv]) + '</span></td><td>' + escHtml(nm(p.a)) + ' ↔ ' + escHtml(nm(p.b)) + '</td><td>' + gl(p.note) + '</td></tr>'; }).join('') + '</tbody></table></div>';
  }
  var deps = [];
  sc.keys.forEach(function (k) { D[k].req.forEach(function (g) {
    var f = g.filter(function (x) { return sc.keys.indexOf(x) >= 0 || sc.keys.some(function (s) { return D[s].inc.indexOf(x) >= 0; }); });
    if (f.length) deps.push([nm(k), nm(f[0])]);
  }); });
  if (deps.length) h += '<div class="sub-h">' + gl('Dépendances') + ' vérifiées</div><div class="tw"><table class="t"><thead><tr><th>Brique</th><th>Requiert</th><th>État</th></tr></thead><tbody>' +
    deps.map(function (d) { return '<tr><td>' + escHtml(d[0]) + '</td><td>' + escHtml(d[1]) + '</td><td><span class="lv ok">Présent</span></td></tr>'; }).join('') + '</tbody></table></div>';
  if (sc.conflicts.length) h += '<div class="sub-h">Incompatibilités</div><div class="tw"><table class="t"><tbody>' + sc.conflicts.map(function (c) { return '<tr><td><span class="lv non">Conflit</span></td><td>' + escHtml(nm(c.a)) + ' ↔ ' + escHtml(nm(c.b)) + '</td><td>' + escHtml(c.note) + '</td></tr>'; }).join('') + '</tbody></table></div>';
  if (!h) h = '<p class="small">Aucune interaction particulière à signaler : les briques de ce scénario sont indépendantes ou standard.</p>';
  $('compatT').innerHTML = h;
}

function renderWhy(sc) {
  var seen = {};
  $('whyL').innerHTML = sc.reasons.map(function (r) { return '<li><div>' + glHtml(r.txt, seen) + '</div></li>'; }).join('');
}
function renderNotes(sc) {
  var seen = {};
  if (!sc.alerts.length) { $('notes').innerHTML = ''; return; }
  $('notes').innerHTML = '<div class="notes"><h3>Points de vigilance (' + sc.alerts.length + ')</h3><ul>' + sc.alerts.map(function (a) { return '<li>' + glHtml(a, seen) + '</li>'; }).join('') + '</ul></div>';
}

function renderAlts(sc) {
  var alts = alternatives(sc), h = '';
  CAT_ORDER.forEach(function (c) {
    var a = alts[c]; if (!a) return;
    var cards = a.list.map(function (x, i) {
      return card(x.k, sc, {price: x.p, dep: x.dep, tag: budgetTagCls(x.p, a.winP), hide: i >= 3});
    }).join('');
    h += '<div><div class="cat-h"><h3>' + escHtml(CATS[c].lbl) + '</h3><span>retenu : ' + (a.winP === 0 ? 'gratuit' : fmt(a.winP) + ' €') + '</span></div><div class="cards">' + cards + '</div>' +
      (a.list.length > 3 ? '<div class="more"><button type="button" onclick="toggleMore(this)">Afficher ' + (a.list.length - 3) + ' autre' + (a.list.length - 3 > 1 ? 's' : '') + '</button></div>' : '') + '</div>';
  });
  $('altC').innerHTML = h || '<p class="small">Aucune alternative admissible avec vos contraintes.</p>';
}
function budgetTagCls(p, win) {
  var t = budgetTag(p, win), map = {'t-inf': 'inf', 't-sim': 'sim', 't-sup': 'sup', 't-hb': 'hb'};
  return [map[t[0]], t[1]];
}
function toggleMore(btn) {
  var box = btn.closest('div').parentNode, hidden = box.querySelectorAll('.alt-more');
  var open = btn.getAttribute('data-open') === '1';
  hidden.forEach(function (e) { e.classList.toggle('hidden', open); });
  btn.setAttribute('data-open', open ? '0' : '1');
  btn.textContent = open ? 'Afficher ' + hidden.length + ' autre' + (hidden.length > 1 ? 's' : '') : 'Réduire';
}

/* ── Affichage d'un scénario ── */
function show(i) {
  current = i;
  var sc = SC[i];
  buildTabs(); markCompare(i);
  $('h1').innerHTML = escHtml(S.tag) + ' <span class="acc">' + escHtml(sc.palier) + '</span>';
  $('lead').textContent = leadText(sc);
  renderNotes(sc); renderStats(sc); renderFlow(sc); renderCards(sc); renderBudget(sc); renderNeeds(sc); renderCompat(sc); renderWhy(sc); renderAlts(sc);
  $('contact').href = 'contact.html' + window.location.search + (window.location.search ? '&' : '?') + 'scenario=' + sc.level + '&total=' + sc.total;
  document.title = S.tag + ' — Diagnostic SIG Expert';
}

buildGauge(); buildFacts(); renderCompare();
show(R.recIdx);

/* sommaire */
(function () {
  var links = document.querySelectorAll('.subnav a');
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (l) { l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id); }); });
  }, {rootMargin: '-80px 0px -72% 0px'});
  document.querySelectorAll('section[id]').forEach(function (s) { io.observe(s); });
})();
