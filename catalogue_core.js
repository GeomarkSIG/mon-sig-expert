/* ══════════════════════════════════════════════════════════════════
   CATALOGUE — NOYAU
   Secteurs, catégories, fabrique de briques, modèle de prix.
   Les prix sont des ordres de grandeur annuels (€ HT) : indicatifs.
══════════════════════════════════════════════════════════════════ */
var SECT = {
  collectivite:{l:'Collectivité Territoriale',      g:'pub', e:'🏛️', tag:'La Forteresse Territoriale',     def:2},
  etat:        {l:'État / Établissement public',    g:'pub', e:'🇫🇷', tag:'Le Socle Régalien',               def:3},
  geometre:    {l:'Géomètre-Expert / Topographe',   g:'geo', e:'📐', tag:'Le Géomètre Connecté',            def:2},
  btp:         {l:'BTP / Infrastructures / VRD',    g:'geo', e:'🏗️', tag:'Le Chantier Numérique',           def:2},
  bet_env:     {l:"BET Environnement / Écologie",   g:'env', e:'🌿', tag:'La Sentinelle Environnementale',  def:2},
  agriculture: {l:'Agriculture / Viticulture',      g:'env', e:'🌾', tag:"L'Agriculteur Connecté",          def:1},
  energie:     {l:'Énergie / Réseaux',              g:'net', e:'⚡', tag:'Le Réseau Critique',              def:4},
  transport:   {l:'Transport / Mobilité / Logistique',g:'net',e:'🚌', tag:'Le Transporteur Intelligent',     def:3},
  bet:         {l:"Bureau d'Études Technique",      g:'bet', e:'📊', tag:"Le Bureau d'Études Résilient",    def:2},
  immobilier:  {l:'Immobilier / Foncier',           g:'biz', e:'🏠', tag:'Le Cabinet Immobilier',           def:2},
  geomarketing:{l:'Géomarketing / Retail',          g:'biz', e:'🛍️', tag:'Le Géomarketeur',                 def:2},
  ong:         {l:'Humanitaire / ONG / Santé',      g:'ong', e:'🤝', tag:'La Boîte à Outils du Bénévole',   def:0},
  etudiant:    {l:'Étudiant / Recherche',           g:'sci', e:'🔬', tag:'Le Labo Académique',              def:0},
  ne_sait_pas: {l:'Généraliste',                    g:'gen', e:'🗺️', tag:'Le Cartographe Nomade',           def:1}
};
var GROUPS = {
  pub:['collectivite','etat'], geo:['geometre','btp'], env:['bet_env','agriculture'],
  net:['energie','transport'], bet:['bet'], biz:['immobilier','geomarketing'],
  ong:['ong'], sci:['etudiant'], gen:['ne_sait_pas']
};
var ALL_SECT = Object.keys(SECT);

var CATS = {
  logiciels:  {lbl:'Logiciel SIG / DAO',            ico:'💻', cls:'cat-log',  max:3},
  plateforme: {lbl:'Plateforme serveur / SaaS SIG', ico:'🏢', cls:'cat-pla',  max:2},
  bases:      {lbl:'Base de données spatiale',      ico:'🗄️', cls:'cat-base', max:1},
  hebergement:{lbl:'Hébergement / Infrastructure',  ico:'🖧', cls:'cat-srv',  max:1},
  publication:{lbl:'Publication Web & Portail',     ico:'🌐', cls:'cat-pub',  max:2},
  imagerie:   {lbl:'Imagerie & Fond de plan',       ico:'🛰️', cls:'cat-ima',  max:3},
  terrain:    {lbl:'Collecte Terrain & GNSS',       ico:'📱', cls:'cat-ter',  max:2},
  etl:        {lbl:'ETL, API & Passerelles',        ico:'🔁', cls:'cat-etl',  max:2},
  bi:         {lbl:'BI & Tableaux de bord',         ico:'📊', cls:'cat-bi',   max:1},
  iot:        {lbl:'Temps réel & IoT',              ico:'📡', cls:'cat-iot',  max:2},
  securite:   {lbl:'Authentification & SSO',        ico:'🔐', cls:'cat-sec',  max:1},
  support:    {lbl:'Support, maintenance & sauvegarde', ico:'🛟', cls:'cat-sup', max:3}
};
var CAT_ORDER = Object.keys(CATS);

var D = {};   /* key -> brique */

/* "geo5 pub4 *2" -> {geometre:5,btp:5,collectivite:4,etat:4,...}  (* = défaut) */
function parseF(str, dflt) {
  var out = {}, base = dflt, tokens = (str || '').split(/\s+/).filter(Boolean);
  tokens.forEach(function (t) { if (t.charAt(0) === '*') base = +t.slice(1); });
  ALL_SECT.forEach(function (s) { out[s] = base; });
  tokens.forEach(function (t) {
    if (t.charAt(0) === '*') return;
    var m = t.match(/^([a-z_]+?)(\d)$/); if (!m) return;
    var names = GROUPS[m[1]] || [m[1]];
    names.forEach(function (s) { out[s] = +m[2]; });
  });
  return out;
}

/* Fabrique : B(cat, key, {n,sub,d,p,f,sp,tg,req,inc,xg,os,sv,fr,lvl,ms,pow,grp,si,host,cloud,free,img,link,mail,crit}) */
function B(cat, key, o) {
  var b = Object.assign({
    cat: cat, key: key, p: 0, sv: 2, fr: 2, lvl: 2, ms: 0, pow: 1, grp: '',
    tg: [], req: [], inc: [], xg: '', si: [], host: false, cloud: false
  }, o);
  /* système d'exploitation / mode de livraison par défaut selon le type de brique */
  if (!o.os) b.os = o.host ? 'Srv' : (['imagerie', 'hebergement', 'support', 'securite'].indexOf(cat) >= 0 ? 'svc' : (cat === 'publication' ? 'Web' : 'WML'));
  b.F = parseF(o.f, 1);
  b.win = (b.os === 'W');
  b.tg = typeof b.tg === 'string' ? b.tg.split(',').filter(Boolean) : b.tg;
  b.si = typeof b.si === 'string' ? b.si.split(',').filter(Boolean) : b.si;
  b.sp = b.sp || {};
  b.free = (b.p === 0);
  D[key] = b;
  return b;
}

/* sector -> valeur dans une table indexée par secteur, groupe ou "default" */
function lk(map, sector) {
  if (!map) return undefined;
  if (map[sector] !== undefined) return map[sector];
  var g = SECT[sector] && SECT[sector].g;
  if (g && map[g] !== undefined) return map[g];
  return map.default;
}

/* Modèle de prix
   nombre            : forfait annuel
   {u:[[n,€],…]}     : prix par utilisateur dégressif (palier = dernier seuil ≤ nb users)
   {t:[[max,€],…]}   : forfait par tranche d'utilisateurs (≤ max)
   {v:[léger,moyen,lourd]} : selon la charge (volume, équipe, pics)
   {pp:[public,privé]}     : gratuit/payant selon secteur public
   {ac:[académique/ONG,pro]} */
/* nombre de licences réellement nécessaires : les outils spécialisés ne sont pas pour tous */
function seatsFor(b, C) {
  if (b.grp === 'spec' || b.grp === 'dao') return (SECT[C.sector].g === 'geo') ? C.users : Math.max(1, Math.ceil(C.users / 3));
  if (b.cat === 'bi') return Math.max(1, Math.ceil(C.users / 3));
  return C.users;
}
function priceOf(b, C) {
  var p = b.p;
  if (!p) return 0;
  if (typeof p === 'number') return p;
  if (p.u) { var n = seatsFor(b, C), unit = p.u[0][1]; p.u.forEach(function (r) { if (n >= r[0]) unit = r[1]; }); return unit * n; }
  if (p.t) { for (var i = 0; i < p.t.length; i++) if (C.users <= p.t[i][0]) return p.t[i][1]; return p.t[p.t.length - 1][1]; }
  if (p.v) return p.v[Math.min(C.load, p.v.length - 1)];
  if (p.pp) return C.pub ? p.pp[0] : p.pp[1];
  if (p.ac) return C.acad ? p.ac[0] : p.ac[1];
  return 0;
}
